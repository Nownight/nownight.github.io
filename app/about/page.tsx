import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Github, Mail, Code2, Rocket, Heart } from 'lucide-react'

export const metadata = {
  title: '关于',
  description: '了解 Ori_Peng 和这个网站',
}

const skills = [
  { name: 'Next.js / React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'Tailwind CSS', level: 90 },
  { name: '量化分析', level: 70 },
]

const projects = [
  {
    name: '成交量分析器',
    description: '股票成交量与收益关系分析工具',
    tech: ['React', 'Chart.js', 'CSV Parse'],
    link: '/tools/volume-analyzer',
  },
  {
    name: 'AI 命理决策系统',
    description: '基于八字算法的智能决策辅助系统',
    tech: ['React', 'DeepSeek API', 'Tailwind'],
    link: '/tools/ai-divination',
  },
  {
    name: 'JSON 格式化工具',
    description: '在线 JSON 格式化、验证和美化工具',
    tech: ['React', 'Monaco Editor'],
    link: '/tools/json-formatter',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">O</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">关于我</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            全栈开发者 | 技术博主 | 工具创作者
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-6 h-6" />
              个人简介
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              你好！我是 <strong>Ori_Peng</strong>，一名热爱技术的全栈开发者。
            </p>
            <p>
              我专注于前端开发、数据分析和 AI 应用，喜欢创造实用的工具来解决实际问题。
              这个网站是我分享技术见解和创意工具的平台。
            </p>
            <p>
              我相信技术的价值在于服务和创造，希望我的分享能帮助到更多的人。
            </p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-8 animate-fade-in animation-delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-6 h-6" />
              技能树
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="mb-8 animate-fade-in animation-delay-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6" />
              精选项目
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Link key={project.name} href={project.link}>
                  <Card className="h-full card-hover hover:border-primary">
                    <CardHeader>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-secondary text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="animate-fade-in animation-delay-600">
          <CardHeader>
            <CardTitle>联系方式</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild className="gap-2">
                <a href="https://github.com/Nownight" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a href="mailto:contact@example.com">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
