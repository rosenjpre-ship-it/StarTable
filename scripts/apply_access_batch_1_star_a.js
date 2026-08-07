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
  yurikamome: ['百合海鸥线'],
  toyoko: ['东急东横线']
};

const s = (name, lines, walkMinutes) => ({ name, lines, walkMinutes });
const transport = stations => ({
  stations,
  verified: true,
  source: 'official/Michelin/Tabelog access information cross-check',
  lastChecked: today
});

const batch = {
  abysse: {
    address: '東京都渋谷区恵比寿西1-30-12 ebisu hills 1F',
    phone: '03-6804-3846',
    links: { official: 'https://abysse.jp/', reservation: 'https://abysse.jp/', michelin: 'https://guide.michelin.com/sg/en/tokyo-region/tokyo/restaurant/abysse', tabelog: 'https://tabelog.com/en/tokyo/A1303/A130302/13232482/' },
    transport: transport([
      s('代官山', L.toyoko, 4),
      s('惠比寿', [...L.jr, ...L.hibiya], 7),
      s('中目黑', [...L.hibiya, ...L.toyoko], 9)
    ])
  },
  'akasaka-kikunoi': {
    address: '東京都港区赤坂6-13-8',
    phone: '03-3568-6055',
    links: { official: 'https://kikunoi.jp/en/', reservation: 'https://kikunoi.jp/reserve/', michelin: 'https://guide.michelin.com/jp/en/tokyo-region/tokyo/restaurant/akasaka-kikunoi' },
    transport: transport([
      s('赤坂', L.chiyoda, 6),
      s('六本木一丁目', L.namboku, 9),
      s('溜池山王', [...L.ginza, ...L.namboku], 10)
    ])
  },
  'akasaka-shimabukuro': {
    address: '東京都港区赤坂3-21-8 久保ビル 3F',
    phone: '03-6277-7290',
    links: { reservation: 'https://omakase.in/ja/r/mt888774', michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/akasaka-shimabukuro', tabelog: 'https://tabelog.com/en/tokyo/A1308/A130801/13300943/' },
    transport: transport([
      s('赤坂见附', [...L.ginza, ...L.marunouchi], 1),
      s('永田町', [...L.hanzomon, ...L.namboku, ...L.yurakucho], 5),
      s('赤坂', L.chiyoda, 7)
    ])
  },
  alchimiste: {
    address: '東京都港区白金台5-17-10',
    phone: '03-5422-7358',
    links: { official: 'https://alchimiste.jp/english.html', reservation: 'https://alchimiste.jp/english.html', michelin: 'https://guide.michelin.com/gb/en/tokyo-region/tokyo/restaurant/alchimiste' },
    transport: transport([
      s('白金台', [...L.namboku, ...L.mita], 4),
      s('目黑', [...L.jr, ...L.namboku, ...L.mita, '东急目黑线'], 15)
    ])
  },
  amarantos: {
    address: '東京都中央区銀座5-6-7 SANWAすずらんビル 9F',
    phone: '03-6228-5041',
    links: { official: 'https://www.amarantos2021.com/english/', reservation: 'https://www.amarantos2021.com/english/', michelin: 'https://guide.michelin.com/gb/en/tokyo-region/tokyo/restaurant/amarantos' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 2),
      s('有乐町', [...L.jr, ...L.yurakucho], 6),
      s('东银座', [...L.hibiya, ...L.asakusa], 7)
    ])
  },
  apotheose: {
    address: '東京都港区虎ノ門2-6-2 虎ノ門ヒルズ ステーションタワー 49F',
    phone: '03-6811-2573',
    links: { official: 'https://apotheose.jp/en/', reservation: 'https://apotheose.jp/en/reservation/', michelin: 'https://guide.michelin.com/jp/en/tokyo-region/tokyo/restaurant/apotheose' },
    transport: transport([
      s('虎之门Hills', L.hibiya, 1),
      s('虎之门', L.ginza, 4),
      s('霞关', [...L.marunouchi, ...L.hibiya, ...L.chiyoda], 10)
    ])
  },
  'au-deco': {
    address: '東京都渋谷区恵比寿2-23-3',
    phone: '03-6721-9218',
    links: { michelin: 'https://guide.michelin.com/gb/en/tokyo-region/tokyo/restaurant/au-deco' },
    transport: transport([
      s('广尾', L.hibiya, 8),
      s('惠比寿', [...L.jr, ...L.hibiya], 12),
      s('白金台', [...L.namboku, ...L.mita], 16)
    ])
  },
  'azabujuban-fukuda': {
    address: '東京都港区麻布十番3-7-5',
    phone: '03-6453-7256',
    links: { michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/azabujuban-fukuda' },
    transport: transport([
      s('麻布十番', [...L.namboku, ...L.oedo], 4),
      s('赤羽桥', L.oedo, 13),
      s('白金高轮', [...L.namboku, ...L.mita], 14)
    ])
  },
  'beige-alain-ducasse': {
    address: '東京都中央区銀座3-5-3 シャネル銀座ビルディング 10F',
    phone: '03-5159-5500',
    links: { official: 'https://beige-tokyo.com/en/information', reservation: 'https://beige-tokyo.com/en/faq', michelin: 'https://guide.michelin.com/gb/en/tokyo-region/tokyo/restaurant/beige-alain-ducasse' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 3),
      s('银座一丁目', L.yurakucho, 3),
      s('有乐町', [...L.jr, ...L.yurakucho], 5)
    ])
  },
  bottega: {
    address: '東京都渋谷区広尾5-17-8 アプリシエ広尾 B1F',
    phone: '03-6450-3933',
    links: { official: 'https://www.bottega-cucina.com/', reservation: 'https://www.bottega-cucina.com/' },
    transport: transport([
      s('广尾', L.hibiya, 4),
      s('惠比寿', [...L.jr, ...L.hibiya], 15)
    ])
  },
  craftale: {
    address: '東京都目黒区青葉台1-16-11 2F',
    phone: '03-6277-5813',
    links: { official: 'https://craftale-nakameguro.jp/', reservation: 'https://craftale-nakameguro.jp/' },
    transport: transport([
      s('中目黑', [...L.hibiya, ...L.toyoko], 7),
      s('代官山', L.toyoko, 11),
      s('池尻大桥', ['东急田园都市线'], 15)
    ])
  },
  'cycle-by-mauro-colagreco': {
    address: '東京都千代田区大手町1-2-1 Otemachi One 1F',
    phone: '03-6551-2885',
    links: { official: 'https://cyclerestaurant.com/?lang=en', reservation: 'https://cyclerestaurant.com/?lang=en' },
    transport: transport([
      s('大手町', [...L.marunouchi, ...L.tozai, ...L.chiyoda, ...L.hanzomon, ...L.mita], 2),
      s('东京', [...L.jr, ...L.marunouchi], 10)
    ])
  },
  daigo: {
    address: '東京都港区愛宕2-3-1 フォレストタワー 2F',
    phone: '03-3431-0811',
    links: { michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/daigo' },
    transport: transport([
      s('神谷町', L.hibiya, 5),
      s('御成门', L.mita, 6),
      s('虎之门Hills', L.hibiya, 8)
    ])
  },
  'dominique-bouchet-tokyo': {
    address: '東京都中央区銀座1-5-6 銀座レンガ通り福神ビル 2F',
    phone: '03-6264-4477',
    links: { official: 'https://www.dominique-bouchet.jp/', reservation: 'https://www.dominique-bouchet.jp/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/dominique-bouchet-1194086' },
    transport: transport([
      s('银座一丁目', L.yurakucho, 3),
      s('京桥', L.ginza, 3),
      s('有乐町', [...L.jr, ...L.yurakucho], 7)
    ])
  },
  'edition-koji-shimomura': {
    address: '東京都港区六本木3-1-1 六本木ティーキューブ 1F',
    phone: '03-5549-4562',
    links: { official: 'https://www.koji-shimomura.jp/en', reservation: 'https://www.koji-shimomura.jp/en' },
    transport: transport([
      s('六本木一丁目', L.namboku, 1),
      s('六本木', [...L.hibiya, ...L.oedo], 9),
      s('神谷町', L.hibiya, 10)
    ])
  },
  'edomae-shinsaku': {
    address: '東京都中央区日本橋人形町2-10-11 KYOE PLAZA 日本橋人形町 6F',
    phone: '03-5615-8728',
    links: { official: 'https://www.shinsaku.tokyo/', reservation: 'https://omakase.in/r/oj274267', michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/edomae-shinsaku', tabelog: 'https://tabelog.com/tokyo/A1302/A130204/13270572/' },
    transport: transport([
      s('人形町', [...L.hibiya, ...L.asakusa], 2),
      s('水天宫前', L.hanzomon, 3),
      s('滨町', L.oedo, 8)
    ])
  },
  'edomae-sushi-hanabusa': {
    address: '東京都港区赤坂9-1-7 赤坂レジデンシャルホテル 102',
    phone: '03-3478-1010',
    links: { official: 'https://www.akasaka-hanabusa.com/en', reservation: 'https://www.akasaka-hanabusa.com/en' },
    transport: transport([
      s('赤坂', L.chiyoda, 6),
      s('六本木', [...L.hibiya, ...L.oedo], 6),
      s('乃木坂', L.chiyoda, 8)
    ])
  },
  est: {
    address: '東京都千代田区大手町1-2-1 フォーシーズンズホテル東京大手町 39F',
    phone: '03-6810-0655',
    links: { official: 'https://www.est-tokyo.com/', reservation: 'https://www.fourseasons.com/otemachi/dining/restaurants/est/', michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/est' },
    transport: transport([
      s('大手町', [...L.marunouchi, ...L.tozai, ...L.chiyoda, ...L.hanzomon, ...L.mita], 2),
      s('东京', [...L.jr, ...L.marunouchi], 10)
    ])
  },
  'esterre-by-alain-ducasse': {
    address: '東京都千代田区丸の内1-1-1 パレスホテル東京 6F',
    phone: '03-3211-5317',
    links: { official: 'https://www.palacehoteltokyo.com/restaurant/esterre/', reservation: 'https://www.palacehoteltokyo.com/restaurant/esterre/', michelin: 'https://guide.michelin.com/gb/en/tokyo-region/tokyo/restaurant/esterre-by-alain-ducasse' },
    transport: transport([
      s('大手町', [...L.marunouchi, ...L.tozai, ...L.chiyoda, ...L.hanzomon, ...L.mita], 2),
      s('二重桥前', L.chiyoda, 8),
      s('东京', [...L.jr, ...L.marunouchi], 9)
    ])
  },
  faro: {
    address: '東京都中央区銀座8-8-3 東京銀座資生堂ビル 10F',
    phone: '03-3572-3911',
    links: { official: 'https://faro.shiseido.co.jp/en/access/', reservation: 'https://faro.shiseido.co.jp/en/access/' },
    transport: transport([
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa, ...L.yurikamome], 5),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 7),
      s('汐留', [...L.oedo, ...L.yurikamome], 8)
    ])
  },
  fushikino: {
    address: '東京都新宿区神楽坂4-3-11 神楽坂つなしょうテラス 2F',
    phone: '03-3269-4556',
    links: { official: 'https://fushikino.com/', reservation: 'https://yoyaku.toreta.in/fushikino/' },
    transport: transport([
      s('牛込神乐坂', L.oedo, 4),
      s('饭田桥', [...L.jr, ...L.yurakucho, ...L.namboku, ...L.tozai, ...L.oedo], 5),
      s('神乐坂', L.tozai, 6)
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
