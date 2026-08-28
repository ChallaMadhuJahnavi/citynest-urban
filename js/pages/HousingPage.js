/**
 * CityNest Housing Listings Page
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';
import { LocationBanner } from '../components/LocationBanner.js';

export function HousingPage({
  housingListings,
  locationState,
  onRequestLocation,
  onSelectPreset,
  onResetLocation,
  onOpenHousingModal,
  onOpenSaveNotesModal,
  savedResourceIds
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedBeds, setSelectedBeds] = React.useState('all');
  const [maxPrice, setMaxPrice] = React.useState(6000);
  const [sortBy, setSortBy] = React.useState('distance'); // 'distance', 'price_asc', 'price_desc', 'beds'

  const propertyTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'studio', label: 'Studios' },
    { id: 'shared', label: 'Shared Rooms' },
    { id: 'house', label: 'Townhouses' }
  ];

  // Filtering
  const filteredListings = housingListings.filter(item => {
    // Search match
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      item.title.toLowerCase().includes(term) ||
      item.neighborhood.toLowerCase().includes(term) ||
      item.address.toLowerCase().includes(term) ||
      (item.amenities && item.amenities.some(a => a.toLowerCase().includes(term)));

    // Type match
    const matchesType = selectedType === 'all' || item.type === selectedType;

    // Beds match
    let matchesBeds = true;
    if (selectedBeds === 'studio') matchesBeds = item.bedrooms === 0;
    else if (selectedBeds === '1') matchesBeds = item.bedrooms === 1;
    else if (selectedBeds === '2') matchesBeds = item.bedrooms === 2;
    else if (selectedBeds === '3+') matchesBeds = item.bedrooms >= 3;

    // Price match
    const matchesPrice = item.price <= maxPrice;

    return matchesSearch && matchesType && matchesBeds && matchesPrice;
  });

  // Sorting
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'distance') {
      if (!isFinite(a.distanceKm) && !isFinite(b.distanceKm)) return 0;
      if (!isFinite(a.distanceKm)) return 1;
      if (!isFinite(b.distanceKm)) return -1;
      return a.distanceKm - b.distanceKm;
    } else if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    } else if (sortBy === 'beds') {
      return b.bedrooms - a.bedrooms;
    }
    return 0;
  });

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'studio': return 'bg-purple-100 text-purple-800';
      case 'shared': return 'bg-amber-100 text-amber-800';
      case 'house': return 'bg-emerald-100 text-emerald-800';
      case 'apartment': default: return 'bg-blue-100 text-blue-800';
    }
  };

  return html`
    <div className="space-y-6 animate-fade-in pb-12">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Find Housing in New York City
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore vetted apartments, lofts, studios, and co-living rooms sorted by distance from your location.
        </p>
      </div>

      
      <${LocationBanner}
        locationState=${locationState}
        onRequestLocation=${onRequestLocation}
        onSelectPreset=${onSelectPreset}
        onResetLocation=${onResetLocation}
      />

      
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by neighborhood (e.g. Astoria, Williamsburg), title, or amenities..."
              value=${searchTerm}
              onInput=${(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all"
            />
            <${Icon} name="Search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            ${searchTerm ? html`
              <button
                onClick=${() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <${Icon} name="X" className="w-4 h-4" />
              </button>
            ` : null}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value=${sortBy}
              onChange=${(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
            >
              <option value="distance">📍 Nearest Distance (Default)</option>
              <option value="price_asc">💵 Price: Low to High</option>
              <option value="price_desc">💎 Price: High to Low</option>
              <option value="beds">🛏️ Bedrooms: Most First</option>
            </select>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          
          <div className="flex flex-wrap items-center gap-1.5">
            ${propertyTypes.map(type => html`
              <button
                key=${type.id}
                onClick=${() => setSelectedType(type.id)}
                className=${`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedType === type.id
      ? 'bg-blue-600 text-white shadow-xs'
      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }`}
              >
                ${type.label}
              </button>
            `)}
          </div>

          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Bedrooms:</span>
            <select
              value=${selectedBeds}
              onChange=${(e) => setSelectedBeds(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700"
            >
              <option value="all">Any</option>
              <option value="studio">Studio</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3+">3+ Beds</option>
            </select>
          </div>

          
          <div className="flex items-center gap-2 min-w-[200px]">
            <span className="text-xs font-semibold text-slate-500">Max:</span>
            <input
              type="range"
              min="1000"
              max="6000"
              step="250"
              value=${maxPrice}
              onInput=${(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 sm:w-32 accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-blue-600">$${maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>${sortedListings.length}</strong> verified listings</span>
        ${sortBy === 'distance' && locationState.status === 'granted' ? html`
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <${Icon} name="Compass" className="w-3.5 h-3.5" />
            <span>Sorted nearest to ${locationState.locationName || 'your coordinates'}</span>
          </span>
        ` : null}
      </div>

      
      ${sortedListings.length > 0 ? html`
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          ${sortedListings.map(listing => {
      const isSaved = savedResourceIds.has(listing.id);

      return html`
              <div
                key=${listing.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 card-hover-effect flex flex-col justify-between group"
              >
                
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <img
                    src=${listing.image_url}
                    alt=${listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className=${`px-2 py-0.5 rounded-lg text-[10px] uppercase font-bold tracking-wider ${getTypeBadgeStyle(listing.type)} shadow-xs`}>
                      ${listing.type}
                    </span>
                    ${listing.is_featured ? html`
                      <span className="px-2 py-0.5 rounded-lg text-[10px] uppercase font-bold bg-amber-500 text-white shadow-xs flex items-center gap-0.5">
                        <${Icon} name="Star" className="w-3 h-3 fill-white text-white" />
                        <span>Featured</span>
                      </span>
                    ` : null}
                  </div>

                  
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    ${listing.distanceFormatted ? html`
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-emerald-300 backdrop-blur-md border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                        <${Icon} name="Navigation" className="w-3 h-3 text-emerald-400" />
                        <span>${listing.distanceFormatted}</span>
                      </span>
                    ` : html`
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-900/60 text-slate-300 backdrop-blur-md">
                        Location idle
                      </span>
                    `}
                  </div>

                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <span className="text-2xl font-extrabold font-display text-white drop-shadow-md">
                        $${listing.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-200"> / month</span>
                    </div>

                    <button
                      onClick=${(e) => {
          e.stopPropagation();
          onOpenSaveNotesModal({
            type: 'housing',
            id: listing.id,
            title: listing.title,
            isSaved
          });
        }}
                      className=${`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${isSaved
          ? 'bg-amber-500 text-white ring-2 ring-amber-300'
          : 'bg-white/80 hover:bg-white text-slate-700 hover:text-amber-600'
        }`}
                      title=${isSaved ? 'Saved to bookmarks' : 'Save listing'}
                    >
                      <${Icon} name="Bookmark" className=${`w-4 h-4 ${isSaved ? 'fill-white text-white' : ''}`} />
                    </button>
                  </div>
                </div>

                
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mb-1">
                      <${Icon} name="MapPin" className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">${listing.neighborhood}</span>
                    </div>

                    <h3
                      onClick=${() => onOpenHousingModal(listing)}
                      className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      ${listing.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      ${listing.description}
                    </p>
                  </div>

                  
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      ${listing.amenities.slice(0, 3).map((amenity, idx) => html`
                        <span key=${idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          ${amenity}
                        </span>
                      `)}
                      ${listing.amenities.length > 3 ? html`
                        <span className="text-[11px] font-semibold text-slate-400 self-center">
                          +${listing.amenities.length - 3} more
                        </span>
                      ` : null}
                    </div>

                    
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                        ${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}
                      </span>

                      <button
                        onClick=${() => onOpenHousingModal(listing)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <${Icon} name="ChevronRight" className="w-3.5 h-3.5" />
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
            <${Icon} name="Home" className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No properties matched your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, bedroom count, or price range slider to discover more listings.
          </p>
          <button
            onClick=${() => {
        setSearchTerm('');
        setSelectedType('all');
        setSelectedBeds('all');
        setMaxPrice(6000);
      }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      `}
    </div>
  `;
}
