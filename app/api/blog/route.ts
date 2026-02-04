import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

// GET - 获取所有博客文章
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    const category = searchParams.get('category')
    const published = searchParams.get('published')

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    // 筛选条件
    if (tag) {
      query = query.contains('tags', [tag])
    }
    if (category) {
      query = query.eq('category', category)
    }
    if (published !== null) {
      query = query.eq('published', published === 'true')
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ posts: data })
  } catch (error) {
    console.error('Get blog posts error:', error)
    return NextResponse.json(
      { error: '获取博客文章失败' },
      { status: 500 }
    )
  }
}

// POST - 创建新博客文章（需要认证）
export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '未授权，请先登录' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      slug,
      title,
      description,
      content,
      author,
      tags,
      category,
      image,
      published,
    } = body

    // 验证必填字段
    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'slug、title 和 content 为必填项' },
        { status: 400 }
      )
    }

    // 插入博客文章
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        slug,
        title,
        description,
        content,
        author: author || 'Ori_Peng',
        tags: tags || [],
        category,
        image,
        published: published !== undefined ? published : true,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        // 唯一约束冲突
        return NextResponse.json(
          { error: '该 slug 已存在，请使用其他 slug' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ post: data }, { status: 201 })
  } catch (error) {
    console.error('Create blog post error:', error)
    return NextResponse.json(
      { error: '创建博客文章失败' },
      { status: 500 }
    )
  }
}
