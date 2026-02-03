# 部署指南

## 🚀 快速部署

这个项目已经配置好了自动部署流程，推送到 GitHub 后会自动构建和部署。

### 前置要求

- Node.js 18+
- npm 或 yarn
- Git

## 📝 部署步骤

### 方式一：GitHub Pages (推荐)

1. **配置 GitHub Pages**

   在仓库设置中：
   - Settings → Pages
   - Source 选择 "GitHub Actions"

2. **推送代码**

   ```bash
   git add .
   git commit -m "部署 Next.js 博客"
   git push origin main
   ```

3. **自动部署**

   GitHub Actions 会自动：
   - 安装依赖
   - 构建项目
   - 部署到 GitHub Pages

   完成后访问：`https://[用户名].github.io`

### 方式二：Vercel (零配置)

1. 访问 [vercel.com](https://vercel.com)
2. 连接 GitHub 仓库
3. 点击 Deploy
4. 完成！

Vercel 会自动检测 Next.js 项目并配置最佳设置。

### 方式三：Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `out`
4. Deploy

### 方式四：本地构建手动部署

```bash
# 构建
npm run build

# out/ 目录包含所有静态文件
# 将 out/ 目录内容上传到任何静态托管服务
```

## 🌐 国内访问优化

### Gitee Pages

由于 GitHub Pages 在国内访问可能较慢，可以同时部署到 Gitee：

1. **创建 Gitee 仓库**

   在 Gitee 创建同名仓库

2. **添加远程仓库**

   ```bash
   git remote add gitee https://gitee.com/[用户名]/[仓库名].git
   ```

3. **推送到 Gitee**

   ```bash
   git push gitee main
   ```

4. **开启 Gitee Pages**

   在仓库设置中开启 Gitee Pages 服务

5. **手动更新**

   Gitee Pages 不会自动更新，每次推送后需要手动刷新。

### 自动同步到 Gitee

在 `.github/workflows/sync-to-gitee.yml` 添加：

```yaml
name: Sync to Gitee

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          source-repo: "git@github.com:[用户名]/[仓库名].git"
          destination-repo: "git@gitee.com:[用户名]/[仓库名].git"
```

## 🔧 环境变量

如果使用了外部 API（如 DeepSeek），需要配置环境变量：

### Vercel/Netlify

在平台设置中添加环境变量：
- `DEEPSEEK_API_KEY`

### GitHub Actions

在仓库 Settings → Secrets 中添加：
- `DEEPSEEK_API_KEY`

### 本地开发

创建 `.env.local` 文件：

```bash
DEEPSEEK_API_KEY=your_api_key_here
```

## 📊 性能优化

### 图片优化

由于使用 `output: 'export'`，Next.js 图片优化被禁用。建议：

1. 使用压缩工具预先优化图片
2. 使用 WebP 格式
3. 提供多种尺寸

### 构建优化

- 移除未使用的依赖
- 检查包大小：`npm run build` 查看报告
- 使用动态导入减少初始加载

## 🐛 常见问题

### 1. 404 错误

确保 `next.config.mjs` 中正确配置了 `output: 'export'`

### 2. 路由不工作

静态导出不支持：
- 动态路由的 catch-all (`[...slug]`)
- API Routes
- 某些服务端功能

### 3. 图片不显示

- 使用相对路径
- 确保图片在 `public/` 目录
- 或使用外部 CDN

### 4. 样式丢失

检查 Tailwind CSS 配置是否正确，content 路径是否包含所有组件文件。

## 📝 更新流程

1. **修改代码**
2. **本地测试**: `npm run dev`
3. **构建验证**: `npm run build && npm start`
4. **提交推送**: `git add . && git commit -m "更新" && git push`
5. **自动部署**: GitHub Actions 自动处理

## 🎯 下一步

- [ ] 配置自定义域名
- [ ] 添加 Google Analytics
- [ ] 配置 CDN 加速
- [ ] 设置 SSL 证书
- [ ] 添加网站地图
- [ ] 配置 robots.txt

## 📚 相关资源

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [GitHub Pages 文档](https://pages.github.com/)
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com/)
