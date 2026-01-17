# Mantra Landing

Mantra 产品落地页与文档站项目。

## 项目简介

Mantra 是一款 **AI 编程过程的时光旅行工具**，让你可以像看录像一样回放整个 AI 辅助编程过程，观察代码随着对话时间线的变化。

### 支持的 AI 工具

- Claude Code
- Gemini CLI
- Cursor
- Codex
- Antigravity（即将支持）

### 核心功能

- **时光旅行** - 回放整个 AI 编程过程，看到代码随着对话时间线变化
- **多工具支持** - 支持主流 AI 编程工具的对话导入
- **智能脱敏** - 分享前自动隐藏敏感信息，保护代码和数据安全

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **文档**: VitePress
- **后端 API**: Cloudflare Pages Functions（边缘计算）
- **数据库**: Supabase（用户注册和推荐系统）
- **国际化**: 自定义 React Context（中/英双语）

## 项目结构

```
mantra-landing/
├── src/                    # React 落地页源码
│   ├── components/         # React 组件
│   │   ├── Hero.tsx        # 首屏展示
│   │   ├── Features.tsx    # 功能介绍
│   │   ├── SupportedTools.tsx  # 支持工具展示
│   │   ├── MakerStory.tsx  # 创作者故事
│   │   ├── EmailSignup.tsx # 邮箱注册
│   │   ├── ReferralStatus.tsx  # 推荐状态
│   │   ├── Footer.tsx      # 页脚
│   │   └── LanguageToggle.tsx  # 语言切换
│   ├── lib/
│   │   ├── i18n.tsx        # 国际化配置
│   │   └── supabase.ts     # 工具函数（推荐码生成等）
│   ├── assets/             # 静态资源
│   ├── App.tsx             # 应用入口
│   └── main.tsx            # React 挂载点
├── functions/              # Cloudflare Pages Functions（后端 API）
│   ├── api/
│   │   ├── subscribe.ts        # 用户注册 API
│   │   └── referral-stats.ts   # 推荐统计查询 API
│   └── tsconfig.json
├── docs/                   # VitePress 文档
│   ├── .vitepress/
│   │   └── config.ts       # VitePress 配置
│   ├── guide/              # 中文指南
│   ├── features/           # 中文功能文档
│   ├── reference/          # 中文参考文档
│   └── en/                 # 英文文档（镜像结构）
├── dist/                   # React 构建输出
└── docs-dist/              # VitePress 构建输出
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动落地页开发服务器
pnpm dev

# 启动文档站开发服务器
pnpm docs:dev
```

### 构建命令

```bash
# 构建落地页 + 文档站
pnpm build

# 仅构建落地页
pnpm build:landing

# 仅构建文档站
pnpm docs:build
```

### 预览命令

```bash
# 预览落地页
pnpm preview

# 预览文档站
pnpm docs:preview
```

### 代码检查

```bash
# ESLint 检查
pnpm lint

# TypeScript 类型检查
pnpm typecheck
```

## 国际化

落地页支持中/英双语切换，翻译文本集中管理在 `src/lib/i18n.tsx`。

VitePress 文档使用 `locales` 配置：
- 中文文档：根路径 `/docs/`
- 英文文档：`/docs/en/`

## 部署

### Cloudflare Pages 环境变量

部署到 Cloudflare Pages 后，需配置 Secrets：

```bash
# 通过 Wrangler CLI 设置（推荐）
npx wrangler pages secret put SUPABASE_URL --project-name mantra-landing
npx wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name mantra-landing
```

或在 Dashboard → Settings → Variables and Secrets 中添加（Type 选 Secret）。

### 本地开发

创建 `.dev.vars` 文件（已在 `.gitignore` 中忽略）：

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### 部署路径

文档站部署基础路径为 `/docs/`，输出到 `docs-dist/` 目录，避免与 React 构建冲突。

## License

Private
