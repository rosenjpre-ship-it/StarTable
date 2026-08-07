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
  sincere: {
    address: '東京都渋谷区千駄ヶ谷3-7-13 B1F',
    phone: '03-6804-2006',
    transport: transport([
      s('北参道', ['东京Metro副都心线'], 3),
      s('原宿', L.jr, 9),
      s('千駄ヶ谷', L.jr, 10)
    ])
  },
  sorahana: {
    address: '東京都港区虎ノ門5-3-3',
    phone: '080-4071-0555',
    transport: transport([
      s('神谷町', L.hibiya, 2),
      s('六本木一丁目', L.namboku, 10),
      s('御成门', L.mita, 11)
    ])
  },
  'sumibikappo-shirosaka': {
    address: '東京都港区赤坂6-3-9',
    phone: '03-5797-7066',
    links: { official: 'https://shirosaka.jp/' },
    transport: transport([
      s('赤坂', L.chiyoda, 3),
      s('溜池山王', [...L.ginza, ...L.namboku], 8),
      s('赤坂见附', [...L.ginza, ...L.marunouchi], 10)
    ])
  },
  'sushi-hashimoto': {
    address: '東京都中央区新富1-8-2',
    phone: '03-5541-5578',
    transport: transport([
      s('新富町', L.yurakucho, 3),
      s('八丁堀', [...L.jr, ...L.hibiya], 5),
      s('宝町', L.asakusa, 7)
    ])
  },
  'sushi-ichijo': {
    address: '東京都中央区東日本橋3-1-3',
    phone: '03-6661-1335',
    transport: transport([
      s('馬喰横山', L.shinjuku, 2),
      s('東日本橋', L.asakusa, 4),
      s('小伝馬町', L.hibiya, 5)
    ])
  },
  'sushi-keita': {
    address: '東京都中央区築地6-6-4',
    phone: '03-6264-2234',
    transport: transport([
      s('筑地', L.hibiya, 5),
      s('新富町', L.yurakucho, 8),
      s('筑地市场', L.oedo, 9)
    ])
  },
  'sushi-kojima': {
    address: '東京都中央区銀座8-2-10',
    phone: '03-6252-3288',
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa], 5),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 7),
      s('内幸町', L.mita, 7)
    ])
  },
  'sushi-masashi': {
    address: '東京都港区北青山2-9-9 7F',
    phone: '03-6384-5526',
    transport: transport([
      s('外苑前', L.ginza, 3),
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 10),
      s('表参道', [...L.ginza, ...L.hanzomon, ...L.chiyoda], 11)
    ])
  },
  'sushi-matsuura': {
    address: '東京都港区白金5-7-8',
    phone: '03-6450-2557',
    transport: transport([
      s('白金高轮', [...L.namboku, ...L.mita], 10),
      s('广尾', L.hibiya, 13),
      s('惠比寿', [...L.jr, ...L.hibiya], 17)
    ])
  },
  'sushi-miura': {
    address: '東京都港区赤坂6-19-46',
    phone: '090-8894-0020',
    transport: transport([
      s('赤坂', L.chiyoda, 7),
      s('六本木一丁目', L.namboku, 8),
      s('乃木坂', L.chiyoda, 9)
    ])
  },
  'sushi-oya': {
    address: '東京都新宿区袋町3-6 3F',
    phone: '03-6228-1868',
    transport: transport([
      s('牛込神乐坂', L.oedo, 4),
      s('饭田桥', [...L.jr, ...L.tozai, ...L.yurakucho, ...L.namboku, ...L.oedo], 7),
      s('神乐坂', L.tozai, 8)
    ])
  },
  'sushi-ryujiro': {
    address: '東京都港区南青山2-11-11',
    phone: '03-6384-5865',
    transport: transport([
      s('外苑前', L.ginza, 4),
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 5),
      s('乃木坂', L.chiyoda, 12)
    ])
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') item.links = { ...(item.links || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
