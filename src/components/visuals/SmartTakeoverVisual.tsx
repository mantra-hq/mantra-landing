import { FolderOpen, Check } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function SmartTakeoverVisual() {
  const { lang } = useI18n();

  const step1Label = lang === 'zh' ? '检测到现有配置' : 'Existing configs detected';
  const step2Label = lang === 'zh' ? 'Diff 对比' : 'Diff Compare';
  const step3Label = lang === 'zh' ? 'Shadow Mode 预览' : 'Shadow Mode Preview';
  const conflictText = lang === 'zh' ? '1 个冲突 → 已自动解决' : '1 conflict detected → auto-resolved';
  const readyText = lang === 'zh' ? '5 个服务就绪' : '5 services ready';

  return (
    <div className="glass-dark rounded-2xl p-6 glow-primary">
      {/* Browser title bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-sm text-gray-500 font-mono">Smart Takeover</span>
      </div>

      <div className="space-y-3">
        {/* Step 1 */}
        <div className="p-3 rounded-lg bg-dark-300/50">
          <div className="flex items-center gap-2 text-xs font-medium text-primary-300 mb-2">
            <div className="w-5 h-5 rounded-full bg-primary-300/20 flex items-center justify-center text-primary-300 text-xs">1</div>
            <span>{step1Label}</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-mono text-xs text-gray-400">~/.cursor/mcp.json</span>
              </div>
              <span className="text-xs text-gray-500">3 services found</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-mono text-xs text-gray-400">~/.claude/mcp_servers.json</span>
              </div>
              <span className="text-xs text-gray-500">2 services found</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-3 rounded-lg bg-dark-300/50">
          <div className="flex items-center gap-2 text-xs font-medium text-primary-300 mb-2">
            <div className="w-5 h-5 rounded-full bg-primary-300/20 flex items-center justify-center text-primary-300 text-xs">2</div>
            <span>{step2Label}</span>
          </div>
          <div className="font-mono text-xs space-y-1">
            <div className="text-red-400/80">- "api-key": "sk-xxx..."   (env var recommended)</div>
            <div className="text-secondary">+ "api-key": {'"${MCP_API_KEY}"'}</div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full bg-primary-300" />
            <span className="text-xs text-primary-300">{conflictText}</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-3 rounded-lg bg-dark-300/50">
          <div className="flex items-center gap-2 text-xs font-medium text-primary-300 mb-2">
            <div className="w-5 h-5 rounded-full bg-primary-300/20 flex items-center justify-center text-primary-300 text-xs">3</div>
            <span>{step3Label}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary">{readyText}</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded bg-primary-300/20 text-primary-300 text-xs">Apply</span>
              <span className="px-3 py-1 rounded bg-dark-200 text-gray-500 text-xs">Rollback</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
