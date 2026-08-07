const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'sushi-ryujiro': {
    links: {
      reservation: 'https://omakase.in/en/r/uk638032',
      tabelog: 'https://tabelog.com/en/tokyo/A1306/A130603/13240787/'
    },
    ratings: { tabelogScore: '4.38', tabelogUrl: 'https://tabelog.com/en/tokyo/A1306/A130603/13240787/' },
    lunch: [
      course('[Lunch] Nigiri Course', '¥19,250 起', ['握寿司 12 贯', '巻物'], 'OMAKASE 公开价格；价格可能随市场情况变化。'),
      course('[Lunch/Dinner] Chef’s tasting course', '¥32,450 起', ['寿司与小菜的 omakase', 'second chef course'], 'OMAKASE 公开价格；价格可能随市场情况变化。'),
      course('[Lunch/Dinner] Chef’s tasting course master', '¥33,000 起', ['寿司与小菜的 omakase', 'master course'], 'OMAKASE 公开价格；价格可能随市场情况变化。')
    ],
    dinner: [
      course('[Lunch/Dinner] Chef’s tasting course', '¥32,450 起', ['寿司与小菜的 omakase', 'second chef course'], 'OMAKASE 公开价格；价格可能随市场情况变化。'),
      course('[Lunch/Dinner] Chef’s tasting course master', '¥33,000 起', ['寿司与小菜的 omakase', 'master course'], 'OMAKASE 公开价格；价格可能随市场情况变化。')
    ],
    budget: { lunchFrom: '19250', dinnerFrom: '32450', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['使用香水、护手霜等强烈香味产品可能被拒绝入店。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '13岁以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 预约；12:00 / 18:00 / 20:30。当前开放至 2026-08-31，下一轮 2026-08-01 14:00。迟到15分钟以上可能被视为取消。', releaseTime: '14:00', platforms: ['OMAKASE', 'Shokuoku'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'sushi-oya': {
    links: {
      reservation: 'https://omakaseje.com/restaurants/it683415'
    },
    dinner: [
      course('OMAKASE Course', '¥38,500', ['寿司 omakase', '价格含税含服务费', '内容随市场情况可能调整'], 'OMAKASE JapanEatinerary 公开价格。')
    ],
    budget: { dinnerFrom: '38500', serviceCharge: '含税含服务费', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['Smart casual。', '不可穿 T 恤、短裤、凉鞋。', '请避免过量香水或柔软剂香味。'], verified: true },
    childPolicy: { minimumAge: 14, notes: '主吧台不接待儿童；包厢吧台可接待。14岁以上且可享用 course 者可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE JapanEatinerary 可申请；18:00 / 20:30。需提前5分钟到店，超过预约时间未联系将自动取消。', platforms: ['OMAKASE JapanEatinerary'], verified: true },
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
