import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: {
    default: 'Ori_Peng的小菜园 | 现代化博客与工具平台',
    template: '%s | Ori_Peng',
  },
  description: '探索技术，记录生活，分享实用工具。涵盖前端开发、量化分析、AI应用等领域。',
  keywords: ['博客', '工具', 'Next.js', 'React', 'TypeScript', '量化分析', 'AI'],
  authors: [{ name: 'Ori_Peng' }],
  creator: 'Ori_Peng',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://nownight.github.io',
    siteName: "Ori_Peng的小菜园",
    title: 'Ori_Peng的小菜园',
    description: '探索技术，记录生活，分享实用工具',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ori_Peng的小菜园',
    description: '探索技术，记录生活，分享实用工具',
    creator: '@Ori_Peng',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
