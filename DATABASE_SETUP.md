# 数据库配置指南

本项目已添加数据库支持，用于管理博客文章和工具。以下是配置步骤。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并注册/登录
2. 点击 "New Project" 创建新项目
3. 填写项目信息：
   - 项目名称：nownight-blog（或其他名称）
   - 数据库密码：设置一个强密码
   - 区域：选择离你最近的区域

## 2. 初始化数据库

1. 在 Supabase 项目中，进入 SQL Editor
2. 复制 `scripts/init-db.sql` 文件的全部内容
3. 粘贴到 SQL Editor 并执行
4. 这将创建以下表：
   - `admins` - 管理员账号
   - `blog_posts` - 博客文章
   - `tools` - 在线工具

## 3. 配置环境变量

1. 在 Supabase 项目中，进入 Settings > API
2. 复制以下信息：
   - Project URL（项目 URL）
   - anon/public key（匿名/公开密钥）

3. 打开项目根目录的 `.env.local` 文件
4. 填入以下信息：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon密钥

# JWT 密钥（生产环境请更改）
JWT_SECRET=请修改为随机字符串

# 数据库直连 URL（可选）
DATABASE_URL=postgresql://postgres:[密码]@[host]:[port]/postgres
```

## 4. 管理员账号

默认管理员账号已在 `init-db.sql` 中创建：

- **用户名**: `pxt`
- **密码**: `20182019`

> ⚠️ 生产环境请立即修改密码！

## 5. 部署到 Vercel

由于使用了 API Routes，项目需要部署到支持服务端的平台（如 Vercel）：

1. 访问 [Vercel](https://vercel.com) 并登录
2. 导入 GitHub 仓库
3. 配置环境变量（与 `.env.local` 相同）
4. 部署

## 6. 使用管理后台

部署完成后：

1. 访问 `https://你的域名/admin/login`
2. 使用管理员账号登录
3. 开始管理博客和工具

## 功能说明

### 博客管理
- 创建新文章
- 编辑现有文章
- 删除文章
- 支持 Markdown 编辑器
- 支持标签和分类

### 工具管理
- 创建新工具
- 编辑现有工具
- 删除工具
- 支持两种类型：
  - iframe 嵌入（外部 HTML 页面）
  - React 组件（内联代码）

## API 端点

### 认证
- `POST /api/auth/login` - 登录
- `POST /api/auth/logout` - 登出
- `GET /api/auth/me` - 获取当前用户

### 博客
- `GET /api/blog` - 获取所有文章
- `GET /api/blog/[slug]` - 获取单篇文章
- `POST /api/blog` - 创建文章（需认证）
- `PUT /api/blog/[slug]` - 更新文章（需认证）
- `DELETE /api/blog/[slug]` - 删除文章（需认证）

### 工具
- `GET /api/tools` - 获取所有工具
- `GET /api/tools/[slug]` - 获取单个工具
- `POST /api/tools` - 创建工具（需认证）
- `PUT /api/tools/[slug]` - 更新工具（需认证）
- `DELETE /api/tools/[slug]` - 删除工具（需认证）

## 安全提示

1. ✅ 密码使用 bcrypt 加密存储
2. ✅ JWT token 存储在 HTTP-only cookie 中
3. ✅ 所有写操作需要认证
4. ⚠️ 请在生产环境中修改默认密码
5. ⚠️ 请修改 JWT_SECRET 为随机字符串

## 故障排查

### 无法连接数据库
- 检查 Supabase 项目 URL 和密钥是否正确
- 确认 Supabase 项目状态为 "Active"
- 检查网络连接

### 登录失败
- 确认管理员账号已创建（运行 init-db.sql）
- 检查用户名和密码是否正确
- 查看浏览器控制台错误信息

### API 请求失败
- 检查 cookie 是否被阻止
- 确认已登录（访问需认证的接口）
- 查看 Network 面板的响应

## 需要帮助？

如有问题，请检查：
1. Vercel 部署日志
2. 浏览器控制台
3. Supabase 日志
