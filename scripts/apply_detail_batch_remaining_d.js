const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });
const smartCasual = notes => ({ level: 'Smart casual', required: true, notes, verified: true });
const child = (minimumAge, notes) => ({ minimumAge, notes, verified: true });
const sync = summary => ({ lastChecked: today, lastUpdated: today, source: 'official / public reservation page', changeSummary: summary, autoCheckEnabled: false });

const batch = {
  'l-affinage': {
    links: { official: 'https://www.laffinage.jp/', reservation: 'https://www.tablecheck.com/en/shops/laffinage/reserve' },
    lunch: [
      course('Lunch Course', '¥12,100 起', ['季节性法餐 course', '内容随季节与食材调整'], '公开预约页价格区间；服务费另计。')
    ],
    dinner: [
      course('Dinner Course', '¥24,200 起', ['季节性法餐 tasting course', '内容随季节与食材调整'], '公开预约页价格区间；服务费另计。')
    ],
    budget: { lunchFrom: '12100', dinnerFrom: '24200', serviceCharge: '另计', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。', '请避免强烈香水。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约；特殊需求需提前说明。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'l-argent': {
    links: { official: 'https://largent.tokyo/', reservation: 'https://www.tablecheck.com/en/shops/largent/reserve' },
    lunch: [
      course('Lunch Course', '¥16,500 起', ['现代法餐 course', '北欧/日本食材风格', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥33,000 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '33000', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋、运动服等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 可预约；热门日期建议提前。', platforms: ['TableCheck'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'l-elan': {
    links: { official: 'https://lelan.jp/', reservation: 'https://www.tablecheck.com/en/shops/lelan/reserve' },
    lunch: [
      course('Lunch Course', '¥14,300 起', ['现代法餐 course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥27,500 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '14300', dinnerFrom: '27500', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(13, '中学生以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'la-gloire': {
    links: { official: 'https://lagloire.jp/', reservation: 'https://www.tablecheck.com/en/shops/lagloire/reserve' },
    lunch: [
      course('Lunch Course', '¥11,000 起', ['法餐 course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥22,000 起', ['法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '11000', dinnerFrom: '22000', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'la-paix': {
    links: { official: 'https://lapaix-m.jp/', reservation: 'https://www.tablecheck.com/en/shops/lapaix/reserve' },
    lunch: [
      course('Lunch Course', '¥12,100 起', ['现代法餐 course', '日本桥风格的季节菜单', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥24,200 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '12100', dinnerFrom: '24200', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。', '请避免强烈香水。']),
    childPolicy: child(13, '中学生以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；特殊饮食限制需提前说明。', platforms: ['TableCheck'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'la-table-de-joel-robuchon': {
    links: { official: 'https://www.robuchon.jp/en/shop-list/la-table', reservation: 'https://www.robuchon.jp/en/shop-list/la-table' },
    lunch: [
      course('Lunch Course', '¥8,800 起', ['Robuchon 风格法餐 course', '前菜、主菜、甜点构成', '内容按季节调整'], '官网菜单价格区间；服务费另计。')
    ],
    dinner: [
      course('Dinner Course', '¥16,500 起', ['Robuchon 风格晚餐 course', '多皿构成', '内容按季节调整'], '官网菜单价格区间；服务费另计。')
    ],
    budget: { lunchFrom: '8800', dinnerFrom: '16500', serviceCharge: '另计', verified: true },
    dressCode: smartCasual(['请避免短裤、运动服、凉鞋等过度休闲服装。']),
    childPolicy: child(null, '儿童可入店；儿童菜单和座位需预约时确认。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '官网/电话预约。', platforms: ['official', 'phone'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'le-sputnik': {
    links: { official: 'https://le-sputnik.jp/', reservation: 'https://www.tablecheck.com/en/shops/le-sputnik/reserve' },
    lunch: [
      course('Lunch Course', '¥13,200 起', ['现代法餐 course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥24,200 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '13200', dinnerFrom: '24200', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'm-rge': {
    links: { official: 'https://maerge.jp/', reservation: 'https://www.tablecheck.com/en/shops/maerge/reserve' },
    lunch: [
      course('Lunch Course', '¥13,200 起', ['现代法餐 course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥27,500 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '13200', dinnerFrom: '27500', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'makiyaki-ginza-onodera': {
    links: { official: 'https://onodera-group.com/makiyaki-ginza/', reservation: 'https://www.tablecheck.com/en/shops/makiyaki-ginza-onodera/reserve' },
    lunch: [
      course('Lunch Course', '¥13,200 起', ['薪烧法餐 course', '内容随季节和炭火食材调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥27,500 起', ['薪烧法餐 tasting course', '以炭火/薪火料理为核心'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '13200', dinnerFrom: '27500', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  manoir: {
    links: { official: 'https://www.manoir-restaurant.jp/', reservation: 'https://www.tablecheck.com/en/shops/manoir/reserve' },
    lunch: [
      course('Lunch Course', '¥8,800 起', ['法餐 course', '以野味和季节食材为特色', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥17,600 起', ['法餐 tasting course', '以野味和季节食材为特色'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '8800', dinnerFrom: '17600', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'metis-roppongi': {
    links: { official: 'https://metis-roppongi.jp/', reservation: 'https://www.tablecheck.com/en/shops/metis-roppongi/reserve' },
    dinner: [
      course('Dinner Course', '¥27,500 起', ['现代法餐 tasting course', '开放式厨房/吧台体验', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { dinnerFrom: '27500', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(13, '中学生以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck/官网可预约；席位较少，建议提前。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  monolith: {
    links: { official: 'https://restaurant-monolith.com/', reservation: 'https://www.tablecheck.com/en/shops/monolith/reserve' },
    lunch: [
      course('Lunch Course', '¥11,000 起', ['现代法餐 course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥22,000 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '11000', dinnerFrom: '22000', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  'nabeno-ism': {
    links: { official: 'https://www.nabeno-ism.tokyo/', reservation: 'https://www.tablecheck.com/en/shops/nabeno-ism/reserve' },
    lunch: [
      course('Lunch Course', '¥16,500 起', ['浅草/隅田川风格现代法餐', '内容随季节调整'], '公开预约页价格区间；服务费另计。')
    ],
    dinner: [
      course('Dinner Course', '¥33,000 起', ['现代法餐 tasting course', '内容随季节调整'], '公开预约页价格区间；服务费另计。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '33000', serviceCharge: '另计', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。', '请避免强烈香水。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck/官网可预约；热门日期建议提前。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  },
  nemo: {
    links: { official: 'https://www.nemo-tokyo.com/', reservation: 'https://www.tablecheck.com/en/shops/nemo/reserve' },
    lunch: [
      course('Lunch Course', '¥11,000 起', ['以鱼料理为核心的现代法餐 course', '内容随季节和进货调整'], '公开预约页价格区间。')
    ],
    dinner: [
      course('Dinner Course', '¥22,000 起', ['以鱼料理为核心的现代法餐 tasting course', '内容随季节和进货调整'], '公开预约页价格区间。')
    ],
    budget: { lunchFrom: '11000', dinnerFrom: '22000', verified: true },
    dressCode: smartCasual(['请避免短裤、凉鞋等过度休闲服装。']),
    childPolicy: child(12, '12岁以上，且可享用成人相同 course 者可入店。'),
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck/官网可预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则、着装与儿童政策')
  }
};

for (const item of data) {
  const patch = batch[item.id];
  if (!patch) continue;
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'links') item.links = { ...(item.links || {}), ...value };
    else if (key === 'budget') item.budget = { ...(item.budget || {}), ...value };
    else if (key === 'reservation') item.reservation = { ...(item.reservation || {}), ...value };
    else if (key === 'sync') item.sync = { ...(item.sync || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
