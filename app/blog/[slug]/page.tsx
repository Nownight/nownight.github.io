import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Tag, Folder, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild className="mb-8 gap-2">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4" />
            返回博客
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} 分钟阅读
            </div>
            <div className="flex items-center gap-1">
              <Folder className="w-4 h-4" />
              {post.category}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary hover:bg-primary/10 text-sm rounded-full transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-4
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-img:rounded-lg prose-img:shadow-lg
            prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
            prose-ul:my-4 prose-ol:my-4
            prose-li:my-1
            animate-fade-in"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">作者</p>
              <p className="font-medium">{post.author}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">← 返回列表</Link>
              </Button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}
