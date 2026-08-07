const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const transport = {
  ryugin: [
    { name: '日比谷', lines: ['东京Metro日比谷线', '东京Metro千代田线', '都营三田线'], walkMinutes: 1 },
    { name: '有乐町', lines: ['JR山手线', 'JR京滨东北线', '东京Metro有乐町线'], walkMinutes: 5 },
    { name: '银座', lines: ['东京Metro银座线', '东京Metro丸之内线', '东京Metro日比谷线'], walkMinutes: 5 }
  ],
  sezanne: [
    { name: '东京', lines: ['JR各线', '新干线', '东京Metro丸之内线'], walkMinutes: 4 },
    { name: '京桥', lines: ['东京Metro银座线'], walkMinutes: 5 },
    { name: '银座一丁目', lines: ['东京Metro有乐町线'], walkMinutes: 5 }
  ],
  leffervescence: [
    { name: '表参道', lines: ['东京Metro银座线', '东京Metro半藏门线', '东京Metro千代田线'], walkMinutes: 12 }
  ],
  losier: [
    { name: '银座', lines: ['东京Metro银座线', '东京Metro丸之内线', '东京Metro日比谷线'], walkMinutes: 7 },
    { name: '新桥', lines: ['JR各线', '东京Metro银座线', '都营浅草线', '百合海鸥线'], walkMinutes: 6 },
    { name: '有乐町', lines: ['JR山手线', 'JR京滨东北线', '东京Metro有乐町线'], walkMinutes: 8 }
  ],
  'joel-robuchon': [
    { name: '惠比寿', lines: ['JR山手线', 'JR埼京线', 'JR湘南新宿线', '东京Metro日比谷线'], walkMinutes: 10 },
    { name: '目黑', lines: ['JR山手线', '东急目黑线', '东京Metro南北线', '都营三田线'], walkMinutes: 12 }
  ]
};

let count = 0;
for (const item of data) {
  const stations = transport[item.id];
  if (!stations) continue;
  item.transport = {
    stations,
    verified: true,
    source: 'official access page / Tabelog / OMAKASE station information',
    lastChecked: '2026-08-01'
  };
  item.sync = {
    ...(item.sync || {}),
    lastUpdated: '2026-08-01',
    changeSummary: '补充最近车站、步行时间与线路信息',
    autoCheckEnabled: false
  };
  count += 1;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${count} transport records.`);
