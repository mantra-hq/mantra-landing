import { Quote, Lightbulb, Users } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export function MakerStory() {
  const { t } = useI18n();

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />

          <div className="relative">
            <Quote className="w-12 h-12 text-primary/30 mb-6" />

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Lightbulb className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">{t.maker.origin}</span>
                </div>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  {t.maker.originQuote}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <Lightbulb className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">{t.maker.insight}</span>
                </div>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  {t.maker.insightQuote}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium uppercase tracking-wide">{t.maker.invitation}</span>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {t.maker.invitationText}
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <div className="font-semibold text-white">{t.maker.team}</div>
                <div className="text-sm text-gray-500">{t.maker.teamDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
