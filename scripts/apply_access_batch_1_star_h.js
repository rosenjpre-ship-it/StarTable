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
  shinjuku: ['都营新宿线'],
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
  nol: {
    address: '東京都中央区日本橋馬喰町2-2-1 DDD HOTEL 1F',
    phone: '',
    links: { official: 'https://nol.jp/', reservation: 'https://nol.jp/' },
    transport: transport([
      s('馬喰町', L.jr, 3),
      s('浅草桥', [...L.jr, ...L.asakusa], 5),
      s('東日本橋', L.asakusa, 6)
    ])
  },
  oku: {
    address: '東京都台東区浅草3-42-11',
    phone: '03-6802-4474',
    transport: transport([
      s('浅草', [...L.ginza, ...L.asakusa], 10),
      s('田原町', L.ginza, 13),
      s('入谷', L.hibiya, 14)
    ])
  },
  'oryori-tsuji': {
    address: '東京都港区東麻布3-3-9 B1F',
    phone: '050-3145-9475',
    links: { official: 'https://oryori-tsuji.jp/', reservation: 'https://oryori-tsuji.jp/' },
    transport: transport([
      s('麻布十番', [...L.namboku, ...L.oedo], 3),
      s('赤羽桥', L.oedo, 8),
      s('六本木一丁目', L.namboku, 13)
    ])
  },
  'oniku-karyu': {
    address: '東京都中央区銀座1-14-6 GINZA LOUIS 7F',
    phone: '03-6263-2988',
    links: { official: 'https://www.oniku-karyu.com/', reservation: 'https://www.oniku-karyu.com/' },
    transport: transport([
      s('银座一丁目', L.yurakucho, 3),
      s('宝町', L.asakusa, 4),
      s('京桥', L.ginza, 5)
    ])
  },
  'primo-passo': {
    address: '東京都中央区築地1-5-11 B1F',
    phone: '03-6826-9672',
    links: { official: 'https://primopasso.jp/', reservation: 'https://primopasso.jp/' },
    transport: transport([
      s('新富町', L.yurakucho, 3),
      s('筑地', L.hibiya, 5),
      s('东银座', [...L.hibiya, ...L.asakusa], 7)
    ])
  },
  prunier: {
    address: '東京都千代田区丸の内3-2-1 東京會舘 2F',
    phone: '050-3134-3551',
    links: { official: 'https://www.kaikan.co.jp/restaurant/prunier/', reservation: 'https://www.kaikan.co.jp/restaurant/prunier/' },
    transport: transport([
      s('日比谷', [...L.hibiya, ...L.chiyoda, ...L.mita], 3),
      s('二重桥前', L.chiyoda, 4),
      s('有乐町', [...L.jr, ...L.yurakucho], 5)
    ])
  },
  'ren-mishina': {
    address: '東京都中央区銀座7-4-5 銀座745ビル 9F',
    phone: '03-6264-6776',
    links: { official: 'https://ren-mishina.jp/', reservation: 'https://ren-mishina.jp/' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 5),
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa], 6),
      s('日比谷', [...L.hibiya, ...L.chiyoda, ...L.mita], 7)
    ])
  },
  sanosushi: {
    address: '東京都中央区銀座8-7-6 平つかビル 3F',
    phone: '03-6264-5336',
    links: { official: 'https://sanosushi.jp/', reservation: 'https://sanosushi.jp/' },
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa], 4),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 7),
      s('汐留', [...L.oedo, '百合海鸥线'], 8)
    ])
  },
  'shokuzen-abe': {
    address: '東京都中央区銀座5-6-10 ミヤコビル 4F',
    phone: '03-3572-4855',
    links: { official: 'https://shokuzen-abe.jp/', reservation: 'https://shokuzen-abe.jp/' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 2),
      s('有乐町', [...L.jr, ...L.yurakucho], 6),
      s('东银座', [...L.hibiya, ...L.asakusa], 7)
    ])
  },
  'tour-d-argent-tokyo': {
    address: '東京都千代田区紀尾井町4-1 ホテルニューオータニ東京 ザ・メイン ロビー階',
    phone: '03-3239-3111',
    links: { official: 'https://tourdargent.jp/', reservation: 'https://tourdargent.jp/' },
    transport: transport([
      s('赤坂见附', [...L.ginza, ...L.marunouchi], 3),
      s('永田町', [...L.hanzomon, ...L.namboku, ...L.yurakucho], 3),
      s('麹町', L.yurakucho, 8)
    ])
  },
  waketokuyama: {
    address: '東京都港区南麻布5-1-5',
    phone: '03-5789-3838',
    links: { official: 'https://waketoku.com/', reservation: 'https://waketoku.com/' },
    transport: transport([
      s('广尾', L.hibiya, 5),
      s('六本木', [...L.hibiya, ...L.oedo], 16)
    ])
  },
  'yakitori-takahashi': {
    address: '東京都港区南青山1-3-6',
    phone: '03-6804-3301',
    links: { official: 'https://yakitori-takahashi.jp/', reservation: 'https://yakitori-takahashi.jp/' },
    transport: transport([
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 3),
      s('乃木坂', L.chiyoda, 8),
      s('外苑前', L.ginza, 10)
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
