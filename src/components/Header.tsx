import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { LanguageToggle } from './LanguageToggle';
import mantraIcon from '../assets/icon-mantra.png';

export function Header() {
  const { t, lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const docsUrl = lang === 'zh' ? '/docs/index.html' : '/docs/en/index.html';
  const blogUrl = lang === 'zh' ? '/blog/zh/' : '/blog/';
  const faqUrl = lang === 'zh' ? '/docs/about/faq.html' : '/docs/en/about/faq.html';
  const securityUrl = lang === 'zh' ? '/docs/about/security-policy.html' : '/docs/en/about/security-policy.html';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: t.header.features, href: '#features', isAnchor: true },
    { label: t.header.docs, href: docsUrl, isAnchor: false },
    { label: t.header.blog, href: blogUrl, isAnchor: false },
    { label: t.header.faq, href: faqUrl, isAnchor: false },
    { label: t.header.security, href: securityUrl, isAnchor: false },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-600/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={mantraIcon} alt="Mantra" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-white text-lg">Mantra</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#signup"
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              {t.header.download}
            </a>
            <LanguageToggle inline />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a
                  href="#signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t.header.download}
                </a>
                <LanguageToggle inline />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
