const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const stars=n=>'★'.repeat(n);
const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';

function stationText(item){
 const stations=[...(item.transport?.stations||[])].sort((a,b)=>(a.walkMinutes??99)-(b.walkMinutes??99)).slice(0,3);
 if(!stations.length)return '最近车站：待补充';
 return `最近车站：${stations.map(s=>`${s.name} 步行${s.walkMinutes}分钟（${s.lines.join(' / ')}）`).join('；')}`;
}
function dressText(d){
 if(!d||d.level==='待核验')return '需预约确认';
 return `${d.level}${d.notes?.length?'；'+d.notes.join('；'):''}`;
}
function childText(p){
 if(!p||p.verified===false)return '需预约确认';
 if(p.publicInfoStatus==='not explicitly published')return p.notes||'公开来源未明确；需预约确认。';
 if(p.minimumAge!=null)return `可；最低年龄 ${p.minimumAge}岁${p.notes?'；'+p.notes:''}`;
 if(p.diningRoomAllowed)return `大厅可；最低年龄 ${p.minimumAge??'未注明'}`;
 if(p.privateRoomAllowed)return `仅包厢可；最低年龄 ${p.minimumAge??'未注明'}`;
 return '不可带儿童';
}
function budgetText(b){
 if(!b||b.verified===false)return '需预约确认';
 return `Lunch ¥${b.lunchFrom??'-'} 起；Dinner ¥${b.dinnerFrom??'-'} 起`;
}
function fieldSource(item,field){
 const checked=item.sync?.lastChecked||item.transport?.lastChecked||'2026-08-02';
 const map={basic:'官网 / Tabelog / 预约页',transport:'地址与车站公开信息',reservation:'官网 / 预约页',course:'官网 / 预约页 / Tabelog',rating:'Tabelog',policy:'官网 / 预约页',budget:'官网 / 预约页 / Tabelog'};
 return `<span class="field-source">${esc(map[field]||'公开来源')} · ${esc(checked)}</span>`;
}
function sourceBadges(item){
 const badges=[];
 if(item.sync?.source)badges.push('来源：公开官网/预约页/Tabelog');
 if(item.sync?.lastChecked)badges.push(`检查：${item.sync.lastChecked}`);
 if(item.dressCode?.publicInfoStatus==='not explicitly published')badges.push('着装需预约确认');
 if(item.childPolicy?.publicInfoStatus==='not explicitly published')badges.push('儿童政策需预约确认');
 return badges.map(x=>`<span class="source-badge">${esc(x)}</span>`).join('');
}
function mealTable(items){
 if(!items?.length)return '<div class="content-empty">该餐期暂无公开 Course。</div>';
 return `<table><thead><tr><th>Course</th><th>价格</th><th>内容</th><th>说明</th></tr></thead><tbody>${items.map(x=>`<tr><td>${esc(x.name)}</td><td><strong>${esc(x.price)}</strong></td><td>${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${esc(d)}</li>`).join('')}</ol>`:'待补充'}</td><td>${esc(x.note||'')}</td></tr>`).join('')}</tbody></table>`;
}
function links(item){
 return Object.entries(item.links||{}).filter(([k,v])=>['official','reservation','tabelog','instagram'].includes(k)&&v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join('');
}
function render(item){
 document.title=`${item.nameZh||item.name} | StarTable`;
 $('restaurantDetail').innerHTML=`
 <section class="restaurant-hero">
  <p class="eyebrow">RESTAURANT DETAIL</p>
  <h1>${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h1>
  <p class="sub">${esc([item.nameJa,item.nameEn,item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</p>
  <div class="source-row">${sourceBadges(item)}</div>
 </section>
 <section class="modal-grid">
  <section class="panel"><h3>基本信息</h3><p>${esc(item.address)}</p><p>电话：${esc(item.phone||'待补充')}</p><p>${esc(stationText(item))}</p>${fieldSource(item,'basic')}</section>
  <section class="panel"><h3>预约</h3><p>${esc(`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`)}</p><p>${esc(item.reservation?.bookingRule||'需预约确认')}</p><a class="reserve" href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">前往官网预约</a>${fieldSource(item,'reservation')}</section>
  <section class="panel"><h3>预算</h3><p>${esc(budgetText(item.budget))}</p>${fieldSource(item,'budget')}</section>
  <section class="panel"><h3>Tabelog</h3><p>${esc(item.ratings?.tabelogScore||'待补充')}</p>${fieldSource(item,'rating')}</section>
  <section class="panel"><h3>Dress Code</h3><p>${esc(dressText(item.dressCode))}</p>${fieldSource(item,'policy')}</section>
  <section class="panel"><h3>儿童政策</h3><p>${esc(childText(item.childPolicy))}</p>${fieldSource(item,'policy')}</section>
 </section>
 <section class="modal-section"><h3>Lunch Course</h3>${mealTable(item.lunch)}${fieldSource(item,'course')}</section>
 <section class="modal-section"><h3>Dinner Course</h3>${mealTable(item.dinner)}${fieldSource(item,'course')}</section>
 <section class="modal-section"><h3>链接</h3><div class="link-list">${links(item)}</div></section>`;
}

async function init(){
 const id=new URLSearchParams(location.search).get('id');
 const data=await fetch('./data/restaurants.json').then(r=>r.json());
 const item=data.find(x=>x.id===id)||data[0];
 render(item);
}
init().catch(e=>{$('restaurantDetail').innerHTML='<div class="empty">餐厅详情加载失败。</div>';console.error(e)});
