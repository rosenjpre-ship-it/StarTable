const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const item of data) {
  if (item.links) {
    delete item.links.michelin;
    delete item.links.googleMaps;
  }
  if (item.ratings) {
    delete item.ratings.googleMapsScore;
    delete item.ratings.googleMapsUrl;
    delete item.ratings.googleMapsSource;
  }
  if (item.dataStatus === 'michelin_starred_basic') item.dataStatus = 'starred_basic';
  if (item.sync?.source === 'MICHELIN Guide Tokyo 2026 official restaurant index') item.sync.source = 'Tokyo 2026 starred restaurant index';
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
