const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'jingumae-higuchi': {
    links: {
      reservation: 'https://omakase.in/ja/r/ir477169'
    },
    lunch: [],
    dinner: [
      course('おまかせコース', '¥39,930 起', ['季节性日本料理/割烹 omakase', '价格随当日进货和季节食材变化'], 'OMAKASE 公开价格，含税含服务费；包厢另收 ¥3,300/室。'),
      course('Higuchi omakase course via TABLEALL', '¥58,500', ['TABLEALL 预约价格', '含平台预约手续费 ¥8,000'], 'TABLEALL 公开价格。')
    ],
    budget: { dinnerFrom: '39930', serviceCharge: '含税含服务费；包厢 ¥3,300/室', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性请勿穿半裤、凉鞋等过度休闲服装。', '请勿使用香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 12, notes: 'TABLEALL 标注 12 岁以上可预约。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE/TABLEALL 可预约申请；18:00 / 18:30。周三、周日、节假日休。', platforms: ['OMAKASE', 'TABLEALL'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / TABLEALL', changeSummary: '补充预约链接、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'akasaka-shimabukuro': {
    links: {
      reservation: 'https://tabelog.com/tokyo/A1308/A130801/13300943/party/',
      tabelog: 'https://tabelog.com/tokyo/A1308/A130801/13300943/party/'
    },
    ratings: { tabelogScore: '4.19', tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130801/13300943/party/' },
    dinner: [
      course('おまかせコース', '¥35,000', ['季节性日本料理 omakase', '内容每月更换', '1-8人可预约'], 'Tabelog 公开 course，含税。')
    ],
    budget: { dinnerFrom: '35000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['吧台日本料理建议 smart casual。', '请避免强烈香水。'], verified: false },
    childPolicy: { minimumAge: null, notes: '8席吧台店，公开页面未列儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '完全预约制；Tabelog 可预约。17:00-23:30，周日休。', platforms: ['Tabelog', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、course与预约规则', autoCheckEnabled: false }
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
