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

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_subscribers_referral_code ON public.subscribers(referral_code);
CREATE INDEX IF NOT EXISTS idx_subscribers_referred_by ON public.subscribers(referred_by);

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
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE public.subscribers
    SET referral_count = referral_count + 1
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
DROP TRIGGER IF EXISTS on_new_subscriber ON public.subscribers;
CREATE TRIGGER on_new_subscriber
  AFTER INSERT ON public.subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_referral_count();

-- ============================================
-- 6. 创建邮箱查询函数 (RPC)
-- ============================================
CREATE OR REPLACE FUNCTION public.check_email_exists(input_email text)
RETURNS TABLE (
  exists_flag boolean,
  referral_code text,
  referral_count integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    true as exists_flag,
    s.referral_code,
    s.referral_count
  FROM public.subscribers s
  WHERE s.email = input_email
  LIMIT 1;

  -- 如果没有找到记录，返回不存在
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::text, NULL::integer;
  END IF;
END;
$$;

-- 授予函数执行权限
GRANT EXECUTE ON FUNCTION public.check_email_exists(text) TO anon;
GRANT EXECUTE ON FUNCTION public.check_email_exists(text) TO authenticated;

-- ============================================
-- 7. 更新表统计信息
-- ============================================
ANALYZE public.subscribers;

-- 通知 PostgREST 重新加载 schema
NOTIFY pgrst, 'reload schema';
