const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });

const batch = {
  abysse: {
    links: { official: 'https://abysse.jp/', reservation: 'https://www.tablecheck.com/en/shops/abysse/reserve' },
    dinner: [
      course('海鲜 Omakase Course', '价格待公开确认', ['只提供 1 种以海鲜为主的 omakase course', '内容随当日进货与季节调整'], '官网/TableCheck 公开说明；价格未在可公开抓取内容中显示。')
    ],
    childPolicy: { minimumAge: 13, notes: '中学生以上可入店。', verified: true },
    dressCode: { level: 'No strict code / Smart casual recommended', required: true, notes: ['无严格 dress code，但男性请避免背心、短裤、运动服、沙滩凉鞋等过度休闲服装。'], verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: 'TableCheck 可预约；同日取消或人数变更按菜单价格100%收费。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck', changeSummary: '补充预约链接、course概要、着装与儿童政策', autoCheckEnabled: false }
  },
  alchimiste: {
    links: { official: 'http://alchimiste.jp', reservation: 'https://www.tablecheck.com/en/shops/alchimiste/reserve', tabelog: 'https://tabelog.com/en/tokyo/A1316/A131602/13256112/' },
    lunch: [
      course('Lunch Course', '¥13,750', ['8-9 道主厨 omakase', '法国料理技法结合日本/法国食材', '内容随当日食材调整'], 'TableCheck 公开菜单；含税，服务费另计。'),
      course('Dinner Course for Lunch', '¥28,600', ['9-10 道主厨 omakase', '晚餐完整 course 可在 12:00 午餐时段提供'], 'TableCheck 公开菜单；含税，服务费另计。')
    ],
    dinner: [
      course('Dinner Course', '¥28,600', ['9-10 道主厨 omakase', '内容随当日食材调整'], 'TableCheck 公开菜单；含税，服务费另计。')
    ],
    budget: { lunchFrom: '13750', dinnerFrom: '28600', serviceCharge: '主餐厅10%；包厢15%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议男性穿夹克或有领衬衫。', '请避免短裤、凉鞋等轻装。', '请避免过量香水。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '主餐厅 12 岁以上；12 岁以下仅可使用包厢，儿童 course ¥7,700，婴儿车每台 ¥5,000。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '可提前约2个月预约；取消须在预约日前2天前联系，前日/当日有取消费。', releaseWindow: '约2个月前', platforms: ['TableCheck', 'official'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / TableCheck / Tabelog', changeSummary: '补充course、预约规则、着装与儿童政策', autoCheckEnabled: false }
  },
  amarantos: {
    links: { reservation: 'https://tabelog.com/en/tokyo/A1301/A130101/13307700/', tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13307700/' },
    lunch: [
      course('Lunch Chef Omakase Course', '¥22,000', ['午餐主厨 omakase', '内容随季节调整'], 'Tabelog 公开菜单。')
    ],
    dinner: [
      course('Chef’s Omakase 6-Dish Course', '¥33,000', ['Canapés', 'Amuse-bouche', '前菜', '前菜', '海鲜料理', '肉料理', '甜品或奶酪'], 'Tabelog 公开菜单；另收10%服务费。'),
      course('Chef’s Omakase 6-Dish Course with Wine Pairing', '¥48,000', ['6 道 omakase', '含 wine pairing'], 'Tabelog 公开菜单；另收10%服务费。')
    ],
    budget: { lunchFrom: '22000', dinnerFrom: '33000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['建议 smart casual。', '请避免短裤、凉鞋。'], verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog 可预约；1-4人取消为3日前至24小时前50%，24小时内100%。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充course、预约规则与着装', autoCheckEnabled: false }
  },
  apotheose: {
    links: { official: 'https://apotheose.jp/en/reservation/', reservation: 'https://apotheose.jp/en/reservation/' },
    dinner: [
      course('Prix Fixe Menu', '价格随预约页选择', ['Prix fixe course', '12岁以上儿童需点相同 prix fixe menu', '内容随季节调整'], '官网公开规则；具体价格需进入线上预约日历确认。')
    ],
    dressCode: { level: 'Smart casual', required: true, notes: ['男性请避免短裤、凉鞋等过度休闲服装。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上，且需点 prix fixe menu。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '官网线上预约，最多提前60天；预约日前2天起取消按菜单价格100%收费。', releaseWindow: '60天前', platforms: ['official online reservation'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official', changeSummary: '补充预约规则、course概要、着装与儿童政策', autoCheckEnabled: false }
  },
  'beige-alain-ducasse': {
    links: { official: 'https://beige-tokyo.com/en/', reservation: 'https://tabelog.com/en/tokyo/A1301/A130101/13010470/', tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13010470/' },
    ratings: { tabelogScore: '3.77', tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130101/13010470/' },
    lunch: [
      course('3-Course Prefix Course', '¥14,000', ['3 道 prix fixe', '前菜/主菜/甜品可选'], 'Tabelog 公开菜单；另收12%服务费。'),
      course('4-Course Prefix Course', '¥20,000', ['4 道 prix fixe', '双主菜配置'], 'Tabelog 公开菜单；另收12%服务费。'),
      course('Signature Course', '¥35,000', ['季节 signature course', '由前菜到主菜与甜品完整构成'], 'Tabelog 公开菜单；另收12%服务费。')
    ],
    dinner: [
      course('Signature Course', '¥35,000', ['季节 signature course', '现代法餐 tasting menu'], 'Tabelog 公开菜单；另收12%服务费。')
    ],
    budget: { lunchFrom: '14000', dinnerFrom: '35000', serviceCharge: '12%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性需穿有领衬衫或夹克。', '不可穿无领衣物、短裤、凉鞋等轻装。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上且可享用 course 者可入店；无儿童菜单。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '官网/电话/Tabelog 可预约；一般可预约未来2个月。', releaseWindow: '约2个月前', platforms: ['official', 'Tabelog', 'phone'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'official / Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
  },
  'cycle-by-mauro-colagreco': {
    links: { reservation: 'https://tabelog.com/tokyo/A1302/A130201/13288151/party/', tabelog: 'https://tabelog.com/tokyo/A1302/A130201/13288151/party/' },
    ratings: { tabelogScore: '3.75', tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130201/13288151/party/' },
    lunch: [
      course('Nature', '¥16,500', ['6 品', 'Tapas、料理 3 皿、甜品 1 皿、小菓子', '约 1.5-2 小时'], 'Tabelog 公开菜单。'),
      course('Symbiose', '¥26,400', ['8 品', 'Tapas、料理 5 皿、甜品 1 皿、petit fours'], 'Tabelog 公开菜单。'),
      course('Inspiration', '¥35,200', ['10 品', 'Tapas、料理 6 皿、甜品 2 皿、小菓子'], 'Tabelog 公开菜单。')
    ],
    dinner: [
      course('Symbiose', '¥26,400', ['8 品', 'Tapas、料理 5 皿、甜品 1 皿、petit fours'], 'Tabelog 公开菜单。'),
      course('Inspiration', '¥35,200', ['10 品', 'Tapas、料理 6 皿、甜品 2 皿、小菓子'], 'Tabelog 公开菜单。')
    ],
    budget: { lunchFrom: '16500', dinnerFrom: '26400', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog 可预约；按日期选择 course。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分与course', autoCheckEnabled: false }
  },
  'dominique-bouchet-tokyo': {
    links: { official: 'http://www.dominique-bouchet.jp', reservation: 'https://www.tablecheck.com/en/shops/dominique-bouchet/reserve', tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13183610/' },
    dinner: [
      course('季节 Course', '¥30,000-¥39,999 目安', ['季节性法餐 course', '内容随季节调整'], 'Tabelog 预算区间；具体 course 需在预约页按日期确认。另收12%服务费。')
    ],
    budget: { dinnerFrom: '30000', serviceCharge: '12%', verified: true },
    dressCode: { level: 'Smart casual / tailored jacket', required: true, notes: ['男性以 tailored jacket 为基准；Cool Biz 期间有领衬衫可不穿夹克。', '请避免牛仔裤、T恤、运动衫、连帽衫、短裤、凉鞋。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上可入店，包厢同样适用。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；7人以上或包厢需电话咨询。', platforms: ['TableCheck'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog / TableCheck', changeSummary: '补充官网预约、预算、着装与儿童政策', autoCheckEnabled: false }
  },
  'edition-koji-shimomura': {
    links: { official: 'http://www.koji-shimomura.jp/', reservation: 'https://tabelog.com/en/tokyo/A1307/A130701/13042074/', tabelog: 'https://tabelog.com/en/tokyo/A1307/A130701/13042074/' },
    ratings: { tabelogScore: '4.02', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130701/13042074/' },
    lunch: [
      course('Lunch Course', '¥14,300', ['低黄油/低奶油风格法餐', '与晚餐同品数结构', '突出食材本味与色彩'], 'Tabelog 公开菜单；服务费另计。'),
      course('Lunch Course', '¥22,000', ['午餐完整 course', '低热量、健康取向现代法餐'], 'Tabelog 公开菜单；服务费另计。'),
      course('Dinner Menu for Lunch', '¥28,600', ['Creation course', '精选食材', '以 Bernard Loiseau 系谱为灵感'], 'Tabelog 公开菜单；服务费另计。')
    ],
    dinner: [
      course('Dinner Course', '¥30,000-¥39,999 目安', ['现代法餐 course', '低黄油/低奶油，突出食材本味'], 'Tabelog 预算区间；具体 dinner course 需预约页按日期确认。另收10%服务费。')
    ],
    budget: { lunchFrom: '14300', dinnerFrom: '30000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性请避免短裤、T恤、凉鞋等。'], verified: true },
    childPolicy: { minimumAge: 8, notes: '8岁以上且可享用成人相同 course 的儿童可入店。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'Tabelog 可在线预约。', platforms: ['Tabelog'], verified: true },
    sync: { lastChecked: today, lastUpdated: today, source: 'Tabelog', changeSummary: '补充Tabelog评分、course、着装与儿童政策', autoCheckEnabled: false }
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
