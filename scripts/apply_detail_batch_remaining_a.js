const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  kanda: {
    links: {
      official: 'https://www.nihonryori-kanda.com/',
      tabelog: 'https://tabelog.com/tokyo/A1308/A130802/13270674/dtlmenu/photo/?sby=D'
    },
    ratings: {
      tabelogScore: '3.90',
      tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130802/13270674/dtlmenu/photo/?sby=D'
    },
    dinner: [
      course('晚餐 Omakase', '¥60,000-¥79,999 目安', ['季节性日本料理 omakase', '以德岛食材、时令鱼介与米饭料理为核心', '内容随进货和季节调整'], 'Tabelog 预算区间；详细 course 菜单未公开。')
    ],
    budget: { dinnerFrom: '60000', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '官网/电话预约为主；热门三星彩店，建议通过酒店 concierge 提前咨询。',
      platforms: ['official', 'phone', 'hotel concierge'],
      conciergeRecommended: true,
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'Michelin / Tabelog', changeSummary: '补充官网、Tabelog评分与course概要', autoCheckEnabled: false }
  },
  myojaku: {
    links: {
      official: 'https://ginza-kokoro.jp/',
      reservation: 'https://selection.tabelog.com/tokyo/A1307/A130701/13270958/party/',
      tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130701/13270958/party/'
    },
    ratings: {
      tabelogScore: '4.44',
      tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130701/13270958/party/'
    },
    dinner: [
      course('明寂 Omakase', '¥50,000-¥59,999 目安', ['季节性日本料理 omakase', '吧台与包厢座位', '内容随食材与季节调整'], 'Tabelog 预算区间；页面未公开固定品数。另收10%服务费。')
    ],
    budget: { dinnerFrom: '50000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性请避免半裤、背心、运动凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: null, notes: '儿童可；吧台仅限成人，儿童建议预约包厢并提前确认。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'Tabelog Restaurant Selection 可查看信息；热门日期建议提前通过官方/预约渠道确认。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog Selection', changeSummary: '补充Tabelog评分、预算、着装与儿童政策', autoCheckEnabled: false }
  },
  'asahina-gastronome': {
    links: {
      official: 'https://asahinagastronome.com',
      reservation: 'https://www.tablecheck.com/en/shops/asahina-gastronome/reserve',
      tabelog: 'https://tabelog.com/en/tokyo/A1302/A130203/13227385/'
    },
    ratings: {
      tabelogScore: '4.27',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1302/A130203/13227385/'
    },
    lunch: [
      course('MENU Dégustation Lunch', '¥24,200', ['午餐 8 品', '法餐 tasting menu', '内容随季节调整'], 'Tabelog/TableCheck 公开菜单；另收10%服务费。')
    ],
    dinner: [
      course('MENU Dégustation Dinner', '¥38,500', ['晚餐 9 品', '法餐 tasting menu', '内容随季节调整'], 'Tabelog/TableCheck 公开菜单；另收10%服务费。')
    ],
    budget: { lunchFrom: '24200', dinnerFrom: '38500', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议男性穿夹克或有领衬衫。', '请避免 T 恤、短裤、破洞牛仔裤、运动服、沙滩鞋。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '主餐厅 10 岁以上；包厢 6 岁以上。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 可预约；5人以上需电话或邮件咨询。预约约3日前会电话或邮件确认。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog / TableCheck', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  esquisse: {
    links: {
      official: 'https://www.esquissetokyo.com/en/',
      reservation: 'https://www.esquissetokyo.com/en/reserve/'
    },
    lunch: [
      course('MENU SPONTANÉ Lunch', '¥28,000', ['主厨创作 course', '内容随季节与当日食材调整'], 'OpenTable/官网预约说明公开价格；另收12%服务费。')
    ],
    dinner: [
      course('MENU SPONTANÉ Dinner', '¥38,000', ['主厨创作 course', '内容随季节与当日食材调整'], 'OpenTable/官网预约说明公开价格；另收12%服务费。')
    ],
    budget: { lunchFrom: '28000', dinnerFrom: '38000', serviceCharge: '12%', verified: true },
    dressCode: { level: 'Jacket preferred', required: true, notes: ['男性建议穿夹克。', '不可穿短裤、凉鞋、过度休闲服装。'], verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网标注约提前3个月开放预约；在线无座时可电话咨询。', releaseWindow: '约3个月前', platforms: ['official', 'OpenTable', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / OpenTable', changeSummary: '补充预约链接、course、着装与预约规则', autoCheckEnabled: false }
  },
  hommage: {
    links: {
      official: 'https://www.hommage-arai.com/',
      reservation: 'https://www.tablecheck.com/ja/shops/hommage-arai/reserve'
    },
    lunch: [
      course('¥16,000 Course', '¥16,000', ['Amuse', '料理约 4 品', '甜点'], 'TableCheck 公开菜单；含税，服务费另计。'),
      course('¥28,000 Course', '¥28,000', ['Amuse', '料理约 4 品', '甜点'], 'TableCheck 公开菜单；含税，服务费另计。'),
      course('¥38,500 Course', '¥38,500', ['Amuse', '料理约 4 品', '甜点'], 'TableCheck 公开菜单；含税，服务费另计。')
    ],
    dinner: [
      course('¥28,000 Course', '¥28,000', ['Amuse', '料理约 4 品', '甜点'], 'TableCheck 公开菜单；含税，服务费另计。'),
      course('¥38,500 Course', '¥38,500', ['Amuse', '料理约 4 品', '甜点'], 'TableCheck 公开菜单；含税，服务费另计。'),
      course('¥55,000 Course', '¥55,000', ['Amuse', '料理约 4 品', '甜点'], 'TableCheck 公开菜单；含税，服务费另计。')
    ],
    budget: { lunchFrom: '16000', dinnerFrom: '28000', serviceCharge: '另计', verified: true },
    childPolicy: { minimumAge: 7, notes: '小学生以上（7岁以上），且可享用成人相同菜单者可预约。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 可预约；5人以上需直接联系店铺。迟到30分钟且无法联系时可能取消。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck / OMAKASE', changeSummary: '补充course、预约规则与儿童政策', autoCheckEnabled: false }
  },
  'ginza-fukuju': {
    links: {
      official: 'https://ginza-fukuju.com',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130103/13044734/'
    },
    ratings: {
      tabelogScore: '3.08',
      tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130103/13044734/'
    },
    dinner: [
      course('晚餐 Omakase', '¥50,000-¥59,999 目安', ['完全预约制日本料理', '仅 7 席吧台/小包厢', '内容随季节调整'], 'Tabelog 预算区间；具体 course 未公开。另收10%服务费。')
    ],
    budget: { dinnerFrom: '50000', serviceCharge: '10%', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '完全预约制；Tabelog 标注可通过 OMAKASE JapanEatinerary 接受预约。', platforms: ['OMAKASE JapanEatinerary', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充官网、Tabelog评分、预算与预约说明', autoCheckEnabled: false }
  },
  ryuzu: {
    links: {
      official: 'https://restaurant-ryuzu.com/',
      reservation: 'https://tabelog.com/tokyo/A1307/A130701/13122126/party/',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130701/13122126/party/'
    },
    ratings: {
      tabelogScore: '4.10',
      tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13122126/party/'
    },
    lunch: [
      course('Menu Dejeuner', '¥12,000', ['午餐 course', '季节食材法餐'], 'Tabelog 公开 course。'),
      course('Menu Degustation', '¥24,000', ['7 品', '以旬味食材为核心的 tasting menu'], 'Tabelog 公开 course。'),
      course('Menu Ryuzu', '¥32,000', ['7 品', '加入高级食材的主厨推荐菜单'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('Menu Degustation', '¥24,000', ['7 品', '以旬味食材为核心的 tasting menu'], 'Tabelog 公开 course。'),
      course('Menu Ryuzu', '¥32,000', ['7 品', '加入高级食材的主厨推荐菜单'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '12000', dinnerFrom: '24000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['不可穿背心、短裤、七分裤、凉鞋等轻装。', '请避免香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 6, notes: '不接待 6 岁以下儿童；儿童需可享用成人相同菜单。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '线上预约制；取消/变更从预约日前3天起收取取消费。', platforms: ['Tabelog', 'official online reservation'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  seizan: {
    links: {
      official: 'http://seizan-mita.com/',
      tabelog: 'https://tabelog.com/en/tokyo/A1314/A131402/13127807/dtlrvwlst/'
    },
    ratings: {
      tabelogScore: '4.46',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1314/A131402/13127807/dtlrvwlst/'
    },
    lunch: [
      course('晴山 Omakase Lunch', '¥40,000-¥49,999 目安', ['周六午餐', '季节性日本料理 omakase', '内容随季节与食材调整'], 'Tabelog 预算区间；具体固定 course 未公开。另收10%服务费。')
    ],
    dinner: [
      course('晴山 Omakase Dinner', '¥40,000-¥49,999 目安', ['季节性日本料理 omakase', '内容随季节与食材调整'], 'Tabelog 预算区间；具体固定 course 未公开。另收10%服务费。')
    ],
    budget: { lunchFrom: '40000', dinnerFrom: '40000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免过度休闲服装。', '过量香水可能被拒绝入店。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '10岁以上可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '完全预约制；预约日前2天起取消按餐费100%收取。', verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、预算、着装与儿童政策', autoCheckEnabled: false }
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
