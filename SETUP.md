# 环境配置指南

## 问题描述

如果您看到以下错误：
```
Get tools error: {
  message: 'TypeError: fetch failed',
  details: 'getaddrinfo ENOTFOUND xxx.supabase.co'
}
```

这说明 Supabase 配置未正确设置。

## 配置步骤

### 1. Supabase 项目设置

#### 选项 A：使用现有项目

如果您已有 Supabase 项目：

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择您的项目
3. 点击左侧的 **Settings** → **API**
4. 找到以下信息：
   - **Project URL** (形如: `https://xxxxx.supabase.co`)
   - **anon public** key (一长串字符串)

#### 选项 B：创建新项目

如果还没有项目：

1. 访问 [Supabase](https://app.supabase.com)
2. 注册/登录账号
3. 点击 **New Project**
4. 填写项目信息：
   - Project name: `ori-peng-blog` (或自定义)
   - Database Password: 设置强密码（请妥善保管）
   - Region: 选择最近的区域（如 Singapore）
5. 点击 **Create new project**
6. 等待 1-2 分钟项目初始化
7. 按照"选项 A"获取配置信息

### 2. 初始化数据库结构

项目创建后，需要创建 `tools` 表：

1. 在 Supabase Dashboard 中，点击左侧 **SQL Editor**
2. 点击 **New query**
3. 复制并粘贴 `scripts/init-db.sql` 的内容
4. 点击 **Run** 执行

或者使用快捷方式：

```sql
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  status TEXT DEFAULT 'planned',
  tool_type TEXT NOT NULL,
  component_code TEXT,
  iframe_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
```

### 3. 更新环境变量

编辑 `.env.local` 文件，替换以下值：

```env
# 从 Supabase Dashboard → Settings → API 获取
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# JWT 密钥（已自动生成，无需修改）
JWT_SECRET=705504805e52c4f2acbff0e3ca62b24a526e4df34d5ba51838dbe5a575038d0b165dd1da06f7985521a4036d4e40bfe2bce78d0ba2f3faf97af24fca615fb335

# 数据库直连 URL（可选，仅用于高级功能）
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
```

**重要提示：**
- 确保 `NEXT_PUBLIC_SUPABASE_URL` 是完整的 URL（包含 `https://`）
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是"anon public"密钥，不是"service role"密钥
- `.env.local` 文件已被加入 `.gitignore`，不会提交到 Git

### 4. 导入工具数据

配置完成后，运行以下命令导入工具数据：

```bash
npm run seed:tools
```

预期输出：
```
开始导入工具数据...

正在处理: 标准成交量分析器 (volume-analyzer)
  ✓ 插入成功
正在处理: AI 深度命理决策系统 (ai-divination)
  ✓ 插入成功

工具数据导入完成!
共处理 2 个工具
```

### 5. 验证配置

启动开发服务器：

```bash
npm run dev
```

访问以下页面验证：

- ✅ [http://localhost:3000/tools](http://localhost:3000/tools) - 应该显示两个工具卡片
- ✅ [http://localhost:3000/tools/volume-analyzer](http://localhost:3000/tools/volume-analyzer) - 成交量分析器
- ✅ [http://localhost:3000/tools/ai-divination](http://localhost:3000/tools/ai-divination) - AI 命理系统
- ✅ [http://localhost:3000/api/tools](http://localhost:3000/api/tools) - API 应该返回工具列表 JSON

## 故障排查

### 错误：fetch failed / ENOTFOUND

**原因：** Supabase URL 不正确或项目不存在

**解决：**
- 检查 `.env.local` 中的 URL 是否正确
- 确认 Supabase 项目是否已创建完成
- 尝试在浏览器中访问该 URL（应该返回 404，但不应该是 DNS 错误）

### 错误：Invalid API key

**原因：** Supabase Anon Key 不正确

**解决：**
- 重新从 Supabase Dashboard 复制 "anon public" 密钥
- 确保复制的是完整的密钥字符串
- 检查是否有多余的空格或换行符

### 工具列表为空

**原因：** 数据库表未创建或数据未导入

**解决：**
1. 确认数据库表已创建（步骤 2）
2. 运行 `npm run seed:tools` 导入数据
3. 检查 Supabase Dashboard → Table Editor，确认 `tools` 表中有数据

### 权限错误

**原因：** Row Level Security (RLS) 可能阻止了访问

**解决：**
1. 在 Supabase Dashboard 中，进入 **Authentication** → **Policies**
2. 为 `tools` 表添加以下策略：
   ```sql
   -- 允许所有人读取工具
   CREATE POLICY "Allow public read access" ON tools
   FOR SELECT USING (true);
   ```

## 安全提示

- ⚠️ **永远不要提交 .env.local 到 Git**（已自动加入 .gitignore）
- ⚠️ **不要分享 service_role 密钥**（仅在服务端使用）
- ✅ 可以安全地使用 anon public 密钥（已限制权限）
- ✅ JWT_SECRET 用于后台登录加密，请妥善保管

## 生产环境部署

部署到 Vercel/Netlify 等平台时：

1. 在平台的环境变量设置中添加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
2. 重新部署应用
3. 部署后运行数据库初始化（如果还没做的话）

## 需要帮助？

如果遇到问题，可以：

1. 查看 Supabase 文档：https://supabase.com/docs
2. 在项目中提 Issue：https://github.com/Nownight/nownight.github.io/issues
3. 检查浏览器控制台和终端的错误信息
