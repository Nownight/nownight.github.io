import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold gradient-text">404</h1>
          <h2 className="text-3xl font-bold">页面未找到</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            抱歉，您访问的页面不存在或已被移除。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              返回首页
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="w-5 h-5" />
              查看博客
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            或者尝试访问：
            <Link href="/tools" className="text-primary hover:underline ml-2">
              工具集
            </Link>
            {' · '}
            <Link href="/about" className="text-primary hover:underline">
              关于
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
