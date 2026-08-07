const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  'jingumae-higuchi': {
    ratings: {
      tabelogScore: '4.21',
      tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130601/13001215/'
    },
    links: {
      official: '',
      reservation: 'https://omakase.in/ja/r/ir477169',
      tabelog: 'https://tabelog.com/tokyo/A1306/A130601/13001215/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / OMAKASE / TABLEALL',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
      autoCheckEnabled: false
    }
  },
  'edomae-sushi-hanabusa': {
    ratings: {
      tabelogScore: '3.20',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130701/13181089/dtlmenu/'
    },
    links: {
      official: 'https://www.akasaka-hanabusa.com/en',
      reservation: 'https://www.akasaka-hanabusa.com/en',
      tabelog: 'https://tabelog.com/en/tokyo/A1307/A130701/13181089/',
      instagram: ''
    },
    dinner: [
      course('Edomae Nigiri Sushi', '¥36,300', ['江户前握寿司 course', '内容随季节与进货调整'], '官网公开价格，含税与服务费。'),
      course('Chef’s choice course', '¥48,400', ['前菜', '握寿司', '季节性一品与寿司'], '官网公开价格，含税与服务费；Tabelog 曾列旧价，官网为较新价格。')
    ],
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['请勿使用香水。', '请避免 T恤、短裤、运动服、凉鞋等休闲服装。'],
      verified: true
    },
    reservation: {
      difficulty: 3,
      difficultyLabel: '中等',
      bookingRule: '完全预约制；官网说明通过 OMAKASE JapanEatinerary / TABLEALL 或酒店 concierge 预约，不接受电话预约。取消或变更自3日前起100%。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['OMAKASE JapanEatinerary', 'TABLEALL', 'Hotel concierge'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    budget: {
      lunchFrom: null,
      dinnerFrom: '36300',
      serviceCharge: '含税含服务费',
      estimatedLunchAllIn: null,
      estimatedDinnerAllIn: null,
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'official / Tabelog',
      changeSummary: '补充官网course价格、Tabelog评分、Dress Code和预约规则',
      autoCheckEnabled: false
    }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
