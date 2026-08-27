import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const restaurantsPath = join(root, 'data', 'restaurants.json');
const citiesPath = join(root, 'data', 'cities.json');

let restaurantCache = null;
let restaurantCacheLoadedAt = 0;
let cityConfigCache = null;

async function loadRestaurants() {
  if (restaurantCache) return restaurantCache;
  const raw = await readFile(restaurantsPath, 'utf8');
  restaurantCache = JSON.parse(raw);
  restaurantCacheLoadedAt = Date.now();
  return restaurantCache;
}

async function loadCityConfig() {
  if (cityConfigCache) return cityConfigCache;
  const raw = await readFile(citiesPath, 'utf8');
  cityConfigCache = JSON.parse(raw);
  return cityConfigCache;
}

function normalizeEmail(email) {
  const value = String(email || '').trim().toLowerCase();
  return value && value.includes('@') ? value : '';
}

function cityLabel(item) {
  const raw = String(item.city || '');
  const city = raw.toLowerCase();
  const match = cityConfigCache?.cities?.find(config => String(config.dataCity || '').toLowerCase() === city || String(config.id || '').toLowerCase() === city);
  if (match) return match.labelZh;
  if (city.includes('tokyo')) return '东京';
  if (city.includes('hong')) return '香港';
  if (city.includes('shanghai')) return '上海';
  return item.city || '其他';
}

function cityConfigForItem(item) {
  const raw = String(item.city || '').toLowerCase();
  return cityConfigCache?.cities?.find(config => String(config.dataCity || '').toLowerCase() === raw || String(config.labelZh || '').toLowerCase() === raw || String(config.id || '').toLowerCase() === raw) || null;
}

function ratingInfoForItem(item) {
  const r = item.ratings || {};
  const config = cityConfigForItem(item);
  for (const platform of config?.ratingPlatforms || []) {
    const value = r[platform.key];
    if (value) return { label: platform.label, value, url: r[platform.urlKey] };
  }
  if (r.localScore) return { label: r.localPlatform || '本地评分', value: r.localScore, url: r.localUrl };
  return null;
}

function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/\s+/g, '')
    .replace(/[·・･\-.＿_]/g, '')
    .replace(/[臺]/g, '台')
    .replace(/[龍]/g, '龙')
    .replace(/[銀]/g, '银')
    .replace(/[壽]/g, '寿')
    .replace(/[廣]/g, '广')
    .replace(/[國]/g, '国')
    .replace(/[廳]/g, '厅')
    .replace(/[樓]/g, '楼')
    .replace(/[灣]/g, '湾')
    .replace(/[麵]/g, '面');
}

function normalizeId(value) {
  return normalizeSearch(value)
    .replace(/[^a-z0-9\u4e00-\u9fffぁ-んァ-ンー]/g, '');
}

function slugFromName(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function findRestaurantById(restaurants, id) {
  const raw = String(id || '').trim();
  if (!raw) return null;
  const exact = restaurants.find(restaurant => restaurant.id === raw);
  if (exact) return exact;

  const normalized = normalizeId(raw);
  const direct = restaurants.find(restaurant => normalizeId(restaurant.id) === normalized);
  if (direct) return direct;

  const withoutCity = raw.replace(/^(tokyo|hk|hong-kong|shanghai|paris)-/i, '');
  if (withoutCity && withoutCity !== raw) {
    const stripped = restaurants.find(restaurant => restaurant.id === withoutCity || normalizeId(restaurant.id) === normalizeId(withoutCity));
    if (stripped) return stripped;
  }

  const citylessNormalized = normalizeId(withoutCity);
  return restaurants.find(restaurant => {
    const candidates = [
      restaurant.name,
      restaurant.nameEn,
      restaurant.nameZh,
      restaurant.nameJa,
      ...(restaurant.aliases || []),
      ...(restaurant.searchKeywords || [])
    ];
    return candidates.some(candidate => {
      const slug = slugFromName(candidate);
      return slug && (slug === raw || slug === withoutCity || normalizeId(slug) === normalized || normalizeId(slug) === citylessNormalized);
    });
  }) || null;
}

function searchableText(item) {
  return [
    item.name,
    item.nameEn,
    item.nameZh,
    item.nameJa,
    item.cuisine,
    item.cuisineZh,
    item.area,
    item.areaZh,
    cityLabel(item),
    ...(item.searchKeywords || []),
    ...(item.aliases || [])
  ].filter(Boolean).join(' ');
}

function filterRestaurants(restaurants, query = {}) {
  const search = normalizeSearch(query.search || query.q);
  const city = String(query.city || '').trim();
  const stars = query.stars ? Number(query.stars) : null;
  const cuisine = String(query.cuisine || '').trim();
  const area = String(query.area || '').trim();
  const meal = String(query.meal || '').trim();
  const price = String(query.price || '').trim();
  const dress = String(query.dress || '').trim();
  const child = String(query.child || '').trim();
  const solo = String(query.solo || '').trim() === 'true';

  return restaurants.filter(item => {
    if (search) {
      const hay = normalizeSearch(searchableText(item));
      if (!hay.includes(search) && ![...search].every(char => hay.includes(char))) return false;
    }
    if (city && cityLabel(item) !== city) return false;
    if (stars && item.stars !== stars) return false;
    if (cuisine && (item.cuisineZh || item.cuisine) !== cuisine) return false;
    if (area && (item.areaZh || item.area) !== area) return false;
    if (meal === 'lunch' && item.filters?.lunchAvailable !== true) return false;
    if (meal === 'dinner' && item.filters?.dinnerAvailable !== true) return false;
    if (price) {
      const key = meal === 'lunch' ? 'lunchPriceTiers' : meal === 'dinner' ? 'dinnerPriceTiers' : 'priceTiers';
      if (!item.filters?.[key]?.includes(price)) return false;
    }
    if (dress && item.filters?.dressCategory !== dress) return false;
    if (child && item.filters?.childCategory !== child) return false;
    if (solo && item.filters?.soloDiningAvailable !== true) return false;
    return true;
  });
}

function publicRestaurant(item) {
  return item;
}

function restaurantSummary(item) {
  return {
    id: item.id,
    name: item.name,
    nameEn: item.nameEn,
    nameZh: item.nameZh,
    nameJa: item.nameJa,
    city: item.city,
    cityZh: cityLabel(item),
    cityId: cityConfigForItem(item)?.id || '',
    areaZh: item.areaZh,
    cuisineZh: item.cuisineZh,
    stars: item.stars,
    heroImage: item.heroImage,
    filters: item.filters,
    rating: ratingInfoForItem(item),
    ratings: item.ratings,
    budget: item.budget
  };
}

function dataMeta(restaurants) {
  const cities = {};
  for (const item of restaurants) {
    const city = cityLabel(item);
    cities[city] ||= { total: 0, stars: { 1: 0, 2: 0, 3: 0 } };
    cities[city].total += 1;
    cities[city].stars[item.stars] = (cities[city].stars[item.stars] || 0) + 1;
  }
  return {
    total: restaurants.length,
    cities,
    cityConfig: cityConfigCache,
    cacheLoadedAt: restaurantCacheLoadedAt
  };
}

export {
  loadRestaurants,
  loadCityConfig,
  normalizeEmail,
  cityLabel,
  cityConfigForItem,
  ratingInfoForItem,
  findRestaurantById,
  filterRestaurants,
  publicRestaurant,
  restaurantSummary,
  dataMeta
};
