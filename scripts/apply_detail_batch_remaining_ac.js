const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  jizozushi: {
    website: 'https://jizozushi-meguro.com/',
    url: 'https://jizozushi-meguro.com/',
    difficulty: 4,
    booking: '完全预约制；电话预约；每日最多2组，周四至周六营业。',
    dinner: [
      course('本日のおまかせ握り', '¥27,500 起 / 时价', ['约14贯握寿司与卷物', '赤酢酢饭', '江户前手法处理鱼介'], 'AutoReserve/Tabelog 公开信息；实际为时价，需预约时确认。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: false, privateRoomAllowed: false, minimumAge: 16, babyAllowed: false, strollerAllowed: false, fullCourseRequired: true, advanceNoticeRequired: null, notes: '中学生以下不可同行。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '电话预约；每日2组限定；周四、周五、周六 19:15-22:30。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '27500', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.54', tabelogUrl: 'https://tabelog.com/tokyo/A1316/A131601/13181596/' },
    links: { official: 'https://jizozushi-meguro.com/', reservation: 'tel:0334455301', tabelog: 'https://tabelog.com/tokyo/A1316/A131601/13181596/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog / AutoReserve', changeSummary: '补充官网、电话预约、course价格、评分和儿童政策', autoCheckEnabled: false }
  },
  sassa: {
    website: 'https://kohadajp.com/',
    url: 'https://kohadajp.com/',
    difficulty: 4,
    booking: '完全预约制；Tabelog 可预约；预约时间15分钟前可入店。',
    dinner: [
      course('おまかせコース', '¥35,200', ['日本料理おまかせ', '按当日进货决定菜单', '以寿司职人感性制作会席；鲍鱼 risotto、金枪鱼薄切等为代表'], 'Tabelog 公开价格，含税。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；日本料理吧台建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制；可线上预约；18:00-22:00。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '35200', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '4.15', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130703/13303331/party/' },
    links: { official: 'https://kohadajp.com/', reservation: 'https://tabelog.com/tokyo/A1307/A130703/13303331/party/', tabelog: 'https://tabelog.com/tokyo/A1307/A130703/13303331/party/', instagram: 'https://www.instagram.com/sassayade/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog / Michelin description', changeSummary: '补充官网、course价格、评分和预约规则', autoCheckEnabled: false }
  },
  shigeyuki: {
    difficulty: 3,
    booking: '电话 03-6804-9428 咨询；公开页显示可在线预约，但未确认官方预约入口。',
    dinner: [
      course('季节日本料理 course', '¥20,000-¥29,999 目安', ['日本料理 course', '烧霜/汤霜等手法处理造り', '不固定椀物，重视多种出汁组合'], '公开 Michelin/Tabelog 级别信息；具体价格与菜单需预约时确认。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话咨询；若使用在线预约需确认是否为官方入口。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    links: { official: '', reservation: 'tel:0368049428', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin public listing / phone', changeSummary: '补充电话预约和料理概要；细项待继续核验', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
