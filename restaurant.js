const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const stars=n=>'★'.repeat(n);
const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const activeUser=localStorage.getItem('stUser')||'guest';
const prefKey=name=>`st:${activeUser}:${name}`;
const userState={
 favorites:new Set(JSON.parse(localStorage.getItem(prefKey('favorites'))||'[]')),
 marks:JSON.parse(localStorage.getItem(prefKey('marks'))||'{}')
};
function saveUserState(){
 localStorage.setItem(prefKey('favorites'),JSON.stringify([...userState.favorites]));
 localStorage.setItem(prefKey('marks'),JSON.stringify(userState.marks));
}

function stationText(item){
 const stations=[...(item.transport?.stations||[])].sort((a,b)=>(a.walkMinutes??99)-(b.walkMinutes??99)).slice(0,3);
 if(!stations.length)return '最近车站：待补充';
 return `最近车站：${stations.map(s=>`${s.name} 步行${s.walkMinutes}分钟（${s.lines.join(' / ')}）`).join('；')}`;
}
function stationHtml(item){
 const stations=[...(item.transport?.stations||[])].sort((a,b)=>(a.walkMinutes??99)-(b.walkMinutes??99)).slice(0,3);
 if(!stations.length)return '<strong>最近车站：待补充</strong>';
 return `最近车站：${stations.map(s=>`<strong>${esc(s.name)} 步行${esc(s.walkMinutes)}分钟</strong><span>（${esc(s.lines.join(' / '))}）</span>`).join('；')}`;
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
function conceptText(item){
 if(item.concept?.text)return item.concept.text;
 if(item.concept?.slogan)return item.concept.slogan;
 const cuisine=item.cuisineZh||item.cuisine||'料理';
 return `以${cuisine}为核心，呈现季节食材与餐厅个性。`;
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
function channelLabel(value){
 const key=String(value||'').toLowerCase();
 if(key.includes('tablecheck'))return 'TableCheck';
 if(key.includes('omakase'))return 'OMAKASE';
 if(key.includes('pocket'))return 'Pocket Concierge';
 if(key.includes('tableall'))return 'TABLEALL';
 if(key.includes('phone')||key.includes('電話'))return '电话预约';
 if(key.includes('hotel')||key.includes('concierge'))return '酒店 Concierge';
 if(key.includes('official'))return '官网预约';
 return value||'预约渠道待确认';
}
function reservationAdvice(item){
 const r=item.reservation||{};
 const platforms=[...(r.platforms||[])].map(channelLabel).filter(Boolean);
 const release=[r.releaseTime,r.releaseWindow].filter(Boolean).join(' / ')||'公开来源未明确固定放位时间';
 const advance=[r.advanceDaysLunch?`Lunch 建议提前约 ${r.advanceDaysLunch} 天`:null,r.advanceDaysDinner?`Dinner 建议提前约 ${r.advanceDaysDinner} 天`:null].filter(Boolean).join('；')||'建议按预约页最新开放日历确认';
 const best=platforms[0]||channelLabel(item.links?.reservation?'official':'');
 const tactics=[];
 if((r.difficulty||0)>=5)tactics.push('极难预约：建议放位前 5 分钟完成登录、人数、日期、过敏信息准备。');
 if(/电话|phone/i.test([...(r.platforms||[]),r.bookingRule].join(' ')))tactics.push('含电话预约：准备日文店名、日期、人数、到店时间和联系电话。');
 if(r.conciergeRecommended)tactics.push('可优先尝试酒店 Concierge 或高端预约平台协助。');
 if(!tactics.length)tactics.push('优先使用官方预约入口，并避开周末晚餐等竞争最高时段。');
 return {release,advance,best,tactics,platforms};
}
function reservationGuideHtml(item){
 const g=reservationAdvice(item);
 return `<div class="guide-row"><span>开放规则</span><strong>${esc(g.release)}</strong></div>
 <div class="guide-row"><span>推荐渠道</span><strong>${esc(g.best)}</strong></div>
 <div class="guide-row"><span>提前准备</span><strong>${esc(g.advance)}</strong></div>
 <div class="guide-tags">${g.platforms.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
 <ul class="guide-list">${g.tactics.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
}
function soloText(item){
 const solo=item.soloDining||{};
 if(solo.available===true)return '可 1 人预约';
 if(solo.available===false&&solo.minGuests)return `公开预约信息显示最少 ${solo.minGuests} 人起。`;
 return '公开来源暂未确认是否接受 1 人预约。';
}
function mannersList(item){
 if(item.tableManners?.notes?.length)return item.tableManners.notes;
 return [
  '准时到店；迟到会影响餐序，建议提前 5-10 分钟抵达。',
  '预约前整理过敏、忌口、同行人数与联系方式，避免临时更改。',
  '避免强烈香水、香氛护手霜或烟味。',
  '拍照前观察店内氛围，避免影响厨师和其他客人。'
 ];
}
function mannersHtml(item){
 return mannersList(item).map(x=>`<li>${esc(x)}</li>`).join('');
}
function heroImageUrl(item){
 return item.heroImage||item.image?.url||item.media?.hero||item.media?.heroImage||'';
}
function detailHeroMediaHtml(item){
 const url=heroImageUrl(item);
 return `<div class="detail-hero-media ${url?'has-image':''}">${url?`<img src="${esc(url)}" alt="${esc(item.nameZh||item.name)} 餐厅照片" loading="lazy" onerror="this.remove();this.parentElement.classList.remove('has-image')">`:''}<span>STARTABLE</span></div>`;
}
function mealTable(items){
 if(!items?.length)return '<div class="content-empty">该餐期暂无公开套餐信息。</div>';
 return `<table><thead><tr><th>套餐</th><th>价格</th><th>内容</th><th>说明</th></tr></thead><tbody>${items.map(x=>`<tr><td>${esc(x.name)}</td><td><strong>${esc(x.price)}</strong></td><td>${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${esc(d)}</li>`).join('')}</ol>`:'待补充'}</td><td>${esc(x.note||'')}</td></tr>`).join('')}</tbody></table>`;
}
function links(item){
 return Object.entries(item.links||{}).filter(([k,v])=>['official','reservation','tabelog','instagram'].includes(k)&&v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join('');
}
function render(item){
 document.title=`${item.nameZh||item.name} | StarTable`;
 const isFav=userState.favorites.has(item.id);
 const mark=userState.marks[item.id];
 $('restaurantDetail').innerHTML=`
 ${detailHeroMediaHtml(item)}
 <section class="restaurant-hero">
  <div class="restaurant-hero-main">
   <div>
    <p class="eyebrow">RESTAURANT DETAIL</p>
    <h1>${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h1>
    <p class="sub">${esc([item.nameJa,item.nameEn,item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</p>
    <div class="source-row">${sourceBadges(item)}</div>
   </div>
   <div class="restaurant-actions">
    <button id="detailFavorite" class="favorite-btn icon-action ${isFav?'active':''}" type="button"><span>${isFav?'♥':'♡'}</span>${isFav?'已收藏':'收藏'}</button>
    <button id="detailWant" class="mark-btn ${mark==='want'?'active':''}" type="button">想摘星</button>
    <button id="detailDone" class="mark-btn ${mark==='done'?'active':''}" type="button">已摘星</button>
   </div>
  </div>
 </section>
 <div class="detail-layout">
  <section class="detail-block detail-block-main">
   <h3>基本信息</h3>
   <dl class="detail-list">
    <div><dt>地址</dt><dd>${esc(item.address||'待补充')}</dd></div>
    <div><dt>电话</dt><dd>${esc(item.phone||'待补充')}</dd></div>
    <div><dt>最近车站</dt><dd class="station-line">${stationHtml(item).replace('最近车站：','')}</dd></div>
    <div><dt>预算</dt><dd>${esc(budgetText(item.budget))}</dd></div>
    <div><dt>Tabelog</dt><dd>${esc(item.ratings?.tabelogScore||'待补充')}</dd></div>
   </dl>
  </section>
  <section class="detail-block">
   <h3>预约信息</h3>
   <p class="detail-lead">${esc(`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`)}</p>
   <p>${esc(item.reservation?.bookingRule||'需预约确认')}</p>
   <div class="reservation-guide">${reservationGuideHtml(item)}</div>
   <a class="reserve" href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">前往官网预约</a>
  </section>
  <section class="detail-block">
   <h3>用餐规则</h3>
   <dl class="detail-list compact">
    <div><dt>Dress Code</dt><dd>${esc(dressText(item.dressCode))}</dd></div>
    <div><dt>儿童政策</dt><dd>${esc(childText(item.childPolicy))}</dd></div>
    <div><dt>Solo dining</dt><dd>${esc(soloText(item))}</dd></div>
   </dl>
   <ul class="manners detail-manners">${mannersHtml(item)}</ul>
  </section>
  <section class="detail-block">
   <h3>链接</h3>
   <div class="link-list">${links(item)}</div>
  </section>
 </div>
 <div class="detail-menu-grid">
  <section class="modal-section"><h3>Lunch Course</h3>${mealTable(item.lunch)}${fieldSource(item,'course')}</section>
  <section class="modal-section"><h3>Dinner Course</h3>${mealTable(item.dinner)}${fieldSource(item,'course')}</section>
 </div>`;
 $('detailFavorite').addEventListener('click',()=>{
  userState.favorites.has(item.id)?userState.favorites.delete(item.id):userState.favorites.add(item.id);
  saveUserState();
  render(item);
 });
 $('detailWant').addEventListener('click',()=>{
  userState.marks[item.id]=userState.marks[item.id]==='want'?undefined:'want';
  if(userState.marks[item.id]===undefined)delete userState.marks[item.id];
  saveUserState();
  render(item);
 });
 $('detailDone').addEventListener('click',()=>{
  userState.marks[item.id]=userState.marks[item.id]==='done'?undefined:'done';
  if(userState.marks[item.id]===undefined)delete userState.marks[item.id];
  saveUserState();
  render(item);
 });
}

async function init(){
 const id=new URLSearchParams(location.search).get('id');
 const data=await fetch('./data/restaurants.json').then(r=>r.json());
 const item=data.find(x=>x.id===id)||data[0];
 render(item);
}
init().catch(e=>{$('restaurantDetail').innerHTML='<div class="empty">餐厅详情加载失败。</div>';console.error(e)});
