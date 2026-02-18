import { Clock, Monitor, Wrench, Search, ShieldCheck, FolderOpen } from 'lucide-react';
import { useI18n } from '../lib/i18n';

type LucideIcon = React.ComponentType<{ className?: string }>;

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function BeyondSection() {
  const { lang } = useI18n();

  const sectionTitle = lang === 'zh' ? '超越简单的会话记录' : 'Beyond Simple Session Recording';
  const sectionDescription = lang === 'zh'
    ? '从全景回放到智能提取，从工具聚合到安全管控——一切皆在本地掌控。'
    : 'From panoramic replay to intelligent extraction, from tool aggregation to security management — all under your local control.';

  const features: Feature[] = [
    {
      icon: Clock,
      title: lang === 'zh' ? '时空穿梭' : 'Time Travel',
      description: lang === 'zh'
        ? '拖动时间轴，代码和对话瞬间回到那一刻。'
        : 'Drag the timeline — code and conversation jump back instantly.',
    },
    {
      icon: Monitor,
      title: lang === 'zh' ? 'MCP 中控台' : 'MCP Control Center',
      description: lang === 'zh'
        ? '统一配置、调试、管控所有 MCP 服务。'
        : 'Configure, debug, and manage all MCP services in one place.',
    },
    {
      icon: Wrench,
      title: lang === 'zh' ? '技能分发中心' : 'Skill Distribution',
      description: lang === 'zh'
        ? 'Skills 配置一次，自动同步到所有 AI 工具。'
        : 'Configure Skills once, auto-sync to every AI tool.',
    },
    {
      icon: Search,
      title: lang === 'zh' ? '精准检索' : 'Precise Search',
      description: lang === 'zh'
        ? 'Cmd+K 跨项目、跨会话全文搜索，秒级定位。'
        : 'Cmd+K full-text search across all projects and sessions.',
    },
    {
      icon: ShieldCheck,
      title: lang === 'zh' ? '智能脱敏' : 'Smart Redaction',
      description: lang === 'zh'
        ? '自动识别敏感信息，一键遮蔽后放心分享。'
        : 'Auto-detect sensitive info, one-click redaction before sharing.',
    },
    {
      icon: FolderOpen,
      title: lang === 'zh' ? '全平台聚合' : 'Cross-Platform',
      description: lang === 'zh'
        ? '所有 AI 编程助手的历史，一个视图尽收眼底。'
        : 'All AI coding assistant histories in a single unified view.',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{sectionTitle}</h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">{sectionDescription}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-dark rounded-xl p-5 hover:bg-white/[0.03] transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
