/**
 * CityNest HTML Template Tagged Literal (htm + React.createElement)
 * Enables JSX syntax in native ES modules without any build step or Babel compiler.
 */

const htm = window.htm || (function() {
  // Fallback mini htm implementation if CDN is offline
  return {
    bind: (createElement) => (statics, ...args) => {
      // Basic fallback
      return statics.raw ? statics.raw.join('') : statics;
    }
  };
})();

export const html = window.htm ? window.htm.bind(React.createElement) : null;
