import { Link } from 'react-router-dom';
import { Download, Sparkles } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { getLocalizedUrls } from '../lib/config';
import mantraIcon from '../assets/icon-mantra.png';

export function Hero() {
  const { t, lang } = useI18n();

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

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t.hero.badge}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white">
            {t.hero.title}
          </h1>

          {/* Subtitle: three keywords with gradient */}
          <p className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">{t.hero.subtitle}</span>
          </p>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/download?utm_source=landing&utm_medium=hero"
              className="group relative px-8 py-4 bg-primary hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 glow-primary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t.hero.downloadAlpha}
            </Link>
            <a
              href={getLocalizedUrls(lang).quickstart}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 glass hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              {t.hero.quickStart}
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500">{t.hero.downloadSubline}</p>
          <p className="mt-2 text-xs text-gray-600">{t.hero.trustLine}</p>
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
    <div className="glass-dark rounded-2xl max-w-3xl mx-auto overflow-hidden">
      {/* Window title bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <span className="text-sm text-gray-500 font-mono">session_2024_01_15.jsonl</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Timeline track */}
        <div className="relative py-2">
          <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </div>

          {/* Playhead */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-primary"
            style={{ left: '60%', transform: 'translate(-50%, -50%)' }}
          />

          {/* User message markers */}
          {[8, 25, 48, 72, 88].map((pos, idx) => (
            <div key={`u${idx}`} className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm" style={{ left: `${pos}%` }} />
          ))}

          {/* Git commit markers */}
          {[18, 42, 65, 95].map((pos, idx) => (
            <div key={`g${idx}`} className="absolute top-1/2 w-2.5 h-2.5 bg-secondary rounded-sm shadow-sm" style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }} />
          ))}

          <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
            <span>00:00</span>
            <span className="text-primary">12:34</span>
            <span>20:45</span>
          </div>
        </div>

        {/* Timeline legend */}
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>{lang === 'zh' ? '用户消息' : 'User'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-secondary rounded-sm" />
            <span>Git Commit</span>
          </div>
        </div>

        {/* Mini code snapshot preview */}
        <div className="rounded-lg bg-dark-300/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-gray-400">src/auth/middleware.js</span>
            <span className="text-[10px] text-gray-600 font-mono">@ 12:34</span>
          </div>
          <div className="font-mono text-[11px] leading-relaxed space-y-0.5">
            <div className="px-1.5 py-px rounded-sm bg-[var(--diff-remove)]">
              <span className="text-red-400 select-none">- </span>
              <span className="text-red-400">{"const basicAuth = require('./basic');"}</span>
            </div>
            <div className="px-1.5 py-px rounded-sm bg-[var(--diff-add)]">
              <span className="text-green-400 select-none">+ </span>
              <span className="text-green-400">{"const jwt = require('jsonwebtoken');"}</span>
            </div>
            <div className="px-1.5 py-px rounded-sm bg-[var(--diff-add)]">
              <span className="text-green-400 select-none">+ </span>
              <span className="text-green-400">{'const verifyToken = (req, res, next) => {'}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
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
    </div>
  );
}
