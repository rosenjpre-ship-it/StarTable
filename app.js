
const state={data:[],filtered:[],compareExpanded:true,favorites:new Set(JSON.parse(localStorage.getItem('stFavorites')||'[]')),compare:new Set(JSON.parse(localStorage.getItem('stCompare')||'[]'))};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),lunch:$('lunchFilter'),dinner:$('dinnerFilter'),price:$('priceFilter'),dress:$('dressFilter'),child:$('childFilter'),sort:$('sortFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),two:$('twoStarCount'),one:$('oneStarCount'),lastUpdated:$('lastUpdated'),reset:$('resetButton'),listView:$('listViewButton'),mapViewButton:$('mapViewButton'),mapView:$('mapView'),mapCanvas:$('mapCanvas'),mapPanel:$('mapPanel'),compareButton:$('compareButton'),compareBar:$('compareBar'),areaRail:$('areaRail'),empty:$('empty'),theme:$('themeButton'),controls:document.querySelector('.controls'),filterBody:$('filterBody'),toggleFilters:$('toggleFiltersButton'),mobileFilter:$('mobileFilterButton'),modal:$('detailModal'),modalContent:$('modalContent'),modalClose:$('modalClose')};
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
 const mode=els.sort?.value||'location';
 if(mode==='stars')return [...items].sort((a,b)=>b.stars-a.stars||restaurantLocationRank(a)-restaurantLocationRank(b));
 if(mode==='tabelog')return [...items].sort((a,b)=>Number(b.ratings?.tabelogScore||0)-Number(a.ratings?.tabelogScore||0)||restaurantLocationRank(a)-restaurantLocationRank(b));
 if(mode==='priceLunch')return [...items].sort((a,b)=>minMealPrice(a,'lunch')-minMealPrice(b,'lunch')||restaurantLocationRank(a)-restaurantLocationRank(b));
 if(mode==='priceDinner')return [...items].sort((a,b)=>minMealPrice(a,'dinner')-minMealPrice(b,'dinner')||restaurantLocationRank(a)-restaurantLocationRank(b));
 if(mode==='difficulty')return [...items].sort((a,b)=>(b.reservation?.difficulty||0)-(a.reservation?.difficulty||0)||restaurantLocationRank(a)-restaurantLocationRank(b));
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
 const meals=[];
 if(els.lunch.value==='yes')meals.push('lunch');
 if(els.dinner.value==='yes')meals.push('dinner');
 return meals.length?meals:['all'];
}
function availabilityOk(item,meal,value){
 if(!value)return true;
 const available=item.filters?.[`${meal}Available`]??!!(item[meal]&&item[meal].length);
 return value==='yes'?available:!available;
}
function priceFilterOk(item){
 if(!els.price.value)return true;
 return selectedMealTypes().some(meal=>priceOk(item,meal));
}
function savePrefs(){localStorage.setItem('stFavorites',JSON.stringify([...state.favorites]));localStorage.setItem('stCompare',JSON.stringify([...state.compare]))}
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
 return `<h2 class="modal-title">${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h2>
 <div class="modal-meta">${esc([item.nameJa,item.nameEn,item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</div>
 <div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div>
 <div class="modal-grid">
  <section class="panel"><h3>基本信息</h3><p>${esc(item.address)}</p><p>电话：${esc(item.phone||'待补充')}</p><p>${esc(stationText(item))}</p>${fieldSource(item,'basic')}</section>
  <section class="panel"><h3>预约</h3><p>${esc(`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`)}</p><p>${esc(item.reservation?.bookingRule||'需预约确认')}</p><a class="reserve" href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">前往官网预约</a>${fieldSource(item,'reservation')}</section>
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
function stationText(item){
 const stations=[...(item.transport?.stations||[])].sort((a,b)=>(a.walkMinutes??99)-(b.walkMinutes??99)).slice(0,3);
 if(!stations.length)return '最近车站：待补充';
 return `最近车站：${stations.map(s=>`${s.name} 步行${s.walkMinutes}分钟（${s.lines.join(' / ')}）`).join('；')}`;
}
function makeCard(item){
 const f=els.template.content.cloneNode(true),head=f.querySelector('.card-head'),detail=f.querySelector('.detail');
 f.querySelector('.area').textContent=item.areaZh||item.area;f.querySelector('.cuisine').textContent=item.cuisineZh||item.cuisine;
 f.querySelector('.name-zh').textContent=item.nameZh||item.name;
 f.querySelector('.names-secondary').textContent=[item.nameJa,item.nameEn].filter(Boolean).join('｜');
 f.querySelector('.stars').textContent=stars(item.stars);f.querySelector('.address').textContent=item.address||'地址待补充';
 f.querySelector('.phone').textContent=item.phone?`电话：${item.phone}`:'电话待补充';
 f.querySelector('.stations').textContent=stationText(item);
 f.querySelector('.difficulty').textContent=`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`;
 f.querySelector('.booking').textContent=item.reservation?.bookingRule||'需预约确认';
 const reserve=f.querySelector('.reserve');reserve.href=item.links?.reservation||item.links?.official||'#';if(reserve.href.endsWith('#'))reserve.style.display='none';
 f.querySelector('.dress').textContent=dressText(item.dressCode);f.querySelector('.children').textContent=childText(item.childPolicy);
 f.querySelector('.budget').textContent=budgetText(item.budget);
 const chips=f.querySelector('.chips');
 const chipTexts=[`Lunch ${item.lunch?.length||0}`,`Dinner ${item.dinner?.length||0}`,item.dressCode?.required===true?'有 Dress Code':'着装需确认'];
 if((item.reservation?.difficulty||0)>=5)chipTexts.unshift('极难预约');
 if(state.favorites.has(item.id))chipTexts.unshift('已收藏');
  chipTexts.forEach((t,i)=>{const s=document.createElement('span');s.className=i===0&&t==='极难预约'?'chip chip-alert':'chip';s.textContent=t;chips.appendChild(s)});
 const fav=f.querySelector('.favorite-btn'),cmp=f.querySelector('.compare-btn'),details=f.querySelector('.details-btn');
 fav.classList.toggle('active',state.favorites.has(item.id));fav.textContent=state.favorites.has(item.id)?'已收藏':'收藏';
 cmp.classList.toggle('active',state.compare.has(item.id));cmp.textContent=state.compare.has(item.id)?'已加入对比':'加入对比';
 fav.addEventListener('click',()=>{state.favorites.has(item.id)?state.favorites.delete(item.id):state.favorites.add(item.id);savePrefs();render()});
 cmp.addEventListener('click',()=>{state.compare.has(item.id)?state.compare.delete(item.id):(state.compare.size<3&&state.compare.add(item.id));savePrefs();updateCompare();render()});
 details.addEventListener('click',()=>{location.href=`./restaurant.html?id=${encodeURIComponent(item.id)}`});
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
 els.mapPanel.innerHTML=`<h3>${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h3><p>${esc([item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</p><p>${esc(stationText(item))}</p><p>Tabelog：${esc(item.ratings?.tabelogScore||'-')}</p><div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div><div class="link-list"><a href="./restaurant.html?id=${encodeURIComponent(item.id)}">独立详情页</a><a href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">前往官网预约</a></div>`;
}
function updateCompare(){
 const items=[...state.compare].map(id=>state.data.find(x=>x.id===id)).filter(Boolean);
 els.compareButton.textContent=`对比 ${items.length}`;
 els.compareBar.hidden=!items.length||!state.compareExpanded;
 els.compareBar.innerHTML=items.length?`<strong>餐厅对比</strong><div class="compare-grid">${items.map(x=>`<div class="compare-item"><strong>${esc(x.nameZh||x.name)}</strong><br>${stars(x.stars)} ｜ ${esc(x.cuisineZh)}<br>Tabelog：${esc(x.ratings?.tabelogScore||'-')}<br>Lunch：${esc(x.lunch?.[0]?.price||'无')}<br>Dinner：${esc(x.dinner?.[0]?.price||'无')}<br>${esc(stationText(x))}</div>`).join('')}</div>`:'';
}
function render(){els.grid.innerHTML='';state.filtered.forEach(x=>els.grid.appendChild(makeCard(x)));els.visible.textContent=state.filtered.length;els.empty.hidden=state.filtered.length!==0;updateCompare();if(!els.mapView.hidden)renderMap()}
function apply(){
 const q=els.search.value.trim().toLowerCase();
 state.filtered=state.data.filter(x=>{
  const meals=selectedMealTypes().flatMap(meal=>meal==='all'?[...(x.lunch||[]),...(x.dinner||[])]:x[meal]||[]);
  const mealOk=availabilityOk(x,'lunch',els.lunch.value)&&availabilityOk(x,'dinner',els.dinner.value);
 const stationHay=(x.transport?.stations||[]).flatMap(s=>[s.name,...(s.lines||[])]).join(' ');
 const hay=[x.nameZh,x.nameJa,x.nameEn,x.areaZh,x.cuisineZh,x.address,stationHay,...meals.flatMap(c=>[c.name,c.price,c.note,...(c.details||[])])].join(' ').toLowerCase();
  const dressOk=!els.dress.value||filterDressCategory(x)===els.dress.value;
  const childOk=!els.child.value||filterChildCategory(x)===els.child.value;
  return mealOk&&(!q||hay.includes(q))&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||x.areaZh===els.area.value)&&priceFilterOk(x)&&dressOk&&childOk;
 });state.filtered=sortRestaurants(state.filtered);render()
}
async function init(){
 const res=await fetch('./data/restaurants.json');state.data=sortRestaurants(await res.json());state.filtered=[...state.data];
 els.total.textContent=state.data.length;els.three.textContent=state.data.filter(x=>x.stars===3).length;els.two.textContent=state.data.filter(x=>x.stars===2).length;els.one.textContent=state.data.filter(x=>x.stars===1).length;
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh).filter(Boolean)));
 addOptions(els.area,new Set(state.data.map(x=>x.areaZh).filter(Boolean)),(a,b)=>locationRankText(a)-locationRankText(b)||a.localeCompare(b,'zh'));
 els.lastUpdated.textContent=state.data.map(x=>x.sync?.lastChecked).filter(Boolean).sort().at(-1)||'2026-08-02';
 const areas=[...new Set(state.data.map(x=>x.areaZh).filter(Boolean))].sort((a,b)=>locationRankText(a)-locationRankText(b)||a.localeCompare(b,'zh'));
 els.areaRail.innerHTML=`<button class="area-pill active" data-area="">全部区域</button>`+areas.map(a=>`<button class="area-pill" data-area="${esc(a)}">${esc(a)}</button>`).join('');
 els.areaRail.addEventListener('click',e=>{const btn=e.target.closest('.area-pill');if(!btn)return;els.area.value=btn.dataset.area;document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x===btn));apply()});
 render()
}
[els.search,els.star,els.cuisine,els.area,els.lunch,els.dinner,els.price,els.dress,els.child,els.sort].forEach(el=>el.addEventListener('input',()=>{if(el===els.area)document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===els.area.value));apply()}));
els.reset.addEventListener('click',()=>{[els.search,els.star,els.cuisine,els.area,els.lunch,els.dinner,els.price,els.dress,els.child].forEach(x=>x.value='');els.sort.value='location';document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===''));apply()});
els.theme.addEventListener('click',()=>document.body.classList.toggle('dark'));
els.toggleFilters.addEventListener('click',()=>{const collapsed=els.controls.classList.toggle('filters-collapsed');els.filterBody.hidden=collapsed;els.toggleFilters.textContent=collapsed?'展开筛选':'收起筛选'});
els.mobileFilter.addEventListener('click',()=>{els.controls.classList.remove('filters-collapsed');els.filterBody.hidden=false;els.toggleFilters.textContent='收起筛选';els.controls.scrollIntoView({behavior:'smooth',block:'start'})});
els.modalClose.addEventListener('click',()=>els.modal.close());
els.compareButton.addEventListener('click',()=>{state.compareExpanded=!state.compareExpanded;updateCompare()});
els.listView.addEventListener('click',()=>{els.grid.hidden=false;els.mapView.hidden=true;els.listView.classList.add('active');els.mapViewButton.classList.remove('active')});
els.mapViewButton.addEventListener('click',()=>{els.grid.hidden=true;els.mapView.hidden=false;els.mapViewButton.classList.add('active');els.listView.classList.remove('active');renderMap()});
init().catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e)});
