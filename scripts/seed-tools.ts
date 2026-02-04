/**
 * 工具数据初始化脚本
 * 使用方法：npx tsx scripts/seed-tools.ts
 * 需要先配置 .env.local 中的 Supabase 环境变量
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('错误: 缺少 Supabase 环境变量')
  console.error('请确保 .env.local 文件中配置了:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const tools = [
  {
    slug: 'volume-analyzer',
    title: '标准成交量分析器',
    description: '专业的CSV数据分析工具,支持成交量排名计算与可视化展示,帮助你快速洞察数据趋势',
    icon: 'BarChart3',
    status: 'available',
    tool_type: 'iframe',
    iframe_path: '/tools/volume-analyzer-app/index.html'
  },
  {
    slug: 'ai-divination',
    title: 'AI 深度命理决策系统',
    description: '基于AI的智能命理分析系统,结合生辰八字与现代AI技术,提供个性化的决策建议与深度分析',
    icon: 'Compass',
    status: 'available',
    tool_type: 'iframe',
    iframe_path: '/tools/ai-divination-app/index.html'
  }
]

async function seedTools() {
  console.log('开始导入工具数据...\n')

  for (const tool of tools) {
    console.log(`正在处理: ${tool.title} (${tool.slug})`)

    // 检查工具是否已存在
    const { data: existing } = await supabase
      .from('tools')
      .select('id')
      .eq('slug', tool.slug)
      .single()

    if (existing) {
      // 更新现有工具
      const { error } = await supabase
        .from('tools')
        .update({
          title: tool.title,
          description: tool.description,
          icon: tool.icon,
          status: tool.status,
          tool_type: tool.tool_type,
          iframe_path: tool.iframe_path,
          updated_at: new Date().toISOString()
        })
        .eq('slug', tool.slug)

      if (error) {
        console.error(`  ✗ 更新失败:`, error.message)
      } else {
        console.log(`  ✓ 更新成功`)
      }
    } else {
      // 插入新工具
      const { error } = await supabase
        .from('tools')
        .insert({
          slug: tool.slug,
          title: tool.title,
          description: tool.description,
          icon: tool.icon,
          status: tool.status,
          tool_type: tool.tool_type,
          iframe_path: tool.iframe_path
        })

      if (error) {
        console.error(`  ✗ 插入失败:`, error.message)
      } else {
        console.log(`  ✓ 插入成功`)
      }
    }
  }

  console.log('\n工具数据导入完成!')
  console.log(`共处理 ${tools.length} 个工具`)
}

seedTools().catch(error => {
  console.error('导入失败:', error)
  process.exit(1)
})
