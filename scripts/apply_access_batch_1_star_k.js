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
  source: 'Michelin Japan / official / reservation-page cross-check',
  lastChecked: today
});
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'sushi-tanaka': {
    address: '東京都港区南麻布2-7-23',
    phone: '03-6809-3522',
    transport: transport([
      s('白金高轮', [...L.namboku, ...L.mita], 8),
      s('麻布十番', [...L.namboku, ...L.oedo], 11),
      s('广尾', L.hibiya, 18)
    ])
  },
  'sushi-yuki': {
    address: '東京都渋谷区広尾5-17-4',
    phone: '03-6277-0468',
    transport: transport([
      s('广尾', L.hibiya, 4),
      s('惠比寿', [...L.jr, ...L.hibiya], 17)
    ])
  },
  'sushidokoro-kiraku': {
    address: '東京都世田谷区経堂1-12-12',
    phone: '03-3429-1344',
    links: { official: 'https://edomaekiraku.gorp.jp/', reservation: 'https://www.tablecheck.com/en/shops/sushidokoro-kiraku/reserve' },
    transport: transport([
      s('经堂', ['小田急线'], 1),
      s('宫之坂', ['东急世田谷线'], 13)
    ])
  },
  'takumi-tatsuhiro': {
    address: '東京都新宿区新宿1-11-7 サンサーラ第5御苑ビル 1F',
    phone: '03-5925-8225',
    links: {
      official: 'https://takumi-tatsuhiro-shinjukugyoen.com/',
      reservation: 'https://omakaseje.com/restaurants/pm662118'
    },
    ratings: { tabelogScore: '3.65', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1304/A130402/13086506/' },
    transport: transport([
      s('新宿御苑前', L.marunouchi, 3),
      s('新宿三丁目', [...L.marunouchi, ...L.shinjuku, '东京Metro副都心线'], 8),
      s('四谷三丁目', L.marunouchi, 10)
    ]),
    lunch: [
      course('午餐 Omakase Course', '¥22,560', ['交替提供精心准备的小菜与握寿司', '沿袭四谷「すし匠」体系', '食材随季节与进货调整'], 'OMAKASE 公开预约页价格，含税与店铺服务费。')
    ],
    dinner: [
      course('晚餐 Omakase Course', '¥38,400', ['交替提供小菜与握寿司', '使用北海道、九州、石川等地直送鱼介', '追加点单可能另计'], 'OMAKASE 公开预约页价格，含税与店铺服务费。')
    ],
    childPolicy: '儿童政策：12岁以上，且能享用成人相同套餐者可入店。',
    dressCode: '有 Dress Code：预约页未列具体着装条款；建议 smart casual，避免强烈香水。'
  },
  tanimoto: {
    address: '東京都新宿区神楽坂3-1 3F',
    phone: '03-6380-5797',
    transport: transport([
      s('饭田桥', [...L.jr, ...L.tozai, ...L.yurakucho, ...L.namboku, ...L.oedo], 4),
      s('牛込神乐坂', L.oedo, 6),
      s('神乐坂', L.tozai, 8)
    ])
  },
  'tempura-maehira': {
    address: '東京都港区麻布十番2-8-16 ISIビル 4F',
    phone: '03-6435-1996',
    links: { reservation: 'https://tempura-maehira.myconciergejapan.net/' },
    ratings: { tabelogScore: '3.75', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130702/13212060/' },
    transport: transport([
      s('麻布十番', [...L.namboku, ...L.oedo], 3),
      s('六本木', [...L.hibiya, ...L.oedo], 10),
      s('赤羽桥', L.oedo, 14)
    ]),
    dressCode: '有 Dress Code：Smart casual。请避免短裤、背心等过度休闲着装。',
    childPolicy: '儿童政策：可享用成人相同套餐的年龄可咨询；公开信息同时标注“不接待儿童”，预约前需确认。'
  },
  'tempura-miyashiro': {
    address: '東京都目黒区上目黒2-18-11',
    phone: '03-6452-2808',
    links: { official: 'https://www.miyashiro.tokyo/', reservation: 'https://www.tablecheck.com/en/miyashiro' },
    transport: transport([
      s('中目黑', [...L.hibiya, '东急东横线'], 3),
      s('祐天寺', ['东急东横线'], 10)
    ]),
    lunch: [
      course('Lunch Course', '¥17,600', ['前菜', '刺身', '天妇罗 10 品', '食事', '甜点'], 'TableCheck 公开菜单。'),
      course('Lunch Full Course', '¥30,800', ['前菜', '刺身 2 品', '推荐料理 2 品', '天妇罗 11 品', '食事', '甜点'], 'TableCheck 公开菜单。')
    ],
    dinner: [
      course('Night Course', '¥30,800', ['前菜', '刺身 2 品', '推荐料理 2 品', '天妇罗 11 品', '食事', '甜点'], 'TableCheck 公开菜单。')
    ],
    childPolicy: '儿童政策：欢迎学龄儿童；儿童也需享用套餐。',
    dressCode: '有 Dress Code：官网未列严格 dress code；建议 smart casual。'
  },
  'tempura-yaguchi': {
    address: '東京都中央区日本橋人形町2-9-7',
    phone: '03-3527-3701',
    transport: transport([
      s('人形町', [...L.hibiya, ...L.asakusa], 2),
      s('水天宫前', L.hanzomon, 5),
      s('浜町', L.shinjuku, 8)
    ])
  },
  'ten-yokota': {
    address: '東京都港区元麻布3-10-5 2F',
    phone: '03-6721-0404',
    transport: transport([
      s('麻布十番', [...L.namboku, ...L.oedo], 7),
      s('六本木', [...L.hibiya, ...L.oedo], 12),
      s('广尾', L.hibiya, 16)
    ])
  },
  'ten-masa': {
    address: '東京都目黒区上目黒3-16-13 B1F',
    phone: '03-6303-4005',
    transport: transport([
      s('中目黑', [...L.hibiya, '东急东横线'], 4),
      s('祐天寺', ['东急东横线'], 14),
      s('代官山', ['东急东横线'], 15)
    ]),
    dressCode: '有 Dress Code：请避免强烈香水。',
    childPolicy: '儿童政策：未在公开页面明确；预约前需确认。'
  },
  tenoshima: {
    address: '東京都港区南青山1-3-21 2F',
    phone: '03-6316-2150',
    transport: transport([
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 3),
      s('乃木坂', L.chiyoda, 8),
      s('外苑前', L.ginza, 10)
    ])
  },
  toki: {
    address: '東京都港区新橋1-8-4 2F',
    phone: '03-6228-5665',
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa], 3),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 8),
      s('汐留', [...L.oedo, '百合海鸥线'], 8)
    ])
  },
  torakuro: {
    address: '東京都千代田区内幸町1-1-1 帝国ホテル 東京 本館 B1F',
    phone: '03-3539-8224',
    transport: transport([
      s('日比谷', [...L.hibiya, ...L.chiyoda, ...L.mita], 3),
      s('内幸町', L.mita, 4),
      s('有乐町', [...L.jr, ...L.yurakucho], 7)
    ])
  },
  towa: {
    address: '東京都港区西麻布4-11-25 2F',
    phone: '03-6433-5680',
    transport: transport([
      s('广尾', L.hibiya, 10),
      s('乃木坂', L.chiyoda, 13),
      s('六本木', [...L.hibiya, ...L.oedo], 14)
    ])
  },
  'trois-visages': {
    address: '東京都中央区銀座7-16-21',
    phone: '03-3544-5205',
    transport: transport([
      s('筑地市场', L.oedo, 4),
      s('东银座', [...L.hibiya, ...L.asakusa], 6),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 9)
    ])
  },
  'yakumo-uezu': {
    address: '東京都目黒区八雲1-3-9',
    phone: '03-5726-9359',
    links: { official: 'https://www.yakumo-uezu.com/', reservation: 'https://www.yakumo-uezu.com/' },
    transport: transport([
      s('都立大学', ['东急东横线'], 3)
    ]),
    childPolicy: '儿童政策：包场时可携儿童，需预约时咨询。',
    dressCode: '有 Dress Code：官网未列严格 dress code；建议 smart casual。'
  },
  yama: {
    address: '東京都港区白金6-16-41',
    phone: '',
    transport: transport([
      s('白金台', [...L.namboku, ...L.mita], 11),
      s('广尾', L.hibiya, 13),
      s('惠比寿', [...L.jr, ...L.hibiya], 16)
    ])
  },
  'yotsuya-minemura': {
    address: '東京都新宿区荒木町3-21 宮内ビル 2F',
    phone: '03-5315-4958',
    links: { official: 'https://yotsuya-minemura.com/', reservation: 'https://omakase.in/en/r/rh414584' },
    ratings: { tabelogScore: '', tabelogUrl: 'https://tabelog.com/en/tokyo/A1309/A130903/13289509/' },
    transport: transport([
      s('四谷三丁目', L.marunouchi, 6),
      s('曙桥', L.shinjuku, 7),
      s('四ツ谷', [...L.jr, ...L.marunouchi, ...L.namboku], 10)
    ]),
    dinner: [
      course('Chef’s Tasting Course', '¥33,000 起', ['手打荞麦包含在套餐构成中', '内容随食材与市场情况调整'], 'OMAKASE 公开预约页价格；另收服务费。')
    ],
    childPolicy: '儿童政策：12岁以上，且可享用成人相同套餐者可入店。',
    dressCode: '有 Dress Code：预约页未列具体着装条款；建议 smart casual。'
  },
  zurriola: {
    address: '東京都中央区銀座6-8-7 交詢ビル 4F',
    phone: '03-3289-5331',
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 3),
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa], 7),
      s('有乐町', [...L.jr, ...L.yurakucho], 8)
    ])
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') item.links = { ...(item.links || {}), ...value };
    else if (key === 'ratings') item.ratings = { ...(item.ratings || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
