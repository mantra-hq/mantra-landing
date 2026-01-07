/*
  完整的数据库设置脚本
  在新的 Supabase 项目中运行此脚本来创建所有必要的表和函数
*/

-- ============================================
-- 1. 创建 subscribers 表
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_by text,
  referral_count integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  ip_hash text
);

-- 注意：不需要额外创建索引，UNIQUE 约束已自动创建索引

-- ============================================
-- 2. 启用 RLS
-- ============================================
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. 设置权限
-- ============================================
-- 授予 schema 使用权限
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- 授予表权限
GRANT SELECT, INSERT, UPDATE ON public.subscribers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

-- ============================================
-- 4. 创建 RLS 策略
-- ============================================
-- 先删除已存在的策略（如果有）
DROP POLICY IF EXISTS "Public can subscribe with email" ON public.subscribers;
DROP POLICY IF EXISTS "Select own record by email or referral code" ON public.subscribers;
DROP POLICY IF EXISTS "Update referral count by code" ON public.subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Subscribers can read own data by referral code" ON public.subscribers;

-- 允许匿名用户插入新订阅
CREATE POLICY "Public can subscribe with email"
  ON public.subscribers
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL
    AND referral_code IS NOT NULL
    AND length(email) > 0
    AND length(referral_code) = 8
  );

-- 允许查询记录
CREATE POLICY "Select own record by email or referral code"
  ON public.subscribers
  FOR SELECT
  TO anon
  USING (true);

-- 允许更新推荐计数
CREATE POLICY "Update referral count by code"
  ON public.subscribers
  FOR UPDATE
  TO anon
  USING (referral_code IS NOT NULL)
  WITH CHECK (referral_code IS NOT NULL);

-- ============================================
-- 5. 创建推荐计数触发器
-- ============================================
CREATE OR REPLACE FUNCTION public.increment_referral_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.subscribers
    SET referral_count = referral_count + 1
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$;

-- 创建触发器
DROP TRIGGER IF EXISTS on_new_subscriber ON public.subscribers;
CREATE TRIGGER on_new_subscriber
  AFTER INSERT ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_referral_count();

-- ============================================
-- 6. 创建邮箱查询函数 (RPC)
-- ============================================
CREATE OR REPLACE FUNCTION public.get_referral_stats_by_email(p_email text)
RETURNS TABLE (
  email text,
  referral_code text,
  referral_count integer,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.email,
    s.referral_code,
    s.referral_count,
    s.created_at
  FROM public.subscribers s
  WHERE s.email = p_email
  LIMIT 1;
END;
$$;

-- 授予函数执行权限
GRANT EXECUTE ON FUNCTION public.get_referral_stats_by_email(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_referral_stats_by_email(text) TO authenticated;

-- ============================================
-- 7. 更新表统计信息
-- ============================================
ANALYZE public.subscribers;

-- 通知 PostgREST 重新加载 schema
NOTIFY pgrst, 'reload schema';
