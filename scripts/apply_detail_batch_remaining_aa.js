const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const course = (name, price, details, note) => ({ name, price, details, note });
const byId = id => data.find(r => r.id === id);

const patches = {
  'sushi-yuki': {
    difficulty: 5,
    booking: 'OMAKASE 预约；当前开放至 2026-03-01，下一轮 2026-02-23 12:00 开放；每月最多预约1次。',
    lunch: [
      course('[午餐] おまかせ握り', '¥19,800', ['午餐握寿司おまかせ'], 'OMAKASE 公开价格，含税；另收服务费。'),
      course('[午餐/晚餐] おまかせコース', '¥33,000', ['寿司おまかせ course'], 'OMAKASE 公开价格，含税；另收服务费。')
    ],
    dinner: [
      course('[午餐/晚餐] おまかせコース', '¥33,000', ['寿司おまかせ course'], 'OMAKASE 公开价格，含税；另收服务费。'),
      course('[晚餐] 2番手コース', '¥28,600', ['二番手 course'], 'OMAKASE 公开价格，含税；特定日期仅提供该 course。')
    ],
    dressCode: { level: 'No strong scent / sushi counter', required: true, notes: ['公开规则强调避免影响其他客人的行为；寿司吧台请避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 18, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '18岁以上，且需享用与成人相同 course', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 预约；下一轮 2026-02-23 12:00；每月最多1次。', releaseTime: '12:00', releaseWindow: '下一轮 2026-02-23 12:00', platforms: ['OMAKASE'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '19800', dinnerFrom: '28600', serviceCharge: '另收服务费', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { photo: '可拍料理；避免快门声、闪光和拍到他人；禁止视频', perfume: null, cancellation: '7日前起10%；4日前起50%；2日前起100%', languageSupport: [], paymentMethods: ['现金', '信用卡'] },
    ratings: { tabelogScore: '4.30', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130703/13294395/' },
    links: { official: '', reservation: 'https://omakase.in/ja/r/tj576606', tabelog: 'https://tabelog.com/tokyo/A1307/A130703/13294395/', instagram: 'https://www.instagram.com/sushi.yuuki.hiroo/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'OMAKASE / Tabelog', changeSummary: '补充course价格、评分、放位规则、儿童政策和取消规则', autoCheckEnabled: false }
  },
  'sushi-tanaka': {
    difficulty: 4,
    booking: 'Michelin 显示可线上预约；公开评分页面未列完整预约规则。',
    lunch: [
      course('Omakase', '¥22,000 目安', ['寿司おまかせ', '天草食材：岩牡蛎、太刀鱼、鯖海苔卷、真鱼鰹、鳗鱼、黑鲍、握寿司等评论样例'], 'Tabelog 评论中出现套餐 ¥22,000；正式价格需预约时确认。')
    ],
    dinner: [
      course('Omakase', '¥22,000-¥29,999 目安', ['熊本天草海鲜为主', '按鱼种分别使用赤醋或米醋酢饭'], 'Tabelog/Michelin 公开信息；具体当季菜单需预约确认。')
    ],
    dressCode: { level: 'Sushi counter casual fine dining', required: null, notes: ['公开页面未列 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Michelin online booking；具体放位与取消规则需进入预约页确认。', releaseTime: null, releaseWindow: null, platforms: ['Michelin online booking'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: '22000', dinnerFrom: '22000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    ratings: { tabelogScore: '4.09', tabelogUrl: 'https://tabelog.com/tw/tokyo/A1316/A131602/13293885/' },
    links: { official: '', reservation: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/sushi-tanaka', tabelog: 'https://tabelog.com/tw/tokyo/A1316/A131602/13293885/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / Michelin', changeSummary: '补充评分、料理概要与预算；预约规则待继续核验', autoCheckEnabled: false }
  },
  'tempura-yaguchi': {
    difficulty: 3,
    booking: '仅电话预约；午餐和晚餐均为おまかせ。',
    lunch: [
      course('午餐おまかせ', '¥20,000-¥29,999 目安', ['天妇罗おまかせ', '海老以 rare/medium 两种火入呈现；随进货提供不同乌贼等'], 'Tabelog 预算区间；具体价格需电话确认。')
    ],
    dinner: [
      course('晚餐おまかせ', '¥20,000-¥29,999 目安', ['天妇罗おまかせ', '高温油炸带出香气，按食材调整火入'], 'Tabelog 预算区间；无服务费。')
    ],
    dressCode: { level: 'No strong scent / counter', required: true, notes: ['公开页面未列具体衣着；天妇罗吧台建议避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '中学生以上', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '仅电话预约；吧台8席，无包间。', releaseTime: null, releaseWindow: null, platforms: ['Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: true },
    budget: { lunchFrom: '20000', dinnerFrom: '20000', serviceCharge: '无', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.41', tabelogUrl: 'https://tabelog.com/en/tokyo/A1302/A130204/13248312/' },
    links: { official: '', reservation: 'tel:0335273701', tabelog: 'https://tabelog.com/en/tokyo/A1302/A130204/13248312/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / Michelin', changeSummary: '补充评分、电话预约、course概要和儿童政策', autoCheckEnabled: false }
  },
  'ten-masa': {
    website: 'https://ten-masa.com/',
    difficulty: 3,
    booking: 'Tabelog/电话预约；18:00-21:00 可预约 course。',
    dinner: [
      course('天雅会席「彩」', '¥19,800', ['8品', '不含名物海胆天妇罗'], 'Tabelog 公开价格，含税。'),
      course('天雅会席「輝」', '¥25,300', ['8品', '含名物海胆天妇罗', '季节日本料理与天妇罗7品'], 'Tabelog 公开价格，含税。'),
      course('天雅会席「雅」', '¥33,000', ['9品', '海胆天妇罗', '追加季节推荐一品'], 'Tabelog 公开价格，含税。')
    ],
    dressCode: { level: 'Smart casual recommended', required: false, notes: ['推荐 smart casual；无特别具体规定。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '基本接待中学生以上；更小儿童需先咨询。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog/电话预约；包间另收 ¥10,000。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'Phone'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '19800', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.65', tabelogUrl: 'https://tabelog.com/tokyo/A1317/A131701/13147445/' },
    links: { official: 'https://ten-masa.com/', reservation: 'https://tabelog.com/tokyo/A1317/A131701/13147445/party/', tabelog: 'https://tabelog.com/tokyo/A1317/A131701/13147445/', instagram: 'https://www.instagram.com/tenmasa_nakameguro/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充course价格、评分、Dress Code和儿童政策', autoCheckEnabled: false }
  },
  tenoshima: {
    website: 'https://www.tenoshima.com/',
    difficulty: 3,
    booking: '电话、住宿酒店 concierge 或 Pocket Concierge 预约；不接受 message 预约。',
    dinner: [
      course('夜の日本料理 course', '¥20,000-¥29,999 目安', ['日本料理 course', '以鱼料理、日本酒与葡萄酒搭配为特色'], 'Tabelog 预算区间；官网未公开固定 course 价格。')
    ],
    dressCode: { level: 'No strict public code', required: null, notes: ['公开页面未列 Dress Code。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: false, advanceNoticeRequired: true, notes: 'Tabelog 标注未学龄儿童/小学生可，并有儿童菜单；需预约时确认。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话、酒店 concierge 或 Pocket Concierge；不接受 message 预约。', releaseTime: null, releaseWindow: null, platforms: ['Phone', 'Hotel concierge', 'Pocket Concierge'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: true, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: 'あり', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: null, tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130603/13222457/' },
    links: { official: 'https://www.tenoshima.com/', reservation: 'https://www.tenoshima.com/', tabelog: 'https://tabelog.com/tokyo/A1306/A130603/13222457/', instagram: 'https://www.instagram.com/tenoshima884/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充官网、预约方式、预算和儿童政策', autoCheckEnabled: false }
  },
  toki: {
    website: 'https://toki.nara.jp/spev/reseption2021/menu/',
    difficulty: 3,
    booking: '餐厅区需提前预约 course；bar 区仅限部分时段和组数。',
    lunch: [
      course('Restaurant lunch course', '¥8,000-¥9,999 目安', ['奈良食材为主题的西班牙/innovative course'], 'Tabelog 预算区间；具体 course 需预约时选择。')
    ],
    dinner: [
      course('Restaurant dinner course', '¥20,000-¥29,999 目安', ['需提前预约 course', '奈良食材、西班牙料理与 innovative 表现'], 'Tabelog 预算区间；餐厅区服务费10%。')
    ],
    dressCode: { level: 'Smart casual recommended', required: true, notes: ['推荐 smart casual。', '请避免 T 恤、短裤、凉鞋等极端休闲服装。', '料理重视香气，请控制香水使用。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '中学生以上可入店', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '餐厅需提前预约 course；bar 区为单点且预约组数有限。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'Official'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '8000', dinnerFrom: '20000', serviceCharge: 'Restaurant 10%；半包间另收5%；Bar ¥550/人', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.75', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130103/13262451/' },
    links: { official: 'https://toki.nara.jp/spev/reseption2021/menu/', reservation: 'https://tabelog.com/tokyo/A1301/A130103/13262451/', tabelog: 'https://tabelog.com/tokyo/A1301/A130103/13262451/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog', changeSummary: '补充course预算、评分、Dress Code、儿童政策和预约规则', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
