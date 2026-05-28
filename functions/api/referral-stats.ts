import { createClient } from '@supabase/supabase-js'

interface Env {
  SUPABASE_URL: string
  SUPABASE_SECRET_KEY?: string
  // Legacy（Supabase 2026 年末停用）。新部署请使用 SUPABASE_SECRET_KEY。
  SUPABASE_SERVICE_ROLE_KEY?: string
}

interface PagesContext {
  request: Request
  env: Env
}

interface ReferralStatsRequest {
  email: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function onRequest(context: PagesContext): Promise<Response> {
  const { request, env } = context

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }

  // 验证环境变量
  const apiKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY
  if (!env.SUPABASE_URL || !apiKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }

  try {
    // 解析请求体
    const data: ReferralStatsRequest = await request.json()

    // 验证必填字段
    if (typeof data.email !== 'string' || !data.email.trim()) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      )
    }

    // 创建 Supabase 客户端
    const supabase = createClient(env.SUPABASE_URL, apiKey)

    // 调用存储函数查询推荐统计
    const { data: stats, error } = await supabase.rpc('get_referral_stats_by_email', {
      p_email: data.email.toLowerCase().trim()
    })

    if (error) {
      console.error('[Referral Stats API] Supabase error:', error.message, error.code)

      // 处理函数不存在的错误
      if (error.code === 'PGRST202') {
        return new Response(JSON.stringify({ error: 'service_unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      }

      return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    if (!stats || stats.length === 0) {
      return new Response(JSON.stringify({ error: 'not_found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    return new Response(JSON.stringify({ data: stats[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Referral Stats API] Error:', message)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
}
