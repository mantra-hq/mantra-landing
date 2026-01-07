import { useI18n } from '../lib/i18n';
import claudeCodeIcon from '../assets/icon-claudecode.svg';
import cursorIcon from '../assets/icon-cursor.png';
import geminiIcon from '../assets/icon-gemini.png';
import codexIcon from '../assets/icon-codex.svg';
import antigravityIcon from '../assets/antigravity.png';

const tools = [
  { name: 'Claude Code', icon: claudeCodeIcon, status: 'supported' },
  { name: 'Cursor', icon: cursorIcon, status: 'supported' },
  { name: 'Gemini CLI', icon: geminiIcon, status: 'supported' },
  { name: 'Codex', icon: codexIcon, status: 'coming' },
  { name: 'Antigravity', icon: antigravityIcon, status: 'coming' },
];

export function SupportedTools() {
  const { t } = useI18n();

  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t.tools.title} <span className="text-gradient">{t.tools.titleHighlight}</span>
          </h2>
          <p className="text-gray-400">
            {t.tools.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group relative glass-dark rounded-2xl p-6 text-center hover:bg-white/5 transition-all duration-300"
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-full h-full object-contain rounded-xl"
                />
                {tool.status === 'coming' && (
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary">
                    {t.tools.soon}
                  </div>
                )}
              </div>
              <div className="font-medium text-white text-sm">{tool.name}</div>
              <div className={`text-xs mt-1 ${tool.status === 'supported' ? 'text-secondary' : 'text-gray-500'}`}>
                {tool.status === 'supported' ? t.tools.supported : t.tools.comingSoon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
