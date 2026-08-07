const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const ranges = [
  ['under-10000', 0, 10000],
  ['10000-20000', 10000, 20000],
  ['20000-30000', 20000, 30000],
  ['30000-40000', 30000, 40000],
  ['40000-50000', 40000, 50000],
  ['50000-plus', 50000, Infinity]
];

function parsePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return null;
  const text = String(value)
    .replace(/[０-９]/g, d => '０１２３４５６７８９'.indexOf(d))
    .replace(/[,，]/g, '');
  const match = text.match(/(\d+)\s*(万)?/);
  if (!match) return null;
  const amount = Number(match[1]) * (match[2] ? 10000 : 1);
  return Number.isFinite(amount) ? amount : null;
}

function priceTiers(item, meal) {
  const values = [];
  const courses = item[meal] || [];
  const budgetKey = meal === 'lunch' ? 'lunchFrom' : 'dinnerFrom';
  const budget = parsePrice(item.budget?.[budgetKey]);
  if (budget != null) values.push(budget);
  for (const course of courses) {
    const price = parsePrice(course.price);
    if (price != null) values.push(price);
  }
  return [...new Set(values.flatMap(price => ranges
    .filter(([, min, max]) => price >= min && price < max)
    .map(([key]) => key)))];
}

function childCategory(p) {
  if (!p || p.verified === false || p.verified == null) return 'pending';
  if (p.publicInfoStatus === 'not explicitly published') return 'pending';
  if (p.privateRoomAllowed === true && p.diningRoomAllowed !== true) return 'private';
  if (p.diningRoomAllowed === false && p.privateRoomAllowed === false) return 'no';
  if (p.diningRoomAllowed === true || p.minimumAge != null) return 'yes';
  const note = p.notes || '';
  if (/仅可使用包厢|仅限包间|仅包厢/.test(note)) return 'private';
  if (/不可|不接待|18岁以上/.test(note)) return 'no';
  if (/儿童可|可入店|可预约|可申请|欢迎|可享用/.test(note)) return 'yes';
  return 'pending';
}

function dressCategory(d) {
  if (!d || d.verified === false || d.verified == null) return 'pending';
  if (d.publicInfoStatus === 'not explicitly published' || d.required == null) return 'pending';
  return d.required ? 'required' : 'none';
}

for (const item of data) {
  const lunchPriceTiers = priceTiers(item, 'lunch');
  const dinnerPriceTiers = priceTiers(item, 'dinner');
  item.filters = {
    lunchAvailable: !!(item.lunch && item.lunch.length),
    dinnerAvailable: !!(item.dinner && item.dinner.length),
    priceTiers: [...new Set([...lunchPriceTiers, ...dinnerPriceTiers])],
    lunchPriceTiers,
    dinnerPriceTiers,
    dressCategory: dressCategory(item.dressCode),
    childCategory: childCategory(item.childPolicy)
  };
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
