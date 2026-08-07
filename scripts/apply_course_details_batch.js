const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const details = {
  ryugin: {
    dinner: {
      '日本の豊かさを皿の上に': [
        '两道前菜：一冷一热，以季节香气、温度与组合开场',
        '季节椀物：以一番出汁为核心',
        '刺身拼盘：呈现日本海岸与潮流的海味',
        '炭火烤鱼：使用备长炭烧制',
        '传统季节炊合/煮物',
        '肉料理：可能包含赞岐橄榄牛、地鸡、野鸭、鹿、野猪、熊、雉、鹌鹑或羊等季节食材',
        '当日米饭：以新潟米饭为核心',
        '冷/热水果与烘焙甜点',
        '薄茶'
      ]
    }
  },
  sezanne: {
    lunch: {
      'MENU SÉZANNE': [
        '季节性 tasting menu',
        '以日本当季优质食材为主',
        '每次用餐内容会依季节、供应情况与偏好调整',
        '官网未固定公开逐道菜名'
      ],
      'MENU DU JOUR': [
        '周三至周六午餐限定短版季节菜单',
        '以当季食材构成',
        '官网未固定公开逐道菜名'
      ]
    },
    dinner: {
      'MENU SÉZANNE': [
        '季节性 tasting menu',
        '以日本当季优质食材为主',
        '每次用餐内容会依季节、供应情况与偏好调整',
        '官网未固定公开逐道菜名'
      ]
    }
  },
  leffervescence: {
    lunch: {
      'Omakase course': [
        '统一 omakase course',
        '代表料理包括 Artisanal Vegetables',
        '以日本食材、可持续理念与季节性构成为核心',
        '官网/公开店铺信息未固定公开逐道菜名'
      ]
    },
    dinner: {
      'Omakase course': [
        '统一 omakase course',
        '代表料理包括 Artisanal Vegetables',
        '以日本食材、可持续理念与季节性构成为核心',
        '官网/公开店铺信息未固定公开逐道菜名'
      ]
    }
  },
  losier: {
    lunch: {
      'MENU DÉJEUNER': [
        'Amuse-bouche 开胃小点',
        '贝类组合：赤贝、北寄贝、海松贝，搭配南瓜、开心果、罗勒、白瓜莳萝酱、海藻冻与贝汁油醋',
        '鸟取夏鹿：烤鹿里脊、炖肩肉、红卷心菜、甜菜、长野核桃、橙皮、松露 May Queen 土豆千层、黑加仑酱',
        'Pre-dessert 预甜点',
        '杏、薰衣草与杏仁甜点',
        '甜点车',
        '咖啡'
      ],
      'MENU LES BELLES GOURMANDES': [
        'Amuse-bouche 开胃小点',
        '牡丹虾与白虾：柠檬蔬菜清汤冻、烤西葫芦 tartare、贝类慕斯、茴香 veloute、香草油',
        '笠子鱼：薄脆面包片、糖渍柠檬、茄子卷、青海苔、红色夏蔬 bonbon、莴苣 coulis、番茄水乳化酱、浓鱼汤',
        '青森银鸭：烤鸭胸、油封鸭腿、胡桃南瓜慕斯、无花果、可可果肉、香料肉汁',
        'Pre-dessert 预甜点',
        '红莓主题甜点：紫罗兰雪葩、树莓/洛神花酱',
        '甜点车',
        '咖啡'
      ],
      'LUNCH A WINK TO SUMMER 2026': [
        '青森玉米：冷 veloute、烤玉米/浓缩咖啡冻、冲绳黑糖轻奶油、柠檬草泡沫、栗蜜玉米面包',
        '千叶天然黑鲍：意面南瓜、鲍肝酱、腌鸡油菌、海藻冻、白瓜 veloute、香草油焦糖汁',
        '蓝龙虾：court bouillon、蔬菜清汤、万寿菊叶、朝鲜蓟、莴苣 bonbon',
        '熊本赤牛：厚切 entrecôte、小番茄填馅、茄子、蓬松土豆、干邑肉汁',
        '柑橘主题甜点：马鞭草雪葩',
        '白桃清爽甜点：三种雪葩',
        '甜点车',
        '咖啡',
        '可追加熟成奶酪 ¥5,000 起'
      ]
    }
  },
  'joel-robuchon': {
    lunch: {
      'MENU PRIX FIXE': [
        'Prix fixe 可选式菜单',
        '具体菜品随季节食材变化',
        '官网提供 PDF 菜单，固定页面未展示完整逐道内容'
      ],
      'MENU DÉGUSTATION': [
        'Degustation tasting menu',
        '推荐整桌同点',
        '数量有限',
        '具体菜品随季节食材变化'
      ],
      'MENU VÉGÉTARIEN': [
        '蔬菜为主的 tasting menu',
        '需3天前预约',
        '不是 vegan 菜单'
      ]
    },
    dinner: {
      'MENU PRIX FIXE': [
        'Prix fixe 可选式菜单',
        '具体菜品随季节食材变化',
        '官网提供 PDF 菜单，固定页面未展示完整逐道内容'
      ],
      'MENU DÉGUSTATION': [
        'Degustation tasting menu',
        '推荐整桌同点',
        '数量有限',
        '具体菜品随季节食材变化'
      ],
      'MENU VÉGÉTARIEN': [
        '蔬菜为主的 tasting menu',
        '需3天前预约',
        '不是 vegan 菜单'
      ]
    }
  }
};

function applyDetails(courses, courseDetails) {
  if (!courses || !courseDetails) return;
  for (const course of courses) {
    const next = courseDetails[course.name];
    if (next) course.details = next;
  }
}

let count = 0;
for (const item of data) {
  const update = details[item.id];
  if (!update) continue;
  applyDetails(item.lunch, update.lunch);
  applyDetails(item.dinner, update.dinner);
  item.sync = {
    ...(item.sync || {}),
    lastUpdated: '2026-08-01',
    changeSummary: '补充course逐项中文内容',
    autoCheckEnabled: false
  };
  count += 1;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated course details for ${count} restaurants.`);
