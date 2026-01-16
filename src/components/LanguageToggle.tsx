import { useI18n } from '../lib/i18n';

interface LanguageToggleProps {
  inline?: boolean;
}

export function LanguageToggle({ inline = false }: LanguageToggleProps) {
  const { lang, setLang } = useI18n();

  const toggleContent = (
    <div className="flex items-center glass rounded-full p-1">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
          lang === 'en'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('zh')}
        className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
          lang === 'zh'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        CN
      </button>
    </div>
  );

  if (inline) {
    return toggleContent;
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      {toggleContent}
    </div>
  );
}
