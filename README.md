# Ori_Peng 的小菜园 2.0

现代化的博客与工具平台，基于 Next.js 14 + React 18 构建。

## ✨ 特性

- 🎨 **现代化设计** - 参考大厂设计规范，精美的 UI/UX
- 🌓 **深色模式** - 支持自动切换，保护眼睛
- 📱 **响应式设计** - 完美适配所有设备
- ⚡ **极致性能** - 静态生成，秒开体验
- 🛠️ **丰富工具** - 量化分析、AI 应用、开发辅助等
- 📝 **MDX 支持** - 在 Markdown 中使用 React 组件
- 🎯 **SEO 优化** - 完善的元数据和结构化数据

## 🚀 技术栈

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Content**: MDX
- **Icons**: Lucide React

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

### 导出静态网站

\`\`\`bash
npm run build
\`\`\`

导出的静态文件位于 `out/` 目录。

## 📝 添加博客文章

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

### GitHub Pages

1. 修改 `next.config.mjs` 中的 `basePath` (如果需要)
2. 运行 `npm run build`
3. 将 `out/` 目录部署到 GitHub Pages

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📄 许可证

MIT License

## 👤 作者

**Ori_Peng**

- GitHub: [@Nownight](https://github.com/Nownight)

---

如果觉得这个项目有帮助，欢迎 ⭐ Star!
