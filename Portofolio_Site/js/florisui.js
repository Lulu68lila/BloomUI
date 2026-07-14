export const version = '1.0.0';

export function init() {
  if (typeof window === 'undefined') return;
  const s = document.createElement('script');
  s.src = new URL('./main.js', import.meta.url).href;
  s.defer = true;
  document.body.appendChild(s);
}

export default { version, init };
