
const state={data:[],filtered:[],meal:'all'};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),price:$('priceFilter'),dress:$('dressFilter'),child:$('childFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),two:$('twoStarCount'),one:$('oneStarCount'),reset:$('resetButton'),empty:$('empty'),theme:$('themeButton'),controls:document.querySelector('.controls'),filterBody:$('filterBody'),toggleFilters:$('toggleFiltersButton')};
const stars=n=>'★'.repeat(n);const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const priceRanges={
 'under-10000':[0,10000],
 '10000-20000':[10000,20000],
 '20000-30000':[20000,30000],
 '30000-40000':[30000,40000],
 '40000-50000':[40000,50000],
 '50000-plus':[50000,Infinity]
};
function addOptions(el,vals){[...vals].sort().forEach(v=>el.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`))}
function parsePrice(value){
 if(typeof value==='number')return value;
 if(!value)return null;
 const text=String(value).replace(/[０-９]/g,d=>'０１２３４５６７８９'.indexOf(d)).replace(/[,，]/g,'');
 const match=text.match(/(\d+)\s*(万)?/);
 if(!match)return null;
 const amount=Number(match[1])*(match[2]?10000:1);
 return Number.isFinite(amount)?amount:null;
}
function itemPrices(item,meals){
 const values=[];
 [item.budget?.lunchFrom,item.budget?.dinnerFrom].forEach(v=>{const n=parsePrice(v);if(n!=null)values.push(n)});
 meals.forEach(course=>{const n=parsePrice(course.price);if(n!=null)values.push(n)});
 return values;
}
function priceOk(item,meals){
 if(!els.price.value)return true;
 const [min,max]=priceRanges[els.price.value]||[0,Infinity];
 return itemPrices(item,meals).some(price=>price>=min&&price<max);
}
function mealTable(items){
 if(!items?.length)return '<div class="content-empty">该餐期的 Course 与价格尚未逐店核验。</div>';
 return `<table><thead><tr><th>Course</th><th>价格</th><th>内容</th><th>说明</th></tr></thead><tbody>${items.map(x=>`<tr><td>${x.name}</td><td><strong>${x.price}</strong></td><td>${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${d}</li>`).join('')}</ol>`:'待补充'}</td><td>${x.note||''}</td></tr>`).join('')}</tbody></table>`;
}
function tabContent(item,tab){
 if(tab==='lunch'||tab==='dinner')return mealTable(item[tab]);
 if(tab==='pairings')return item.pairings?.length?mealTable(item.pairings):'<div class="content-empty">Pairing 信息待核验。</div>';
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
function childText(p){
 if(!p||p.verified===false)return '待核验';
 if(p.diningRoomAllowed)return `大厅可；最低年龄 ${p.minimumAge??'未注明'}`;
 if(p.privateRoomAllowed)return `仅包厢可；最低年龄 ${p.minimumAge??'未注明'}`;
 return '不可带儿童';
}
function dressText(d){
 if(!d||d.level==='待核验')return '待核验';
 return `${d.level}${d.notes?.length?'；'+d.notes.join('；'):''}`;
}
function budgetText(b){
 if(!b||b.verified===false)return '待核验';
 return `Lunch ¥${b.lunchFrom??'-'} 起；Dinner ¥${b.dinnerFrom??'-'} 起`;
}
function stationText(item){
 const stations=[...(item.transport?.stations||[])].sort((a,b)=>(a.walkMinutes??99)-(b.walkMinutes??99)).slice(0,3);
 if(!stations.length)return '最近车站：待补充';
 return `最近车站：${stations.map(s=>`${s.name}（${s.lines.join(' / ')}，步行${s.walkMinutes}分钟）`).join('；')}`;
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
 f.querySelector('.booking').textContent=item.reservation?.bookingRule||'待核验';
 const reserve=f.querySelector('.reserve');reserve.href=item.links?.reservation||item.links?.official||'#';if(reserve.href.endsWith('#'))reserve.style.display='none';
 f.querySelector('.dress').textContent=dressText(item.dressCode);f.querySelector('.children').textContent=childText(item.childPolicy);
 f.querySelector('.budget').textContent=budgetText(item.budget);
 const chips=f.querySelector('.chips');
 const chipTexts=[`Lunch ${item.lunch?.length||0}`,`Dinner ${item.dinner?.length||0}`,item.dressCode?.required===true?'有 Dress Code':'着装待核验'];
 if((item.reservation?.difficulty||0)>=5)chipTexts.unshift('极难预约');
 chipTexts.forEach((t,i)=>{const s=document.createElement('span');s.className=i===0&&t==='极难预约'?'chip chip-alert':'chip';s.textContent=t;chips.appendChild(s)});
 const area=f.querySelector('.content-area');area.innerHTML=tabContent(item,'lunch');
 const tabs=[...f.querySelectorAll('.local-btn')];tabs.forEach(btn=>btn.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));btn.classList.add('active');area.innerHTML=tabContent(item,btn.dataset.tab)}));
 head.addEventListener('click',()=>{const open=head.getAttribute('aria-expanded')==='true';head.setAttribute('aria-expanded',String(!open));detail.hidden=open});
 return f;
}
function render(){els.grid.innerHTML='';state.filtered.forEach(x=>els.grid.appendChild(makeCard(x)));els.visible.textContent=state.filtered.length;els.empty.hidden=state.filtered.length!==0}
function apply(){
 const q=els.search.value.trim().toLowerCase();
 state.filtered=state.data.filter(x=>{
  const meals=state.meal==='all'?[...(x.lunch||[]),...(x.dinner||[])]:x[state.meal]||[];
  const mealOk=state.meal==='all'||meals.length>0;
  const hay=[x.nameZh,x.nameJa,x.nameEn,x.areaZh,x.cuisineZh,x.address,...meals.flatMap(c=>[c.name,c.price,c.note])].join(' ').toLowerCase();
  const dressOk=!els.dress.value||(els.dress.value==='required'&&x.dressCode?.required===true)||(els.dress.value==='none'&&x.dressCode?.required===false)||(els.dress.value==='pending'&&x.dressCode?.required==null);
  const cp=x.childPolicy||{};const childOk=!els.child.value||(els.child.value==='yes'&&cp.diningRoomAllowed===true)||(els.child.value==='private'&&cp.diningRoomAllowed!==true&&cp.privateRoomAllowed===true)||(els.child.value==='no'&&cp.diningRoomAllowed===false&&cp.privateRoomAllowed===false)||(els.child.value==='pending'&&cp.verified===false);
  return mealOk&&(!q||hay.includes(q))&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||x.areaZh===els.area.value)&&priceOk(x,meals)&&dressOk&&childOk;
 });render()
}
async function init(){
 const res=await fetch('./data/restaurants.json');state.data=await res.json();state.filtered=[...state.data];
 els.total.textContent=state.data.length;els.three.textContent=state.data.filter(x=>x.stars===3).length;els.two.textContent=state.data.filter(x=>x.stars===2).length;els.one.textContent=state.data.filter(x=>x.stars===1).length;
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh).filter(Boolean)));addOptions(els.area,new Set(state.data.map(x=>x.areaZh).filter(Boolean)));render()
}
[els.search,els.star,els.cuisine,els.area,els.price,els.dress,els.child].forEach(el=>el.addEventListener('input',apply));
document.querySelectorAll('.meal-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.meal-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');state.meal=btn.dataset.meal;apply()}));
els.reset.addEventListener('click',()=>{[els.search,els.star,els.cuisine,els.area,els.price,els.dress,els.child].forEach(x=>x.value='');state.meal='all';document.querySelectorAll('.meal-btn').forEach(x=>x.classList.toggle('active',x.dataset.meal==='all'));apply()});
els.theme.addEventListener('click',()=>document.body.classList.toggle('dark'));
els.toggleFilters.addEventListener('click',()=>{const collapsed=els.controls.classList.toggle('filters-collapsed');els.filterBody.hidden=collapsed;els.toggleFilters.textContent=collapsed?'展开筛选':'收起筛选'});
init().catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e)});
