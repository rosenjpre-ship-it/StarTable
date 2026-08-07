const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-01';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'azabu-kadowaki': {
    links: {
      official: 'https://www.azabukadowaki.com/en/',
      reservation: 'https://www.azabukadowaki.com/en/',
      tabelog: 'https://tabelog.com/en/tokyo/A1303/A130302/13001664/'
    },
    ratings: { tabelogScore: '4.03', tabelogUrl: 'https://tabelog.com/en/tokyo/A1303/A130302/13001664/' },
    dinner: [
      course('季节主厨 Omakase', '¥30,000-¥39,999 目安', ['仅提供主厨季节套餐', '包含当季蔬菜、鱼介、松茸、雪蟹等食材组合', '代表性菜品：松露饭'], 'Tabelog 预算区间；官网说明根据每位客人调整内容。另收服务费。')
    ],
    budget: { dinnerFrom: '30000', serviceCharge: '10%', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '海外客人需通过入住酒店 concierge 预约；店铺会在预约日前确认，无法联系时可能取消。',
      platforms: ['Hotel concierge', 'Pocket Concierge'],
      conciergeRecommended: true,
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、预约规则、course概要', autoCheckEnabled: false }
  },
  harutaka: {
    links: {
      reservation: 'https://www.tableall.com/restaurant/45/'
    },
    dinner: [
      course('青空 Omakase', '¥81,000', ['晚餐 omakase', '握寿司为主，内容随当日鱼介调整'], 'TABLEALL 公开价格，含其预约手续费；晚餐 20:30 起，周六 20:00 或 20:30。')
    ],
    budget: { dinnerFrom: '81000', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '公开预约渠道较少，TABLEALL 可提交预约请求；适合提前规划或通过酒店 concierge。',
      platforms: ['TABLEALL', 'Hotel concierge'],
      conciergeRecommended: true,
      verified: true
    },
    childPolicy: { notes: '公开预约页未列儿童规则；预约前需确认。', verified: false },
    sync: { lastChecked: today, lastUpdated: today, source: 'TABLEALL', changeSummary: '补充预约链接与omakase价格', autoCheckEnabled: false }
  },
  'joel-robuchon': {
    links: {
      official: 'https://www.robuchon.jp/shop-list/joelrobuchon',
      reservation: 'https://www.tablecheck.com/en/shops/joelrobuchon/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1303/A130302/13009310/'
    },
    ratings: { tabelogScore: '4.43', tabelogUrl: 'https://tabelog.com/tokyo/A1303/A130302/13009310/' },
    lunch: [
      course('MENU C', '¥28,000', ['Amuse-bouche', '前菜 1 品自选', '主菜 1 品自选', '甜品自选', '甜品车', '咖啡或茶与小菓子'], '午餐限定；含税，另收12%服务费。'),
      course('MENU B', '¥33,000', ['Amuse-bouche', '前菜 2 品自选', '主菜 1 品自选', '奶酪车', '甜品自选', '甜品车', '咖啡或茶与小菓子'], 'Lunch/Dinner 可选；含税，另收12%服务费。'),
      course('MENU A', '¥38,000', ['Amuse-bouche', '前菜 2 品自选', '主菜 2 品自选', '奶酪车', '甜品自选', '甜品车', '咖啡或茶与小菓子'], 'Lunch/Dinner 可选；含税，另收12%服务费。')
    ],
    dinner: [
      course('MENU DEGUSTATION', '¥58,000', ['季节性 dégustation 全套菜单', '内容按季节调整'], '含税，另收12%服务费。'),
      course('MENU B', '¥33,000', ['Amuse-bouche', '前菜 2 品自选', '主菜 1 品自选', '奶酪车', '甜品自选', '甜品车', '咖啡或茶与小菓子'], '含税，另收12%服务费。'),
      course('MENU A', '¥38,000', ['Amuse-bouche', '前菜 2 品自选', '主菜 2 品自选', '奶酪车', '甜品自选', '甜品车', '咖啡或茶与小菓子'], '含税，另收12%服务费。')
    ],
    budget: { lunchFrom: '28000', dinnerFrom: '33000', serviceCharge: '12%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性不可穿 T 恤、短裤、运动服、凉鞋', '男性需穿夹克或有领衬衫，领带非必须'], verified: true },
    childPolicy: { minimumAge: 10, notes: '10岁以下不可使用餐厅。', verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'TableCheck 可预约，开放约2个月内座位；5人以上需电话联系。',
      platforms: ['TableCheck'],
      advanceDaysDinner: 60,
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充course、Tabelog评分、着装与儿童政策', autoCheckEnabled: false }
  },
  'kagurazaka-ishikawa': {
    links: { reservation: 'https://www.tableall.com/restaurant/84' },
    dinner: [
      course('石かわ Omakase（至2026年8月）', '¥64,000', ['晚餐 omakase', '季节性日本料理'], 'TABLEALL 公开价格，含其预约手续费。'),
      course('石かわ Omakase（2026年9月起）', '¥68,500', ['晚餐 omakase', '季节性日本料理'], 'TABLEALL 公开价格，含其预约手续费。')
    ],
    budget: { dinnerFrom: '64000', verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上可接待。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TABLEALL 可提交预约请求；建议提前规划。', platforms: ['TABLEALL'], conciergeRecommended: true, verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TABLEALL', changeSummary: '补充预约链接、价格、儿童政策', autoCheckEnabled: false }
  },
  quintessence: {
    links: {
      official: 'https://www.quintessence.jp/english/menu.html',
      tabelog: 'https://tabelog.com/tokyo/A1314/A131405/13159567'
    },
    ratings: { tabelogScore: '4.48', tabelogUrl: 'https://tabelog.com/tokyo/A1314/A131405/13159567' },
    dinner: [
      course('One course of choice', '¥41,250', ['共 12 道', '其中甜品 4 道', '当天按食材与客人偏好调整'], '官网英文菜单价格为含税价；另收10%服务费。')
    ],
    budget: { dinnerFrom: '41250', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Elegant casual', required: true, notes: ['男性不可穿半裤、凉鞋等极度休闲服装'], verified: true },
    childPolicy: { minimumAge: 16, notes: '16岁未满不可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '需提前预约；仅提供 omakase course。', verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  sazenka: {
    links: {
      official: 'http://sazenka.com',
      reservation: 'https://www.tablecheck.com/en/sazenka',
      tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130703/13205298/'
    },
    ratings: { tabelogScore: '4.56', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130703/13205298/' },
    dinner: [
      course('季节食材 Omakase Course（Table）', '¥55,000 起', ['使用日本季节食材表现中国料理', '内容随季节与进货调整'], 'TableCheck 公开菜单；含税，另收10%服务费。'),
      course('吉品干鲍特别 Course（Table）', '¥88,000 起', ['以茶禅华名物吉品干鲍为核心', '内容随进货调整'], 'TableCheck 公开菜单；含税，另收10%服务费。'),
      course('Special Course（Table）', '¥110,000 起', ['严选食材与特别料理组成', '内容随季节与进货调整'], 'TableCheck 公开菜单；含税，另收10%服务费。')
    ],
    budget: { dinnerFrom: '55000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性请避免半裤、凉鞋', '请避免香水、古龙水等强烈香味'], verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TableCheck 可查询座位；热门日期建议提前。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、着装规则', autoCheckEnabled: false }
  },
  sezanne: {
    links: {
      official: 'https://www.fourseasons.com/tokyo/dining/restaurants/sezanne/',
      tabelog: 'https://tabelog.com/tokyo/A1302/A130201/13256878'
    },
    ratings: { tabelogScore: '4.45', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130201/13256878' },
    lunch: [
      course('MENU DO JOUR', '¥27,830', ['午餐限定', '使用国内外季节严选食材', '内容随季节调整'], 'Tabelog 公开课程价格。'),
      course('MENU SÉZANNE', '¥56,925', ['季节性法餐 tasting menu', '内容随季节调整'], 'Tabelog 公开课程价格。')
    ],
    dinner: [
      course('MENU SÉZANNE', '¥56,925', ['季节性法餐 tasting menu', '内容随季节调整'], 'Tabelog 公开课程价格。')
    ],
    budget: { lunchFrom: '27830', dinnerFrom: '56925', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性需穿夹克或长袖有领衬衫、长裤、包头鞋', '不可穿无领短袖、T恤、短裤、背心、凉鞋'], verified: true },
    childPolicy: { minimumAge: 13, notes: '13岁以上可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'Four Seasons 官网/餐厅渠道预约；午餐周三至周六，晚餐周三至周日。', verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Four Seasons official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') item.links = { ...(item.links || {}), ...value };
    else if (key === 'ratings') item.ratings = { ...(item.ratings || {}), ...value };
    else if (key === 'budget') item.budget = { ...(item.budget || {}), ...value };
    else if (key === 'reservation') item.reservation = { ...(item.reservation || {}), ...value };
    else if (key === 'sync') item.sync = { ...(item.sync || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
