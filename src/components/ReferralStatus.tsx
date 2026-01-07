import { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { supabase } from '../lib/supabase';

interface ReferralStats {
  email: string;
  referral_code: string;
  referral_count: number;
  created_at: string;
}

export function ReferralStatus() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setStats(null);

    try {
      const { data, error: queryError } = await supabase.rpc('get_referral_stats_by_email', {
        p_email: email.toLowerCase().trim()
      });

      if (queryError) throw queryError;

      if (!data || data.length === 0) {
        setError(t.signup.notFound);
      } else {
        setStats(data[0]);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(t.signup.error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!stats) return;

    const referralUrl = `https://mantra.gonewx.com?ref=${stats.referral_code}`;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">
          {t.signup.checkStatusTitle}
        </h2>
        <p className="text-gray-400">
          {t.signup.checkStatusSubtitle}
        </p>
      </div>

      <form onSubmit={handleCheck} className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.signup.checkStatusPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? t.signup.checking : t.signup.checkStatusButton}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
          {error}
        </div>
      )}

      {stats && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {t.signup.yourStats}
            </h3>
            <p className="text-gray-400 text-sm">
              {t.signup.signedUp}: {formatDate(stats.created_at)}
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                {stats.referral_count}
              </div>
              <div className="text-gray-400">
                {t.signup.referrals}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-400">
                  {t.signup.code}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg transition-all text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t.signup.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {t.signup.copy}
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono text-white bg-black/20 rounded-lg p-4 break-all">
                https://mantra.gonewx.com?ref={stats.referral_code}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-sm text-center">
            {t.signup.perks}
          </div>
        </div>
      )}
    </div>
  );
}
