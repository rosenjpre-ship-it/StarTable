const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'nogizaka-shin': {
    links: {
      official: 'https://www.nogi-s.com/',
      reservation: 'https://selection.tabelog.com/tokyo/A1307/A130701/13196404/party/',
      tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130701/13196404/party/'
    },
    ratings: { tabelogScore: '3.99', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130701/13196404/party/' },
    lunch: [
      course('临时午餐：店主推荐献立', '¥33,000', ['临时午餐营业日提供', '季节日本料理 course'], 'Tabelog Selection 公开 course；服务费10%。'),
      course('临时午餐：季节高级食材献立', '¥38,500', ['临时午餐营业日提供', '季节高级食材 course'], 'Tabelog Selection 公开 course；服务费10%。')
    ],
    dinner: [
      course('店主推荐的夜之献立', '¥33,000', ['季节日本料理', '店主推荐 course'], 'Tabelog Selection 公开 course；服务费10%。'),
      course('季节高级食材献立', '¥38,500', ['以季节高级食材为核心的日本料理 course'], 'Tabelog Selection 公开 course；服务费10%。')
    ],
    budget: { lunchFrom: '33000', dinnerFrom: '33000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免 T 恤、半裤、休闲凉鞋等过度轻装。', '请避免香味强烈的香水。'], verified: true },
    childPolicy: { minimumAge: 0, notes: 'Tabelog Selection 页面未明确年龄限制；TableAll 曾标注0岁以上可申请，预约前建议确认座位。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'Tabelog Restaurant Selection 可预约；每周日休，另有不定休。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog Selection / official', changeSummary: '补充Tabelog评分、course、预约规则与着装', autoCheckEnabled: false }
  },
  'oryori-tsuji': {
    links: {
      official: 'https://oryori-tsuji.jp/',
      reservation: 'https://www.tablecheck.com/ja/shops/oryouritsuji/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130702/13209899/party/'
    },
    ratings: { tabelogScore: '3.76', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130702/13209899/party/' },
    lunch: [
      course('昼のお品書き', '¥11,000', ['8 品', '先付、椀物、刺身、烧物、盛合、季节一品、饭、甜味'], 'Tabelog 公开 course。'),
      course('昼のお品書き', '¥22,000', ['8 品', '更高级食材午餐 course'], 'Tabelog 公开 course。'),
      course('昼のお品書き 夜用 course', '¥33,000', ['10 品', '午餐时段提供晚餐规格 course'], 'Tabelog 公开 course。'),
      course('昼のお品書き 高级夜用 course', '¥44,000', ['10 品', '午餐时段提供高级晚餐规格 course'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('夜のお品書き', '¥33,000', ['10 品', '椀物、刺身、季节盛合、手打荞麦、肉料理等少量多品'], 'Tabelog 公开 course。'),
      course('夜のお品書き 高级 course', '¥44,000', ['10 品', '更高级食材构成'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '11000', dinnerFrom: '33000', serviceCharge: '含税含服务费标注', verified: true },
    dressCode: { level: 'Smart casual recommended', required: true, notes: ['无特别指定，但推荐男女均 smart casual。'], verified: true },
    childPolicy: { minimumAge: null, notes: '儿童来店需直接向店铺咨询。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/Tabelog 可预约；包厢按2人份 course 起订，7人以上需直接联系店铺。', platforms: ['TableCheck', 'Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog / TableCheck', changeSummary: '补充Tabelog评分、course、预约规则与着装', autoCheckEnabled: false }
  },
  'sumibikappo-shirosaka': {
    links: {
      official: 'https://www.shirosaka.jp/',
      reservation: 'https://www.tablecheck.com/ja/shirosaka',
      tabelog: 'https://tabelog.com/tokyo/A1308/A130801/13175154/'
    },
    ratings: { tabelogScore: '3.58', tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130801/13175154/' },
    dinner: [
      course('季節のおまかせコース', '¥27,500 起', ['季节炭火割烹 course', '根据当季食材每日变化', '使用日本季节食材和炭火料理'], '官网/TableCheck 公开价格；另收服务费10%。'),
      course('おまかせペアリングコース', '¥12,000 起', ['酒精 pairing', '搭配炭火割烹料理'], '官网公开 pairing 价格。'),
      course('ノンアルコールペアリング', '¥8,000 起', ['无酒精 pairing'], 'TableCheck 公开 pairing 价格。')
    ],
    budget: { dinnerFrom: '27500', serviceCharge: '10%', verified: true },
    dressCode: { level: 'No strict code / neat casual', required: true, notes: ['无特别 Dress Code，但请避免过度休闲。', '不可穿背心、凉鞋。', '请避免过度香水或柔软剂香味。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '10岁以上，且可正常享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck/官网/电话预约；预约2日前起取消100%。不接受酒店以外代理预约。', platforms: ['TableCheck', 'official', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
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
