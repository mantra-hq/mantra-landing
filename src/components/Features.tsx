import { Clock, Search, ShieldCheck, Shield, GitCommit, FileCode, MousePointer, Lock, Cpu, Monitor, Eye, ScanLine, FileWarning, BarChart3, Layers, Wrench, FolderOpen, MessageSquare } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export function Features() {
  const { t } = useI18n();

  const features = [
    {
      id: 'timeTravel',
      title: t.features.timeTravel.title,
      tagline: t.features.timeTravel.tagline,
      description: t.features.timeTravel.description,
      icon: Clock,
      color: 'primary',
      details: [
        { icon: MousePointer, text: t.features.timeTravel.detail1 },
        { icon: GitCommit, text: t.features.timeTravel.detail2 },
        { icon: FileCode, text: t.features.timeTravel.detail3 },
      ],
    },
    {
      id: 'search',
      title: t.features.search.title,
      tagline: t.features.search.tagline,
      description: t.features.search.description,
      icon: Search,
      color: 'secondary',
      details: [
        { icon: Search, text: t.features.search.detail1 },
        { icon: Eye, text: t.features.search.detail2 },
        { icon: MousePointer, text: t.features.search.detail3 },
      ],
    },
    {
      id: 'security',
      title: t.features.security.title,
      tagline: t.features.security.tagline,
      description: t.features.security.description,
      icon: ShieldCheck,
      color: 'primary',
      details: [
        { icon: ScanLine, text: t.features.security.detail1 },
        { icon: FileWarning, text: t.features.security.detail2 },
        { icon: ShieldCheck, text: t.features.security.detail3 },
      ],
    },
    {
      id: 'privacy',
      title: t.features.privacy.title,
      tagline: t.features.privacy.tagline,
      description: t.features.privacy.description,
      icon: Shield,
      color: 'secondary',
      details: [
        { icon: Lock, text: t.features.privacy.detail1 },
        { icon: Cpu, text: t.features.privacy.detail2 },
        { icon: Monitor, text: t.features.privacy.detail3 },
      ],
    },
    {
      id: 'insights',
      title: t.features.insights.title,
      tagline: t.features.insights.tagline,
      description: t.features.insights.description,
      icon: BarChart3,
      color: 'secondary',
      details: [
        { icon: Layers, text: t.features.insights.detail1 },
        { icon: FolderOpen, text: t.features.insights.detail2 },
        { icon: Wrench, text: t.features.insights.detail3 },
      ],
    },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.features.title} <span className="text-gradient">{t.features.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Feature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  details: { icon: React.ComponentType<{ className?: string }>; text: string }[];
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;
  const isEven = index % 2 === 0;
  const colorClass = feature.color === 'primary' ? 'text-primary' : 'text-secondary';
  const bgColorClass = feature.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10';
  const glowClass = feature.color === 'primary' ? 'glow-primary' : 'glow-secondary';

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
      <div className="flex-1 space-y-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgColorClass}`}>
          <Icon className={`w-4 h-4 ${colorClass}`} />
          <span className={`text-sm font-medium ${colorClass}`}>{feature.tagline}</span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white">
          {feature.title}
        </h3>

        <p className="text-lg text-gray-400 leading-relaxed">
          {feature.description}
        </p>

        <div className="space-y-3 pt-4">
          {feature.details.map((detail, i) => {
            const DetailIcon = detail.icon;
            return (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className={`p-2 rounded-lg ${bgColorClass}`}>
                  <DetailIcon className={`w-4 h-4 ${colorClass}`} />
                </div>
                <span>{detail.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 w-full">
        <FeatureVisual featureId={feature.id} glowClass={glowClass} />
      </div>
    </div>
  );
}

interface FeatureVisualProps {
  featureId: string;
  glowClass: string;
}

function FeatureVisual({ featureId, glowClass }: FeatureVisualProps) {
  const { t } = useI18n();

  if (featureId === 'timeTravel') {
    return (
      <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
        <div className="space-y-4">
          {/* Timeline with markers */}
          <div className="relative py-4">
            <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>
            {/* Draggable indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary cursor-grab"
              style={{ left: '60%', transform: 'translate(-50%, -50%)' }}
            />
            {/* User message markers (blue dots) */}
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" style={{ left: '10%' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" style={{ left: '35%' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" style={{ left: '75%' }} />
            {/* Git commit markers (green squares) */}
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm" style={{ left: '25%', transform: 'translate(-50%, -50%)' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm" style={{ left: '55%', transform: 'translate(-50%, -50%)' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-sm" style={{ left: '90%', transform: 'translate(-50%, -50%)' }} />
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-primary rounded-full" />
              <span>User Message</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-secondary rounded-sm" />
              <span>Git Commit</span>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Code preview panel */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-dark-300/50">
              <div className="text-xs text-gray-500 mb-2 font-mono">src/App.tsx</div>
              <div className="text-xs text-gray-400 font-mono space-y-1">
                <div><span className="text-secondary">+</span> const [dark, setDark]</div>
                <div><span className="text-secondary">+</span> useState(false)</div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-dark-300/50">
              <div className="flex items-center gap-2 mb-2">
                <GitCommit className="w-3 h-3 text-secondary" />
                <span className="text-xs text-secondary font-mono">a3f2c1d</span>
              </div>
              <div className="text-xs text-gray-400">Add dark mode toggle</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (featureId === 'search') {
    return (
      <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-200/50 border border-secondary/30">
            <Search className="w-4 h-4 text-secondary" />
            <span className="text-sm text-gray-300">authentication error</span>
            <kbd className="ml-auto px-2 py-0.5 rounded bg-dark-300 text-xs text-gray-500">⌘K</kbd>
          </div>
          
          {/* Search results */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>3 {t.features.searchResults}</span>
            </div>
            {[
              { project: 'auth-service', message: '...fix <mark>authentication error</mark> in login...', time: '2h ago' },
              { project: 'api-gateway', message: '...handle <mark>authentication error</mark> response...', time: '1d ago' },
              { project: 'user-service', message: '...debug <mark>authentication error</mark> logs...', time: '3d ago' },
            ].map((result, i) => (
              <div key={i} className="p-3 rounded-lg bg-dark-300/50 hover:bg-dark-300/70 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-secondary font-mono">{result.project}</span>
                  <span className="text-xs text-gray-600">{result.time}</span>
                </div>
                <div 
                  className="text-sm text-gray-400 [&_mark]:bg-secondary/30 [&_mark]:text-secondary [&_mark]:px-0.5 [&_mark]:rounded"
                  dangerouslySetInnerHTML={{ __html: result.message }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (featureId === 'security') {
    return (
      <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
        <div className="space-y-4">
          {/* Scan result header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-amber-400">3 {t.features.sensitiveFound}</span>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors">
              {t.features.redactAll}
            </button>
          </div>
          
          {/* Sensitive items list */}
          <div className="space-y-2">
            {[
              { type: t.features.apiKey, value: 'sk-proj-****...****', line: 'L23' },
              { type: t.features.password, value: 'DB_PASS=****', line: 'L45' },
              { type: t.features.token, value: 'ghp_****...****', line: 'L67' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-dark-300/50 border border-amber-400/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileWarning className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-gray-300">{item.type}</span>
                    <span className="text-xs text-gray-600 font-mono">{item.line}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Diff preview */}
          <div className="p-3 rounded-lg bg-dark-200/50 border border-primary/20">
            <div className="text-xs text-gray-500 mb-2">Diff Preview</div>
            <div className="text-xs font-mono space-y-1">
              <div className="text-red-400/80">- api_key = "sk-proj-abc123xyz"</div>
              <div className="text-secondary">+ api_key = "[REDACTED]"</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (featureId === 'insights') {
    return (
      <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
        <div className="space-y-4">
          {/* Token Usage Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{t.features.tokenUsage}</span>
            <span className="text-2xl font-bold text-white">12,847</span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-dark-200 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-secondary to-primary rounded-full" />
          </div>

          {/* Token Breakdown */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-dark-300/50 text-center">
              <div className="text-lg font-bold text-primary">6,234</div>
              <div className="text-xs text-gray-500">{t.features.input}</div>
              <div className="text-xs text-gray-600">48.5%</div>
            </div>
            <div className="p-3 rounded-lg bg-dark-300/50 text-center">
              <div className="text-lg font-bold text-secondary">4,512</div>
              <div className="text-xs text-gray-500">{t.features.output}</div>
              <div className="text-xs text-gray-600">35.1%</div>
            </div>
            <div className="p-3 rounded-lg bg-dark-300/50 text-center">
              <div className="text-lg font-bold text-amber-400">2,101</div>
              <div className="text-xs text-gray-500">{t.features.cache}</div>
              <div className="text-xs text-gray-600">16.4%</div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Stats Row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <FolderOpen className="w-4 h-4 text-secondary" />
              <span>12 {t.features.sessions}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span>847 {t.features.messages}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>234 {t.features.toolCalls}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-secondary" />
          <span className="font-medium">{t.features.privacyMode}</span>
        </div>
        <div className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs">{t.features.active}</div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-dark-200/50 border border-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-secondary" />
            <span className="text-sm text-gray-300">{t.features.localStorageOnly}</span>
          </div>
          <div className="text-xs text-gray-500">
            ~/Library/Application Support/Mantra/sessions/
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-dark-300/50 text-center">
            <div className="flex items-center justify-center mb-1">
              <Cpu className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-xs text-gray-500">Rust</div>
          </div>
          <div className="p-3 rounded-lg bg-dark-300/50 text-center">
            <div className="text-lg font-bold text-white">0</div>
            <div className="text-xs text-gray-500">{t.features.cloudUploads}</div>
          </div>
          <div className="p-3 rounded-lg bg-dark-300/50 text-center">
            <div className="text-lg font-bold text-secondary">100%</div>
            <div className="text-xs text-gray-500">{t.features.localData}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
