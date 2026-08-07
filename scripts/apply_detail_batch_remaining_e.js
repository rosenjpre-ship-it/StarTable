const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const course = (name, price, details, note = '') => ({ name, price, details, note });
const sync = summary => ({ lastChecked: today, lastUpdated: today, source: 'Tabelog / official / public reservation page', changeSummary: summary, autoCheckEnabled: false });

const batch = {
  'akasaka-kikunoi': {
    links: {
      official: 'https://kikunoi.jp/kikunoiweb/Akasaka/index',
      reservation: 'https://tabelog.com/en/tokyo/A1308/A130801/13002514/',
      tabelog: 'https://tabelog.com/en/tokyo/A1308/A130801/13002514/'
    },
    ratings: { tabelogScore: '3.87', tabelogUrl: 'https://tabelog.com/en/tokyo/A1308/A130801/13002514/' },
    lunch: [
      course('昼懐石コース', '¥14,300', ['京都菊乃井系谱的午餐怀石', '内容随季节调整'], 'Tabelog 公开 course；含税，服务费另计。'),
      course('昼懐石コース', '¥17,600', ['午餐怀石升级 course', '内容随季节调整'], 'Tabelog 公开 course；含税，服务费另计。'),
      course('昼懐石コース', '¥22,000', ['午餐高级怀石 course', '内容随季节调整'], 'Tabelog 公开 course；含税，服务费另计。')
    ],
    dinner: [
      course('夜懐石コース', '¥22,000', ['晚餐怀石 course', '内容随季节调整'], 'Tabelog 公开 course；含税，服务费另计。'),
      course('夜懐石コース', '¥33,000', ['晚餐怀石升级 course', '内容随季节调整'], 'Tabelog 公开 course；含税，服务费另计。'),
      course('夜懐石コース', '¥55,000', ['晚餐高级怀石 course', '内容随季节调整'], 'Tabelog 公开 course；含税，服务费另计。')
    ],
    budget: { lunchFrom: '14300', dinnerFrom: '22000', serviceCharge: '另计', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['男性不可穿半裤、凉鞋。', '请避免香水、古龙水。'], verified: true },
    childPolicy: { minimumAge: null, notes: '儿童可；12岁以下仅可使用包厢，且包厢仅晚餐可用。', verified: true },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: '可线上预约；午餐入店 12:00-12:30，晚餐入店 17:00-19:00。', platforms: ['Tabelog', 'official'], verified: true },
    sync: sync('补充Tabelog评分、course、着装与儿童政策')
  },
  'ginza-kousui': {
    links: {
      official: 'https://ginza-kousui.jp/menu/',
      reservation: 'https://www.tablecheck.com/en/shops/ginza-kosui/reserve'
    },
    dinner: [
      course('おまかせコース', '¥29,700', ['银座志翠 omakase', '静冈直送山海食材', '沿怀石料理流程构成'], '官网公开价格；包厢另收10%服务费。'),
      course('Omakase Course', '¥27,500', ['季节性 omakase', '京都名店修业店主的怀石流程', '海鲜为主'], 'TableCheck 公开价格，含税含服务费。')
    ],
    budget: { dinnerFrom: '27500', serviceCharge: '包厢10%', verified: true },
    dressCode: { level: 'Casual formal', required: true, notes: ['请穿 casual formal。'], verified: true },
    childPolicy: { minimumAge: null, notes: '公开预约页未明确儿童年龄；菜单以海鲜为主，儿童同行需预约前确认。', verified: false },
    reservation: { difficulty: 3, difficultyLabel: '中等', bookingRule: 'TableCheck 可预约；前日/当日取消100%，3日前取消50%。前日までに预约。', platforms: ['TableCheck', 'official'], verified: true },
    sync: sync('补充course、预约规则与着装')
  },
  'ginza-kitagawa': {
    links: {
      reservation: 'https://www.tableall.com/restaurant/408',
      tabelog: 'https://tabelog.com/tokyo/A1301/A130101/13275790/party/'
    },
    ratings: { tabelogScore: '4.35', tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13275790/party/' },
    lunch: [
      course('おまかせコース', '¥31,900', ['日本料理与天妇罗元素融合的 omakase', '八寸、一品料理、天妇罗、寿司等构成', '内容随季节调整'], 'Tabelog 公开价格；仅周六/周日午餐。'),
      course('Kitagawa Omakase', '¥44,500', ['TABLEALL 预约价格', '含平台预约手续费 ¥8,000'], 'TABLEALL 公开价格。')
    ],
    dinner: [
      course('おまかせコース', '¥31,900', ['日本料理与天妇罗元素融合的 omakase', '内容随季节调整'], 'Tabelog 公开价格。'),
      course('Kitagawa Omakase', '¥44,500', ['TABLEALL 预约价格', '含平台预约手续费 ¥8,000'], 'TABLEALL 公开价格。')
    ],
    budget: { lunchFrom: '31900', dinnerFrom: '31900', verified: true },
    dressCode: { level: 'No strong scent', required: true, notes: ['请勿使用香水、古龙水等强烈香味。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '13岁以上，且可享用成人相同 course 者可入店。TABLEALL 标注 10 岁以上可申请，实际以店铺规则为准。', verified: true },
    reservation: { difficulty: 5, difficultyLabel: '极难', bookingRule: 'Tabelog/电话可预约；TABLEALL 可提交预约请求。平日 17:00/20:30，周六 12:00/18:00/21:00，周日祝 12:00/18:00。', platforms: ['Tabelog', 'TABLEALL', 'phone'], verified: true },
    sync: sync('补充Tabelog评分、course、预约规则、着装与儿童政策')
  },
  'higashiyama-muku': {
    links: {
      official: 'https://higashiyama-muku.jp/',
      tabelog: 'https://tabelog.com/tokyo/A1317/A131701/13286250/'
    },
    ratings: { tabelogScore: '3.87', tabelogUrl: 'https://tabelog.com/tokyo/A1317/A131701/13286250/' },
    dinner: [
      course('季节日本料理 Course', '¥20,000-¥29,999 目安', ['完整预约制日本料理 course', '以旬味食材为核心', '内容随季节调整'], 'Tabelog 预算区间；页面仅公开 1 个 course，具体价格需预约确认。')
    ],
    budget: { dinnerFrom: '20000', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['请穿不影响其他客人的服装。'], verified: true },
    childPolicy: { minimumAge: 13, notes: '中学生以上，且可享用 course 的儿童可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制；每月1日 11:00 开放未来2个月预约。3日前取消50%，前日取消100%。', releaseTime: '每月1日 11:00', releaseWindow: '未来2个月', verified: true },
    sync: sync('补充Tabelog评分、course概要、预约规则、着装与儿童政策')
  },
  'azabujuban-fukuda': {
    links: {
      reservation: 'https://omakaseje.com/ja/restaurants/me232394',
      tabelog: 'https://tabelog.com/en/tokyo/A1307/A130702/13174951/'
    },
    ratings: { tabelogScore: '3.76', tabelogUrl: 'https://tabelog.com/en/tokyo/A1307/A130702/13174951/' },
    dinner: [
      course('晚餐 Omakase', '¥40,000-¥49,999 目安', ['仅提供 1 种 course', '日本料理 omakase', '内容随季节与进货调整'], 'Tabelog 预算区间；OMAKASE 页面未公开固定价格。另收10%服务费。')
    ],
    budget: { dinnerFrom: '40000', serviceCharge: '10%', verified: true },
    dressCode: { level: 'Smart casual', required: true, notes: ['不可穿半裤、无袖、运动服、卫衣、T恤、短裤、凉鞋等过度休闲服装。', '请避免过度香水或柔软剂香味。'], verified: true },
    childPolicy: { minimumAge: 12, notes: '12岁以上，且可享用成人相同 course 者可入店。', verified: true },
    reservation: { difficulty: 4, difficultyLabel: '较难', bookingRule: '完全预约制，1日1-2组；OMAKASE JapanEatinerary 可预约。预约时间需准时，迟到可能被视为取消。', platforms: ['OMAKASE JapanEatinerary', 'concierge'], verified: true },
    sync: sync('补充Tabelog评分、预约链接、course概要、着装与儿童政策')
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
