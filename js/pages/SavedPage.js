/**
 * CityNest Saved Resources Page (User-Scoped & Private)
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';

export function SavedPage({
  currentUser,
  savedResources,
  onRemoveSaved,
  onUpdateNotes,
  onNavigate,
  onOpenHousingModal,
  onOpenEventModal,
  housingListings,
  communityEvents
}) {
  const [selectedType, setSelectedType] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [editingNotesId, setEditingNotesId] = React.useState(null);
  const [tempNotes, setTempNotes] = React.useState('');

  const typeFilters = [
    { id: 'all', label: 'All Saved' },
    { id: 'housing', label: 'Housing' },
    { id: 'event', label: 'Events' },
    { id: 'service', label: 'City Services' },
    { id: 'article', label: 'Wellness & Guides' }
  ];

  // Filter saved resources
  const filteredSaved = savedResources.filter(item => {
    const matchesType = selectedType === 'all' || item.resource_type === selectedType;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      item.title.toLowerCase().includes(term) ||
      (item.notes && item.notes.toLowerCase().includes(term));

    return matchesType && matchesSearch;
  });

  const getTypeStyle = (type) => {
    switch (type) {
      case 'housing':
        return {
          icon: 'Home',
          label: 'Housing',
          badge: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'event':
        return {
          icon: 'Calendar',
          label: 'Community Event',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
      case 'service':
        return {
          icon: 'Building2',
          label: 'City Service',
          badge: 'bg-sky-100 text-sky-800 border-sky-200'
        };
      case 'article':
      default:
        return {
          icon: 'Sparkles',
          label: 'Wellness & Guide',
          badge: 'bg-amber-100 text-amber-800 border-amber-200'
        };
    }
  };

  const handleOpenOriginal = (item) => {
    if (item.resource_type === 'housing') {
      const listing = housingListings.find(h => h.id === item.resource_id);
      if (listing) {
        onOpenHousingModal(listing);
        return;
      }
      onNavigate('housing');
    } else if (item.resource_type === 'event') {
      const event = communityEvents.find(e => e.id === item.resource_id);
      if (event) {
        onOpenEventModal(event);
        return;
      }
      onNavigate('events');
    } else if (item.resource_type === 'service') {
      onNavigate('services');
    } else {
      onNavigate('wellness');
    }
  };

  const startEditNotes = (item) => {
    setEditingNotesId(item.id);
    setTempNotes(item.notes || '');
  };

  const saveEditedNotes = (itemId) => {
    onUpdateNotes(itemId, tempNotes);
    setEditingNotesId(null);
  };

  return html`
    <div className="space-y-6 animate-fade-in pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
              My Saved Resources
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              ${savedResources.length} Items
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Private bookmarks for <strong className="text-slate-700">${currentUser.name}</strong>. Add custom notes, track tour slots, and review saved guides.
          </p>
        </div>
      </div>

      
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          ${typeFilters.map(filter => {
    const count = filter.id === 'all'
      ? savedResources.length
      : savedResources.filter(s => s.resource_type === filter.id).length;

    return html`
              <button
                key=${filter.id}
                onClick=${() => setSelectedType(filter.id)}
                className=${`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${selectedType === filter.id
        ? 'bg-slate-900 text-white shadow-xs'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
              >
                <span>${filter.label}</span>
                <span className=${`px-1.5 py-0.2 rounded-full text-[10px] ${selectedType === filter.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
      }`}>
                  ${count}
                </span>
              </button>
            `;
  })}
        </div>

        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search saved items..."
            value=${searchTerm}
            onInput=${(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-slate-500/30"
          />
          <${Icon} name="Search" className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          ${searchTerm ? html`
            <button onClick=${() => setSearchTerm('')} className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600">
              <${Icon} name="X" className="w-3.5 h-3.5" />
            </button>
          ` : null}
        </div>
      </div>

      
      ${filteredSaved.length > 0 ? html`
        <div className="space-y-4">
          ${filteredSaved.map(item => {
    const meta = getTypeStyle(item.resource_type);
    const isEditing = editingNotesId === item.id;

    return html`
              <div
                key=${item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 card-hover-effect space-y-3"
              >
                
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      <${Icon} name=${meta.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className=${`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${meta.badge}`}>
                          ${meta.label}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Saved on ${new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3
                        onClick=${() => handleOpenOriginal(item)}
                        className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        ${item.title}
                      </h3>
                    </div>
                  </div>

                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick=${() => handleOpenOriginal(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                      title="View original item"
                    >
                      <${Icon} name="ExternalLink" className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Open</span>
                    </button>

                    <button
                      onClick=${() => onRemoveSaved(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Remove bookmark"
                    >
                      <${Icon} name="Trash2" className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <${Icon} name="FileEdit" className="w-3.5 h-3.5 text-amber-600" />
                      <span>Personal Notes</span>
                    </span>
                    ${!isEditing ? html`
                      <button
                        onClick=${() => startEditNotes(item)}
                        className="text-blue-600 hover:underline text-[11px] font-semibold"
                      >
                        ${item.notes ? 'Edit Notes' : '+ Add Note'}
                      </button>
                    ` : null}
                  </div>

                  ${isEditing ? html`
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows="2"
                        value=${tempNotes}
                        onInput=${(e) => setTempNotes(e.target.value)}
                        placeholder="Add reminders, scheduled dates, phone numbers..."
                        className="w-full p-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      ></textarea>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick=${() => setEditingNotesId(null)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick=${() => saveEditedNotes(item.id)}
                          className="px-3 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-xs"
                        >
                          Save Notes
                        </button>
                      </div>
                    </div>
                  ` : html`
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      ${item.notes ? `"${item.notes}"` : html`<span className="text-slate-400 not-italic">No custom notes added yet. Click "+ Add Note" to record tour times, contact details, or checklists.</span>`}
                    </p>
                  `}
                </div>
              </div>
            `;
  })}
        </div>
      ` : html`
        
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <${Icon} name="Bookmark" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No saved resources yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Bookmark housing listings, community events, city services guides, and wellness tips to quickly access them here.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick=${() => onNavigate('housing')}
              className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <${Icon} name="Home" className="w-3.5 h-3.5" />
              <span>Explore Housing</span>
            </button>
            <button
              onClick=${() => onNavigate('events')}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
            >
              <${Icon} name="Calendar" className="w-3.5 h-3.5" />
              <span>Explore Events</span>
            </button>
            <button
              onClick=${() => onNavigate('services')}
              className="px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100 transition-colors flex items-center gap-1.5"
            >
              <${Icon} name="Building2" className="w-3.5 h-3.5" />
              <span>City Services</span>
            </button>
          </div>
        </div>
      `}
    </div>
  `;
}
