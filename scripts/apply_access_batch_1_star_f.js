const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-01';

const L = {
  jr: ['JR线'],
  ginza: ['东京Metro银座线'],
  marunouchi: ['东京Metro丸之内线'],
  hibiya: ['东京Metro日比谷线'],
  chiyoda: ['东京Metro千代田线'],
  yurakucho: ['东京Metro有乐町线'],
  hanzomon: ['东京Metro半藏门线'],
  namboku: ['东京Metro南北线'],
  tozai: ['东京Metro东西线'],
  mita: ['都营三田线'],
  asakusa: ['都营浅草线'],
  oedo: ['都营大江户线']
};
const s = (name, lines, walkMinutes) => ({ name, lines, walkMinutes });
const transport = stations => ({
  stations,
  verified: true,
  source: 'Michelin Japan / official access information cross-check',
  lastChecked: today
});

const batch = {
  manoir: {
    address: '東京都渋谷区広尾1-10-6',
    phone: '03-6432-5015',
    links: { official: 'https://www.manoir-restaurant.jp/', reservation: 'https://www.manoir-restaurant.jp/' },
    transport: transport([
      s('惠比寿', [...L.jr, ...L.hibiya], 8),
      s('广尾', L.hibiya, 10)
    ])
  },
  'metis-roppongi': {
    address: '東京都港区六本木5-18-22',
    phone: '03-5544-9778',
    links: { official: 'https://metis-roppongi.jp/', reservation: 'https://metis-roppongi.jp/' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 7),
      s('麻布十番', [...L.namboku, ...L.oedo], 8),
      s('六本木一丁目', L.namboku, 9)
    ])
  },
  monolith: {
    address: '東京都渋谷区渋谷2-6-1',
    phone: '03-6427-3580',
    links: { official: 'https://restaurant-monolith.com/', reservation: 'https://restaurant-monolith.com/' },
    transport: transport([
      s('涩谷', [...L.jr, ...L.ginza, ...L.hanzomon, '东京Metro副都心线', '东急东横线', '东急田园都市线', '京王井之头线'], 8),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 9)
    ])
  },
  mutsukari: {
    address: '東京都中央区銀座5-5-19 6F',
    phone: '03-5568-6266',
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 3),
      s('有乐町', [...L.jr, ...L.yurakucho], 6),
      s('日比谷', [...L.hibiya, ...L.chiyoda, ...L.mita], 6)
    ])
  },
  'nabeno-ism': {
    address: '東京都台東区駒形2-1-17',
    phone: '03-5246-4056',
    links: { official: 'https://www.nabeno-ism.tokyo/', reservation: 'https://www.nabeno-ism.tokyo/' },
    transport: transport([
      s('浅草', [...L.ginza, ...L.asakusa], 4),
      s('藏前', [...L.asakusa, ...L.oedo], 5),
      s('田原町', L.ginza, 10)
    ])
  },
  nemo: {
    address: '東京都港区南青山6-15-4 B1F',
    phone: '03-5962-6085',
    links: { official: 'https://www.nemo-tokyo.com/', reservation: 'https://www.nemo-tokyo.com/' },
    transport: transport([
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 10),
      s('广尾', L.hibiya, 15)
    ])
  },
  'nihombashi-sonoji': {
    address: '東京都中央区日本橋人形町2-22-11',
    phone: '03-5643-1566',
    links: { official: 'https://sonoji.jp/', reservation: 'https://sonoji.jp/' },
    transport: transport([
      s('人形町', [...L.hibiya, ...L.asakusa], 3),
      s('水天宫前', L.hanzomon, 5),
      s('滨町', L.oedo, 6)
    ])
  },
  'm-rge': {
    address: '東京都港区南青山3-8-14',
    phone: '03-6910-5615',
    links: { official: 'https://maerge.jp/', reservation: 'https://maerge.jp/' },
    transport: transport([
      s('外苑前', L.ginza, 5),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 8),
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 12)
    ])
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  if (patch.address) item.address = patch.address;
  if (patch.phone) item.phone = patch.phone;
  if (patch.links) item.links = { ...(item.links || {}), ...patch.links };
  if (patch.transport) item.transport = patch.transport;
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
