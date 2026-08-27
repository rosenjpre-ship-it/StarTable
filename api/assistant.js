import { cityLabel, loadCityConfig, loadRestaurants } from './_data.js';
import { readJson, sendJson } from './_http.js';
import { sessionFromRequest } from './_auth.js';
import { activeSubscriptionForEmail } from './_subscription.js';

function parseIntent(message, cityConfig) {
  const text = String(message || '').toLowerCase();
  const query = {};
  for (const city of cityConfig?.cities || []) {
    const tokens = [city.labelZh, city.labelEn, city.dataCity, city.id].filter(Boolean).map(value => String(value).toLowerCase());
    if (tokens.some(token => token && text.includes(token))) {
      query.city = city.labelZh;
      break;
    }
  }
  const cityAreas = [];
  for (const city of cityConfig?.cities || []) {
    cityAreas.push(...(city.areaOrder || []));
  }
  const area = [...new Set(cityAreas)]
    .filter(Boolean)
    .sort((a, b) => String(b).length - String(a).length)
    .find(value => text.includes(String(value).toLowerCase()));
  if (area) query.area = area;
  if (/银座|ginza/.test(text)) query.area = '银座';
  if (/法餐|法式|french/.test(text)) query.cuisineKeyword = '法';
  if (/寿司|sushi/.test(text)) query.cuisineKeyword = '寿司';
  if (/中餐|粤菜|chinese|cantonese/.test(text)) query.cuisineKeyword = /粤菜|cantonese/.test(text) ? '粤菜' : '中';
  if (/lunch|午餐/.test(text)) query.meal = 'lunch';
  if (/dinner|晚餐/.test(text)) query.meal = 'dinner';
  if (/没有着装|无着装|no dress|no dress code/.test(text)) query.dress = 'none';
  if (/dress code|着装/.test(text) && !query.dress) query.dress = 'required';
  if (/儿童|孩子|child|kid/.test(text)) query.child = 'yes';
  if (/solo|一个人|1人|一人/.test(text)) query.solo = 'true';
  return query;
}

function localRating(item, cityConfig) {
  const ratings = item.ratings || {};
  const city = cityConfig?.cities?.find(config => {
    const raw = String(item.city || '').toLowerCase();
    return String(config.dataCity || '').toLowerCase() === raw || String(config.id || '').toLowerCase() === raw;
  });
  for (const platform of city?.ratingPlatforms || []) {
    if (ratings[platform.key]) return ratings[platform.key];
  }
  return ratings.localScore || '';
}

function baseMatches(item, query) {
  if (query.city && cityLabel(item) !== query.city) return false;
  if (query.meal === 'lunch' && item.filters?.lunchAvailable !== true) return false;
  if (query.meal === 'dinner' && item.filters?.dinnerAvailable !== true) return false;
  if (query.dress && item.filters?.dressCategory !== query.dress) return false;
  if (query.child === 'yes' && item.filters?.childCategory !== 'yes') return false;
  if (query.solo === 'true' && item.filters?.soloDiningAvailable !== true) return false;
  return true;
}

function recommendationScore(item, query, cityConfig) {
  let score = item.stars * 100;
  const areaText = [item.areaZh, item.area, item.address, ...(item.transport?.stations || []).map(station => station.name)].filter(Boolean).join(' ');
  const cuisineText = [item.cuisineZh, item.cuisine].filter(Boolean).join(' ');
  if (query.area && areaText.includes(query.area)) score += 35;
  if (query.cuisineKeyword && cuisineText.includes(query.cuisineKeyword)) score += 35;
  if (localRating(item, cityConfig)) score += 5;
  return score;
}

function reasonFor(item, query, cityConfig) {
  const reasons = [];
  if (query.city) reasons.push(`位于${query.city}`);
  if (query.area && [item.areaZh, item.area, item.address, ...(item.transport?.stations || []).map(station => station.name)].filter(Boolean).join(' ').includes(query.area)) reasons.push(`地点匹配${query.area}`);
  if (query.cuisineKeyword && [item.cuisineZh, item.cuisine].filter(Boolean).join(' ').includes(query.cuisineKeyword)) reasons.push(`菜系匹配`);
  if (query.meal === 'lunch') reasons.push('可筛选 Lunch');
  if (query.meal === 'dinner') reasons.push('可筛选 Dinner');
  if (query.dress === 'none') reasons.push('无明确 Dress Code');
  if (query.child === 'yes') reasons.push('儿童政策已确认');
  if (query.solo === 'true') reasons.push('支持 Solo dining');
  if (localRating(item, cityConfig)) reasons.push('有公开评分参考');
  return reasons.join('，') || '综合星级、地点、菜系与筛选条件推荐。';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await readJson(req);
    const url = new URL(req.url, `https://${req.headers.host}`);
    const session = sessionFromRequest(req, url);
    const subscription = await activeSubscriptionForEmail(session?.email || body.email).catch(() => ({ active: false }));
    if (!subscription.active && Number(body.searchCount || 0) > 5) {
      return sendJson(res, 402, { error: 'Premium membership is required after 5 free assistant requests.', recommendations: [] });
    }
    const cityConfig = await loadCityConfig();
    const query = parseIntent(body.message, cityConfig);
    const restaurants = await loadRestaurants();
    const matches = restaurants
      .filter(item => baseMatches(item, query))
      .sort((a, b) => recommendationScore(b, query, cityConfig) - recommendationScore(a, query, cityConfig))
      .slice(0, 3)
      .map(item => ({
        id: item.id,
        nameZh: item.nameZh,
        nameEn: item.nameEn,
        city: item.city,
        areaZh: item.areaZh,
        cuisineZh: item.cuisineZh,
        stars: item.stars,
        reason: reasonFor(item, query, cityConfig)
      }));

    return sendJson(res, 200, {
      query,
      recommendations: matches,
      note: matches.length ? '基于当前 StarTable 数据筛选推荐。' : '当前数据中没有完全匹配条件的餐厅，请放宽地点、菜系或政策条件。'
    });
  } catch (error) {
    console.error('assistant api failed', error);
    return sendJson(res, 500, { error: 'Assistant failed to answer' });
  }
}
