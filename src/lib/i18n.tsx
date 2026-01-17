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
      downloadAlpha: 'Free Download',
      exploreFeatures: 'Explore Features',
      docs: 'Docs',
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
      timeTravel: {
        tagline: 'Code Time Travel',
        title: 'Time Travel',
        description: 'Drag the timeline, code instantly jumps to that Git snapshot.',
        detail1: 'Interactive timeline with drag-to-jump',
        detail2: 'Click any message, code view switches to that Git history',
        detail3: 'Blue dots for user messages, green squares for Git commits',
      },
      search: {
        tagline: 'Instant Search',
        title: 'Full-text Search',
        description: 'Cmd+K to search across all projects and sessions in seconds.',
        detail1: 'Cross-project, cross-session full-text retrieval',
        detail2: 'Search results with highlighted context',
        detail3: 'Click to jump directly to the message',
      },
      security: {
        tagline: 'Exclusive Feature',
        title: 'One-click Security Check',
        description: 'Scan before sharing. Sensitive info nowhere to hide.',
        detail1: 'Local Rust engine auto-detects sensitive data',
        detail2: 'Diff preview before redaction',
        detail3: 'One-click to redact all sensitive content',
      },
      privacy: {
        tagline: 'Absolute Security',
        title: 'Local & Private',
        description: 'All data stays on your machine. Zero cloud dependency.',
        detail1: 'No data leaves your device',
        detail2: 'High-performance Rust backend',
        detail3: 'Supports macOS, Windows, Linux',
      },
      insights: {
        tagline: 'Data Insights',
        title: 'Session Insights',
        description: 'Quantify your AI collaboration. Token usage at a glance.',
        detail1: 'Visualize token usage (input/output/cache)',
        detail2: 'Cross-session stats to understand your AI habits',
        detail3: 'Tool call frequency analysis to optimize workflow',
      },
      tokenUsage: 'Token Usage',
      input: 'Input',
      output: 'Output',
      cache: 'Cache',
      sessions: 'Sessions',
      messages: 'Messages',
      toolCalls: 'Tool Calls',
      promptsSaved: 'Prompts Saved',
      totalTokens: 'Total Tokens',
      toolUsage: 'Tool Usage',
      privacyMode: 'Privacy Mode',
      active: 'Active',
      localStorageOnly: 'Local Storage Only',
      cloudUploads: 'Cloud Uploads',
      localData: 'Local Data',
      stepOf: 'Step {current} of {total}',
      searchPlaceholder: 'Search messages...',
      searchResults: 'results',
      sensitiveFound: 'Sensitive items found',
      redactAll: 'Redact All',
      apiKey: 'API Key',
      password: 'Password',
      token: 'Token',
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
      networkError: 'Network error. Please check your connection.',
      serviceUnavailable: 'Service temporarily unavailable. Please try again later.',
      joining: 'Joining...',
      getEarlyAccess: 'Get Early Access',
      noSpam: 'No spam. Just launch updates and your referral rewards.',
      success: 'You\'re on the list!',
      shareLink: 'Share your link to move up in the queue.',
      referrals: 'referrals',
      code: 'Code',
      perks: 'Each referral earns you priority access + exclusive perks at launch.',
      checkStatusTitle: 'Check Your Referral Status',
      checkStatusSubtitle: 'Already signed up? View your referral count and link.',
      checkStatusPlaceholder: 'Enter your email',
      checkStatusButton: 'Check Status',
      checking: 'Checking...',
      notFound: 'Email not found. Sign up above to get started!',
      yourStats: 'Your Referral Stats',
      signedUp: 'Signed up',
      copy: 'Copy',
      copied: 'Copied!',
      // Early bird benefits
      earlyBirdTitle: 'Early Bird Perks',
      earlyBirdCondition: 'Top 50 subscribers OR 5 successful referrals',
      earlyBirdReward: 'Alpha Access Guaranteed',
      earlyBirdLimited: 'Limited spots. First come, first served.',
      benefitsUnlock: 'Unlock these perks',
      benefitLifetime: 'Lifetime Benefits',
      benefitLifetimeDesc: 'All future premium features (cloud sync, etc.) free forever',
      benefitCommercial: 'Commercial License',
      benefitCommercialDesc: 'Full commercial use rights included',
      benefitCommunity: 'Inner Circle',
      benefitCommunityDesc: 'Join Discord core channel, your feedback shapes the roadmap',
    },
    header: {
      features: 'Features',
      pricing: 'Pricing',
      docs: 'Docs',
      blog: 'Blog',
      faq: 'FAQ',
      security: 'Security',
      download: 'Download',
    },
    footer: {
      product: 'Product',
      resources: 'Resources',
      contact: 'Contact',
      features: 'Features',
      security: 'Security',
      docs: 'Docs',
      faq: 'FAQ',
      license: 'License',
      twitter: 'Twitter',
      discord: 'Discord',
      email: 'Email',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      tagline: 'Local-first. Privacy-focused. Built for developers.',
      copyright: '© 2026 Mantra Team',
    },
    pricing: {
      hero: {
        title: 'Free without limits.',
        subtitle: 'No sign-up required. No strings attached.',
        description: 'Mantra is a free AI session manager. Optional add-on services make it easy to sync and share your sessions.',
      },
      free: {
        title: 'Mantra is free',
        description: 'Use it for as long as you like, with unlimited sessions.',
        features: [
          'Unlimited sessions & projects',
          'Full-text search across all sessions',
          'Time travel with Git integration',
          'Local sanitizer engine',
          'BYOK (Bring Your Own Key)',
          'macOS, Windows, Linux',
        ],
        cta: 'Download for Free',
      },
      addons: {
        title: 'Optional add-on services',
        subtitle: 'Enhance your workflow with cloud services. Your data stays encrypted.',
        sync: {
          name: 'Sync',
          price: '$4',
          priceMonthly: '$5',
          period: '/month, billed annually',
          periodMonthly: '/month, billed monthly',
          description: 'Seamlessly sync your sessions across devices.',
          features: [
            'End-to-end encryption',
            'Cross-device session sync',
            'Cloud-managed Prompts & Skills',
            '1 year of version history',
          ],
          cta: 'Sign up',
          learnMore: 'Learn more',
        },
        publish: {
          name: 'Publish',
          price: '$8',
          priceMonthly: '$10',
          period: '/month/site, billed annually',
          periodMonthly: '/month/site, billed monthly',
          description: 'Share your sessions with the world.',
          features: [
            'One-click web replay links',
            'Custom domain & branding',
            'Password protection',
            'Built-in search & themes',
          ],
          cta: 'Sign up',
          learnMore: 'Learn more',
        },
      },
      support: {
        title: '100% user-supported',
        subtitle: 'Mantra is made by an indie developer. No investors, no ads, no tracking.',
        catalyst: {
          name: 'Pioneer',
          price: '$49',
          period: 'one-time',
          description: 'Get insider access and support development.',
          features: [
            'Early access to new features',
            'Founding member badge',
            'Discord community perks',
            '10GB E2E encrypted backup',
            '1-year Sync included',
            'Lifetime 50% off Sync renewal',
          ],
          cta: 'Get Pioneer',
          limited: '1,000 seats',
        },
        commercial: {
          name: 'Commercial',
          price: '$50',
          period: '/user/year',
          description: 'Use Mantra for work in a company or as a freelancer.',
          features: [
            'Use in for-profit organizations',
            'Priority email support',
            'Invoice provided',
          ],
          cta: 'Buy license',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is Mantra really free?',
            a: 'Yes. All local features are free forever with no limitations. Sync and Publish are optional paid services for those who want cloud features.',
          },
          {
            q: 'Do I need to pay for commercial use?',
            a: 'If you use Mantra for work in a company of 2 or more people, a commercial license is required. Solo freelancers and students can use Personal for free.',
          },
          {
            q: 'Does my data stay on my device?',
            a: 'Yes. Core features work 100% offline. Sync and Publish use end-to-end encryption - we cannot read your data.',
          },
          {
            q: 'What is BYOK?',
            a: 'Bring Your Own Key. Use your own API keys for OpenAI, Anthropic, etc. Keys never leave your machine.',
          },
          {
            q: 'Can I get a refund?',
            a: 'Yes, within 7 days of purchase for Sync/Publish, and within 14 days for Pioneer/Commercial licenses.',
          },
        ],
      },
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
      downloadAlpha: '免费下载',
      exploreFeatures: '探索功能',
      docs: '文档',
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
      timeTravel: {
        tagline: '代码时光穿越',
        title: '时间旅行',
        description: '拖拽时间轴，代码瞬间穿越到那个 Git 快照。',
        detail1: '可拖拽时间轴，跳转任意时间点',
        detail2: '点击消息，代码视图自动切换到那刻的 Git 历史',
        detail3: '蓝色圆点标记用户消息，绿色方块标记 Git 提交',
      },
      search: {
        tagline: '秒级定位',
        title: '全文搜索',
        description: 'Cmd+K 跨项目、跨会话全文检索。',
        detail1: '跨项目、跨会话的全文检索',
        detail2: '搜索结果高亮显示上下文',
        detail3: '点击直接跳转到对应消息',
      },
      security: {
        tagline: '独家功能',
        title: '一键安全检查',
        description: '分享前扫描，敏感信息无处遁形。',
        detail1: '本地 Rust 引擎自动识别敏感信息',
        detail2: 'Diff 预览确认后一键脱敏',
        detail3: '一键脱敏所有敏感内容',
      },
      privacy: {
        tagline: '绝对安全',
        title: '本地优先',
        description: '数据永不离开你的电脑，核心功能完全离线可用。',
        detail1: '数据不离开你的设备',
        detail2: '高性能 Rust 后端',
        detail3: '支持 macOS、Windows、Linux',
      },
      insights: {
        tagline: '数据洞察',
        title: '会话统计',
        description: '量化你的 AI 协作，Token 消耗一目了然。',
        detail1: '可视化 Token 消耗（输入/输出/缓存）',
        detail2: '跨会话统计，掌握 AI 使用习惯',
        detail3: '工具调用频率分析，优化工作流',
      },
      tokenUsage: 'Token 使用量',
      input: '输入',
      output: '输出',
      cache: '缓存',
      sessions: '会话',
      messages: '消息',
      toolCalls: '工具调用',
      promptsSaved: '已保存 Prompts',
      totalTokens: '总 Tokens',
      toolUsage: '工具使用',
      privacyMode: '隐私模式',
      active: '已启用',
      localStorageOnly: '仅本地存储',
      cloudUploads: '云端上传',
      localData: '本地数据',
      stepOf: '步骤 {current} / {total}',
      searchPlaceholder: '搜索消息...',
      searchResults: '个结果',
      sensitiveFound: '发现敏感项',
      redactAll: '一键脱敏',
      apiKey: 'API 密钥',
      password: '密码',
      token: '令牌',
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
      networkError: '网络错误，请检查网络连接。',
      serviceUnavailable: '服务暂时不可用，请稍后重试。',
      joining: '加入中...',
      getEarlyAccess: '获取抢先体验',
      noSpam: '无垃圾邮件。只有发布更新和推荐奖励通知。',
      success: '你已加入名单！',
      shareLink: '分享链接，提升排队位置。',
      referrals: '次推荐',
      code: '邀请码',
      perks: '每次成功推荐可获得优先访问权 + 发布时的专属福利。',
      checkStatusTitle: '查看推荐状态',
      checkStatusSubtitle: '已经注册？查看你的推荐数量和链接。',
      checkStatusPlaceholder: '输入你的邮箱',
      checkStatusButton: '查看状态',
      checking: '查询中...',
      notFound: '未找到该邮箱。请先在上方注册！',
      yourStats: '你的推荐统计',
      signedUp: '注册时间',
      copy: '复制',
      copied: '已复制！',
      // Early bird benefits
      earlyBirdTitle: '早鸟专属权益',
      earlyBirdCondition: '前 50 名订阅 或 成功推荐 5 位好友',
      earlyBirdReward: '直通 Alpha 测试',
      earlyBirdLimited: '名额有限，先到先得。',
      benefitsUnlock: '达成条件即可获得',
      benefitLifetime: '终身权益',
      benefitLifetimeDesc: '未来所有增值功能（高级云同步等）永久免费',
      benefitCommercial: '商用许可',
      benefitCommercialDesc: '获得完整商用授权，无需额外付费',
      benefitCommunity: '共建渠道',
      benefitCommunityDesc: '加入 Discord 核心用户频道，反馈直达团队',
    },
    header: {
      features: '功能',
      pricing: '定价',
      docs: '文档',
      blog: '博客',
      faq: '常见问题',
      security: '安全',
      download: '下载',
    },
    footer: {
      product: '产品',
      resources: '资源',
      contact: '联系我们',
      features: '功能特性',
      security: '安全机制',
      docs: '文档',
      faq: '常见问题',
      license: '许可证',
      twitter: 'Twitter',
      discord: 'Discord',
      email: '邮箱',
      privacy: '隐私政策',
      terms: '服务条款',
      tagline: '本地优先。注重隐私。为开发者打造。',
      copyright: '© 2026 Mantra Team',
    },
    pricing: {
      hero: {
        title: '免费，无限制。',
        subtitle: '无需注册，没有任何附加条件。',
        description: 'Mantra 是一款免费的 AI 会话管理器。可选的增值服务让你轻松同步和分享会话。',
      },
      free: {
        title: 'Mantra 完全免费',
        description: '随意使用，不限会话数量。',
        features: [
          '无限会话和项目',
          '跨会话全文搜索',
          'Git 集成时间旅行',
          '本地脱敏引擎',
          'BYOK（自带 API Key）',
          '支持 macOS、Windows、Linux',
        ],
        cta: '免费下载',
      },
      addons: {
        title: '可选增值服务',
        subtitle: '使用云服务增强工作流。数据始终加密。',
        sync: {
          name: 'Sync 同步',
          price: '$4',
          priceMonthly: '$5',
          period: '/月，按年付费',
          periodMonthly: '/月，按月付费',
          description: '跨设备无缝同步你的会话。',
          features: [
            '端到端加密',
            '跨设备会话同步',
            '云端管理 Prompts 和 Skills',
            '1 年版本历史',
          ],
          cta: '立即订阅',
          learnMore: '了解更多',
        },
        publish: {
          name: 'Publish 分享',
          price: '$8',
          priceMonthly: '$10',
          period: '/月/站点，按年付费',
          periodMonthly: '/月/站点，按月付费',
          description: '与世界分享你的会话。',
          features: [
            '一键生成 Web 回放链接',
            '自定义域名和品牌',
            '密码保护',
            '内置搜索和主题',
          ],
          cta: '立即订阅',
          learnMore: '了解更多',
        },
      },
      support: {
        title: '100% 用户支持',
        subtitle: 'Mantra 由独立开发者打造。没有投资人，没有广告，没有追踪。',
        catalyst: {
          name: 'Pioneer 先锋',
          price: '$49',
          period: '一次性',
          description: '获得内测资格，支持产品开发。',
          features: [
            '优先体验新功能',
            '创始成员勋章',
            'Discord 社区特权',
            '10GB 端到端加密备份',
            '首年 Sync 服务赠送',
            '终身 Sync 续费 5 折',
          ],
          cta: '加入 Pioneer',
          limited: '限量 1,000 席位',
        },
        commercial: {
          name: 'Commercial 商用',
          price: '$50',
          period: '/人/年',
          description: '在公司或作为自由职业者使用 Mantra。',
          features: [
            '可在营利性组织中使用',
            '优先邮件支持',
            '提供发票',
          ],
          cta: '购买许可',
        },
      },
      faq: {
        title: '常见问题',
        items: [
          {
            q: 'Mantra 真的免费吗？',
            a: '是的。所有本地功能永久免费，没有任何限制。Sync 和 Publish 是可选的付费服务，适合需要云功能的用户。',
          },
          {
            q: '商业使用需要付费吗？',
            a: '如果你在 2 人或以上的公司中使用 Mantra，需要购买商用许可。个人自由职业者和学生可以免费使用个人版。',
          },
          {
            q: '我的数据会保留在本地吗？',
            a: '是的。核心功能 100% 离线可用。Sync 和 Publish 使用端到端加密——我们无法读取你的数据。',
          },
          {
            q: '什么是 BYOK？',
            a: 'Bring Your Own Key，自带密钥。使用你自己的 OpenAI、Anthropic 等 API Key。密钥永远不会离开你的设备。',
          },
          {
            q: '可以退款吗？',
            a: '可以。Sync/Publish 支持 7 天内退款，Pioneer/Commercial 许可支持 14 天内退款。',
          },
        ],
      },
    },
  },
} as const;

// Use structural type instead of literal type to allow different translations
type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};
type TranslationType = DeepString<typeof translations.en>;

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
