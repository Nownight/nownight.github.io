import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Compass, FileJson, Regex, Binary, Hash, Wrench, LucideIcon } from 'lucide-react'
import type { Tool } from '@/lib/supabase'

export const metadata = {
  title: '工具集',
  description: '实用的在线工具，开箱即用',
}

// 图标映射
const iconMap: Record<string, LucideIcon> = {
  FileJson,
  BarChart3,
  Compass,
  Regex,
  Binary,
  Hash,
  Wrench, // 默认图标
}

// 颜色映射（可以根据工具类型或其他属性决定）
const colorVariants = [
  'from-green-500 to-emerald-500',
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-blue-500',
  'from-yellow-500 to-orange-500',
]

async function getTools() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/tools`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.tools || []
  } catch (error) {
    console.error('Failed to fetch tools:', error)
    return []
  }
}

export default async function ToolsPage() {
  const tools: Tool[] = await getTools()
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🛠️ 工具集</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            精选实用工具，提升你的工作效率
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            所有工具完全在浏览器中运行，不会上传您的数据
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">暂无工具</p>
            </div>
          ) : (
            tools.map((tool, index) => {
              const Icon = iconMap[tool.icon || 'Wrench'] || Wrench
              const color = colorVariants[index % colorVariants.length]
              const isAvailable = tool.status === 'available'

              return (
                <Link
                  key={tool.id}
                  href={isAvailable ? `/tools/${tool.slug}` : '#'}
                  className={!isAvailable ? 'pointer-events-none' : ''}
                >
                  <Card
                    className={`h-full transition-all duration-300 hover:shadow-xl ${
                      isAvailable
                        ? 'card-hover hover:border-primary/50 cursor-pointer'
                        : 'opacity-60'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CardHeader>
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-xl flex items-center justify-between">
                        <span>{tool.title}</span>
                        {!isAvailable && (
                          <span className="text-xs font-normal bg-secondary text-muted-foreground px-2 py-1 rounded">
                            即将推出
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${color} text-white text-xs font-medium rounded-full`}>
                        {tool.tool_type === 'iframe' ? 'Web 应用' : 'React 组件'}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">有想法？</h2>
          <p className="text-muted-foreground mb-6">
            如果你有好的工具建议，或者发现了 bug，欢迎通过 GitHub Issues 告诉我
          </p>
          <a
            href="https://github.com/Nownight/nownight.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            提交反馈
          </a>
        </div>
      </div>
    </div>
  )
}
