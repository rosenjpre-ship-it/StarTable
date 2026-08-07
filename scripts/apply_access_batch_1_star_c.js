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
  oedo: ['都营大江户线'],
  toyoko: ['东急东横线']
};
const s = (name, lines, walkMinutes) => ({ name, lines, walkMinutes });
const transport = stations => ({
  stations,
  verified: true,
  source: 'Michelin Japan / official access information cross-check',
  lastChecked: today
});

const batch = {
  jizozushi: {
    address: '東京都港区白金台3-18-5 2F',
    phone: '03-3445-5301',
    transport: transport([
      s('白金台', [...L.namboku, ...L.mita], 5),
      s('目黑', [...L.jr, ...L.namboku, ...L.mita, '东急目黑线'], 9)
    ])
  },
  jo: {
    address: '東京都港区西麻布2-24-14 B1F',
    phone: '03-3486-2929',
    transport: transport([
      s('乃木坂', L.chiyoda, 10),
      s('六本木', [...L.hibiya, ...L.oedo], 12),
      s('广尾', L.hibiya, 13)
    ])
  },
  jushu: {
    address: '東京都港区西麻布2-16-1',
    phone: '03-6427-5167',
    links: { official: 'https://www.jushu.jp/', reservation: 'https://www.jushu.jp/' },
    transport: transport([
      s('乃木坂', L.chiyoda, 9),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 12),
      s('六本木', [...L.hibiya, ...L.oedo], 13)
    ])
  },
  kabi: {
    address: '東京都目黒区目黒4-10-8',
    phone: '03-6451-2413',
    links: { official: 'https://kabi.tokyo/', reservation: 'https://kabi.tokyo/' },
    transport: transport([
      s('目黑', [...L.jr, ...L.namboku, ...L.mita, '东急目黑线'], 14),
      s('不动前', ['东急目黑线'], 18)
    ])
  },
  khao: {
    address: '東京都千代田区神田神保町2-12-7',
    phone: '050-5536-9856',
    links: { official: 'https://khao-tokyo.com/', reservation: 'https://khao-tokyo.com/' },
    transport: transport([
      s('神保町', [...L.hanzomon, ...L.mita, ...L.shinjuku], 2),
      s('九段下', [...L.tozai, ...L.hanzomon, ...L.shinjuku], 7),
      s('水道桥', [...L.jr, ...L.mita], 9)
    ])
  },
  kibun: {
    address: '東京都港区西麻布4-11-28 2F',
    phone: '03-6433-5063',
    links: { official: 'https://kibun-restaurant.com/', reservation: 'https://kibun-restaurant.com/' },
    transport: transport([
      s('广尾', L.hibiya, 9),
      s('六本木', [...L.hibiya, ...L.oedo], 14),
      s('乃木坂', L.chiyoda, 15)
    ])
  },
  'l-elan': {
    address: '東京都渋谷区神宮前5-10-1 GYRE 4F',
    phone: '03-6803-8670',
    links: { official: 'https://lelan.jp/', reservation: 'https://lelan.jp/' },
    transport: transport([
      s('明治神宫前', [...L.chiyoda, '东京Metro副都心线'], 3),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 6),
      s('原宿', L.jr, 7)
    ])
  },
  miyasaka: {
    address: '東京都港区南青山5-4-30',
    phone: '03-3499-3877',
    transport: transport([
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 5),
      s('外苑前', L.ginza, 14)
    ])
  },
  seiju: {
    address: '東京都中央区築地3-16-9 B1F',
    phone: '03-3546-2622',
    links: { official: 'https://tempura-seiju.com/', reservation: 'https://tempura-seiju.com/' },
    transport: transport([
      s('筑地', L.hibiya, 3),
      s('筑地市场', L.oedo, 5),
      s('东银座', [...L.hibiya, ...L.asakusa], 7)
    ])
  },
  series: {
    address: '東京都港区麻布台3-4-11',
    phone: '03-5545-5857',
    links: { official: 'https://series-azabudai.com/', reservation: 'https://series-azabudai.com/' },
    transport: transport([
      s('六本木一丁目', L.namboku, 6),
      s('麻布十番', [...L.namboku, ...L.oedo], 8),
      s('神谷町', L.hibiya, 9)
    ])
  },
  ubuka: {
    address: '東京都新宿区荒木町2-14',
    phone: '03-3356-7270',
    links: { official: 'https://ubuka.jp/', reservation: 'https://ubuka.jp/' },
    transport: transport([
      s('四谷三丁目', L.marunouchi, 3),
      s('曙桥', L.shinjuku, 6),
      s('四谷', [...L.jr, ...L.marunouchi, ...L.namboku], 10)
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
