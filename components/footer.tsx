import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

const footerLinks = {
  product: [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '工具', href: '/tools' },
    { name: '关于', href: '/about' },
  ],
  tools: [
    { name: '成交量分析器', href: '/tools/volume-analyzer' },
    { name: 'AI 命理系统', href: '/tools/ai-divination' },
    { name: 'JSON 格式化', href: '/tools/json-formatter' },
    { name: '正则测试', href: '/tools/regex-tester' },
  ],
  connect: [
    { name: 'GitHub', href: 'https://github.com/Nownight', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Email', href: 'mailto:contact@example.com', icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="font-bold text-lg gradient-text">Ori_Peng</span>
            </div>
            <p className="text-sm text-muted-foreground">
              探索技术，记录生活，分享工具
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">快速导航</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">工具集</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-hover"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <div className="flex space-x-4">
              {footerLinks.connect.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ori_Peng. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
