import Link from 'next/link'
import { ArrowRight, Code2, Rocket, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

const features = [
  {
    icon: Code2,
    title: '技术博客',
    description: '分享前端、后端、工程化等技术文章，记录学习与实践心得'
  },
  {
    icon: Rocket,
    title: '实用工具',
    description: '提供量化分析、AI应用、开发辅助等多种在线工具'
  },
  {
    icon: TrendingUp,
    title: '量化分析',
    description: '股票成交量分析、技术指标回测等数据分析工具'
  },
  {
    icon: Sparkles,
    title: 'AI 应用',
    description: '基于深度学习的智能决策系统和创意工具'
  }
]

const tools = [
  {
    title: '🎨 JSON 格式化工具',
    description: '在线格式化、验证和美化 JSON 数据，支持语法高亮、压缩和下载',
    href: '/tools/json-formatter',
    tag: '开发工具'
  },
  {
    title: '🛠️ 更多工具',
    description: '成交量分析、AI 命理决策等工具正在迁移中，敬请期待',
    href: '/tools',
    tag: '即将推出'
  }
]

export default function Home() {
  const posts = getAllPosts().slice(0, 3) // 获取最新3篇文章

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 opacity-50" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block mb-2">探索技术</span>
              <span className="gradient-text">创造价值</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              记录技术成长，分享实用工具，在这里你可以找到有价值的内容和创意
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="gap-2 group">
                <Link href="/blog">
                  开始阅读
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">探索工具</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">✨ 平台特色</h2>
            <p className="text-muted-foreground">多维度内容与工具，助力你的技术之旅</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="card-hover border-2 hover:border-primary">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">🛠️ 精选工具</h2>
              <p className="text-muted-foreground">实用、高效、开箱即用</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex gap-2">
              <Link href="/tools">
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <Card className="h-full card-hover hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {tool.tag}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/tools">
                查看全部工具
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      {posts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">📝 最新文章</h2>
                <p className="text-muted-foreground">分享技术见解与实践经验</p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex gap-2">
                <Link href="/blog">
                  查看全部
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full card-hover hover:border-primary/50">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readingTime} 分钟</span>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-secondary text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="ghost" asChild className="gap-2">
                <Link href="/blog">
                  查看全部文章
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            开始你的探索之旅
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            无论你是想学习技术、寻找灵感，还是需要实用工具，这里都能满足你的需求
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/blog">阅读博客</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link href="/about">了解更多</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
