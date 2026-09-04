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

function firstMeal(meals) {
  const meal = Array.isArray(meals) ? meals[0] : null;
  if (!meal) return '';
  return [meal.name, meal.price, ...(meal.details || []).slice(0, 2)].filter(Boolean).join('；');
}

function summarizeRestaurant(item, cityConfig) {
  return {
    id: item.id,
    nameZh: item.nameZh,
    nameEn: item.nameEn,
    city: item.city,
    areaZh: item.areaZh,
    cuisineZh: item.cuisineZh,
    stars: item.stars,
    address: item.address,
    phone: item.phone,
    lunch: firstMeal(item.lunch),
    dinner: firstMeal(item.dinner),
    budget: item.budget || {},
    reservation: item.reservation || {},
    dressCode: item.dressCode || {},
    childPolicy: item.childPolicy || {},
    soloDining: item.soloDining || {},
    localRating: localRating(item, cityConfig),
    links: item.links || {}
  };
}

function geminiText(payload) {
  return payload?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim() || '';
}

function geminiApiKey() {
  return String(process.env.GEMINI_API_KEY || '').trim();
}

function geminiModels() {
  const configured = String(process.env.GEMINI_MODEL || '').trim();
  return [...new Set([
    configured,
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash'
  ].filter(Boolean))];
}

async function askGemini({ message, query, matches, cityConfig }) {
  const apiKey = geminiApiKey();
  if (!apiKey) return null;
  const sourceData = matches.map(item => summarizeRestaurant(item, cityConfig));
  const prompt = [
    '你是 StarTable / 星宴的星助理，负责基于已核验数据库推荐米其林星级餐厅。',
    '只能使用下面 JSON 数据中的事实，不要编造官网、价格、政策、评分、地址或电话。',
    '如果字段写着“需预约确认”或“公开来源未明确”，必须保留这种不确定性。',
    '用简洁中文回答，最多 5 句话。先给选择建议，再说明每家适合什么人。不要输出 Markdown 表格。',
    '',
    `用户问题：${message}`,
    `解析条件：${JSON.stringify(query)}`,
    `候选餐厅：${JSON.stringify(sourceData)}`
  ].join('\n');
  let lastError = null;
  for (const model of geminiModels()) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 700
        }
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      const text = geminiText(payload);
      if (text) return text;
      lastError = new Error(`Gemini ${model} returned empty text`);
      console.error('gemini assistant empty response', { model });
      continue;
    }
    lastError = new Error(`Gemini ${model} failed: ${payload?.error?.message || response.status}`);
    console.error('gemini assistant model failed', { model, status: response.status, message: payload?.error?.message || 'unknown error' });
  }
  throw lastError || new Error('Gemini request failed');
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
    const matchedItems = restaurants
      .filter(item => baseMatches(item, query))
      .sort((a, b) => recommendationScore(b, query, cityConfig) - recommendationScore(a, query, cityConfig))
      .slice(0, 3);
    const matches = matchedItems
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
    let answer = '';
    let provider = 'local';
    let assistantNotice = '';
    const hasGeminiApiKey = Boolean(geminiApiKey());
    if (hasGeminiApiKey && matches.length) {
      try {
        answer = await askGemini({ message: body.message, query, matches: matchedItems, cityConfig });
        provider = answer ? 'gemini' : 'local';
      } catch (error) {
        console.error('gemini assistant failed', error);
        assistantNotice = 'Gemini 暂时不可用，已切回 StarTable 本地推荐。';
      }
    } else if (!hasGeminiApiKey) {
      assistantNotice = '当前未配置 GEMINI_API_KEY，星助理使用 StarTable 本地推荐。';
    }

    return sendJson(res, 200, {
      query,
      provider,
      answer,
      recommendations: matches,
      note: assistantNotice || (matches.length ? '基于当前 StarTable 数据筛选推荐。' : '当前数据中没有完全匹配条件的餐厅，请放宽地点、菜系或政策条件。')
    });
  } catch (error) {
    console.error('assistant api failed', error);
    return sendJson(res, 500, { error: 'Assistant failed to answer' });
  }
}
