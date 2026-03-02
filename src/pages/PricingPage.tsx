import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Download, Sparkles, Building2, RefreshCw, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../lib/i18n';

export function PricingPage() {
  const { t, lang } = useI18n();
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = t.pricing.faq.items as unknown as Array<{ q: string; a: string }>;
  const freeFeatures = t.pricing.free.features as unknown as string[];
  const syncFeatures = t.pricing.addons.sync.features as unknown as string[];
  const publishFeatures = t.pricing.addons.publish.features as unknown as string[];
  const pioneerFeatures = t.pricing.support.catalyst.features as unknown as string[];
  const commercialFeatures = t.pricing.support.commercial.features as unknown as string[];

  const currencyNote = lang === 'zh' ? '（以上价格均为美元 USD）' : '(All prices in USD)';
  const comingSoon = lang === 'zh' ? '即将推出' : 'Coming Soon';

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Hero Section - Free without limits */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            {t.pricing.hero.title}
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            {t.pricing.hero.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {t.pricing.hero.description}
          </p>
        </div>

        {/* Free Section - Most Prominent */}
        <div className="mb-20">
          <div className="glass-dark rounded-2xl p-8 md:p-12 border border-secondary/30 glow-secondary">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {t.pricing.free.title}
                </h2>
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
                <Link
                  to="/download"
                  className="px-8 py-3 rounded-xl bg-secondary text-dark-600 font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t.pricing.free.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Add-on Services */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t.pricing.addons.title}
            </h2>
            <p className="text-gray-400">
              {t.pricing.addons.subtitle}
            </p>
            <p className="text-gray-500 text-sm mt-2">{currencyNote}</p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-dark-300/50">
              <button
                onClick={() => setBillingAnnual(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  billingAnnual
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Annual
              </button>
              <button
                onClick={() => setBillingAnnual(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !billingAnnual
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Sync & Publish Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sync Card */}
            <div className="glass-dark rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.pricing.addons.sync.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{t.pricing.addons.sync.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  {billingAnnual ? t.pricing.addons.sync.price : t.pricing.addons.sync.priceMonthly}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  {billingAnnual ? t.pricing.addons.sync.period : t.pricing.addons.sync.periodMonthly}
                </span>
              </div>
              <div className="space-y-2 mb-6">
                {syncFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  disabled
                  className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary/50 font-medium cursor-not-allowed"
                >
                  {comingSoon}
                </button>
                <button
                  disabled
                  className="px-4 py-2 rounded-lg text-gray-500 cursor-not-allowed"
                >
                  {t.pricing.addons.sync.learnMore}
                </button>
              </div>
            </div>

            {/* Publish Card */}
            <div className="glass-dark rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.pricing.addons.publish.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{t.pricing.addons.publish.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  {billingAnnual ? t.pricing.addons.publish.price : t.pricing.addons.publish.priceMonthly}
                </span>
                <span className="text-gray-500 text-sm ml-1">
                  {billingAnnual ? t.pricing.addons.publish.period : t.pricing.addons.publish.periodMonthly}
                </span>
              </div>
              <div className="space-y-2 mb-6">
                {publishFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  disabled
                  className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary/50 font-medium cursor-not-allowed"
                >
                  {comingSoon}
                </button>
                <button
                  disabled
                  className="px-4 py-2 rounded-lg text-gray-500 cursor-not-allowed"
                >
                  {t.pricing.addons.publish.learnMore}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 100% User-Supported Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t.pricing.support.title}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {t.pricing.support.subtitle}
            </p>
            <p className="text-gray-500 text-sm mt-2">{currencyNote}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pioneer Card */}
            <div className="glass-dark rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t.pricing.support.catalyst.name}</h3>
                  <span className="text-xs text-amber-400">{t.pricing.support.catalyst.limited}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{t.pricing.support.catalyst.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{t.pricing.support.catalyst.price}</span>
                <span className="text-gray-500 text-sm ml-1">{t.pricing.support.catalyst.period}</span>
              </div>
              <div className="space-y-2 mb-6">
                {pioneerFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button
                disabled
                className="w-full px-4 py-2 rounded-lg bg-amber-500/10 text-amber-400/50 font-medium cursor-not-allowed"
              >
                {comingSoon}
              </button>
            </div>

            {/* Commercial Card */}
            <div className="glass-dark rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/5">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.pricing.support.commercial.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{t.pricing.support.commercial.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{t.pricing.support.commercial.price}</span>
                <span className="text-gray-500 text-sm ml-1">{t.pricing.support.commercial.period}</span>
              </div>
              <div className="space-y-2 mb-6">
                {commercialFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button
                disabled
                className="w-full px-4 py-2 rounded-lg bg-white/5 text-gray-500 font-medium cursor-not-allowed"
              >
                {comingSoon}
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            {t.pricing.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="glass-dark rounded-xl border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white">{item.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-4 text-gray-400">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
