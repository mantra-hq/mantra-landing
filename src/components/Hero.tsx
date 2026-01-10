import { Play, Clock, Sparkles, BookOpen } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { RollingToolName } from './RollingToolName';
import mantraIcon from '../assets/icon-mantra.png';

interface HeroProps {
  onCtaClick: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  const { t, lang } = useI18n();
  const docsUrl = lang === 'zh' ? '/docs/index.html' : '/docs/en/index.html';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img
                src={mantraIcon}
                alt="Mantra"
                className="w-24 h-24 rounded-2xl animate-float"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl -z-10" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300">{t.hero.badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">{t.hero.title1}</span>{' '}
            <span className="text-gradient">{t.hero.title2}</span>
            <br />
            <span className="text-white">{t.hero.title3}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            {t.hero.description} <RollingToolName /> {t.hero.descriptionEnd}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onCtaClick}
              className="group relative px-8 py-4 bg-primary hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 glow-primary"
            >
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                {t.hero.downloadAlpha}
              </span>
            </button>
            <a
              href="#features"
              className="px-8 py-4 glass hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-secondary" />
              {t.hero.exploreFeatures}
            </a>
            <a
              href={docsUrl}
              className="px-6 py-4 text-gray-400 hover:text-white font-medium transition-all duration-300 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              {t.hero.docs}
            </a>
          </div>
        </div>

        <div className="mt-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <TimelinePreview />
        </div>
      </div>
    </section>
  );
}

function TimelinePreview() {
  const { t } = useI18n();

  return (
    <div className="glass-dark rounded-2xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-sm text-gray-500 font-mono">session_2024_01_15.jsonl</span>
      </div>

      <div className="relative">
        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-primary"
          style={{ left: '60%' }}
        />

        <div className="flex justify-between mt-3 text-xs text-gray-500 font-mono">
          <span>00:00</span>
          <span className="text-primary">12:34</span>
          <span>20:45</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-lg bg-dark-300/50">
          <div className="text-2xl font-bold text-primary">47</div>
          <div className="text-xs text-gray-500">{t.hero.messages}</div>
        </div>
        <div className="p-3 rounded-lg bg-dark-300/50">
          <div className="text-2xl font-bold text-secondary">12</div>
          <div className="text-xs text-gray-500">{t.hero.toolCalls}</div>
        </div>
        <div className="p-3 rounded-lg bg-dark-300/50">
          <div className="text-2xl font-bold text-white">8.2k</div>
          <div className="text-xs text-gray-500">{t.hero.tokens}</div>
        </div>
      </div>
    </div>
  );
}
