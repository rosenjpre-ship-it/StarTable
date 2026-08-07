const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
  'azabu-kadowaki': {
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['男性は半裤、背心、运动凉鞋及过于休闲服装不可入店'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: null,
      minimumAge: 13,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '13岁以上，且需享用与成人相同的 course',
      verified: true
    },
    source: 'Azabu Kadowaki official reservation notes'
  },
  'leffervescence': {
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['短裤、运动服、帽衫、凉鞋、帽子、外套不可入餐厅', '男性需穿商务夹克或有领衬衫', '请勿使用香水或古龙水'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 12,
      babyAllowed: true,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: true,
      notes: '主餐厅仅12岁以上；包厢欢迎所有年龄儿童，需咨询餐厅',
      verified: true
    },
    source: "L'Effervescence official address page"
  },
  'sezanne': {
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['男士需夹克或长袖有领衬衫、长裤、包头鞋', '棒球帽、运动服、短裤、休闲凉鞋不可入店'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: null,
      minimumAge: 13,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '欢迎13岁以上儿童；不提供儿童菜单',
      verified: true
    },
    source: 'SÉZANNE official basic information'
  },
  'ryugin': {
    dressCode: {
      level: 'Semi-formal',
      required: true,
      notes: ['T恤、男士短裤或凉鞋不可入店', '禁止香水及古龙水'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 10,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '仅10岁以上儿童；需享用与成人相同 course',
      verified: true
    },
    source: 'Nihonryori RyuGin official about/time pages'
  },
  'quintessence': {
    dressCode: {
      level: 'Elegant casual',
      required: true,
      notes: ['男性建议夹克或有领衬衫', '短裤、运动服、凉鞋、背心、T恤请避免', '请避免过强香水'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: false,
      privateRoomAllowed: false,
      minimumAge: 16,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: null,
      notes: '不接受16岁未满儿童',
      verified: true
    },
    source: 'Quintessence official reservation page'
  },
  'myojaku': {
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['男性请避免短裤、无袖上衣、运动凉鞋及类似服装', '请勿使用香水或浓重香氛'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 12,
      babyAllowed: false,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: null,
      notes: '仅接受中学生以上，且能享用成人相同 course 的儿童',
      verified: true
    },
    source: 'Myojaku official reservation notes'
  },
  'sazenka': {
    dressCode: {
      level: 'Smart casual',
      required: true,
      notes: ['男性半裤、凉鞋不可', '请勿使用香水或古龙水'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 12,
      babyAllowed: true,
      strollerAllowed: null,
      fullCourseRequired: true,
      advanceNoticeRequired: true,
      notes: '1F主餐厅为12岁以上且能享用成人 course；小龄儿童仅包厢可咨询',
      verified: true
    },
    source: 'Sazenka official information page'
  },
  'joel-robuchon': {
    dressCode: {
      level: 'Dress code required',
      required: true,
      notes: ['男性不可穿T恤、短裤、运动服、凉鞋', '男性需夹克或有领衬衫；领带非必须'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: true,
      privateRoomAllowed: true,
      minimumAge: 10,
      babyAllowed: true,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: true,
      notes: '主餐厅不接受10岁以下；0-9岁可使用包厢，需确认包厢空位',
      verified: true
    },
    source: 'Joël Robuchon official shop page'
  },
  'losier': {
    dressCode: {
      level: 'Dress code required',
      required: true,
      notes: ['通常要求男性穿夹克；夏季可夹克或有领衬衫', 'T恤、短裤、凉鞋等休闲服装不可'],
      verified: true
    },
    childPolicy: {
      diningRoomAllowed: null,
      privateRoomAllowed: null,
      minimumAge: null,
      babyAllowed: null,
      strollerAllowed: null,
      fullCourseRequired: null,
      advanceNoticeRequired: null,
      notes: '官网公开页面未确认儿童政策',
      verified: false
    },
    source: "L'OSIER official news/reservation page"
  }
};

let count = 0;
for (const item of data) {
  const update = updates[item.id];
  if (!update) continue;
  item.dressCode = update.dressCode;
  item.childPolicy = update.childPolicy;
  item.sync = {
    ...(item.sync || {}),
    lastChecked: '2026-08-01',
    lastUpdated: '2026-08-01',
    source: update.source,
    changeSummary: '着装要求与儿童政策官网核验',
    autoCheckEnabled: false
  };
  count += 1;
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${count} restaurants.`);
