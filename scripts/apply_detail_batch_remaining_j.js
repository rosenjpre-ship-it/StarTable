const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  ensui: {
    links: {
      official: 'https://nihonryori-ensui.com/',
      reservation: 'https://omakase.in/en/r/xx976935',
      tabelog: 'https://tabelog.com/tokyo/A1317/A131701/13254619/dtlratings/'
    },
    ratings: { tabelogScore: '4.04', tabelogUrl: 'https://tabelog.com/tokyo/A1317/A131701/13254619/dtlratings/' },
    lunch: [],
    dinner: [
      course('Chef’s Tasting Course [Mar-May]', '¥35,000 起', ['春季 omakase', '季节性日本料理', '价格随食材市场情况调整'], 'OMAKASE 公开价格；另收10%服务费。'),
      course('Summer menu courses [Jun-Aug]', '¥40,000 起', ['夏季 omakase', '季节性日本料理'], 'OMAKASE 公开价格；另收10%服务费。'),
      course('Autumn Chef’s Tasting Course Matsutake Mushroom [Sep-Nov]', '¥60,000 起', ['松茸季 omakase', '松茸供应变化时价格可能调整至 ¥45,000 起'], 'OMAKASE 公开价格；另收10%服务费。'),
      course('Winter Chef’s Tasting Course Wild Blowfish and Matsuba Crab [Dec-Feb]', '¥60,000 起', ['冬季野生河豚与松叶蟹 course', '供应变化时价格可能调整至 ¥45,000 起'], 'OMAKASE 公开价格；另收10%服务费。')
    ],
    budget: { dinnerFrom: '35000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['要求符合常识范围内的 smart casual。', '请勿使用香水。'], verified: true },
    childPolicy: { minimumAge: null, notes: '可享用成人相同料理的儿童可入店。', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: 'OMAKASE 可预约；17:00 / 20:00 两部制。当前开放至 2026-08-31；2日前起取消100%。',
      platforms: ['OMAKASE'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  seiju: {
    links: {
      reservation: 'https://omakaseje.com/restaurants/cf361312'
    },
    dinner: [
      course('Dinner Course', '¥26,000-¥30,000 目安', ['天妇罗 dinner course', '内容随季节与进货调整'], 'OMAKASE JapanEatinerary 公开价格区间；以实际支付画面为准。')
    ],
    budget: { dinnerFrom: '26000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免 T 恤、短裤、凉鞋。', '请避免香水或古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上，且可享用 course 的客人可入店。', verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'OMAKASE JapanEatinerary 可申请预约；需提前5分钟到店，迟到30分钟以上自动取消。',
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
