import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'zh';

const translations = {
  en: {
    hero: {
      badge: 'MCP Hub · Skills Hub Now Available',
      title: 'Mantra',
      subtitle: 'Replay · Control · Secure',
      description: 'Replay AI coding sessions, manage MCP services and Skills in one place, detect sensitive content before it leaks. Everything local. Everything yours.',
      downloadAlpha: 'Free Download',
      exploreFeatures: 'Explore Features',
      docs: 'Docs',
      messages: 'Messages',
      toolCalls: 'Tool Calls',
      tokens: 'Tokens',
    },
    tools: {
      title: 'One app for all your',
      titleHighlight: 'AI coding tools',
      subtitle: 'Session replay + MCP service management, unified',
      supported: 'Supported',
      comingSoon: 'Coming Soon',
      soon: 'Soon',
      capabilityReplay: 'Session Replay',
      capabilityMcp: 'MCP Service Management',
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
    pillars: {
      sectionLabel: 'Core Features',
      connect: {
        label: '01 · Replay',
        title: 'See What',
        titleHighlight: 'AI Did',
        description: 'AI changed twenty files yesterday, and today there\'s a bug — rewind and find out',
        points: [
          {
            title: 'Session Replay',
            description: 'Complete replay of every AI conversation turn. Every message is anchored to the exact Git state. Revisit any decision point.',
          },
          {
            title: 'Git Time Travel',
            description: 'Drag the timeline, code instantly jumps to that Git snapshot. Click any message, code view switches to the state at that moment.',
          },
          {
            title: 'Distill to What Matters',
            description: 'Extract key decisions and code changes from hundreds of conversation turns. Cut the noise, keep the insights.',
          },
        ],
      },
      enhance: {
        label: '02 · Control',
        title: 'Your AI Tool',
        titleHighlight: 'Control Center',
        description: 'MCP services and Skills, unified in one place. Configure once, share everywhere.',
        points: [
          {
            title: 'MCP Unified Gateway',
            description: 'Add MCP services in Mantra — Claude Code, Cursor, Gemini CLI, Codex, and Antigravity automatically share the same tools and context.',
          },
          {
            title: 'Skills Hub',
            description: 'Manage all your Skills in one place. Associate and distribute by project. Stop duplicating the same rules across every tool.',
          },
          {
            title: 'Smart Takeover',
            description: 'Import existing configs from Claude Code or Cursor in one click. Diff compare, shadow preview, then confirm. Atomic backups, rollback anytime.',
          },
          {
            title: 'Built-in Inspector',
            description: 'Tool Explorer to browse all available tools. Tool Tester for one-click verification. RPC Log Viewer to trace every request in real time.',
          },
        ],
        tagline: 'Runs locally. Open protocol. Your MCP services and Skills, your rules.',
      },
      simplify: {
        label: '03 · Secure',
        title: 'Make AI Coding',
        titleHighlight: 'Safer',
        description: 'Are there database passwords in AI-generated code? Check now',
        points: [
          {
            title: 'Sensitive Content Detection',
            description: 'Local Rust engine automatically detects API keys, passwords, tokens, and other sensitive data in your AI sessions.',
          },
          {
            title: 'One-click Redaction',
            description: 'Preview diffs before redaction, one-click to clean up all sensitive content. Share with confidence.',
          },
          {
            title: 'VirusTotal Skills Scanning (Coming Soon)',
            description: 'Verify third-party Skills security online before installing. Know if it\'s safe before it touches your project.',
          },
        ],
      },
      cta: {
        label: 'All features above are free',
        button: 'Free Download',
      },
    },
    mcpHub: {
      label: 'MCP Hub',
      title: 'Your AI Tool',
      titleHighlight: 'Control Center',
      description: 'MCP (Model Context Protocol) connects AI tools to external services. Mantra makes it simple: one config, one manager, one debugger.',
      points: [
        {
          title: 'Configure once, use everywhere',
          description: 'Add MCP services in Mantra, all AI tools share them automatically. No more duplicate configs across tools.',
        },
        {
          title: 'Smart Takeover',
          description: 'Import existing configs from Claude Code / Cursor in one click. Diff compare → Shadow preview → Confirm. Atomic backups, rollback anytime.',
        },
        {
          title: 'Built-in Inspector',
          description: 'Tool Explorer to browse all available tools. Tool Tester for one-click verification. RPC Log Viewer to trace every request in real time.',
        },
        {
          title: 'Security & Permissions',
          description: 'Encrypted environment variables. Secure OAuth credentials. Project-level tool policies — precise control over which tools are available where.',
        },
      ],
      tagline: 'Runs locally. Open protocol. Your MCP services, your rules.',
    },
    maker: {
      origin: 'The Origin',
      originQuote: '"I was writing hundreds of lines with AI every day. When something broke, I wanted to look back — what exactly did AI do? Why that change? The entire process was gone."',
      insight: 'The Insight',
      insightQuote: '"Code is just the output. AI\'s decision chain is what\'s truly worth keeping. And the MCP configs and Skills scattered across five tools, the secrets hiding in conversations — no developer should have to figure this out alone."',
      invitation: 'The Invitation',
      invitationText: 'Mantra lets you replay every step of AI coding, manage all tool configs in one place, and auto-detect sensitive content before sharing. Everything runs locally. Your data never leaves your device.',
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
      mcpHub: 'MCP Hub',
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
      reddit: 'Reddit',
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
        description: 'Mantra is a free AI coding tool manager. Optional add-on services for sync and sharing.',
      },
      free: {
        title: 'Mantra is free',
        description: 'Use it for as long as you like, with unlimited sessions.',
        features: [
          'Unlimited sessions & projects',
          'MCP Hub (unified config + Inspector)',
          'Git-integrated time travel',
          'Cross-project full-text search',
          'Local redaction engine',
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
      badge: 'MCP Hub · Skills Hub 全新上线',
      title: 'Mantra 心法',
      subtitle: '回放 · 掌控 · 安全',
      description: '回看 AI 编程的每一步，统一管理 MCP 服务和 Skills，守住安全底线。一切发生在本地，一切由你掌控。',
      downloadAlpha: '免费下载',
      exploreFeatures: '探索功能',
      docs: '文档',
      messages: '消息',
      toolCalls: '工具调用',
      tokens: 'Tokens',
    },
    tools: {
      title: '一个应用，连接你的所有',
      titleHighlight: 'AI 编程工具',
      subtitle: '会话回放 + MCP 服务管理，统一体验',
      supported: '已支持',
      comingSoon: '即将支持',
      soon: '即将',
      capabilityReplay: '会话回放',
      capabilityMcp: 'MCP 服务管理',
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
    pillars: {
      sectionLabel: '核心功能',
      connect: {
        label: '01 · 回放',
        title: '回看 AI',
        titleHighlight: '做了什么',
        description: '昨天 AI 改了二十个文件，今天出 Bug 了——别慌，倒带看看',
        points: [
          {
            title: '会话回放',
            description: '完整回放每一轮 AI 对话，每条消息精确锚定在 Git 历史上。回到任何一个决策瞬间。',
          },
          {
            title: 'Git 时间旅行',
            description: '拖动时间轴，代码自动跳转到那一刻的 Git 状态。点击任意消息，代码视图自动切换到该时刻的文件状态。',
          },
          {
            title: '从冗长对话中提炼精华',
            description: '从上百轮对话中提取关键决策和代码变更，去掉噪音，留下真正有价值的洞察。',
          },
        ],
      },
      enhance: {
        label: '02 · 掌控',
        title: '你的 AI 工具',
        titleHighlight: '中控台',
        description: 'MCP 服务和 Skills，统一管理。配置一次，所有工具共享。',
        points: [
          {
            title: 'MCP 统一网关',
            description: '在 Mantra 中配置 MCP 服务，Claude Code、Cursor、Gemini CLI、Codex、Antigravity 自动共享相同的工具和上下文。',
          },
          {
            title: 'Skills Hub',
            description: '集中管理所有 Skills，按项目关联和分发，告别在每个工具里重复配置。',
          },
          {
            title: '智能接管',
            description: '一键导入 Claude Code / Cursor 现有配置。Diff 对比 → Shadow 预览 → 确认应用。原子性备份，随时回滚。',
          },
          {
            title: '内置 Inspector',
            description: '工具浏览器查看所有可用工具。工具测试器一键验证。RPC 日志实时追踪每一次请求。',
          },
        ],
        tagline: '本地运行。开源协议。你的 MCP 服务和 Skills，你做主。',
      },
      simplify: {
        label: '03 · 安全',
        title: '让 AI 编程',
        titleHighlight: '更安全',
        description: 'AI 生成的代码里有没有你的数据库密码？查一下',
        points: [
          {
            title: '敏感内容检测',
            description: '本地 Rust 引擎自动识别会话中的 API Key、密码、Token 等敏感数据。',
          },
          {
            title: '一键脱敏',
            description: 'Diff 预览确认后一键清理所有敏感内容，放心分享你的 AI 编程过程。',
          },
          {
            title: 'VirusTotal Skills 安全检测（即将上线）',
            description: '安装第三方 Skills 前在线验证安全性，让你在引入前就知道是否可信。',
          },
        ],
      },
      cta: {
        label: '以上功能全部免费',
        button: '免费下载',
      },
    },
    mcpHub: {
      label: 'MCP Hub',
      title: '你的 AI 工具',
      titleHighlight: '中控台',
      description: 'MCP（模型上下文协议）让 AI 工具连接外部服务。Mantra 把它变得简单：统一配置，统一管理，统一调试。',
      points: [
        {
          title: '配置一次，处处可用',
          description: '在 Mantra 中添加 MCP 服务，所有 AI 工具自动共享。告别在每个工具里重复配置的痛苦。',
        },
        {
          title: 'Smart Takeover 智能接管',
          description: '一键导入 Claude Code / Cursor 现有配置。Diff 对比 → Shadow 预览 → 确认应用。原子性备份，随时回滚。',
        },
        {
          title: '内置 Inspector 调试器',
          description: '工具浏览器查看所有可用工具。工具测试器一键验证调用。RPC 日志实时追踪每一次请求。',
        },
        {
          title: '安全与权限',
          description: '环境变量加密存储。OAuth 凭证安全管理。项目级工具权限——哪些项目能用哪些工具，精确控制。',
        },
      ],
      tagline: '本地运行。开源协议。你的 MCP 服务，你做主。',
    },
    maker: {
      origin: '起源',
      originQuote: '"每天用 AI 写了几百行代码，出了问题想回看——AI 当时到底做了什么？为什么这么改？这些过程全丢了。"',
      insight: '顿悟',
      insightQuote: '"代码只是结果，AI 的决策链才是真正值得留住的东西。而散落在五个工具里的 MCP 配置和 Skills，以及对话里可能藏着的密钥——这些问题不该每个开发者自己去踩一遍。"',
      invitation: '邀请',
      invitationText: 'Mantra 让你回放 AI 编程的每一步，在一个地方管好所有工具配置，分享前自动检测敏感信息。本地运行，数据不离开你的设备。',
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
      mcpHub: 'MCP Hub',
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
      reddit: 'Reddit',
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
        description: 'Mantra 是一款免费的 AI 编程工具管理平台。可选增值服务让你轻松同步和分享。',
      },
      free: {
        title: 'Mantra 完全免费',
        description: '随意使用，不限会话数量。',
        features: [
          '无限会话和项目',
          'MCP Hub（统一配置 + Inspector）',
          'Git 集成时间旅行',
          '跨项目全文搜索',
          '本地脱敏引擎',
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
