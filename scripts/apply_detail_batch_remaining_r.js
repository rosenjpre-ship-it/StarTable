const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  maz: {
    links: {
      official: 'https://maztokyo.jp/',
      reservation: 'https://maztokyo.jp/reservation/?lang=en'
    },
    dinner: [
      course('MAZ Experience', '¥40,000-¥49,999 目安', ['以秘鲁生态系统为主题的创新料理 tasting menu', '内容随季节与食材调整', '需要提前告知过敏与饮食限制'], 'Tabelog 预算区间；官网预约规则公开，但菜单价格需以预约页实时显示为准。')
    ],
    budget: { dinnerFrom: '40000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['Smart casual。', '不可穿背心、短裤、凉鞋等休闲服装。', '请避免强烈香水。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上儿童可入店。', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '每月15日中午12:00开放次次月预约。7人以上或特别要求需电话联系；可候补。',
      releaseTime: '每月15日 12:00',
      releaseWindow: '次次月',
      platforms: ['official'],
      verified: true
    },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog budget', changeSummary: '补充预约规则、course概要、着装与儿童政策', autoCheckEnabled: false }
  },
  'oniku-karyu': {
    links: {
      official: 'https://www.karyu-tokyo.com/',
      reservation: 'https://www.tablecheck.com/en/karyu-tokyo',
      tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13278579/'
    },
    ratings: { tabelogScore: '4.16', tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130101/13278579/' },
    dinner: [
      course('Seasonal Omakase', '¥31,900', ['严选黑毛和牛会席', 'A4/A5 和牛与季节食材', '内容随季节变化'], 'TableCheck 公开价格；税入，服务费另计。')
    ],
    budget: { dinnerFrom: '31900', serviceCharge: '10%', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['请勿使用香水、古龙水。'], verified: true },
    childPolicy: { minimumAge: 6, notes: '6岁以上儿童仅可使用包厢。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 可预约；周日、节假日休。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'il-ristorante-niko-romito': {
    links: {
      official: 'https://www.bulgarihotels.com/en_US/tokyo/dining/il-ristorante-niko-romito',
      reservation: 'https://www.tablecheck.com/en/shops/bulgarihotels-tokyo-ilristorantenikoromito/reserve'
    },
    lunch: [
      course('MENU DEGUSTAZIONE QUATTRO PORTATE', '¥16,500', ['4 道 tasting menu', '当季风味现代意大利料理'], 'TableCheck 公开价格，含税含服务费。'),
      course('MENU DEGUSTAZIONE ALL’ITALIANA', '¥24,000', ['Antipasto all’Italiana', '意大利地方料理风格 tasting menu'], 'TableCheck 公开价格，含税含服务费。'),
      course('MENU CLASSICI', '¥28,000', ['5 道 signature course', 'Niko Romito 代表菜式'], 'TableCheck 公开价格，含税含服务费。'),
      course('MENU DEGUSTAZIONE', '¥34,000', ['7 道 tasting menu', '当季精选食材'], 'TableCheck 公开价格，含税含服务费。')
    ],
    dinner: [
      course('MENU DEGUSTAZIONE ALL’ITALIANA', '¥24,000', ['Antipasto all’Italiana', '意大利地方料理风格 tasting menu'], 'TableCheck 公开价格，含税含服务费。'),
      course('MENU CLASSICI', '¥28,000', ['5 道 signature course', 'Niko Romito 代表菜式'], 'TableCheck 公开价格，含税含服务费。'),
      course('MENU DEGUSTAZIONE', '¥34,000', ['7 道 tasting menu', '当季精选食材'], 'TableCheck 公开价格，含税含服务费。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '24000', serviceCharge: '含税含服务费', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['Smart casual required.'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上可入店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；5人以上或包厢需电话联系。48小时内取消100%。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck', changeSummary: '补充course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  'heritage-by-kei-kobayashi': {
    links: {
      official: 'https://www.ritz-carlton.com/en/hotels/tyorz-the-ritz-carlton-tokyo/dining/heritage-by-kei-kobayashi/',
      reservation: 'https://www.tablecheck.com/en/shops/heritage-by-kei-kobayashi/reserve',
      tabelog: 'https://tabelog.com/en/tokyo/A1307/A130701/13293593/'
    },
    ratings: { tabelogScore: '3.99', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130701/13293593/' },
    lunch: [
      course('Déjeuner', '¥11,800', ['午餐法餐 course', '现代法餐'], 'Tabelog 公开 course。'),
      course('Découverte', '¥17,800', ['午餐发现 course', '季节性现代法餐'], 'Tabelog 公开 course。'),
      course('Prestige', '¥24,800', ['高级午餐 course'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('Prestige', '¥24,800', ['晚餐 prestige course'], 'Tabelog 公开 course。'),
      course('Heritage', '¥36,000', ['晚餐 signature course', '传统法餐与现代触感'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '11800', dinnerFrom: '24800', serviceCharge: '16%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['酒店高层餐厅，建议 smart casual。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '仅12岁以上可入店；部分预约问题写作11岁以下不可入店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；3日前起特定 course 取消100%。当日饮食限制可能无法对应。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
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
