import Link from 'next/link'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Tag, Folder } from 'lucide-react'

export const metadata = {
  title: '博客',
  description: '分享技术见解与实践经验',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">📝 技术博客</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            分享技术见解，记录实践经验，探索前沿技术
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {posts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">暂无文章</p>
                <p className="text-sm text-muted-foreground">
                  第一篇文章即将发布，敬请期待！
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card
                      className="card-hover hover:border-primary/50"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <CardHeader>
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} 分钟
                          </div>
                          <div className="flex items-center gap-1">
                            <Folder className="w-4 h-4" />
                            {post.category}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <CardTitle className="text-2xl hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm rounded-full hover:bg-primary/10 transition-colors"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Categories */}
            {categories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Folder className="w-5 h-5" />
                    分类
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={`/blog/category/${category}`}>
                          {category}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    标签
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="secondary"
                        size="sm"
                        asChild
                      >
                        <Link href={`/blog/tag/${tag}`}>
                          {tag}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-none">
              <CardHeader>
                <CardTitle className="text-lg">✨ 关于本站</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  这里记录了我的技术成长历程，分享实用的工具和经验。
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/about/">了解更多</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
