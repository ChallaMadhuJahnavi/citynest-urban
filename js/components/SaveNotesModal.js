/**
 * CityNest Save Resource Modal with Personal Notes
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';

export function SaveNotesModal({ isOpen, onClose, resource, isSaved, existingNotes, onSave, onRemove }) {
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    setNotes(existingNotes || '');
  }, [existingNotes, isOpen]);

  if (!isOpen || !resource) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSave(notes);
    onClose();
  };

  const handleRemove = () => {
    onRemove();
    onClose();
  };

  return html`
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-overlay">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden modal-content animate-slide-down">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <${Icon} name="Bookmark" className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ${isSaved ? 'Edit Saved Resource' : 'Save to My Resources'}
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-[240px]">${resource.title}</p>
            </div>
          </div>
          <button
            onClick=${onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <${Icon} name="X" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit=${handleSave} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Personal Notes (Private to your profile)
            </label>
            <textarea
              rows="3"
              placeholder="e.g. Call landlord next Tuesday, asking price includes heat and water, walking distance to line N/W..."
              value=${notes}
              onInput=${(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all leading-relaxed"
            ></textarea>
            <p className="text-[11px] text-slate-400 mt-1">
              Notes are only visible to you when browsing your Saved Resources tab.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            ${isSaved ? html`
              <button
                type="button"
                onClick=${handleRemove}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
              >
                <${Icon} name="Trash2" className="w-3.5 h-3.5" />
                <span>Remove Bookmark</span>
              </button>
            ` : html`<div></div>`}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick=${onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                <${Icon} name="Bookmark" className="w-3.5 h-3.5 fill-white" />
                <span>${isSaved ? 'Update Notes' : 'Save Resource'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}
