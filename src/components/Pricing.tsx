import { Check, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export function Pricing() {
  const { t, lang } = useI18n();

  const freeFeatures = t.pricing.free.features as unknown as string[];

  const handleDownload = () => {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Hero Section - Free without limits */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t.pricing.hero.title}
          </h2>
          <p className="text-xl text-gray-400 mb-2">
            {t.pricing.hero.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t.pricing.hero.description}
          </p>
        </div>

        {/* Free Section - Most Prominent */}
        <div className="glass-dark rounded-2xl p-8 md:p-12 border border-secondary/30 glow-secondary">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t.pricing.free.title}
              </h3>
              <p className="text-lg text-gray-400 mb-6">
                {t.pricing.free.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {freeFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="text-center md:text-right">
                <div className="text-5xl font-bold text-secondary">$0</div>
                <div className="text-gray-500">forever</div>
              </div>
              <button
                onClick={handleDownload}
                className="px-8 py-3 rounded-xl bg-secondary text-dark-600 font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t.pricing.free.cta}
              </button>
            </div>
          </div>

          {/* Link to full pricing page */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              {lang === 'zh' ? '查看完整定价方案（Sync、Publish、Pioneer）' : 'View full pricing (Sync, Publish, Pioneer)'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
