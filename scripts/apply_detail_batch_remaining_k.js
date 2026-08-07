const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'kyobashi-tempura-fukamachi': {
    links: {
      official: 'https://fukamachi-japan.com/ja',
      reservation: 'https://fukamachi-japan.com/ja',
      tabelog: 'https://tabelog.com/tokyo/A1302/A130202/13004105/party/197093957/'
    },
    ratings: { tabelogScore: '4.10', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130202/13004105/party/197093957/' },
    lunch: [
      course('昼 Course', '¥20,000-¥29,999 目安', ['午餐天妇罗 course', '江户前天妇罗', '仅提供 course'], 'Tabelog 预算区间；具体午餐 course 需电话/AutoReserve 确认。')
    ],
    dinner: [
      course('夜 おまかせ Course', '¥32,000', ['晚餐 omakase', '传统江户前天妇罗', '详细内容请向店铺确认'], 'Tabelog 公开 course；服务费无。')
    ],
    budget: { lunchFrom: '20000', dinnerFrom: '32000', serviceCharge: '无', verified: true },
    dressCode: { level: 'No dress code', required: false, notes: ['无 Dress Code。', '请避免过量香水。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '10岁以上，或可点成人相同 course 者可入店。', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '电话或 AutoReserve 预约；晚餐 17:00 / 19:30 两部制。周一及第1/3/5周日休。',
      platforms: ['phone', 'AutoReserve'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'ten-yokota': {
    links: {
      official: 'https://www.ten-yokota.com/',
      reservation: 'https://omakase.in/ja/r/tk226638'
    },
    dinner: [
      course('季節のおまかせ天ぷらコース', '¥19,000', ['季节 omakase 天妇罗 course', '海山时令食材', '盐、天汁、酢橘、咖喱盐等搭配'], '官网公开价格，含税。')
    ],
    budget: { dinnerFrom: '19000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免过度休闲服装。', '天妇罗吧台请避免强烈香水。'], verified: false },
    childPolicy: { minimumAge: 13, notes: '中学生以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'OMAKASE 预约；17:30 起，两部制。当前开放至 2026-03-31，下一轮放位 2026-03-01 10:00；每月最多1次。',
      releaseTime: '10:00',
      platforms: ['OMAKASE'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / OMAKASE', changeSummary: '补充course、预约规则与儿童政策', autoCheckEnabled: false }
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
