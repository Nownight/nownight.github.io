# Ori_Peng 的小菜园 2.0

现代化的博客与工具平台，基于 Next.js 14 + React 18 构建。

## ✨ 特性

- 🎨 **现代化设计** - 参考大厂设计规范，精美的 UI/UX
- 🌓 **深色模式** - 支持自动切换，保护眼睛
- 📱 **响应式设计** - 完美适配所有设备
- ⚡ **极致性能** - 服务端渲染 + 数据库优化
- 🛠️ **丰富工具** - 量化分析、AI 应用、开发辅助等
- 📝 **MDX 支持** - 在 Markdown 中使用 React 组件
- 🎯 **SEO 优化** - 完善的元数据和结构化数据
- 🔐 **管理后台** - 在线创建和管理博客、工具（新增）
- 💾 **数据库支持** - PostgreSQL + Supabase 云端存储（新增）

## 🚀 技术栈

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Content**: MDX
- **Icons**: Lucide React
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT + bcrypt
- **Editor**: React Markdown Editor

## 📦 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

\`\`\`bash
npm run build
npm run start
\`\`\`

## 🔐 管理后台

项目现已支持在线管理博客和工具！

### 配置数据库

1. 查看 [DATABASE_SETUP.md](./DATABASE_SETUP.md) 完整配置指南
2. 创建 Supabase 项目
3. 运行 `scripts/init-db.sql` 初始化数据库
4. 配置 `.env.local` 环境变量

### 使用管理后台

1. 访问 `/admin/login` 登录
2. 默认账号：
   - 用户名：`pxt`
   - 密码：`20182019`
3. 登录后可以：
   - ✍️ 在线创建和编辑博客文章
   - 🛠️ 在线添加和管理工具
   - 🗑️ 删除现有内容

⚠️ **生产环境请立即修改默认密码！**

## 📝 添加博客文章

有两种方式添加博客文章：

### 方式 1：通过管理后台（推荐）

1. 登录管理后台 `/admin`
2. 进入博客管理
3. 点击"创建新文章"
4. 使用 Markdown 编辑器编写内容
5. 发布

### 方式 2：手动创建 MDX 文件

在 `content/blog/` 目录下创建 `.mdx` 文件：

\`\`\`mdx
---
title: "文章标题"
date: "2024-02-03"
description: "文章描述"
author: "Ori_Peng"
tags: ["标签1", "标签2"]
category: "分类"
---

# 标题

文章内容...
\`\`\`

## 🛠️ 工具集

- ✅ 成交量分析器
- ✅ AI 命理决策系统
- ✅ JSON 格式化工具
- 🔜 正则表达式测试器
- 🔜 Base64 编解码
- 🔜 哈希生成器

## 📂 项目结构

\`\`\`
next-blog/
├── app/                  # Next.js App Router
│   ├── blog/            # 博客页面
│   ├── tools/           # 工具页面
│   ├── about/           # 关于页面
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 首页
│   └── globals.css      # 全局样式
├── components/          # React 组件
│   ├── ui/             # UI 组件
│   ├── header.tsx      # 导航栏
│   ├── footer.tsx      # 页脚
│   └── theme-provider.tsx
├── content/            # 内容文件
│   └── blog/          # 博客文章 (MDX)
├── lib/               # 工具函数
│   ├── utils.ts       # 通用工具
│   └── blog.ts        # 博客相关
├── public/            # 静态资源
└── next.config.mjs    # Next.js 配置
\`\`\`

## 🌐 部署

由于使用了 API Routes 和数据库，项目需要部署到支持服务端的平台。

### Vercel（推荐）

1. Fork 本仓库到你的 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量：
   ```
   NEXT_PUBLIC_SUPABASE_URL=你的Supabase URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase密钥
   JWT_SECRET=随机字符串
   ```
4. 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### 其他平台

项目也可部署到其他支持 Next.js 的平台：
- Netlify
- Railway
- Render
- AWS Amplify

## 📄 许可证

MIT License

## 👤 作者

**Ori_Peng**

- GitHub: [@Nownight](https://github.com/Nownight)

---

如果觉得这个项目有帮助，欢迎 ⭐ Star!
