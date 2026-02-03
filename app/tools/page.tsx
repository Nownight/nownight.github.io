import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Compass, FileJson, Regex, Binary, Hash } from 'lucide-react'

export const metadata = {
  title: '工具集',
  description: '实用的在线工具，开箱即用',
}

const tools = [
  {
    icon: FileJson,
    title: 'JSON 格式化工具',
    description: '在线格式化、验证和美化 JSON 数据。支持语法高亮、折叠、复制等功能。',
    href: '/tools/json-formatter/',
    tag: '开发工具',
    color: 'from-green-500 to-emerald-500',
    available: true,
  },
  {
    icon: BarChart3,
    title: '成交量分析器',
    description: '分析股票/指数成交量与未来收益的关系，帮助发现交易信号。正在迁移到 React 版本。',
    href: '/tools/volume-analyzer/',
    tag: '量化分析',
    color: 'from-blue-500 to-cyan-500',
    available: true,
  },
  {
    icon: Compass,
    title: 'AI 命理决策系统',
    description: '基于八字算法与现代行为科学的精准校正，结合AI分析提供个性化决策建议。正在迁移中。',
    href: '/tools/ai-divination/',
    tag: 'AI 应用',
    color: 'from-purple-500 to-pink-500',
    available: true,
  },
  {
    icon: Regex,
    title: '正则表达式测试器',
    description: '在线测试和调试正则表达式。支持多种语言模式，实时匹配结果显示。',
    href: '/tools/regex-tester',
    tag: '开发工具',
    color: 'from-orange-500 to-red-500',
    available: false,
  },
  {
    icon: Binary,
    title: 'Base64 编解码',
    description: '快速进行 Base64 编码和解码。支持文本、文件、图片等多种格式。',
    href: '/tools/base64',
    tag: '开发工具',
    color: 'from-indigo-500 to-blue-500',
    available: false,
  },
  {
    icon: Hash,
    title: '哈希生成器',
    description: '生成各种哈希值（MD5、SHA1、SHA256等）。支持文本和文件哈希计算。',
    href: '/tools/hash',
    tag: '开发工具',
    color: 'from-yellow-500 to-orange-500',
    available: false,
  },
]

export default function ToolsPage() {
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
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.title}
                href={tool.available ? tool.href : '#'}
                className={!tool.available ? 'pointer-events-none' : ''}
              >
                <Card
                  className={`h-full transition-all duration-300 hover:shadow-xl ${
                    tool.available
                      ? 'card-hover hover:border-primary/50 cursor-pointer'
                      : 'opacity-60'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between">
                      <span>{tool.title}</span>
                      {!tool.available && (
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
                    <span className={`inline-block px-3 py-1 bg-gradient-to-r ${tool.color} text-white text-xs font-medium rounded-full`}>
                      {tool.tag}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
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
