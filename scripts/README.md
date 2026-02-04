# 数据库脚本说明

## 工具数据初始化

### 方法一：使用 Node.js 脚本（推荐）

这是最简单的方法，可以自动将工具信息导入到数据库中。

#### 步骤：

1. **确保已配置环境变量**

   创建或编辑 `.env.local` 文件，添加以下配置：

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

2. **运行初始化脚本**

   ```bash
   npm run seed:tools
   ```

   或者直接运行：

   ```bash
   node scripts/seed-tools.mjs
   ```

3. **验证结果**

   脚本会显示每个工具的导入状态：
   - ✓ 表示成功
   - ✗ 表示失败（会显示错误信息）

   成功后，访问 `/tools` 即可看到工具集列表页面。

### 方法二：使用 SQL 脚本

如果你更喜欢使用 SQL，可以直接在 Supabase Dashboard 中执行。

#### 步骤：

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目
3. 点击左侧菜单的 "SQL Editor"
4. 复制 `scripts/add-tools.sql` 文件的内容
5. 粘贴到 SQL 编辑器中
6. 点击 "Run" 按钮执行

### 方法三：使用管理后台

通过网页界面手动添加工具。

#### 步骤：

1. 访问 `/admin/tools/new`
2. 填写工具信息：
   - **slug**: `volume-analyzer` 或 `ai-divination`
   - **title**: 工具名称
   - **description**: 工具描述
   - **icon**: 图标名称（如 `BarChart3`、`Compass`）
   - **status**: `available`
   - **tool_type**: `iframe`
   - **iframe_path**: iframe 路径（如 `/tools/volume-analyzer-app/index.html`）
3. 点击保存

## 现有工具列表

脚本会导入以下工具：

1. **标准成交量分析器** (`volume-analyzer`)
   - 专业的 CSV 数据分析工具
   - 支持成交量排名计算与可视化展示

2. **AI 深度命理决策系统** (`ai-divination`)
   - 基于 AI 的智能命理分析系统
   - 结合生辰八字与现代 AI 技术

## 故障排查

### 错误：缺少环境变量

```
错误: 缺少 Supabase 环境变量
```

**解决方案**：确保 `.env.local` 文件存在并包含正确的 Supabase 配置。

### 错误：连接失败

如果看到数据库连接错误，请检查：
- Supabase URL 是否正确
- API Key 是否有效
- 网络连接是否正常

### 工具未显示

如果运行脚本后工具仍未在 `/tools` 页面显示：
1. 检查浏览器控制台是否有错误
2. 访问 `/api/tools` 检查 API 是否返回数据
3. 清除浏览器缓存并刷新页面

## 其他脚本

- `init-db.sql`: 数据库初始化脚本（创建表结构）
- `add-tools.sql`: SQL 格式的工具数据插入脚本
- `seed-tools.mjs`: Node.js 自动化导入脚本
