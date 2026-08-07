const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-01';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'ginza-kojyu': {
    links: {
      official: 'http://www.kojyu.jp/',
      reservation: 'https://omakase.in/en/r/zt634509',
      tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13005683/'
    },
    ratings: { tabelogScore: '3.84', tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130101/13005683/' },
    lunch: [
      course('昼のおまかせコース', '¥36,300', ['季节性日本料理 omakase', '内容随食材与市场情况调整'], 'OMAKASE 公开价格，含税与服务费；Tabelog 另标料理价 ¥27,500 + 服务费。')
    ],
    dinner: [
      course('夜のおまかせコース', '¥45,980', ['季节性日本料理 omakase', '内容随食材与市场情况调整'], 'OMAKASE 公开价格，含税与服务费；Tabelog 另标料理价 ¥38,500 + 服务费。')
    ],
    budget: { lunchFrom: '36300', dinnerFrom: '45980', serviceCharge: '含税含服务费（OMAKASE价格）', verified: true },
    childPolicy: { minimumAge: 13, notes: '13岁以上，且可享用成人相同套餐者可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE 可预约；当前开放至 2026-08-31，下一轮放位时间 TBD；每月最多预约1次。', platforms: ['OMAKASE'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / Tabelog', changeSummary: '补充Tabelog评分、course、儿童政策与预约规则', autoCheckEnabled: false }
  },
  'ginza-shinohara': {
    links: { tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13200949/party/' },
    ratings: { tabelogScore: '4.56', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13200949/party/' },
    lunch: [
      course('おまかせコース', '¥35,000', ['季节性日本料理 omakase', '追加菜单可能随季节食材产生'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('おまかせコース', '¥35,000', ['季节性日本料理 omakase', '追加菜单可能随季节食材产生'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '35000', dinnerFrom: '35000', verified: true },
    childPolicy: { minimumAge: 16, notes: '16岁以上（高中生以上）可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '公开平台信息有限；建议通过日本酒店 concierge 或熟客渠道提前咨询。', conciergeRecommended: true, verified: false },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、course、儿童政策', autoCheckEnabled: false }
  },
  hakuun: {
    links: { reservation: 'https://www.tableall.com/restaurant/358' },
    dinner: [
      course('伯云 Omakase（至2026年8月）', '¥59,500', ['晚餐 omakase', '季节性日本料理'], 'TABLEALL 公开价格，含其预约手续费。'),
      course('伯云 包厢 Omakase（至2026年8月）', '¥62,000', ['包厢晚餐 omakase', '季节性日本料理'], 'TABLEALL 公开价格，含其预约手续费。'),
      course('松茸 Omakase（2026年9-12月）', '¥76,500', ['以松茸季食材为主的晚餐 omakase'], 'TABLEALL 公开价格，含其预约手续费。'),
      course('松茸包厢 Omakase（2026年9-12月）', '¥79,500', ['包厢松茸季 omakase'], 'TABLEALL 公开价格，含其预约手续费。')
    ],
    budget: { dinnerFrom: '59500', verified: true },
    childPolicy: { minimumAge: 0, notes: 'TABLEALL 标注 0 岁以上可接待；预约前建议确认座席安排。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TABLEALL 可提交预约请求；晚餐 17:30 / 20:30 两部制。', platforms: ['TABLEALL'], conciergeRecommended: true, verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TABLEALL', changeSummary: '补充预约链接、course、儿童政策', autoCheckEnabled: false }
  },
  kohaku: {
    links: { reservation: 'https://www.tableall.com/restaurant/81' },
    dinner: [
      course('虎白 Omakase', '¥65,000 起', ['晚餐 omakase', '季节性日本料理'], 'TABLEALL 公开起价，含其预约手续费。')
    ],
    budget: { dinnerFrom: '65000', verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上可接待。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TABLEALL 可提交预约请求；周六有午餐，常规晚餐 17:30-22:30。', platforms: ['TABLEALL'], conciergeRecommended: true, verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TABLEALL', changeSummary: '补充预约链接、course、儿童政策', autoCheckEnabled: false }
  },
  zurriola: {
    links: {
      official: 'https://zurriola.jp/',
      reservation: 'https://selection.tabelog.com/tokyo/A1301/A130101/13125046/',
      tabelog: 'https://selection.tabelog.com/tokyo/A1301/A130101/13125046/'
    },
    ratings: { tabelogScore: '4.09', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1301/A130101/13125046/' },
    lunch: [
      course('Lunch Standard Course', '¥14,850', ['午餐标准 course 8 品', '现代西班牙料理，内容随季节调整'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('Dinner Gastronomy Short Course', '¥32,450', ['晚餐 gastronomy short course', '内容随季节调整'], 'Tabelog 公开 course。'),
      course('Dinner Gastronomy Course', '¥36,300', ['晚餐 gastronomy course', '内容随季节调整'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '14850', dinnerFrom: '32450', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog 预约页可查询空位。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、预约链接、course', autoCheckEnabled: false }
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
