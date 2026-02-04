import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Wrench, LogOut } from 'lucide-react'

export default async function AdminPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">管理后台</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              欢迎回来，{user.username}
            </p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              退出登录
            </Button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 博客管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                博客管理
              </CardTitle>
              <CardDescription>
                创建、编辑和删除博客文章
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/blog">
                <Button className="w-full" variant="default">
                  管理博客文章
                </Button>
              </Link>
              <Link href="/admin/blog/new">
                <Button className="w-full" variant="outline">
                  创建新文章
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 工具管理 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                工具管理
              </CardTitle>
              <CardDescription>
                创建、编辑和删除在线工具
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/tools">
                <Button className="w-full" variant="default">
                  管理工具
                </Button>
              </Link>
              <Link href="/admin/tools/new">
                <Button className="w-full" variant="outline">
                  创建新工具
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
