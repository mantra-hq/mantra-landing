import { Clock, Import, GitBranch, Terminal, ShieldCheck, ScanLine, Package, Download, Filter, Share2, Radio, Wrench, Lock, FileText, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { TimeTravelVisual } from './visuals/TimeTravelVisual';
import { SmartTakeoverVisual } from './visuals/SmartTakeoverVisual';

type LucideIcon = React.ComponentType<{ className?: string }>;

type PillarColor = 'primary' | 'secondary' | 'primary-300';

const colorStyles: Record<PillarColor, { text: string; bg: string; border: string; glow: string }> = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    glow: 'glow-primary',
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    glow: 'glow-secondary',
  },
  'primary-300': {
    text: 'text-primary-300',
    bg: 'bg-primary-300/10',
    border: 'border-primary-300/20',
    glow: '',
  },
};

const pillarPointIcons: Record<string, LucideIcon[]> = {
  connect: [Clock, GitBranch, Filter],
  enhance: [Share2, Package, Import, Terminal],
  simplify: [ShieldCheck, ScanLine, ShieldCheck],
};

export function Features() {
  const { t } = useI18n();

  return (
    <>
      {/* Features Anchor Title */}
      <div id="features" className="pt-16 mb-8">
        <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />
        <p className="text-sm text-gray-600 uppercase tracking-widest text-center">
          {t.pillars.sectionLabel}
        </p>
      </div>

      {/* Pillar 1: Replay — text LEFT, visual RIGHT */}
      <PillarSection
        pillar={t.pillars.connect}
        icons={pillarPointIcons.connect}
        color="primary"
        visual={<TimeTravelVisual />}
        reverse={false}
        gradientFrom="from-primary/3"
      />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Pillar 2: Control Center — visual LEFT, text RIGHT */}
      <PillarSection
        pillar={t.pillars.enhance}
        icons={pillarPointIcons.enhance}
        color="secondary"
        visual={<ControlCenterVisual />}
        reverse={true}
        gradientFrom="from-secondary/3"
        id="mcp-hub"
      />

      {/* Auxiliary CTA */}
      <PillarCta />

      {/* Pillar 3: Security — text LEFT, visual RIGHT */}
      <PillarSection
        pillar={t.pillars.simplify}
        icons={pillarPointIcons.simplify}
        color="primary-300"
        visual={<SmartTakeoverVisual />}
        reverse={false}
        gradientFrom="from-primary-300/3"
      />
    </>
  );
}

/* ── Unified Pillar Section ─────────────────────────────── */

function PillarSection({ pillar, icons, color, visual, reverse, gradientFrom, id }: {
  pillar: { label: string; title: string; titleHighlight?: string; description: string; points: readonly { title: string; description: string }[]; tagline?: string };
  icons: LucideIcon[];
  color: PillarColor;
  visual: React.ReactNode;
  reverse: boolean;
  gradientFrom: string;
  id?: string;
}) {
  const s = colorStyles[color];

  return (
    <section id={id} className="py-24 relative">
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientFrom} to-transparent`} />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
          {/* Text side */}
          <div className="lg:w-5/12">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${s.bg} border ${s.border} mb-6`}>
              <span className={`text-sm font-medium ${s.text}`}>{pillar.label}</span>
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {pillar.title}
              {pillar.titleHighlight && (
                <>
                  <br />
                  <span className="text-gradient">{pillar.titleHighlight}</span>
                </>
              )}
            </h2>

            <p className="text-base text-gray-400 mb-8 leading-relaxed">{pillar.description}</p>

            <div className="space-y-5">
              {pillar.points.map((point, i) => {
                const Icon = icons[i] || icons[0];
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${s.text}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{point.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {pillar.tagline && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-500 italic">{pillar.tagline}</p>
              </div>
            )}
          </div>

          {/* Visual side */}
          <div className="lg:w-7/12 w-full">{visual}</div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function PillarCta() {
  const { t } = useI18n();
  return (
    <div className="text-center py-8">
      <div className="inline-flex flex-col sm:flex-row items-center gap-3">
        <span className="text-gray-500 text-sm">{t.pillars.cta.label}</span>
        <Link
          to="/download"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <Download className="w-4 h-4" />
          {t.pillars.cta.button}
        </Link>
      </div>
    </div>
  );
}

function ControlCenterVisual() {
  const { lang } = useI18n();

  const servicesTitle = lang === 'zh' ? '已安装的 MCP 服务' : 'Installed MCP Services';
  const addService = lang === 'zh' ? '+ 添加服务' : '+ Add Service';

  const navItems = [
    { icon: Radio, label: lang === 'zh' ? '服务' : 'Services', active: true },
    { icon: Package, label: 'Skills', active: false },
    { icon: Wrench, label: lang === 'zh' ? '工具' : 'Tools', active: false },
    { icon: Lock, label: lang === 'zh' ? '权限' : 'Policies', active: false },
    { icon: FileText, label: lang === 'zh' ? '日志' : 'Logs', active: false },
  ];

  const services = [
    { name: 'GitHub API', status: 'Running', tools: 3, apps: 3 },
    { name: 'Supabase', status: 'Running', tools: 5, apps: 2 },
    { name: 'File System', status: 'Running', tools: 4, apps: 3 },
  ];

  return (
    <div className="glass-dark rounded-2xl overflow-hidden glow-secondary">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-500/50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-sm text-gray-400 font-mono">
            Mantra — {lang === 'zh' ? '中控台' : 'Control Center'}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-36 border-r border-white/5 py-4 px-3 hidden md:block">
          <div className="space-y-1">
            {navItems.map((item) => {
              const NavIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                    item.active ? 'bg-secondary/10 text-secondary' : 'text-gray-500'
                  }`}
                >
                  <NavIcon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <div className="text-sm font-medium text-white mb-1">{servicesTitle}</div>
          <div className="h-px bg-white/5 mb-3" />

          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.name} className="p-3 rounded-lg bg-dark-300/30 border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-secondary" />
                    <span className="text-sm text-white">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-xs text-secondary">{service.status}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {service.tools} tools · Shared to {service.apps} apps
                </div>
              </div>
            ))}
          </div>

          {/* Add button */}
          <div className="mt-3 w-full p-2 rounded-lg border border-dashed border-white/10 text-xs text-gray-500 text-center hover:border-secondary/30 hover:text-secondary transition-colors cursor-pointer">
            {addService}
          </div>
        </div>
      </div>
    </div>
  );
}
