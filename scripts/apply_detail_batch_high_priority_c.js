const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-01';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  narisawa: {
    links: {
      official: 'https://www.narisawa-yoshihiro-en.com/',
      reservation: 'https://www.narisawa-yoshihiro-en.com/reservation'
    },
    lunch: [
      course('Omakase Course', '¥68,000', ['每日季节性 omakase', '按当日食材为每位客人调整', '可在预约时提前说明过敏、素食、vegan、macrobiotic 等需求'], '官网公开价格，含税与服务费。'),
      course('Masuizumi & SAYS FARM Course', '¥70,000', ['午餐限定', 'Omakase Course + 饮品 pairing', '富山主题季节活动菜单'], '官网夏季限定活动价格；含税，服务费另计。')
    ],
    dinner: [
      course('Omakase Course', '¥68,000', ['每日季节性 omakase', '按当日食材为每位客人调整'], '官网公开价格，含税与服务费。')
    ],
    budget: { lunchFrom: '68000', dinnerFrom: '68000', serviceCharge: '通常含税含服务费；限定活动可能服务费另计', verified: true },
    childPolicy: { minimumAge: 18, notes: '18岁未满不可入店。', verified: true },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '每月预约于前一个月第一个营业日 10:00 开放；2人起预约。',
      releaseTime: '10:00',
      releaseWindow: '前一个月第一个营业日',
      platforms: ['OMAKASE'],
      verified: true
    },
    policies: { cancellation: '预约日前5天起50%，2天前起100%。', paymentMethods: [] },
    sync: { lastChecked: today, lastUpdated: today, source: 'official', changeSummary: '补充course、预约规则、儿童政策', autoCheckEnabled: false }
  },
  'floril-ge': {
    links: {
      official: 'https://www.aoyama-florilege.jp/en/reservations.html',
      reservation: 'https://www.aoyama-florilege.jp/en/reservations.html',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130704/13289651'
    },
    ratings: { tabelogScore: '4.15', tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130704/13289651' },
    lunch: [
      course('Lunch Tasting Menu', '¥12,000', ['午餐 tasting menu', '主菜可选 MEAT 或 VEGGIE', '约 2.5 小时'], '官网价格含税，另收10%服务费。'),
      course('Dinner Tasting Menu（午餐可提前要求）', '¥24,000', ['完整晚餐 tasting menu', '主菜可选 MEAT 或 VEGGIE', '约 3 小时'], '午餐选择 dinner menu 需至少提前一天提出；另收10%服务费。')
    ],
    dinner: [
      course('Dinner Tasting Menu', '¥24,000', ['晚餐 tasting menu', '主菜可选 MEAT 或 VEGGIE', '约 3 小时'], '官网价格含税，另收10%服务费。')
    ],
    budget: { lunchFrom: '12000', dinnerFrom: '24000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['无严格 dress code；男性不可穿短裤、凉鞋', '请避免强烈香水或身体乳香味'], verified: true },
    childPolicy: { minimumAge: 13, notes: '仅接待中学生以上。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '每天 0:00 JST 开放未来1个月内线上座位；最多4人。', releaseTime: '00:00', releaseWindow: '未来1个月', platforms: ['official online reservation'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  crony: {
    links: { reservation: 'https://www.tablecheck.com/en/shops/crony/reserve' },
    dinner: [
      course('Omakase Course', '¥30,800', ['主厨按最佳状态食材准备的 omakase', '另收矿泉水 ¥1,320/人'], 'TableCheck 当前公开价格；含税，服务费另计。')
    ],
    budget: { dinnerFrom: '30800', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议男性穿夹克或有领衬衫', '不可穿短裤、运动服、凉鞋、背心等'], verified: true },
    childPolicy: { minimumAge: 16, notes: '原则上不接待高中生年龄以下（16岁未满）客人。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 可预约；2人起。变更/取消需在预约日前120小时以前。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck', changeSummary: '补充course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  miyasaka: {
    links: { tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13264981' },
    ratings: { tabelogScore: '4.23', tabelogUrl: 'https://tabelog.com/tokyo/A1306/A130602/13264981' },
    lunch: [
      course('午餐 Omakase Course', '¥25,000', ['季节性日本料理 omakase', '内容随当日食材调整'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('晚餐 Omakase Course', '¥50,000', ['晚餐 omakase 11 品', '内容随当日食材调整'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '25000', dinnerFrom: '50000', verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分与course', autoCheckEnabled: false }
  },
  'tempura-motoyoshi': {
    links: {
      reservation: 'https://omakase.in/en/r/xm882789',
      tabelog: 'https://tabelog.com/tokyo/A1306/A130602/13049687/'
    },
    dinner: [
      course('Chef’s Tasting Course', '¥33,000-¥44,000', ['主厨天妇罗 tasting course', '包含季节海鲜与蔬菜天妇罗', '最后食事可依店铺安排选择'], 'OMAKASE 公开价格，含税；另收10%服务费。')
    ],
    budget: { dinnerFrom: '33000', serviceCharge: '10%', verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上，且可享用成人相同套餐者可入店。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 可预约；当前开放至 2026-07-31，下一轮放位 TBD。', platforms: ['OMAKASE'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'OMAKASE / TABLEALL', changeSummary: '补充course、预约规则、儿童政策', autoCheckEnabled: false }
  },
  'tempura-kondo': {
    links: {
      reservation: 'https://tabelog.com/tokyo/A1301/A130101/13004993/party/?lid=sp_eplst',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13004993/party/?lid=sp_eplst'
    },
    ratings: { tabelogScore: '3.99', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13004993/party/?lid=sp_eplst' },
    lunch: [
      course('菫 Course', '¥13,200', ['天妇罗定食 course', '7月起菜单'], 'Tabelog 公开 course。'),
      course('椿 Course', '¥16,500', ['天妇罗定食 course', '7月起菜单'], 'Tabelog 公开 course。'),
      course('藤 Course', '¥22,000', ['天妇罗定食 course', '7月起菜单'], 'Tabelog 公开 course。')
    ],
    dinner: [
      course('藤 Course', '¥22,000', ['天妇罗定食 course', '7月起菜单'], 'Tabelog 公开 course。'),
      course('楓 Course', '¥27,500', ['天妇罗定食 course', '7月起菜单'], 'Tabelog 公开 course。'),
      course('蓬 Course', '¥33,000', ['天妇罗定食 course', '7月起菜单'], 'Tabelog 公开 course。')
    ],
    budget: { lunchFrom: '13200', dinnerFrom: '22000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请避免过量香水。'], verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'Tabelog 可线上预约；超过预约时间15分钟需电话联系。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、course、预约规则', autoCheckEnabled: false }
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
    else if (key === 'policies') item.policies = { ...(item.policies || {}), ...value };
    else if (key === 'sync') item.sync = { ...(item.sync || {}), ...value };
    else item[key] = value;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
