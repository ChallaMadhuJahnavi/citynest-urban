/**
 * CityNest Community Events Page
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';
import { LocationBanner } from '../components/LocationBanner.js';

export function EventsPage({
  communityEvents,
  currentUser,
  locationState,
  onRequestLocation,
  onSelectPreset,
  onResetLocation,
  onOpenEventModal,
  onToggleRSVP,
  onOpenSaveNotesModal,
  savedResourceIds
}) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('distance'); // 'distance', 'date', 'popularity'

  const categories = [
    { id: 'all', label: 'All Events', icon: 'Sparkles' },
    { id: 'social', label: 'Social & Mixers', icon: 'Coffee' },
    { id: 'sports', label: 'Sports & Active', icon: 'Activity' },
    { id: 'cultural', label: 'Arts & Culture', icon: 'Palette' },
    { id: 'professional', label: 'Professional & Tech', icon: 'Briefcase' },
    { id: 'volunteer', label: 'Volunteering', icon: 'Heart' },
    { id: 'wellness', label: 'Mind & Wellness', icon: 'Sun' }
  ];

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'social': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sports': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cultural': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'professional': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'volunteer': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'wellness': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  // Filter events
  const filteredEvents = communityEvents.filter(event => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      event.title.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.neighborhood.toLowerCase().includes(term);

    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'distance') {
      if (!isFinite(a.distanceKm) && !isFinite(b.distanceKm)) return 0;
      if (!isFinite(a.distanceKm)) return 1;
      if (!isFinite(b.distanceKm)) return -1;
      return a.distanceKm - b.distanceKm;
    } else if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'popularity') {
      return (b.attendees ? b.attendees.length : 0) - (a.attendees ? a.attendees.length : 0);
    }
    return 0;
  });

  return html`
    <div className="space-y-6 animate-fade-in pb-12">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Discover Community Events
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Meet fellow new residents, join group runs, attend cultural tours, and build your local circle.
        </p>
      </div>

      
      <${LocationBanner}
        locationState=${locationState}
        onRequestLocation=${onRequestLocation}
        onSelectPreset=${onSelectPreset}
        onResetLocation=${onResetLocation}
      />

      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        ${categories.map(cat => {
    const count = cat.id === 'all'
      ? communityEvents.length
      : communityEvents.filter(e => e.category === cat.id).length;
    const isActive = selectedCategory === cat.id;

    return html`
            <button
              key=${cat.id}
              onClick=${() => setSelectedCategory(cat.id)}
              className=${`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${isActive
        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
      }`}
            >
              <${Icon} name=${cat.icon} className="w-3.5 h-3.5" />
              <span>${cat.label}</span>
              <span className=${`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
      }`}>
                ${count}
              </span>
            </button>
          `;
  })}
      </div>

      
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search events by keyword, location, or host..."
            value=${searchTerm}
            onInput=${(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
          />
          <${Icon} name="Search" className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          ${searchTerm ? html`
            <button
              onClick=${() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <${Icon} name="X" className="w-3.5 h-3.5" />
            </button>
          ` : null}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort:</span>
          <select
            value=${sortBy}
            onChange=${(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="distance">📍 Proximity (Nearest First)</option>
            <option value="date">📅 Date (Soonest First)</option>
            <option value="popularity">🔥 Most Popular (Most RSVPs)</option>
          </select>
        </div>
      </div>

      
      ${sortedEvents.length > 0 ? html`
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          ${sortedEvents.map(event => {
    const attendees = event.attendees || [];
    const isAttending = attendees.includes(currentUser.id) || (currentUser.email && attendees.includes(currentUser.email));
    const spotsLeft = Math.max(0, event.max_attendees - attendees.length);
    const isFull = spotsLeft === 0 && !isAttending;
    const isSaved = savedResourceIds.has(event.id);

    return html`
              <div
                key=${event.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 card-hover-effect flex flex-col justify-between group"
              >
                
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src=${event.image_url}
                    alt=${event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20"></div>

                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className=${`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider ${getCategoryColor(event.category)} shadow-xs`}>
                      ${event.category}
                    </span>
                  </div>

                  
                  <div className="absolute top-3 right-3">
                    <button
                      onClick=${(e) => {
        e.stopPropagation();
        onOpenSaveNotesModal({
          type: 'event',
          id: event.id,
          title: event.title,
          isSaved
        });
      }}
                      className=${`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${isSaved
        ? 'bg-amber-500 text-white ring-2 ring-amber-300'
        : 'bg-white/80 hover:bg-white text-slate-700 hover:text-amber-600'
      }`}
                      title=${isSaved ? 'Saved to bookmarks' : 'Save event'}
                    >
                      <${Icon} name="Bookmark" className=${`w-3.5 h-3.5 ${isSaved ? 'fill-white text-white' : ''}`} />
                    </button>
                  </div>

                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-center shadow-xs">
                        <span className="block text-[9px] uppercase font-bold text-emerald-600">
                          ${new Date(event.date).toLocaleString('en-US', { month: 'short' })}
                        </span>
                        <span className="block text-sm font-extrabold leading-none">
                          ${new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="text-xs font-semibold drop-shadow-md">
                        <p className="text-blue-200">${event.time}</p>
                        <p className="text-white line-clamp-1">${event.neighborhood}</p>
                      </div>
                    </div>

                    ${event.distanceFormatted ? html`
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-900/80 text-emerald-300 backdrop-blur-md border border-emerald-500/30 flex items-center gap-1">
                        <${Icon} name="Navigation" className="w-3 h-3 text-emerald-400" />
                        <span>${event.distanceFormatted}</span>
                      </span>
                    ` : null}
                  </div>
                </div>

                
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick=${() => onOpenEventModal(event)}
                      className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      ${event.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      ${event.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2.5 font-medium">
                      <${Icon} name="MapPin" className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">${event.location}</span>
                    </div>
                  </div>

                  
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">
                        ${isAttending ? html`
                          <strong className="text-emerald-600 flex items-center gap-1">
                            <${Icon} name="CheckCircle" className="w-3 h-3" />
                            <span>You're Attending</span>
                          </strong>
                        ` : isFull ? html`
                          <strong className="text-red-600">Capacity Full</strong>
                        ` : html`
                          <span>${spotsLeft} spots available</span>
                        `}
                      </span>
                      <span className="text-slate-400">${attendees.length} / ${event.max_attendees} RSVP'd</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className=${`h-1.5 rounded-full ${attendees.length >= event.max_attendees ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style=${{ width: `${Math.min(100, (attendees.length / event.max_attendees) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick=${() => onToggleRSVP(event.id)}
                        disabled=${isFull}
                        className=${`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${isAttending
        ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
        : isFull
          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
      }`}
                      >
                        <${Icon} name=${isAttending ? 'UserMinus' : isFull ? 'Lock' : 'UserPlus'} className="w-3.5 h-3.5" />
                        <span>${isAttending ? 'Cancel RSVP' : isFull ? 'Event Full' : 'RSVP Now'}</span>
                      </button>

                      <button
                        onClick=${() => onOpenEventModal(event)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="View event details"
                      >
                        <${Icon} name="Info" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
  })}
        </div>
      ` : html`
        
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <${Icon} name="CalendarX" className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No community events found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching to another category tab or clearing your search term to see more events.
          </p>
          <button
            onClick=${() => {
        setSelectedCategory('all');
        setSearchTerm('');
      }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Show All Events
          </button>
        </div>
      `}
    </div>
  `;
}
