const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });
const sync = summary => ({ lastChecked: today, lastUpdated: today, source: 'official / Tabelog / OMAKASE / Pocket Concierge / TABLEALL', changeSummary: summary, autoCheckEnabled: false });

const batch = {
  'kioicho-fukudaya': {
    links: {
      official: 'https://www.kioicho-fukudaya.jp/english/',
      reservation: 'https://www.kioicho-fukudaya.jp/',
      tabelog: 'https://tabelog.com/en/tokyo/A1308/A130803/13196266/'
    },
    ratings: { tabelogScore: '3.53', tabelogUrl: 'https://tabelog.com/en/tokyo/A1308/A130803/13196266/' },
    lunch: [
      course('Lunch Course', '¥26,400', ['季节日本料理', '料亭风格会席', '季节料理与日本料理风味'], '官网公开价格，含税及20%服务费。'),
      course('Lunch Course', '¥33,000', ['季节日本料理', '推荐食材会席'], '官网公开价格，含税及20%服务费。'),
      course('Lunch Course', '¥44,000', ['高级会席', '可追加使用北大路鲁山人器皿的おまかせ'], '官网公开价格，含税及20%服务费。'),
      course('Lunch Course', '¥55,000', ['高级会席', '季节高端食材'], '官网公开价格，含税及20%服务费。')
    ],
    dinner: [
      course('Dinner Course', '¥33,000', ['季节日本料理 dinner course', '料亭风格会席'], '官网公开价格，含税及20%服务费。'),
      course('Dinner Course', '¥44,000', ['晚餐高级会席', '季节食材'], '官网公开价格，含税及20%服务费。'),
      course('Dinner Course', '¥55,000', ['晚餐高级会席', '季节高端食材'], '官网公开价格，含税及20%服务费。')
    ],
    budget: { lunchFrom: '26400', dinnerFrom: '33000', serviceCharge: '已含20%服务费与税', verified: true },
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['推荐 smart casual。', '男性请避免半裤、凉鞋。', '榻榻米空间请穿袜子。', '请避免香水、古龙水。'],
      verified: true
    },
    childPolicy: { minimumAge: null, notes: '包厢料亭形式，儿童同行可电话/预约时咨询；公开页面未列固定年龄限制。', verified: false },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: '可电话或 Pocket Concierge 等预约；午餐 11:30-14:30，晚餐入店 17:00/17:30-19:30。周日、节假日及部分周六休。',
      platforms: ['official', 'phone', 'Pocket Concierge'],
      verified: true
    },
    sync: sync('补充Tabelog评分、course、预约规则与着装')
  },
  kutan: {
    links: {
      reservation: 'https://omakase.in/r/kt798502?locale=en',
      tabelog: 'https://tabelog.com/tokyo/A1313/A131301/13220750/party/'
    },
    ratings: { tabelogScore: '4.04', tabelogUrl: 'https://tabelog.com/tokyo/A1313/A131301/13220750/party/' },
    dinner: [
      course('Chef’s Tasting Course', '¥50,820', ['季节性日本料理 omakase', '7席吧台 + 6人包厢', '价格可能随当季食材上下调整'], 'OMAKASE 公开价格，含税含服务费；Tabelog 标注 ¥46,200。')
    ],
    budget: { dinnerFrom: '50820', serviceCharge: '含税含服务费', verified: true },
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['请避免短裤、凉鞋等过度休闲服装。', '请避免强烈香水。'],
      verified: true
    },
    childPolicy: { minimumAge: null, notes: '儿童仅可使用包厢。', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: 'OMAKASE 可预约。下一轮放位示例为 2026-08-15 10:00，当前开放至 2026-09-30；7日前取消30%，3日前50%，前日100%。',
      releaseTime: '10:00',
      platforms: ['OMAKASE', 'OMAKASE JapanEatinerary'],
      verified: true
    },
    sync: sync('补充Tabelog评分、course、预约规则、着装与儿童政策')
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') item.links = { ...(item.links || {}), ...value };
    else if (key === 'ratings') item.ratings = { ...(item.ratings || {}), ...value };
    else if (key === 'budget') item.budget = { ...(item.budget || {}), ...value };
    else if (key === 'reservation') item.reservation = { ...(item.reservation || {}), ...value };
    else if (key === 'sync') item.sync = { ...(item.sync || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
