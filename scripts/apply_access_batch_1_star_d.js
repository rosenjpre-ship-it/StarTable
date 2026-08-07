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
  oedo: ['都营大江户线'],
  yurikamome: ['百合海鸥线']
};
const s = (name, lines, walkMinutes) => ({ name, lines, walkMinutes });
const transport = stations => ({
  stations,
  verified: true,
  source: 'Michelin Japan / official access information cross-check',
  lastChecked: today
});

const batch = {
  'kyobashi-tempura-fukamachi': {
    address: '東京都中央区京橋2-5-2',
    phone: '03-5250-8777',
    transport: transport([
      s('京桥', L.ginza, 1),
      s('宝町', L.asakusa, 3),
      s('东京', [...L.jr, ...L.marunouchi], 7)
    ])
  },
  'l-affinage': {
    address: '東京都中央区銀座5-9-16 2F',
    phone: '03-6274-6541',
    links: { official: 'https://www.laffinage.jp/', reservation: 'https://www.laffinage.jp/' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 3),
      s('东银座', [...L.hibiya, ...L.asakusa], 4),
      s('银座一丁目', L.yurakucho, 7)
    ])
  },
  'l-argent': {
    address: '東京都千代田区霞が関3-2-6 東京倶楽部ビルディング 2F',
    phone: '03-6268-8427',
    links: { official: 'https://largent.tokyo/', reservation: 'https://largent.tokyo/' },
    transport: transport([
      s('虎之门', L.ginza, 3),
      s('霞关', [...L.marunouchi, ...L.hibiya, ...L.chiyoda], 6),
      s('国会议事堂前', [...L.marunouchi, ...L.chiyoda], 7)
    ])
  },
  'l-atelier-de-joel-robuchon': {
    address: '東京都港区六本木6-10-1 六本木ヒルズ ヒルサイド 2F',
    phone: '03-5772-7500',
    links: { official: 'https://www.robuchon.jp/en/shop-list/latelier', reservation: 'https://www.robuchon.jp/en/shop-list/latelier' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 4),
      s('麻布十番', [...L.namboku, ...L.oedo], 12),
      s('乃木坂', L.chiyoda, 12)
    ])
  },
  'la-table-de-joel-robuchon': {
    address: '東京都目黒区三田1-13-1 恵比寿ガーデンプレイス内',
    phone: '03-5424-1338',
    links: { official: 'https://www.robuchon.jp/en/shop-list/la-table', reservation: 'https://www.robuchon.jp/en/shop-list/la-table' },
    transport: transport([
      s('惠比寿', [...L.jr, ...L.hibiya], 10),
      s('目黑', [...L.jr, ...L.namboku, ...L.mita, '东急目黑线'], 12)
    ])
  },
  lature: {
    address: '東京都渋谷区渋谷2-2-2 B1F',
    phone: '03-6450-5297',
    links: { official: 'https://www.lature.jp/', reservation: 'https://www.lature.jp/' },
    transport: transport([
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 8),
      s('涩谷', [...L.jr, ...L.ginza, ...L.hanzomon, '东京Metro副都心线', '东急东横线', '东急田园都市线', '京王井之头线'], 10)
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
