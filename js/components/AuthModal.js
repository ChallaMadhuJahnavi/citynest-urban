/**
 * CityNest User Authentication & Demo Account Switcher Modal
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';
import { SEED_USERS } from '../store.js';

export function AuthModal({ isOpen, onClose, currentUser, onSelectUser, onLoginEmail }) {
  const [emailInput, setEmailInput] = React.useState('');
  const [nameInput, setNameInput] = React.useState('');
  const [isRegister, setIsRegister] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    onLoginEmail(emailInput.trim(), nameInput.trim());
    setEmailInput('');
    setNameInput('');
    onClose();
  };

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-overlay">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden modal-content animate-slide-down">
        <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative">
          <button
            onClick=${onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <${Icon} name="X" className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <${Icon} name="UserCheck" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">Resident Profile</h3>
              <p className="text-xs text-blue-200">Private saved items & event RSVPs</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Quick Switch Demo Resident
            </label>
            <div className="space-y-2">
              ${SEED_USERS.map(user => {
                const isCurrent = currentUser.id === user.id;
                return html`
                  <button
                    key=${user.id}
                    onClick=${() => {
                      onSelectUser(user);
                      onClose();
                    }}
                    className=${`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src=${user.avatar}
                        alt=${user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">${user.name}</span>
                          ${isCurrent ? html`
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">
                              Active
                            </span>
                          ` : null}
                        </div>
                        <p className="text-xs text-slate-500">${user.neighborhood}</p>
                      </div>
                    </div>
                    <${Icon} name=${isCurrent ? 'Check' : 'ChevronRight'} className=${`w-4 h-4 ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`} />
                  </button>
                `;
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs font-medium text-slate-400 uppercase tracking-wider absolute">or login with email</span>
          </div>

          <form onSubmit=${handleSubmit} className="space-y-3.5">
            ${isRegister ? html`
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value=${nameInput}
                  onInput=${(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all"
                />
              </div>
            ` : null}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="resident@example.com"
                  value=${emailInput}
                  onInput=${(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all pl-9"
                />
                <${Icon} name="Mail" className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <${Icon} name="LogIn" className="w-4 h-4" />
              <span>${isRegister ? 'Create Resident Account' : 'Sign In with Email'}</span>
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick=${() => setIsRegister(!isRegister)}
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                ${isRegister ? 'Already have an account? Sign In' : 'New to CityNest? Create an Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}
