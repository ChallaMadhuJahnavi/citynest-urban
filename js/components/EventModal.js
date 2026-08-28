/**
 * CityNest Detailed Community Event Modal
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';

export function EventModal({
  isOpen,
  onClose,
  event,
  currentUser,
  isSaved,
  onToggleSave,
  onToggleRSVP
}) {
  if (!isOpen || !event) return null;

  const attendees = event.attendees || [];
  const isAttending = attendees.includes(currentUser.id) || (currentUser.email && attendees.includes(currentUser.email));
  const spotsLeft = Math.max(0, event.max_attendees - attendees.length);
  const isFull = spotsLeft === 0 && !isAttending;

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

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm modal-overlay overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden modal-content my-auto animate-slide-down">
        <div className="relative h-60 sm:h-72 w-full bg-slate-100">
          <img
            src=${event.image_url}
            alt=${event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/30 to-black/20"></div>

          <button
            onClick=${onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <${Icon} name="X" className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className=${`px-2.5 py-1 rounded-lg text-xs uppercase font-bold tracking-wider ${getCategoryColor(event.category)} shadow-sm`}>
              ${event.category}
            </span>
            ${isAttending ? html`
              <span className="px-2.5 py-1 rounded-lg text-xs uppercase font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                <${Icon} name="CheckCircle" className="w-3.5 h-3.5" />
                <span>You're Attending</span>
              </span>
            ` : null}
            ${isFull ? html`
              <span className="px-2.5 py-1 rounded-lg text-xs uppercase font-bold bg-red-600 text-white shadow-sm">
                Event Full
              </span>
            ` : null}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
              ${event.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-blue-200 mt-1 font-medium">
              <span>Hosted by <strong className="text-white">${event.organizer}</strong></span>
              ${event.distanceFormatted ? html`<span>• ${event.distanceFormatted} away</span>` : null}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="p-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Date</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                ${new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
              </span>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">${event.time}</span>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fee</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-600">Free / Open</span>
            </div>
            <div className="p-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                ${isFull ? '0 spots' : `${spotsLeft} spots`}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Venue & Meeting Point</h4>
            <div className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <${Icon} name="MapPin" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-slate-900">${event.location}</strong>
                <span className="text-xs text-slate-500">${event.neighborhood}, New York City</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About the Gathering</h4>
            <p className="text-sm text-slate-600 leading-relaxed">${event.description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900">Attendance Roster</span>
              <span className="font-semibold text-emerald-700">
                ${attendees.length} of ${event.max_attendees} residents RSVP'd
              </span>
            </div>

            <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style=${{ width: `${Math.min(100, (attendees.length / event.max_attendees) * 100)}%` }}
              ></div>
            </div>

            <div className="pt-2">
              <button
                onClick=${() => onToggleRSVP(event.id)}
                disabled=${isFull}
                className=${`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isAttending
                    ? 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                    : isFull
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                }`}
              >
                <${Icon} name=${isAttending ? 'UserMinus' : isFull ? 'Lock' : 'UserPlus'} className="w-4 h-4" />
                <span>${isAttending ? 'Cancel My RSVP' : isFull ? 'Event is at Full Capacity' : 'Confirm Free RSVP'}</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <a
              href=${`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date.replace(/-/g, '')}T180000Z/${event.date.replace(/-/g, '')}T200000Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline font-semibold"
            >
              <${Icon} name="CalendarPlus" className="w-4 h-4" />
              <span>Add event to Google Calendar</span>
            </a>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick=${() => onToggleSave(event)}
            className=${`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <${Icon} name="Bookmark" className=${`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>${isSaved ? 'Saved in Bookmarks' : 'Bookmark Event'}</span>
          </button>

          <button
            onClick=${onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  `;
}
