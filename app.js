
const activeUser=localStorage.getItem('stUser')||'guest';
const prefKey=name=>`st:${activeUser}:${name}`;
const state={data:[],filtered:[],meal:'all',solo:false,user:activeUser,lang:localStorage.getItem('stLang')||'zh',compareExpanded:true,accountExpanded:false,accountCity:'',membership:{status:'unknown',message:'会员状态未确认',plan:'-',renewal:'-'},favorites:new Set(JSON.parse(localStorage.getItem(prefKey('favorites'))||'[]')),marks:JSON.parse(localStorage.getItem(prefKey('marks'))||'{}'),compare:new Set(JSON.parse(localStorage.getItem(prefKey('compare'))||'[]'))};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),city:$('cityFilter'),cityButton:$('cityButton'),cityMenu:$('cityMenu'),langButtons:[...document.querySelectorAll('[data-lang]')],star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),mealButtons:[...document.querySelectorAll('.meal-btn[data-meal]')],soloButton:document.querySelector('[data-filter="solo"]'),price:$('priceFilter'),dress:$('dressFilter'),child:$('childFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),two:$('twoStarCount'),one:$('oneStarCount'),lastUpdated:$('lastUpdated'),reset:$('resetButton'),accountPanel:$('accountPanel'),areaRail:$('areaRail'),empty:$('empty'),theme:$('themeButton'),loginButton:$('loginButton'),membershipButton:$('membershipButton'),membershipModal:$('membershipModal'),membershipClose:$('membershipClose'),checkoutButtons:[...document.querySelectorAll('[data-checkout-plan]')],manageSubscriptionButton:$('manageSubscriptionButton'),membershipStatus:$('membershipStatus'),loginModal:$('loginModal'),loginClose:$('loginClose'),loginName:$('loginName'),loginSubmit:$('loginSubmit'),controls:document.querySelector('.controls'),filterBody:$('filterBody'),toggleFilters:$('toggleFiltersButton'),mobileFilter:$('mobileFilterButton'),modal:$('detailModal'),modalContent:$('modalContent'),modalClose:$('modalClose')};
const stars=n=>'★'.repeat(n);const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const dict={
 zh:{
  global:'全球',tokyo:'东京',hongkong:'香港',membership:'会员订阅',dark:'深色模式',light:'浅色模式',
  hero1:'收录东京与香港 2026 全部星级米其林餐厅。',hero2:'按城市、地点、星级、菜系、Lunch / Dinner、价格、Dress Code、儿童政策与评分筛选。',
  total:'2026 星级餐厅合计',three:'2026 三星',two:'2026 二星',one:'2026 一星',search:'搜索餐厅名称（中文 / 日文 / 英文）',
  collapse:'收起筛选',expand:'展开筛选',allStars:'全部星级',threeStar:'三星',twoStar:'二星',oneStar:'一星',allCuisine:'全部菜系',allArea:'全部地区',
  chooseCity:'选择城市后筛选地区',chooseCityRail:'选择城市后显示地区',allPrice:'全部价格',dress:'着装要求',children:'儿童政策',
  show:'显示',restaurants:'家',reset:'重置',empty:'没有符合条件的餐厅。',close:'关闭',login:'Log in',mypage:'我的星宴',
  basic:'基本信息',reservation:'预约助手',address:'地址',phone:'电话',transport:'交通信息',budget:'预算',reserve:'前往官网预约',
  want:'想摘星',done:'已摘星',favorite:'收藏',favorited:'已收藏',none:'暂无餐厅。',back:'返回餐厅列表',logout:'退出登录',
  globalDone:'全球已摘星',memberTitle:'星宴年会员',memberDesc:'通过 Stripe 安全订阅，解锁完整餐厅数据库与高阶筛选。',
  yearly:'年费',browse:'餐厅浏览',all:'全部',searches:'搜索次数',unlimited:'不限',fullData:'完整资料',advanced:'高级筛选',
  fullDataText:'查看完整餐厅信息、预约入口、交通、用餐规则与 course 信息。',advancedText:'不受 20 家浏览和 5 次搜索限制，按城市、餐期、价格与政策快速筛选。',
  mypageText:'按全球、东京、香港管理已摘星、想摘星和收藏餐厅。',stripeSoon:'Stripe 支付即将接入',
  stripeAlert:'Stripe 支付链接接入后，这里会跳转到官方 Checkout 页面。',loadFail:'数据加载失败，请确认已部署到 GitHub Pages。'
 },
 en:{
  global:'Global',tokyo:'Tokyo',hongkong:'Hong Kong',membership:'Membership',dark:'Dark mode',light:'Light mode',
  hero1:'A 2026 Michelin starred restaurant database for Tokyo and Hong Kong.',hero2:'Filter by city, area, stars, cuisine, Lunch / Dinner, price, dress code, child policy and ratings.',
  total:'2026 starred restaurants',three:'2026 three stars',two:'2026 two stars',one:'2026 one star',search:'Search restaurant name (Chinese / Japanese / English)',
  collapse:'Hide filters',expand:'Show filters',allStars:'All stars',threeStar:'Three stars',twoStar:'Two stars',oneStar:'One star',allCuisine:'All cuisines',allArea:'All areas',
  chooseCity:'Select a city to filter areas',chooseCityRail:'Select a city to show areas',allPrice:'All prices',dress:'Dress code',children:'Child policy',
  show:'Showing',restaurants:'restaurants',reset:'Reset',empty:'No matching restaurants.',close:'Close',login:'Log in',mypage:'My page',
  basic:'Basic info',reservation:'Reservation assistant',address:'Address',phone:'Phone',transport:'Access',budget:'Budget',reserve:'Official reservation',
  want:'Want to visit',done:'Visited',favorite:'Save',favorited:'Saved',none:'No restaurants yet.',back:'Back to list',logout:'Log out',
  globalDone:'Global visited',memberTitle:'StarTable Membership',memberDesc:'Subscribe securely with Stripe to unlock the full restaurant database and advanced filters.',
  yearly:'Annual fee',browse:'Restaurant access',all:'All',searches:'Searches',unlimited:'Unlimited',fullData:'Full data',advanced:'Advanced filters',
  fullDataText:'View full restaurant details, reservation links, access, dining rules and course information.',advancedText:'Remove the 20-restaurant and 5-search limits; filter by city, meal, price and policies.',
  mypageText:'Manage visited, wish list and saved restaurants by Global, Tokyo and Hong Kong.',stripeSoon:'Stripe payment coming soon',
  stripeAlert:'After the Stripe payment link is connected, this button will open the official Checkout page.',loadFail:'Data failed to load. Please confirm the site is deployed on GitHub Pages.'
 }
};
const t=key=>(dict[state.lang]&&dict[state.lang][key])||dict.zh[key]||key;
const cuisineEnMap={'日本料理':'Japanese','寿司':'Sushi','法餐':'French','法式':'French','中餐':'Chinese','中国菜':'Chinese','天妇罗':'Tempura','意大利菜':'Italian','创新料理':'Innovative','西班牙菜':'Spanish','烧鸟':'Yakitori','鳗鱼':'Unagi','拉面':'Ramen'};
function cuisineLabel(item){
 if(state.lang==='en')return item.cuisineEn||cuisineEnMap[item.cuisineZh]||item.cuisine||item.cuisineZh;
 return item.cuisineZh||item.cuisine;
}
function restaurantName(item){
 return state.lang==='en' ? (item.nameEn||item.name||item.nameZh) : (item.nameZh||item.name);
}
function secondaryNames(item){
 return state.lang==='en' ? [item.nameZh,item.nameJa].filter(Boolean).join('｜') : [item.nameJa,item.nameEn].filter(Boolean).join('｜');
}
function setLanguage(lang){
 state.lang=lang==='en'?'en':'zh';
 localStorage.setItem('stLang',state.lang);
 document.documentElement.lang=state.lang==='en'?'en':'zh-CN';
 document.querySelectorAll('[data-lang]').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===state.lang));
 updateCityButton();
 if(els.membershipButton)els.membershipButton.textContent=t('membership');
 if(els.theme)els.theme.textContent=document.body.classList.contains('dark')?t('light'):t('dark');
 const heroSub=document.querySelector('.hero .sub');
 if(heroSub)heroSub.innerHTML=`<span>${esc(t('hero1'))}</span><span>${esc(t('hero2'))}</span>`;
 if(els.search)els.search.placeholder=t('search');
 if(els.toggleFilters)els.toggleFilters.textContent=els.filterBody.hidden?t('expand'):t('collapse');
 if(els.mobileFilter)els.mobileFilter.textContent=t('collapse').replace('Hide ','');
 if(els.reset)els.reset.textContent=t('reset');
 if(els.empty)els.empty.textContent=t('empty');
 if(els.star?.options.length){els.star.options[0].textContent=t('allStars');els.star.options[1].textContent=t('threeStar');els.star.options[2].textContent=t('twoStar');els.star.options[3].textContent=t('oneStar');}
 if(els.cuisine?.options.length)els.cuisine.options[0].textContent=t('allCuisine');
 if(els.area?.options.length)els.area.options[0].textContent=els.city.value?t('allArea'):t('chooseCity');
 if(els.price?.options.length)els.price.options[0].textContent=t('allPrice');
 if(els.dress?.options.length)els.dress.options[0].textContent=t('dress');
 if(els.child?.options.length)els.child.options[0].textContent=t('children');
 document.querySelector('#totalRestaurants')?.nextElementSibling&&(document.querySelector('#totalRestaurants').nextElementSibling.textContent=t('total'));
 document.querySelector('#threeStarCount')?.nextElementSibling&&(document.querySelector('#threeStarCount').nextElementSibling.textContent=t('three'));
 document.querySelector('#twoStarCount')?.nextElementSibling&&(document.querySelector('#twoStarCount').nextElementSibling.textContent=t('two'));
 document.querySelector('#oneStarCount')?.nextElementSibling&&(document.querySelector('#oneStarCount').nextElementSibling.textContent=t('one'));
 rebuildAreaControls();
 render();
}
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
function cityLabel(item){
 const city=String(item.city||'');
 if(city.toLowerCase().includes('hong kong'))return '香港';
 if(city.toLowerCase().includes('tokyo'))return '东京';
 return city||'其他';
}
function cityDisplay(value){
 if(value==='东京')return t('tokyo');
 if(value==='香港')return t('hongkong');
 return t('global');
}
function selectedCityItems(){
 const current=els.city?.value||'';
 return current?state.data.filter(x=>cityLabel(x)===current):state.data;
}
function updateStats(items=selectedCityItems()){
 els.total.textContent=items.length;
 els.three.textContent=items.filter(x=>x.stars===3).length;
 els.two.textContent=items.filter(x=>x.stars===2).length;
 els.one.textContent=items.filter(x=>x.stars===1).length;
}
function currentCityAreas(){
 return [...new Set(selectedCityItems().map(displayArea).filter(Boolean))]
  .sort((a,b)=>locationRankText(a)-locationRankText(b)||a.localeCompare(b,'zh'));
}
function rebuildAreaControls(){
 if(!els.city?.value){
  els.area.value='';
  els.area.disabled=true;
  els.area.innerHTML=`<option value="">${esc(t('chooseCity'))}</option>`;
  els.areaRail.innerHTML=`<button class="area-pill active area-pill-muted" data-area="" type="button">${esc(t('chooseCityRail'))}</button>`;
  return;
 }
 els.area.disabled=false;
 const areas=currentCityAreas();
 els.area.innerHTML=`<option value="">${esc(t('allArea'))}</option>`+areas.map(a=>`<option value="${esc(a)}">${esc(a)}</option>`).join('');
 els.areaRail.innerHTML=`<button class="area-pill active" data-area="">${esc(t('allArea'))}</button>`+areas.map(a=>`<button class="area-pill" data-area="${esc(a)}">${esc(a)}</button>`).join('');
}
function updateCityButton(){
 const label=cityDisplay(els.city?.value||'');
 if(els.cityButton)els.cityButton.textContent=label;
 els.cityMenu?.querySelectorAll('[data-city]').forEach(btn=>btn.classList.toggle('active',btn.dataset.city===(els.city?.value||'')));
}
function setCity(value){
 els.city.value=value;
 updateCityButton();
 rebuildAreaControls();
 apply();
}
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
function soloOk(item){
 return !state.solo||item.filters?.soloDiningAvailable===true||item.soloDining?.available===true;
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
 if(els.theme)els.theme.textContent=isDark?t('light'):t('dark');
 localStorage.setItem('stTheme',isDark?'dark':'light');
}
function currentEmail(){
 return state.user && state.user !== 'guest' ? state.user : '';
}
function requireEmail(){
 const email = currentEmail();
 if(email && email.includes('@')) return email;
 els.membershipModal?.close();
 els.loginModal?.showModal();
 throw new Error('login_required');
}
async function apiPost(url, body){
 if(location.protocol === 'file:') {
  throw new Error('需要部署到支持 /api 的环境后才能测试 Stripe 支付。');
 }
 const res = await fetch(url, {
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(body)
 });
 const data = await res.json().catch(()=>({}));
 if(!res.ok) throw new Error(data.error || '请求失败');
 return data;
}
function membershipPlanName(data){
 const names=(data?.subscriptions?.[0]?.products||[]).join(' ');
 if(/year/i.test(names))return 'Yearly';
 if(/month/i.test(names))return 'Monthly';
 return data?.active?'Premium':'Free';
}
function membershipRenewal(data){
 const end=data?.subscriptions?.[0]?.currentPeriodEnd;
 if(!end)return '-';
 return new Date(end*1000).toLocaleDateString(state.lang==='en'?'en-US':'zh-CN',{year:'numeric',month:'short',day:'numeric'});
}
function setMembership(next){
 state.membership={...state.membership,...next};
 if(els.membershipStatus)els.membershipStatus.textContent=`${state.membership.message}。`;
 if(state.accountExpanded)updateAccount();
}
async function checkMembershipStatus(){
 const email=currentEmail();
 if(!email || !email.includes('@') || location.protocol === 'file:') return null;
 try{
  setMembership({status:'checking',message:'正在确认会员状态'});
  const res=await fetch(`/api/stripe/subscription-status?email=${encodeURIComponent(email)}`);
  const data=await res.json();
  setMembership(data.active
   ? {status:'active',message:'当前邮箱已开通会员',plan:membershipPlanName(data),renewal:membershipRenewal(data)}
   : {status:'inactive',message:'当前邮箱暂未开通会员',plan:'Free',renewal:'-'});
  return data;
 }catch(error){
  setMembership({status:'error',message:'会员状态暂时无法确认'});
  return null;
 }
}
async function confirmMembershipAfterCheckout(){
 setMembership({status:'pending',message:'支付完成，正在确认会员状态',plan:'Premium',renewal:'确认中'});
 for(const delay of [0,1500,3000,6000]){
  if(delay)await new Promise(resolve=>setTimeout(resolve,delay));
  const data=await checkMembershipStatus();
  if(data?.active)return;
 }
 setMembership({status:'pending',message:'支付完成，Stripe 仍在同步；请稍后刷新会员状态',plan:'Premium',renewal:'确认中'});
}
function handleCheckoutReturn(){
 const params=new URLSearchParams(location.search);
 const checkout=params.get('checkout');
 if(!checkout)return;
 if(els.membershipModal)els.membershipModal.showModal();
 if(els.membershipStatus){
  els.membershipStatus.textContent=checkout==='success'
   ? '支付完成，正在确认会员状态。'
   : '支付已取消，当前未完成订阅。';
 }
 if(checkout==='success')confirmMembershipAfterCheckout();
 else setMembership({status:'inactive',message:'订阅未完成，未产生扣费',plan:'Free',renewal:'-'});
 params.delete('checkout');
 params.delete('session_id');
 const nextUrl=`${location.pathname}${params.toString()?`?${params}`:''}${location.hash}`;
 history.replaceState({},'',nextUrl);
}
async function startCheckout(plan){
 try{
  const email=requireEmail();
  const data=await apiPost('/api/stripe/create-checkout-session',{plan,email});
  location.href=data.url;
 }catch(error){
  if(error.message==='login_required')return;
  alert(error.message);
 }
}
async function manageSubscription(){
 try{
  const email=requireEmail();
  const data=await apiPost('/api/stripe/create-portal-session',{email});
  location.href=data.url;
 }catch(error){
  if(error.message==='login_required')return;
  alert(error.message);
 }
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
function soloText(item){
 const solo=item.soloDining||{};
 if(solo.available===true)return '可 1 人预约';
 if(solo.available===false&&solo.minGuests)return `公开预约信息显示最少 ${solo.minGuests} 人起。`;
 return '公开来源暂未确认是否接受 1 人预约。';
}
function mannersList(item){
 const cuisine=item.cuisineZh||item.cuisine||'';
 const rules=[
  '准时到店；迟到会影响餐序，建议提前 5-10 分钟抵达。',
  '预约前整理过敏、忌口、同行人数与联系方式，避免临时更改。',
  '避免强烈香水、香氛护手霜或烟味，尤其是寿司、天妇罗和日本料理。',
  '拍照前观察店内氛围；吧台餐厅避免长时间拍摄厨师和其他客人。'
 ];
 if(/寿司/.test(cuisine))rules.push('寿司吧台建议按师傅节奏食用，握寿司上桌后尽快入口。');
 if(/天妇罗/.test(cuisine))rules.push('天妇罗建议趁热食用，避免长时间拍照影响口感。');
 if(/法餐|意大利|西班牙/.test(cuisine))rules.push('西式餐序可按服务节奏用餐；不确定餐具顺序时跟随服务提示即可。');
 if(item.dressCode?.required)rules.push('有着装规定，建议 smart casual，避免短裤、凉鞋、运动服。');
 if(item.soloDining?.available===true)rules.push('1 人用餐时建议提前准备日文/英文备注，说明可接受吧台席。');
 return item.tableManners?.notes?.length?item.tableManners.notes:rules;
}
function mannersHtml(item){
 return mannersList(item).map((x,i)=>`<li><span class="manners-label">${String(i+1).padStart(2,'0')}</span><span class="manners-text">${esc(x)}</span></li>`).join('');
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
  el.innerHTML=`<img src="${esc(url)}" alt="${esc(restaurantName(item))}" loading="lazy">${imageFallbackHtml()}`;
  const img=el.querySelector('img');
  img.addEventListener('error',()=>{el.classList.remove('has-image');img.remove()},{once:true});
 }else{
  el.classList.remove('has-image');
  el.innerHTML=imageFallbackHtml();
 }
}
function detailHeroMediaHtml(item){
 const url=heroImageUrl(item);
 return `<div class="detail-hero-media ${url?'has-image':''}">${url?`<img src="${esc(url)}" alt="${esc(restaurantName(item))}" loading="lazy" onerror="this.remove();this.parentElement.classList.remove('has-image')">`:''}<span>STARTABLE</span></div>`;
}
function mealTable(items){
 if(!items?.length)return '<div class="content-empty">该餐期暂无公开套餐信息。</div>';
 return `<div class="course-list">${items.map(x=>`<article class="course-card"><div class="course-main"><h4>${x.name}</h4><strong>${x.price}</strong></div><div class="course-body">${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${d}</li>`).join('')}</ol>`:'<p>待补充</p>'}</div>${x.note?`<p class="course-note">${x.note}</p>`:''}</article>`).join('')}</div>`;
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
 return `<section class="detail-identity modal-identity">
  <div class="detail-copy">
   <p class="eyebrow">RESTAURANT DETAIL</p>
   <h2 class="modal-title">${esc(restaurantName(item))} <span class="stars">${stars(item.stars)}</span></h2>
   <div class="modal-meta">${esc([secondaryNames(item),item.areaZh,cuisineLabel(item)].filter(Boolean).join(' ｜ '))}</div>
   <div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div>
  </div>
  ${detailHeroMediaHtml(item)}
 </section>
 <div class="detail-layout">
  <section class="detail-block detail-block-main">
   <h3>基本信息</h3>
   <dl class="detail-list">
    <div><dt>地址</dt><dd>${esc(item.address||'待补充')}</dd></div>
    <div><dt>电话</dt><dd>${esc(item.phone||'待补充')}</dd></div>
    <div><dt>交通信息</dt><dd class="station-line">${stationHtml(item).replace('交通信息：','')}</dd></div>
    <div class="budget-row"><dt>预算</dt><dd>${esc(budgetText(item.budget))}</dd></div>
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
   <div class="link-list">${links}</div>
  </section>
 </div>
 <div class="detail-menu-grid">
  <section class="modal-section"><h3>Lunch Course</h3>${tabContent(item,'lunch')}</section>
  <section class="modal-section"><h3>Dinner Course</h3>${tabContent(item,'dinner')}</section>
 </div>`;
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
 if(!stations.length)return '交通信息：待补充';
 return `交通信息：${stations.map(s=>`${s.name} 步行${s.walkMinutes}分钟（${s.lines.join(' / ')}）`).join('；')}`;
}
function stationHtml(item){
 const stations=[...(item.transport?.stations||[])].sort((a,b)=>(a.walkMinutes??99)-(b.walkMinutes??99)).slice(0,3);
 if(!stations.length)return '<span>交通信息：待补充</span>';
 return `交通信息：<span class="station-list">${stations.map(s=>`<span class="station-item"><span class="station-main">${esc(s.name)} 步行${esc(s.walkMinutes)}分钟</span><span class="station-routes">${esc(s.lines.join(' / '))}</span></span>`).join('')}</span>`;
}
function displayArea(item){
 if(item.areaZh&&item.areaZh!=='东京')return item.areaZh;
 const station=item.transport?.stations?.[0]?.name;
 if(station==='东京')return '东京站';
 return station||cityLabel(item);
}
function normalizeSearch(value){
 return String(value||'')
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[\s·・|｜\/／,，.。'’"“”()（）\\\-ー_]/g,'');
}
function nameSearchText(item){
 return [item.nameZh,item.nameJa,item.nameEn,item.name,item.id]
  .filter(Boolean)
  .map(normalizeSearch)
  .join(' ');
}
function nameMatches(item,query){
 const q=normalizeSearch(query);
 if(!q)return true;
 const fields=[item.nameZh,item.nameJa,item.nameEn,item.name,item.id].filter(Boolean).map(normalizeSearch);
 if(fields.some(value=>value.includes(q)))return true;
 const hay=fields.join('');
 if(/[a-z0-9]/.test(q))return false;
 return [...q].every(char=>hay.includes(char));
}
function makeCard(item){
 const f=els.template.content.cloneNode(true),head=f.querySelector('.card-head'),detail=f.querySelector('.detail'),media=f.querySelector('.card-media');
 const goDetail=()=>{window.location.href=`./restaurant.html?id=${encodeURIComponent(item.id)}`};
 applyHeroImage(media,item);
 f.querySelector('.area').textContent=displayArea(item);f.querySelector('.cuisine').textContent=cuisineLabel(item);
 f.querySelector('.name-zh').textContent=restaurantName(item);
 f.querySelector('.names-secondary').textContent=secondaryNames(item);
 f.querySelector('.stars').textContent=stars(item.stars);f.querySelector('.address').textContent=item.address?`地址：${item.address}`:'地址待补充';
 f.querySelector('.phone').textContent=item.phone?`电话：${item.phone}`:'电话待补充';
 f.querySelector('.stations').innerHTML=stationHtml(item);
 f.querySelector('.difficulty').textContent=`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`;
 f.querySelector('.booking').textContent=item.reservation?.bookingRule||'需预约确认';
 f.querySelector('.reservation-guide').innerHTML=reservationGuideHtml(item);
 const reserve=f.querySelector('.reserve');reserve.href=item.links?.reservation||item.links?.official||'#';if(reserve.href.endsWith('#'))reserve.style.display='none';
 f.querySelector('.dress').textContent=dressText(item.dressCode);f.querySelector('.children').textContent=childText(item.childPolicy);
 f.querySelector('.solo').textContent=soloText(item);
 f.querySelector('.manners').innerHTML=mannersHtml(item);
 f.querySelector('.budget').textContent=`预算：${budgetText(item.budget)}`;
 const chips=f.querySelector('.chips');
 const chipTexts=[`Lunch ${item.lunch?.length||0}`,`Dinner ${item.dinner?.length||0}`,item.dressCode?.required===true?'有 Dress Code':'着装需确认'];
 if(item.soloDining?.available===true)chipTexts.unshift('Solo dining');
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
 head.addEventListener('click',goDetail);
 if(media){
  media.setAttribute('role','link');
  media.setAttribute('tabindex','0');
  media.setAttribute('aria-label',`${state.lang==='en'?'View details for':'查看'}${restaurantName(item)}`);
  media.addEventListener('click',goDetail);
  media.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();goDetail()}});
 }
 if(detail)detail.remove();
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
  pin.title=restaurantName(item);
  pin.addEventListener('click',()=>showMapItem(item,pin));
  els.mapCanvas.appendChild(pin);
 });
 if(selected)showMapItem(selected,els.mapCanvas.querySelector('.map-pin'));
}
function showMapItem(item,pin){
 document.querySelectorAll('.map-pin').forEach(x=>x.classList.remove('active'));
 pin?.classList.add('active');
 els.mapPanel.innerHTML=`<h3>${esc(restaurantName(item))} <span class="stars">${stars(item.stars)}</span></h3><p>${esc([displayArea(item),cuisineLabel(item)].filter(Boolean).join(' ｜ '))}</p><p>${esc(stationText(item))}</p><p>Tabelog：${esc(item.ratings?.tabelogScore||'-')}</p><div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div><div class="link-list"><a href="./restaurant.html?id=${encodeURIComponent(item.id)}">${state.lang==='en'?'View restaurant':'查看餐厅'}</a><a href="${esc(item.links?.reservation||item.links?.official||'#')}" target="_blank" rel="noopener">${esc(t('reserve'))}</a></div>`;
}
function updateCompare(){}
function updateAccount(){
 els.loginButton.textContent=state.user==='guest'?'Log in':`我的星宴`;
 document.body.classList.toggle('account-mode',state.accountExpanded);
 const byCity=items=>state.accountCity?items.filter(x=>cityLabel(x)===state.accountCity):items;
 const favs=byCity([...state.favorites].map(id=>state.data.find(x=>x.id===id)).filter(Boolean));
 const wants=byCity(Object.entries(state.marks).filter(([,v])=>v==='want').map(([id])=>state.data.find(x=>x.id===id)).filter(Boolean));
 const dones=byCity(Object.entries(state.marks).filter(([,v])=>v==='done').map(([id])=>state.data.find(x=>x.id===id)).filter(Boolean));
 const allDones=Object.entries(state.marks).filter(([,v])=>v==='done').map(([id])=>state.data.find(x=>x.id===id)).filter(Boolean);
 els.accountPanel.hidden=!state.accountExpanded;
 if(!state.accountExpanded)return;
 const list=items=>items.length?`<div class="account-list">${items.map(x=>`<a href="./restaurant.html?id=${encodeURIComponent(x.id)}"><strong>${esc(restaurantName(x))}</strong><span>${stars(x.stars)} · ${esc(displayArea(x))}</span></a>`).join('')}</div>`:`<div class="account-empty">${esc(t('none'))}</div>`;
 const cityOptions=['','东京','香港'].map(value=>`<button class="account-city ${state.accountCity===value?'active':''}" type="button" data-account-city="${esc(value)}">${esc(cityDisplay(value))}</button>`).join('');
 const memberClass=`account-member ${esc(state.membership.status)}`;
 const memberMessage=state.user==='guest'?'登录后确认会员状态':state.membership.message;
 els.accountPanel.innerHTML=`<div class="account-head"><div><p class="eyebrow">MY PAGE</p><strong>${esc(t('mypage'))}</strong><span>${esc(state.user==='guest'?'Guest':state.user)}</span></div><div class="account-actions"><button id="accountBackButton" class="ghost">${esc(t('back'))}</button><button id="logoutButton" class="ghost">${esc(t('logout'))}</button></div></div><div class="${memberClass}"><div><span>会员状态</span><strong>${esc(memberMessage)}</strong><small>绑定邮箱：${esc(state.user==='guest'?'未登录':state.user)}</small></div><div><span>方案</span><strong>${esc(state.membership.plan)}</strong><small>下次续费：${esc(state.membership.renewal)}</small></div><div class="account-member-actions"><button id="accountMembershipButton" class="ghost" type="button">会员订阅</button><button id="accountManageSubscriptionButton" class="ghost" type="button">管理订阅</button></div></div><div class="account-city-row">${cityOptions}</div><div class="account-summary"><span>${esc(cityDisplay(state.accountCity))}${esc(t('done'))} <strong>${dones.length}</strong></span><span>${esc(t('want'))} <strong>${wants.length}</strong></span><span>${esc(t('favorite'))} <strong>${favs.length}</strong></span><span>${esc(t('globalDone'))} <strong>${allDones.length}</strong></span></div><div class="account-sections"><section><h3>${esc(t('done'))}</h3>${list(dones)}</section><section><h3>${esc(t('want'))}</h3>${list(wants)}</section><section><h3>${esc(t('favorite'))}</h3>${list(favs)}</section></div>`;
 $('accountBackButton')?.addEventListener('click',()=>{state.accountExpanded=false;updateAccount();window.scrollTo({top:0,behavior:'smooth'})});
 $('logoutButton')?.addEventListener('click',()=>setUser('guest'));
 $('accountMembershipButton')?.addEventListener('click',()=>{els.membershipModal?.showModal();checkMembershipStatus()});
 $('accountManageSubscriptionButton')?.addEventListener('click',manageSubscription);
 document.querySelectorAll('[data-account-city]').forEach(btn=>btn.addEventListener('click',()=>{state.accountCity=btn.dataset.accountCity;updateAccount()}));
 if(state.membership.status==='unknown')checkMembershipStatus();
}
function render(){els.grid.innerHTML='';state.filtered.forEach(x=>els.grid.appendChild(makeCard(x)));els.visible.textContent=state.filtered.length;els.empty.hidden=state.filtered.length!==0;updateCompare();updateAccount()}
function apply(){
 const q=els.search.value.trim();
 const cityItems=selectedCityItems();
 updateStats(cityItems);
 if(q){
  state.filtered=sortRestaurants(cityItems.filter(x=>nameMatches(x,q)));
  render();
  return;
 }
 state.filtered=cityItems.filter(x=>{
 const mealOk=state.meal==='all'||availabilityOk(x,state.meal);
  const dressOk=!els.dress.value||filterDressCategory(x)===els.dress.value;
  const childOk=!els.child.value||filterChildCategory(x)===els.child.value;
  return mealOk&&soloOk(x)&&nameMatches(x,q)&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||displayArea(x)===els.area.value)&&priceFilterOk(x)&&dressOk&&childOk;
 });state.filtered=sortRestaurants(state.filtered);render()
}
async function init(){
 const res=await fetch('./data/restaurants.json');state.data=sortRestaurants(await res.json());state.filtered=[...state.data];
 updateStats(selectedCityItems());
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh).filter(Boolean)));
 els.lastUpdated.textContent=state.data.map(x=>x.sync?.lastChecked).filter(Boolean).sort().at(-1)||'2026-08-02';
 updateCityButton();
 rebuildAreaControls();
 els.areaRail.addEventListener('click',e=>{const btn=e.target.closest('.area-pill');if(!btn)return;els.area.value=btn.dataset.area;document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x===btn));apply()});
 setLanguage(state.lang);
 apply()
}
[els.search,els.city,els.star,els.cuisine,els.area,els.price,els.dress,els.child].filter(Boolean).forEach(el=>el.addEventListener('input',()=>{if(el===els.city){updateCityButton();rebuildAreaControls()}if(el===els.area)document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===els.area.value));apply()}));
['keyup','search','compositionend'].forEach(type=>els.search?.addEventListener(type,apply));
els.mealButtons.forEach(btn=>btn.addEventListener('click',()=>{
 state.meal=state.meal===btn.dataset.meal?'all':btn.dataset.meal;
 els.mealButtons.forEach(x=>x.classList.toggle('active',state.meal===x.dataset.meal));
 apply();
}));
els.soloButton?.addEventListener('click',()=>{state.solo=!state.solo;els.soloButton.classList.toggle('active',state.solo);apply()});
els.cityButton?.addEventListener('click',e=>{
 e.stopPropagation();
 const open=els.cityMenu.hidden;
 els.cityMenu.hidden=!open;
 els.cityButton.setAttribute('aria-expanded',String(open));
});
els.cityMenu?.addEventListener('click',e=>{
 const btn=e.target.closest('[data-city]');
 if(!btn)return;
 setCity(btn.dataset.city);
 els.cityMenu.hidden=true;
 els.cityButton.setAttribute('aria-expanded','false');
});
document.addEventListener('click',e=>{
 if(!els.cityMenu||els.cityMenu.hidden)return;
 if(e.target.closest('.city-picker'))return;
 els.cityMenu.hidden=true;
 els.cityButton?.setAttribute('aria-expanded','false');
});
els.reset.addEventListener('click',()=>{[els.search,els.star,els.cuisine,els.area,els.price,els.dress,els.child].forEach(x=>x.value='');els.city.value='';updateCityButton();rebuildAreaControls();state.meal='all';state.solo=false;els.mealButtons.forEach(x=>x.classList.remove('active'));els.soloButton?.classList.remove('active');document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===''));apply()});
setTheme(localStorage.getItem('stTheme')==='dark'?'dark':'light');
els.langButtons.forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
els.theme.addEventListener('click',()=>setTheme(document.body.classList.contains('dark')?'light':'dark'));
els.toggleFilters.addEventListener('click',()=>{const collapsed=els.controls.classList.toggle('filters-collapsed');els.filterBody.hidden=collapsed;els.toggleFilters.textContent=collapsed?'展开筛选':'收起筛选'});
els.mobileFilter.addEventListener('click',()=>{els.controls.classList.remove('filters-collapsed');els.filterBody.hidden=false;els.toggleFilters.textContent='收起筛选';els.controls.scrollIntoView({behavior:'smooth',block:'start'})});
els.modalClose.addEventListener('click',()=>els.modal.close());
els.loginButton.addEventListener('click',()=>{if(state.user==='guest'){els.loginModal.showModal()}else{state.accountExpanded=true;updateAccount();els.accountPanel.scrollIntoView({behavior:'smooth',block:'start'})}});
els.membershipButton?.addEventListener('click',()=>{els.membershipModal.showModal();checkMembershipStatus()});
els.membershipClose?.addEventListener('click',()=>els.membershipModal.close());
els.checkoutButtons.forEach(btn=>btn.addEventListener('click',()=>startCheckout(btn.dataset.checkoutPlan)));
els.manageSubscriptionButton?.addEventListener('click',manageSubscription);
els.loginClose.addEventListener('click',()=>els.loginModal.close());
els.loginSubmit.addEventListener('click',()=>setUser(els.loginName.value));
init().then(handleCheckoutReturn).catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e)});
