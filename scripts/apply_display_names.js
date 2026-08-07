const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const names = {
  'Akasaka Kikunoi': ['赤坂 菊乃井', '赤坂 菊乃井'],
  'Azabujuban Fukuda': ['麻布十番 ふくだ', '麻布十番 ふくだ'],
  Daigo: ['醍醐', '醍醐'],
  'Edomae Shinsaku': ['江戸前 晋作', '江户前 晋作'],
  'Ginza Kitagawa': ['銀座 きた川', '银座 きた川'],
  'Ginza Kousui': ['銀座 志翠', '银座 志翠'],
  Guchokuni: ['愚直に', '愚直に'],
  hakunei: ['白寧', '白宁'],
  'Higashiyama Muku': ['東山 無垢', '东山 无垢'],
  'Hiroo Ishizaka': ['広尾 石阪', '广尾 石阪'],
  'Ippei Hanten': ['一平飯店', '一平饭店'],
  itsuka: ['慈華', '慈华'],
  Jizozushi: ['地蔵鮓', '地藏鮓'],
  JO: ['上', '上'],
  Jushu: ['壽修', '寿修'],
  'Kappo Muroi': ['割烹 室井', '割烹 室井'],
  'Kyobashi Tempura Fukamachi': ['京橋 天ぷら 深町', '京桥 天妇罗 深町'],
  Miyasaka: ['宮坂', '宫坂'],
  Mutsukari: ['六雁', '六雁'],
  'Nishiazabu Taku': ['西麻布 拓', '西麻布 拓'],
  'Nodaiwa Azabu Iikura Honten': ['野田岩 麻布飯倉本店', '野田岩 麻布饭仓本店'],
  'Nogizaka Shin': ['乃木坂 しん', '乃木坂 しん'],
  'Oryori Tsuji': ['御料理 辻', '御料理 辻'],
  'Piao-Xiang': ['飄香', '飘香'],
  Seiju: ['天ぷら 清壽', '天妇罗 清寿'],
  Seisoka: ['青草窠', '青草窠'],
  'Sharikimon Onozawa': ['車力門 おの澤', '车力门 おの泽'],
  Shigeyuki: ['茂幸', '茂幸'],
  'Shimbashi Sasada': ['新ばし 笹田', '新ばし 笹田'],
  'Shokuzen Abe': ['食善 あべ', '食善 あべ'],
  'Sumibikappo SHIROSAKA': ['炭火割烹 白坂', '炭火割烹 白坂'],
  'Sushi Hashimoto': ['鮨 はしもと', '鮨 はしもと'],
  'Sushi Ichijo': ['鮨 一條', '鮨 一条'],
  'Sushi Keita': ['鮨 桂太', '鮨 桂太'],
  'Sushi Kojima': ['鮨 こじま', '鮨 こじま'],
  'Sushi Masashi': ['鮨 将司', '鮨 将司'],
  'Sushi Matsuura': ['鮨 まつうら', '鮨 まつうら'],
  'Sushi Ryujiro': ['鮨 龍次郎', '鮨 龙次郎'],
  'Sushi Tanaka': ['鮨 たなか', '鮨 たなか'],
  Tanimoto: ['たにもと', 'たにもと'],
  'Tempura Maehira': ['天ぷら 前平', '天妇罗 前平'],
  'Tempura Miyashiro': ['天ぷら みやしろ', '天妇罗 みやしろ'],
  'Tempura Yaguchi': ['天ぷら 矢口', '天妇罗 矢口'],
  'Ten Yokota': ['天 よこた', '天 よこた'],
  'TEN-MASA': ['天雅', '天雅'],
  Tenoshima: ['てのしま', 'てのしま'],
  Ubuka: ['うぶか', 'うぶか'],
  Waketokuyama: ['分とく山', '分とく山'],
  'Yakitori Takahashi': ['焼鳥 高はし', '烧鸟 高はし'],
  'Yakumo Uezu': ['八雲 うえず', '八云 うえず'],
  'Yotsuya Minemura': ['四谷 みね村', '四谷 みね村']
};

let updated = 0;
for (const item of data) {
  const next = names[item.name];
  if (!next) continue;
  const [nameJa, nameZh] = next;
  item.nameJa = nameJa;
  item.nameZh = nameZh;
  updated += 1;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${updated} display names.`);
