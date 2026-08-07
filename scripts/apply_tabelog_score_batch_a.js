const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = '2026-08-02';

const scores = {
  'nabeno-ism': ['4.19', 'https://tabelog.com/cn/tokyo/A1311/A131102/13194700/'],
  'la-paix': ['4.00', 'https://tabelog.com/tw/tokyo/A1302/A130202/13173559/'],
  'l-argent': ['4.01', 'https://tabelog.com/en/tokyo/A1308/A130802/13288588/'],
  'akasaka-kikunoi': ['3.87', 'https://tabelog.com/en/tokyo/A1308/A130801/13002514/'],
  'ginza-kitagawa': ['4.35', 'https://tabelog.com/tokyo/A1301/A130101/13275790/party/'],
  'higashiyama-muku': ['3.87', 'https://tabelog.com/tokyo/A1317/A131701/13286250/'],
  'azabujuban-fukuda': ['3.76', 'https://tabelog.com/en/tokyo/A1307/A130702/13174951/'],
  'sushi-kanesaka': ['3.95', 'https://tabelog.com/rst/rstdtl_party_dtl?LstAre=A130103&LstPrf=A1301&pal=tokyo&pplan_id=296118531&rcd=13005003'],
  'tempura-ginya': ['3.77', 'https://tabelog.com/en/tokyo/A1316/A131602/13153190/dtlrvwlst/'],
  'sukiyabashi-jiro-roppongiten': ['3.69', 'https://tabelog.com/tw/tokyo/A1307/A130701/13004426/'],
  itsuka: ['3.84', 'https://tabelog.com/tokyo/A1306/A130603/13242634/party/'],
  'ippei-hanten': ['3.95', 'https://selection.tabelog.com/tokyo/A1307/A130702/13268624/']
};

for (const item of data) {
  const score = scores[item.id];
  if (!score) continue;
  item.ratings = { ...(item.ratings || {}), tabelogScore: score[0], tabelogUrl: score[1] };
  item.links = { ...(item.links || {}), tabelog: score[1] };
  item.sync = {
    ...(item.sync || {}),
    lastChecked: today,
    lastUpdated: today,
    changeSummary: `${item.sync?.changeSummary || '更新'}；补充Tabelog实际评分`
  };
}

fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
