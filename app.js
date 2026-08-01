
const state={data:[],filtered:[],meal:'all'};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),status:$('statusFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),verified:$('verifiedCount'),reset:$('resetButton'),empty:$('empty'),theme:$('themeButton')};

const stars=n=>'★'.repeat(n);
const difficulty=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const statusLabel=s=>({basic_verified:'基础资料已核验',star_verified:'星级已核验',star_pending_recheck:'待复核'}[s]||'待核验');

function addOptions(el,values){[...values].sort().forEach(v=>el.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`));}
function courseTable(items){
 if(!items||!items.length)return '<div class="course-empty">该餐期的具体 Course 尚未逐店核验，暂不使用占位菜单。</div>';
 return `<table><thead><tr><th>Course</th><th>Price</th><th>Notes</th></tr></thead><tbody>${items.map(x=>`<tr><td>${x.name}</td><td><strong>${x.price}</strong></td><td>${x.note||''}</td></tr>`).join('')}</tbody></table>`;
}
function makeCard(item){
 const f=els.template.content.cloneNode(true),head=f.querySelector('.card-head'),detail=f.querySelector('.detail');
 f.querySelector('.area').textContent=item.area||'Tokyo';f.querySelector('.cuisine').textContent=item.cuisineZh||item.cuisine;
 f.querySelector('.name').textContent=item.name;f.querySelector('.name-ja').textContent=item.nameJa||'';
 f.querySelector('.stars').textContent=stars(item.stars);f.querySelector('.address').textContent=item.address||'地址待补充';
 f.querySelector('.phone').textContent=item.phone?`Tel: ${item.phone}`:'电话待补充';
 f.querySelector('.difficulty').textContent=difficulty(item.difficulty);f.querySelector('.booking').textContent=item.booking;
 f.querySelector('.plate').textContent=item.plate;
 const badge=f.querySelector('.status');badge.innerHTML=`<span class="status-badge ${item.dataStatus==='basic_verified'?'ok':'warn'}">${statusLabel(item.dataStatus)}</span>`;
 const link=f.querySelector('.reserve');link.href=item.url||item.website||'#';if(!item.url&&!item.website){link.style.display='none';}
 const chips=f.querySelector('.chips');[item.cuisineZh||item.cuisine,`${item.lunch?.length||0} lunch`,`${item.dinner?.length||0} dinner`].forEach(t=>{const s=document.createElement('span');s.className='chip';s.textContent=t;chips.appendChild(s);});
 const area=f.querySelector('.course-area');area.innerHTML=courseTable(item.lunch||[]);
 const local=[...f.querySelectorAll('.local-btn')];local.forEach(btn=>btn.addEventListener('click',()=>{local.forEach(x=>x.classList.remove('active'));btn.classList.add('active');area.innerHTML=courseTable(item[btn.dataset.localmeal]||[]);}));
 head.addEventListener('click',()=>{const open=head.getAttribute('aria-expanded')==='true';head.setAttribute('aria-expanded',String(!open));detail.hidden=open;});
 return f;
}
function render(){els.grid.innerHTML='';state.filtered.forEach(x=>els.grid.appendChild(makeCard(x)));els.visible.textContent=state.filtered.length;els.empty.hidden=state.filtered.length!==0;}
function apply(){
 const q=els.search.value.trim().toLowerCase();
 state.filtered=state.data.filter(x=>{
  const meals=state.meal==='all'?[...(x.lunch||[]),...(x.dinner||[])]:x[state.meal]||[];
  const hay=[x.name,x.nameJa,x.area,x.cuisine,x.cuisineZh,x.address,x.booking,x.plate,...meals.flatMap(c=>[c.name,c.price,c.note])].join(' ').toLowerCase();
  return (!q||hay.includes(q))&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||x.area===els.area.value)&&(!els.status.value||x.dataStatus===els.status.value);
 });render();
}
async function init(){
 const res=await fetch('./data/restaurants.json');state.data=await res.json();state.filtered=[...state.data];
 els.total.textContent=state.data.length;els.three.textContent=state.data.filter(x=>x.stars===3).length;els.verified.textContent=state.data.filter(x=>x.dataStatus==='basic_verified').length;
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh||x.cuisine)));addOptions(els.area,new Set(state.data.map(x=>x.area).filter(Boolean)));render();
}
[els.search,els.star,els.cuisine,els.area,els.status].forEach(el=>el.addEventListener('input',apply));
document.querySelectorAll('.meal-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.meal-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');state.meal=btn.dataset.meal;apply();}));
els.reset.addEventListener('click',()=>{[els.search,els.star,els.cuisine,els.area,els.status].forEach(x=>x.value='');state.meal='all';document.querySelectorAll('.meal-btn').forEach(x=>x.classList.toggle('active',x.dataset.meal==='all'));apply();});
els.theme.addEventListener('click',()=>document.body.classList.toggle('dark'));
init().catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e);});
