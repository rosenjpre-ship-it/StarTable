const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const course = (name, price, details, note) => ({ name, price, details, note });
const byId = id => data.find(r => r.id === id);

const patches = {
  prunier: {
    website: 'https://www.kaikan.co.jp/en/restaurant/prunier/index.html',
    url: 'https://www.kaikan.co.jp/en/restaurant/prunier/index.html',
    difficulty: 2,
    booking: '东京会馆官网或 Tabelog 预约。',
    lunch: [
      course('Lunch Course', '¥10,000-¥24,000', ['东京会馆主餐厅法餐 lunch course'], '官网公开价格范围；另收15%服务费。'),
      course('夏の美食国産鮑を楽しむコース', '¥40,700', ['5道菜', '夏季国産鮑主题 lunch course'], 'Tabelog 公开价格，含税；另收15%服务费。')
    ],
    dinner: [
      course('Dinner Course', '¥20,000-¥28,000', ['东京会馆传统与现代法餐 dinner course'], '官网公开价格范围；另收15%服务费。'),
      course('Menu d’été', '¥30,000', ['7道菜', '夏季食材与夏野菜', '鸭 foie gras terrine、完熟芒果、生姜 gelée、マッケーン pepper 等'], 'Tabelog 公开价格，含税；另收15%服务费。')
    ],
    dressCode: { level: 'Smart casual', required: true, notes: ['官网标注 Smart Casual。'], verified: true },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '官网未明确儿童年龄限制；有4-8人包间，儿童同行需预约时确认。', verified: false },
    reservation: { difficulty: 2, difficultyLabel: '较易', bookingRule: '官网/Tabelog 预约；预约时间后30分钟无法联系会取消。', releaseTime: null, releaseWindow: null, platforms: ['Official', 'Tabelog'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '10000', dinnerFrom: '20000', serviceCharge: '15%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: null, cancellation: '前日18:00后取消或人数变更，收取预约course/plan全额', languageSupport: [], paymentMethods: ['VISA', 'Master', 'AMEX', 'UC', 'JCB'] },
    ratings: { tabelogScore: '3.70', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130201/13000153/' },
    links: { official: 'https://www.kaikan.co.jp/en/restaurant/prunier/index.html', reservation: 'https://tabelog.com/tokyo/A1302/A130201/13000153/', tabelog: 'https://tabelog.com/tokyo/A1302/A130201/13000153/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、预约、course、评分、Dress Code和取消规则', autoCheckEnabled: false }
  },
  'ren-mishina': {
    difficulty: 4,
    booking: 'Tabelog 即时网络预约；预约日期、时间或人数变更按取消规则收费。',
    lunch: [
      course('Omakase Course', '¥45,100', ['日本料理おまかせ', '重视高汤、炭火、季节食材：笋、鱧、松茸、河豚等'], 'Tabelog 公开价格，含税；服务费已含/另有服务费栏位，实际以预约页为准。')
    ],
    dinner: [
      course('Omakase Course', '¥45,100', ['日本料理おまかせ', '以季节食材与朴素火入展现味道'], 'Tabelog 公开价格，含税；服务费已含/另有服务费栏位，实际以预约页为准。')
    ],
    dressCode: { level: 'Smart casual recommended', required: null, notes: ['公开页面未列具体 Dress Code；银座高端日本料理建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: null, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Tabelog 即时预约；任何日期/时间/人数变更可能按取消规则收费。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '45100', dinnerFrom: '45100', serviceCharge: 'あり', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '4.03', tabelogUrl: 'https://tabelog.com/cn/tokyo/A1301/A130101/13221959/' },
    links: { official: '', reservation: 'https://tabelog.com/en/tokyo/A1301/A130101/13221959/', tabelog: 'https://tabelog.com/cn/tokyo/A1301/A130101/13221959/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / Michelin', changeSummary: '补充course价格、评分和预约规则', autoCheckEnabled: false }
  },
  sanosushi: {
    difficulty: 3,
    booking: 'Michelin 未提供站内预约；电话 03-6453-9666 咨询。',
    dinner: [
      course('寿司おまかせ', '¥20,000-¥29,999 目安', ['传统风格寿司', '酸味酢饭、厚切寿司料', '金枪鱼三贯为特色'], 'Michelin 标注 ¥¥¥；具体 course 价格与内容未在公开预约页确认。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需电话确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话咨询；Michelin 页面未开放线上预约。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    ratings: { tabelogScore: null, tabelogUrl: '' },
    links: { official: '', reservation: '', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin Guide', changeSummary: '补充料理概要与电话预约说明；评分/详细course待继续核验', autoCheckEnabled: false }
  },
  'tour-d-argent-tokyo': {
    difficulty: 2,
    booking: '官网/酒店餐厅预约。',
    lunch: [
      course('Lunch course', '¥18,000 起', ['经典法餐午餐 course'], '公开菜单价格会随季节变化，实际以官网预约页为准。')
    ],
    dinner: [
      course('Dinner course', '¥35,000 起', ['经典法餐 dinner course', '鸭料理为代表性体验'], '公开菜单价格会随季节变化，实际以官网预约页为准。')
    ],
    dressCode: { level: 'Smart casual', required: true, notes: ['酒店高端法餐，建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童年龄限制；儿童同行需预约时确认。', verified: false },
    reservation: { difficulty: 2, difficultyLabel: '较易', bookingRule: '官网/酒店餐厅预约；节假日和特别菜单需提前确认。', releaseTime: null, releaseWindow: null, platforms: ['Official'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: false },
    budget: { lunchFrom: '18000', dinnerFrom: '35000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official seasonal menu check', changeSummary: '补充course概要；详细政策待继续核验', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
