import { useState, useEffect } from 'react';
import { Mail, Check, Copy, Users, Gift, Loader2, Infinity, Briefcase, MessageCircle } from 'lucide-react';
import { generateReferralCode, getReferralFromUrl } from '../lib/supabase';
import { useI18n } from '../lib/i18n';

interface SignupState {
  status: 'idle' | 'loading' | 'success' | 'error';
  referralCode?: string;
  referralCount?: number;
  error?: string;
}

export function EmailSignup() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SignupState>({ status: 'idle' });
  const [copied, setCopied] = useState(false);
  const referredBy = getReferralFromUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state.status === 'loading') return;

    setState({ status: 'loading' });

    const referralCode = generateReferralCode();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          referral_code: referralCode,
          referred_by: referredBy,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'already_registered') {
          setState({ status: 'error', error: t.signup.alreadyRegistered });
        } else {
          setState({ status: 'error', error: t.signup.error });
        }
        return;
      }

      setState({
        status: 'success',
        referralCode,
        referralCount: 0,
      });
    } catch {
      setState({ status: 'error', error: t.signup.error });
    }
  };

  const copyReferralLink = () => {
    if (!state.referralCode) return;
    const link = `https://mantra.gonewx.com?ref=${state.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (referredBy) {
      const banner = document.getElementById('referral-banner');
      if (banner) banner.classList.remove('hidden');
    }
  }, [referredBy]);

  return (
    <section id="signup" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6">
        {referredBy && (
          <div id="referral-banner" className="mb-8 p-4 rounded-xl glass border-secondary/30 text-center max-w-2xl mx-auto">
            <Gift className="w-5 h-5 text-secondary inline mr-2" />
            <span className="text-gray-300">{t.signup.referralBanner}</span>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.signup.title} <span className="text-gradient">{t.signup.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400">
            {t.signup.subtitle}
          </p>
        </div>

        {/* Signup Form - Centered */}
        <div className="max-w-xl mx-auto mb-12">
          {state.status === 'success' ? (
            <SuccessState
              referralCode={state.referralCode!}
              referralCount={state.referralCount!}
              copied={copied}
              onCopy={copyReferralLink}
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.signup.placeholder}
                    className="w-full pl-12 pr-4 py-4 bg-dark-300 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    disabled={state.status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={state.status === 'loading' || !email}
                  className="px-6 py-4 bg-primary hover:bg-primary-600 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 glow-primary whitespace-nowrap"
                >
                  {state.status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      {t.signup.getEarlyAccess}
                    </>
                  )}
                </button>
              </div>

              {state.status === 'error' && (
                <p className="text-red-400 text-sm text-center">{state.error}</p>
              )}

              <p className="text-center text-sm text-gray-500">
                {t.signup.noSpam}
              </p>
            </form>
          )}
        </div>

        {/* Early bird section header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/20" />
          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
            <Gift className="w-4 h-4 text-secondary" />
            <span>{t.signup.earlyBirdTitle}</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/20" />
        </div>

        {/* Entry condition banner */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center">
            <p className="text-gray-300 text-sm mb-1">{t.signup.earlyBirdCondition}</p>
            <p className="text-lg font-semibold text-gradient">{t.signup.earlyBirdReward}</p>
            <p className="text-xs text-gray-500 mt-1">{t.signup.earlyBirdLimited}</p>
          </div>
        </div>

        {/* Benefits - Horizontal 3-column */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-dark rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/20 flex items-center justify-center mb-4">
              <Infinity className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-white mb-2">{t.signup.benefitLifetime}</h4>
            <p className="text-sm text-gray-400">{t.signup.benefitLifetimeDesc}</p>
          </div>

          <div className="glass-dark rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="font-semibold text-white mb-2">{t.signup.benefitCommercial}</h4>
            <p className="text-sm text-gray-400">{t.signup.benefitCommercialDesc}</p>
          </div>

          <div className="glass-dark rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">{t.signup.benefitCommunity}</h4>
            <p className="text-sm text-gray-400">{t.signup.benefitCommunityDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface SuccessStateProps {
  referralCode: string;
  referralCount: number;
  copied: boolean;
  onCopy: () => void;
}

function SuccessState({ referralCode, referralCount, copied, onCopy }: SuccessStateProps) {
  const { t } = useI18n();
  const referralLink = `https://mantra.gonewx.com?ref=${referralCode}`;

  return (
    <div className="glass-dark rounded-2xl p-8 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
        <Check className="w-8 h-8 text-secondary" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-2">{t.signup.success}</h3>
        <p className="text-gray-400">{t.signup.shareLink}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 p-3 bg-dark-300 rounded-xl">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-300 font-mono outline-none"
          />
          <button
            onClick={onCopy}
            className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span><strong className="text-white">{referralCount}</strong> {t.signup.referrals}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span>{t.signup.code}: <strong className="text-primary font-mono">{referralCode}</strong></span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <p className="text-sm text-gray-500">
          {t.signup.perks}
        </p>
      </div>
    </div>
  );
}
