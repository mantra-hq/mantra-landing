import { Github, Twitter, Mail } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import mantraIcon from '../assets/icon-mantra.png';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={mantraIcon} alt="Mantra" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-white">Mantra</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#features" className="hover:text-white transition-colors">{t.footer.features}</a>
            <a href="#signup" className="hover:text-white transition-colors">{t.footer.earlyAccess}</a>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="p-2 rounded-lg text-gray-600 cursor-not-allowed relative group"
              title="Coming Soon"
            >
              <Github className="w-5 h-5" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-200 text-xs text-gray-400 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </span>
            </div>
            <a
              href="https://x.com/decker502"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:mantra@gonewx.com"
              className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
