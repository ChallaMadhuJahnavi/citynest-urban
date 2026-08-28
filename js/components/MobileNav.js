/**
 * CityNest Mobile Navigation Header & Drawer
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';

export function MobileNav({ activePage, setActivePage, currentUser, onOpenAuth, locationState, savedCount, checklistStats }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'housing', label: 'Housing', icon: 'Home' },
    { id: 'events', label: 'Community Events', icon: 'CalendarDays' },
    { 
      id: 'checklist', 
      label: 'Settlement Checklist', 
      icon: 'CheckSquare',
      badge: `${checklistStats.percent}%` 
    },
    { id: 'services', label: 'City Services', icon: 'Building2' },
    { id: 'wellness', label: 'Wellness & Care', icon: 'HeartHandshake' },
    { 
      id: 'saved', 
      label: 'Saved Resources', 
      icon: 'Bookmark',
      badge: savedCount > 0 ? savedCount : null
    }
  ];

  const handleSelectPage = (id) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return html`
    <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick=${() => setIsOpen(!isOpen)}
            className="p-2 -ml-1 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Toggle navigation menu"
          >
            <${Icon} name=${isOpen ? 'X' : 'Menu'} className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer select-none" onClick=${() => handleSelectPage('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-city flex items-center justify-center text-white shadow-sm shrink-0">
              <${Icon} name="Compass" className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 font-display text-base tracking-tight">CityNest</span>
              <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200/60">NYC</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          ${locationState.status === 'granted' ? html`
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="truncate max-w-[120px]">${locationState.locationName || 'GPS'}</span>
            </div>
          ` : null}

          <button
            onClick=${() => {
              setIsOpen(false);
              onOpenAuth();
            }}
            className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-blue-500/30 transition-all focus:outline-none"
            aria-label="User Profile"
            title=${`Signed in as ${currentUser.name}`}
          >
            <img
              src=${currentUser.avatar}
              alt=${currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-2xs"
            />
          </button>
        </div>
      </div>

      ${isOpen ? html`
        <div className="px-4 pt-2 pb-5 border-t border-slate-100 bg-white shadow-xl animate-slide-down space-y-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex justify-between items-center text-xs mb-1 font-semibold text-slate-700">
              <span>Settlement Progress</span>
              <span className="text-blue-600 font-bold">${checklistStats.percent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-1.5 rounded-full"
                style=${{ width: `${checklistStats.percent}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            ${navItems.map(item => {
              const isActive = activePage === item.id;
              return html`
                <button
                  key=${item.id}
                  onClick=${() => handleSelectPage(item.id)}
                  className=${`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <${Icon} name=${item.icon} className="w-4 h-4" />
                    <span>${item.label}</span>
                  </div>
                  ${item.badge ? html`
                    <span className=${`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      ${item.badge}
                    </span>
                  ` : null}
                </button>
              `;
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src=${currentUser.avatar}
                alt=${currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">${currentUser.name}</p>
                <p className="text-[10px] text-slate-500">${currentUser.email}</p>
              </div>
            </div>
            <button
              onClick=${() => { setIsOpen(false); onOpenAuth(); }}
              className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100"
            >
              Switch User
            </button>
          </div>
        </div>
      ` : null}
    </header>
  `;
}
