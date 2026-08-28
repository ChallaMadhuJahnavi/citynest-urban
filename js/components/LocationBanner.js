/**
 * CityNest Location Permission Banner
 * Supports 4 states:
 * - 'granted': Green confirmation + active coordinates / neighborhood name + preset switcher
 * - 'loading': Spinner + detecting status
 * - 'denied'/'unavailable': Amber alert + retry button + quick NYC preset selector
 * - 'idle': Blue banner + 'Enable Location' button to trigger Geolocation API
 */

import { html } from '../html.js';
import { Icon } from './Icon.js';
import { NYC_PRESET_LOCATIONS } from '../geo.js';

export function LocationBanner({ locationState, onRequestLocation, onSelectPreset, onResetLocation }) {
  const [showPresets, setShowPresets] = React.useState(false);

  // 1. GRANTED STATE (Green)
  if (locationState.status === 'granted') {
    return html`
      <div className="mb-6 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 shadow-sm backdrop-blur-sm transition-all animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
              <${Icon} name="MapPinCheck" className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-emerald-950">
                  Location Proximity Active
                </h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse"></span>
                  Proximity Sorted
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                Current anchor: <strong className="text-emerald-950 font-semibold">${locationState.locationName || (locationState.coords ? `${locationState.coords.lat.toFixed(4)}, ${locationState.coords.lng.toFixed(4)}` : 'Active GPS')}</strong>. Listings & events are ordered by distance from you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <div className="relative">
              <button
                onClick=${() => setShowPresets(!showPresets)}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-xl hover:bg-emerald-100/60 transition-colors shadow-xs flex items-center gap-1.5"
              >
                <${Icon} name="Navigation" className="w-3.5 h-3.5 text-emerald-700" />
                <span>Change Area</span>
                <${Icon} name="ChevronDown" className="w-3 h-3 text-emerald-700" />
              </button>

              ${showPresets ? html`
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-slide-down">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">NYC Neighborhood Presets</div>
                  ${NYC_PRESET_LOCATIONS.map(loc => html`
                    <button
                      key=${loc.id}
                      onClick=${() => {
                        onSelectPreset(loc);
                        setShowPresets(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 flex items-center justify-between transition-colors"
                    >
                      <span className="font-medium">${loc.name}</span>
                      ${locationState.locationName === loc.name ? html`
                        <${Icon} name="Check" className="w-3.5 h-3.5 text-emerald-600" />
                      ` : null}
                    </button>
                  `)}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick=${() => {
                        onRequestLocation();
                        setShowPresets(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                    >
                      <${Icon} name="LocateFixed" className="w-3.5 h-3.5" />
                      <span>Use Real Device GPS</span>
                    </button>
                    ${onResetLocation ? html`
                      <button
                        onClick=${() => {
                          onResetLocation();
                          setShowPresets(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                      >
                        <${Icon} name="MapPinOff" className="w-3.5 h-3.5 text-slate-400" />
                        <span>Reset Location</span>
                      </button>
                    ` : null}
                  </div>
                </div>
              ` : null}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. LOADING STATE (Blue Spinner)
  if (locationState.status === 'loading') {
    return html`
      <div className="mb-6 p-4 rounded-2xl bg-blue-50/90 border border-blue-200 shadow-sm backdrop-blur-sm transition-all animate-fade-in">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <${Icon} name="Loader2" className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-blue-950">Acquiring Your Location...</h4>
            <p className="text-xs text-blue-700 mt-0.5">
              Querying browser Geolocation API to calculate accurate proximity distances. Please allow browser location access if prompted.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 3. DENIED / UNAVAILABLE STATE (Amber + Retry & Presets)
  if (locationState.status === 'denied' || locationState.status === 'error') {
    return html`
      <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 shadow-sm backdrop-blur-sm transition-all animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20">
              <${Icon} name="AlertTriangle" className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-amber-950">Location Permission Unavailable or Denied</h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Proximity Inactive
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                ${locationState.errorMessage || 'Browser geolocation permission was not granted.'} You can retry GPS or select an NYC area below to view distance badges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
            <button
              onClick=${onRequestLocation}
              className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <${Icon} name="RefreshCw" className="w-3.5 h-3.5" />
              <span>Retry GPS</span>
            </button>

            <div className="relative">
              <button
                onClick=${() => setShowPresets(!showPresets)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-amber-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
              >
                <${Icon} name="MapPin" className="w-3.5 h-3.5 text-amber-600" />
                <span>Choose NYC Preset</span>
                <${Icon} name="ChevronDown" className="w-3 h-3 text-slate-500" />
              </button>

              ${showPresets ? html`
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-slide-down">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select NYC Neighborhood</div>
                  ${NYC_PRESET_LOCATIONS.map(loc => html`
                    <button
                      key=${loc.id}
                      onClick=${() => {
                        onSelectPreset(loc);
                        setShowPresets(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 flex items-center justify-between transition-colors"
                    >
                      <span className="font-medium">${loc.name}</span>
                    </button>
                  `)}
                </div>
              ` : null}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. IDLE STATE (Blue + Enable Button)
  return html`
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200 shadow-sm backdrop-blur-sm transition-all animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <${Icon} name="LocateFixed" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Enable Location to Sort by Proximity
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Discover housing and community events closest to your exact street with live distance calculations (e.g. <em>"320 m away"</em>).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="relative">
            <button
              onClick=${() => setShowPresets(!showPresets)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>NYC Presets</span>
              <${Icon} name="ChevronDown" className="w-3 h-3 text-slate-500" />
            </button>

            ${showPresets ? html`
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-slide-down">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select NYC Neighborhood</div>
                ${NYC_PRESET_LOCATIONS.map(loc => html`
                  <button
                    key=${loc.id}
                    onClick=${() => {
                      onSelectPreset(loc);
                      setShowPresets(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">${loc.name}</span>
                  </button>
                `)}
              </div>
            ` : null}
          </div>

          <button
            onClick=${onRequestLocation}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/25 flex items-center gap-1.5"
          >
            <${Icon} name="Navigation" className="w-3.5 h-3.5" />
            <span>Enable Location</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
