/**
 * CityNest Toast Notification Component & Dispatcher
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';

let toastListeners = [];

export function showToast(message, type = 'success', duration = 3500) {
  const id = Date.now() + Math.random().toString(36).substr(2, 5);
  const toast = { id, message, type, duration };
  toastListeners.forEach(listener => listener(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const listener = (newToast) => {
      setToasts(prev => [...prev, newToast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, newToast.duration);
    };

    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle2';
      case 'warning':
      case 'error':
        return 'AlertCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-900/90 text-white border-emerald-500/40 shadow-emerald-900/30';
      case 'warning':
      case 'error':
        return 'bg-amber-950/90 text-white border-amber-500/40 shadow-amber-900/30';
      case 'info':
      default:
        return 'bg-slate-900/90 text-white border-blue-500/40 shadow-blue-900/30';
    }
  };

  return html`
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      ${toasts.map(toast => html`
        <div
          key=${toast.id}
          className=${`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-md shadow-xl transition-all transform animate-slide-down ${getStyles(toast.type)}`}
        >
          <div className="flex items-center gap-3">
            <${Icon} name=${getIcon(toast.type)} className=${`w-5 h-5 flex-shrink-0 ${toast.type === 'success' ? 'text-emerald-400' : toast.type === 'warning' ? 'text-amber-400' : 'text-blue-400'}`} />
            <p className="text-xs sm:text-sm font-medium leading-snug">${toast.message}</p>
          </div>
          <button
            onClick=${() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors ml-2"
          >
            <${Icon} name="X" className="w-4 h-4" />
          </button>
        </div>
      `)}
    </div>
  `;
}
