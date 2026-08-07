const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const restaurantsPath = path.join(root, 'data', 'restaurants.json');
const schemaPath = path.join(root, 'data', 'schema.json');

const cuisineZh = {
  Austrian: '奥地利料理',
  Beef: '牛肉料理',
  Chinese: '中餐',
  Contemporary: '现代料理',
  Creative: '创意料理',
  'Crab Specialities': '蟹料理',
  French: '法餐',
  Innovative: '创新料理',
  Italian: '意大利料理',
  Japanese: '日本料理',
  Shojin: '精进料理',
  Spanish: '西班牙料理',
  Sushi: '寿司',
  Tempura: '天妇罗',
  Thai: '泰餐',
  'Unagi / Freshwater Eel': '鳗鱼料理',
  Yakitori: '烧鸟'
};

const additions = [
  ['mærge', 'French'],
  ['est', 'French'],
  ['MAKIYAKI GINZA ONODERA', 'French'],
  ['Seiju', 'Tempura'],
  ['Yama', 'Creative'],
  ['Higashiyama Muku', 'Japanese'],
  ['Waketokuyama', 'Japanese'],
  ["L'ARGENT", 'French'],
  ['LA TABLE de Joël Robuchon', 'French'],
  ['La Paix', 'French'],
  ['FARO', 'Italian'],
  ['Nabeno-Ism', 'French'],
  ['Tempura Miyashiro', 'Tempura'],
  ['Tempura Maehira', 'Tempura'],
  ['Sushi Tanaka', 'Sushi'],
  ['Oku', 'Sushi'],
  ['Shigeyuki', 'Japanese'],
  ['Tempura Yaguchi', 'Tempura'],
  ['Sharikimon Onozawa', 'Japanese'],
  ['BEIGE Alain Ducasse', 'French'],
  ['Towa', 'Japanese'],
  ['Nihombashi Sonoji', 'Tempura'],
  ["Tour D'argent Tokyo", 'French'],
  ['Sushi Keita', 'Sushi'],
  ['Jushu', 'Japanese'],
  ['Kyobashi Tempura Fukamachi', 'Tempura'],
  ['ESTERRE by Alain Ducasse', 'French'],
  ['au deco', 'French'],
  ['Piao-Xiang', 'Chinese'],
  ['Hiroo Ishizaka', 'Sushi'],
  ['Shokuzen Abe', 'Japanese'],
  ['Miyasaka', 'Japanese'],
  ['Sushi Hashimoto', 'Sushi'],
  ['Kabi', 'Innovative'],
  ['Koshikiryori Koki', 'Chinese'],
  ['TROIS VISAGES', 'French'],
  ['nôl', 'Contemporary'],
  ['Sushi Ichijo', 'Sushi'],
  ["l'élan", 'French'],
  ['Edomae Sushi Hanabusa', 'Sushi'],
  ['Guchokuni', 'Japanese'],
  ['Ten Yokota', 'Tempura'],
  ['Kappo Muroi', 'Japanese'],
  ['Sushi Matsuura', 'Sushi'],
  ['Sushi Kojima', 'Sushi'],
  ["L'ATELIER de Joël Robuchon", 'French'],
  ['Nogizaka Shin', 'Japanese'],
  ['Daigo', 'Shojin'],
  ['Yotsuya Minemura', 'Japanese'],
  ['Alchimiste', 'French'],
  ['Les Saisons', 'French'],
  ['Seisoka', 'Japanese'],
  ['hortensia', 'French'],
  ['Saucer', 'French'],
  ['apothéose', 'French'],
  ['Sushi Ryujiro', 'Sushi'],
  ['Sorahana', 'Japanese'],
  ['Sushi Masashi', 'Sushi'],
  ['Ren Mishina', 'Japanese'],
  ['FUSHIKINO', 'Japanese'],
  ['Shimbashi Sasada', 'Japanese'],
  ['itsuka', 'Chinese'],
  ['Sincère', 'French'],
  ['CRAFTALE', 'French'],
  ['abysse', 'French'],
  ['Édition Koji Shimomura', 'French'],
  ['PRIMO PASSO', 'Italian'],
  ['Yakitori Takahashi', 'Yakitori'],
  ['MONOLITH', 'French'],
  ['TOKi', 'Contemporary'],
  ['Torakuro', 'Japanese'],
  ['Sanosushi', 'Sushi'],
  ['hakunei', 'Contemporary'],
  ['le sputnik', 'French'],
  ['BOTTEGA', 'Italian'],
  ['Nodaiwa Azabu Iikura Honten', 'Unagi / Freshwater Eel'],
  ['Nishiazabu Taku', 'Sushi'],
  ['Tenoshima', 'Japanese'],
  ['TEN-MASA', 'Japanese'],
  ['LATURE', 'French'],
  ['JO', 'Beef'],
  ['Dominique Bouchet Tokyo', 'French'],
  ['Tanimoto', 'Japanese'],
  ['ShinoiS', 'Chinese'],
  ['Sushidokoro Kiraku', 'Sushi'],
  ["L'AFFINAGE", 'French'],
  ['CYCLE by Mauro Colagreco', 'French'],
  ['Mētis Roppongi', 'French'],
  ['ZURRIOLA', 'Spanish'],
  ['Jizozushi', 'Sushi'],
  ['Akasaka Kikunoi', 'Japanese'],
  ["L'ÉTERRE", 'French'],
  ['Ginza Kitagawa', 'Japanese'],
  ['PRUNIER', 'French'],
  ['amarantos', 'French'],
  ['Azabujuban Fukuda', 'Japanese'],
  ['Edomae Shinsaku', 'Sushi'],
  ['Yakumo Uezu', 'Japanese'],
  ['Ginza Kousui', 'Japanese'],
  ['Héritage by Kei Kobayashi', 'French'],
  ['Ippei Hanten', 'Chinese'],
  ['NéMo', 'French'],
  ['Oniku Karyu', 'Beef'],
  ['Oryori Tsuji', 'Japanese'],
  ['Series', 'Chinese'],
  ['Sumibikappo SHIROSAKA', 'Japanese'],
  ['Il Ristorante - Niko Romito', 'Italian'],
  ['Mutsukari', 'Japanese'],
  ['Ubuka', 'Crab Specialities'],
  ['Gucci Osteria da Massimo Bottura Tokyo', 'Italian']
];

function slugify(name) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/joël/g, 'joel')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function blankRecord(name, cuisine) {
  const zh = cuisineZh[cuisine] || cuisine;
  return {
    id: slugify(name),
    city: 'Tokyo',
    country: 'Japan',
    name,
    nameEn: name,
    nameJa: '',
    nameZh: name,
    stars: 1,
    cuisine,
    cuisineZh: zh,
    area: 'Tokyo',
    areaZh: '东京',
    address: '',
    phone: '',
    website: '',
    difficulty: 0,
    booking: '预约方式与放位规则待官网核验。',
    plate: '纪念日服务待官网或预约页核验。',
    lunch: [],
    dinner: [],
    pairings: [],
    url: '',
    dataStatus: 'michelin_starred_basic',
    dressCode: { level: '待核验', required: null, notes: [], verified: false },
    childPolicy: {
      diningRoomAllowed: null,
      privateRoomAllowed: null,
      minimumAge: null,
      babyAllowed: null,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: null,
      notes: '待官网或预约页核验',
      verified: false
    },
    anniversary: {
      messagePlate: null,
      free: null,
      languages: [],
      characterLimit: null,
      wholeCake: null,
      cakePrice: null,
      flowers: null,
      proposalSupport: null,
      notes: '待官网或预约页核验',
      verified: false
    },
    reservation: {
      difficulty: 0,
      difficultyLabel: '待评估',
      bookingRule: '待官网核验',
      releaseTime: null,
      releaseWindow: null,
      platforms: [],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: null,
      overseasBooking: null,
      verified: false
    },
    budget: {
      lunchFrom: null,
      dinnerFrom: null,
      serviceCharge: null,
      estimatedLunchAllIn: null,
      estimatedDinnerAllIn: null,
      verified: false
    },
    experience: {
      counter: null,
      table: null,
      privateRoom: null,
      view: null,
      solo: null,
      date: null,
      business: null,
      family: null,
      proposal: null
    },
    policies: {
      photo: null,
      perfume: null,
      cancellation: null,
      languageSupport: [],
      paymentMethods: []
    },
    links: {
      official: '',
      reservation: '',
      googleMaps: '',
      michelin: '',
      tabelog: '',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-01',
      lastUpdated: '2026-08-01',
      source: 'MICHELIN Guide Tokyo 2026 official restaurant index',
      changeSummary: '星级餐厅基础资料批量补充；详情字段待逐店核验',
      autoCheckEnabled: false
    }
  };
}

const data = JSON.parse(fs.readFileSync(restaurantsPath, 'utf8'));
const seen = new Set(data.map((item) => item.id));

let inserted = 0;
for (const [name, cuisine] of additions) {
  const record = blankRecord(name, cuisine);
  if (seen.has(record.id)) continue;
  data.push(record);
  seen.add(record.id);
  inserted += 1;
}

const order = { 3: 0, 2: 1, 1: 2 };
data.sort((a, b) => (order[a.stars] - order[b.stars]) || a.name.localeCompare(b.name));
fs.writeFileSync(restaurantsPath, `${JSON.stringify(data, null, 2)}\n`);

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
schema.version = '4.2-starred-batch';
schema.recordCount = data.length;
schema.breakdown = {
  threeStar: data.filter((item) => item.stars === 3).length,
  twoStar: data.filter((item) => item.stars === 2).length,
  oneStar: data.filter((item) => item.stars === 1).length
};
schema.dataScope = '东京 Michelin Guide 2026 星级餐厅基础资料扩充中；详情字段仅在逐店核验后填写。';
fs.writeFileSync(schemaPath, `${JSON.stringify(schema, null, 2)}\n`);

console.log(`Inserted ${inserted} restaurants. Total: ${data.length}`);
console.log(schema.breakdown);
