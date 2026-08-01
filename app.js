
const state={data:[],filtered:[],meal:'all'};
const $=id=>document.getElementById(id);
const els={
grid:$('restaurantGrid'),template:$('restaurantTemplate'),search:$('searchInput'),
city:$('cityFilter'),star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),
difficulty:$('difficultyFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),
courses:$('totalCourses'),reset:$('resetButton'),empty:$('emptyState'),theme:$('themeButton')
};
const diff=n=>'★'.repeat(n)+'☆'.repeat(5-n);
const stars=n=>'★'.repeat(n);

function addOptions(el,values){values.sort().forEach(v=>el.insertAdjacentHTML('beforeend',`<option value="${v}">${v}</option>`));}

function mealTable(items){
 if(!items.length)return '<div class="empty">No course data.</div>';
 return `<table><thead><tr><th>Course</th><th>Price</th><th>Notes</th><th>Status</th></tr></thead><tbody>${items.map(x=>`<tr><td>${x.name}</td><td><strong>${x.price}</strong></td><td>${x.note}</td><td><span class="${x.verified?'verified':'unverified'}">${x.verified?'Verified':'Pending verification'}</span></td></tr>`).join('')}</tbody></table>`;
}

function card(item){
 const f=els.template.content.cloneNode(true);
 const card=f.querySelector('.card'),head=f.querySelector('.card-head'),detail=f.querySelector('.detail');
 f.querySelector('.city').textContent=item.city;f.querySelector('.area').textContent=item.area;
 f.querySelector('.name').textContent=item.name;f.querySelector('.name-ja').textContent=item.nameJa;
 f.querySelector('.stars').textContent=stars(item.stars);f.querySelector('.difficulty').textContent=diff(item.difficulty);
 f.querySelector('.booking').textContent=item.booking;f.querySelector('.plate').textContent=item.plate;
 const reserve=f.querySelector('.reserve');reserve.href=item.url;
 const chips=f.querySelector('.chips');
 [item.cuisineZh,item.cuisine,`${item.lunch.length} lunch`,`${item.dinner.length} dinner`].forEach(t=>{const s=document.createElement('span');s.className='chip';s.textContent=t;chips.appendChild(s);});
 const table=f.querySelector('.course-table');
 table.innerHTML=mealTable(item.lunch);
 const localBtns=[...f.querySelectorAll('.local-meal')];
 localBtns.forEach(btn=>btn.addEventListener('click',()=>{localBtns.forEach(x=>x.classList.remove('active'));btn.classList.add('active');table.innerHTML=mealTable(item[btn.dataset.localmeal]);}));
 head.addEventListener('click',()=>{const open=head.getAttribute('aria-expanded')==='true';head.setAttribute('aria-expanded',String(!open));detail.hidden=open;});
 return f;
}

function render(){
 els.grid.innerHTML='';state.filtered.forEach(x=>els.grid.appendChild(card(x)));
 els.visible.textContent=state.filtered.length;els.empty.hidden=state.filtered.length!==0;
}

function apply(){
 const q=els.search.value.trim().toLowerCase();
 state.filtered=state.data.filter(x=>{
  const mealData=state.meal==='all'?[...x.lunch,...x.dinner]:x[state.meal];
  const hay=[x.name,x.nameJa,x.city,x.area,x.cuisine,x.cuisineZh,x.booking,x.plate,...mealData.flatMap(c=>[c.name,c.price,c.note])].join(' ').toLowerCase();
  return (!q||hay.includes(q))&&(!els.city.value||x.city===els.city.value)&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisine===els.cuisine.value)&&(!els.area.value||x.area===els.area.value)&&(!els.difficulty.value||String(x.difficulty)===els.difficulty.value)&&mealData.length>0;
 });
 render();
}

async function init(){
 const res=await fetch('./data/restaurants.json');state.data=await res.json();state.filtered=[...state.data];
 els.total.textContent=state.data.length;els.courses.textContent=state.data.reduce((n,x)=>n+x.lunch.length+x.dinner.length,0);
 addOptions(els.city,[...new Set(state.data.map(x=>x.city))]);addOptions(els.cuisine,[...new Set(state.data.map(x=>x.cuisine))]);addOptions(els.area,[...new Set(state.data.map(x=>x.area))]);
 render();
}
[els.search,els.city,els.star,els.cuisine,els.area,els.difficulty].forEach(el=>el.addEventListener('input',apply));
document.querySelectorAll('.meal-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.meal-btn').forEach(x=>x.classList.remove('active'));btn.classList.add('active');state.meal=btn.dataset.meal;apply();}));
els.reset.addEventListener('click',()=>{[els.search,els.city,els.star,els.cuisine,els.area,els.difficulty].forEach(x=>x.value='');state.meal='all';document.querySelectorAll('.meal-btn').forEach(x=>x.classList.toggle('active',x.dataset.meal==='all'));apply();});
els.theme.addEventListener('click',()=>document.body.classList.toggle('dark'));
init().catch(()=>{els.empty.hidden=false;els.empty.textContent='Data failed to load. Please deploy through GitHub Pages.';});
