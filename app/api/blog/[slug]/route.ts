import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

// GET - 获取单个博客文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: '博客文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post: data })
  } catch (error) {
    console.error('Get blog post error:', error)
    return NextResponse.json(
      { error: '获取博客文章失败' },
      { status: 500 }
    )
  }
}

// PUT - 更新博客文章（需要认证）
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 验证用户身份
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '未授权，请先登录' },
        { status: 401 }
      )
    }

    const { slug } = await params
    const body = await request.json()

    // 更新时间戳
    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: '博客文章不存在或更新失败' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post: data })
  } catch (error) {
    console.error('Update blog post error:', error)
    return NextResponse.json(
      { error: '更新博客文章失败' },
      { status: 500 }
    )
  }
}

// DELETE - 删除博客文章（需要认证）
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // 验证用户身份
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: '未授权，请先登录' },
        { status: 401 }
      )
    }

    const { slug } = await params

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', slug)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete blog post error:', error)
    return NextResponse.json(
      { error: '删除博客文章失败' },
      { status: 500 }
    )
  }
}
