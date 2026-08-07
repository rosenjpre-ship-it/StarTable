const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });
const sync = summary => ({ lastChecked: today, lastUpdated: today, source: 'official / Tabelog / TableCheck / OMAKASE / TABLEALL', changeSummary: summary, autoCheckEnabled: false });

const batch = {
  itsuka: {
    links: {
      official: 'https://www.itsuka8.com/course/',
      reservation: 'https://tabelog.com/tokyo/A1306/A130603/13242634/party/',
      tabelog: 'https://tabelog.com/tokyo/A1306/A130603/13242634/party/'
    },
    ratings: { tabelogScore: '3.84', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130603/13242634/party/' },
    lunch: [
      course('ランチコース', '¥13,200', ['约 7 品', '前菜拼盘', '海鲜', '肉料理', '鱼翅', '甜点'], '官网/Tabelog 公开菜单；桌内需同 course。'),
      course('倭華（わか）', '¥19,800', ['约 8 品', '季节食材中餐 course'], 'Tabelog 公开菜单。'),
      course('慈華（いつか）', '¥28,600', ['约 9 品', '招牌季节 course'], 'Tabelog 公开菜单。'),
      course('永華（えいか）', '¥49,500', ['约 10 品', '高级食材 course'], 'Tabelog 公开菜单。')
    ],
    dinner: [
      course('倭華（わか）', '¥19,800', ['约 8 品', '季节食材中餐 course'], 'Tabelog 公开菜单。'),
      course('クイックディナー ショートコース', '¥24,200', ['约 6 品', '短版季节 course'], 'Tabelog 公开菜单。'),
      course('慈華（いつか）', '¥28,600', ['约 9 品', '招牌季节 course'], 'Tabelog 公开菜单。'),
      course('永華（えいか）', '¥49,500', ['约 10 品', '高级食材 course'], 'Tabelog 公开菜单。')
    ],
    budget: { lunchFrom: '13200', dinnerFrom: '19800', serviceCharge: '包厢15%；包厢费按人数/餐期另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['无严格 dress code，但男性请避免半裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: null, notes: '小学生以上需可享用成人相同 course；未就学儿童在周五午餐、周末/节假日午餐及晚餐可入店，可提供 ¥3,300 儿童迷你 course。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制；Tabelog 可预约。前日取消50%，当日/人数变更100%。', platforms: ['Tabelog', 'official', 'phone'], verified: true },
    sync: sync('补充Tabelog评分、course、着装与儿童政策')
  },
  'ippei-hanten': {
    links: {
      official: 'http://ippei-hanten.com/',
      reservation: 'https://selection.tabelog.com/tokyo/A1307/A130702/13268624/',
      tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130702/13268624/'
    },
    ratings: { tabelogScore: '3.95', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130702/13268624/' },
    dinner: [
      course('季節食材のおまかせコース', '¥29,150', ['15 品', '季节食材广东料理 course', '点心、海鲜、肉料理等构成'], 'Tabelog 公开菜单；服务费10%。'),
      course('天山燕宴', '¥88,000', ['佛跳墙', '熊掌', '燕窝等高级食材'], 'Tabelog 公开菜单；服务费10%。'),
      course('Ippei Hanten Omakase', '¥39,500', ['TABLEALL 预约价格', '含平台预约手续费 ¥8,000'], 'TABLEALL 公开价格。')
    ],
    budget: { dinnerFrom: '29150', serviceCharge: '10%', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['请避免强烈香水。'], verified: true },
    childPolicy: { minimumAge: null, notes: '儿童可；17:00 入店时儿童同行仅可安排包厢。TABLEALL 标注 0 岁以上可申请。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制；17:00、18:00、19:30 同时开始。迟到10分钟以上可能无法提供完整 course。', platforms: ['Tabelog', 'Ikyu', 'TABLEALL'], verified: true },
    sync: sync('补充Tabelog评分、course、预约规则、着装与儿童政策')
  },
  'koshikiryori-koki': {
    links: {
      official: 'https://koushiki-ryori.com/',
      reservation: 'https://omakaseje.com/restaurants/po859570'
    },
    lunch: [
      course('Course A', '¥22,000', ['标准 course', '活海鲜', '脆皮鸡', '粤菜/中餐技法'], 'TableCheck 公开菜单；税入，服务费另计。')
    ],
    dinner: [
      course('Course A', '¥22,000', ['标准 course', '活海鲜', '脆皮鸡', '粤菜/中餐技法'], 'TableCheck 公开菜单；税入，服务费另计。')
    ],
    budget: { lunchFrom: '22000', dinnerFrom: '22000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免 T 恤、短裤、凉鞋。', '请避免过度香水或柔软剂香味。'], verified: true },
    childPolicy: { minimumAge: null, notes: '仅接待可坐下用餐并享用成人相同 course 的儿童；不点餐儿童原则上不建议入店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/OMAKASE 可预约；线上预约为90天至3天前。5人以上需直接联系店铺。', releaseWindow: '90天前至3天前', platforms: ['TableCheck', 'OMAKASE'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
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
