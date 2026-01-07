import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'zh';

const translations = {
  en: {
    hero: {
      badge: 'Alpha Preview Available',
      title1: 'AI',
      title2: 'Coding Sessions',
      title3: 'Time Machine',
      subtitle: 'Replay context. Filter noise. Master the craft.',
      description: 'Manage your',
      descriptionEnd: 'logs and extract your personal coding mantras.',
      downloadAlpha: 'Download Alpha',
      exploreFeatures: 'Explore Features',
      messages: 'Messages',
      toolCalls: 'Tool Calls',
      tokens: 'Tokens',
    },
    tools: {
      title: 'Works With Your',
      titleHighlight: 'Favorite Tools',
      subtitle: 'Import logs from the leading AI coding assistants',
      supported: 'Supported',
      comingSoon: 'Coming Soon',
      soon: 'Soon',
    },
    features: {
      title: 'Built for',
      titleHighlight: 'Developers',
      subtitle: 'Debug your thinking process. Extract patterns. Level up your AI collaboration.',
      replay: {
        tagline: 'Recover Memory',
        title: 'Immersive Replay',
        description: 'Recreate the exact conversation and code context from any moment.',
        detail1: 'Step-by-step playback with timeline control',
        detail2: 'See code changes sync with conversations',
        detail3: 'Jump to any tool call or decision point',
      },
      refine: {
        tagline: 'Transform Knowledge',
        title: 'Refine & Analytics',
        description: 'Extract wisdom from chaos. Turn sessions into reusable assets.',
        detail1: 'Human/AI collaborative summaries with parallel notes layer',
        detail2: 'Save Prompts, Rules, MCPs & Skills to personal vault',
        detail3: 'Visualize command complexity, token costs, tool usage & errors',
      },
      privacy: {
        tagline: 'Absolute Security',
        title: 'Local & Private',
        description: 'All data stays on your machine. Zero cloud dependency.',
        detail1: 'No data leaves your device',
        detail2: 'Privacy highlight mode for sensitive content',
        detail3: 'Audit-ready local storage',
      },
      promptsSaved: 'Prompts Saved',
      totalTokens: 'Total Tokens',
      toolUsage: 'Tool Usage',
      privacyMode: 'Privacy Mode',
      active: 'Active',
      localStorageOnly: 'Local Storage Only',
      cloudUploads: 'Cloud Uploads',
      localData: 'Local Data',
      stepOf: 'Step {current} of {total}',
    },
    maker: {
      origin: 'The Origin',
      originQuote: '"I realized I had GBs of AI logs on disk, but couldn\'t learn anything from them."',
      insight: 'The Insight',
      insightQuote: '"Code is the output. But the prompt chain is the wisdom."',
      invitation: 'The Invitation',
      invitationText: 'We built this to help developers debug their thinking process. It\'s local-first, privacy-focused, and made for power users. Welcome to try it.',
      team: 'The Mantra Team',
      teamDesc: 'Building tools for AI-native developers',
    },
    signup: {
      referralBanner: 'You were invited by a friend!',
      title: 'Join the',
      titleHighlight: 'Early Access',
      subtitle: 'Be the first to experience the AI coding time machine.',
      placeholder: 'developer@example.com',
      alreadyRegistered: 'This email is already registered.',
      error: 'Something went wrong. Please try again.',
      joining: 'Joining...',
      getEarlyAccess: 'Get Early Access',
      noSpam: 'No spam. Just launch updates and your referral rewards.',
      success: 'You\'re on the list!',
      shareLink: 'Share your link to move up in the queue.',
      referrals: 'referrals',
      code: 'Code',
      perks: 'Each referral earns you priority access + exclusive perks at launch.',
    },
    footer: {
      features: 'Features',
      earlyAccess: 'Early Access',
      tagline: 'Local-first. Privacy-focused. Built for developers.',
    },
  },
  zh: {
    hero: {
      badge: 'Alpha 预览版已发布',
      title1: 'AI',
      title2: '编程会话',
      title3: '时光机',
      subtitle: '回放上下文，滤除噪点，掌握心法。',
      description: '管理你的',
      descriptionEnd: '日志，提炼属于你的编程心法。',
      downloadAlpha: '下载 Alpha 版',
      exploreFeatures: '探索功能',
      messages: '消息',
      toolCalls: '工具调用',
      tokens: 'Tokens',
    },
    tools: {
      title: '支持你',
      titleHighlight: '喜爱的工具',
      subtitle: '从主流 AI 编程助手导入日志',
      supported: '已支持',
      comingSoon: '即将支持',
      soon: '即将',
    },
    features: {
      title: '为',
      titleHighlight: '开发者',
      subtitle: 'Debug 你的思考过程。提炼模式。提升 AI 协作能力。',
      replay: {
        tagline: '找回记忆',
        title: '沉浸式回放',
        description: '重现当时的对话与代码上下文。',
        detail1: '支持时间轴控制的逐步回放',
        detail2: '代码变更与对话同步展示',
        detail3: '跳转至任意工具调用或决策点',
      },
      refine: {
        tagline: '转化知识',
        title: '提炼与统计',
        description: '从混乱中提取智慧，将会话转化为可复用资产。',
        detail1: '人工/AI 协同摘要，生成平行精华笔记层',
        detail2: '沉淀 Prompts、Rules、MCP 与 Skills 至个人库',
        detail3: '可视化命令复杂度、Token 成本、工具分布及错误分析',
      },
      privacy: {
        tagline: '绝对安全',
        title: '本地与隐私',
        description: '所有数据保留在本地，无泄密风险。',
        detail1: '数据不离开你的设备',
        detail2: '隐私高亮核查模式',
        detail3: '审计就绪的本地存储',
      },
      promptsSaved: '已保存 Prompts',
      totalTokens: '总 Tokens',
      toolUsage: '工具使用',
      privacyMode: '隐私模式',
      active: '已启用',
      localStorageOnly: '仅本地存储',
      cloudUploads: '云端上传',
      localData: '本地数据',
      stepOf: '步骤 {current} / {total}',
    },
    maker: {
      origin: '起源',
      originQuote: '"我意识到磁盘里存了几个 GB 的 AI 日志，但没法从中学习任何东西。"',
      insight: '顿悟',
      insightQuote: '"代码是结果，但 Prompt 链才是智慧。"',
      invitation: '邀请',
      invitationText: '我们做这个是为了帮开发者 Debug 自己的思考过程。它是本地优先的，注重隐私，专为深度用户打造。欢迎尝试。',
      team: 'Mantra 团队',
      teamDesc: '为 AI 原生开发者打造工具',
    },
    signup: {
      referralBanner: '你是被朋友邀请来的！',
      title: '加入',
      titleHighlight: '抢先体验',
      subtitle: '成为第一批体验 AI 编程时光机的用户。',
      placeholder: 'developer@example.com',
      alreadyRegistered: '该邮箱已注册。',
      error: '出了点问题，请重试。',
      joining: '加入中...',
      getEarlyAccess: '获取抢先体验',
      noSpam: '无垃圾邮件。只有发布更新和推荐奖励通知。',
      success: '你已加入名单！',
      shareLink: '分享链接，提升排队位置。',
      referrals: '次推荐',
      code: '邀请码',
      perks: '每次成功推荐可获得优先访问权 + 发布时的专属福利。',
    },
    footer: {
      features: '功能特性',
      earlyAccess: '抢先体验',
      tagline: '本地优先。注重隐私。为开发者打造。',
    },
  },
} as const;

type TranslationType = typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationType;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getSystemLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'zh';
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('mantra-lang');
    if (saved === 'en' || saved === 'zh') return saved;
    return getSystemLanguage();
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('mantra-lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
