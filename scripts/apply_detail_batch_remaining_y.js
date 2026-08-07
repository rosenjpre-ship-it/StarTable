const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const course = (name, price, details, note) => ({ name, price, details, note });
const byId = id => data.find(r => r.id === id);

const patches = {
  kabi: {
    difficulty: 3,
    booking: 'TableCheck 完全预约制；基本最多4人，儿童不能吃 course 时需指定包间。',
    lunch: [
      course('Lunch Menu', '¥10,000', ['周六限定午餐菜单', '季节食材构成'], 'TableCheck 公开价格，未税。')
    ],
    dinner: [
      course('Dinner Course', '¥20,000', ['季节料理 dinner course'], 'TableCheck 公开价格，另收服务费与税。'),
      course('Dinner Course + Alcohol drinks', '¥33,000', ['季节料理 course', '搭配葡萄酒、日本酒等酒精饮品'], 'TableCheck 公开价格，另收服务费与税。'),
      course('Dinner Course + Non alcohol drinks', '¥31,000', ['季节料理 course', '搭配自制果汁、茶等无酒精饮品'], 'TableCheck 公开价格，另收服务费与税。')
    ],
    dressCode: { level: 'Casual fine dining', required: null, notes: ['公开预约页未列具体衣着限制。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: false, advanceNoticeRequired: true, notes: '不能享用 course 的儿童需指定包间；如选其他座位，餐厅可能调整。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；同桌最多基本4人；迟到可能无法完整供餐。', releaseTime: null, releaseWindow: null, platforms: ['TableCheck'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: '10000', dinnerFrom: '20000', serviceCharge: '另收服务费与税', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: null, cancellation: '3日前免费；2日前50%；前日/当日100%', languageSupport: [], paymentMethods: ['信用卡预授权'] },
    links: { official: 'https://kabi.tokyo/', reservation: 'https://www.tablecheck.com/en/shops/kabi-tokyo/reserve', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'official / TableCheck', changeSummary: '补充TableCheck预约、course价格、儿童政策与取消规则', autoCheckEnabled: false }
  },
  'kappo-muroi': {
    difficulty: 4,
    booking: 'Tabelog/TableCheck 预约；一斉スタート，迟到会影响用餐。',
    dinner: [
      course('おまかせコース', '¥44,000', ['日本料理おまかせ', '约3小时用餐时间'], 'Tabelog 公开价格，含税；另收10%服务费。')
    ],
    dressCode: { level: 'No strong scent', required: true, notes: ['请勿使用香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: null, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '一斉スタート；可预约，迟到请避免。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'TableCheck'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '44000', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: '禁止香水、古龙水等强烈香味', cancellation: null, languageSupport: [], paymentMethods: ['信用卡'] },
    ratings: { tabelogScore: '4.18', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13286652/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1307/A130701/13286652/party/247001431/', tabelog: 'https://tabelog.com/tokyo/A1307/A130701/13286652/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog', changeSummary: '补充course价格、评分、预约规则和香味规则', autoCheckEnabled: false }
  },
  saucer: {
    difficulty: 3,
    booking: 'Tabelog/OMAKASE 可预约；Tabelog 显示无需电话、可即时预约。',
    dinner: [
      course('Menu Essential', '¥12,100', ['7道菜', '以轻量形式呈现 Saucer 风格'], 'Tabelog 公开价格，含税；另收10%服务费。'),
      course('Menu Saucer', '¥24,200', ['约12道季节料理', '三日熬制 triple consommé 为基础的 sauce', '精选全国时令食材'], 'Tabelog 公开价格，含税；另收10%服务费。'),
      course('Menu Saucer + Accord mets et vins', '¥34,100', ['约12道季节料理', '含 Champagne 在内的4杯 wine pairing'], 'Tabelog 公开价格，含税；另收10%服务费。')
    ],
    dressCode: { level: 'Smart casual', required: true, notes: ['Tabelog 标注 Smart Casual。'], verified: true },
    childPolicy: { diningRoomAllowed: null, privateRoomAllowed: null, minimumAge: null, babyAllowed: null, strollerAllowed: null, fullCourseRequired: null, advanceNoticeRequired: null, notes: '公开页面未明确儿童政策，预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '完全预约制；Tabelog/OMAKASE 预约。', releaseTime: null, releaseWindow: null, platforms: ['Tabelog', 'OMAKASE'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '12100', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    ratings: { tabelogScore: '3.79', tabelogUrl: 'https://tabelog.com/en/tokyo/A1303/A130302/13263364/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1303/A130302/13263364/', tabelog: 'https://tabelog.com/en/tokyo/A1303/A130302/13263364/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / Michelin', changeSummary: '补充course价格、评分、预约入口和Dress Code', autoCheckEnabled: false }
  },
  'sharikimon-onozawa': {
    difficulty: 4,
    booking: 'TableCheck 预约；7人以上需直接联系店铺。',
    dinner: [
      course('おまかせコース', '¥30,000', ['日本料理おまかせ', '含手打十割荞麦等店铺特色'], 'TableCheck 公开价格，含税，不含服务费。'),
      course('Onozawa omakase course menu', '¥42,500', ['TABLEALL 海外预约套餐', '价格含 TABLEALL 预约费 ¥8,000'], 'TABLEALL 公开价格。')
    ],
    dressCode: { level: 'No strong scent', required: true, notes: ['预约页要求过敏/忌口提前申报；公开页面未列衣着限制，建议避免强烈香味。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: 13, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: 'TableCheck 标注中学生未满不可；TABLEALL 标注10岁以上，两者有差异，预约时以所用平台为准。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 预约；30分钟后无法联系可能取消；7人以上需电话。', releaseTime: null, releaseWindow: null, platforms: ['TableCheck', 'TABLEALL'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: true, verified: true },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: '另收服务费', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    policies: { perfume: null, cancellation: '2日前起50%；当日100%；人数减少需3日前电话联系', languageSupport: [], paymentMethods: [] },
    ratings: { tabelogScore: '4.18', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130903/13247076/' },
    links: { official: '', reservation: 'https://www.tablecheck.com/ja/shops/onozawa/reserve', tabelog: 'https://tabelog.com/tokyo/A1309/A130903/13247076/', instagram: 'https://www.instagram.com/sharikimon_onozawa' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'TableCheck / TABLEALL / Tabelog', changeSummary: '补充预约链接、course价格、评分、儿童规则与取消规则', autoCheckEnabled: false }
  },
  'l-eterre': {
    difficulty: 3,
    booking: 'Michelin Guide 显示可线上预约；电话 03-6388-1312。',
    dinner: [
      course('季节 French contemporary course', '¥30,000-¥39,999 目安', ['以海鲜、蔬菜、肉类 terroir 为核心', '炭火、薪火、稻草等火入方式'], 'Michelin 标注 ¥¥¥¥；具体价格与菜单待继续核验。')
    ],
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Michelin Guide online booking；具体放位需进入预约页面确认。', releaseTime: null, releaseWindow: null, platforms: ['Michelin online booking'], waitlist: null, cancelSlotLikelihood: null, advanceDaysLunch: null, advanceDaysDinner: null, conciergeRecommended: false, overseasBooking: null, verified: false },
    budget: { lunchFrom: null, dinnerFrom: '30000', serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: false },
    links: { official: '', reservation: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/l-eterre', tabelog: '', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Michelin Guide', changeSummary: '补充预约入口与料理概要；价格/评分/规则待继续核验', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
