const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  prisma: {
    links: {
      reservation: 'https://omakase.in/en/r/jo904865'
    },
    dinner: [
      course('Chef’s Tasting Course', '¥33,000', ['意大利料理 tasting course', '内容随市场食材变化', '席数有限'], 'OMAKASE 公开价格；另收10%服务费。')
    ],
    budget: { dinnerFrom: '33000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['推荐 smart casual。', '不可穿半裤、凉鞋。', '请避免香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: null, notes: 'OMAKASE 公开页未列儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 当前满席，可收藏店铺接收空席通知。', platforms: ['OMAKASE'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE', changeSummary: '补充预约链接、course与着装', autoCheckEnabled: false }
  },
  bottega: {
    links: {
      reservation: 'https://www.tablecheck.com/en/shops/bottega-del-29/reserve'
    },
    dinner: [
      course('Short Course', '¥9,500', ['短版 course', '约为完整 course 60-70%份量', '需统一选择 pasta 或 pizza'], 'TableCheck 公开价格；服务费另计。'),
      course('Scoperta Course', '¥12,100', ['意大利料理 course', '季节食材', '2人起'], 'TableCheck 公开价格；服务费另计。'),
      course('Speciale Course', '¥16,500', ['特别 course', '季节食材'], 'TableCheck 公开价格；服务费另计。'),
      course('Prestigio Special Course', '¥22,000', ['高级食材特别 course', '需至少7日前预约'], 'TableCheck 公开价格；服务费另计。')
    ],
    budget: { dinnerFrom: '9500', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['预约页未列严格着装；建议 smart casual。'], verified: false },
    childPolicy: { minimumAge: null, notes: '中学生以下儿童仅周日及节假日可入店；儿童需至少一名成人同行，预约时需填写年龄与人数。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；前日/当日或人数减少收取 course 100%取消费。5人以上原则上需 course 或 shared platter。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck', changeSummary: '补充预约链接、course与儿童政策', autoCheckEnabled: false }
  },
  'au-deco': {
    links: {
      reservation: 'https://selection.tabelog.com/tokyo/A1307/A130703/13232146/',
      tabelog: 'https://selection.tabelog.com/tokyo/A1307/A130703/13232146/'
    },
    ratings: { tabelogScore: '3.75', tabelogUrl: 'https://selection.tabelog.com/tokyo/A1307/A130703/13232146/' },
    dinner: [
      course('おまかせコース', '¥16,500', ['8 品', '法餐与古酒葡萄酒搭配取向', '内容随季节调整'], 'Tabelog Restaurant Selection 公开 course；每人 charge ¥880，无服务费。')
    ],
    budget: { dinnerFrom: '16500', serviceCharge: 'charge ¥880/人；服务费无', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['预约页未列严格着装；建议 smart casual。'], verified: false },
    childPolicy: { minimumAge: null, notes: '公开页面未明确儿童规则；预约前需确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog 可在线预约；需提前说明过敏或不喜欢食材。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog Restaurant Selection', changeSummary: '补充Tabelog评分、预约链接与course', autoCheckEnabled: false }
  },
  hortensia: {
    links: {
      official: 'https://www.hortensiatokyo.com/',
      reservation: 'https://www.tablecheck.com/en/shops/hortensiabistro/reserve',
      tabelog: 'https://tabelog.com/tw/tokyo/A1313/A131301/13291616/'
    },
    lunch: [
      course('Course Menu', '¥25,000', ['约 10-12 品 course', '现代法餐', '内容随季节调整'], '官网公开价格；另收10%服务费。')
    ],
    dinner: [
      course('Course Menu', '¥25,000', ['约 10-12 品 course', '现代法餐', '内容随季节调整'], '官网公开价格；另收10%服务费。')
    ],
    budget: { lunchFrom: '25000', dinnerFrom: '25000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['预约页未列严格着装；建议 smart casual。'], verified: false },
    childPolicy: { minimumAge: 0, notes: 'Tabelog 标注儿童可、婴儿可、可带婴儿车；儿童 course ¥5,500，儿童同行需提前联系。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网/TableCheck 可预约；6人以上需电话。', platforms: ['official', 'TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充预约链接、course与儿童政策', autoCheckEnabled: false }
  },
  apotheose: {
    dressCode: { level: 'Smart casual', required: true, notes: ['推荐 smart casual。', '男性不可穿短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上，且需点 prix fixe menu。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网线上预约，最多提前60天；2日前起按菜单价格100%收取消费。', releaseWindow: '60天前', platforms: ['official online reservation'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official', changeSummary: '补充着装与儿童政策细节', autoCheckEnabled: false }
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
