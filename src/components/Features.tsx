import { Play, Brain, BarChart3, Shield, FileCode, Zap, Database, Lock, Eye } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export function Features() {
  const { t } = useI18n();

  const features = [
    {
      id: 'replay',
      title: t.features.replay.title,
      tagline: t.features.replay.tagline,
      description: t.features.replay.description,
      icon: Play,
      color: 'primary',
      details: [
        { icon: Eye, text: t.features.replay.detail1 },
        { icon: FileCode, text: t.features.replay.detail2 },
        { icon: Zap, text: t.features.replay.detail3 },
      ],
    },
    {
      id: 'refine',
      title: t.features.refine.title,
      tagline: t.features.refine.tagline,
      description: t.features.refine.description,
      icon: Brain,
      color: 'secondary',
      details: [
        { icon: Brain, text: t.features.refine.detail1 },
        { icon: Database, text: t.features.refine.detail2 },
        { icon: BarChart3, text: t.features.refine.detail3 },
      ],
    },
    {
      id: 'privacy',
      title: t.features.privacy.title,
      tagline: t.features.privacy.tagline,
      description: t.features.privacy.description,
      icon: Shield,
      color: 'primary',
      details: [
        { icon: Lock, text: t.features.privacy.detail1 },
        { icon: Eye, text: t.features.privacy.detail2 },
        { icon: Shield, text: t.features.privacy.detail3 },
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

  if (featureId === 'replay') {
    return (
      <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-dark-100 flex items-center justify-center text-xs text-gray-500">U</div>
            <div className="flex-1 p-3 rounded-xl bg-dark-100 text-sm text-gray-300">
              Add a dark mode toggle to the settings page
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs text-primary">AI</div>
            <div className="flex-1 space-y-2">
              <div className="p-3 rounded-xl border border-white/5 text-sm text-gray-400">
                I'll add a dark mode toggle. Let me first check the existing settings...
              </div>
              <div className="flex items-center gap-2 text-xs text-primary">
                <FileCode className="w-3 h-3" />
                <span className="font-mono">Read settings.tsx</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{t.features.stepOf.replace('{current}', '3').replace('{total}', '12')}</span>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded bg-dark-100 hover:bg-dark-50 transition-colors">
                <Play className="w-3 h-3 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (featureId === 'refine') {
    return (
      <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-dark-200/50">
            <div className="text-3xl font-bold text-secondary mb-1">23</div>
            <div className="text-xs text-gray-500">{t.features.promptsSaved}</div>
          </div>
          <div className="p-4 rounded-xl bg-dark-200/50">
            <div className="text-3xl font-bold text-primary mb-1">156k</div>
            <div className="text-xs text-gray-500">{t.features.totalTokens}</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-xs text-gray-500 uppercase tracking-wide">{t.features.toolUsage}</div>
          <div className="space-y-2">
            {[
              { name: 'Read', percent: 45, color: 'bg-primary' },
              { name: 'Edit', percent: 30, color: 'bg-secondary' },
              { name: 'Bash', percent: 15, color: 'bg-primary/60' },
              { name: 'Grep', percent: 10, color: 'bg-secondary/60' },
            ].map((tool) => (
              <div key={tool.name} className="flex items-center gap-3">
                <span className="w-12 text-xs text-gray-400 font-mono">{tool.name}</span>
                <div className="flex-1 h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${tool.color} rounded-full transition-all duration-500`}
                    style={{ width: `${tool.percent}%` }}
                  />
                </div>
                <span className="w-8 text-xs text-gray-500 text-right">{tool.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-dark rounded-2xl p-6 ${glowClass}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-medium">{t.features.privacyMode}</span>
        </div>
        <div className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs">{t.features.active}</div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-dark-200/50 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">{t.features.localStorageOnly}</span>
          </div>
          <div className="text-xs text-gray-500">
            ~/Library/Application Support/Mantra/sessions/
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
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
