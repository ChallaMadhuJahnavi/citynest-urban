/**
 * CityNest Geolocation & Haversine Distance Engine
 */

// Preset locations for quick testing & demo in New York City area
export const NYC_PRESET_LOCATIONS = [
  { id: 'times_square', name: 'Times Square (Midtown Manhattan)', lat: 40.7580, lng: -73.9855 },
  { id: 'downtown_brooklyn', name: 'Downtown Brooklyn / DUMBO', lat: 40.7015, lng: -73.9875 },
  { id: 'central_park', name: 'Central Park South (Manhattan)', lat: 40.7663, lng: -73.9772 },
  { id: 'williamsburg', name: 'Williamsburg (Brooklyn)', lat: 40.7144, lng: -73.9553 },
  { id: 'astoria', name: 'Astoria (Queens)', lat: 40.7644, lng: -73.9235 },
  { id: 'financial_district', name: 'Financial District (Wall St)', lat: 40.7075, lng: -74.0090 }
];

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 * @param {number} lat1 Latitude of point 1 (in degrees)
 * @param {number} lon1 Longitude of point 1 (in degrees)
 * @param {number} lat2 Latitude of point 2 (in degrees)
 * @param {number} lon2 Longitude of point 2 (in degrees)
 * @returns {number} Distance in kilometers
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return Infinity;
  }

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  return distanceKm;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Formats distance in km to user-friendly string
 * "320 m away" (if < 1km) or "1.4 km away" (if >= 1km)
 * @param {number} distanceKm Distance in kilometers
 * @returns {string|null}
 */
export function formatDistance(distanceKm) {
  if (distanceKm == null || !isFinite(distanceKm)) {
    return null;
  }

  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m away`;
  }
  
  if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km away`;
  }

  return `${Math.round(distanceKm)} km away`;
}

/**
 * Sorts array of items by proximity to user coordinates.
 * Items without latitude/longitude are placed at the end.
 * @param {Array} items Array of items with .latitude and .longitude
 * @param {Object|null} userCoords { lat, lng }
 * @returns {Array} Sorted items with attached .distanceKm and .distanceFormatted
 */
export function sortByProximity(items, userCoords) {
  if (!items || !Array.isArray(items)) return [];

  const itemsWithDistance = items.map(item => {
    let distanceKm = Infinity;
    let distanceFormatted = null;

    if (userCoords && userCoords.lat != null && userCoords.lng != null && item.latitude != null && item.longitude != null) {
      distanceKm = calculateHaversineDistance(userCoords.lat, userCoords.lng, item.latitude, item.longitude);
      distanceFormatted = formatDistance(distanceKm);
    }

    return {
      ...item,
      distanceKm,
      distanceFormatted
    };
  });

  if (!userCoords || userCoords.lat == null || userCoords.lng == null) {
    return itemsWithDistance;
  }

  return itemsWithDistance.sort((a, b) => {
    if (!isFinite(a.distanceKm) && !isFinite(b.distanceKm)) return 0;
    if (!isFinite(a.distanceKm)) return 1;
    if (!isFinite(b.distanceKm)) return -1;
    return a.distanceKm - b.distanceKm;
  });
}
