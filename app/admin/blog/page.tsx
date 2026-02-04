'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Plus, ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/lib/supabase'

export default function AdminBlogListPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('确定要删除这篇文章吗？')) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
      } else {
        alert('删除失败')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('删除失败')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">博客管理</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                共 {posts.length} 篇文章
              </p>
            </div>
          </div>
          <Link href="/admin/blog/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新建文章
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">还没有文章，创建第一篇吧！</p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {post.description}
                      </CardDescription>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {post.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        创建于: {new Date(post.created_at).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link href={`/admin/blog/edit/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(post.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
