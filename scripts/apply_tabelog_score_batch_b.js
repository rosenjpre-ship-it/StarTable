const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  'l-elan': {
    ratings: { tabelogScore: '3.87', tabelogUrl: 'https://tabelog.com/en/tokyo/A1306/A130601/13243117/' },
    links: { tabelog: 'https://tabelog.com/en/tokyo/A1306/A130601/13243117/' }
  },
  'la-gloire': {
    ratings: { tabelogScore: '3.58', tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130801/13304624/' },
    links: { tabelog: 'https://tabelog.com/tokyo/A1308/A130801/13304624/' },
    lunch: [
      course('4品ランチコース', '¥6,820', ['4 品', '季节味觉短 course'], 'Tabelog 公开 course。'),
      course('Lunch Course', '¥9,900', ['日式元素融合的现代法餐 course'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('Dinner Course', '¥22,000', ['日式元素融合的晚餐 course', '现代法餐与葡萄酒 pairing 取向'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '6820', dinnerFrom: '22000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议 smart casual。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '中学生以上，且需享用成人相同菜单；无儿童菜单。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog/电话可预约；前日和当日预约仅电话。', platforms: ['Tabelog', 'phone'], verified: true }
  },
  'le-sputnik': {
    ratings: { tabelogScore: '3.79', tabelogUrl: 'https://tabelog.com/tw/tokyo/A1307/A130701/13184105/dtlrvwlst/' },
    links: { tabelog: 'https://tabelog.com/tw/tokyo/A1307/A130701/13184105/dtlrvwlst/' }
  },
  'makiyaki-ginza-onodera': {
    ratings: { tabelogScore: '3.71', tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130101/13235042/' },
    links: { tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13235042/' },
    lunch: [
      course('[Lunch] Makiyaki 和牛西冷 Course', '¥16,500', ['以晚餐料理为基础', '主菜为和牛西冷薪火烤制'], 'Tabelog 公开 course；午餐/晚餐均另收10%服务费。'),
      course('[Lunch] Makiyaki 黑毛和牛菲力 Course', '¥23,100', ['以晚餐料理为基础', '主菜为黑毛和牛菲力薪火烤制'], 'Tabelog 公开 course；午餐/晚餐均另收10%服务费。')
    ],
    dinner: [
      course('[Dinner] Makiyaki 奢华 Course', '¥55,000', ['6-7 品', '鱼子酱、鲍鱼、龙虾等高级食材', '薪烧和牛菲力'], 'Tabelog 公开 course；另收10%服务费。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '55000', serviceCharge: '10%', verified: true }
  },
  'metis-roppongi': {
    ratings: { tabelogScore: '3.97', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130702/13280829/dtlmenu/' },
    links: { tabelog: 'https://tabelog.com/en/tokyo/A1307/A130702/13280829/dtlmenu/' }
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
    else item[key] = value;
  }
  item.sync = { ...(item.sync || {}), lastChecked: today, lastUpdated: today, changeSummary: `${item.sync?.changeSummary || '更新'}；补充Tabelog评分/课程细节` };
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
