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
  keioNew: ['京王新线']
};

const s = (name, lines, walkMinutes) => ({ name, lines, walkMinutes });
const transport = stations => ({
  stations,
  verified: true,
  source: 'Michelin Japan / official access information cross-check',
  lastChecked: today
});

const batch = {
  'nogizaka-shin': {
    address: '東京都港区赤坂8-11-19 エクレール乃木坂 1F',
    phone: '03-6721-0086',
    links: {
      official: 'https://www.nogi-s.com/',
      reservation: 'https://www.tablecheck.com/en/shops/nogizaka-shin/reserve'
    },
    transport: transport([
      s('乃木坂', L.chiyoda, 2),
      s('六本木', [...L.hibiya, ...L.oedo], 10),
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 11)
    ]),
    dressCode: '有 Dress Code：Smart casual。请避免 T 恤、短裤、休闲凉鞋及香味过强的香水。',
    childPolicy: '儿童政策：TableAll 显示 0 岁以上可接待；预约前建议再次向店铺确认。'
  },
  'piao-xiang': {
    address: '東京都渋谷区広尾5-19-1 HIROO VILLAGE 1F-2',
    phone: '03-6277-2141',
    links: {
      official: 'https://www.piao-xiang.com/',
      reservation: 'https://www.piao-xiang.com/hiroo/dinner/'
    },
    ratings: { tabelogScore: '3.73', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130703/13274033/' },
    transport: transport([
      s('广尾', L.hibiya, 5),
      s('惠比寿', [...L.jr, ...L.hibiya], 15)
    ]),
    dressCode: '有 Dress Code：Smart casual。',
    childPolicy: '儿童政策：中学生以上，且可完整享用套餐者可入店。'
  },
  sassa: {
    address: '東京都渋谷区広尾5-13-6',
    phone: '070-8306-7946',
    transport: transport([
      s('广尾', L.hibiya, 3),
      s('惠比寿', [...L.jr, ...L.hibiya], 17)
    ])
  },
  saucer: {
    address: '東京都渋谷区恵比寿西2-7-10 B1F',
    phone: '03-6712-7713',
    transport: transport([
      s('惠比寿', [...L.jr, ...L.hibiya], 6),
      s('代官山', ['东急东横线'], 6),
      s('涩谷', [...L.jr, ...L.ginza, ...L.hanzomon], 12)
    ])
  },
  seisoka: {
    address: '東京都港区南麻布4-2-34',
    phone: '03-3473-3103',
    links: { official: 'https://seisoka.com/' },
    transport: transport([
      s('广尾', L.hibiya, 7),
      s('白金高轮', [...L.namboku, ...L.mita], 18)
    ])
  },
  'sharikimon-onozawa': {
    address: '東京都新宿区荒木町6-39',
    phone: '03-6457-8550',
    transport: transport([
      s('四谷三丁目', L.marunouchi, 4),
      s('曙桥', L.shinjuku, 6),
      s('四ツ谷', [...L.jr, ...L.marunouchi, ...L.namboku], 10)
    ])
  },
  shigeyuki: {
    address: '東京都渋谷区西原2-17-3',
    phone: '03-6804-9428',
    transport: transport([
      s('幡谷', L.keioNew, 7),
      s('代代木上原', [...L.chiyoda, '小田急线'], 10),
      s('笹塚', ['京王线', L.keioNew[0]], 13)
    ])
  },
  'shimbashi-sasada': {
    address: '東京都港区西新橋1-23-7',
    phone: '03-3507-5501',
    transport: transport([
      s('虎之门', L.ginza, 4),
      s('内幸町', L.mita, 5),
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa], 8)
    ])
  },
  shinois: {
    address: '東京都港区白金台4-2-7 2F',
    phone: '',
    transport: transport([
      s('白金台', [...L.namboku, ...L.mita], 3),
      s('目黑', [...L.jr, ...L.namboku, ...L.mita], 13),
      s('高轮台', L.asakusa, 14)
    ])
  },
  sanosushi: {
    address: '東京都港区芝2-18-9',
    phone: '03-6453-9666',
    transport: transport([
      s('芝公园', L.mita, 5),
      s('三田', [...L.mita, ...L.asakusa], 8),
      s('田町', L.jr, 10)
    ])
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') {
      item.links = { ...(item.links || {}), ...value };
    } else if (key === 'ratings') {
      item.ratings = { ...(item.ratings || {}), ...value };
    } else {
      item[key] = value;
    }
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
