/**
 * CityNest City Services Guide Page
 * Features:
 * - 6 expandable accordion categories:
 *   1. Transportation & Transit
 *   2. Utilities & Connectivity
 *   3. Healthcare & Wellness Services
 *   4. Legal, ID & Tenant Protections
 *   5. Education & Public Libraries
 *   6. Finance, Banking & Taxes
 * - Each category features 3 comprehensive guide items with actionable steps, contact info, tips, and bookmarking.
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';

export function CityServicesPage({ cityServices, onOpenSaveNotesModal, savedResourceIds }) {
  // Store expanded accordion categories (open first category by default)
  const [expandedCategories, setExpandedCategories] = React.useState({ cat_transport: true });
  const [expandedGuideIds, setExpandedGuideIds] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState('');

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const toggleGuide = (guideId) => {
    setExpandedGuideIds(prev => ({
      ...prev,
      [guideId]: !prev[guideId]
    }));
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Train': return 'Train';
      case 'Zap': return 'Zap';
      case 'HeartPulse': return 'HeartPulse';
      case 'ShieldCheck': return 'ShieldCheck';
      case 'BookOpen': return 'BookOpen';
      case 'DollarSign': return 'DollarSign';
      default: return 'Building2';
    }
  };

  // Filter categories and guides based on search
  const filteredServices = cityServices.map(cat => {
    const term = searchTerm.toLowerCase();
    if (!term) return cat;

    const matchesCat = cat.name.toLowerCase().includes(term) || cat.description.toLowerCase().includes(term);
    const matchingGuides = cat.guides.filter(g => 
      g.title.toLowerCase().includes(term) || 
      g.summary.toLowerCase().includes(term) ||
      (g.tip && g.tip.toLowerCase().includes(term)) ||
      (g.contact && g.contact.toLowerCase().includes(term)) ||
      (g.steps && g.steps.some(s => s.toLowerCase().includes(term)))
    );

    if (matchesCat || matchingGuides.length > 0) {
      return {
        ...cat,
        guides: matchingGuides.length > 0 ? matchingGuides : cat.guides
      };
    }
    return null;
  }).filter(Boolean);

  return html`
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Essential City Services & Guides
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Everything you need to navigate municipal transit, set up electricity, register for health insurance, and understand tenant rights.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search guides (e.g., Con Edison, OMNY, REAL ID, Security Deposit, Culture Pass)..."
          value=${searchTerm}
          onInput=${(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-xs transition-all"
        />
        <${Icon} name="Search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        ${searchTerm ? html`
          <button
            onClick=${() => setSearchTerm('')}
            className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
          >
            <${Icon} name="X" className="w-4 h-4" />
          </button>
        ` : null}
      </div>

      <div className="space-y-4">
        ${filteredServices.map(category => {
          const isCategoryExpanded = expandedCategories[category.id] || searchTerm.length > 0;

          return html`
            <div
              key=${category.id}
              className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick=${() => toggleCategory(category.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <${Icon} name=${getCategoryIcon(category.icon)} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">${category.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">${category.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hidden sm:inline">
                    ${category.guides.length} Guides
                  </span>
                  <div className=${`p-1.5 rounded-lg text-slate-400 transition-transform duration-200 ${isCategoryExpanded ? 'rotate-180 text-blue-600' : ''}`}>
                    <${Icon} name="ChevronDown" className="w-5 h-5" />
                  </div>
                </div>
              </button>

              ${isCategoryExpanded ? html`
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 animate-slide-down">
                  ${category.guides.map(guide => {
                    const isGuideOpen = expandedGuideIds[guide.id] !== false;
                    const isSaved = savedResourceIds.has(guide.id);

                    return html`
                      <div
                        key=${guide.id}
                        className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-5 space-y-3 transition-all hover:bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                              <span>${guide.title}</span>
                            </h4>
                            <p className="text-xs text-slate-600 mt-1">${guide.summary}</p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick=${() => {
                                onOpenSaveNotesModal({
                                  type: 'service',
                                  id: guide.id,
                                  title: guide.title,
                                  isSaved
                                });
                              }}
                              className=${`p-2 rounded-xl transition-all ${
                                isSaved
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-white text-slate-500 hover:text-amber-600 border border-slate-200'
                              }`}
                              title=${isSaved ? 'Bookmarked' : 'Save guide'}
                            >
                              <${Icon} name="Bookmark" className=${`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                            </button>

                            <button
                              onClick=${() => toggleGuide(guide.id)}
                              className="p-2 rounded-xl bg-white text-slate-500 hover:text-slate-800 border border-slate-200"
                            >
                              <${Icon} name=${isGuideOpen ? 'ChevronUp' : 'ChevronDown'} className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        ${isGuideOpen ? html`
                          <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 animate-fade-in">
                            <div className="space-y-2">
                              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Action Steps
                              </h5>
                              <ul className="space-y-1.5 list-none pl-0">
                                ${guide.steps.map((step, idx) => html`
                                  <li key=${idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                      ${idx + 1}
                                    </span>
                                    <span className="leading-relaxed">${step}</span>
                                  </li>
                                `)}
                              </ul>
                            </div>

                            ${guide.tip ? html`
                              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                                <${Icon} name="Lightbulb" className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold">Insider Tip: </strong>
                                  <span>${guide.tip}</span>
                                </div>
                              </div>
                            ` : null}

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                              <span className="text-slate-500 font-medium">${guide.contact}</span>
                              ${guide.link ? html`
                                <a
                                  href=${guide.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                                >
                                  <span>Official Portal</span>
                                  <${Icon} name="ExternalLink" className="w-3.5 h-3.5" />
                                </a>
                              ` : null}
                            </div>
                          </div>
                        ` : null}
                      </div>
                    `;
                  })}
                </div>
              ` : null}
            </div>
          `;
        })}
      </div>
    </div>
  `;
}
