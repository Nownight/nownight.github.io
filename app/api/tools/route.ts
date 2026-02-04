import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'

// GET - 获取所有工具
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false })

    // 筛选条件
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ tools: data })
  } catch (error) {
    console.error('Get tools error:', error)
    return NextResponse.json(
      { error: '获取工具列表失败' },
      { status: 500 }
    )
  }
}

// POST - 创建新工具（需要认证）
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
      icon,
      status,
      tool_type,
      component_code,
      iframe_path,
    } = body

    // 验证必填字段
    if (!slug || !title || !tool_type) {
      return NextResponse.json(
        { error: 'slug、title 和 tool_type 为必填项' },
        { status: 400 }
      )
    }

    // 验证 tool_type
    if (!['component', 'iframe'].includes(tool_type)) {
      return NextResponse.json(
        { error: 'tool_type 必须是 component 或 iframe' },
        { status: 400 }
      )
    }

    // 插入工具
    const { data, error } = await supabase
      .from('tools')
      .insert({
        slug,
        title,
        description,
        icon,
        status: status || 'available',
        tool_type,
        component_code,
        iframe_path,
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

    return NextResponse.json({ tool: data }, { status: 201 })
  } catch (error) {
    console.error('Create tool error:', error)
    return NextResponse.json(
      { error: '创建工具失败' },
      { status: 500 }
    )
  }
}
