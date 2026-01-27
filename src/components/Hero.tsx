import { Link } from 'react-router-dom';
import { Download, Sparkles } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { RollingToolName } from './RollingToolName';
import mantraIcon from '../assets/icon-mantra.png';

export function Hero() {
  const { t } = useI18n();

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
            <Link
              to="/download"
              className="group relative px-8 py-4 bg-primary hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 glow-primary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t.hero.downloadAlpha}
            </Link>
            <a
              href="#features"
              className="px-8 py-4 glass hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-secondary" />
              {t.hero.exploreFeatures}
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
  const { t, lang } = useI18n();

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

      <div className="relative py-2">
        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
        
        {/* Draggable playhead */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary cursor-grab hover:scale-110 transition-transform"
          style={{ left: '60%', transform: 'translate(-50%, -50%)' }}
        />
        
        {/* User message markers (blue dots) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" style={{ left: '8%' }} title={lang === 'zh' ? '用户消息' : 'User message'} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" style={{ left: '25%' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" style={{ left: '48%' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" style={{ left: '72%' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" style={{ left: '88%' }} />
        
        {/* Git commit markers (green squares) */}
        <div className="absolute top-1/2 w-2.5 h-2.5 bg-secondary rounded-sm shadow-sm" style={{ left: '18%', transform: 'translate(-50%, -50%)' }} title="Git commit" />
        <div className="absolute top-1/2 w-2.5 h-2.5 bg-secondary rounded-sm shadow-sm" style={{ left: '42%', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute top-1/2 w-2.5 h-2.5 bg-secondary rounded-sm shadow-sm" style={{ left: '65%', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute top-1/2 w-2.5 h-2.5 bg-secondary rounded-sm shadow-sm" style={{ left: '95%', transform: 'translate(-50%, -50%)' }} />

        <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
          <span>00:00</span>
          <span className="text-primary">12:34</span>
          <span>20:45</span>
        </div>
      </div>
      
      {/* Timeline legend */}
      <div className="flex items-center justify-center gap-6 mt-3 mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span>{lang === 'zh' ? '用户消息' : 'User'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-secondary rounded-sm" />
          <span>Git Commit</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
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
