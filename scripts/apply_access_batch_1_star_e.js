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
  'l-eterre': {
    address: '東京都新宿区神楽坂3-6-53 2F',
    phone: '03-6388-1312',
    transport: transport([
      s('饭田桥', [...L.jr, ...L.yurakucho, ...L.namboku, ...L.tozai, ...L.oedo], 5),
      s('牛込神乐坂', L.oedo, 6),
      s('神乐坂', L.tozai, 7)
    ])
  },
  'la-paix': {
    address: '東京都中央区日本橋室町1-9-4 B1F',
    phone: '050-3196-2390',
    links: { official: 'https://lapaix-m.jp/', reservation: 'https://lapaix-m.jp/' },
    transport: transport([
      s('三越前', [...L.ginza, ...L.hanzomon], 2),
      s('日本桥', [...L.ginza, ...L.tozai, ...L.asakusa], 5),
      s('新日本桥', L.jr, 6)
    ])
  },
  'le-sputnik': {
    address: '東京都港区六本木7-9-9',
    phone: '03-6434-7080',
    links: { official: 'https://le-sputnik.jp/', reservation: 'https://le-sputnik.jp/' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 4),
      s('乃木坂', L.chiyoda, 5),
      s('六本木一丁目', L.namboku, 13)
    ])
  },
  'les-saisons': {
    address: '東京都千代田区内幸町1-1-1 帝国ホテル東京 本館 MF',
    phone: '03-3539-8087',
    links: { official: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/les-saisons', reservation: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/les-saisons' },
    transport: transport([
      s('日比谷', [...L.hibiya, ...L.chiyoda, ...L.mita], 3),
      s('内幸町', L.mita, 3),
      s('有乐町', [...L.jr, ...L.yurakucho], 7)
    ])
  },
  'makiyaki-ginza-onodera': {
    address: '東京都中央区銀座5-14-14 サンリット銀座ビルIII 9F',
    phone: '03-6264-3644',
    links: { official: 'https://onodera-group.com/makiyaki-ginza/', reservation: 'https://onodera-group.com/makiyaki-ginza/' },
    transport: transport([
      s('东银座', [...L.hibiya, ...L.asakusa], 2),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 6),
      s('筑地市场', L.oedo, 7)
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
