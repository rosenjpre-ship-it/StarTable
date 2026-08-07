const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  daigo: {
    links: {
      official: 'https://www.atago-daigo.jp/en/',
      reservation: 'https://www.tablecheck.com/en/shops/daigo/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130704/13001854/'
    },
    ratings: { tabelogScore: '3.88', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130704/13001854/' },
    lunch: [
      course('桔梗 Course', '¥24,200', ['精进料理 course', '季节蔬菜', '传统寺院料理'], '官网公开价格；税/服务费另计。'),
      course('百合 Course', '¥36,300', ['高级精进料理 course', '季节食材'], '官网公开价格；税/服务费另计。'),
      course('牡丹 Course', '¥48,400', ['高级精进料理 course', '更高级食材构成'], '官网公开价格；税/服务费另计。')
    ],
    dinner: [
      course('桔梗 Course', '¥24,200', ['精进料理 course', '季节蔬菜', '传统寺院料理'], '官网公开价格；税/服务费另计。'),
      course('百合 Course', '¥36,300', ['高级精进料理 course', '季节食材'], '官网公开价格；税/服务费另计。'),
      course('牡丹 Course', '¥48,400', ['高级精进料理 course', '更高级食材构成'], '官网公开价格；税/服务费另计。')
    ],
    budget: { lunchFrom: '24200', dinnerFrom: '24200', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: null, notes: '包厢料亭形式，儿童同行需预约时确认；公开页未列统一年龄限制。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约；包厢制。', platforms: ['TableCheck', 'official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则与着装', autoCheckEnabled: false }
  },
  fushikino: {
    links: {
      official: 'https://fushikino.com/en/',
      reservation: 'https://www.tablecheck.com/en/shops/fushikino/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1309/A130905/13120319/'
    },
    ratings: { tabelogScore: '3.69', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130905/13120319/' },
    dinner: [
      course('季节日本料理与日本酒 Pairing Course', '¥30,000-¥39,999 目安', ['日本料理 course', '日本酒 pairing 为特色', '内容随季节调整'], 'Tabelog 预算区间；具体当日菜单需预约页确认。')
    ],
    budget: { dinnerFrom: '30000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等过度休闲服装。'], verified: false },
    childPolicy: { minimumAge: null, notes: '公开页未列儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck/官网可预约；日本酒 pairing 餐厅，酒精限制需提前说明。', platforms: ['TableCheck', 'official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course概要与预约链接', autoCheckEnabled: false }
  },
  mutsukari: {
    links: {
      official: 'https://www.mutsukari.com/',
      reservation: 'https://www.tablecheck.com/en/shops/mutsukari/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13005757/'
    },
    ratings: { tabelogScore: '3.80', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13005757/' },
    lunch: [
      course('昼 Course', '¥16,500 起', ['现代日本料理 course', '银座和食', '内容随季节调整'], '官网/预约页公开价格区间。')
    ],
    dinner: [
      course('夜 Course', '¥33,000 起', ['现代日本料理 course', '银座和食', '内容随季节调整'], '官网/预约页公开价格区间。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '33000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等过度休闲服装。'], verified: false },
    childPolicy: { minimumAge: null, notes: '公开页未列儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course与预约链接', autoCheckEnabled: false }
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
