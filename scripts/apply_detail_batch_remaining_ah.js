const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);

const patches = {
  harutaka: {
    ratings: {
      tabelogScore: '4.35',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130103/13032283/dtlrvwlst/'
    },
    links: {
      official: '',
      reservation: 'https://www.tableall.com/restaurant/45/',
      tabelog: 'https://tabelog.com/en/tokyo/A1301/A130103/13032283/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / TABLEALL',
      changeSummary: '补充Tabelog实际评分',
      autoCheckEnabled: false
    }
  },
  'kagurazaka-ishikawa': {
    ratings: {
      tabelogScore: '4.39',
      tabelogUrl: 'https://selection.tabelog.com/tokyo/A1309/A130905/13004079/'
    },
    dressCode: {
      level: 'Japanese fine dining',
      required: null,
      notes: ['公开页面未列具体 Dress Code；高端日本料理建议 smart casual。'],
      verified: false
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TABLEALL',
      changeSummary: '补充Tabelog实际评分并复核儿童年龄规则',
      autoCheckEnabled: false
    }
  },
  kanda: {
    lunch: [],
    dinner: [
      {
        name: 'Omakase Specialties Course',
        price: '¥66,000',
        details: ['主厨おまかせ日本料理', '价格可能随季节食材上下浮动', '松茸季节可能另收追加费用'],
        note: 'OMAKASE 公开价格，含税；吧台另收10%服务费，包厢另收15%服务费。'
      }
    ],
    dressCode: {
      level: 'Japanese fine dining',
      required: null,
      notes: ['公开预约页未列具体 Dress Code；建议 smart casual。'],
      verified: false
    },
    childPolicy: {
      diningRoomAllowed: false,
      privateRoomAllowed: true,
      minimumAge: 18,
      babyAllowed: false,
      strollerAllowed: false,
      fullCourseRequired: true,
      advanceNoticeRequired: true,
      notes: '儿童不可使用普通餐厅区域；包厢可接待儿童；吧台需18岁以上。2人包厢另收 ¥30,000 未税包厢费。',
      verified: true
    },
    budget: {
      lunchFrom: null,
      dinnerFrom: '66000',
      serviceCharge: '吧台10%；包厢15%；2人包厢费 ¥30,000 未税',
      estimatedLunchAllIn: null,
      estimatedDinnerAllIn: null,
      verified: true
    },
    reservation: {
      difficulty: 5,
      difficultyLabel: '极难',
      bookingRule: 'OMAKASE 预约；当前放位不定期，下一轮 TBD。取消费：3日前30%，2日前50%，当日100%。',
      releaseTime: null,
      releaseWindow: '不定期',
      platforms: ['OMAKASE', 'official', 'phone'],
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
      source: 'OMAKASE / official / Tabelog',
      changeSummary: '补充OMAKASE course价格、儿童包厢规则与取消政策',
      autoCheckEnabled: false
    }
  },
  losier: {
    ratings: {
      tabelogScore: '4.42',
      tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13002607/'
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 13,
      babyAllowed: false,
      strollerAllowed: false,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '官网/Tabelog 标注中学生以上/13岁以上可使用。',
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'official / Tabelog',
      changeSummary: '更新Tabelog实际评分与儿童年龄规则',
      autoCheckEnabled: false
    }
  },
  esquisse: {
    ratings: {
      tabelogScore: '4.28',
      tabelogUrl: 'https://tabelog.com/tokyo/A1301/A130101/13120876/'
    },
    childPolicy: {
      diningRoomAllowed: null,
      privateRoomAllowed: null,
      minimumAge: null,
      babyAllowed: null,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: true,
      notes: '公开页面未确认儿童年龄限制；预约前需确认。',
      verified: false
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official',
      changeSummary: '补充Tabelog实际评分',
      autoCheckEnabled: false
    }
  },
  kohaku: {
    ratings: {
      tabelogScore: '4.35',
      tabelogUrl: 'https://tabelog.com/tokyo/A1309/A130905/13296900/dtlratings/'
    },
    links: {
      official: 'https://ryosho-kohaku.com/',
      reservation: 'https://www.tableall.com/restaurant/81',
      tabelog: 'https://tabelog.com/tokyo/A1309/A130905/13296900/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TABLEALL',
      changeSummary: '补充Tabelog实际评分并更新官方链接',
      autoCheckEnabled: false
    }
  },
  maz: {
    ratings: {
      tabelogScore: '4.02',
      tabelogUrl: 'https://tabelog.com/tokyo/A1308/A130803/13270953/'
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official',
      changeSummary: '补充Tabelog实际评分',
      autoCheckEnabled: false
    }
  },
  'nishiazabu-sushi-shin': {
    ratings: {
      tabelogScore: '3.76',
      tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130701/13004789/'
    },
    childPolicy: {
      diningRoomAllowed: false,
      privateRoomAllowed: true,
      minimumAge: null,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: true,
      notes: 'Tabelog 标注儿童仅限包厢座敷，预约时必须确认；OMAKASE 规则另标16岁以上。',
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / OMAKASE',
      changeSummary: '补充Tabelog实际评分并细化儿童包厢规则',
      autoCheckEnabled: false
    }
  },
  'tempura-motoyoshi': {
    ratings: {
      tabelogScore: '4.06',
      tabelogUrl: 'https://selection.tabelog.com/tokyo/A1303/A130302/13270939/'
    },
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['OMAKASE 预约页通常要求避免过度休闲着装；天妇罗吧台建议 smart casual。', '请避免强烈香味。'],
      verified: false
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / OMAKASE',
      changeSummary: '补充迁址后Tabelog实际评分',
      autoCheckEnabled: false
    }
  }
};

for (const [id, patch] of Object.entries(patches)) {
  const item = byId(id);
  if (!item) throw new Error(`Missing restaurant: ${id}`);
  Object.assign(item, patch);
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
