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
  itsuka: {
    address: '東京都港区南青山2-14-15 AOYAMA FUSION Bldg. 2F',
    phone: '03-3796-7835',
    links: { official: 'https://www.itsuka8.com/', reservation: 'https://www.itsuka8.com/' },
    transport: transport([
      s('外苑前', L.ginza, 3),
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 7),
      s('乃木坂', L.chiyoda, 13)
    ])
  },
  'kappo-muroi': {
    address: '東京都港区西麻布2-16-4 第二吉山ビル 1F',
    phone: '03-6805-1994',
    transport: transport([
      s('乃木坂', L.chiyoda, 10),
      s('六本木', [...L.hibiya, ...L.oedo], 13),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 14)
    ])
  },
  'koshikiryori-koki': {
    address: '東京都港区西新橋2-13-6 ミタニビル 1F',
    phone: '03-6268-8863',
    links: { official: 'https://koushiki-ryori.com/', reservation: 'https://koushiki-ryori.com/contact/' },
    transport: transport([
      s('虎之门Hills', L.hibiya, 5),
      s('内幸町', L.mita, 6),
      s('虎之门', L.ginza, 7)
    ])
  },
  'la-gloire': {
    address: '東京都港区赤坂2-17-7',
    phone: '03-6441-0251',
    links: { official: 'https://lagloire.jp/', reservation: 'https://lagloire.jp/' },
    transport: transport([
      s('赤坂', L.chiyoda, 5),
      s('溜池山王', [...L.ginza, ...L.namboku], 6),
      s('六本木一丁目', L.namboku, 8)
    ])
  },
  'nishiazabu-taku': {
    address: '東京都港区西麻布2-11-5',
    phone: '03-5774-4372',
    links: { official: 'https://sushi-taku.com/', reservation: 'https://sushi-taku.com/' },
    transport: transport([
      s('乃木坂', L.chiyoda, 9),
      s('六本木', [...L.hibiya, ...L.oedo], 12),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 14)
    ])
  },
  'nodaiwa-azabu-iikura-honten': {
    address: '東京都港区東麻布1-5-4',
    phone: '03-3583-7852',
    links: { official: 'https://www.nodaiwa.co.jp/', reservation: 'https://www.nodaiwa.co.jp/' },
    transport: transport([
      s('赤羽桥', L.oedo, 4),
      s('神谷町', L.hibiya, 8),
      s('麻布十番', [...L.namboku, ...L.oedo], 10)
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
