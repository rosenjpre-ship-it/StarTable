const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  'sukiyabashi-jiro-roppongiten': {
    website: 'https://www.sushi-jiro.jp/en/shop',
    links: {
      official: 'https://www.sushi-jiro.jp/en/shop',
      reservation: 'https://www.sushi-jiro.jp/en/shop',
      tabelog: 'https://tabelog.com/tw/tokyo/A1307/A130701/13004426/',
      instagram: ''
    },
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['官方/预约相关公开信息建议 smart casual。', '请避免香水等强烈香味。'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: null,
      privateRoomAllowed: null,
      minimumAge: null,
      babyAllowed: false,
      strollerAllowed: false,
      fullCourseRequired: true,
      advanceNoticeRequired: true,
      notes: '公开预约信息提示小童座位有限/需告知儿童年龄；预约前需确认。',
      verified: true
    },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: '六本木店官方页面列出店铺电话；部分海外预约渠道为 request basis，建议提前并确认成功后再安排行程。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['Official phone', 'Rakuten Travel Experiences'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: true,
      overseasBooking: true,
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'official / Rakuten Travel Experiences / Tabelog',
      changeSummary: '补充官方链接、Dress Code、儿童提示和预约规则',
      autoCheckEnabled: false
    }
  },
  sanosushi: {
    links: {
      official: '',
      reservation: 'tel:0364539666',
      tabelog: 'https://tabelog.com/en/tokyo/A1314/A131401/13290845/',
      instagram: 'https://www.instagram.com/sanosushi2023/'
    },
    lunch: [
      course('寿司おまかせ Lunch', '¥10,000-¥14,999 目安', ['传统江户前寿司', '酸味酢饭、厚切寿司料', '具体内容随当日鱼介调整'], 'Tabelog 公开预算区间；预约为电话制。')
    ],
    dinner: [
      course('寿司おまかせ Dinner', '¥20,000-¥29,999 目安', ['传统江户前寿司', '酸味酢饭、厚切寿司料', '金枪鱼三贯为特色'], 'Michelin/Tabelog 公开信息；具体 course 价格与内容需电话确认。')
    ],
    dressCode: {
      level: 'Sushi counter casual fine dining',
      required: null,
      notes: ['公开页面未列具体 Dress Code；寿司吧台建议 smart casual，并避免强烈香味。'],
      verified: false
    },
    childPolicy: {
      diningRoomAllowed: null,
      privateRoomAllowed: null,
      minimumAge: null,
      babyAllowed: null,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: true,
      notes: '公开页面未明确儿童政策，预约前需电话确认。',
      verified: false
    },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: 'Tabelog 显示预约可，预约为电话のみ；建议提前电话确认空位。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['Phone'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: false,
      overseasBooking: null,
      verified: true
    },
    budget: {
      lunchFrom: '10000',
      dinnerFrom: '20000',
      serviceCharge: null,
      estimatedLunchAllIn: null,
      estimatedDinnerAllIn: null,
      verified: true
    },
    ratings: {
      tabelogScore: '3.99',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1314/A131401/13290845/'
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / Michelin',
      changeSummary: '补充Tabelog评分、电话预约、预算、Instagram和午晚餐预算',
      autoCheckEnabled: false
    }
  },
  'tempura-maehira': {
    website: 'https://tempura-maehira.myconciergejapan.net/',
    links: {
      official: 'https://tempura-maehira.myconciergejapan.net/',
      reservation: 'https://tempura-maehira.myconciergejapan.net/',
      tabelog: 'https://tabelog.com/cn/tokyo/A1307/A130702/13212060/',
      instagram: ''
    },
    dinner: [
      course('季节推荐套餐', '¥25,300 目安', ['腌制赤点鱼等前菜', '当季鱼介与蔬菜天妇罗', '山之上系薄衣天妇罗', '食事'], 'Tabelog 评论公开记录；餐厅公开预算为 ¥20,000-¥29,999，具体以预约确认为准。')
    ],
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['请避免短裤、背心等露肤较多或过度休闲着装。'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: false,
      privateRoomAllowed: false,
      minimumAge: null,
      babyAllowed: false,
      strollerAllowed: false,
      fullCourseRequired: true,
      advanceNoticeRequired: true,
      notes: 'Tabelog 标注不接待小孩；可享用成人相同套餐年龄需预约前确认。',
      verified: true
    },
    reservation: {
      difficulty: 4,
      difficultyLabel: '较难',
      bookingRule: '仅限预约；可通过 My Concierge Japan / 电话咨询。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['My Concierge Japan', 'Phone'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: false,
      overseasBooking: true,
      verified: true
    },
    budget: {
      lunchFrom: null,
      dinnerFrom: '20000',
      serviceCharge: null,
      estimatedLunchAllIn: null,
      estimatedDinnerAllIn: null,
      verified: true
    },
    ratings: {
      tabelogScore: '3.73',
      tabelogUrl: 'https://tabelog.com/cn/tokyo/A1307/A130702/13212060/'
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / My Concierge Japan',
      changeSummary: '补充course、评分、Dress Code、儿童政策、预算和预约链接',
      autoCheckEnabled: false
    }
  },
  'takumi-tatsuhiro': {
    dressCode: {
      level: 'Sushi counter casual fine dining',
      required: null,
      notes: ['预约页未列具体着装条款；建议 smart casual，避免强烈香水。'],
      verified: false
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: null,
      minimumAge: 12,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '12岁以上，且能享用成人相同套餐者可入店。',
      verified: true
    }
  },
  'tempura-miyashiro': {
    dressCode: {
      level: 'Smart casual',
      required: null,
      notes: ['官网/预约页未列严格 Dress Code；建议 smart casual。'],
      verified: false
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: null,
      minimumAge: 6,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: true,
      notes: '欢迎学龄儿童；儿童也需享用套餐。',
      verified: true
    }
  },
  'yotsuya-minemura': {
    dressCode: {
      level: 'Japanese fine dining',
      required: null,
      notes: ['预约页未列具体着装条款；建议 smart casual。'],
      verified: false
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: null,
      minimumAge: 12,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '12岁以上，且可享用成人相同套餐者可入店。',
      verified: true
    }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
