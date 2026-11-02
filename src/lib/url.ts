// 讓連結在 GitHub Pages 的子路徑（/AllenTP036）下也能正常運作。
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
