const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  'primo-passo': {
    website: 'https://omakase.in/en/r/up320761',
    difficulty: 5,
    booking: 'OMAKASE 预约；下一轮 2026-08-01 16:00，course 约3小时。',
    dinner: [
      course('おまかせコース', '¥19,800 起', ['12道左右', '其中约5道为多样 pasta', '以日式出汁和日本食材融合意大利料理'], 'OMAKASE/Tabelog 公开价格，含税；另收10%服务费，价格随市场变动。')
    ],
    dressCode: { level: 'Italian fine dining', required: null, notes: ['公开预约页未列具体 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '中学生以上，且需享用与成人相同 course。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 预约；下一轮 2026-08-01 16:00；一斉开始，迟到或中途离席可能无法完整供餐。', releaseTime: '16:00', releaseWindow: '下一轮 2026-08-01', platforms: ['OMAKASE', 'Tabelog'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '19800', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '4.09', tabelogUrl: 'https://tabelog.com/tokyo/A1313/A131301/13280320/' },
    links: { official: '', reservation: 'https://omakase.in/en/r/up320761', tabelog: 'https://tabelog.com/tokyo/A1313/A131301/13280320/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'OMAKASE / Tabelog / Michelin', changeSummary: '补充course、评分、预约放位和儿童政策', autoCheckEnabled: false }
  },
  'sushi-matsuura': {
    difficulty: 5,
    booking: '完全预约制；电话/线上预约；预约困难。',
    dinner: [
      course('寿司おまかせ', '¥30,000-¥39,999 目安', ['寿司おまかせ', '开场手渡ネギトロ卷', 'あん肝与干瓢卷配贵酿酒等', '品数多、满足度高'], 'Michelin/Tabelog 公开信息；具体价格需预约确认。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '完全预约制；Michelin/Tabelog 均显示热门，建议提前规划。', releaseTime: null, releaseWindow: null, platforms: ['Phone', 'Online booking'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: true, overseasBooking: null, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '4.31', tabelogUrl: 'https://tabelog.com/tokyo/A1316/A131602/13239788/' },
    links: { official: '', reservation: 'tel:0364502557', tabelog: 'https://tabelog.com/tokyo/A1316/A131602/13239788/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin / Tabelog', changeSummary: '补充电话、course概要、评分和预约难度', autoCheckEnabled: false }
  },
  'sushidokoro-kiraku': {
    website: 'https://edomaekiraku.gorp.jp/',
    difficulty: 3,
    booking: '电话或 Pocket Concierge/TableCheck 预约。',
    lunch: [
      course('昼 Nigiri course', '¥8,800', ['周日12:00限定', '握寿司10-12贯'], 'TableCheck 公开价格，含税。'),
      course('Lunch Omakase course', '¥14,300', ['主厨おまかせ', '一品料理与握寿司'], 'TableCheck 公开价格，含税。')
    ],
    dinner: [
      course('Night Omakase course', '¥14,300', ['主厨おまかせ', '前菜与握寿司', '传统江户前熟成、腌渍、締め等技法'], 'TableCheck 公开价格，含税。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: 'Tabelog 标注欢迎儿童。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话或 Pocket Concierge/TableCheck 预约；晚餐最晚入店20:30。', releaseTime: null, releaseWindow: null, platforms: ['Phone', 'Pocket Concierge', 'TableCheck'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '8800', dinnerFrom: '14300', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.52', tabelogUrl: 'https://tabelog.com/en/tokyo/A1318/A131813/13013834/' },
    links: { official: 'https://edomaekiraku.gorp.jp/', reservation: 'https://www.tablecheck.com/en/sushidokoro-kiraku', tabelog: 'https://tabelog.com/en/tokyo/A1318/A131813/13013834/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / TableCheck / Tabelog / Michelin', changeSummary: '补充官网、course价格、评分、预约和儿童政策', autoCheckEnabled: false }
  },
  waketokuyama: {
    difficulty: 3,
    booking: '完全预约制；约1个半月前开始受理。',
    dinner: [
      course('おまかせ', '¥20,000', ['季节日本料理おまかせ', '四季日本料理与海鲜'], 'Tabelog 公开价格调整说明：2025年3月起 ¥20,000 含税 + 10%服务费。')
    ],
    dressCode: { level: 'Smart casual', required: true, notes: ['Smart casual。', '请避免 T恤、短裤、凉鞋。', '请避免过度香水或柔软剂香味。'], verified: true },
    childPolicy: { diningRoomAllowed: false, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: false, advanceNoticeRequired: true, notes: '儿童仅限包间；13岁以上需点成人相同 course；12岁以下可预约儿童餐 ¥5,500，包间费 ¥11,000。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；约1个半月前开放；无联系迟到可能自动取消。', releaseTime: null, releaseWindow: '约1个半月前', platforms: ['Tabelog', 'OMAKASE JapanEatinerary', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: 45, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.71', tabelogUrl: 'https://tabelog.com/tw/tokyo/A1307/A130703/13005469/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1307/A130703/13005469/', tabelog: 'https://tabelog.com/tw/tokyo/A1307/A130703/13005469/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / OMAKASE JapanEatinerary', changeSummary: '补充course、评分、Dress Code、儿童政策和预约规则', autoCheckEnabled: false }
  },
  'yakitori-takahashi': {
    website: 'https://yakitoritakahashi-japan.com/',
    difficulty: 4,
    booking: 'TableCheck 或电话预约；4名以内。',
    dinner: [
      course('おまかせコース', '¥12,000', ['烧鸟为中心', '烧物10-12串', '前菜、一品、箸休め、鸡汤', '可追加收尾饭物与烧物'], 'Tabelog 公开备注，含税。')
    ],
    dressCode: { level: 'No strong scent', required: true, notes: ['禁止香水、古龙水等强烈香味；可能被拒绝入店。'], verified: true },
    childPolicy: { diningRoomAllowed: false, privateRoomAllowed: false, minimumAge: 20, babyAllowed: false, strollerAllowed: false, fullCourseRequired: true, advanceNoticeRequired: null, notes: '仅接待成人。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck/电话预约，最多4名；席位时间2小时30分钟。', releaseTime: null, releaseWindow: null, platforms: ['TableCheck', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '12000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.69', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130202/13277790/' },
    links: { official: 'https://yakitoritakahashi-japan.com/', reservation: 'https://tabelog.com/tokyo/A1302/A130202/13277790/', tabelog: 'https://tabelog.com/tokyo/A1302/A130202/13277790/', instagram: 'https://www.instagram.com/yakitoritakahashi' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、course、评分、Dress Code、儿童政策和预约规则', autoCheckEnabled: false }
  },
  'yakumo-uezu': {
    website: 'https://www.yakumo-uezu.com/',
    difficulty: 3,
    booking: '完全预约制；Tabelog 可即时预约。',
    dinner: [
      course('季節の懐石', '¥23,000', ['八寸', '烧物2种', '釜炊き御飯', '每月更换的季节会席'], 'Tabelog 公开价格，含税；另收10%服务费。')
    ],
    dressCode: { level: 'Japanese fine dining', required: null, notes: ['公开页面未列 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: null, babyAllowed: true, strollerAllowed: true, fullCourseRequired: null, advanceNoticeRequired: true, notes: 'Tabelog 标注欢迎儿童/婴幼儿/推车；带儿童可包场，需预约时咨询。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；6人以上可咨询包场；18:00-20:00 最终入店。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '23000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.52', tabelogUrl: 'https://tabelog.com/en/tokyo/A1317/A131702/13256504/' },
    links: { official: 'https://www.yakumo-uezu.com/', reservation: 'https://tabelog.com/en/tokyo/A1317/A131702/13256504/', tabelog: 'https://tabelog.com/en/tokyo/A1317/A131702/13256504/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog / Michelin', changeSummary: '补充官网、course、评分、儿童政策和预约规则', autoCheckEnabled: false }
  },
  yama: {
    website: 'https://yama-dessert.com/',
    difficulty: 5,
    booking: '官网/Instagram DM 抽选预约；偶数月1日17:00开放翌月起2个月。',
    lunch: [
      course('Yama dessert course with non-alcohol drink pairing', '¥48,000', ['甜点 course', '无酒精饮品 pairing', '柑橘、芒果、桃、无花果、栗等季节水果变化'], 'TABLEALL 公开价格，含其预约费 ¥8,000。'),
      course('Yama dessert course + take away fruit cake', '¥65,000', ['甜点 course', '无酒精饮品 pairing', '外带水果蛋糕'], 'TABLEALL 公开价格，含其预约费 ¥8,000。')
    ],
    dinner: [
      course('Dessert course / special dinner', '¥30,000-¥49,999 目安', ['通常为甜点 course；特定期间有食事 course', '8道左右 dessert fine dining 体验'], 'Tabelog 预算区间；特定活动价格随季节变动。')
    ],
    dressCode: { level: 'Creative fine dining', required: null, notes: ['公开页面未列具体 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 15, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: 'TABLEALL 标注 15岁以上。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '偶数月1日17:00起接受翌月起2个月抽选申请；一斉开始，迟到不补出已过菜品。', releaseTime: '17:00', releaseWindow: '偶数月1日开放翌月起2个月', platforms: ['Official inquiry', 'Instagram DM', 'TABLEALL'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: true, overseasBooking: true, verified: true },
    budget: { lunchFrom: '48000', dinnerFrom: '30000', serviceCharge: '10%；包间15%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: null, cancellation: '7日前至当日100%；人数变更需3日前电话或邮件联系', languageSupport: [], paymentMethods: ['信用卡'] },
    ratings: { tabelogScore: '4.14', tabelogUrl: 'https://tabelog.com/en/tokyo/A1316/A131602/13279936/' },
    links: { official: 'https://yama-dessert.com/', reservation: 'https://yama-dessert.com/', tabelog: 'https://tabelog.com/en/tokyo/A1316/A131602/13279936/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / TABLEALL / Tabelog / Michelin', changeSummary: '补充官网、course、评分、儿童政策和抽选预约规则', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
