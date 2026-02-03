import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadingTime } from './utils'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  author: string
  tags: string[]
  category: string
  image?: string
  readingTime: number
  content: string
}

/**
 * 获取所有博客文章
 */
export function getAllPosts(): BlogPost[] {
  // 如果目录不存在，返回空数组
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        author: data.author || 'Ori_Peng',
        tags: data.tags || [],
        category: data.category || 'Uncategorized',
        image: data.image,
        readingTime: calculateReadingTime(content),
        content,
      } as BlogPost
    })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * 根据 slug 获取文章
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug) || null
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = posts.flatMap((post) => post.tags)
  return Array.from(new Set(tags))
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = posts.map((post) => post.category)
  return Array.from(new Set(categories))
}

/**
 * 根据标签获取文章
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

/**
 * 根据分类获取文章
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.category === category)
}
