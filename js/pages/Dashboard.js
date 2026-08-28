/**
 * CityNest Dashboard Page
 * Features:
 * - Personalized greeting (time-of-day + user first name)
 * - 6 quick-action cards linking to each section
 * - Settlement progress widget (% complete + top 3 pending tasks)
 * - Upcoming events widget (next 3 future events with date chips)
 * - Nearby Housing recommendations
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';

export function Dashboard({
  currentUser,
  onNavigate,
  checklistItems,
  onToggleChecklistItem,
  communityEvents,
  housingListings,
  locationState,
  savedCount,
  onOpenEventModal,
  onOpenHousingModal
}) {
  // Compute greeting based on local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userFirstName = currentUser.name.split(' ')[0] || 'Resident';

  // Settlement progress computation
  const totalTasks = checklistItems.length;
  const completedTasks = checklistItems.filter(i => i.is_completed).length;
  const percentComplete = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingTasks = checklistItems.filter(i => !i.is_completed).slice(0, 3);

  // Next 3 upcoming events
  const upcomingEvents = [...communityEvents]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // Top 2 featured or nearby housing
  const featuredHousing = [...housingListings].slice(0, 2);

  // 6 Quick Action Cards
  const quickActions = [
    {
      id: 'housing',
      title: 'Find Housing',
      desc: 'Apartments, studios & shared lofts',
      icon: 'Home',
      gradient: 'from-blue-600 to-indigo-600',
      badge: `${housingListings.length} Available`
    },
    {
      id: 'events',
      title: 'Community Events',
      desc: 'Meetups, runs & cultural gatherings',
      icon: 'CalendarDays',
      gradient: 'from-emerald-600 to-teal-600',
      badge: `${communityEvents.length} Upcoming`
    },
    {
      id: 'checklist',
      title: 'Settlement Checklist',
      desc: 'Step-by-step relocation progress',
      icon: 'CheckSquare',
      gradient: 'from-amber-600 to-orange-600',
      badge: `${percentComplete}% Done`
    },
    {
      id: 'services',
      title: 'City Services',
      desc: 'Subways, ConEd, ID & tenant laws',
      icon: 'Building2',
      gradient: 'from-sky-600 to-blue-700',
      badge: '18 Guides'
    },
    {
      id: 'wellness',
      title: 'Wellness & Support',
      desc: 'Crisis hotlines, stress & self-care',
      icon: 'HeartHandshake',
      gradient: 'from-purple-600 to-pink-600',
      badge: '24/7 Care'
    },
    {
      id: 'saved',
      title: 'Saved Resources',
      desc: 'Your private bookmarks & notes',
      icon: 'Bookmark',
      gradient: 'from-slate-700 to-slate-900',
      badge: `${savedCount} Saved`
    }
  ];

  return html`
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-city p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-blue-900/15">
        <div className="relative z-10 max-w-xl lg:max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Welcome to New York City</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
            ${getGreeting()}, ${userFirstName}!
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-lg">
            Your all-in-one companion for finding a home, meeting fellow residents, connecting utilities, and thriving in the city.
          </p>

          ${locationState.status === 'granted' ? html`
            <div className="pt-2 flex items-center gap-2 text-xs text-blue-200">
              <${Icon} name="MapPin" className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="truncate">Proximity anchor set to <strong>${locationState.locationName || 'Live GPS'}</strong></span>
            </div>
          ` : null}
        </div>

        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden sm:flex items-center justify-center overflow-hidden">
          <${Icon} name="Building" className="w-72 h-72 text-white transform translate-x-8 translate-y-8" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
          <span className="text-xs text-slate-500 font-medium">Explore CityNest hubs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${quickActions.map(action => html`
            <button
              key=${action.id}
              onClick=${() => onNavigate(action.id)}
              className="text-left p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 card-hover-effect group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <div className="flex items-start justify-between mb-3">
                <div className=${`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} text-white flex items-center justify-center shadow-md`}>
                  <${Icon} name=${action.icon} className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                  ${action.badge}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>${action.title}</span>
                <${Icon} name="ArrowUpRight" className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-0.5 transition-all text-blue-600" />
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">${action.desc}</p>
            </button>
          `)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <${Icon} name="CheckSquare" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Settlement Progress</h3>
                  <p className="text-xs text-slate-500">${completedTasks} of ${totalTasks} checklist items completed</p>
                </div>
              </div>
              <button
                onClick=${() => onNavigate('checklist')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View Full Checklist</span>
                <${Icon} name="ChevronRight" className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 mb-5">
              <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                <span className="text-slate-700">Readiness Score</span>
                <span className="text-blue-600">${percentComplete}% Complete</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style=${{ width: `${percentComplete}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Next Priority Tasks
              </h4>
              ${pendingTasks.length > 0 ? html`
                <div className="space-y-2.5">
                  ${pendingTasks.map(task => html`
                    <div
                      key=${task.id}
                      className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/80 transition-all flex items-start gap-3 group"
                    >
                      <button
                        onClick=${() => onToggleChecklistItem(task.id)}
                        className="mt-0.5 w-5 h-5 rounded-md border-2 border-slate-300 hover:border-blue-600 bg-white flex items-center justify-center transition-colors shrink-0"
                      >
                        <${Icon} name="Check" className="w-3.5 h-3.5 text-transparent group-hover:text-slate-300" />
                      </button>
                      <div className="flex-1 min-w-0 cursor-pointer" onClick=${() => onNavigate('checklist')}>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1">${task.title}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${task.description}</p>
                      </div>
                      <span className=${`text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0 ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        ${task.priority}
                      </span>
                    </div>
                  `)}
                </div>
              ` : html`
                <div className="p-6 text-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <${Icon} name="PartyPopper" className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-bold">All starter tasks completed!</p>
                  <p className="text-xs text-emerald-700 mt-1">You are well settled in New York City.</p>
                </div>
              `}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <${Icon} name="CalendarDays" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upcoming Events</h3>
                  <p className="text-xs text-slate-500">Connect with local neighbors</p>
                </div>
              </div>
              <button
                onClick=${() => onNavigate('events')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>View All</span>
                <${Icon} name="ChevronRight" className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              ${upcomingEvents.map(event => {
                const attendees = event.attendees || [];
                const isAttending = attendees.includes(currentUser.id) || (currentUser.email && attendees.includes(currentUser.email));

                return html`
                  <div
                    key=${event.id}
                    onClick=${() => onOpenEventModal(event)}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center shrink-0 text-center">
                      <span className="text-[9px] uppercase font-bold text-emerald-600">
                        ${new Date(event.date).toLocaleString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-base font-extrabold text-slate-900 leading-none">
                        ${new Date(event.date).getDate()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-200/70 px-1.5 py-0.2 rounded">
                          ${event.category}
                        </span>
                        ${event.distanceFormatted ? html`
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            ${event.distanceFormatted}
                          </span>
                        ` : null}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                        ${event.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">${event.neighborhood}</p>
                    </div>

                    ${isAttending ? html`
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        RSVP'd
                      </span>
                    ` : html`
                      <${Icon} name="ChevronRight" className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    `}
                  </div>
                `;
              })}
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <button
              onClick=${() => onNavigate('events')}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <${Icon} name="Plus" className="w-3.5 h-3.5" />
              <span>Explore All Community Events</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Featured Housing Opportunities</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Verified</span>
          </div>
          <button
            onClick=${() => onNavigate('housing')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Search All Properties</span>
            <${Icon} name="ChevronRight" className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${featuredHousing.map(listing => html`
            <div
              key=${listing.id}
              onClick=${() => onOpenHousingModal(listing)}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 card-hover-effect cursor-pointer flex flex-col sm:flex-row gap-4"
            >
              <img
                src=${listing.image_url}
                alt=${listing.title}
                className="w-full sm:w-36 h-36 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      ${listing.type}
                    </span>
                    ${listing.distanceFormatted ? html`
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <${Icon} name="Navigation" className="w-3 h-3" />
                        <span>${listing.distanceFormatted}</span>
                      </span>
                    ` : null}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">${listing.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">${listing.neighborhood}</p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-base font-extrabold text-blue-600 font-display">$${listing.price.toLocaleString()}</span>
                    <span className="text-[11px] text-slate-400"> / mo</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    ${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}
                  </span>
                </div>
              </div>
            </div>
          `)}
        </div>
      </div>
    </div>
  `;
}
