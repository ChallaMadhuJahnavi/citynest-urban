/**
 * CityNest Safe Lucide Icon Component
 * Avoids direct DOM mutation conflicts with React 18 virtual DOM.
 */

import { html } from '../html.js';

export function Icon({ name, className = 'w-4 h-4', ...props }) {
  const spanRef = React.useRef(null);

  React.useEffect(() => {
    if (spanRef.current && window.lucide && name) {
      spanRef.current.innerHTML = '';
      const iElem = document.createElement('i');
      iElem.setAttribute('data-lucide', name);
      if (className) {
        iElem.className = className;
      }
      spanRef.current.appendChild(iElem);
      try {
        window.lucide.createIcons({
          root: spanRef.current
        });
      } catch (e) {
        console.warn('Lucide icon error:', name, e);
      }
    }
  }, [name, className]);

  return html`<span ref=${spanRef} className="inline-flex items-center justify-center shrink-0" ...${props}></span>`;
}
