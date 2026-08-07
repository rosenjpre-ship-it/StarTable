const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  'shimbashi-sasada': {
    difficulty: 4,
    booking: '电话预约；2名起可入店。',
    dinner: [
      course('季节日本料理 course', '¥30,000-¥39,999 目安', ['日本料理 course', '鱼料理、蔬菜料理、日本酒/烧酎/葡萄酒'], 'Tabelog 预算区间；服务费10%。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策；有8人包间，儿童同行需预约时确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '电话预约；一人客不可，2名起入店。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.87', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1301/A130103/13020781/dtlratings/' },
    links: { official: '', reservation: 'tel:0335075501', tabelog: 'https://selection.tabelog.com/tokyo/A1301/A130103/13020781/dtlratings/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog Selection', changeSummary: '补充电话预约、预算、评分与服务费', autoCheckEnabled: false }
  },
  'shokuzen-abe': {
    difficulty: 4,
    booking: '电话预约；Tabelog 显示可预约。',
    dinner: [
      course('季节日本料理 course', '¥30,000-¥39,999 目安', ['日本料理 course', '银座高端日本料理，季节食材为主'], 'Tabelog 预算区间；服务费10%。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '电话预约；18:00-20:00。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.80', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13162190/' },
    links: { official: '', reservation: 'tel:0335724855', tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13162190/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog', changeSummary: '补充电话预约、预算、评分与服务费', autoCheckEnabled: false }
  },
  sorahana: {
    website: 'https://sorahana-japan.net/',
    difficulty: 3,
    booking: '完全预约制；Tabelog/电话预约。',
    lunch: [
      course('午餐日本料理 course', '¥10,000-¥14,999 目安', ['日本料理午餐 course', '吧台/包间'], 'Tabelog 预算区间。')
    ],
    dinner: [
      course('晚餐日本料理 course', '¥30,000-¥39,999 目安', ['日本料理晚餐 course', '吧台6席、包间6席'], 'Tabelog 预算区间。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策；有包间，儿童同行需预约时确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；午餐 L.O.13:00，晚餐 L.O.19:30。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '10000', dinnerFrom: '30000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: null, tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130704/13251921/' },
    links: { official: 'https://sorahana-japan.net/', reservation: 'https://tabelog.com/en/tokyo/A1307/A130704/13251921/', tabelog: 'https://tabelog.com/en/tokyo/A1307/A130704/13251921/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、预约、预算和营业规则', autoCheckEnabled: false }
  },
  'sushi-kojima': {
    difficulty: 3,
    booking: '电话或 OMAKASE JapanEatinerary 预约；当日取消有取消费。',
    dinner: [
      course('寿司おまかせ', '¥20,000-¥29,999 目安', ['寿司 course', '银座寿司，吧台和包间'], 'Tabelog 预算区间；评论消费区间 ¥40,000-¥49,999，实际需预约确认。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 6, babyAllowed: false, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: 'Tabelog 标注小学生可；儿童同行需预约时确认。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话/OMAKASE JapanEatinerary 预约；周一至周六 17:00-23:00。', releaseTime: null, releaseWindow: null, platforms: ['Phone', 'OMAKASE JapanEatinerary'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.18', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13241233/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1301/A130101/13241233/', tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13241233/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog', changeSummary: '补充预约、评分、预算和儿童政策', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
