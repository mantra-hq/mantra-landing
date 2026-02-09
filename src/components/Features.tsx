import { Server, Clock, Import, GitBranch, Terminal, ShieldCheck, Search, ScanLine, Package, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';
import { McpGatewayVisual } from './visuals/McpGatewayVisual';
import { TimeTravelVisual } from './visuals/TimeTravelVisual';
import { SmartTakeoverVisual } from './visuals/SmartTakeoverVisual';

type LucideIcon = React.ComponentType<{ className?: string }>;

type PillarColor = 'primary' | 'secondary' | 'primary-300';

const colorStyles: Record<PillarColor, { text: string; bg: string; border: string; borderLeft: string }> = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    borderLeft: 'border-primary/40',
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    borderLeft: 'border-secondary/40',
  },
  'primary-300': {
    text: 'text-primary-300',
    bg: 'bg-primary-300/10',
    border: 'border-primary-300/20',
    borderLeft: 'border-primary-300/40',
  },
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

      {/* Pillar 1: Connect */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6">
          <PillarHeader
            label={t.pillars.connect.label}
            title={t.pillars.connect.title}
            description={t.pillars.connect.description}
            color="primary"
          />
          <HeroFeature
            tagIcon={Server}
            tagline={t.pillars.connect.hero.tagline}
            title={t.pillars.connect.hero.title}
            description={t.pillars.connect.hero.description}
            color="primary"
            visual={<McpGatewayVisual />}
            reverse={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <CompactCard
              icon={Import}
              title={t.pillars.connect.compact[0].title}
              description={t.pillars.connect.compact[0].description}
              color="primary"
            />
            <CompactCard
              icon={GitBranch}
              title={t.pillars.connect.compact[1].title}
              description={t.pillars.connect.compact[1].description}
              color="primary"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Pillar 2: Enhance */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/3 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6">
          <PillarHeader
            label={t.pillars.enhance.label}
            title={t.pillars.enhance.title}
            description={t.pillars.enhance.description}
            color="secondary"
          />
          <HeroFeature
            tagIcon={Clock}
            tagline={t.pillars.enhance.hero.tagline}
            title={t.pillars.enhance.hero.title}
            description={t.pillars.enhance.hero.description}
            color="secondary"
            visual={<TimeTravelVisual />}
            reverse={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <CompactCard
              icon={Terminal}
              title={t.pillars.enhance.compact[0].title}
              description={t.pillars.enhance.compact[0].description}
              color="secondary"
            />
            <CompactCard
              icon={ShieldCheck}
              title={t.pillars.enhance.compact[1].title}
              description={t.pillars.enhance.compact[1].description}
              color="secondary"
            />
          </div>

          {/* Skills Hub Coming Soon Banner */}
          <div className="mt-6 glass-dark rounded-xl p-4 border border-dashed border-white/10 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-secondary/10 flex-shrink-0">
              <Package className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm font-medium text-white">{t.pillars.enhance.skillsHub.title}</span>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs">
                {t.pillars.enhance.skillsHub.badge}
              </span>
            </div>
            <p className="text-sm text-gray-500">{t.pillars.enhance.skillsHub.description}</p>
          </div>
        </div>
      </section>

      {/* Auxiliary CTA */}
      <PillarCta />

      {/* Pillar 3: Simplify */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-300/3 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6">
          <PillarHeader
            label={t.pillars.simplify.label}
            title={t.pillars.simplify.title}
            description={t.pillars.simplify.description}
            color="primary-300"
          />
          <HeroFeature
            tagIcon={Import}
            tagline={t.pillars.simplify.hero.tagline}
            title={t.pillars.simplify.hero.title}
            description={t.pillars.simplify.hero.description}
            color="primary-300"
            visual={<SmartTakeoverVisual />}
            reverse={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <CompactCard
              icon={Search}
              title={t.pillars.simplify.compact[0].title}
              description={t.pillars.simplify.compact[0].description}
              color="primary-300"
            />
            <CompactCard
              icon={ScanLine}
              title={t.pillars.simplify.compact[1].title}
              description={t.pillars.simplify.compact[1].description}
              color="primary-300"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function PillarHeader({ label, title, description, color }: {
  label: string; title: string; description: string; color: PillarColor;
}) {
  const s = colorStyles[color];
  return (
    <div className="text-center mb-16">
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${s.bg} border ${s.border} mb-4`}>
        <span className={`text-sm font-medium ${s.text}`}>{label}</span>
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">{description}</p>
    </div>
  );
}

function HeroFeature({ tagIcon: TagIcon, tagline, title, description, color, visual, reverse }: {
  tagIcon: LucideIcon; tagline: string; title: string; description: string;
  color: PillarColor; visual: React.ReactNode; reverse: boolean;
}) {
  const s = colorStyles[color];
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
      <div className="flex-1 space-y-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${s.bg}`}>
          <TagIcon className={`w-4 h-4 ${s.text}`} />
          <span className={`text-sm font-medium ${s.text}`}>{tagline}</span>
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white">{title}</h3>
        <p className="text-lg text-gray-400 leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 w-full">{visual}</div>
    </div>
  );
}

function CompactCard({ icon: Icon, title, description, color }: {
  icon: LucideIcon; title: string; description: string; color: PillarColor;
}) {
  const s = colorStyles[color];
  return (
    <div className={`glass-dark rounded-xl p-6 hover:bg-white/5 transition-all duration-300 border-l-2 ${s.borderLeft}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${s.bg}`}>
          <Icon className={`w-5 h-5 ${s.text}`} />
        </div>
        <span className="text-lg font-semibold text-white">{title}</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

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
