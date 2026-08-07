const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
  ryugin: {
    lunch: [],
    dinner: [
      {
        name: '日本の豊かさを皿の上に',
        price: '¥77,000',
        note: '晚餐季节性日本料理 course。内容随当日入荷调整，官方示例包括前菜、椀物、刺身、炭火烤鱼、炊合、肉料理、米饭、甜点与薄茶。含税，另收服务费。'
      }
    ],
    budget: { lunchFrom: null, dinnerFrom: 77000, serviceCharge: '桌席10%；半包厢/包厢15%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '每月1日中午开放之后约3个月内预约。例如4月1日中午开始接受至6月底预约；5月1日中午开始接受至7月底预约。电话预约时间12:00-17:00；当日有空位时可至19:00电话咨询。',
      releaseTime: '每月1日 12:00',
      releaseWindow: '约3个月内',
      platforms: ['official'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: 90,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    ratings: {
      tabelogScore: 4.13,
      tabelogUrl: 'https://tabelog.com/cn/tokyo/A1301/A130102/13001457/',
      googleMapsScore: null,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nihonryori%20RyuGin%20Tokyo',
      lastChecked: '2026-08-01'
    },
    links: {
      official: 'https://www.nihonryori-ryugin.com/',
      reservation: 'https://www.nihonryori-ryugin.com/en/about/',
      googleMaps: 'https://www.google.com/maps/search/?api=1&query=Nihonryori%20RyuGin%20Tokyo',
      michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/nihonryori-ryugin',
      tabelog: 'https://tabelog.com/cn/tokyo/A1301/A130102/13001457/',
      instagram: ''
    },
    source: 'RyuGin official menu/about pages; Tabelog page'
  },
  sezanne: {
    lunch: [
      { name: 'MENU SÉZANNE', price: '¥56,925', note: '午餐/晚餐均可预约的季节性法餐 tasting menu。菜单随季节、食材与偏好调整。' },
      { name: 'MENU DU JOUR', price: '¥27,830', note: '周三至周六午餐限定；2026年5月1日起提供。' }
    ],
    dinner: [
      { name: 'MENU SÉZANNE', price: '¥56,925', note: '晚餐季节性法餐 tasting menu。菜单会随当季日本食材与供应情况变化。' }
    ],
    budget: { lunchFrom: 27830, dinnerFrom: 56925, serviceCharge: null, estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '官网预约。午餐周三至周六，晚餐周三至周日；官网提示部分饮食限制无法对应。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['official'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    ratings: {
      tabelogScore: null,
      tabelogUrl: 'https://tabelog.com/tokyo/rstLst/?SrtT=rt&sk=S%C3%89ZANNE',
      googleMapsScore: null,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=SEZANNE%20Tokyo',
      lastChecked: '2026-08-01'
    },
    links: {
      official: 'https://www.sezanne.tokyo/',
      reservation: 'https://www.sezanne.tokyo/',
      googleMaps: 'https://www.google.com/maps/search/?api=1&query=SEZANNE%20Tokyo',
      michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/sezanne',
      tabelog: 'https://tabelog.com/tokyo/rstLst/?SrtT=rt&sk=S%C3%89ZANNE',
      instagram: ''
    },
    source: 'SÉZANNE official menu/basic information pages'
  },
  leffervescence: {
    lunch: [
      { name: 'Omakase course', price: '¥45,000', note: '午餐统一 omakase course；Tabelog 店铺信息标注午餐/晚餐为45,000日元，另计税与服务费。' }
    ],
    dinner: [
      { name: 'Omakase course', price: '¥45,000', note: '晚餐统一 omakase course；主打时令食材与“Artisanal Vegetables”等代表性料理。另计税与服务费。' }
    ],
    budget: { lunchFrom: 45000, dinnerFrom: 45000, serviceCharge: '15%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '官网预约；餐厅会在预约日前约1周通过电话或邮件再次确认，若预约日前3天仍无法确认，餐厅可能取消预约。2-4人预约前日~3日前取消收50%，当日/未到收100%。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['official'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    ratings: {
      tabelogScore: 4.47,
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1306/A130602/13116356/',
      googleMapsScore: null,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=L%27Effervescence%20Tokyo',
      lastChecked: '2026-08-01'
    },
    links: {
      official: 'https://www.leffervescence.jp/',
      reservation: 'https://www.leffervescence.jp/en/address.html',
      googleMaps: 'https://www.google.com/maps/search/?api=1&query=L%27Effervescence%20Tokyo',
      michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/l-effervescence',
      tabelog: 'https://tabelog.com/en/tokyo/A1306/A130602/13116356/',
      instagram: ''
    },
    source: "L'Effervescence official address/reservation page; Tabelog page"
  },
  losier: {
    lunch: [
      { name: 'MENU DÉJEUNER', price: '¥20,000', note: '午餐 course。官方菜单示例含开胃小点、贝类组合、鸟取夏鹿、预甜点、甜品车与咖啡。含税，另收15%服务费。' },
      { name: 'MENU LES BELLES GOURMANDES', price: '¥25,000', note: '午餐 course。官方菜单示例含牡丹虾/白虾、鱼料理、青森银鸭、红莓甜品、甜品车与咖啡。含税，另收15%服务费。' },
      { name: 'LUNCH A WINK TO SUMMER 2026', price: '¥50,000', note: '夏季特别午餐菜单，需整桌同点。含时令玉米、千叶天然黑鲍、蓝龙虾、熊本赤牛等。含税，另收15%服务费。' }
    ],
    dinner: [],
    budget: { lunchFrom: 20000, dinnerFrom: null, serviceCharge: '15%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '困难',
      bookingRule: '官网或电话预约。取消政策：到店48小时前起取消会收取取消费；full-course 预约按所订 course 金额人数计，席位预约按该时段最低价菜单人数计。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['official', 'phone'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    ratings: {
      tabelogScore: 4.4,
      tabelogUrl: 'https://tabelog.com/tw/tokyo/A1301/A130101/13002607/',
      googleMapsScore: null,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=L%27OSIER%20Tokyo',
      lastChecked: '2026-08-01'
    },
    links: {
      official: 'https://losier.shiseido.co.jp/e/',
      reservation: 'https://losier.shiseido.co.jp/e/',
      googleMaps: 'https://www.google.com/maps/search/?api=1&query=L%27OSIER%20Tokyo',
      michelin: '',
      tabelog: 'https://tabelog.com/tw/tokyo/A1301/A130101/13002607/',
      instagram: ''
    },
    source: "L'OSIER official access/lunch pages; Tabelog page"
  },
  'joel-robuchon': {
    lunch: [
      { name: 'MENU PRIX FIXE', price: '¥28,000', note: '午餐限定 prix fixe 低价菜单。季节性内容会调整，价格含税，另收12%服务费。' },
      { name: 'MENU PRIX FIXE', price: '¥33,000 / ¥38,000', note: '可选式 prix fixe 菜单。季节性内容会调整，价格含税，另收12%服务费。' },
      { name: 'MENU DÉGUSTATION', price: '¥58,000', note: '推荐整桌同点的 degustation tasting menu；数量有限。价格含税，另收12%服务费。' },
      { name: 'MENU VÉGÉTARIEN', price: '¥38,000', note: '素食 tasting menu，需3天前预约；非 vegan。价格含税，另收12%服务费。' }
    ],
    dinner: [
      { name: 'MENU PRIX FIXE', price: '¥33,000 / ¥38,000', note: '晚餐 prix fixe 菜单。季节性内容会调整，价格含税，另收12%服务费。' },
      { name: 'MENU DÉGUSTATION', price: '¥58,000', note: '推荐整桌同点的 degustation tasting menu；数量有限。价格含税，另收12%服务费。' },
      { name: 'MENU VÉGÉTARIEN', price: '¥38,000', note: '素食 tasting menu，需3天前预约；非 vegan。价格含税，另收12%服务费。' }
    ],
    budget: { lunchFrom: 28000, dinnerFrom: 33000, serviceCharge: '12%', estimatedLunchAllIn: null, estimatedDinnerAllIn: null, verified: true },
    reservation: {
      difficulty: 4,
      difficultyLabel: '困难',
      bookingRule: '官网预约。5人以上需电话联系餐厅安排。取消费：7-4日前60%，3日前80%，当日100%。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['official', 'phone'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    ratings: {
      tabelogScore: null,
      tabelogUrl: 'https://tabelog.com/tokyo/rstLst/?SrtT=rt&sk=Jo%C3%ABl%20Robuchon',
      googleMapsScore: null,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Joel%20Robuchon%20Tokyo%20Ebisu',
      lastChecked: '2026-08-01'
    },
    links: {
      official: 'https://www.robuchon.jp/en/shop-list/joelrobuchon',
      reservation: 'https://www.robuchon.jp/en/shop-list/joelrobuchon',
      googleMaps: 'https://www.google.com/maps/search/?api=1&query=Joel%20Robuchon%20Tokyo%20Ebisu',
      michelin: 'https://guide.michelin.com/en/tokyo-region/tokyo/restaurant/joel-robuchon-1193981',
      tabelog: 'https://tabelog.com/tokyo/rstLst/?SrtT=rt&sk=Jo%C3%ABl%20Robuchon',
      instagram: ''
    },
    source: 'Joël Robuchon official shop page'
  }
};

let count = 0;
for (const item of data) {
  const update = updates[item.id];
  if (!update) continue;
  Object.assign(item, {
    lunch: update.lunch ?? item.lunch,
    dinner: update.dinner ?? item.dinner,
    budget: update.budget ?? item.budget,
    reservation: update.reservation ?? item.reservation,
    ratings: update.ratings ?? item.ratings,
    links: { ...(item.links || {}), ...(update.links || {}) },
    sync: {
      ...(item.sync || {}),
      lastChecked: '2026-08-01',
      lastUpdated: '2026-08-01',
      source: update.source,
      changeSummary: '地址电话、预约规则、course、评分链接批量核验',
      autoCheckEnabled: false
    }
  });
  count += 1;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${count} restaurants.`);
