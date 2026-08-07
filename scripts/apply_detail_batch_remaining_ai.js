const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const byId = id => data.find(r => r.id === id);
const course = (name, price, details, note) => ({ name, price, details, note });

const patches = {
  amarantos: {
    ratings: {
      tabelogScore: '3.70',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130101/13307700/'
    },
    links: {
      official: 'https://www.amarantos2021.com/english/',
      reservation: 'https://tabelog.com/en/tokyo/A1301/A130101/13307700/',
      tabelog: 'https://tabelog.com/en/tokyo/A1301/A130101/13307700/',
      instagram: ''
    },
    lunch: [
      course('Lunch Chef Omakase Course', '¥22,000', ['主厨午餐おまかせ', '内容随季节与食材调整'], 'Tabelog 公开 course，含税；服务费10%。')
    ],
    dinner: [
      course('Chef’s Omakase 6-Dish Course', '¥33,000', ['Canapes', 'Amuse-bouche', '前菜', '前菜', '海鲜料理', '肉料理', '甜点或奶酪'], 'Tabelog 公开 course，含税；服务费10%。'),
      course('Chef’s Omakase 6-Dish Course with Wine Pairing', '¥48,000', ['6道主厨おまかせ', '葡萄酒 pairing'], 'Tabelog 公开 course，含税；服务费10%。')
    ],
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['建议 smart casual。', '请避免短裤、凉鞋。', '请避免强烈香水或古龙水。'],
      verified: true
    },
    budget: {
      lunchFrom: '22000',
      dinnerFrom: '33000',
      serviceCharge: '10%；包厢 ¥11,000/室',
      estimatedLunchAllIn: null,
      estimatedDinnerAllIn: null,
      verified: true
    },
    reservation: {
      difficulty: 3,
      difficultyLabel: '中等',
      bookingRule: 'Tabelog 可线上预约；1-4人取消费为3日前至24小时前50%，24小时内100%；5人以上为7日前至48小时前50%，48小时内100%。',
      releaseTime: null,
      releaseWindow: null,
      platforms: ['Tabelog', 'Phone'],
      waitlist: null,
      cancelSlotLikelihood: null,
      advanceDaysLunch: null,
      advanceDaysDinner: null,
      conciergeRecommended: false,
      overseasBooking: true,
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official',
      changeSummary: '补充Tabelog实际评分、course、Dress Code、预算和取消规则',
      autoCheckEnabled: false
    }
  },
  bottega: {
    ratings: {
      tabelogScore: '3.99',
      tabelogUrl: 'https://tabelog.com/tokyo/A1307/A130703/13204358/dtlratings/'
    },
    links: {
      official: 'https://www.bottega-cucina.com/',
      reservation: 'https://www.tablecheck.com/en/shops/bottega-del-29/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1307/A130703/13204358/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TableCheck',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
      autoCheckEnabled: false
    }
  },
  'dominique-bouchet-tokyo': {
    ratings: {
      tabelogScore: '3.99',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1301/A130101/13183610/'
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 12,
      babyAllowed: false,
      strollerAllowed: false,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: 'Tabelog 标注 12岁以上可使用，包厢同样适用。',
      verified: true
    },
    dressCode: {
      level: 'Smart casual / tailored jacket',
      required: true,
      notes: ['男性以 tailored jacket 为基准，女性同等 smart casual。', '请避免短裤、凉鞋；不符合时可能被拒绝入店。'],
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TableCheck',
      changeSummary: '补充Tabelog实际评分、儿童年龄和Dress Code',
      autoCheckEnabled: false
    }
  },
  'il-ristorante-niko-romito': {
    ratings: {
      tabelogScore: '3.68',
      tabelogUrl: 'https://tabelog.com/tokyo/A1302/A130201/13283511/dtlratings/'
    },
    links: {
      official: 'https://www.bulgarihotels.com/en_US/tokyo/dining/il-ristorante-niko-romito',
      reservation: 'https://www.tablecheck.com/en/shops/bulgarihotels-tokyo-ilristorantenikoromito/reserve',
      tabelog: 'https://tabelog.com/tokyo/A1302/A130201/13283511/',
      instagram: ''
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 12,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: 'Tabelog 标注 12岁以上可使用。',
      verified: true
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TableCheck',
      changeSummary: '补充Tabelog实际评分、Tabelog链接和儿童年龄规则',
      autoCheckEnabled: false
    }
  },
  khao: {
    ratings: {
      tabelogScore: '3.92',
      tabelogUrl: 'https://tabelog.com/en/tokyo/A1310/A131003/13296304/'
    },
    links: {
      official: 'https://khao.tokyo/en/menu/',
      reservation: 'https://khao-tokyo.com/',
      tabelog: 'https://tabelog.com/en/tokyo/A1310/A131003/13296304/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
      autoCheckEnabled: false
    }
  },
  kabi: {
    ratings: {
      tabelogScore: '3.52',
      tabelogUrl: 'https://tabelog.com/kr/tokyo/A1316/A131601/13215648/'
    },
    links: {
      official: 'https://kabi.tokyo/',
      reservation: 'https://www.tablecheck.com/en/shops/kabi-tokyo/reserve',
      tabelog: 'https://tabelog.com/kr/tokyo/A1316/A131601/13215648/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TableCheck',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
      autoCheckEnabled: false
    }
  },
  kibun: {
    ratings: {
      tabelogScore: '3.25',
      tabelogUrl: 'https://tabelog.com/cn/tokyo/A1307/A130703/13295734/'
    },
    links: {
      official: 'https://kibuntokyo.com/',
      reservation: 'https://www.tablecheck.com/de/kibun',
      tabelog: 'https://tabelog.com/cn/tokyo/A1307/A130703/13295734/',
      instagram: ''
    },
    sync: {
      lastChecked: '2026-08-02',
      lastUpdated: '2026-08-02',
      source: 'Tabelog / official / TableCheck',
      changeSummary: '补充Tabelog实际评分与Tabelog链接',
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
