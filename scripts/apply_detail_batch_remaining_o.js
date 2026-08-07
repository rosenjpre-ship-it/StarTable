const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  nol: {
    links: {
      official: 'https://nol.jp/',
      reservation: 'https://tabelog.com/en/tokyo/A1302/A130204/13243462/',
      tabelog: 'https://tabelog.com/en/tokyo/A1302/A130204/13243462/'
    },
    ratings: { tabelogScore: '3.31', tabelogUrl: 'https://tabelog.com/tw/tokyo/A1302/A130204/13243462/' },
    dinner: [
      course('nôl Menu', '¥18,500', ['季节食材 omakase', '身体负担轻的 full-course', '1-4人可预约'], 'Tabelog/TableCheck 公开价格，含税；服务费另计。'),
      course('nôl Menu + Pairing', '¥37,000', ['nôl full-course dinner', '含饮品 pairing'], 'Tabelog/TableCheck 公开价格，含税；服务费另计。'),
      course('Open Kitchen Counter Seat Reservation', '¥37,000', ['开放式厨房吧台席', '11 道 full-course + drink pairing'], 'Tabelog 公开 course。')
    ],
    budget: { dinnerFrom: '18500', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等轻装。', '请避免过量香水或古龙水。'], verified: true },
    childPolicy: { minimumAge: 15, notes: '高中生以上，且需点季节 omakase course。OMAKASE JapanEatinerary 标注15岁以上且可享用 course。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Tabelog/TableCheck/OMAKASE JapanEatinerary 可预约或申请；18:00-21:30。', platforms: ['Tabelog', 'TableCheck', 'OMAKASE JapanEatinerary'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog / TableCheck / OMAKASE JapanEatinerary', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  khao: {
    links: {
      official: 'https://khao.tokyo/en/menu/'
    },
    dinner: [
      course('Chef’s Tasting Menu', '¥22,000', ['8 道 course', '使用亚洲香草、日本蘑菇、地鸡等季节食材', '用日本食材诠释泰国料理'], '官网公开价格，含税；另收10%服务费。')
    ],
    budget: { dinnerFrom: '22000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['官网未列严格着装；建议 smart casual。'], verified: false },
    childPolicy: { minimumAge: null, notes: '官网未公开儿童政策；预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网/米其林入口可预约；取消政策：14日前5%，10日前10%，5日前50%，2日前100%。', platforms: ['official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / MICHELIN booking link', changeSummary: '补充course、预约规则', autoCheckEnabled: false }
  },
  kibun: {
    links: {
      official: 'https://kibuntokyo.com/',
      reservation: 'https://www.tablecheck.com/de/kibun'
    },
    dinner: [
      course('Nine Courses', '¥22,000', ['9 道 course', 'seasonal ingredients', 'Ultra Cuisine / itokodori 风格'], '官网公开价格，另收10%服务费和10%税。'),
      course('Chef’s choice course with alcohol pairing', '¥45,000', ['Chef’s choice course', '含酒精 pairing'], 'TableCheck 公开价格；税入，费用另计。')
    ],
    budget: { dinnerFrom: '22000', serviceCharge: '10%服务费 + 10%税', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['官网未列严格着装；建议 smart casual。'], verified: false },
    childPolicy: { minimumAge: null, notes: '官网/TableCheck 公开页未列儿童政策；预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网/TableCheck 可预约；晚餐 19:00-22:30。', platforms: ['official', 'TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck', changeSummary: '补充course与预约链接', autoCheckEnabled: false }
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
