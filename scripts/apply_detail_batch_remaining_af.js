const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  torakuro: {
    website: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/imperialhotel-torakuro',
    url: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/imperialhotel-torakuro',
    difficulty: 3,
    booking: '完全预约制；帝国酒店官网/Tabelog/电话预约。',
    lunch: [
      course('おまかせコース', '¥45,000 起', ['帝国ホテル 寅黒 日本料理 course'], '帝国酒店官网标注价格 from ¥45,000；Tabelog 另有 ¥42,000 信息，实际以官网为准。')
    ],
    dinner: [
      course('おまかせコース', '¥45,000 起', ['日本料理 course', '每月更新菜单，酒店高端日本料理服务'], '帝国酒店官网标注价格 from ¥45,000。')
    ],
    dressCode: { level: 'Hotel fine dining', required: null, notes: ['官网公开页未列具体 Dress Code；帝国酒店高端餐厅建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童年龄限制；有3间包间，儿童同行需预约时确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；周六有午餐，周二至周六晚餐，L.O.20:30。', releaseTime: null, releaseWindow: null, platforms: ['Official', 'Tabelog', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '45000', dinnerFrom: '45000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: null, cancellation: '3日前-前日50%；当日100%', languageSupport: [], paymentMethods: ['信用卡', '电子货币', 'QR支付'] },
    ratings: { tabelogScore: '3.70', tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130102/13299818/' },
    links: { official: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/imperialhotel-torakuro', reservation: 'https://tabelog.com/en/tokyo/A1301/A130102/13299818/', tabelog: 'https://tabelog.com/en/tokyo/A1301/A130102/13299818/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、course、评分、预约和取消规则', autoCheckEnabled: false }
  },
  'trois-visages': {
    website: 'https://troisvisages.jp/en/',
    url: 'https://troisvisages.jp/en/',
    difficulty: 2,
    booking: '完全预约制；Tabelog/官网预约；不接受现金。',
    lunch: [
      course('Lunch 6-Course', '¥8,800', ['6道：2道咸点/料理 + 4道甜点', 'whey mousse salad、主菜、甜点等'], '官网与 Tabelog 公开价格，含税；堂食另收10%服务费。')
    ],
    dinner: [
      course("Chef's Omakase Course", '¥17,600', ['11道菜', 'amuse-bouche 到 mignardises', '约6周更换主题，使用季节食材'], 'Tabelog 公开价格，含税；堂食另收10%服务费。'),
      course('Aged hornless Wagyu dinner course', '¥20,000', ['11道菜', '以山口县无角和牛为主菜', '熟成与鲜肉不同部位呈现'], 'Tabelog 公开价格，含税；堂食另收10%服务费。')
    ],
    dressCode: { level: 'Smart casual recommended', required: true, notes: ['推荐 smart casual。'], verified: true },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策；有4-6人包间，儿童同行需预约时确认。', verified: false },
    reservation: { difficulty: 2, difficultyLabel: '较易', bookingRule: '完全预约制；过敏需至少2日前告知；无现金支付。', releaseTime: null, releaseWindow: null, platforms: ['Official', 'Tabelog'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: 2, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '8800', dinnerFrom: '17600', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.74', tabelogUrl: 'https://tabelog.com/en/tokyo/A1313/A131301/13270715/' },
    links: { official: 'https://troisvisages.jp/en/', reservation: 'https://tabelog.com/en/tokyo/A1313/A131301/13270715/', tabelog: 'https://tabelog.com/en/tokyo/A1313/A131301/13270715/', instagram: 'https://www.instagram.com/trois.visages/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、course、评分、预约、Dress Code和支付规则', autoCheckEnabled: false }
  },
  ubuka: {
    website: 'https://ubuka.jp/',
    url: 'https://ubuka.jp/',
    difficulty: 3,
    booking: 'OMAKASE 专用网站预约。',
    dinner: [
      course('おまかせ', '¥27,500', ['以虾、蟹料理为主的单一 course'], 'Tabelog 公开备注，含税。')
    ],
    dressCode: { level: 'None', required: false, notes: ['Tabelog 标注无 Dress Code。'], verified: true },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: false, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: 'Tabelog 标注预约时咨询。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '通过 OMAKASE 专用网站预约。', releaseTime: null, releaseWindow: null, platforms: ['OMAKASE'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '27500', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: null, tabelogUrl: 'https://tabelog.com/tw/tokyo/A1309/A130903/13139225/' },
    links: { official: 'https://ubuka.jp/', reservation: 'https://ubuka.jp/', tabelog: 'https://tabelog.com/tw/tokyo/A1309/A130903/13139225/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、course、预约方式和Dress Code', autoCheckEnabled: false }
  },
  towa: {
    difficulty: 3,
    booking: '电话 03-6433-5680；Michelin 显示可线上预约，但未确认官方预约页。',
    dinner: [
      course('和牛会席 course', '¥30,000-¥39,999 目安', ['会席与和牛结合', '造り、椀物、牛尾春卷、炭烤牛舌、牛排炸物等'], 'Michelin 公开说明；具体价格与菜单需预约时确认。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话咨询；线上预约入口需进一步确认。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    links: { official: '', reservation: 'tel:0364335680', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin public listing / phone', changeSummary: '补充电话预约和course概要；细项待继续核验', autoCheckEnabled: false }
  },
  tanimoto: {
    difficulty: 3,
    booking: '电话 03-6380-5797；Michelin 显示可线上预约。',
    dinner: [
      course('季节日本料理 course', '¥30,000-¥39,999 目安', ['日本料理 course', '炭火烧为强项', '收尾包含白饭、炊き込みご飯、茶泡饭等多种饭料理，并由店主点薄茶'], 'Michelin 公开说明；具体价格与菜单需预约时确认。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话咨询；线上预约入口需进入平台确认。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    links: { official: '', reservation: 'tel:0363805797', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin public listing / phone', changeSummary: '补充电话预约和course概要；细项待继续核验', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
