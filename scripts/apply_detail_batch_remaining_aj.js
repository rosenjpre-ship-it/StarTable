const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);

const patches = {
  'la-table-de-joel-robuchon': {
    ratings: {
      tabelogScore: '3.74',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1303/A130302/13010725/'
    },
    links: {
      official: 'https://www.robuchon.jp/shop-list/latable',
      reservation: 'https://www.robuchon.jp/shop-list/latable',
      tabelog: 'https://tabelog.com/en/tokyo/A1303/A130302/13010725/',
      instagram: ''
    },
    dressCode: {
      level: 'Jacket or collared shirt',
      required: true,
      notes: ['请避免 T恤、短裤、凉鞋等休闲服装。', '男性需夹克或有领衬衫；休闲着装可能被拒绝入店。'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: false,
      minimumAge: 10,
      babyAllowed: false,
      strollerAllowed: false,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '10岁以下不可入店。',
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official',
      changeSummary: '补充Tabelog实际评分、Dress Code和儿童年龄规则',
      autoCheckEnabled: false
    }
  },
  nemo: {
    ratings: {
      tabelogScore: '3.76',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1306/A130602/13260539/'
    },
    links: {
      official: 'https://www.nemo-aoyama.com/',
      reservation: 'https://tabelog.com/en/tokyo/A1306/A130602/13260539/',
      tabelog: 'https://tabelog.com/en/tokyo/A1306/A130602/13260539/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / Michelin / official',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
      autoCheckEnabled: false
    }
  },
  'm-rge': {
    ratings: {
      tabelogScore: '4.16',
      tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130602/13310019/'
    },
    links: {
      official: 'https://maerge.jp/',
      reservation: 'https://tabelog.com/tokyo/A1306/A130602/13310019/',
      tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13310019/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
      autoCheckEnabled: false
    }
  },
  'l-eterre': {
    ratings: {
      tabelogScore: '4.14',
      tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130905/'
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Pearl Tabelog aggregation / official',
      changeSummary: '补充第三方汇总的Tabelog评分；待直接Tabelog页面复核',
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
