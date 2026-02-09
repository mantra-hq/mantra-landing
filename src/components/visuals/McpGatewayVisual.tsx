import { Check, ArrowDown } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function McpGatewayVisual() {
  const { lang } = useI18n();

  const services = [
    { name: 'GitHub API', tools: 3 },
    { name: 'Supabase MCP', tools: 5 },
    { name: 'File System', tools: 4 },
  ];

  const clients = [
    { name: 'Claude Code', short: 'CC' },
    { name: 'Cursor', short: 'Cu' },
    { name: 'Gemini CLI', short: 'Ge' },
  ];

  const totalTools = services.reduce((sum, s) => sum + s.tools, 0);
  const configTitle = lang === 'zh' ? 'Mantra 配置中心' : 'Mantra Config Center';
  const summaryText = lang === 'zh'
    ? `配置一次，${totalTools} 个工具自动同步到 ${clients.length} 个应用`
    : `Configure once, ${totalTools} tools auto-synced to ${clients.length} apps`;

  return (
    <div className="glass-dark rounded-2xl p-6 glow-primary">
      {/* Config Center Block */}
      <div className="p-4 rounded-xl bg-dark-300/30 border border-primary/20 mb-4">
        <div className="text-xs text-primary font-medium mb-3">{configTitle}</div>
        <div className="space-y-2">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm text-gray-300">{service.name}</span>
              </div>
              <span className="text-xs text-gray-500 px-2 py-0.5 rounded bg-dark-200/50">
                {service.tools} tools
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <div className="flex items-center justify-center gap-8 py-3">
        <ArrowDown className="w-4 h-4 text-primary/40" />
        <ArrowDown className="w-4 h-4 text-primary/40" />
        <ArrowDown className="w-4 h-4 text-primary/40" />
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-3 gap-3">
        {clients.map((client) => (
          <div key={client.name} className="p-3 rounded-lg bg-dark-300/30 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{client.short}</span>
            </div>
            <div className="text-xs text-gray-400 mb-1">{client.name}</div>
            <div className="flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary">{totalTools} tools</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="text-center mt-4 text-xs text-gray-600">
        {summaryText}
      </div>
    </div>
  );
}
