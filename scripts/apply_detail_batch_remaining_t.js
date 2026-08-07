const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'sushi-keita': {
    links: {
      reservation: 'https://omakase.in/en/r/ip613855',
      tabelog: 'https://tabelog.com/tokyo/A1313/A131301/13213360/dtlrvwlst/B500698883/'
    },
    ratings: { tabelogScore: '3.91', tabelogUrl: 'https://tabelog.com/tokyo/A1313/A131301/13213360/dtlrvwlst/B500698883/' },
    lunch: [
      course('[Lunch] Chef’s Tasting Course (Nigiri only)', '¥14,000', ['握寿司为主的午餐 course'], 'OMAKASE 公开价格；另收服务费。')
    ],
    dinner: [
      course('Chef’s Tasting Course', '¥28,000 起', ['寿司 omakase', '内容随市场情况调整'], 'OMAKASE 公开价格；另收服务费。'),
      course('Second chef Course', '¥20,000', ['不定期提供的 second chef course'], 'OMAKASE 公开价格；另收服务费。')
    ],
    budget: { lunchFrom: '14000', dinnerFrom: '28000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['请避免香水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '中学生以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 预约；水/土午餐12:00，晚餐17:30/20:15。当前开放至 2026-08-31，下一轮 2026-08-01 12:00；每月最多1次。7日前取消50%，3日前100%。', releaseTime: '12:00', platforms: ['OMAKASE', 'TABLEALL'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / Tabelog / TABLEALL', changeSummary: '补充Tabelog评分、预约链接、course、着装与儿童政策', autoCheckEnabled: false }
  },
  'sushi-masashi': {
    links: {
      official: 'https://sushimasashi.tokyo/'
    },
    lunch: [
      course('おまかせコース', '¥39,600', ['寿司 omakase', '小菜与握寿司', '内容随季节与市场调整'], '本店官网公开价格，含税。')
    ],
    dinner: [
      course('おまかせコース', '¥39,600', ['寿司 omakase', '小菜与握寿司', '内容随季节与市场调整'], '本店官网公开价格，含税。')
    ],
    budget: { lunchFrom: '39600', dinnerFrom: '39600', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['寿司吧台建议 smart casual。', '请避免强烈香水。'], verified: false },
    childPolicy: { minimumAge: null, notes: '官网未列儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '预约制；午餐12:00一部制，晚餐17:30/20:00两部制。周日、节假日休，另有不定期周三休。', platforms: ['official', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official', changeSummary: '补充course与预约规则', autoCheckEnabled: false }
  },
  'sushi-miura': {
    links: {
      reservation: 'https://omakaseje.com/restaurants/fv217614',
      tabelog: 'https://tabelog.com/en/tokyo/A1308/A130801/13285717/dtlrvwlst/'
    },
    lunch: [
      course('OMAKASE Course', '约 USD 154.62', ['寿司 omakase', '税与服务费含在平台价格中'], 'OMAKASE JapanEatinerary 公开价格；日元价格以平台实时汇率为准。')
    ],
    dinner: [
      course('OMAKASE Course', '约 USD 216.48', ['寿司 omakase', '税与服务费含在平台价格中'], 'OMAKASE JapanEatinerary 公开价格；日元价格以平台实时汇率为准。')
    ],
    budget: { lunchFrom: '22000', dinnerFrom: '32000', serviceCharge: '含税含服务费（平台价格）', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['Smart casual。', '不可穿 T 恤、短裤、凉鞋。'], verified: true },
    childPolicy: { minimumAge: 18, notes: '18岁以上可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE JapanEatinerary 可申请；需提前5分钟到店，超时未联系自动取消。不能接受大范围过敏、麸质过敏或不能吃生鱼者。', platforms: ['OMAKASE JapanEatinerary'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE JapanEatinerary / Tabelog', changeSummary: '补充预约链接、course、着装与儿童政策', autoCheckEnabled: false }
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
