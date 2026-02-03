# 🚀 快速开始指南

这是一个 5 分钟快速上手指南。

## 📋 前提条件

- Node.js 18+ 已安装
- Git 已配置
- GitHub 账号

## 🎯 三步部署

### 第 1 步：合并代码

访问 GitHub Pull Request 页面合并代码：

```
https://github.com/Nownight/nownight.github.io/pull/new/claude/add-ai-divination-tool-8xPxS
```

点击 "Create pull request" → "Merge pull request"

### 第 2 步：配置 GitHub Pages

1. 进入仓库 Settings
2. 左侧点击 "Pages"
3. Source 选择 **"GitHub Actions"**（重要！）
4. 保存

### 第 3 步：等待部署

- Actions 标签页查看部署进度
- 5-10 分钟后访问：`https://nownight.github.io`

✅ 完成！你的新博客已上线！

---

## 💻 本地开发（可选）

### 克隆并运行

```bash
# 1. 克隆仓库
git clone https://github.com/Nownight/nownight.github.io.git
cd nownight.github.io

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# 访问 http://localhost:3000
```

### 常用命令

```bash
npm run dev      # 开发模式（热重载）
npm run build    # 构建生产版本
npm run start    # 预览生产版本
npm run lint     # 代码检查
```

---

## ✍️ 快速添加博客文章

### 1. 创建文件

在 `content/blog/` 目录创建 `my-first-post.mdx`：

```mdx
---
title: "我的第一篇文章"
date: "2024-02-03"
description: "这是我使用新博客系统发布的第一篇文章"
author: "Ori_Peng"
tags: ["博客", "Next.js"]
category: "技术分享"
---

# 欢迎

这是我的第一篇文章！

## 小节标题

可以使用所有 Markdown 语法：

- 列表项 1
- 列表项 2

**粗体文字** 和 *斜体文字*

\`\`\`javascript
// 代码块
console.log('Hello World!')
\`\`\`
```

### 2. 提交并推送

```bash
git add content/blog/my-first-post.mdx
git commit -m "添加第一篇文章"
git push
```

### 3. 自动部署

GitHub Actions 会自动构建并部署，几分钟后即可看到新文章！

---

## 🎨 自定义主题色

编辑 `app/globals.css` 文件：

```css
:root {
  /* 修改主色调 */
  --primary: 221.2 83.2% 53.3%;  /* 蓝色 → 改为你喜欢的颜色 */
}
```

可用颜色示例：
- 紫色：`270 80% 60%`
- 绿色：`142 76% 36%`
- 橙色：`25 95% 53%`
- 粉色：`330 81% 60%`

---

## 🛠️ 添加新工具

### 1. 创建工具页面

在 `app/tools/` 创建新文件夹：

```bash
app/tools/my-tool/
└── page.tsx
```

### 2. 编写组件

```tsx
'use client'

export default function MyTool() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold">我的工具</h1>
      {/* 你的工具代码 */}
    </div>
  )
}
```

### 3. 添加到导航

编辑 `app/tools/page.tsx`，在 `tools` 数组中添加：

```tsx
{
  title: '🎯 我的工具',
  description: '工具描述',
  href: '/tools/my-tool',
  tag: '工具类型',
  color: 'from-blue-500 to-cyan-500',
  available: true,
}
```

---

## 🌐 查看效果

### 本地预览
```
http://localhost:3000
```

### 线上地址
```
https://nownight.github.io
```

---

## ❓ 常见问题

### Q: 页面 404 错误？
A: 确保 GitHub Pages 配置为 "GitHub Actions" 模式

### Q: 样式没有加载？
A: 清除浏览器缓存，强制刷新（Ctrl + Shift + R）

### Q: 构建失败？
A: 查看 Actions 标签页的错误日志

### Q: 本地运行报错？
A: 删除 node_modules 和 .next，重新 `npm install`

---

## 📚 更多文档

- 📖 [README.md](./README.md) - 项目详细说明
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - 完整部署指南
- 📊 [UPGRADE_SUMMARY.md](./UPGRADE_SUMMARY.md) - 重构总结

---

## 🎉 恭喜！

你已经掌握了新博客的基本使用！

**Happy Coding! 🚀**
