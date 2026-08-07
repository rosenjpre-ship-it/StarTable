const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const item of data) {
  if (item.ratings?.tabelogScore && !/^\d+(\.\d+)?$/.test(String(item.ratings.tabelogScore))) {
    delete item.ratings.tabelogScore;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
