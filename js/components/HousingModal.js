/**
 * CityNest Detailed Housing Modal
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';

export function HousingModal({
  isOpen,
  onClose,
  listing,
  isSaved,
  onToggleSave,
  onContactAgent
}) {
  const [inquiryName, setInquiryName] = React.useState('');
  const [inquiryEmail, setInquiryEmail] = React.useState('');
  const [inquiryMessage, setInquiryMessage] = React.useState('');
  const [inquirySubmitted, setInquirySubmitted] = React.useState(false);

  if (!isOpen || !listing) return null;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryEmail.trim()) return;
    setInquirySubmitted(true);
    onContactAgent(listing);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 2500);
  };

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'studio': return 'bg-purple-100 text-purple-800';
      case 'shared': return 'bg-amber-100 text-amber-800';
      case 'house': return 'bg-emerald-100 text-emerald-800';
      case 'apartment': default: return 'bg-blue-100 text-blue-800';
    }
  };

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm modal-overlay overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden modal-content my-auto animate-slide-down">
        <div className="relative h-64 sm:h-80 w-full bg-slate-100">
          <img
            src=${listing.image_url}
            alt=${listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-black/30"></div>

          <button
            onClick=${onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <${Icon} name="X" className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className=${`px-2.5 py-1 rounded-lg text-xs uppercase font-bold tracking-wider ${getTypeBadgeStyle(listing.type)} shadow-sm`}>
              ${listing.type}
            </span>
            ${listing.is_featured ? html`
              <span className="px-2.5 py-1 rounded-lg text-xs uppercase font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                <${Icon} name="Star" className="w-3.5 h-3.5 fill-white text-white" />
                <span>Featured Verified</span>
              </span>
            ` : null}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-blue-200 text-xs font-semibold mb-1">
                <${Icon} name="MapPin" className="w-3.5 h-3.5" />
                <span>${listing.neighborhood}</span>
                ${listing.distanceFormatted ? html`
                  <span>• <strong>${listing.distanceFormatted}</strong></span>
                ` : null}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                ${listing.title}
              </h2>
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                $${listing.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-200 block">/ month</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bedrooms</span>
              <span className="text-base font-extrabold text-slate-800">
                ${listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Bedroom`}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bathrooms</span>
              <span className="text-base font-extrabold text-slate-800">${listing.bathrooms} Bath</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Available</span>
              <span className="text-base font-extrabold text-emerald-600">${listing.available_date}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About this space</h4>
            <p className="text-sm text-slate-600 leading-relaxed">${listing.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Location & Address</h4>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <${Icon} name="MapPin" className="w-4 h-4 text-blue-600 shrink-0" />
              <span>${listing.address}, ${listing.neighborhood}, NYC</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Building Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              ${listing.amenities.map((amenity, idx) => html`
                <div key=${idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                  <${Icon} name="Check" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">${amenity}</span>
                </div>
              `)}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Contact Property Manager</h4>

            ${inquirySubmitted ? html`
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-1">
                <${Icon} name="CheckCircle" className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold">Inquiry Sent Successfully!</p>
                <p className="text-xs text-emerald-700">The property manager will reach out via email shortly.</p>
              </div>
            ` : html`
              <form onSubmit=${handleInquirySubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value=${inquiryName}
                    onInput=${(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value=${inquiryEmail}
                    onInput=${(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
                <textarea
                  rows="2"
                  placeholder="Ask a question or request a tour appointment..."
                  value=${inquiryMessage}
                  onInput=${(e) => setInquiryMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <${Icon} name="Send" className="w-3.5 h-3.5" />
                  <span>Send Tour Request (${listing.contact_email})</span>
                </button>
              </form>
            `}
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick=${() => onToggleSave(listing)}
            className=${`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              isSaved
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <${Icon} name="Bookmark" className=${`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>${isSaved ? 'Saved to Bookmarks' : 'Bookmark Listing'}</span>
          </button>

          <button
            onClick=${onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  `;
}
