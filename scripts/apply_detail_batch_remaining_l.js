const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'sushi-hashimoto': {
    links: {
      reservation: 'https://omakase.in/en/r/gw622283',
      tabelog: 'https://tabelog.com/en/tokyo/A1313/A131301/13238306/'
    },
    ratings: { tabelogScore: '4.47', tabelogUrl: 'https://tabelog.com/en/tokyo/A1313/A131301/13238306/' },
    lunch: [
      course('Chef’s Tasting Course', '¥36,300 起', ['寿司 omakase', '季节鱼介与小菜', '价格随季节食材调整'], 'OMAKASE 公开价格；另收10%服务费。')
    ],
    dinner: [
      course('Chef’s Tasting Course', '¥36,300 起', ['寿司 omakase', '季节鱼介与小菜', '价格随季节食材调整'], 'OMAKASE 公开价格；另收10%服务费。')
    ],
    budget: { lunchFrom: '36300', dinnerFrom: '36300', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['寿司吧台建议 smart casual。', '请避免强烈香水。'], verified: false },
    childPolicy: { minimumAge: null, notes: 'OMAKASE 当前公开页未列儿童规则；预约前需确认。', verified: false },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: 'OMAKASE 每月5日12:00开放次月及次次月底座位；当前开放至 2026-09-30，下一轮 2026-08-05 12:00。前日取消50%，当日100%。',
      releaseTime: '每月5日 12:00',
      platforms: ['OMAKASE'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / Tabelog', changeSummary: '补充Tabelog评分、course与预约规则', autoCheckEnabled: false }
  },
  'sushi-ichijo': {
    links: {
      official: 'https://sushi-ichijo.com/en/menu',
      reservation: 'https://www.tablecheck.com/en/shops/sushi-ichijyo/reserve'
    },
    lunch: [
      course('Lunch Omakase Nigiri', '¥33,000', ['握寿司 15 贯', '天然鱼介为主的江户前寿司'], 'TableCheck 当前公开价格。')
    ],
    dinner: [
      course('Omakase Course', '¥38,500', ['小菜 6-7 种', '握寿司 13-15 贯', '按客人偏好调整'], 'TableCheck 当前公开价格。')
    ],
    budget: { lunchFrom: '33000', dinnerFrom: '38500', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免背心、凉鞋等轻装。', '请尽量避免使用香水。'], verified: true },
    childPolicy: { minimumAge: 18, notes: '18岁以上可入店。', verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'TableCheck 预约；4人以上需直接联系店铺。迟到30分钟且无法联系时可能取消。',
      platforms: ['TableCheck'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck', changeSummary: '补充course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'edomae-sushi-hanabusa': {
    links: {
      official: 'https://akasaka-hanabusa.com',
      reservation: 'https://omakaseje.com/restaurants/xw957939'
    },
    dinner: [
      course('主厨推荐握寿司套餐', '约 USD 224.52', ['约 10 贯握寿司', '江户前寿司 course', '每人需点完整套餐'], 'OMAKASE JapanEatinerary 公开价格；含税含服务费。')
    ],
    budget: { dinnerFrom: '33000', serviceCharge: '含税含服务费（平台价格）', verified: true },
    dressCode: { level: 'Business casual', required: true, notes: ['请避免 T 恤、短裤、凉鞋。', '请避免过浓香水或柔顺剂香味。'], verified: true },
    childPolicy: { minimumAge: 15, notes: '15岁以上可入店。', verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'OMAKASE JapanEatinerary 可申请预约；需提前5分钟到店，迟到15分钟以上自动取消。',
      platforms: ['OMAKASE JapanEatinerary'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE JapanEatinerary', changeSummary: '补充预约链接、course、着装与儿童政策', autoCheckEnabled: false }
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
