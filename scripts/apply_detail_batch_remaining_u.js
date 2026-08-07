const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'nihombashi-sonoji': {
    links: {
      tabelog: 'https://tabelog.com/en/tokyo/A1302/A130204/13201969/'
    },
    ratings: { tabelogScore: '4.45', tabelogUrl: 'https://tabelog.com/en/tokyo/A1302/A130204/13201969/' },
    lunch: [
      course('Tempura Omakase Lunch', '¥20,000-¥29,999 目安', ['江户前天妇罗', '以静冈食材为主', '最后以手打荞麦收尾'], 'Tabelog 预算区间；仅 omakase，同步开始。另收5%服务费。')
    ],
    dinner: [
      course('Tempura Omakase Dinner', '¥30,000-¥39,999 目安', ['江户前天妇罗', '以静冈食材为主', '最后以手打荞麦收尾'], 'Tabelog 预算区间；仅 omakase，同步开始。另收5%服务费。')
    ],
    budget: { lunchFrom: '20000', dinnerFrom: '30000', serviceCharge: '5%', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['若有荞麦过敏请勿预约。', '请勿使用强烈香水。'], verified: true },
    childPolicy: { minimumAge: null, notes: '公开页面未明确儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'Tabelog 可预约；12:00 / 18:30 同步开始。3日前50%，前日100%。', platforms: ['Tabelog', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、course、预约规则与着装', autoCheckEnabled: false }
  },
  'nishiazabu-taku': {
    links: {
      official: 'https://nishiazabu-taku.com/',
      reservation: 'https://omakase.in/en/r/uc230358',
      tabelog: 'https://tabelog.com/en/tokyo/A1307/A130701/13020952/'
    },
    ratings: { tabelogScore: '3.57', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130701/13020952/' },
    lunch: [
      course('Chef’s Tasting Course', '¥35,200', ['寿司 omakase', '价格可能随市场情况变化'], 'OMAKASE 公开价格；周六午餐/傍晚时段可预约时以平台显示为准。')
    ],
    dinner: [
      course('Chef’s Tasting Course', '¥35,200', ['寿司 omakase', '价格可能随市场情况变化'], 'OMAKASE 公开价格。')
    ],
    budget: { lunchFrom: '35200', dinnerFrom: '35200', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['请勿使用香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '中学生以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE 可预约；18:00 起。当前开放至 2026-09-30，下一轮 2026-08-01 14:00。7日前30%，3日前50%，当日100%。', releaseTime: '14:00', platforms: ['OMAKASE', 'OMAKASE JapanEatinerary'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / Tabelog', changeSummary: '补充Tabelog评分、预约链接、course、着装与儿童政策', autoCheckEnabled: false }
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
