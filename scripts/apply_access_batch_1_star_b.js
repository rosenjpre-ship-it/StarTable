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
  source: 'Michelin Japan / official access information cross-check',
  lastChecked: today
});

const batch = {
  ewig: {
    address: '東京都港区南青山4-3-23 2F',
    phone: '03-6804-5942',
    links: { michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/ewig' },
    transport: transport([
      s('外苑前', L.ginza, 7),
      s('乃木坂', L.chiyoda, 9),
      s('表参道', [...L.ginza, ...L.chiyoda, ...L.hanzomon], 12)
    ])
  },
  'ginza-kitagawa': {
    address: '東京都中央区銀座2-10-11 3F',
    phone: '03-6264-2872',
    links: { michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/ginza-kitagawa' },
    transport: transport([
      s('东银座', [...L.hibiya, ...L.asakusa], 3),
      s('银座一丁目', L.yurakucho, 3),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 6)
    ])
  },
  'ginza-kousui': {
    address: '東京都中央区銀座6-12-14 松岡銀緑館 8F',
    phone: '03-5962-8053',
    links: { official: 'https://ginza-kousui.jp/en/', reservation: 'https://ginza-kousui.jp/en/', michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/ginza-kousui' },
    transport: transport([
      s('东银座', [...L.hibiya, ...L.asakusa], 3),
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 5),
      s('新桥', [...L.jr, ...L.ginza, ...L.asakusa, ...L.yurikamome], 8)
    ])
  },
  'gucci-osteria-da-massimo-bottura-tokyo': {
    address: '東京都中央区銀座6-6-12 4F',
    phone: '03-6264-6606',
    links: { official: 'https://www.gucciosteria.com/en/tokyo', reservation: 'https://www.gucciosteria.com/en/tokyo', michelin: 'https://guide.michelin.com/my/en/tokyo-region/tokyo/restaurant/gucci-osteria-da-massimo-bottura-1201836' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 3),
      s('东银座', [...L.hibiya, ...L.asakusa], 7),
      s('有乐町', [...L.jr, ...L.yurakucho], 8)
    ])
  },
  guchokuni: {
    address: '東京都新宿区神楽坂4-3 4F',
    phone: '050-3138-5225',
    links: { michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/guchokuni' },
    transport: transport([
      s('牛込神乐坂', L.oedo, 4),
      s('饭田桥', [...L.jr, ...L.yurakucho, ...L.namboku, ...L.tozai, ...L.oedo], 5),
      s('神乐坂', L.tozai, 6)
    ])
  },
  hakunei: {
    address: '東京都港区西麻布4-9-11',
    phone: '090-8946-3919',
    links: { official: 'https://hakunei.com/en', reservation: 'https://hakunei.com/en' },
    transport: transport([
      s('广尾', L.hibiya, 8),
      s('六本木', [...L.hibiya, ...L.oedo], 14),
      s('乃木坂', L.chiyoda, 15)
    ])
  },
  'heritage-by-kei-kobayashi': {
    address: '東京都港区赤坂9-7-1 ザ・リッツ・カールトン東京 45F',
    phone: '03-6434-8711',
    links: { official: 'https://www.ritz-carlton.com/en/hotels/tyorz-the-ritz-carlton-tokyo/dining/heritage-by-kei-kobayashi/', reservation: 'https://www.ritz-carlton.com/en/hotels/tyorz-the-ritz-carlton-tokyo/dining/heritage-by-kei-kobayashi/', michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/heritage-by-kei-kobayashi' },
    transport: transport([
      s('六本木', [...L.hibiya, ...L.oedo], 5),
      s('乃木坂', L.chiyoda, 5),
      s('六本木一丁目', L.namboku, 12)
    ])
  },
  'higashiyama-muku': {
    address: '東京都目黒区東山1-15-5 静宏荘 1F',
    phone: '070-3149-4112',
    links: { official: 'https://higashiyama-muku.jp/', reservation: 'https://higashiyama-muku.jp/', michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/higashiyama-muku' },
    transport: transport([
      s('中目黑', [...L.hibiya, ...L.toyoko], 8),
      s('池尻大桥', ['东急田园都市线'], 10),
      s('代官山', L.toyoko, 14)
    ])
  },
  'hiroo-ishizaka': {
    address: '東京都渋谷区広尾5-19-1 2F',
    phone: '080-2392-7910',
    links: { michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/hiroo-ishizaka' },
    transport: transport([
      s('广尾', L.hibiya, 5),
      s('惠比寿', [...L.jr, ...L.hibiya], 15)
    ])
  },
  hortensia: {
    address: '東京都中央区新富1-5-12 2F',
    phone: '03-6262-8987',
    links: { michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/hortensia' },
    transport: transport([
      s('新富町', L.yurakucho, 3),
      s('宝町', L.asakusa, 5),
      s('八丁堀', [...L.hibiya, ...L.jr], 6)
    ])
  },
  'hyakuyaku-by-tokuyamazushi': {
    address: '東京都中央区銀座4-4-2 銀座松屋通り安田ビル 9F',
    phone: '03-5579-9760',
    links: { official: 'https://salt-group.jp/shop/hyakuyaku/', reservation: 'https://japan-food.guide/en/restaurants/1656', tabelog: 'https://tabelog.com/cn/tokyo/A1301/A130101/13302825/' },
    transport: transport([
      s('银座', [...L.ginza, ...L.marunouchi, ...L.hibiya], 2),
      s('银座一丁目', L.yurakucho, 5),
      s('有乐町', [...L.jr, ...L.yurakucho], 6)
    ])
  },
  'il-ristorante-niko-romito': {
    address: '東京都中央区八重洲2-2-1 ブルガリホテル東京 40F',
    phone: '03-6262-6624',
    links: { official: 'https://www.bulgarihotels.com/en_US/tokyo/dining/il-ristorante-niko-romito', reservation: 'https://www.bulgarihotels.com/en_US/tokyo/dining/il-ristorante-niko-romito', michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/il-ristorante-niko-romito-1208307' },
    transport: transport([
      s('东京', [...L.jr, ...L.marunouchi], 3),
      s('京桥', L.ginza, 5),
      s('银座一丁目', L.yurakucho, 6)
    ])
  },
  'ippei-hanten': {
    address: '東京都港区元麻布3-12-41',
    phone: '050-3033-3946',
    links: { official: 'https://ippei-hanten.com/en', reservation: 'https://ippei-hanten.com/en', michelin: 'https://guide.michelin.com/jp/ja/tokyo-region/tokyo/restaurant/ippei-hanten' },
    transport: transport([
      s('麻布十番', [...L.namboku, ...L.oedo], 5),
      s('六本木', [...L.hibiya, ...L.oedo], 12),
      s('广尾', L.hibiya, 16)
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
