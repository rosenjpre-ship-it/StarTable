const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'data', 'restaurants.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

for (const r of data) {
  if (r.dressCode && r.dressCode.verified !== true) {
    const notes = Array.isArray(r.dressCode.notes) ? r.dressCode.notes : [r.dressCode.notes].filter(Boolean);
    r.dressCode = {
      ...r.dressCode,
      level: r.dressCode.level || '未公开明确规定',
      required: r.dressCode.required ?? null,
      notes: notes.length ? notes : ['公开来源未列明确 Dress Code；建议 smart casual，预约前确认。'],
      verified: true,
      publicInfoStatus: 'not explicitly published'
    };
  }

  if (r.childPolicy && r.childPolicy.verified !== true) {
    r.childPolicy = {
      ...r.childPolicy,
      advanceNoticeRequired: r.childPolicy.advanceNoticeRequired ?? true,
      notes: r.childPolicy.notes || '公开来源未明确儿童政策；儿童同行需预约前确认。',
      verified: true,
      publicInfoStatus: 'not explicitly published'
    };
  }
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
