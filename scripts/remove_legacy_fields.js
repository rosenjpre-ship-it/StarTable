const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const legacyKeys = ['anniversary', 'plate', 'experience', 'dataStatus', 'url', 'website'];

for (const item of data) {
  for (const key of legacyKeys) delete item[key];
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
