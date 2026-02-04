-- 插入标准成交量分析器工具
INSERT INTO tools (slug, title, description, icon, status, tool_type, iframe_path)
VALUES (
  'volume-analyzer',
  '标准成交量分析器',
  '专业的CSV数据分析工具,支持成交量排名计算与可视化展示,帮助你快速洞察数据趋势',
  'BarChart3',
  'available',
  'iframe',
  '/tools/volume-analyzer-app/index.html'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  status = EXCLUDED.status,
  tool_type = EXCLUDED.tool_type,
  iframe_path = EXCLUDED.iframe_path,
  updated_at = NOW();

-- 插入AI深度命理决策系统
INSERT INTO tools (slug, title, description, icon, status, tool_type, iframe_path)
VALUES (
  'ai-divination',
  'AI 深度命理决策系统',
  '基于AI的智能命理分析系统,结合生辰八字与现代AI技术,提供个性化的决策建议与深度分析',
  'Compass',
  'available',
  'iframe',
  '/tools/ai-divination-app/index.html'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  status = EXCLUDED.status,
  tool_type = EXCLUDED.tool_type,
  iframe_path = EXCLUDED.iframe_path,
  updated_at = NOW();
