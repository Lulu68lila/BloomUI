import './css/style.css';

export const version = '1.0.0';

export function init() {
  const main = document.querySelector('script[data-florisui]');
  if (!main) {
    const script = document.createElement('script');
    script.src = new URL('./js/main.js', import.meta.url).href;
    script.defer = true;
    document.body.appendChild(script);
  }
}

export default { version, init };

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
}
