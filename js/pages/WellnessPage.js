/**
 * CityNest Wellness & Mental Health Page
 * Features:
 * - Daily affirmation card (random / refreshable)
 * - 6 Resource Cards (Crisis Hotlines, Managing Stress, Building Connections, Self-Care Basics, Professional Help, Know Your Rights), each with 3 items.
 * - Direct dial hotlines and resource bookmarking.
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';

export function WellnessPage({ wellnessResources, dailyAffirmations, onOpenSaveNotesModal, savedResourceIds }) {
  // Random daily affirmation index
  const [affirmationIdx, setAffirmationIdx] = React.useState(() => {
    return Math.floor(Math.random() * dailyAffirmations.length);
  });

  const handleNextAffirmation = () => {
    setAffirmationIdx(prev => (prev + 1) % dailyAffirmations.length);
  };

  const currentAffirmation = dailyAffirmations[affirmationIdx] || dailyAffirmations[0];

  const getResourceIcon = (iconName) => {
    switch (iconName) {
      case 'PhoneCall': return 'PhoneCall';
      case 'Compass': return 'Compass';
      case 'Users': return 'Users';
      case 'Smile': return 'Smile';
      case 'Sparkles': return 'Sparkles';
      case 'Shield': default: return 'Shield';
    }
  };

  return html`
    <div className="space-y-8 animate-fade-in pb-12">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
          Wellness & Mental Health Sanctuary
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Grounding tools, immediate 24/7 crisis hotlines, community circles, and self-care strategies for city living.
        </p>
      </div>

      
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 sm:p-8 shadow-xl shadow-amber-500/15">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
              <${Icon} name="Sparkles" className="w-3.5 h-3.5 text-amber-200" />
              <span>Daily Resident Affirmation • ${currentAffirmation.theme}</span>
            </div>

            <button
              onClick=${handleNextAffirmation}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold text-white transition-colors flex items-center gap-1.5"
              title="Get another mindful affirmation"
            >
              <${Icon} name="RefreshCw" className="w-3.5 h-3.5" />
              <span>Next Affirmation</span>
            </button>
          </div>

          <blockquote className="text-lg sm:text-2xl font-display font-bold leading-relaxed text-white">
            "${currentAffirmation.text}"
          </blockquote>

          <div className="flex items-center justify-between text-xs text-amber-100 pt-2 border-t border-white/20">
            <span>— ${currentAffirmation.author}</span>
            <button
              onClick=${() => {
      onOpenSaveNotesModal({
        type: 'article',
        id: `affirmation_${affirmationIdx}`,
        title: `Daily Affirmation: ${currentAffirmation.theme}`,
        isSaved: savedResourceIds.has(`affirmation_${affirmationIdx}`)
      });
    }}
              className="hover:underline font-semibold flex items-center gap-1"
            >
              <${Icon} name="Bookmark" className="w-3.5 h-3.5" />
              <span>Save this affirmation</span>
            </button>
          </div>
        </div>

        
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
          <${Icon} name="Sun" className="w-64 h-64 text-white transform translate-x-10 translate-y-8" />
        </div>
      </div>

      
      <div className="p-5 rounded-2xl bg-red-50/90 border border-red-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <${Icon} name="PhoneCall" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-950">Immediate 24/7 Crisis Support Available</h4>
            <p className="text-xs text-red-800 mt-0.5">
              If you or someone you know is in emotional distress, free and confidential support is available 24/7.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:988"
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <${Icon} name="Phone" className="w-3.5 h-3.5" />
            <span>Call 988 Lifeline</span>
          </a>
          <a
            href="sms:741741"
            className="px-3.5 py-2 rounded-xl bg-white border border-red-300 text-red-900 hover:bg-red-100/60 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <${Icon} name="MessageSquare" className="w-3.5 h-3.5" />
            <span>Text 741741</span>
          </a>
        </div>
      </div>

      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Wellness Toolkits & Guides
          </h3>
          <span className="text-xs text-slate-500 font-medium">6 Pillars of Urban Wellbeing</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          ${wellnessResources.map(category => html`
            <div
              key=${category.id}
              className="rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 card-hover-effect p-5 flex flex-col justify-between"
            >
              <div>
                
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                      <${Icon} name=${getResourceIcon(category.icon)} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 leading-tight">${category.name}</h4>
                    </div>
                  </div>
                  <span className=${`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${category.badgeColor}`}>
                    ${category.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  ${category.description}
                </p>

                
                <div className="space-y-3">
                  ${category.items.map(item => {
      const isSaved = savedResourceIds.has(item.id);

      return html`
                      <div
                        key=${item.id}
                        className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/60 transition-colors space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">${item.title}</h5>
                          <button
                            onClick=${() => {
          onOpenSaveNotesModal({
            type: 'article',
            id: item.id,
            title: item.title,
            isSaved
          });
        }}
                            className=${`p-1 rounded-md transition-colors shrink-0 ${isSaved ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'
        }`}
                            title=${isSaved ? 'Bookmarked' : 'Save resource'}
                          >
                            <${Icon} name="Bookmark" className=${`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">${item.detail}</p>

                        <div className="pt-1 flex items-center justify-between text-xs">
                          ${item.actionHref.startsWith('tel:') || item.actionHref.startsWith('sms:') ? html`
                            <a
                              href=${item.actionHref}
                              className="font-bold text-red-600 hover:underline flex items-center gap-1"
                            >
                              <${Icon} name="Phone" className="w-3 h-3" />
                              <span>${item.actionText}</span>
                            </a>
                          ` : html`
                            <span className="font-semibold text-blue-600 flex items-center gap-1">
                              <${Icon} name="BookOpen" className="w-3 h-3" />
                              <span>${item.actionText}</span>
                            </span>
                          `}
                        </div>
                      </div>
                    `;
    })}
                </div>
              </div>
            </div>
          `)}
        </div>
      </div>
    </div>
  `;
}
