const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const scores = {
  ryugin: { score: 4.0, source: 'Wanderlog Google reviews summary' },
  sezanne: { score: 4.4, source: 'Google hotels restaurant listing' },
  leffervescence: { score: 4.6, source: 'Postcard Google Maps summary' },
  losier: { score: 4.7, source: 'Postcard Google Maps summary' },
  'joel-robuchon': { score: 4.5, source: 'Wanderlog Google reviews summary' }
};

let count = 0;
for (const item of data) {
  if (item.links) item.links.googleMaps = '';
  if (item.ratings) delete item.ratings.googleMapsUrl;
  const next = scores[item.id];
  if (!next) continue;
  item.ratings = {
    ...(item.ratings || {}),
    googleMapsScore: next.score,
    googleMapsSource: next.source,
    lastChecked: '2026-08-01'
  };
  item.sync = {
    ...(item.sync || {}),
    lastUpdated: '2026-08-01',
    changeSummary: 'Google Maps评分核验；移除Google Maps链接显示',
    autoCheckEnabled: false
  };
  count += 1;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${count} Google scores and removed Google Maps links.`);
