import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型定义
export interface Admin {
  id: number
  username: string
  password_hash: string
  created_at: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  description: string | null
  content: string
  author: string
  tags: string[]
  category: string | null
  image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Tool {
  id: number
  slug: string
  title: string
  description: string | null
  icon: string | null
  status: 'available' | 'planned'
  tool_type: 'component' | 'iframe'
  component_code: string | null
  iframe_path: string | null
  created_at: string
  updated_at: string
}
