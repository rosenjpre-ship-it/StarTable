const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });
const sync = summary => ({ lastChecked: today, lastUpdated: today, source: 'official / Tabelog / OMAKASE / TABLEALL', changeSummary: summary, autoCheckEnabled: false });

const batch = {
  'nishiazabu-sushi-shin': {
    links: {
      official: 'https://www.sushishin-tokyo.jp/reservations/',
      reservation: 'https://omakase.in/en/r/wl401300'
    },
    lunch: [
      course('[Lunch] Nigiri Only Course', '¥18,150', ['午餐握寿司 course', '约 2 小时'], 'OMAKASE 公开价格。'),
      course('[Lunch] Chef’s Tasting Course', '¥26,400', ['午餐主厨 tasting course', '约 2 小时'], 'OMAKASE 公开价格；周日可选。')
    ],
    dinner: [
      course('[Dinner] Chef’s Tasting Course', '¥36,300', ['晚餐主厨 tasting course', '约 2 小时'], 'OMAKASE 公开价格；市场情况可能导致价格变动，服务费另计。')
    ],
    budget: { lunchFrom: '18150', dinnerFrom: '36300', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性不可戴棒球帽、穿无袖、短裤、休闲凉鞋或人字拖。', '请避免强烈香水或古龙水。'], verified: true },
    childPolicy: { minimumAge: 16, notes: '16岁以上可入店；儿童点 course 时与成人同 course。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '午餐 12:00；晚餐 18:00 / 20:00 两部制。可电话、WhatsApp、邮件或 OMAKASE 预约。48小时内取消50%，24小时内/无到店100%。', platforms: ['OMAKASE', 'phone', 'WhatsApp', 'email'], verified: true },
    sync: sync('补充预约链接、course、着装与儿童政策')
  },
  'sushi-kanesaka': {
    links: {
      official: 'https://www.sushi-kanesaka.co.jp/',
      reservation: 'https://www.sushi-kanesaka.co.jp/',
      tabelog: 'https://tabelog.com/rst/rstdtl_party_dtl?LstAre=A130103&LstPrf=A1301&pal=tokyo&pplan_id=296118531&rcd=13005003'
    },
    ratings: { tabelogScore: '3.95', tabelogUrl: 'https://tabelog.com/rst/rstdtl_party_dtl?LstAre=A130103&LstPrf=A1301&pal=tokyo&pplan_id=296118531&rcd=13005003' },
    lunch: [
      course('葵', '¥11,000', ['お通し', '握り 10 贯', '茶碗蒸し', '椀物', '巻物'], '官网公开菜单；税后价，另收10%服务费。'),
      course('鷹の羽', '¥17,000', ['お通し', '酒肴 5 种', '握り 10 贯', '茶碗蒸し', '椀物', '甘味'], '官网公开菜单；税后价，另收10%服务费。'),
      course('おまかせ', '¥20,000 起', ['午餐 omakase', '内容和价格随天气/季节变动'], '官网公开菜单；另收10%服务费。'),
      course('[Lunch] にぎりコース', '¥36,300', ['午餐握寿司 course', '内容随进货调整'], 'Tabelog 公开 course；另收10%服务费。')
    ],
    dinner: [
      course('夜 おまかせ', '¥27,000 起', ['晚餐 omakase', '内容和价格随天气/季节变动'], '官网公开菜单；另收10%服务费。')
    ],
    budget: { lunchFrom: '11000', dinnerFrom: '27000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['请避免香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: null, notes: '本店 Tabelog 标注不接待儿童；官网另写儿童同行午餐 ¥5,000/人、晚餐 ¥10,000/人 minimum charge。预约前需确认适用规则。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '电话预约 080-3523-2098（10:00-22:00）。迟到15分钟以上需联系。', platforms: ['phone'], verified: true },
    sync: sync('补充Tabelog评分、course、预约规则、着装与儿童政策')
  },
  'tempura-ginya': {
    links: {
      official: 'https://tempura-ginya.com/en',
      reservation: 'https://tempura-ginya.com/en',
      tabelog: 'https://tabelog.com/en/tokyo/A1316/A131602/13153190/dtlrvwlst/'
    },
    ratings: { tabelogScore: '3.77', tabelogUrl: 'https://tabelog.com/en/tokyo/A1316/A131602/13153190/dtlrvwlst/' },
    dinner: [
      course('Tempura Dinner Course', '¥30,000-¥39,999 目安', ['18:30 同时开始', '江户前风格天妇罗', '内容随季节和进货调整'], 'Tabelog 预算区间；公开评论中曾有 ¥22,000 course 记录，当前请以预约页为准。')
    ],
    budget: { dinnerFrom: '30000', verified: true },
    dressCode: { level: 'Formal', required: true, notes: ['官网标注 formal dress code。', '请避免短裤、凉鞋和过量香水。'], verified: true },
    childPolicy: { minimumAge: null, notes: 'Tabelog 标注不接待儿童。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '线上预约；18:30 同时开餐。周二、周三、公众假日休。', platforms: ['official online reservation'], verified: true },
    sync: sync('补充Tabelog评分、course概要、预约规则、着装与儿童政策')
  },
  'sukiyabashi-jiro-roppongiten': {
    links: {
      tabelog: 'https://tabelog.com/tw/tokyo/A1307/A130701/13004426/'
    },
    ratings: { tabelogScore: '3.69', tabelogUrl: 'https://tabelog.com/tw/tokyo/A1307/A130701/13004426/' },
    lunch: [
      course('Nigiri Course', '¥30,000-¥49,999 目安', ['江户前寿司握寿司 course', '内容随当日鱼介调整'], 'Tabelog 预算区间与评论记录；固定 course 未公开。')
    ],
    dinner: [
      course('Nigiri Course', '¥30,000-¥49,999 目安', ['江户前寿司握寿司 course', '内容随当日鱼介调整'], 'Tabelog 预算区间与评论记录；固定 course 未公开。')
    ],
    budget: { lunchFrom: '30000', dinnerFrom: '30000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['寿司吧台建议 smart casual；请避免强烈香水。'], verified: false },
    childPolicy: { minimumAge: null, notes: '公开页面未明确儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: '公开信息显示可通过 Pocket Concierge/电话等渠道预约；热门店建议提前。', platforms: ['Pocket Concierge', 'phone'], conciergeRecommended: true, verified: false },
    sync: sync('补充Tabelog评分与course概要')
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
