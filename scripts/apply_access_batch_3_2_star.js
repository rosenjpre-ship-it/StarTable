const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-01';

const L = {
  hibiya: ['东京Metro日比谷线'],
  chiyoda: ['东京Metro千代田线'],
  mita: ['都营三田线'],
  oedo: ['都营大江户线'],
  namboku: ['东京Metro南北线'],
  ginza: ['东京Metro银座线'],
  marunouchi: ['东京Metro丸之内线'],
  asakusa: ['都营浅草线'],
  jr: ['JR线'],
  yurakucho: ['东京Metro有乐町线'],
  tozai: ['东京Metro东西线'],
  hanzomon: ['东京Metro半藏门线'],
  fukutoshin: ['东京Metro副都心线'],
  yurikamome: ['百合海鸥线'],
  toyoko: ['东急东横线'],
  tx: ['筑波快线']
};

const s = (name, lines, walkMinutes) => ({ name, lines, walkMinutes });
const transport = stations => ({
  stations,
  verified: true,
  source: 'Michelin Guide address plus Tokyo rail access cross-check',
  lastChecked: today
});

const batch = {
  'azabu-kadowaki': {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/azabu-kadowaki' },
    transport: transport([
      s('麻布十番', [...L.namboku, ...L.oedo], 4),
      s('赤羽桥', L.oedo, 11),
      s('六本木', [...L.hibiya, ...L.oedo], 12)
    ])
  },
  harutaka: {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/harutaka' },
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa, ...L.yurikamome], 4),
      s('内幸町', L.mita, 5),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 6)
    ])
  },
  'kagurazaka-ishikawa': {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/kagurazaka-ishikawa' },
    transport: transport([
      s('牛込神乐坂', L.oedo, 4),
      s('饭田桥', [...L.jr, ...L.yurakucho, ...L.namboku, ...L.tozai, ...L.oedo], 5),
      s('神乐坂', L.tozai, 6)
    ])
  },
  kanda: {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/kanda' },
    transport: transport([
      s('虎之门Hills', L.hibiya, 3),
      s('虎之门', L.ginza, 6),
      s('神谷町', L.hibiya, 7)
    ])
  },
  myojaku: {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/myojaku' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 8),
      s('麻布十番', [...L.namboku, ...L.oedo], 10),
      s('广尾', L.hibiya, 12)
    ])
  },
  quintessence: {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/quintessence' },
    transport: transport([
      s('北品川', ['京急本线'], 5),
      s('品川', [...L.jr, '京急本线'], 10),
      s('大崎', [...L.jr, '临海线'], 12)
    ])
  },
  sazenka: {
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/sazenka' },
    transport: transport([
      s('广尾', L.hibiya, 8),
      s('白金高轮', [...L.namboku, ...L.mita], 12),
      s('麻布十番', [...L.namboku, ...L.oedo], 16)
    ])
  },
  'asahina-gastronome': {
    address: '東京都中央区日本橋兜町1-4',
    phone: '03-5847-9600',
    links: {
      official: 'https://asahinagastronome.com/',
      reservation: 'https://asahinagastronome.com/',
      michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/asahina-gastronome'
    },
    transport: transport([
      s('茅场町', [...L.hibiya, ...L.tozai], 3),
      s('日本桥', [...L.ginza, ...L.tozai, ...L.asakusa], 5),
      s('水天宫前', L.hanzomon, 7)
    ])
  },
  crony: {
    address: '東京都港区東麻布1-20-3',
    phone: '03-6712-5085',
    links: { official: 'https://www.crony.co.jp/', reservation: 'https://www.crony.co.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/crony-1194937' },
    transport: transport([
      s('赤羽桥', L.oedo, 1),
      s('芝公园', L.mita, 7),
      s('神谷町', L.hibiya, 8)
    ])
  },
  den: {
    address: '東京都渋谷区神宮前2-3-18',
    phone: '03-6455-5433',
    links: { official: 'https://www.jimbochoden.com/', reservation: 'https://www.jimbochoden.com/', michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/den' },
    transport: transport([
      s('外苑前', L.ginza, 9),
      s('国立竞技场', L.oedo, 10),
      s('明治神宫前', [...L.chiyoda, ...L.fukutoshin], 11)
    ])
  },
  ensui: {
    address: '東京都目黒区中目黒1-5-12',
    phone: '03-5860-7530',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/ensui' },
    transport: transport([
      s('中目黑', [...L.hibiya, ...L.toyoko], 6),
      s('代官山', L.toyoko, 8),
      s('惠比寿', [...L.jr, ...L.hibiya], 13)
    ])
  },
  esquisse: {
    address: '東京都中央区銀座5-4-6 ロイヤルクリスタル銀座 9F',
    phone: '03-5537-5580',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/esquisse' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 2),
      s('有乐町', [...L.jr, ...L.yurakucho], 5),
      s('日比谷', [...L.hibiya, ...L.chiyoda, ...L.mita], 6)
    ])
  },
  'floril-ge': {
    address: '東京都港区虎ノ門5-10-7 麻布台ヒルズ ガーデンプラザD 2F',
    phone: '03-6435-8018',
    links: { official: 'https://www.aoyama-florilege.jp/', reservation: 'https://www.aoyama-florilege.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/florilege' },
    transport: transport([
      s('神谷町', L.hibiya, 4),
      s('六本木一丁目', L.namboku, 7),
      s('虎之门Hills', L.hibiya, 9)
    ])
  },
  'ginza-fukuju': {
    address: '東京都中央区銀座8-8-19 伊勢由ビル 5F',
    phone: '03-3571-8596',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/ginza-fukuju' },
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa, ...L.yurikamome], 4),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 6),
      s('汐留', [...L.oedo, ...L.yurikamome], 6)
    ])
  },
  'ginza-kojyu': {
    address: '東京都中央区銀座5-4-8 カリオカビル 4F',
    phone: '03-6215-9544',
    links: { official: 'https://ginzaokuda.com/kojyu/', reservation: 'https://ginzaokuda.com/kojyu/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/ginza-koju' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 1),
      s('有乐町', [...L.jr, ...L.yurakucho], 5),
      s('东银座', [...L.hibiya, ...L.asakusa], 6)
    ])
  },
  'ginza-shinohara': {
    address: '東京都中央区銀座2-8-17 ハビウル銀座II B1F',
    phone: '03-6263-0345',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/ginza-shinohara' },
    transport: transport([
      s('银座一丁目', L.yurakucho, 2),
      s('东银座', [...L.hibiya, ...L.asakusa], 4),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 5)
    ])
  },
  hakuun: {
    address: '東京都港区南青山4-11-2',
    phone: '03-6812-9613',
    links: { official: 'https://hakuun.jp/', reservation: 'https://hakuun.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/hakuun' },
    transport: transport([
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 8),
      s('外苑前', L.ginza, 8),
      s('乃木坂', L.chiyoda, 11)
    ])
  },
  hommage: {
    address: '東京都台東区浅草4-10-5',
    phone: '03-3874-1552',
    links: { official: 'https://www.hommage-arai.com/', reservation: 'https://www.hommage-arai.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/hommage' },
    transport: transport([
      s('浅草', [...L.ginza, ...L.asakusa, ...L.tx], 10),
      s('入谷', L.hibiya, 13),
      s('田原町', L.ginza, 14)
    ])
  },
  'jingumae-higuchi': {
    address: '東京都渋谷区神宮前2-19-12',
    phone: '03-3402-7038',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/jingumae-higuchi' },
    transport: transport([
      s('外苑前', L.ginza, 9),
      s('明治神宫前', [...L.chiyoda, ...L.fukutoshin], 10),
      s('原宿', L.jr, 11)
    ])
  },
  'kioicho-fukudaya': {
    address: '東京都千代田区紀尾井町1-13',
    phone: '03-3261-8577',
    links: { official: 'https://www.kioicho-fukudaya.jp/', reservation: 'https://www.kioicho-fukudaya.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/kioicho-fukudaya' },
    transport: transport([
      s('永田町', [...L.hanzomon, ...L.namboku, ...L.yurakucho], 2),
      s('赤坂见附', [...L.ginza, ...L.marunouchi], 5),
      s('麹町', L.yurakucho, 6)
    ])
  },
  kohaku: {
    address: '東京都新宿区神楽坂3-5-5',
    phone: '050-3138-5225',
    links: { official: 'https://kagurazaka-kohaku.jp/', reservation: 'https://kagurazaka-kohaku.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/kohaku' },
    transport: transport([
      s('饭田桥', [...L.jr, ...L.yurakucho, ...L.namboku, ...L.tozai, ...L.oedo], 4),
      s('牛込神乐坂', L.oedo, 5),
      s('神乐坂', L.tozai, 6)
    ])
  },
  kutan: {
    address: '東京都中央区新富2-5-5',
    phone: '03-5543-0335',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/kutan' },
    transport: transport([
      s('新富町', L.yurakucho, 1),
      s('筑地', L.hibiya, 6),
      s('八丁堀', [...L.hibiya, ...L.jr], 7)
    ])
  },
  maz: {
    address: '東京都千代田区紀尾井町1-3 東京ガーデンテラス紀尾井町 3F',
    phone: '03-6272-8513',
    links: { official: 'https://maztokyo.jp/', reservation: 'https://maztokyo.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/maz' },
    transport: transport([
      s('永田町', [...L.hanzomon, ...L.namboku, ...L.yurakucho], 2),
      s('赤坂见附', [...L.ginza, ...L.marunouchi], 5),
      s('麹町', L.yurakucho, 6)
    ])
  },
  narisawa: {
    address: '東京都港区南青山2-6-15',
    phone: '03-5785-0799',
    links: { official: 'https://www.narisawa-yoshihiro.com/', reservation: 'https://www.narisawa-yoshihiro.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/narisawa' },
    transport: transport([
      s('青山一丁目', [...L.ginza, ...L.hanzomon, ...L.oedo], 3),
      s('外苑前', L.ginza, 6),
      s('乃木坂', L.chiyoda, 8)
    ])
  },
  'nishiazabu-sushi-shin': {
    address: '東京都港区西麻布4-18-20',
    phone: '03-5485-0031',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/nishiazabu-sushi-shin' },
    transport: transport([
      s('广尾', L.hibiya, 9),
      s('六本木', [...L.hibiya, ...L.oedo], 12),
      s('乃木坂', L.chiyoda, 13)
    ])
  },
  prisma: {
    address: '東京都港区南青山6-4-6',
    phone: '03-3406-3050',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/prisma-1194160' },
    transport: transport([
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 8),
      s('乃木坂', L.chiyoda, 14),
      s('广尾', L.hibiya, 15)
    ])
  },
  ryuzu: {
    address: '東京都港区六本木4-2-35 アーバンスタイル六本木三河台 B1F',
    phone: '03-5770-4236',
    links: { official: 'https://restaurant-ryuzu.com/', reservation: 'https://restaurant-ryuzu.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/ryuzu' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 3),
      s('六本木一丁目', L.namboku, 6),
      s('乃木坂', L.chiyoda, 9)
    ])
  },
  seizan: {
    address: '東京都港区三田2-17-29 グランデ三田 B1F',
    phone: '03-3451-8320',
    links: { official: 'https://www.nihonryori-seizan.com/', reservation: 'https://www.nihonryori-seizan.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/seizan' },
    transport: transport([
      s('三田', [...L.mita, ...L.asakusa], 9),
      s('田町', L.jr, 10),
      s('赤羽桥', L.oedo, 10)
    ])
  },
  'sukiyabashi-jiro-roppongiten': {
    address: '東京都港区六本木6-12-2 六本木ヒルズレジデンスB棟 3F',
    phone: '03-5413-6626',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/sukiyabashi-jiro-roppongiten' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 6),
      s('麻布十番', [...L.namboku, ...L.oedo], 8),
      s('乃木坂', L.chiyoda, 13)
    ])
  },
  'sushi-kanesaka': {
    address: '東京都中央区銀座8-10-3 三鈴ビル B1F',
    phone: '03-5568-4411',
    links: { official: 'https://ginza-sushi-kanesaka.com/', reservation: 'https://ginza-sushi-kanesaka.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/sushi-kanesaka' },
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa, ...L.yurikamome], 4),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 6),
      s('汐留', [...L.oedo, ...L.yurikamome], 6)
    ])
  },
  'tempura-ginya': {
    address: '東京都港区白金台5-17-9 B1F',
    phone: '03-5422-7612',
    links: { official: 'https://tempura-ginya.com/', reservation: 'https://tempura-ginya.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/tempura-ginya' },
    transport: transport([
      s('白金台', [...L.namboku, ...L.mita], 4),
      s('目黑', [...L.jr, ...L.namboku, ...L.mita, '东急目黑线'], 13)
    ])
  },
  'tempura-kondo': {
    address: '東京都中央区銀座5-5-13 坂口ビル 9F',
    phone: '03-5568-0923',
    links: { official: 'https://tempura-kondo.com/', reservation: 'https://tempura-kondo.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/tempura-kondo' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 3),
      s('有乐町', [...L.jr, ...L.yurakucho], 5),
      s('东银座', [...L.hibiya, ...L.asakusa], 6)
    ])
  },
  'tempura-motoyoshi': {
    address: '東京都渋谷区恵比寿西2-8-11 グランベル恵比寿III 3F',
    phone: '03-6455-0200',
    links: { official: 'https://motoyoshi-1120.com/', reservation: 'https://motoyoshi-1120.com/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/tempura-motoyoshi' },
    transport: transport([
      s('惠比寿', [...L.jr, ...L.hibiya], 5),
      s('代官山', L.toyoko, 6)
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
