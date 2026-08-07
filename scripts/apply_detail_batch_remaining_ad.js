const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  jushu: {
    difficulty: 3,
    booking: '官网/电话/Tabelog 预约；Tabelog 日历无空席时可电话咨询。',
    dinner: [
      course('おまかせコース', '¥36,300', ['日本料理おまかせ', '季节食材与海鲜料理'], 'Tabelog 公开价格，含税。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列具体 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog/电话预约；网络预约日历无空席时可电话确认。', releaseTime: null, releaseWindow: null, platforms: ['Official', 'Tabelog', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '36300', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: null, tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130602/13119927/party/' },
    links: { official: 'https://www.jushu.jp/', reservation: 'https://tabelog.com/tokyo/A1306/A130602/13119927/party/', tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13119927/party/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充Tabelog预约、course价格与预算', autoCheckEnabled: false }
  },
  miyasaka: {
    website: 'https://omakase.in/en/r/zt634509',
    difficulty: 4,
    booking: 'OMAKASE / 电话预约；午餐不定期开放。',
    dressCode: { level: 'Smart casual', required: true, notes: ['JPNEAZY 标注 Smart casual。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '12岁以上/需点与成人相同菜单。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE 可24小时预约；午餐开放日少，建议提前确认。', releaseTime: null, releaseWindow: null, platforms: ['OMAKASE', 'Phone', 'JPNEAZY'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    links: { official: '', reservation: 'https://omakase.in/en/r/zt634509', tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13264981', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / OMAKASE / JPNEAZY', changeSummary: '补充预约链接、Dress Code和儿童政策', autoCheckEnabled: false }
  },
  oku: {
    difficulty: 3,
    booking: '电话 03-6802-4474；Michelin 显示可线上预约，但公开来源未确认官方预约页。',
    dinner: [
      course('寿司おまかせ', '¥20,000-¥29,999 目安', ['寿司おまかせ', '芋烧酎加入煮詰め、豆乳玉子烧等个性江户前寿司'], 'Michelin 标注 ¥¥¥；具体价格和菜单需预约时确认。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话咨询；线上预约入口需进入平台确认。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    ratings: { tabelogScore: null, tabelogUrl: '' },
    links: { official: '', reservation: 'tel:0368024474', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin public listing / phone', changeSummary: '补充电话预约与寿司course概要；细项待继续核验', autoCheckEnabled: false }
  },
  seisoka: {
    difficulty: 3,
    booking: '官网/Tabelog/电话预约。',
    lunch: [
      course('午餐 course', '¥7,000', ['日本料理午餐 course'], 'Tabelog 公开备注，不含税；另收10%服务费。'),
      course('午餐 course', '¥15,000', ['日本料理午餐 course'], 'Tabelog 公开备注，不含税；另收10%服务费。')
    ],
    dinner: [
      course('晚餐 course', '¥25,000', ['日本料理晚餐 course'], 'Tabelog 公开备注，不含税；另收10%服务费。'),
      course('晚餐 course', '¥30,000', ['日本料理晚餐 course'], 'Tabelog 公开备注，不含税；另收10%服务费。'),
      course('晚餐 course', '¥35,000', ['日本料理晚餐 course'], 'Tabelog 公开备注，不含税；另收10%服务费。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: 'Tabelog 标注欢迎儿童；包间可带儿童。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '官网/Tabelog/电话预约；包间可接待儿童。', releaseTime: null, releaseWindow: null, platforms: ['Official', 'Tabelog', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '7000', dinnerFrom: '25000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.59', tabelogUrl: 'https://tabelog.com/cn/tokyo/A1307/A130703/13090635/' },
    links: { official: 'https://seisoka.com/', reservation: 'https://tabelog.com/cn/tokyo/A1307/A130703/13090635/', tabelog: 'https://tabelog.com/cn/tokyo/A1307/A130703/13090635/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充course价格、评分、预约入口和儿童政策', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
