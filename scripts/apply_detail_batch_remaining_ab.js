const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);

const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  'ginza-shinohara': {
    difficulty: 5,
    booking: 'OMAKASE 预约；每月25日 0:00 开放预约；每季度最多预约1次。',
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开预约页未列具体衣着限制；高端日本料理建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: 16, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '16岁以上/高中生以上', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '每月25日 0:00 开放预约；每季度最多1次。', releaseTime: '00:00', releaseWindow: '每月25日', platforms: ['OMAKASE'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    policies: { perfume: null, cancellation: '预约后5%；7日前起30%；3日前起100%', languageSupport: [], paymentMethods: [] },
    links: { official: '', reservation: 'https://omakase.in/en/r/sn331262', tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13200949/party/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'OMAKASE / Tabelog', changeSummary: '补充OMAKASE预约入口、放位规则和儿童政策', autoCheckEnabled: false }
  },
  'kagurazaka-ishikawa': {
    difficulty: 5,
    booking: '官网预约专用入口 / TABLEALL；电话仅用于预约后咨询。',
    lunch: [
      course('昼/夜 Omakase', '¥50,000-¥59,999 目安', ['季节性日本料理', '个室与吧台席'], 'Tabelog 预算区间；服务费10%。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列具体 Dress Code；高端日本料理建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 12, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '12岁以上，且需享用与成人相同餐食', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '预约专用网站/官网入口；预约后咨询电话 03-5225-0173。', releaseTime: null, releaseWindow: null, platforms: ['Official reservation', 'TABLEALL'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: true, overseasBooking: true, verified: true },
    budget: { lunchFrom: '50000', dinnerFrom: '64000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: null, tabelogUrl: 'https://selection.tabelog.com/tokyo/A1309/A130905/13004079/' },
    links: { official: 'http://www.kagurazaka-ishikawa.co.jp/', reservation: 'https://www.tableall.com/restaurant/84', tabelog: 'https://selection.tabelog.com/tokyo/A1309/A130905/13004079/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog Selection / TABLEALL', changeSummary: '补充午餐预算、儿童政策和预约说明', autoCheckEnabled: false }
  },
  'ginza-kojyu': {
    difficulty: 4,
    booking: 'OMAKASE / My Concierge Japan / 电话预约；统一开始，迟到15分钟以上可能拒绝入店。',
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开预约页未列具体 Dress Code；高端日本料理建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '13岁以上且能享用成人 course；12岁以下预约会被拒绝入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'course 同时开始，请准时；迟到15分钟以上可能拒绝入店且不退款。', releaseTime: null, releaseWindow: null, platforms: ['OMAKASE', 'My Concierge Japan', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / My Concierge Japan / OMAKASE', changeSummary: '补充儿童政策与迟到规则', autoCheckEnabled: false }
  },
  'ginza-fukuju': {
    website: 'https://ginza-fukuju.com/en',
    url: 'https://ginza-fukuju.com/en',
    difficulty: 4,
    booking: '官网在线预约 / OMAKASE JapanEatinerary；过敏范围过广可能无法预约。',
    dressCode: { level: 'No strong scent', required: true, notes: ['请避免过量香水或柔软剂香味。'], verified: true },
    childPolicy: { diningRoomAllowed: false, privateRoomAllowed: false, minimumAge: null, babyAllowed: false, strollerAllowed: false, fullCourseRequired: null, advanceNoticeRequired: null, notes: '公开预约说明标注不接待儿童同行。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网在线预约；请提前5分钟到店，超时未联系会自动取消。', releaseTime: null, releaseWindow: null, platforms: ['Official', 'OMAKASE JapanEatinerary'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: true, overseasBooking: true, verified: true },
    policies: { perfume: '避免过量香水或柔软剂香味', cancellation: '迟到/超时未联系可能自动取消；取消规则以预约平台为准', languageSupport: [], paymentMethods: ['信用卡'] },
    links: { official: 'https://ginza-fukuju.com/en', reservation: 'https://ginza-fukuju.com/reserve', tabelog: 'https://tabelog.com/tokyo/A1301/A130103/13044734/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / OMAKASE JapanEatinerary / Tabelog', changeSummary: '补充官网预约、Dress Code和儿童政策', autoCheckEnabled: false }
  },
  harutaka: {
    difficulty: 5,
    booking: 'TABLEALL 海外预约；极难预约，建议提前规划。',
    dressCode: { level: 'Business casual', required: true, notes: ['TABLEALL 高端餐厅通用规则：business casual。', '男性请避免短裤、凉鞋、无袖上衣；请勿使用香水。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: 18, babyAllowed: false, strollerAllowed: false, fullCourseRequired: true, advanceNoticeRequired: null, notes: 'TABLEALL 标注 18岁以上。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TABLEALL 请求预约；晚餐20:30起，周六20:00或20:30。', releaseTime: null, releaseWindow: null, platforms: ['TABLEALL'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: true, overseasBooking: true, verified: true },
    ratings: { tabelogScore: null, tabelogUrl: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'TABLEALL', changeSummary: '补充Dress Code、儿童政策和预约说明', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
