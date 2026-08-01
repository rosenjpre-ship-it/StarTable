
const state={data:[],filtered:[],meal:'all'};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),dress:$('dressFilter'),child:$('childFilter'),difficulty:$('difficultyFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),checked:$('checkedCount'),reset:$('resetButton'),empty:$('empty'),theme:$('themeButton')};
const stars=n=>'★'.repeat(n);const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
function addOptions(el,vals){[...vals].sort().forEach(v=>el.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`))}
function mealTable(items){
 if(!items?.length)return '<div class="content-empty">该餐期的 Course 与价格尚未逐店核验。</div>';
 return `<table><thead><tr><th>Course</th><th>价格</th><th>说明</th></tr></thead><tbody>${items.map(x=>`<tr><td>${x.name}</td><td><strong>${x.price}</strong></td><td>${x.note||''}</td></tr>`).join('')}</tbody></table>`;
}
function tabContent(item,tab){
 if(tab==='lunch'||tab==='dinner')return mealTable(item[tab]);
 if(tab==='pairings')return item.pairings?.length?mealTable(item.pairings):'<div class="content-empty">Pairing 信息待核验。</div>';
 if(tab==='experience'){
  const e=item.experience||{};return `<div class="content-empty">板前：${e.counter??'待核验'}　餐桌：${e.table??'待核验'}　包厢：${e.privateRoom??'待核验'}　景观：${e.view??'待核验'}<br>独自用餐：${e.solo??'待核验'}　约会：${e.date??'待核验'}　商务：${e.business??'待核验'}　家庭：${e.family??'待核验'}</div>`;
 }
 if(tab==='links'){
  const entries=Object.entries(item.links||{}).filter(([,v])=>v);
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
function anniversaryText(a){
 if(!a||a.verified===false)return a?.notes||'待核验';
 return `${a.messagePlate?'支持 Message Plate':'不支持 Message Plate'}${a.free?'（免费）':''}${a.characterLimit?`，${a.characterLimit}字以内`:''}`;
}
function budgetText(b){
 if(!b||b.verified===false)return '待核验';
 return `Lunch ¥${b.lunchFrom??'-'} 起；Dinner ¥${b.dinnerFrom??'-'} 起`;
}
function makeCard(item){
 const f=els.template.content.cloneNode(true),head=f.querySelector('.card-head'),detail=f.querySelector('.detail');
 f.querySelector('.area').textContent=item.areaZh||item.area;f.querySelector('.cuisine').textContent=item.cuisineZh||item.cuisine;
 f.querySelector('.name-zh').textContent=item.nameZh||item.name;
 f.querySelector('.names-secondary').textContent=[item.nameJa,item.nameEn].filter(Boolean).join('｜');
 f.querySelector('.stars').textContent=stars(item.stars);f.querySelector('.address').textContent=item.address||'地址待补充';
 f.querySelector('.phone').textContent=item.phone?`电话：${item.phone}`:'电话待补充';f.querySelector('.checked').textContent=`官网检查：${item.sync?.lastChecked||'待检查'}`;
 f.querySelector('.difficulty').textContent=`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`;
 f.querySelector('.booking').textContent=item.reservation?.bookingRule||'待核验';
 const reserve=f.querySelector('.reserve');reserve.href=item.links?.reservation||item.links?.official||'#';if(reserve.href.endsWith('#'))reserve.style.display='none';
 f.querySelector('.dress').textContent=dressText(item.dressCode);f.querySelector('.children').textContent=childText(item.childPolicy);
 f.querySelector('.anniversary').textContent=anniversaryText(item.anniversary);f.querySelector('.budget').textContent=budgetText(item.budget);
 const chips=f.querySelector('.chips');
 [`Lunch ${item.lunch?.length||0}`,`Dinner ${item.dinner?.length||0}`,item.dressCode?.required===true?'需着装':'着装待核验'].forEach(t=>{const s=document.createElement('span');s.className='chip';s.textContent=t;chips.appendChild(s)});
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
  const hay=[x.nameZh,x.nameJa,x.nameEn,x.areaZh,x.cuisineZh,x.address,...meals.flatMap(c=>[c.name,c.price,c.note])].join(' ').toLowerCase();
  const dressOk=!els.dress.value||(els.dress.value==='required'&&x.dressCode?.required===true)||(els.dress.value==='none'&&x.dressCode?.required===false)||(els.dress.value==='pending'&&x.dressCode?.required==null);
  const cp=x.childPolicy||{};const childOk=!els.child.value||(els.child.value==='yes'&&cp.diningRoomAllowed===true)||(els.child.value==='private'&&cp.diningRoomAllowed!==true&&cp.privateRoomAllowed===true)||(els.child.value==='no'&&cp.diningRoomAllowed===false&&cp.privateRoomAllowed===false)||(els.child.value==='pending'&&cp.verified===false);
  return (!q||hay.includes(q))&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||x.areaZh===els.area.value)&&(!els.difficulty.value||String(x.reservation?.difficulty)===els.difficulty.value)&&dressOk&&childOk;
 });render()
}
async function init(){
 const res=await fetch('./data/restaurants.json');state.data=await res.json();state.filtered=[...state.data];
 els.total.textContent=state.data.length;els.three.textContent=state.data.filter(x=>x.stars===3).length;els.checked.textContent=state.data.filter(x=>x.sync?.lastChecked).length;
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh).filter(Boolean)));addOptions(els.area,new Set(state.data.map(x=>x.areaZh).filter(Boolean)));render()
}
[els.search,els.star,els.cuisine,els.area,els.dress,els.child,els.difficulty].forEach(el=>el.addEventListener('input',apply));
document.querySelectorAll('.meal-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.meal-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');state.meal=btn.dataset.meal;apply()}));
els.reset.addEventListener('click',()=>{[els.search,els.star,els.cuisine,els.area,els.dress,els.child,els.difficulty].forEach(x=>x.value='');state.meal='all';document.querySelectorAll('.meal-btn').forEach(x=>x.classList.toggle('active',x.dataset.meal==='all'));apply()});
els.theme.addEventListener('click',()=>document.body.classList.toggle('dark'));
init().catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e)});
