'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function NewToolPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    icon: '',
    status: 'available',
    tool_type: 'iframe',
    component_code: '',
    iframe_path: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || '创建失败')
        setLoading(false)
        return
      }

      alert('创建成功！')
      router.push('/admin/tools')
    } catch (error) {
      console.error('Create error:', error)
      alert('创建失败')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/tools">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">创建新工具</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">标题 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="my-tool"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="icon">图标名称</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Wrench"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">状态 *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">可用</SelectItem>
                      <SelectItem value="planned">计划中</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool_type">类型 *</Label>
                  <Select
                    value={formData.tool_type}
                    onValueChange={(value) => setFormData({ ...formData, tool_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iframe">iframe 嵌入</SelectItem>
                      <SelectItem value="component">React 组件</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {formData.tool_type === 'iframe' && (
            <Card>
              <CardHeader>
                <CardTitle>iframe 配置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="iframe_path">iframe 路径 *</Label>
                  <Input
                    id="iframe_path"
                    value={formData.iframe_path}
                    onChange={(e) => setFormData({ ...formData, iframe_path: e.target.value })}
                    placeholder="/tools/my-tool-app/index.html"
                    required={formData.tool_type === 'iframe'}
                  />
                  <p className="text-sm text-gray-500">
                    相对于 /public 目录的路径
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {formData.tool_type === 'component' && (
            <Card>
              <CardHeader>
                <CardTitle>React 组件代码</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="component_code">组件代码 *</Label>
                  <Textarea
                    id="component_code"
                    value={formData.component_code}
                    onChange={(e) => setFormData({ ...formData, component_code: e.target.value })}
                    rows={15}
                    placeholder="'use client'\n\nexport default function MyTool() {\n  return (\n    <div>\n      My Tool\n    </div>\n  )\n}"
                    className="font-mono text-sm"
                    required={formData.tool_type === 'component'}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? '创建中...' : '创建工具'}
            </Button>
            <Link href="/admin/tools">
              <Button variant="outline" type="button">
                取消
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
