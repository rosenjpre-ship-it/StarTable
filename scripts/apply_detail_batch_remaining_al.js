const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);

const patches = {
  apotheose: {
    ratings: { tabelogScore: '3.93', tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130802/13289349/dtlratings/' },
    links: { official: 'https://apotheose.jp/en/reservation/', reservation: 'https://apotheose.jp/en/reservation/', tabelog: 'https://tabelog.com/tokyo/A1308/A130802/13289349/', instagram: 'https://www.instagram.com/apotheose_tokyo/' },
    dressCode: { level: 'Smart casual', required: true, notes: ['推荐 smart casual。', '请避免运动背心、短裤、凉鞋等轻装。', '请避免强烈香水。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 12, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '中学生以上可入店。', verified: true },
    budget: { lunchFrom: null, dinnerFrom: '40000', serviceCharge: '12%；包厢 ¥30,000', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official', changeSummary: '补充Tabelog评分、预算、Dress Code和儿童规则', autoCheckEnabled: false }
  },
  ewig: {
    ratings: { tabelogScore: '3.69', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130603/13299150/dtlrvwlst/' },
    links: { official: 'https://restaurant-ewig.jp/', reservation: 'https://www.tablecheck.com/shops/ewig/reserve', tabelog: 'https://tabelog.com/tokyo/A1306/A130603/13299150/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official / TableCheck', changeSummary: '补充Tabelog评分与链接', autoCheckEnabled: false }
  },
  'l-affinage': {
    ratings: { tabelogScore: '4.16', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13227264' },
    links: { official: 'https://laffinage.jp/', reservation: 'https://tabelog.com/tokyo/A1301/A130101/13227264', tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13227264', instagram: '' },
    lunch: [{ name: 'Lunch Course', price: '¥11,000', details: ['Aperitif amuse', 'Amuse', '前菜2品', '鱼料理', '肉料理', '甜点', 'Petit fours', '咖啡'], note: '官网/Tabelog 公开价格，含税；另收10%服务费。' }],
    dinner: [{ name: 'Dinner Course', price: '¥24,200', details: ['Aperitif amuse', 'Amuse', '前菜3品', '鱼料理', '肉料理', 'Avant dessert', 'Grand dessert', 'Petit fours', '咖啡'], note: '官网/Tabelog 公开价格，含税；另收10%服务费。' }],
    dressCode: { level: 'No strict code / Smart casual recommended', required: false, notes: ['官网说明无特别 Dress Code。', '男性请避免短裤、凉鞋。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 6, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: true, notes: '午餐包厢仅小学生以上可使用；晚餐为高中生以上可同行。', verified: true },
    budget: { lunchFrom: '11000', dinnerFrom: '24200', serviceCharge: '10%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official', changeSummary: '补充Tabelog评分、course明细、着装和儿童规则', autoCheckEnabled: false }
  },
  manoir: {
    ratings: { tabelogScore: '3.88', tabelogUrl: 'https://tabelog.com/tokyo/A1303/A130302/13133477/' },
    links: { official: 'https://manoir-restaurant.jp/', reservation: 'https://tabelog.com/tokyo/A1303/A130302/13133477/', tabelog: 'https://tabelog.com/tokyo/A1303/A130302/13133477/', instagram: 'https://www.instagram.com/manoir.jp/' },
    lunch: [{ name: 'Menu Verdure', price: '¥12,800', details: ['7品午餐限定 course', '主菜当日4选1', '季节食材与野味元素'], note: 'Tabelog 公开 course。' }],
    dinner: [{ name: 'Menu Terroir', price: '¥14,800', details: ['7品 course', '主菜当日4选1', '季节食材与野味'], note: 'Tabelog 公开 course。' }, { name: 'Menu Manoir', price: '¥19,800', details: ['10品 omakase course', '主菜当日4选1', '自社野味与严选食材'], note: 'Tabelog 公开 course。' }],
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免凉鞋、运动服、不卫生着装、过度破坏店内氛围的服装。', '请避免过强香水。'], verified: true },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: false, minimumAge: 12, babyAllowed: false, strollerAllowed: null, fullCourseRequired: true, advanceNoticeRequired: null, notes: '仅限可享用成人相同 course 的12岁以上儿童。', verified: true },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official', changeSummary: '补充Tabelog评分、course、Dress Code和儿童规则', autoCheckEnabled: false }
  },
  monolith: {
    ratings: { tabelogScore: '4.07', tabelogUrl: 'https://tabelog.com/en/tokyo/A1303/A130301/13108686/' },
    links: { official: 'https://restaurant-monolith.com/', reservation: 'https://tabelog.com/en/tokyo/A1303/A130301/13108686/', tabelog: 'https://tabelog.com/en/tokyo/A1303/A130301/13108686/', instagram: '' },
    dinner: [{ name: 'MENU Haut Couture', price: '¥27,500', details: ['10品 dinner course', '日本全国严选季节食材', '包含比常规 course 更高级的食材'], note: 'Tabelog 公开 course。' }],
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official / TableCheck', changeSummary: '补充Tabelog评分与course信息', autoCheckEnabled: false }
  },
  hortensia: {
    ratings: { tabelogScore: '3.64', tabelogUrl: 'https://tabelog.com/en/tokyo/A1313/A131301/13291616/' },
    links: { official: 'https://www.hortensiatokyo.com/', reservation: 'https://omakaseje.com/txw7i', tabelog: 'https://tabelog.com/en/tokyo/A1313/A131301/13291616/', instagram: '' },
    dressCode: { level: 'Smart casual', required: null, notes: ['公开页面未列具体 Dress Code；建议 smart casual。'], verified: false },
    childPolicy: { diningRoomAllowed: true, privateRoomAllowed: true, minimumAge: 0, babyAllowed: true, strollerAllowed: true, fullCourseRequired: false, advanceNoticeRequired: true, notes: 'Tabelog 标注包厢可接待0岁以上儿童，可带婴儿车；儿童同行需提前联系。', verified: true },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official / OMAKASE JapanEatinerary', changeSummary: '补充Tabelog评分并复核儿童规则', autoCheckEnabled: false }
  },
  'ginza-kousui': {
    ratings: { tabelogScore: '3.14', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13253966/' },
    links: { official: 'https://ginza-kousui.jp/', reservation: 'https://www.tablecheck.com/en/shops/ginza-kosui/reserve', tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13253966/', instagram: 'https://www.instagram.com/ginzakousui/' },
    dressCode: { level: 'Formal / casual formal', required: true, notes: ['Tabelog 标注请穿正式服装。'], verified: true },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official / TableCheck', changeSummary: '补充Tabelog评分、链接和着装规则', autoCheckEnabled: false }
  },
  'sushi-miura': {
    ratings: { tabelogScore: '3.67', tabelogUrl: 'https://tabelog.com/en/tokyo/A1308/A130801/13285717/' },
    links: { official: 'https://sushimiura-japan.com/', reservation: 'https://omakaseje.com/restaurants/fv217614', tabelog: 'https://tabelog.com/en/tokyo/A1308/A130801/13285717/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official / OMAKASE JapanEatinerary', changeSummary: '补充Tabelog实际评分和官方链接', autoCheckEnabled: false }
  },
  'sushi-masashi': {
    ratings: { tabelogScore: '3.16', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130603/13305569/' },
    links: { official: 'https://sushimasashi.tokyo/', reservation: 'https://sushimasashi.tokyo/', tabelog: 'https://tabelog.com/tokyo/A1306/A130603/13305569/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official', changeSummary: '补充Tabelog评分与Tabelog链接', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
