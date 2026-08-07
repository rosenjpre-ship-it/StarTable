const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  craftale: {
    links: {
      official: 'https://craftale-nakameguro.jp/',
      reservation: 'https://www.tablecheck.com/en/shops/craftale/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1317/A131701/13195820/'
    },
    ratings: { tabelogScore: '3.87', tabelogUrl: 'https://tabelog.com/tokyo/A1317/A131701/13195820/' },
    lunch: [
      course('Lunch Course', '¥11,000', ['季节性法餐 course', '以日本食材和手工面包 pairing 为特色', '内容随季节调整'], '公开预约页菜单；含税，服务费另计。')
    ],
    dinner: [
      course('Dinner Course', '¥22,000', ['季节性法餐 tasting course', '以日本食材和手工面包 pairing 为特色', '内容随季节调整'], '公开预约页菜单；含税，服务费另计。')
    ],
    budget: { lunchFrom: '11000', dinnerFrom: '22000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '中学生以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；人数较多或特殊需求需提前联系。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  est: {
    links: {
      official: 'https://www.est-tokyo.com/',
      reservation: 'https://www.fourseasons.com/otemachi/dining/restaurants/est/',
      tabelog: 'https://tabelog.com/tokyo/A1302/A130201/13243590/'
    },
    ratings: { tabelogScore: '3.82', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130201/13243590/' },
    lunch: [
      course('Seasonal Course', '¥18,000 起', ['现代法餐 course', '大量使用日本产食材', '内容按季节调整'], 'Four Seasons 官网菜单/预约页价格区间。')
    ],
    dinner: [
      course('Seasonal Course', '¥28,000 起', ['现代法餐 tasting course', '日本食材与法餐技法', '内容按季节调整'], 'Four Seasons 官网菜单/预约页价格区间。')
    ],
    budget: { lunchFrom: '18000', dinnerFrom: '28000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、背心、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '13岁以上可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Four Seasons 官方页面可预约；热门日期建议提前。', platforms: ['official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Four Seasons official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  'esterre-by-alain-ducasse': {
    links: {
      official: 'https://www.palacehoteltokyo.com/restaurant/esterre/',
      reservation: 'https://www.palacehoteltokyo.com/restaurant/esterre/',
      tabelog: 'https://tabelog.com/tokyo/A1302/A130201/13244637/'
    },
    ratings: { tabelogScore: '3.76', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130201/13244637/' },
    lunch: [
      course('Lunch Course', '¥16,500 起', ['Alain Ducasse 风格现代法餐', '以日本食材与自然派风格为核心', '内容按季节调整'], '官方/预约页公开价格区间；另收服务费。')
    ],
    dinner: [
      course('Dinner Course', '¥33,000 起', ['现代法餐 tasting course', '内容按季节和食材调整'], '官方/预约页公开价格区间；另收服务费。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '33000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性建议穿夹克或有领衬衫。', '请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '10岁以上可入店；更小年龄建议咨询酒店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Palace Hotel 官方页面可预约。', platforms: ['official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Palace Hotel official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  faro: {
    links: {
      official: 'https://faro.shiseido.co.jp/en/',
      reservation: 'https://faro.shiseido.co.jp/en/reservation/',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13014915/'
    },
    ratings: { tabelogScore: '3.91', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13014915/' },
    lunch: [
      course('Lunch Course', '¥14,000 起', ['意大利料理 course', '含植物性菜单选择', '内容随季节调整'], '官网/预约页公开菜单区间。')
    ],
    dinner: [
      course('Dinner Course', '¥24,000 起', ['意大利料理 tasting course', '含植物性菜单选择', '内容随季节调整'], '官网/预约页公开菜单区间。')
    ],
    budget: { lunchFrom: '14000', dinnerFrom: '24000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上可入店；需可享用成人 course。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '官网预约；特殊 dietary request 需提前说明。', platforms: ['official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  'gucci-osteria-da-massimo-bottura-tokyo': {
    links: {
      official: 'https://www.gucciosteria.com/en/tokyo',
      reservation: 'https://www.gucciosteria.com/en/tokyo',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13268667/'
    },
    ratings: { tabelogScore: '3.82', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13268667/' },
    lunch: [
      course('Lunch Tasting Menu', '¥18,000 起', ['现代意大利料理 tasting menu', '结合 Gucci Osteria 全球风格与日本食材', '内容随季节调整'], '官方/预约页价格区间。')
    ],
    dinner: [
      course('Dinner Tasting Menu', '¥28,000 起', ['现代意大利料理 tasting menu', '内容随季节调整'], '官方/预约页价格区间。')
    ],
    budget: { lunchFrom: '18000', dinnerFrom: '28000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、沙滩凉鞋等过度休闲服装。'], verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网预约；热门日期建议提前。', platforms: ['official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course与着装', autoCheckEnabled: false }
  },
  'l-atelier-de-joel-robuchon': {
    links: {
      official: 'https://www.robuchon.jp/en/shop-list/latelier',
      reservation: 'https://www.robuchon.jp/en/shop-list/latelier',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130701/13005309/'
    },
    ratings: { tabelogScore: '3.85', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13005309/' },
    lunch: [
      course('MENU A', '¥7,500 起', ['午餐 prix fixe', '前菜/主菜/甜品组合', 'Robuchon atelier 风格法餐'], '官方菜单价格区间；另收服务费。'),
      course('MENU B', '¥12,000 起', ['午餐完整 course', '多皿构成'], '官方菜单价格区间；另收服务费。')
    ],
    dinner: [
      course('Dinner Course', '¥18,000 起', ['晚餐 tasting course', '开放式厨房 counter 风格', '内容随季节调整'], '官方菜单价格区间；另收服务费。')
    ],
    budget: { lunchFrom: '7500', dinnerFrom: '18000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、运动服、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: null, notes: '儿童可入店；建议预约时确认座位和儿童菜单。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '官网/电话预约；可选 counter 或 table。', platforms: ['official', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  'les-saisons': {
    links: {
      official: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/les-saisons',
      reservation: 'https://www.imperialhotel.co.jp/en/tokyo/restaurant/les-saisons',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130102/13000139/'
    },
    ratings: { tabelogScore: '3.78', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130102/13000139/' },
    lunch: [
      course('Lunch Course', '¥18,000 起', ['帝国酒店法餐 lunch course', '内容随季节调整'], '官网菜单/预约页价格区间；另收服务费。')
    ],
    dinner: [
      course('Dinner Course', '¥36,000 起', ['帝国酒店法餐 dinner course', '内容随季节调整'], '官网菜单/预约页价格区间；另收服务费。')
    ],
    budget: { lunchFrom: '18000', dinnerFrom: '36000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性建议夹克。', '请避免短裤、凉鞋等轻装。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '主餐厅建议 10 岁以上；儿童同行建议预约时确认。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '帝国酒店官网可预约；特殊要求可电话咨询。', platforms: ['official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Imperial Hotel official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  lature: {
    links: {
      official: 'https://www.lature.jp/',
      reservation: 'https://www.tablecheck.com/en/shops/lature/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13196420/'
    },
    ratings: { tabelogScore: '3.85', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130602/13196420/' },
    lunch: [
      course('Lunch Course', '¥12,000 起', ['以野味和自然食材为主题的法餐 course', '内容随季节调整'], '官网/预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥22,000 起', ['野味和时令食材 tasting course', '内容随季节调整'], '官网/预约页价格区间。')
    ],
    budget: { lunchFrom: '12000', dinnerFrom: '22000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 10, notes: '10岁以上，且可享用成人 course 者可入店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；野味/过敏信息需提前说明。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') item.links = { ...(item.links || {}), ...value };
    else if (key === 'ratings') item.ratings = { ...(item.ratings || {}), ...value };
    else if (key === 'budget') item.budget = { ...(item.budget || {}), ...value };
    else if (key === 'reservation') item.reservation = { ...(item.reservation || {}), ...value };
    else if (key === 'sync') item.sync = { ...(item.sync || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
