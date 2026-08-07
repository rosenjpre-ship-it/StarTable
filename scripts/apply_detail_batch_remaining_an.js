const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const patches = {
  prisma: {
    links: { tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13123890/' },
    ratings: { tabelogScore: '4.32', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130602/13123890/' }
  },
  'koshikiryori-koki': {
    links: { tabelog: 'https://tabelog.com/tokyo/A1308/A130802/13279069/' },
    ratings: { tabelogScore: '4.17', tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130802/13279069/' }
  },
  'nodaiwa-azabu-iikura-honten': {
    links: { tabelog: 'https://tabelog.com/tokyo/A1314/A131401/13002789/' },
    ratings: { tabelogScore: '3.67', tabelogUrl: 'https://tabelog.com/tokyo/A1314/A131401/13002789/' }
  },
  seiju: {
    links: { tabelog: 'https://tabelog.com/tokyo/A1313/A131301/13058904/' },
    ratings: { tabelogScore: '3.70', tabelogUrl: 'https://tabelog.com/tokyo/A1313/A131301/13058904/' }
  },
  shigeyuki: {
    links: {
      official: 'https://www.shigeyuki0319.com/',
      tabelog: 'https://tabelog.com/tokyo/A1318/A131807/13250288/'
    },
    ratings: { tabelogScore: '3.72', tabelogUrl: 'https://tabelog.com/tokyo/A1318/A131807/13250288/' },
    dinner: [
      {
        name: '茂幸の和食',
        price: '¥25,000 起',
        details: [
          '使用当日采购的时令食材',
          '8-10 品季节日本料理 course',
          '料理搭配日本酒、烧酎、葡萄酒'
        ],
        note: '官网公开价格，含税与服务费。'
      }
    ],
    dressCode: {
      level: 'No strong fragrance',
      required: true,
      notes: ['公开页面未列服装限制；请避免强烈香水。'],
      verified: true
    },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: '电话预约；新规预约原则上仅开放1个月前，常客优先。',
      platforms: ['Phone'],
      verified: true
    }
  },
  shinois: {
    phone: '非公开（不接受电话预约）',
    links: { tabelog: 'https://tabelog.com/tokyo/A1316/A131602/13241948/' },
    ratings: { tabelogScore: '3.90', tabelogUrl: 'https://tabelog.com/tokyo/A1316/A131602/13241948/' }
  },
  sorahana: {
    links: { tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130704/13251921/' },
    ratings: { tabelogScore: '3.56', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130704/13251921/' },
    lunch: [
      {
        name: '昼のおまかせコース',
        price: '¥11,000',
        details: ['8 品午餐 course', '季节日本料理', '吧台/包间可选'],
        note: 'Tabelog Selection 公开菜单。'
      }
    ],
    dinner: [
      {
        name: '夜のおまかせコース',
        price: '¥22,000',
        details: ['9 品晚餐 course', '季节日本料理'],
        note: 'Tabelog Selection 公开菜单。'
      },
      {
        name: '夜のおまかせコース 2',
        price: '¥27,500',
        details: ['10 品晚餐 course', '季节日本料理升级构成'],
        note: 'Tabelog Selection 公开菜单。'
      }
    ]
  },
  'sushi-ichijo': {
    links: { tabelog: 'https://tabelog.com/tokyo/A1302/A130204/13191562/' },
    ratings: { tabelogScore: '3.75', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130204/13191562/' }
  },
  'sushi-oya': {
    nameZh: '鮨 大矢',
    nameJa: '鮨 大矢',
    links: { tabelog: 'https://tabelog.com/tokyo/A1309/A130905/13285737/' },
    ratings: { tabelogScore: '3.74', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130905/13285737/' }
  },
  tanimoto: {
    nameZh: '多仁本',
    nameJa: '多仁本',
    links: { tabelog: 'https://tabelog.com/tokyo/A1309/A130905/13288233/' },
    ratings: { tabelogScore: '4.19', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130905/13288233/' },
    dinner: [
      {
        name: 'おまかせコース',
        price: '¥33,000',
        details: [
          '季节日本料理 course',
          '包含胡麻豆腐、海胆、出汁冻等时令构成示例',
          '炭火烧与多种饭料理为特色'
        ],
        note: 'Tabelog 近期评论公开价格示例；正式菜单随季节调整。'
      }
    ]
  },
  'tempura-miyashiro': {
    links: { tabelog: 'https://tabelog.com/tokyo/A1317/A131701/13220479/' },
    ratings: { tabelogScore: '3.77', tabelogUrl: 'https://tabelog.com/tokyo/A1317/A131701/13220479/' }
  },
  'ten-yokota': {
    links: { tabelog: 'https://tabelog.com/tokyo/A1307/A130702/13258792/' },
    ratings: { tabelogScore: '4.03', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130702/13258792/' },
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['请避免过度休闲服装。', '天妇罗吧台请避免强烈香水。'],
      verified: true
    }
  },
  tenoshima: {
    ratings: { tabelogScore: '3.11', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130603/13222457/' }
  },
  ubuka: {
    links: { tabelog: 'https://tabelog.com/tokyo/A1309/A130903/13139225/' },
    ratings: { tabelogScore: '3.91', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130903/13139225/' }
  },
  'yotsuya-minemura': {
    nameZh: '四谷 みね村',
    nameJa: '四ッ谷 みね村',
    links: { tabelog: 'https://tabelog.com/tokyo/A1309/A130903/13289509/' },
    ratings: { tabelogScore: '3.91', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130903/13289509/' },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'OMAKASE 预约；Chef’s Tasting Course ¥33,000 起，另收服务费。',
      platforms: ['OMAKASE'],
      verified: true
    }
  },
  nol: {
    phone: '非公开（邮件/TableCheck）'
  },
  yama: {
    phone: '080-8427-2786（当天紧急联系）'
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = data.find(r => r.id === id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && item[key] && typeof item[key] === 'object' && !Array.isArray(item[key])) {
      item[key] = { ...item[key], ...value };
    } else {
      item[key] = value;
    }
  }
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
