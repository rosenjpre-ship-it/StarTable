const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';
const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  shinois: {
    links: {
      official: 'https://shinois.com/en/',
      reservation: 'https://omakase.in/en/r/rv266195'
    },
    dinner: [
      course('Seasonal Tasting Course', '¥43,300 起', ['季节性中餐 tasting course', '包含精选干货料理', '夏/秋/冬 course 不定期更换'], 'OMAKASE 公开价格；另收服务费：吧台10%，半包厢13%并另有半包厢费 ¥20,000。')
    ],
    budget: { dinnerFrom: '43300', serviceCharge: '吧台10%；半包厢13% + ¥20,000包厢费', verified: true },
    dressCode: { level: 'No strict code / Smart casual recommended', required: true, notes: ['无严格 Dress Code。', '男性请避免半裤、凉鞋等过度休闲服装。', '请避免香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '中学生以上，且可享用成人相同菜单者可入店。OMAKASE 英文页表述为可跟成人同速享用相同餐点者。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'OMAKASE 预约；17:00 / 20:30 两部制。不接受电话预约或电话改约。', platforms: ['OMAKASE'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / OMAKASE', changeSummary: '补充预约链接、course、着装与儿童政策', autoCheckEnabled: false }
  },
  sincere: {
    links: {
      reservation: 'https://www.tablecheck.com/en/shops/sincere/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1309/A130901/13194253/'
    },
    ratings: { tabelogScore: '4.02', tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130901/13194253/' },
    lunch: [
      course('Saturday Lunch Course', '¥22,550', ['Sincère 主厨季节 course', '鱼派等招牌风格菜品', '约 3 小时'], 'TableCheck 公开 course；税入，另收午餐5%服务费。')
    ],
    dinner: [
      course('Haute couture course with beef main', '¥22,550', ['Chef Ishii 季节 course', '可在预约时填写喜欢食材与偏好', '完整 course 约 3 小时'], 'TableCheck 公开 course；税入，另收晚餐10%服务费。')
    ],
    budget: { lunchFrom: '22550', dinnerFrom: '22550', serviceCharge: '午餐5%；晚餐10%', verified: true },
    dressCode: { level: 'Casual formal', required: true, notes: ['男性请避免背心、半裤、沙滩凉鞋。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上可预约。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'TableCheck 预约；晚餐开放至未来1个月，每日0:00放位。午餐为周六，次月座位每月1日10:00开放。3日前50%，2日前至当日100%。', releaseTime: '晚餐0:00；午餐每月1日10:00', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'TableCheck / Tabelog', changeSummary: '补充Tabelog评分、预约链接、course、着装与儿童政策', autoCheckEnabled: false }
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
