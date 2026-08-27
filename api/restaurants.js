import {
  dataMeta,
  filterRestaurants,
  findRestaurantById,
  loadCityConfig,
  loadRestaurants,
  publicRestaurant,
  restaurantSummary
} from './_data.js';
import { sessionFromRequest } from './_auth.js';
import { activeSubscriptionForEmail } from './_subscription.js';
import { sendJson } from './_http.js';

const FREE_PREVIEW_PER_CITY_STAR = 3;

function limitedRestaurant(item) {
  const summary = restaurantSummary(item);
  return {
    ...summary,
    locked: true,
    address: item.address || '',
    phone: item.phone || '',
    links: item.links?.official ? { official: item.links.official } : {},
    sync: item.sync,
    message: 'Premium membership is required for full restaurant details.'
  };
}

function previewKey(item) {
  return `${item.city || item.cityZh || 'global'}::${item.stars || 0}`;
}

function freePreviewItems(items) {
  const seen = new Map();
  return items.filter(item => {
    const key = previewKey(item);
    const count = seen.get(key) || 0;
    seen.set(key, count + 1);
    return count < FREE_PREVIEW_PER_CITY_STAR;
  });
}

function freePreviewIds(items) {
  return new Set(freePreviewItems(items).map(item => item.id));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const url = new URL(req.url, `https://${req.headers.host}`);
    await loadCityConfig();
    const restaurants = await loadRestaurants();
    const session = sessionFromRequest(req, url);
    const subscription = await activeSubscriptionForEmail(session?.email || url.searchParams.get('email'));
    const premium = subscription.active === true;
    const id = url.searchParams.get('id');
    if (id) {
      const item = findRestaurantById(restaurants, id);
      if (!item) return sendJson(res, 404, { error: 'Restaurant not found' });
      if (!premium && !freePreviewIds(restaurants).has(item.id)) {
        return sendJson(res, 402, {
          locked: true,
          restaurant: limitedRestaurant(item),
          membership: subscription,
          freeLimitPerCityStar: FREE_PREVIEW_PER_CITY_STAR
        });
      }
      return sendJson(res, 200, { restaurant: publicRestaurant(item) });
    }

    const filtered = filterRestaurants(restaurants, Object.fromEntries(url.searchParams.entries()));
    const mode = url.searchParams.get('mode') || 'full';
    const visible = premium ? filtered : freePreviewItems(filtered);
    return sendJson(res, 200, {
      restaurants: mode === 'summary' ? visible.map(restaurantSummary) : visible.map(premium ? publicRestaurant : limitedRestaurant),
      meta: {
        ...dataMeta(restaurants),
        resultTotal: filtered.length,
        returned: visible.length,
        locked: premium ? 0 : Math.max(0, filtered.length - visible.length),
        freeLimitPerCityStar: FREE_PREVIEW_PER_CITY_STAR,
        membership: subscription
      }
    });
  } catch (error) {
    console.error('restaurants api failed', error);
    return sendJson(res, 500, { error: 'Restaurant data failed to load' });
  }
}
