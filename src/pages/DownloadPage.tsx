import { useState, useEffect, useMemo } from 'react';
import { Download, Apple, Monitor, ExternalLink, ChevronDown, AlertCircle, Terminal } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import mantraIcon from '../assets/icon-mantra.png';

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  published_at: string;
  assets: ReleaseAsset[];
}

type Platform = 'mac' | 'windows' | 'linux';
type PackageType = 'dmg-arm64' | 'dmg-x64' | 'msi' | 'exe' | 'appimage' | 'deb' | 'rpm';

interface PackageInfo {
  type: PackageType;
  label: string;
  platform: Platform;
  pattern: RegExp;
  description?: string;
}

const PACKAGE_CONFIGS: PackageInfo[] = [
  { type: 'dmg-arm64', label: 'Apple Silicon', platform: 'mac', pattern: /macos-arm64\.dmg$/i },
  { type: 'dmg-x64', label: 'Intel', platform: 'mac', pattern: /macos-x64\.dmg$/i },
  { type: 'msi', label: 'MSI', platform: 'windows', pattern: /\.msi$/i },
  { type: 'exe', label: 'EXE', platform: 'windows', pattern: /\.exe$/i },
  { type: 'appimage', label: 'AppImage', platform: 'linux', pattern: /\.AppImage$/i },
  { type: 'deb', label: 'Deb', platform: 'linux', pattern: /\.deb$/i },
  { type: 'rpm', label: 'RPM', platform: 'linux', pattern: /\.rpm$/i },
];

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (platform.includes('mac') || ua.includes('mac')) {
    return 'mac';
  }
  if (platform.includes('win') || ua.includes('win')) {
    return 'windows';
  }
  return 'linux';
}

function detectMacArch(): 'arm64' | 'x64' {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('arm') || ua.includes('aarch64')) {
    return 'arm64';
  }
  return 'arm64';
}

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function formatDate(dateString: string, lang: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.574-.63.328-1.58.726-2.168 1.49-.422.534-1.093.869-1.7.922-.596.033-1.097-.187-1.382-.752l-.002-.003c-.085-.166-.108-.393-.108-.608 0-.167.02-.334.027-.465.015-.334.035-.74.07-1.157.036-.417.09-.846.19-1.223.1-.37.232-.637.432-.823a.663.663 0 01.098-.065c.113-.048.226-.1.339-.15l.054-.022c.11-.052.22-.1.332-.15l.003-.001c.068-.135.133-.336.198-.463z"/>
    </svg>
  );
}

export function DownloadPage() {
  const { t, lang } = useI18n();
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [macTipOpen, setMacTipOpen] = useState(false);

  const userPlatform = useMemo(() => detectPlatform(), []);
  const macArch = useMemo(() => detectMacArch(), []);

  useEffect(() => {
    async function fetchRelease() {
      try {
        const res = await fetch('https://api.github.com/repos/mantra-hq/mantra-releases/releases/latest');
        if (!res.ok) throw new Error('Failed to fetch release');
        const data = await res.json();
        setRelease(data);
      } catch (err) {
        setError(lang === 'zh' ? '获取版本信息失败' : 'Failed to fetch release info');
      } finally {
        setLoading(false);
      }
    }
    fetchRelease();
  }, [lang]);

  const downloadLinks = useMemo(() => {
    if (!release) return {};

    const links: Record<PackageType, { url: string; size: number } | null> = {
      'dmg-arm64': null,
      'dmg-x64': null,
      'msi': null,
      'exe': null,
      'appimage': null,
      'deb': null,
      'rpm': null,
    };

    release.assets.forEach((asset) => {
      for (const config of PACKAGE_CONFIGS) {
        if (config.pattern.test(asset.name)) {
          links[config.type] = {
            url: asset.browser_download_url,
            size: asset.size,
          };
          break;
        }
      }
    });

    return links;
  }, [release]);

  const primaryDownload = useMemo(() => {
    if (!release) return null;

    if (userPlatform === 'mac') {
      const type = macArch === 'arm64' ? 'dmg-arm64' : 'dmg-x64';
      const link = downloadLinks[type];
      if (link) {
        return {
          url: link.url,
          label: lang === 'zh'
            ? `下载 macOS 版 (${macArch === 'arm64' ? 'Apple Silicon' : 'Intel'})`
            : `Download for macOS (${macArch === 'arm64' ? 'Apple Silicon' : 'Intel'})`,
          size: link.size,
        };
      }
    }

    if (userPlatform === 'windows') {
      const link = downloadLinks['msi'] || downloadLinks['exe'];
      if (link) {
        return {
          url: link.url,
          label: lang === 'zh' ? '下载 Windows 版' : 'Download for Windows',
          size: link.size,
        };
      }
    }

    if (userPlatform === 'linux') {
      const link = downloadLinks['appimage'] || downloadLinks['deb'];
      if (link) {
        return {
          url: link.url,
          label: lang === 'zh'
            ? `下载 Linux 版 (${downloadLinks['appimage'] ? 'AppImage' : 'Deb'})`
            : `Download for Linux (${downloadLinks['appimage'] ? 'AppImage' : 'Deb'})`,
          size: link.size,
        };
      }
    }

    return null;
  }, [release, userPlatform, macArch, downloadLinks, lang]);

  const version = release?.tag_name?.replace(/^v/, '') || '';
  const publishDate = release?.published_at ? formatDate(release.published_at, lang) : '';

  const platformSections = [
    {
      platform: 'mac' as Platform,
      label: 'macOS',
      icon: <Apple className="w-5 h-5" />,
      packages: [
        { type: 'dmg-arm64' as PackageType, label: 'Apple Silicon (.dmg)' },
        { type: 'dmg-x64' as PackageType, label: 'Intel (.dmg)' },
      ],
    },
    {
      platform: 'windows' as Platform,
      label: 'Windows',
      icon: <Monitor className="w-5 h-5" />,
      packages: [
        { type: 'msi' as PackageType, label: 'MSI Installer' },
        { type: 'exe' as PackageType, label: 'EXE Installer' },
      ],
    },
    {
      platform: 'linux' as Platform,
      label: 'Linux',
      icon: <LinuxIcon className="w-5 h-5" />,
      packages: [
        { type: 'appimage' as PackageType, label: 'AppImage' },
        { type: 'deb' as PackageType, label: 'Deb (Debian/Ubuntu)' },
        { type: 'rpm' as PackageType, label: 'RPM (Fedora/RHEL)' },
      ],
    },
  ];

  return (
    <main className="min-h-[calc(100vh-200px)] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-dark-500/50 rounded-2xl mb-6">
            <img src={mantraIcon} alt="Mantra" className="w-24 h-24 rounded-xl" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Mantra</h1>

          {loading ? (
            <div className="h-14 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <>
              {primaryDownload && (
                <a
                  href={primaryDownload.url}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all hover:scale-[1.02] mb-4"
                >
                  <Download className="w-5 h-5" />
                  {primaryDownload.label}
                </a>
              )}

              {userPlatform === 'mac' && (
                <div className="mt-2 mb-2 text-left max-w-sm mx-auto">
                  <button
                    onClick={() => setMacTipOpen(o => !o)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
                  >
                    <AlertCircle className="w-4 h-4 text-yellow-400/80 shrink-0" />
                    <span>
                      {lang === 'zh'
                        ? 'DMG 提示"文件损坏"或被阻止打开？'
                        : 'DMG says "damaged" or blocked from opening?'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 ml-auto shrink-0 transition-transform duration-200 ${macTipOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {macTipOpen && (
                    <div className="mt-3 p-4 bg-dark-500/60 border border-white/10 rounded-xl text-sm text-gray-300 space-y-4">
                      {/* Step 1 */}
                      <div>
                        <p className="font-medium text-white mb-1">
                          {lang === 'zh' ? '① 确认下载了正确的版本' : '① Download the right build'}
                        </p>
                        <p className="text-gray-400">
                          {lang === 'zh'
                            ? 'Apple Silicon Mac（M1 / M2 / M3 / M4）请下载 '
                            : 'Apple Silicon Macs (M1 / M2 / M3 / M4) need the '}
                          <span className="text-white font-mono">Apple Silicon (.dmg)</span>
                          {lang === 'zh' ? '，Intel Mac 请下载 ' : ', Intel Macs need '}
                          <span className="text-white font-mono">Intel (.dmg)</span>
                          {lang === 'zh' ? '。' : '.'}
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div>
                        <p className="font-medium text-white mb-1">
                          {lang === 'zh' ? '② 绕过 Gatekeeper 安全检查' : '② Bypass Gatekeeper'}
                        </p>
                        <p className="text-gray-400 mb-2">
                          {lang === 'zh'
                            ? 'macOS 会阻止未经 Apple 公证的应用。右键点击 DMG 文件，选择「打开」，再次点击「打开」确认即可。或者在终端运行：'
                            : 'macOS blocks apps not notarized by Apple. Right-click the DMG → Open → confirm Open. Or run in Terminal:'}
                        </p>
                        <div className="flex items-center gap-2 px-3 py-2 bg-dark-600/80 rounded-lg border border-white/10">
                          <Terminal className="w-4 h-4 text-gray-500 shrink-0" />
                          <code className="text-green-400 font-mono text-xs break-all">
                            xattr -cr ~/Downloads/Mantra-*.dmg
                          </code>
                        </div>
                      </div>

                      {/* Discord */}
                      <p className="text-gray-500 text-xs pt-1 border-t border-white/5">
                        {lang === 'zh' ? '仍有问题？' : 'Still stuck? '}
                        <a
                          href="https://discord.gg/hZ73MMfJxy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {lang === 'zh' ? '加入 Discord 社区获取帮助' : 'Join our Discord for help'}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              )}

              <p className="text-gray-500 text-sm font-mono">
                {lang === 'zh' ? '最后更新' : 'Last updated'} {publishDate}
                {version && ` · v${version}`}
              </p>
            </>
          )}
        </div>

        {!loading && !error && (
          <div className="bg-dark-500/30 rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-primary">
                {lang === 'zh' ? '所有平台' : 'All Platforms'}
              </h2>
            </div>

            <div className="divide-y divide-white/5">
              {platformSections.map((section) => (
                <div key={section.platform} className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 w-32 shrink-0">
                      <span className="text-gray-400">{section.icon}</span>
                      <span className="text-white font-medium">{section.label}</span>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      {section.packages.map((pkg) => {
                        const link = downloadLinks[pkg.type];
                        if (!link) return null;

                        return (
                          <a
                            key={pkg.type}
                            href={link.url}
                            className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            <Download className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                            <span>{pkg.label}</span>
                            <span className="text-gray-500 text-sm ml-auto">
                              {formatFileSize(link.size)}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://github.com/mantra-hq/mantra-releases/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            {lang === 'zh' ? '查看所有版本' : 'View all releases'}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
