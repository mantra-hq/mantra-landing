import { Server, Share2, Import, Terminal, ShieldCheck, Radio, Wrench, Lock, FileText, Check } from 'lucide-react';
import { useI18n } from '../lib/i18n';

const pointIcons = [Share2, Import, Terminal, ShieldCheck];

export function McpHubShowcase() {
  const { t } = useI18n();

  return (
    <section id="mcp-hub" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Copy */}
          <div className="lg:w-5/12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.mcpHub.label}</span>
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.mcpHub.title}
              <br />
              <span className="text-gradient">{t.mcpHub.titleHighlight}</span>
            </h2>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {t.mcpHub.description}
            </p>

            {/* Four selling points */}
            <div className="space-y-6">
              {[0, 1, 2, 3].map((i) => {
                const Icon = pointIcons[i];
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white mb-1">
                        {t.mcpHub.points[i].title}
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t.mcpHub.points[i].description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tagline */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-500 italic">{t.mcpHub.tagline}</p>
            </div>
          </div>

          {/* Right: App mockup */}
          <div className="lg:w-7/12 w-full">
            <McpHubAppVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function McpHubAppVisual() {
  const { lang } = useI18n();

  const servicesTitle = lang === 'zh' ? '已安装的 MCP 服务' : 'Installed MCP Services';
  const addService = lang === 'zh' ? '+ 添加服务' : '+ Add Service';

  const navItems = [
    { icon: Radio, label: lang === 'zh' ? '服务' : 'Services', active: true },
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
    <div className="glass-dark rounded-2xl overflow-hidden glow-primary">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-500/50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-sm text-gray-400 font-mono">Mantra — MCP Hub</span>
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
                    item.active ? 'bg-primary/10 text-primary' : 'text-gray-500'
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
                    <Check className="w-3.5 h-3.5 text-primary" />
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
          <div className="mt-3 w-full p-2 rounded-lg border border-dashed border-white/10 text-xs text-gray-500 text-center hover:border-primary/30 hover:text-primary transition-colors cursor-pointer">
            {addService}
          </div>
        </div>
      </div>
    </div>
  );
}
