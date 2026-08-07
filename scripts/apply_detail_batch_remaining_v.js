const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'piao-xiang': {
    links: {
      official: 'https://www.piao-xiang.com/',
      reservation: 'https://selection.tabelog.com/tokyo/A1307/A130703/13274033/',
      tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130703/13274033/'
    },
    ratings: { tabelogScore: '3.73', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130703/13274033/' },
    lunch: [
      course('第四周周六午餐 Omakase', '¥16,500', ['预约制午餐', '12:30 同步开始', '四川料理 omakase'], 'Tabelog 店铺信息公开；另收10%服务费。')
    ],
    dinner: [
      course('Full Course', '¥26,620', ['12 品', '飘香式浓厚海胆蛋挞', '高丽人参茅台酒渍醉蟹', '四川传统干烧技法料理', '短角和牛豆花麻婆豆腐'], 'Tabelog Selection 公开 course，含税；另收10%服务费。'),
      course('Chef’s Omakase Short Course', '¥18,150', ['9 品', '轻量版四川料理 omakase', '19:00 同步开始'], 'Tabelog Selection 公开 course，含税；另收10%服务费。'),
      course('Short Course + Tea Pairing', '¥26,950', ['9 品 short course', '含 5 种茶 pairing'], 'Tabelog Selection 公开 course，含税；另收10%服务费。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '18150', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请穿 smart casual。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '中学生以上，且可享用 course 者可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制；至少2个营业日前预约。当日取消100%。晚餐18:30或19:00同步开始。', platforms: ['Tabelog', 'official', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog Selection / official', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  series: {
    links: {
      official: 'https://series-restaurant.com/',
      reservation: 'https://tabelog.com/tokyo/A1307/A130701/13246575/',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130701/13246575/'
    },
    ratings: { tabelogScore: '3.83', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13246575/' },
    dinner: [
      course('Series 少量多皿 Course', '¥30,000-¥39,999 目安', ['约 21 品少量多皿', '回锅肉、皮蛋豆腐、鲜鱼绍兴酒渍', '鱼翅土锅煮饭、担担面、绍兴酒冰淇淋等构成示例'], 'Tabelog 评论与预算区间；具体当日 course 以预约页/店铺确认为准。')
    ],
    budget: { dinnerFrom: '30000', serviceCharge: '含税价标示', verified: true },
    dressCode: { level: 'None', required: false, notes: ['无 Dress Code。'], verified: true },
    childPolicy: { minimumAge: null, notes: '儿童可；午餐可接待婴幼儿。晚餐不接待小学低年级以下儿童。未成年人同行需说明料理酒使用。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Tabelog/官网/电话可预约；course 当日取消100%，前日50%。每位客人至少点一杯饮品。', platforms: ['Tabelog', 'official', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog / official', changeSummary: '补充Tabelog评分、course概要、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'nodaiwa-azabu-iikura-honten': {
    links: {
      official: 'https://www.nodaiwa.co.jp/',
      tabelog: 'https://tabelog.com/tokyo/A1314/A131401/13002789/dtlmenu/photo/'
    },
    dinner: [
      course('彩り Course', '¥5,300', ['お通し', '一口白烧', '鳗重（肝吸、香物、箸休め）', '甜点'], 'ぐるなび菜单。'),
      course('鰻丼 Course', '¥6,500', ['お通し', '刺身', '鳗丼（肝吸、香物、箸休め）', '甜点'], 'ぐるなび菜单。'),
      course('鰻三楽 Course', '¥7,900', ['お通し', '白烧', '鳗重（肝吸、香物、箸休め）'], 'ぐるなび菜单。'),
      course('鰻重 Course', '¥9,700', ['お通し', '白烧', '鳗与鱼翅茶碗蒸', '鳗重（肝吸、香物、箸休め）', '甜点'], 'ぐるなび菜单。'),
      course('蒲焼 Course', '¥11,800', ['お通し三种', '白烧', '鳗与鱼翅茶碗蒸', '蒲烧（饭、香物、肝吸、箸休め）', '甜点'], 'ぐるなび菜单。')
    ],
    lunch: [
      course('鳗料理 Course', '¥5,300 起', ['彩り Course 起', '午餐/晚餐均可按店铺供应选择'], '以公开菜单为准；详细供应需电话确认。')
    ],
    budget: { lunchFrom: '5300', dinnerFrom: '5300', serviceCharge: '10%', verified: true },
    dressCode: { level: 'None', required: false, notes: ['公开页面未列 Dress Code。'], verified: true },
    childPolicy: { minimumAge: null, notes: '传统鳗鱼料理店，公开页面未列儿童限制；儿童同行建议电话确认座位。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '电话预约；2人起，2人预约原则上为别馆桌席。日曜、部分周一、土用丑日、夏季休。', platforms: ['phone', 'official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog / Gurunavi / official', changeSummary: '补充course、预约规则与着装', autoCheckEnabled: false }
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
