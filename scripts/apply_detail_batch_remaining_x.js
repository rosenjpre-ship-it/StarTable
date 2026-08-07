const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const course = (name, price, details, note) => ({ name, price, details, note });
const byId = id => data.find(r => r.id === id);

const patches = {
  'edomae-shinsaku': {
    difficulty: 4,
    booking: 'OMAKASE 预约；当前开放至 2026-02-28，下一轮 2026-02-15 11:00 开放。',
    lunch: [
      course('[午餐/晚餐] おまかせコース', '¥27,500 起', [
        '天妇罗主厨套餐',
        '白子、河豚季节价格约 ¥29,000-¥30,000',
        '收尾可选金枪鱼茶泡饭、改炸什锦天丼 +¥1,900，或两者 +¥3,000'
      ], 'OMAKASE 公开价格；午餐仅周二、周四、周五、周六。另收10%服务费。')
    ],
    dinner: [
      course('[午餐/晚餐] おまかせコース', '¥27,500 起', [
        '天妇罗主厨套餐',
        '白子、河豚季节价格约 ¥29,000-¥30,000',
        '统一开餐，迟到或中途离席可能无法完整提供 course'
      ], 'OMAKASE 公开价格；晚餐周一至周六 19:00。另收10%服务费。')
    ],
    dressCode: { level: 'No strong scent', required: true, notes: ['预约页未列衣着限制；请避免香水等强烈气味。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: null, minimumAge: null, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '仅接待能享用成人同一 course 的儿童', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE 预约；当前开放至 2026-02-28，下一轮 2026-02-15 11:00 开放。', releaseTime: '11:00', releaseWindow: '下一轮预约 2026-02-15 11:00', platforms: ['OMAKASE'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '27500', dinnerFrom: '27500', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: '请避免香水等强烈气味', cancellation: '预约时起5%；6日前起50%；3日前起100%', languageSupport: [], paymentMethods: ['现金', '信用卡'] },
    ratings: { tabelogScore: '4.07', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130204/13270572/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / OMAKASE / Tabelog', changeSummary: '补充预约规则、course价格、Tabelog评分、儿童政策', autoCheckEnabled: false }
  },
  ewig: {
    website: 'https://restaurant-ewig.jp/',
    url: 'https://restaurant-ewig.jp/',
    difficulty: 3,
    booking: 'TableCheck 预约；网页版最多4人，5人以上需电话或邮件联系。',
    lunch: [
      course('午餐短 course', '¥9,900', ['3种 amuse', 'Sachertorte 风格鹅肝 terrine', '主菜', '奶酪料理', '甜点', '小点心与咖啡/花草茶'], 'TableCheck 公开价格，含税。'),
      course('午餐 course', '¥16,500', ['3种 amuse', 'Sachertorte 风格鹅肝 terrine', '主菜', '奶酪料理', '甜点', '小点心与咖啡/花草茶'], 'TableCheck 公开价格，含税。')
    ],
    dinner: [
      course('Dinner course from March', '¥19,800', ['约10道菜', '2道 amuse-bouche', 'Maria Theresa 喜爱的 Olio 汤', 'Sachertorte 风格鹅肝 terrine', '精选鱼料理', 'Zwischengang 中段菜', '肉主菜', '2道甜点', '3种 petit fours'], 'TableCheck 公开价格，含税。'),
      course('Dinner course from March', '¥24,200', ['约10道菜', '2道 amuse-bouche', 'Olio 汤', '鹅肝 terrine', '鱼料理', '中段菜', '肉主菜', '甜点与 petit fours'], 'TableCheck 公开价格，含税。')
    ],
    dressCode: { level: 'No strong scent', required: true, notes: ['请避免过量香水；可能因影响料理与葡萄酒香气而被拒绝入店。'], verified: true },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: true, notes: '带儿童需提前向餐厅确认', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 预约；迟到30分钟且无法联系时可能取消；网上预约限4人。', releaseTime: null, releaseWindow: null, platforms: ['TableCheck'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '9900', dinnerFrom: '19800', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: '避免过量香水', cancellation: '预约24小时前起100%', languageSupport: [], paymentMethods: ['信用卡'] },
    links: { official: 'https://restaurant-ewig.jp/', reservation: 'https://www.tablecheck.com/shops/ewig/reserve', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'TableCheck / Michelin', changeSummary: '补充官网、预约链接、course价格和规则', autoCheckEnabled: false }
  },
  guchokuni: {
    difficulty: 3,
    booking: 'Michelin Guide 显示可线上预约；电话 050-3138-5225。',
    dinner: [
      course('季节おまかせ', '¥30,000-¥39,999 目安', ['日本料理主厨套餐', '椀物、蟹真薯、旬菜すり流し等季节料理'], 'Michelin 标注 ¥¥¥¥；Tabelog 价格需继续核验，先按高端日本料理预算区间展示。')
    ],
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Michelin Guide 显示 online booking；具体放位需进入预约页面确认。', releaseTime: null, releaseWindow: null, platforms: ['Michelin online booking'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    links: { official: '', reservation: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/guchokuni', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin Guide', changeSummary: '补充预约入口与料理概要；价格/规则待进一步核验', autoCheckEnabled: false }
  },
  hakunei: {
    difficulty: 4,
    booking: 'OMAKASE 预约；5人以上需 Instagram DM 咨询。',
    lunch: [],
    dinner: [
      course("Chef's Tasting Course", '¥36,300 起', ['主厨 tasting course', '可提前选择无酒精 pairing：course with non-alcoholic pairings ¥49,500'], 'OMAKASE 公开价格，含税。'),
      course('Hakunei omakase course', '¥49,500', ['TABLEALL 海外预约套餐', '价格含 TABLEALL 预约费 ¥8,000'], 'TABLEALL 公开价格。'),
      course('Hakunei omakase course with non-alcohol pairing', '¥64,500', ['OMAKASE course + 无酒精 pairing', '价格含 TABLEALL 预约费 ¥8,000'], 'TABLEALL 公开价格。')
    ],
    dressCode: { level: 'Smart casual', required: true, notes: ['请穿 smart casual。', '男性请勿穿半裤、背心、运动凉鞋等过度休闲服装。', '请勿使用香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: null, minimumAge: 12, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: 'TABLEALL 标注 12岁以上；OMAKASE 日文预约规则提示高中生未满可能被取消，预约前需按平台说明确认。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'OMAKASE 预约；5人以上通过 Instagram DM 咨询。', releaseTime: null, releaseWindow: null, platforms: ['OMAKASE', 'TABLEALL'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '36300', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: '禁止香水、古龙水等强烈香味', cancellation: null, languageSupport: [], paymentMethods: [] },
    ratings: { tabelogScore: '4.03', tabelogUrl: 'https://tabelog.com/cn/tokyo/A1307/A130703/13289034/' },
    links: { official: 'https://hakunei.com/en', reservation: 'https://omakase.in/en/r/io250142', tabelog: 'https://tabelog.com/cn/tokyo/A1307/A130703/13289034/', instagram: 'https://www.instagram.com/hakunei_tokyo/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / OMAKASE / TABLEALL / Tabelog', changeSummary: '补充course、评分、预约规则、Dress Code、儿童政策', autoCheckEnabled: false }
  },
  'hiroo-ishizaka': {
    difficulty: 4,
    booking: '完全预约制；Tabelog 公开信息显示电话或 SMS 预约。',
    dinner: [
      course('寿司おまかせ', '¥20,000-¥29,999 目安', ['江户前寿司套餐', '评论中可见约12贯寿司与下酒菜构成'], 'Tabelog 预算区间；具体当季菜单需预约时确认。')
    ],
    dressCode: { level: 'No strong scent', required: true, notes: ['请避免香水、柔软剂等强烈香味。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '中学生以上，且需能享用与成人相同的内容', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制；电话或 SMS 预约。', releaseTime: null, releaseWindow: null, platforms: ['Phone', 'SMS'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '20000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.50', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130703/13275727/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1307/A130703/13275727/', tabelog: 'https://tabelog.com/tokyo/A1307/A130703/13275727/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog', changeSummary: '补充Tabelog评分、预约方式、预算、Dress Code、儿童政策', autoCheckEnabled: false }
  },
  'hyakuyaku-by-tokuyamazushi': {
    website: 'https://salt-group.jp/shop/hyakuyaku/',
    difficulty: 3,
    booking: '完全预约制；Tabelog 可线上预约，仕入原因需至少前日预约。',
    dinner: [
      course('おまかせコース 10品', '¥38,500', ['季节日本料理10品', '天然食材、发酵/熟成、熟鮓等德山鮓特色'], 'Tabelog 公开价格，含税；另收10%服务费。'),
      course('ペアリング付きおまかせコース 10品', '¥55,000', ['季节おまかせ10品', '约10杯葡萄酒/日本酒 pairing，杯数随料理变化'], 'Tabelog 公开价格，含税；另收10%服务费。')
    ],
    dressCode: { level: 'No extreme casual / No strong scent', required: true, notes: ['请避免极度休闲服装。', '请避免过度香水。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 7, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: 'Japan Food Guide 标注 7岁以上；仅接待能享用 course 的儿童', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；食材准备原因需至少前日预约。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'Japan Food Guide'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: 1, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '38500', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: '请避免过度香水', cancellation: 'Japan Food Guide：2日前0%，1日前50%，当日100%', languageSupport: ['English menu'], paymentMethods: ['信用卡', '现金', '银联'] },
    ratings: { tabelogScore: '3.27', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13302825/' },
    links: { official: 'https://salt-group.jp/shop/hyakuyaku/', reservation: 'https://tabelog.com/tokyo/A1301/A130101/13302825/', tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13302825/', instagram: 'https://www.instagram.com/hyakuyaku_by_tokuyamazushi/' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / Tabelog / Japan Food Guide', changeSummary: '补充course价格、评分、Dress Code、儿童政策、取消规则', autoCheckEnabled: false }
  },
  jo: {
    difficulty: 4,
    booking: 'Tabelog 网络预约；热门席位需提前规划。',
    lunch: [
      course('お昼のおまかせ', '¥16,500', ['午餐主厨套餐'], 'Tabelog 公开价格，含税。')
    ],
    dinner: [
      course('おまかせ特別コース', '¥33,000', ['肉割烹特别おまかせ'], 'Tabelog 公开价格，含税。'),
      course('おまかせ特別コース ペアリング付き', '¥45,000', ['肉割烹特别おまかせ', '含 pairing'], 'Tabelog 公开价格，含税。')
    ],
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Tabelog 网络预约；午餐12:00-14:00，晚餐17:30-23:30。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '16500', dinnerFrom: '33000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '4.23', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13209614/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1307/A130701/13209614/', tabelog: 'https://tabelog.com/tokyo/A1307/A130701/13209614/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog', changeSummary: '补充course价格、评分与预约入口；Dress Code/儿童政策待继续核验', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) {
    throw new Error(`Missing restaurant: ${id}`);
  }
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
