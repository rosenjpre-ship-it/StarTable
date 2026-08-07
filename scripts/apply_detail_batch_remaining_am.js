const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);

const patches = {
  guchokuni: {
    ratings: { tabelogScore: '4.18', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1309/A130905/13251541/dtlrvwlst/' },
    links: { official: 'https://kagurazaka-guchokuni.jp/', reservation: 'https://kagurazaka-guchokuni.jp/', tabelog: 'https://selection.tabelog.com/tokyo/A1309/A130905/13251541/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official / Michelin', changeSummary: '补充Tabelog评分与官方链接', autoCheckEnabled: false }
  },
  jushu: {
    ratings: { tabelogScore: '3.63', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130602/13119927/dtlrvwlst/' },
    links: { official: 'https://jushu.jp/', reservation: 'https://tabelog.com/tokyo/A1306/A130602/13119927/', tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13119927/dtlrvwlst/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official', changeSummary: '补充Tabelog评分与链接', autoCheckEnabled: false }
  },
  oku: {
    ratings: { tabelogScore: '3.48', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130601/13268483/' },
    links: { official: '', reservation: 'https://tabelog.com/tokyo/A1306/A130601/13268483/', tabelog: 'https://tabelog.com/tokyo/A1306/A130601/13268483/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog', changeSummary: '补充Tabelog评分；Tabelog页面显示营业状态需再确认', autoCheckEnabled: false }
  },
  'tour-d-argent-tokyo': {
    ratings: { tabelogScore: '3.92', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1308/A130803/13000288/dtlratings/' },
    links: { official: 'https://tourdargent.jp/en/', reservation: 'https://tourdargent.jp/en/', tabelog: 'https://selection.tabelog.com/tokyo/A1308/A130803/13000288/dtlratings/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / official', changeSummary: '补充Tabelog评分和官方链接', autoCheckEnabled: false }
  },
  towa: {
    ratings: { tabelogScore: '3.97', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130703/13220791/' },
    links: { official: '', reservation: 'https://tabelog.com/en/tokyo/A1307/A130703/13220791/', tabelog: 'https://tabelog.com/en/tokyo/A1307/A130703/13220791/', instagram: '' },
    sync: { lastChecked: '2026-08-02', lastUpdated: '2026-08-02', source: 'Tabelog / Michelin', changeSummary: '补充Tabelog评分与Tabelog链接', autoCheckEnabled: false }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
