/**
 * 生成推荐码
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/**
 * 从 URL 获取推荐码参数
 */
export function getReferralFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref');
}
