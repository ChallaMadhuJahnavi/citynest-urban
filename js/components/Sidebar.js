/**
 * CityNest Desktop Sidebar Navigation
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';

export function Sidebar({ activePage, setActivePage, currentUser, onOpenAuth, locationState, savedCount, checklistStats }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', desc: 'Home & Daily Overview' },
    { id: 'housing', label: 'Housing', icon: 'Home', desc: 'Apartments & Rooms' },
    { id: 'events', label: 'Community Events', icon: 'CalendarDays', desc: 'Meetups & Culture' },
    {
      id: 'checklist',
      label: 'Settlement Checklist',
      icon: 'CheckSquare',
      desc: 'Progress & Tasks',
      badge: `${checklistStats.percent}%`,
      badgeColor: checklistStats.percent === 100 ? 'bg-emerald-500 text-white' : 'bg-blue-100 text-blue-800'
    },
    { id: 'services', label: 'City Services', icon: 'Building2', desc: 'Transit, Power, ID & Legal' },
    { id: 'wellness', label: 'Wellness & Care', icon: 'HeartHandshake', desc: 'Stress, Mental & Self-Care' },
    {
      id: 'saved',
      label: 'Saved Resources',
      icon: 'Bookmark',
      desc: 'Private Bookmarks',
      badge: savedCount > 0 ? savedCount : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    }
  ];

  const getLocationBadge = () => {
    if (locationState.status === 'granted') {
      return html`
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="truncate max-w-[140px]">${locationState.locationName || 'GPS Active'}</span>
        </div>
      `;
    } else if (locationState.status === 'loading') {
      return html`
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
          <${Icon} name="Loader2" className="w-3 h-3 animate-spin" />
          <span>Detecting Location...</span>
        </div>
      `;
    } else {
      return html`
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs">
          <${Icon} name="MapPinOff" className="w-3 h-3 text-slate-400" />
          <span>Location Idle</span>
        </div>
      `;
    }
  };

  return html`
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0 z-30 shadow-xs shrink-0">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-city flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <${Icon} name="Compass" className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold font-display tracking-tight text-slate-900">CityNest</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">NYC</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Urban Settlement Co-Pilot</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-slate-700">Settlement Progress</span>
          <span className="font-bold text-blue-600">${checklistStats.percent}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-2 rounded-full transition-all duration-500"
            style=${{ width: `${checklistStats.percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
          <span>${checklistStats.completed} of ${checklistStats.total} tasks done</span>
          ${checklistStats.percent === 100 ? html`
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <${Icon} name="CheckCircle" className="w-3 h-3" />
              <span>Settled!</span>
            </span>
          ` : html`
            <span className="text-amber-600 font-medium">${checklistStats.pending} pending</span>
          `}
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Navigation</div>
        ${navItems.map(item => {
          const isActive = activePage === item.id;
          return html`
            <button
              key=${item.id}
              onClick=${() => setActivePage(item.id)}
              className=${`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-semibold'
                : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className=${`p-1 rounded-lg transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`}>
                  <${Icon} name=${item.icon} className="w-4 h-4" />
                </div>
                <span className="truncate">${item.label}</span>
              </div>

              ${item.badge ? html`
                <span className=${`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : item.badgeColor}`}>
                  ${item.badge}
                </span>
              ` : null}
            </button>
          `;
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Proximity Sort</span>
          ${getLocationBadge()}
        </div>

        <div className="pt-2 border-t border-slate-100">
          <button
            onClick=${onOpenAuth}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors text-left group"
          >
            <img
              src=${currentUser.avatar}
              alt=${currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                ${currentUser.name}
              </p>
              <p className="text-[11px] text-slate-500 truncate">${currentUser.neighborhood || currentUser.email}</p>
            </div>
            <div className="text-slate-400 group-hover:text-slate-600 p-1">
              <${Icon} name="Repeat" className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </aside>
  `;
}
