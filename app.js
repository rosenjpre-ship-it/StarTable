
const activeUser=localStorage.getItem('stUser')||'guest';
const prefKey=name=>`st:${activeUser}:${name}`;
const state={data:[],filtered:[],meal:'all',user:activeUser,compareExpanded:true,accountExpanded:false,favorites:new Set(JSON.parse(localStorage.getItem(prefKey('favorites'))||'[]')),marks:JSON.parse(localStorage.getItem(prefKey('marks'))||'{}'),compare:new Set(JSON.parse(localStorage.getItem(prefKey('compare'))||'[]'))};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),mealButtons:[...document.querySelectorAll('.meal-btn')],price:$('priceFilter'),dress:$('dressFilter'),child:$('childFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),two:$('twoStarCount'),one:$('oneStarCount'),lastUpdated:$('lastUpdated'),reset:$('resetButton'),accountPanel:$('accountPanel'),areaRail:$('areaRail'),empty:$('empty'),theme:$('themeButton'),loginButton:$('loginButton'),loginModal:$('loginModal'),loginClose:$('loginClose'),loginName:$('loginName'),loginSubmit:$('loginSubmit'),controls:document.querySelector('.controls'),filterBody:$('filterBody'),toggleFilters:$('toggleFiltersButton'),mobileFilter:$('mobileFilterButton'),modal:$('detailModal'),modalContent:$('modalContent'),modalClose:$('modalClose')};
const stars=n=>'★'.repeat(n);const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const priceRanges={
 'under-10000':[0,10000],
 '10000-20000':[10000,20000],
 '20000-30000':[20000,30000],
 '30000-40000':[30000,40000],
 '40000-50000':[40000,50000],
 '50000-plus':[50000,Infinity]
};
const locationOrder=[
 '大手町','丸之内','东京','日本桥','三越前','茅场町','人形町','馬喰町','馬喰横山','神保町','京桥','银座一丁目','银座','东银座','新富町','筑地','日比谷','有乐町','新桥',
 '虎之门','虎之门Hills','神谷町','爱宕','赤坂','永田町','纪尾井町','六本木一丁目','六本木','乃木坂','西麻布',
 '麻布十番','东麻布','赤羽桥','芝公园','三田','白金高轮','白金台','广尾','惠比寿','代官山','中目黑','目黑','都立大学',
 '青山一丁目','外苑前','南青山','表参道','明治神宫前','神宫前','北参道','涩谷',
 '新宿','幡谷','四谷三丁目','荒木町','饭田桥','神乐坂','牛込神乐坂',
 '浅草','品川','经堂'
];
const stationCoords={
 '大手町':[52,36],'丸之内':[50,39],'东京':[52,40],'日本桥':[58,39],'三越前':[57,37],'茅场町':[62,43],'人形町':[65,41],'馬喰町':[68,40],'馬喰横山':[69,41],'神保町':[48,29],
 '京桥':[54,43],'银座一丁目':[52,47],'银座':[50,49],'东银座':[53,50],'新富町':[57,50],'筑地':[58,53],'日比谷':[47,46],'有乐町':[49,45],'新桥':[48,53],
 '虎之门':[43,50],'虎之门Hills':[42,49],'神谷町':[40,55],'爱宕':[42,54],'赤坂':[34,47],'永田町':[36,43],'纪尾井町':[36,40],'六本木一丁目':[34,53],'六本木':[31,56],'乃木坂':[29,53],'西麻布':[27,58],
 '麻布十番':[34,62],'东麻布':[38,61],'赤羽桥':[39,64],'芝公园':[42,65],'三田':[45,70],'白金高轮':[39,72],'白金台':[36,77],'广尾':[28,66],'惠比寿':[25,75],'代官山':[20,77],'中目黑':[18,82],'目黑':[30,84],'都立大学':[13,90],
 '青山一丁目':[29,48],'外苑前':[25,49],'南青山':[24,52],'表参道':[21,55],'明治神宫前':[17,56],'神宫前':[19,53],'北参道':[18,46],'涩谷':[16,64],
 '新宿':[16,35],'幡谷':[11,37],'四谷三丁目':[27,34],'荒木町':[28,35],'饭田桥':[43,24],'神乐坂':[39,24],'牛込神乐坂':[37,25],
 '浅草':[77,28],'品川':[48,86],'经堂':[5,70]
};
const areaCoords={'银座':[51,49],'丸之内':[50,39],'日本桥':[58,39],'日比谷':[47,46],'虎之门':[42,50],'赤坂':[34,47],'六本木':[31,56],'麻布十番':[34,62],'西麻布':[27,58],'南青山':[24,52],'神宫前':[19,53],'惠比寿':[25,75],'神乐坂':[39,24],'浅草':[77,28],'品川':[48,86]};
function locationRankText(text){
 const value=String(text||'');
 const matched=locationOrder
  .map((name,index)=>({name,index}))
  .filter(x=>value.includes(x.name))
  .sort((a,b)=>b.name.length-a.name.length||a.index-b.index)[0];
 return matched?matched.index:999;
}
function restaurantLocationRank(item){
 const stationText=(item.transport?.stations||[]).map(s=>s.name).join(' ');
 const stationRank=locationRankText(stationText);
 if(stationRank<999)return stationRank;
 const areaRank=item.areaZh&&item.areaZh!=='东京'?locationRankText(item.areaZh):999;
 return Math.min(areaRank,locationRankText(item.address));
}
function mapPoint(item){
 const stations=item.transport?.stations||[];
 for(const station of stations){
  const key=Object.keys(stationCoords).find(name=>String(station.name).includes(name));
  if(key)return stationCoords[key];
 }
 const areaKey=Object.keys(areaCoords).find(name=>String(item.areaZh).includes(name));
 return areaKey?areaCoords[areaKey]:[52,52];
}
function sortRestaurants(items){
 return [...items].sort((a,b)=>
  restaurantLocationRank(a)-restaurantLocationRank(b)||
  (a.areaZh||'').localeCompare(b.areaZh||'','zh')||
  (a.transport?.stations?.[0]?.name||'').localeCompare(b.transport?.stations?.[0]?.name||'','zh')||
  (a.nameZh||a.name||'').localeCompare(b.nameZh||b.name||'','zh')
 );
}
function minMealPrice(item,meal){const values=itemPrices(item,meal);return values.length?Math.min(...values):999999999}
function addOptions(el,vals,sorter){[...vals].sort(sorter||undefined).forEach(v=>el.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`))}
function parsePrice(value){
 if(typeof value==='number')return value;
 if(!value)return null;
 const text=String(value).replace(/[０-９]/g,d=>'０１２３４５６７８９'.indexOf(d)).replace(/[,，]/g,'');
 const match=text.match(/(\d+)\s*(万)?/);
 if(!match)return null;
 const amount=Number(match[1])*(match[2]?10000:1);
 return Number.isFinite(amount)?amount:null;
}
function itemPrices(item,mealType){
 const values=[];
 const courses=mealType==='lunch'?(item.lunch||[]):mealType==='dinner'?(item.dinner||[]):[...(item.lunch||[]),...(item.dinner||[])];
 const budgetValues=mealType==='lunch'?[item.budget?.lunchFrom]:mealType==='dinner'?[item.budget?.dinnerFrom]:[item.budget?.lunchFrom,item.budget?.dinnerFrom];
 budgetValues.forEach(v=>{const n=parsePrice(v);if(n!=null)values.push(n)});
 courses.forEach(course=>{const n=parsePrice(course.price);if(n!=null)values.push(n)});
 return values;
}
function priceOk(item,mealType){
 if(!els.price.value)return true;
 const field=mealType==='lunch'?'lunchPriceTiers':mealType==='dinner'?'dinnerPriceTiers':'priceTiers';
 if(item.filters?.[field])return item.filters[field].includes(els.price.value);
 const [min,max]=priceRanges[els.price.value]||[0,Infinity];
 return itemPrices(item,mealType).some(price=>price>=min&&price<max);
}
function selectedMealTypes(){
 return state.meal==='all'?['all']:[state.meal];
}
function availabilityOk(item,meal){
 const available=item.filters?.[`${meal}Available`]??!!(item[meal]&&item[meal].length);
 return available;
}
function priceFilterOk(item){
 if(!els.price.value)return true;
 return selectedMealTypes().some(meal=>priceOk(item,meal));
}
function savePrefs(){localStorage.setItem(prefKey('favorites'),JSON.stringify([...state.favorites]));localStorage.setItem(prefKey('marks'),JSON.stringify(state.marks));localStorage.setItem(prefKey('compare'),JSON.stringify([...state.compare]))}
function setMark(id,status){
 if(state.marks[id]===status)delete state.marks[id];
 else state.marks[id]=status;
 savePrefs();
 render();
}
function setUser(name){
 const next=(name||'guest').trim()||'guest';
 localStorage.setItem('stUser',next);
 location.reload();
}
function setTheme(mode){
 const isDark=mode==='dark';
 document.body.classList.toggle('dark',isDark);
 if(els.theme)els.theme.textContent=isDark?'浅色模式':'深色模式';
 localStorage.setItem('stTheme',isDark?'dark':'light');
}
function sourceBadges(item){
 const badges=[];
 if(item.sync?.source)badges.push(`来源：公开官网/预约页/Tabelog`);
 if(item.sync?.lastChecked)badges.push(`检查：${item.sync.lastChecked}`);
 if(item.dressCode?.publicInfoStatus==='not explicitly published')badges.push('着装需预约确认');
 if(item.childPolicy?.publicInfoStatus==='not explicitly published')badges.push('儿童政策需预约确认');
 return badges;
}
function fieldSource(item,field){
 const checked=item.sync?.lastChecked||item.transport?.lastChecked||'2026-08-02';
 const map={basic:'官网 / Tabelog / 预约页',transport:'地址与车站公开信息',reservation:'官网 / 预约页',course:'官网 / 预约页 / Tabelog',rating:'Tabelog',policy:'官网 / 预约页'};
 return `<span class="field-source">${esc(map[field]||'公开来源')} · ${esc(checked)}</span>`;
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
function heroImageUrl(item){
 return item.heroImage||item.image?.url||item.media?.hero||item.media?.heroImage||'';
}
function imageFallbackHtml(){
 return '<div class="media-fallback"><span>STARTABLE</span></div>';
}
function applyHeroImage(el,item){
 const url=heroImageUrl(item);
 if(!el)return;
 if(url){
  el.style.backgroundImage='';
  el.classList.add('has-image');
  el.innerHTML=`<img src="${esc(url)}" alt="${esc(item.nameZh||item.name)} 餐厅照片" loading="lazy">${imageFallbackHtml()}`;
  const img=el.querySelector('img');
  img.addEventListener('error',()=>{el.classList.remove('has-image');img.remove()},{once:true});
 }else{
  el.classList.remove('has-image');
  el.innerHTML=imageFallbackHtml();
 }
}
function detailHeroMediaHtml(item){
 const url=heroImageUrl(item);
 return `<div class="detail-hero-media ${url?'has-image':''}">${url?`<img src="${esc(url)}" alt="${esc(item.nameZh||item.name)} 餐厅照片" loading="lazy" onerror="this.remove();this.parentElement.classList.remove('has-image')">`:''}<span>STARTABLE</span></div>`;
}
function mealTable(items){
 if(!items?.length)return '<div class="content-empty">该餐期的 Course 与价格尚未逐店核验。</div>';
 return `<table><thead><tr><th>Course</th><th>价格</th><th>内容</th><th>说明</th></tr></thead><tbody>${items.map(x=>`<tr><td>${x.name}</td><td><strong>${x.price}</strong></td><td>${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${d}</li>`).join('')}</ol>`:'待补充'}</td><td>${x.note||''}</td></tr>`).join('')}</tbody></table>`;
}
function tabContent(item,tab){
 if(tab==='lunch'||tab==='dinner')return mealTable(item[tab]);
 if(tab==='pairings')return item.pairings?.length?mealTable(item.pairings):'<div class="content-empty">Pairing 信息待补充。</div>';
 if(tab==='ratings'){
  const r=item.ratings||{};
  const tabelog=r.tabelogScore?`${r.tabelogScore}${r.tabelogUrl?` <a href="${r.tabelogUrl}" target="_blank" rel="noopener">Tabelog</a>`:''}`:'待补充';
  return `<div class="content-empty">Tabelog：${tabelog}</div>`;
 }
 if(tab==='links'){
  const allowed=new Set(['official','reservation','tabelog','instagram']);
  const entries=Object.entries(item.links||{}).filter(([k,v])=>allowed.has(k)&&v);
  return entries.length?`<div class="link-list">${entries.map(([k,v])=>`<a href="${v}" target="_blank" rel="noopener">${k}</a>`).join('')}</div>`:'<div class="content-empty">链接待补充。</div>';
 }
}
function fullDetail(item){
 const links=Object.entries(item.links||{}).filter(([k,v])=>['official','reservation','tabelog','instagram'].includes(k)&&v).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join('');
 return `${detailHeroMediaHtml(item)}
 <h2 class="modal-title">${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h2>
 <div class="modal-meta">${esc([item.nameJa,item.nameEn,item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</div>
 <div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div>
 <div class="modal-grid">
  <section class="panel"><h3>基本信息</h3><p>${esc(item.address)}</p><p>电话：${esc(item.phone||'待补充')}</p><p class="station-line">${stationHtml(item)}</p>${fieldSource(item,'basic')}</section>
  <section class="panel"><h3>预约助手</h3><p>${esc(`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`)}</p><p>${esc(item.reservation?.bookingRule||'需预约确认')}</p><div class="reservation-guide">${reservationGuideHtml(item)}</div><a class="reserve" href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">前往官网预约</a>${fieldSource(item,'reservation')}</section>
  <section class="panel"><h3>Dress Code</h3><p>${esc(dressText(item.dressCode))}</p>${fieldSource(item,'policy')}</section>
  <section class="panel"><h3>儿童政策</h3><p>${esc(childText(item.childPolicy))}</p>${fieldSource(item,'policy')}</section>
 </div>
 <section class="modal-section"><h3>Lunch Course</h3>${tabContent(item,'lunch')}</section>
 <section class="modal-section"><h3>Dinner Course</h3>${tabContent(item,'dinner')}</section>
 <section class="modal-section"><h3>评分与链接</h3>${tabContent(item,'ratings')}<div class="link-list">${links}</div></section>`;
}
function childText(p){
 if(!p||p.verified===false)return '需预约确认';
 if(p.publicInfoStatus==='not explicitly published')return p.notes||'公开来源未明确；需预约确认。';
 if(p.minimumAge!=null)return `可；最低年龄 ${p.minimumAge}岁${p.notes?'；'+p.notes:''}`;
 if(p.diningRoomAllowed)return `大厅可；最低年龄 ${p.minimumAge??'未注明'}`;
 if(p.privateRoomAllowed)return `仅包厢可；最低年龄 ${p.minimumAge??'未注明'}`;
 return '不可带儿童';
}
function childCategory(p){
 if(!p||p.verified===false||p.verified==null)return 'pending';
 if(p.privateRoomAllowed===true&&p.diningRoomAllowed!==true)return 'private';
 if(p.diningRoomAllowed===false&&p.privateRoomAllowed===false)return 'no';
 if(p.diningRoomAllowed===true||p.minimumAge!=null)return 'yes';
 const note=p.notes||'';
 if(/仅可使用包厢|仅限包间|仅包厢/.test(note))return 'private';
 if(/儿童可|可入店|可预约|可申请|欢迎|可享用/.test(note))return 'yes';
 return 'pending';
}
function filterChildCategory(item){return item.filters?.childCategory||childCategory(item.childPolicy)}
function filterDressCategory(item){
 if(item.filters?.dressCategory)return item.filters.dressCategory;
 const d=item.dressCode;
 if(!d||d.required==null||d.verified===false)return 'pending';
 return d.required===true?'required':'none';
}
function dressText(d){
 if(!d||d.level==='待核验')return '需预约确认';
 return `${d.level}${d.notes?.length?'；'+d.notes.join('；'):''}`;
}
function budgetText(b){
 if(!b||b.verified===false)return '需预约确认';
 return `Lunch ¥${b.lunchFrom??'-'} 起；Dinner ¥${b.dinnerFrom??'-'} 起`;
}
function conceptSlogan(item){
 if(item.concept?.slogan)return item.concept.slogan;
 if(item.concept?.text)return item.concept.text;
 const cuisine=item.cuisineZh||item.cuisine||'料理';
 return `以${cuisine}为核心，呈现季节食材与餐厅个性。`;
}
function conceptText(item){
 return item.concept?.text||conceptSlogan(item);
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
function displayArea(item){
 if(item.areaZh&&item.areaZh!=='东京')return item.areaZh;
 const station=item.transport?.stations?.[0]?.name;
 if(station==='东京')return '东京站';
 return station||'东京';
}
function normalizeSearch(value){
 return String(value||'')
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[\s·・|｜/／,，.。'’"“”()（）\\-ー_]/g,'');
}
function nameSearchText(item){
 return normalizeSearch([item.nameZh,item.nameJa,item.nameEn,item.name,item.id].filter(Boolean).join(' '));
}
function nameMatches(item,query){
 const q=normalizeSearch(query);
 if(!q)return true;
 const hay=nameSearchText(item);
 return hay.includes(q)||[...q].every(char=>hay.includes(char));
}
function makeCard(item){
 const f=els.template.content.cloneNode(true),head=f.querySelector('.card-head'),detail=f.querySelector('.detail');
 applyHeroImage(f.querySelector('.card-media'),item);
 f.querySelector('.area').textContent=displayArea(item);f.querySelector('.cuisine').textContent=item.cuisineZh||item.cuisine;
 f.querySelector('.name-zh').textContent=item.nameZh||item.name;
 f.querySelector('.names-secondary').textContent=[item.nameJa,item.nameEn].filter(Boolean).join('｜');
 f.querySelector('.concept-line').textContent=conceptSlogan(item);
 f.querySelector('.stars').textContent=stars(item.stars);f.querySelector('.address').textContent=item.address||'地址待补充';
 f.querySelector('.concept').textContent=conceptText(item);
 f.querySelector('.phone').textContent=item.phone?`电话：${item.phone}`:'电话待补充';
 f.querySelector('.stations').innerHTML=stationHtml(item);
 f.querySelector('.difficulty').textContent=`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`;
 f.querySelector('.booking').textContent=item.reservation?.bookingRule||'需预约确认';
 f.querySelector('.reservation-guide').innerHTML=reservationGuideHtml(item);
 const reserve=f.querySelector('.reserve');reserve.href=item.links?.reservation||item.links?.official||'#';if(reserve.href.endsWith('#'))reserve.style.display='none';
 f.querySelector('.dress').textContent=dressText(item.dressCode);f.querySelector('.children').textContent=childText(item.childPolicy);
 f.querySelector('.budget').textContent=budgetText(item.budget);
 const chips=f.querySelector('.chips');
 const chipTexts=[`Lunch ${item.lunch?.length||0}`,`Dinner ${item.dinner?.length||0}`,item.dressCode?.required===true?'有 Dress Code':'着装需确认'];
 if((item.reservation?.difficulty||0)>=5)chipTexts.unshift('极难预约');
 if(state.favorites.has(item.id))chipTexts.unshift('已收藏');
 if(state.marks[item.id]==='want')chipTexts.unshift('想摘星');
 if(state.marks[item.id]==='done')chipTexts.unshift('已摘星');
  chipTexts.forEach((t,i)=>{const s=document.createElement('span');s.className=i===0&&t==='极难预约'?'chip chip-alert':'chip';s.textContent=t;chips.appendChild(s)});
 const fav=f.querySelector('.favorite-btn'),want=f.querySelector('.want-btn'),done=f.querySelector('.done-btn');
 fav.classList.toggle('active',state.favorites.has(item.id));fav.innerHTML=state.favorites.has(item.id)?'<span>♥</span>已收藏':'<span>♡</span>收藏';
 want.classList.toggle('active',state.marks[item.id]==='want');
 done.classList.toggle('active',state.marks[item.id]==='done');
 fav.addEventListener('click',()=>{state.favorites.has(item.id)?state.favorites.delete(item.id):state.favorites.add(item.id);savePrefs();render()});
 want.addEventListener('click',()=>setMark(item.id,'want'));
 done.addEventListener('click',()=>setMark(item.id,'done'));
 const area=f.querySelector('.content-area');area.innerHTML=tabContent(item,'lunch');
 const tabs=[...f.querySelectorAll('.local-btn')];tabs.forEach(btn=>btn.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));btn.classList.add('active');area.innerHTML=tabContent(item,btn.dataset.tab)}));
 head.addEventListener('click',()=>{const open=head.getAttribute('aria-expanded')==='true';head.setAttribute('aria-expanded',String(!open));detail.hidden=open});
 return f;
}
function openDetail(item){els.modalContent.innerHTML=fullDetail(item);els.modal.showModal()}
function renderMap(){
 els.mapCanvas.innerHTML='<span class="map-label" style="left:52%;top:40%">东京 / 丸之内</span><span class="map-label" style="left:51%;top:49%">银座</span><span class="map-label" style="left:31%;top:56%">六本木</span><span class="map-label" style="left:21%;top:55%">表参道</span><span class="map-label" style="left:39%;top:24%">神乐坂</span>';
 const selected=state.filtered[0];
 state.filtered.forEach(item=>{
  const [x,y]=mapPoint(item);
  const pin=document.createElement('button');
  pin.className=`map-pin star-${item.stars}`;
  pin.style.left=`${x}%`;pin.style.top=`${y}%`;
  pin.title=item.nameZh||item.name;
  pin.addEventListener('click',()=>showMapItem(item,pin));
  els.mapCanvas.appendChild(pin);
 });
 if(selected)showMapItem(selected,els.mapCanvas.querySelector('.map-pin'));
}
function showMapItem(item,pin){
 document.querySelectorAll('.map-pin').forEach(x=>x.classList.remove('active'));
 pin?.classList.add('active');
 els.mapPanel.innerHTML=`<h3>${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h3><p>${esc([item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</p><p>${esc(stationText(item))}</p><p>Tabelog：${esc(item.ratings?.tabelogScore||'-')}</p><div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div><div class="link-list"><a href="./restaurant.html?id=${encodeURIComponent(item.id)}">查看餐厅</a><a href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">前往官网预约</a></div>`;
}
function updateCompare(){}
function updateAccount(){
 els.loginButton.textContent=state.user==='guest'?'Log in':`我的星宴`;
 document.body.classList.toggle('account-mode',state.accountExpanded);
 const favs=[...state.favorites].map(id=>state.data.find(x=>x.id===id)).filter(Boolean);
 const wants=Object.entries(state.marks).filter(([,v])=>v==='want').map(([id])=>state.data.find(x=>x.id===id)).filter(Boolean);
 const dones=Object.entries(state.marks).filter(([,v])=>v==='done').map(([id])=>state.data.find(x=>x.id===id)).filter(Boolean);
 els.accountPanel.hidden=!state.accountExpanded;
 if(!state.accountExpanded)return;
 const list=items=>items.length?`<div class="account-list">${items.map(x=>`<a href="./restaurant.html?id=${encodeURIComponent(x.id)}"><strong>${esc(x.nameZh||x.name)}</strong><span>${stars(x.stars)} · ${esc(displayArea(x))}</span></a>`).join('')}</div>`:'<div class="account-empty">暂无餐厅。</div>';
 els.accountPanel.innerHTML=`<div class="account-head"><div><p class="eyebrow">MY PAGE</p><strong>我的星宴</strong><span>${esc(state.user==='guest'?'访客':state.user)}</span></div><div class="account-actions"><button id="accountBackButton" class="ghost">返回餐厅列表</button><button id="logoutButton" class="ghost">退出登录</button></div></div><div class="account-summary"><span>已摘星 <strong>${dones.length}</strong></span><span>想摘星 <strong>${wants.length}</strong></span><span>收藏 <strong>${favs.length}</strong></span></div><div class="account-sections"><section><h3>已摘星</h3>${list(dones)}</section><section><h3>想摘星</h3>${list(wants)}</section><section><h3>收藏</h3>${list(favs)}</section></div>`;
 $('accountBackButton')?.addEventListener('click',()=>{state.accountExpanded=false;updateAccount();window.scrollTo({top:0,behavior:'smooth'})});
 $('logoutButton')?.addEventListener('click',()=>setUser('guest'));
}
function render(){els.grid.innerHTML='';state.filtered.forEach(x=>els.grid.appendChild(makeCard(x)));els.visible.textContent=state.filtered.length;els.empty.hidden=state.filtered.length!==0;updateCompare();updateAccount()}
function apply(){
 const q=els.search.value.trim();
 state.filtered=state.data.filter(x=>{
  const mealOk=state.meal==='all'||availabilityOk(x,state.meal);
  const dressOk=!els.dress.value||filterDressCategory(x)===els.dress.value;
  const childOk=!els.child.value||filterChildCategory(x)===els.child.value;
  return mealOk&&nameMatches(x,q)&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||displayArea(x)===els.area.value)&&priceFilterOk(x)&&dressOk&&childOk;
 });state.filtered=sortRestaurants(state.filtered);render()
}
async function init(){
 const res=await fetch('./data/restaurants.json');state.data=sortRestaurants(await res.json());state.filtered=[...state.data];
 els.total.textContent=state.data.length;els.three.textContent=state.data.filter(x=>x.stars===3).length;els.two.textContent=state.data.filter(x=>x.stars===2).length;els.one.textContent=state.data.filter(x=>x.stars===1).length;
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh).filter(Boolean)));
 addOptions(els.area,new Set(state.data.map(displayArea).filter(Boolean)),(a,b)=>locationRankText(a)-locationRankText(b)||a.localeCompare(b,'zh'));
 els.lastUpdated.textContent=state.data.map(x=>x.sync?.lastChecked).filter(Boolean).sort().at(-1)||'2026-08-02';
 const areas=[...new Set(state.data.map(displayArea).filter(Boolean))].sort((a,b)=>locationRankText(a)-locationRankText(b)||a.localeCompare(b,'zh'));
 els.areaRail.innerHTML=`<button class="area-pill active" data-area="">全部区域</button>`+areas.map(a=>`<button class="area-pill" data-area="${esc(a)}">${esc(a)}</button>`).join('');
 els.areaRail.addEventListener('click',e=>{const btn=e.target.closest('.area-pill');if(!btn)return;els.area.value=btn.dataset.area;document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x===btn));apply()});
 render()
}
[els.search,els.star,els.cuisine,els.area,els.price,els.dress,els.child].filter(Boolean).forEach(el=>el.addEventListener('input',()=>{if(el===els.area)document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===els.area.value));apply()}));
['keyup','search','compositionend'].forEach(type=>els.search?.addEventListener(type,apply));
els.mealButtons.forEach(btn=>btn.addEventListener('click',()=>{
 state.meal=state.meal===btn.dataset.meal?'all':btn.dataset.meal;
 els.mealButtons.forEach(x=>x.classList.toggle('active',state.meal===x.dataset.meal));
 apply();
}));
els.reset.addEventListener('click',()=>{[els.search,els.star,els.cuisine,els.area,els.price,els.dress,els.child].forEach(x=>x.value='');state.meal='all';els.mealButtons.forEach(x=>x.classList.remove('active'));document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===''));apply()});
setTheme(localStorage.getItem('stTheme')==='dark'?'dark':'light');
els.theme.addEventListener('click',()=>setTheme(document.body.classList.contains('dark')?'light':'dark'));
els.toggleFilters.addEventListener('click',()=>{const collapsed=els.controls.classList.toggle('filters-collapsed');els.filterBody.hidden=collapsed;els.toggleFilters.textContent=collapsed?'展开筛选':'收起筛选'});
els.mobileFilter.addEventListener('click',()=>{els.controls.classList.remove('filters-collapsed');els.filterBody.hidden=false;els.toggleFilters.textContent='收起筛选';els.controls.scrollIntoView({behavior:'smooth',block:'start'})});
els.modalClose.addEventListener('click',()=>els.modal.close());
els.loginButton.addEventListener('click',()=>{if(state.user==='guest'){els.loginModal.showModal()}else{state.accountExpanded=true;updateAccount();els.accountPanel.scrollIntoView({behavior:'smooth',block:'start'})}});
els.loginClose.addEventListener('click',()=>els.loginModal.close());
els.loginSubmit.addEventListener('click',()=>setUser(els.loginName.value));
init().catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e)});
