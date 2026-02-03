'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, RotateCcw, Download, Upload } from 'lucide-react'
import Link from 'next/link'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError('')
    } catch (err) {
      setError('无效的 JSON 格式: ' + (err as Error).message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError('无效的 JSON 格式: ' + (err as Error).message)
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const reset = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  const exampleJson = {
    name: "Ori_Peng",
    age: 25,
    skills: ["React", "TypeScript", "Node.js"],
    projects: {
      blog: { name: "个人博客", tech: "Next.js" },
      tools: { name: "工具集", tech: "React" }
    }
  }

  const loadExample = () => {
    setInput(JSON.stringify(exampleJson))
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← 返回工具集
          </Link>
          <h1 className="text-4xl font-bold mb-4">🎨 JSON 格式化工具</h1>
          <p className="text-muted-foreground">
            在线格式化、验证和美化 JSON 数据，支持压缩、复制和下载
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>输入 JSON</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadExample}
                    className="text-xs"
                  >
                    加载示例
                  </Button>
                  <label htmlFor="file-upload">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4" />
                      </span>
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </CardTitle>
              <CardDescription>粘贴或输入你的 JSON 数据</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "example"}'
                className="w-full h-96 p-4 font-mono text-sm bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>输出结果</span>
                <div className="flex gap-2">
                  {output && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={copyToClipboard}
                        title="复制"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={downloadJson}
                        title="下载"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardTitle>
              <CardDescription>
                {output ? '格式化后的 JSON' : '等待处理...'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={output}
                readOnly
                placeholder="格式化后的结果将显示在这里"
                className="w-full h-96 p-4 font-mono text-sm bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">操作选项</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">缩进空格:</label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="px-3 py-1 border border-border rounded-md bg-background text-sm"
                >
                  <option value={2}>2 空格</option>
                  <option value={4}>4 空格</option>
                  <option value={8}>8 空格</option>
                </select>
              </div>

              <div className="flex gap-2 ml-auto">
                <Button onClick={formatJson} variant="default">
                  格式化
                </Button>
                <Button onClick={minifyJson} variant="secondary">
                  压缩
                </Button>
                <Button onClick={reset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  重置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mt-6 bg-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg">功能特性</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                实时 JSON 格式化和验证
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                支持 JSON 压缩
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                一键复制到剪贴板
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                支持文件上传和下载
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                自定义缩进大小
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                完全在浏览器中运行，保护隐私
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
