/*
  文档反馈表设置脚本
  用于收集用户对文档页面的评分和改进建议

  Story 4.1: 页面反馈组件
  AC#4: 反馈数据被记录到 Supabase 数据库
*/

-- ============================================
-- 1. 创建 doc_feedback 表
-- ============================================
CREATE TABLE IF NOT EXISTS public.doc_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  is_helpful boolean NOT NULL,
  suggestion text,
  locale text NOT NULL DEFAULT 'zh-CN',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- ============================================
-- 2. 创建索引
-- ============================================
CREATE INDEX IF NOT EXISTS idx_doc_feedback_page ON public.doc_feedback(page_path);
CREATE INDEX IF NOT EXISTS idx_doc_feedback_created ON public.doc_feedback(created_at DESC);

-- ============================================
-- 3. 启用 RLS
-- ============================================
ALTER TABLE public.doc_feedback ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. 设置权限
-- ============================================
-- 授予 schema 使用权限（如果尚未授予）
GRANT USAGE ON SCHEMA public TO anon;

-- 授予表权限 - 仅允许 INSERT
GRANT INSERT ON public.doc_feedback TO anon;

-- 管理员完全访问
GRANT ALL ON public.doc_feedback TO service_role;

-- ============================================
-- 5. 创建 RLS 策略
-- ============================================
-- 使用 DO 块确保策略创建的原子性
-- PostgreSQL 没有 CREATE POLICY IF NOT EXISTS，所以用条件检查
DO $$
BEGIN
  -- 检查策略是否已存在
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'doc_feedback'
      AND policyname = 'Allow anonymous insert'
  ) THEN
    -- 创建允许匿名用户插入反馈的策略
    CREATE POLICY "Allow anonymous insert"
      ON public.doc_feedback
      FOR INSERT
      TO anon
      WITH CHECK (
        page_path IS NOT NULL
        AND length(page_path) > 0
        AND (suggestion IS NULL OR length(suggestion) <= 2000)
      );
  END IF;
END
$$;

-- 注意：不创建 SELECT/UPDATE/DELETE 策略
-- 数据仅通过 service_role 或 Supabase Dashboard 访问

-- ============================================
-- 6. 更新表统计信息
-- ============================================
ANALYZE public.doc_feedback;

-- 通知 PostgREST 重新加载 schema
NOTIFY pgrst, 'reload schema';
