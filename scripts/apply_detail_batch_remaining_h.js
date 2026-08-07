const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });
const sync = summary => ({ lastChecked: today, lastUpdated: today, source: 'Tabelog / TABLEALL / public reservation page', changeSummary: summary, autoCheckEnabled: false });

const batch = {
  hakuun: {
    links: {
      reservation: 'https://www.tableall.com/restaurant/358',
      tabelog: 'https://tabelog.com/en/tokyo/A1306/A130603/13255456/'
    },
    ratings: { tabelogScore: '4.22', tabelogUrl: 'https://tabelog.com/en/tokyo/A1306/A130603/13255456/' },
    dinner: [
      course('伯云 Omakase', '¥59,500', ['季节性日本料理 omakase', '鳗鱼、松茸、蟹等季节主食材', '内容随月份调整'], 'TABLEALL 公开价格，含平台预约手续费。'),
      course('伯云 包厢 Omakase', '¥62,000', ['包厢 omakase', '季节性日本料理'], 'TABLEALL 公开价格，含平台预约手续费。'),
      course('松茸 Omakase', '¥76,500', ['松茸季节 course', '季节性日本料理'], 'TABLEALL 公开价格，含平台预约手续费。')
    ],
    budget: { dinnerFrom: '59500', verified: true },
    dressCode: { level: 'Business casual', required: true, notes: ['TABLEALL 通用规则：至少 business casual。', '男性请避免凉鞋、短裤、无袖上衣；请勿使用香水。'], verified: true },
    childPolicy: { minimumAge: 0, notes: 'TABLEALL 标注 0 岁以上可申请；预约时需说明儿童人数与年龄。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TABLEALL 可提交预约请求；晚餐 17:30 / 20:30。平台价通常含 course、税、服务费及 ¥8,000/席手续费。', platforms: ['TABLEALL'], conciergeRecommended: true, verified: true },
    sync: sync('补充Tabelog评分、course、着装与儿童政策')
  },
  kohaku: {
    links: {
      official: 'https://kagurazaka-kohaku.jp/',
      reservation: 'https://www.tableall.com/restaurant/81'
    },
    dinner: [
      course('虎白 Omakase', '¥65,000', ['季节性日本料理 omakase', '以日本料理为核心加入创新元素'], 'TABLEALL 公开价格，含平台预约手续费。'),
      course('虎白 包厢 Omakase', '¥65,000', ['包厢 omakase', '季节性日本料理'], 'TABLEALL 公开价格，含平台预约手续费。')
    ],
    budget: { dinnerFrom: '65000', verified: true },
    dressCode: { level: 'Business casual', required: true, notes: ['TABLEALL 通用规则：至少 business casual。', '男性请避免凉鞋、短裤、无袖上衣；请勿使用香水。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TABLEALL 可提交预约请求；周六午餐 12:00，晚餐 17:30-22:30。平台价通常含 course、税、服务费及 ¥8,000/席手续费。', platforms: ['TABLEALL'], conciergeRecommended: true, verified: true },
    sync: sync('补充course、着装与儿童政策')
  },
  crony: {
    ratings: { tabelogScore: '3.97', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13215889/' },
    sync: sync('补充Tabelog评分')
  },
  narisawa: {
    ratings: { tabelogScore: '4.46', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130603/13001275/' },
    dressCode: { level: 'Smart casual', required: true, notes: ['官网预约页以高端餐厅着装为基准；建议 smart casual。', '请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    sync: sync('补充Tabelog评分与着装')
  },
  den: {
    ratings: { tabelogScore: '4.24', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130905/13118170/' },
    dinner: [
      course('DEN Omakase', '¥40,000-¥49,999 目安', ['主厨季节 omakase', '以日本料理为基础的创意 course', '内容随季节调整'], 'Tabelog 预算区间；固定菜单价格未公开。')
    ],
    budget: { dinnerFrom: '40000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议 smart casual。', '请避免强烈香水。'], verified: false },
    childPolicy: { minimumAge: null, notes: '公开页面未明确儿童规则；预约前需确认。', verified: false },
    sync: sync('补充Tabelog评分与course概要')
  },
  hommage: {
    ratings: { tabelogScore: '3.96', tabelogUrl: 'https://tabelog.com/tokyo/A1311/A131102/13003645/' },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议 smart casual。', '请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    sync: sync('补充Tabelog评分与着装')
  },
  alchimiste: {
    ratings: { tabelogScore: '3.79', tabelogUrl: 'https://tabelog.com/en/tokyo/A1316/A131602/13256112/' },
    sync: sync('补充Tabelog评分')
  },
  abysse: {
    ratings: { tabelogScore: '3.86', tabelogUrl: 'https://tabelog.com/tokyo/A1316/A131603/13165116/' },
    sync: sync('补充Tabelog评分')
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
