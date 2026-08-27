
const activeUser=localStorage.getItem('stUser')||'guest';
const prefKey=name=>`st:${activeUser}:${name}`;
const state={data:[],filtered:[],cityConfig:null,serverMeta:null,meal:'all',solo:false,user:activeUser,sessionToken:localStorage.getItem('stSessionToken')||'',lang:localStorage.getItem('stLang')||'zh',compareExpanded:true,accountExpanded:false,accountCity:'',searchCount:Number(localStorage.getItem(prefKey('searchCount'))||'0'),lastCountedSearch:localStorage.getItem(prefKey('lastSearch'))||'',membership:{status:'unknown',message:'会员状态未确认',plan:'-',renewal:'-'},favorites:new Set(JSON.parse(localStorage.getItem(prefKey('favorites'))||'[]')),marks:JSON.parse(localStorage.getItem(prefKey('marks'))||'{}'),compare:new Set(JSON.parse(localStorage.getItem(prefKey('compare'))||'[]'))};
const $=id=>document.getElementById(id);
const els={grid:$('grid'),template:$('cardTemplate'),search:$('searchInput'),city:$('cityFilter'),cityButton:$('cityButton'),cityMenu:$('cityMenu'),langButtons:[...document.querySelectorAll('[data-lang]')],star:$('starFilter'),cuisine:$('cuisineFilter'),area:$('areaFilter'),mealButtons:[...document.querySelectorAll('.meal-btn[data-meal]')],soloButton:document.querySelector('[data-filter="solo"]'),price:$('priceFilter'),dress:$('dressFilter'),child:$('childFilter'),visible:$('visibleCount'),total:$('totalRestaurants'),three:$('threeStarCount'),two:$('twoStarCount'),one:$('oneStarCount'),lastUpdated:$('lastUpdated'),reset:$('resetButton'),accessNotice:$('accessNotice'),accountPanel:$('accountPanel'),areaRail:$('areaRail'),empty:$('empty'),theme:$('themeButton'),loginButton:$('loginButton'),membershipButton:$('membershipButton'),membershipModal:$('membershipModal'),membershipClose:$('membershipClose'),checkoutButtons:[...document.querySelectorAll('[data-checkout-plan]')],manageSubscriptionButton:$('manageSubscriptionButton'),membershipStatus:$('membershipStatus'),assistantButton:$('assistantButton'),assistantPanel:$('assistantPanel'),assistantClose:$('assistantClose'),assistantMessages:$('assistantMessages'),assistantInput:$('assistantInput'),assistantSend:$('assistantSend'),loginModal:$('loginModal'),loginClose:$('loginClose'),loginName:$('loginName'),loginCode:$('loginCode'),loginCodeSend:$('loginCodeSend'),loginStatus:$('loginStatus'),loginSubmit:$('loginSubmit'),controls:document.querySelector('.controls'),filterBody:$('filterBody'),toggleFilters:$('toggleFiltersButton'),mobileFilter:$('mobileFilterButton'),modal:$('detailModal'),modalContent:$('modalContent'),modalClose:$('modalClose')};
let searchUsageTimer=null;
const cnyFallbackRates={JPY:.049,HKD:.92,EUR:8.35,USD:7.2,CNY:1};
let cnyRates={...cnyFallbackRates};
const stripePaymentLinks={
 monthly:'https://buy.stripe.com/28E28k2uJ9WYdmp93c3wQ01',
 yearly:'https://buy.stripe.com/6oU5kw7P3b12aad93c3wQ00'
};
const FREE_PREVIEW_PER_CITY_STAR=3;
const stars=n=>'★'.repeat(n);const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const dict={
 zh:{
  global:'全球',tokyo:'东京',hongkong:'香港',shanghai:'上海',membership:'会员订阅',dark:'深色模式',light:'浅色模式',
  hero1:'收录东京、香港、上海、巴黎与纽约全部星级米其林餐厅。',hero2:'按城市、地点、星级、菜系、Lunch / Dinner、价格、Dress Code、儿童政策与评分筛选。',
  total:'2026 星级餐厅合计',three:'2026 三星',two:'2026 二星',one:'2026 一星',search:'搜索餐厅名称（中文 / 日文 / 英文）',
  collapse:'收起筛选',expand:'展开筛选',allStars:'全部星级',threeStar:'三星',twoStar:'二星',oneStar:'一星',allCuisine:'全部菜系',allArea:'全部地区',
  chooseCity:'选择城市后筛选地区',chooseCityRail:'选择城市后显示地区',allPrice:'全部价格',dress:'着装要求',children:'儿童政策',
  show:'显示',restaurants:'家',reset:'重置',empty:'没有符合条件的餐厅。',close:'关闭',login:'Log in',mypage:'我的星宴',
  basic:'基本信息',reservation:'预约助手',address:'地址',phone:'电话',transport:'交通信息',budget:'预算',reserve:'前往官网预约',
  want:'想摘星',done:'已摘星',favorite:'收藏',favorited:'已收藏',none:'暂无餐厅。',back:'返回餐厅列表',logout:'退出登录',
  globalDone:'全球已摘星',memberTitle:'星宴年会员',memberDesc:'通过 Stripe 安全订阅，解锁完整餐厅数据库与高阶筛选。',
  yearly:'年费',browse:'餐厅浏览',all:'全部',searches:'搜索次数',unlimited:'不限',fullData:'完整资料',advanced:'高级筛选',
  fullDataText:'查看完整餐厅信息、预约入口、交通、用餐规则与 course 信息。',advancedText:'免费模式每个城市每个星级可预览 3 家；会员解除浏览和 5 次搜索限制。',
  mypageText:'按全球、东京、香港、上海、巴黎、纽约管理已摘星、想摘星和收藏餐厅。',stripeSoon:'Stripe 支付即将接入',
  stripeAlert:'Stripe 支付链接接入后，这里会跳转到官方 Checkout 页面。',loadFail:'数据加载失败，请确认已部署到 GitHub Pages。'
 },
 en:{
  global:'Global',tokyo:'Tokyo',hongkong:'Hong Kong',shanghai:'Shanghai',membership:'Membership',dark:'Dark mode',light:'Light mode',
  hero1:'A Michelin starred restaurant database for Tokyo, Hong Kong, Shanghai, Paris and New York.',hero2:'Filter by city, area, stars, cuisine, Lunch / Dinner, price, dress code, child policy and ratings.',
  total:'2026 starred restaurants',three:'2026 three stars',two:'2026 two stars',one:'2026 one star',search:'Search restaurant name (Chinese / Japanese / English)',
  collapse:'Hide filters',expand:'Show filters',allStars:'All stars',threeStar:'Three stars',twoStar:'Two stars',oneStar:'One star',allCuisine:'All cuisines',allArea:'All areas',
  chooseCity:'Select a city to filter areas',chooseCityRail:'Select a city to show areas',allPrice:'All prices',dress:'Dress code',children:'Child policy',
  show:'Showing',restaurants:'restaurants',reset:'Reset',empty:'No matching restaurants.',close:'Close',login:'Log in',mypage:'My page',
  basic:'Basic info',reservation:'Reservation assistant',address:'Address',phone:'Phone',transport:'Access',budget:'Budget',reserve:'Official reservation',
  want:'Want to visit',done:'Visited',favorite:'Save',favorited:'Saved',none:'No restaurants yet.',back:'Back to list',logout:'Log out',
  globalDone:'Global visited',memberTitle:'StarTable Membership',memberDesc:'Subscribe securely with Stripe to unlock the full restaurant database and advanced filters.',
  yearly:'Annual fee',browse:'Restaurant access',all:'All',searches:'Searches',unlimited:'Unlimited',fullData:'Full data',advanced:'Advanced filters',
  fullDataText:'View full restaurant details, reservation links, access, dining rules and course information.',advancedText:'Free preview includes 3 restaurants per city and star level; Premium removes browsing and 5-search limits.',
  mypageText:'Manage visited, wish list and saved restaurants by Global, Tokyo, Hong Kong, Shanghai, Paris and New York.',stripeSoon:'Stripe payment coming soon',
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
function restaurantDetailUrl(item){
 const returnUrl=`${location.search}${location.hash}`;
 return `./restaurant.html?id=${encodeURIComponent(item.id)}&return=${encodeURIComponent(returnUrl)}`;
}
function rememberDetailNavigation(item){
 sessionStorage.setItem('stPendingRestaurantId', item.id);
 sessionStorage.setItem('stPendingReturnUrl', `${location.search}${location.hash}`);
}
function validOptionValue(select,value){
 return !!select && [...select.options].some(option=>option.value===value);
}
function readFilterStateFromUrl(){
 const params=new URLSearchParams(location.search);
 const values={
  q:params.get('q')||'',
  city:params.get('city')||'',
  stars:params.get('stars')||'',
  cuisine:params.get('cuisine')||'',
  area:params.get('area')||'',
  price:params.get('price')||'',
  dress:params.get('dress')||'',
  child:params.get('child')||'',
  meal:params.get('meal')||'all',
  solo:params.get('solo')==='1'
 };
 if(els.search)els.search.value=values.q;
 if(validOptionValue(els.city,values.city))els.city.value=values.city;
 updateCityButton();
 rebuildPriceOptions();
 rebuildAreaControls();
 if(validOptionValue(els.star,values.stars))els.star.value=values.stars;
 if(validOptionValue(els.cuisine,values.cuisine))els.cuisine.value=values.cuisine;
 if(validOptionValue(els.area,values.area))els.area.value=values.area;
 if(validOptionValue(els.price,values.price))els.price.value=values.price;
 if(validOptionValue(els.dress,values.dress))els.dress.value=values.dress;
 if(validOptionValue(els.child,values.child))els.child.value=values.child;
 state.meal=['lunch','dinner'].includes(values.meal)?values.meal:'all';
 state.solo=values.solo;
 els.mealButtons.forEach(btn=>btn.classList.toggle('active',state.meal===btn.dataset.meal));
 els.soloButton?.classList.toggle('active',state.solo);
 document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===(els.area?.value||'')));
}
function syncFilterStateToUrl({replace=false}={}){
 const params=new URLSearchParams(location.search);
 const set=(key,value,empty='')=>{
  const next=String(value??'');
  if(next && next!==empty)params.set(key,next);
  else params.delete(key);
 };
 set('q',els.search?.value.trim()||'');
 set('city',els.city?.value||'');
 set('stars',els.star?.value||'');
 set('cuisine',els.cuisine?.value||'');
 set('area',els.area?.value||'');
 set('price',els.price?.value||'');
 set('dress',els.dress?.value||'');
 set('child',els.child?.value||'');
 set('meal',state.meal,'all');
 if(state.solo)params.set('solo','1'); else params.delete('solo');
 const next=`${location.pathname}${params.toString()?`?${params}`:''}${location.hash}`;
 if(next!==`${location.pathname}${location.search}${location.hash}`){
  history[replace?'replaceState':'pushState'](null,'',next);
 }
}
function ratingInfo(item){
 const r=item.ratings||{};
 const config=cityConfigByLabel(cityLabel(item));
 for(const platform of config?.ratingPlatforms||[]){
  const value=r[platform.key];
  if(value)return {label:platform.label,value,url:r[platform.urlKey],source:platform.label};
 }
 return r.localScore?{label:r.localPlatform||'本地评分',value:r.localScore,url:r.localUrl,source:r.localPlatform||'本地评分'}:null;
}
function ratingHtml(item){
 const info=ratingInfo(item);
 if(!info){
  const checked=item.ratings?.publicInfoStatus==='stable public score not found';
  return `<div class="content-empty">${checked?'已核对，暂无稳定公开评分。':'暂无稳定公开评分。'}</div>`;
 }
 const link=info.url?` <a href="${esc(info.url)}" target="_blank" rel="noopener">${esc(info.label)}</a>`:esc(info.label);
 return `<div class="content-empty">${esc(info.label)}：${esc(info.value)}${info.url?` <a href="${esc(info.url)}" target="_blank" rel="noopener">查看</a>`:''}</div>`;
}
function ratingRowHtml(item){
 const info=ratingInfo(item);
 return info?`<div><dt>${esc(info.label)}</dt><dd>${esc(info.value)}</dd></div>`:'';
}
function ratingLineText(item){
 const info=ratingInfo(item);
 return info?`${info.label}：${info.value}`:'';
}
function secondaryNames(item){
 return state.lang==='en' ? [item.nameZh,item.nameJa].filter(Boolean).join('｜') : [item.nameJa,item.nameEn].filter(Boolean).join('｜');
}
function setLanguage(lang){
 const selected={city:els.city?.value||'',area:els.area?.value||'',price:els.price?.value||''};
 state.lang=lang==='en'?'en':'zh';
 localStorage.setItem('stLang',state.lang);
 document.documentElement.lang=state.lang==='en'?'en':'zh-CN';
 document.querySelectorAll('[data-lang]').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===state.lang));
 rebuildCityControls();
 if(validOptionValue(els.city,selected.city))els.city.value=selected.city;
 rebuildPriceOptions();
 if(validOptionValue(els.price,selected.price))els.price.value=selected.price;
 updateCityButton();
 updateMembershipButtons();
 if(els.theme)els.theme.textContent=document.body.classList.contains('dark')?t('light'):t('dark');
 updateHeroCopy();
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
 if(validOptionValue(els.area,selected.area))els.area.value=selected.area;
 document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x.dataset.area===(els.area?.value||'')));
 render();
}
function updateHeroCopy(){
 const heroSub=document.querySelector('.hero .sub');
 if(!heroSub)return;
 const global=state.cityConfig?.global||{};
 const primary=state.lang==='en'?(global.heroTextEn||t('hero1')):(global.heroTextZh||t('hero1'));
 heroSub.innerHTML=`<span>${esc(primary)}</span><span>${esc(t('hero2'))}</span>`;
}
function cities(){return state.cityConfig?.cities||[]}
function cityConfigByLabel(label){return cities().find(x=>x.labelZh===label||x.labelEn===label||x.dataCity===label||x.id===label)||null}
function selectedCityConfig(){return cityConfigByLabel(els.city?.value||'')}
function cityConfigForItem(item){
 const city=String(item.city||'');
 return cityConfigByLabel(city)||cities().find(x=>String(x.dataCity||'').toLowerCase()===city.toLowerCase()||String(x.labelZh||'')===city||String(x.id||'').toLowerCase()===city.toLowerCase())||null;
}
function currencyForItem(item){
 return cityConfigForItem(item)?.currency||'CNY';
}
function parseLocalAmount(text,currency){
 const value=String(text||'');
 const patterns={
  HKD:/HK\$\s*([0-9][0-9,]*(?:\.\d+)?)/i,
  EUR:/€\s*([0-9][0-9,]*(?:\.\d+)?)/,
  USD:/\$\s*([0-9][0-9,]*(?:\.\d+)?)/,
  JPY:/¥\s*([0-9][0-9,]*(?:\.\d+)?)/,
  CNY:/¥\s*([0-9][0-9,]*(?:\.\d+)?)/
 };
 const match=(patterns[currency]||/([0-9][0-9,]*(?:\.\d+)?)/).exec(value);
 if(!match)return null;
 const amount=Number(match[1].replace(/,/g,''));
 return Number.isFinite(amount)?amount:null;
}
function cnyEstimate(amount,currency){
 const rate=cnyRates[currency]||cnyFallbackRates[currency];
 if(!amount||!rate||currency==='CNY')return null;
 const cny=amount*rate;
 const rounded=cny>=1000?Math.round(cny/100)*100:Math.round(cny/10)*10;
 return `约 ¥${rounded.toLocaleString('zh-CN')} 人民币`;
}
function priceHtml(item,price){
 const currency=currencyForItem(item);
 const amount=parseLocalAmount(price,currency);
 const estimate=cnyEstimate(amount,currency);
 return `<span class="local-price">${esc(price||'需预约确认')}</span>${estimate?`<span class="cny-price">${esc(estimate)}</span>`:''}`;
}
function localBudgetAmount(item,value){
 if(value==null)return '需预约确认';
 const config=cityConfigForItem(item);
 const symbol=config?.currencySymbol||'¥';
 return `${symbol}${Number(value).toLocaleString('zh-CN')} 起`;
}
function budgetHtml(item){
 const b=item.budget;
 if(!b||b.verified===false)return '需预约确认';
 const currency=currencyForItem(item);
 const lunch=b.lunchFrom!=null?cnyEstimate(Number(b.lunchFrom),currency):null;
 const dinner=b.dinnerFrom!=null?cnyEstimate(Number(b.dinnerFrom),currency):null;
 return `<span class="budget-line">Lunch ${esc(localBudgetAmount(item,b.lunchFrom))}${lunch?`<span class="cny-price">${esc(lunch)}</span>`:''}</span><span class="budget-line">Dinner ${esc(localBudgetAmount(item,b.dinnerFrom))}${dinner?`<span class="cny-price">${esc(dinner)}</span>`:''}</span>`;
}
function activePriceTiers(){
 return selectedCityConfig()?.priceTiers||state.cityConfig?.defaultPriceTiers||[
  {key:'under-10000',labelZh:'低预算',labelEn:'Lower budget',min:0,max:10000},
  {key:'10000-20000',labelZh:'标准预算',labelEn:'Standard budget',min:10000,max:20000},
  {key:'20000-30000',labelZh:'中高预算',labelEn:'Upper-mid budget',min:20000,max:30000},
  {key:'30000-40000',labelZh:'高预算',labelEn:'High budget',min:30000,max:40000},
  {key:'40000-50000',labelZh:'高级预算',labelEn:'Premium budget',min:40000,max:50000},
  {key:'50000-plus',labelZh:'顶级预算',labelEn:'Top budget',min:50000,max:null}
 ];
}
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
 const order=selectedCityConfig()?.areaOrder||locationOrder;
 const matched=order
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
 const found=cityConfigByLabel(city)||cities().find(x=>String(x.dataCity).toLowerCase()===city.toLowerCase());
 if(found)return found.labelZh;
 if(city.toLowerCase().includes('hong kong'))return '香港';
 if(city.toLowerCase().includes('tokyo'))return '东京';
 if(city.toLowerCase().includes('shanghai'))return '上海';
 return city||'其他';
}
function cityDisplay(value){
 const config=cityConfigByLabel(value);
 if(config)return state.lang==='en'?config.labelEn:config.labelZh;
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
function rebuildCityControls(){
 const globalLabel=esc(t('global'));
 const options=[`<option value="">${globalLabel}</option>`,...cities().map(city=>`<option value="${esc(city.labelZh)}">${esc(state.lang==='en'?city.labelEn:city.labelZh)}</option>`)].join('');
 const buttons=[`<button type="button" data-city="">${globalLabel}</button>`,...cities().map(city=>`<button type="button" data-city="${esc(city.labelZh)}">${esc(state.lang==='en'?city.labelEn:city.labelZh)}</button>`)].join('');
 if(els.city)els.city.innerHTML=options;
 if(els.cityMenu)els.cityMenu.innerHTML=buttons;
}
function rebuildPriceOptions(){
 if(!els.price)return;
 const current=els.price.value;
 const tiers=activePriceTiers();
 els.price.innerHTML=`<option value="">${esc(t('allPrice'))}</option>`+tiers.map(tier=>`<option value="${esc(tier.key)}">${esc(state.lang==='en'?tier.labelEn:tier.labelZh)}</option>`).join('');
 if([...els.price.options].some(option=>option.value===current))els.price.value=current;
}
function setCity(value){
 els.city.value=value;
 updateCityButton();
 rebuildPriceOptions();
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
 const tier=activePriceTiers().find(x=>x.key===els.price.value);
 const min=tier?.min??0;
 const max=tier?.max??Infinity;
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
function authHeaders(extra={}){
 return state.sessionToken?{...extra,Authorization:`Bearer ${state.sessionToken}`}:{...extra};
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
  headers:authHeaders({'Content-Type':'application/json'}),
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
 const renewalDate=data?.subscriptions?.[0]?.renewalDate;
 if(renewalDate)return renewalDate;
 const end=data?.subscriptions?.[0]?.currentPeriodEnd;
 if(!end)return '-';
 return new Date(end*1000).toLocaleDateString(state.lang==='en'?'en-US':'zh-CN',{year:'numeric',month:'short',day:'numeric'});
}
function isPremium(){
 return state.membership.status==='active';
}
function openMembershipModal(){
 els.membershipModal?.showModal();
 checkMembershipStatus();
}
function updateMembershipButtons(){
 const premium=isPremium();
 if(els.membershipButton){
  els.membershipButton.textContent=premium?(state.lang==='en'?'Premium':'会员中心'):t('membership');
  els.membershipButton.classList.toggle('premium',premium);
 }
 if(els.membershipStatus){
  els.membershipStatus.textContent=premium
   ? `${state.lang==='en'?'Premium active':'Premium 已开通'}｜${state.membership.plan||'Premium'}｜${state.lang==='en'?'Renews':'下次续费'}：${state.membership.renewal||'-'}`
   : `${state.membership.message||'会员状态未确认'}。`;
 }
}
function setMembership(next){
 state.membership={...state.membership,...next};
 updateMembershipButtons();
 updateAccessNotice();
 if(state.accountExpanded)updateAccount();
}
async function checkMembershipStatus(){
 const email=currentEmail();
 if(!email || !email.includes('@') || location.protocol === 'file:') return null;
 try{
  setMembership({status:'checking',message:'正在确认会员状态'});
  const res=await fetch(`/api/stripe/subscription-status?email=${encodeURIComponent(email)}`,{headers:authHeaders()});
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
async function requestLoginCode(){
 try{
  const email=(els.loginName?.value||'').trim().toLowerCase();
  if(!email.includes('@'))throw new Error('请输入有效邮箱。');
  if(location.protocol==='file:')throw new Error('验证码登录需要在 Vercel 线上环境测试。');
  els.loginStatus.textContent='正在发送验证码...';
  const data=await apiPost('/api/auth/request-code',{email});
  els.loginStatus.textContent=data.testCode?`测试验证码：${data.testCode}`:'验证码已发送，请检查邮箱。';
  els.loginCode?.focus();
 }catch(error){
  els.loginStatus.textContent=error.message;
 }
}
async function verifyLoginCode(){
 try{
  const email=(els.loginName?.value||'').trim().toLowerCase();
  const code=(els.loginCode?.value||'').trim();
  if(!email.includes('@'))throw new Error('请输入有效邮箱。');
  if(!/^\d{6}$/.test(code))throw new Error('请输入 6 位验证码。');
  if(location.protocol==='file:'){
   setUser(email);
   return;
  }
  els.loginStatus.textContent='正在验证...';
  const data=await apiPost('/api/auth/verify-code',{email,code});
  localStorage.setItem('stSessionToken',data.token);
  setUser(data.email);
 }catch(error){
  els.loginStatus.textContent=error.message;
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
 if(!checkout){
  if(location.hash==='#membership')openMembershipModal();
  return;
 }
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
  if(stripePaymentLinks[plan]){
   const checkoutUrl=new URL(stripePaymentLinks[plan]);
   checkoutUrl.searchParams.set('locked_prefilled_email',email);
   checkoutUrl.searchParams.set('locale',state.lang==='en'?'en':'zh');
   location.href=checkoutUrl.href;
   return;
  }
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
 const ratingSource=(cityConfigByLabel(cityLabel(item))?.ratingPlatforms||[]).map(x=>x.label).filter(Boolean).join('/')||'本地评分平台';
 if(item.sync?.source)badges.push(`来源：公开官网/预约页/米其林/${ratingSource}`);
 if(item.sync?.lastChecked)badges.push(`检查：${item.sync.lastChecked}`);
 if(item.dressCode?.publicInfoStatus==='not explicitly published')badges.push('着装需预约确认');
 if(item.childPolicy?.publicInfoStatus==='not explicitly published')badges.push('儿童政策需预约确认');
 return badges;
}
function fieldSource(item,field){
 const checked=item.sync?.lastChecked||item.transport?.lastChecked||'2026-08-02';
 const ratingSource=(cityConfigByLabel(cityLabel(item))?.ratingPlatforms||[]).map(x=>x.label).filter(Boolean).join(' / ')||'本地评分平台';
 const map={basic:'官网 / 米其林 / 公开预约页',transport:'地址与车站公开信息',reservation:'官网 / 预约页 / 电话',course:'官网 / 预约页 / 米其林',rating:ratingSource,policy:'官网 / 预约页'};
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
function reservationHref(item){
 const direct=item.links?.reservation||item.links?.official||item.links?.localListing;
 if(direct)return direct;
 const phone=String(item.phone||'').replace(/[^\d+]/g,'');
 return phone?`tel:${phone}`:'';
}
function isOfficialUrl(url){
 return url && !/dianping\.com\/search|dianping\.com\/shop/i.test(url);
}
function reservationButtonLabel(item){
 return t('reserve');
}
function reserveActionHtml(item){
 const href=reservationHref(item);
 if(!href)return `<span class="reserve reserve-disabled">${esc(reservationButtonLabel(item))}</span>`;
 const external=!href.startsWith('tel:')?' target="_blank" rel="noopener"':'';
 return `<a class="reserve" href="${esc(href)}"${external}>${esc(reservationButtonLabel(item))}</a>`;
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
function imageFallbackHtml(item={}){
 const city=cityLabel(item);
 const fallback=city==='巴黎'?'PARIS DINING':city==='香港'?'HONG KONG DINING':city==='上海'?'SHANGHAI DINING':city==='东京'?'TOKYO DINING':'STARTABLE';
 return `<div class="media-fallback"><span>${esc(fallback)}</span></div>`;
}
function applyHeroImage(el,item){
 const url=heroImageUrl(item);
 if(!el)return;
 if(url){
  el.style.backgroundImage='';
  el.classList.add('has-image');
  el.innerHTML=`<img src="${esc(url)}" alt="${esc(restaurantName(item))}" loading="lazy" referrerpolicy="no-referrer">${imageFallbackHtml(item)}`;
  const img=el.querySelector('img');
  img.addEventListener('error',()=>{el.classList.remove('has-image');el.classList.add('image-failed');img.remove()},{once:true});
 }else{
  el.classList.remove('has-image');
  el.classList.add('image-failed');
  el.innerHTML=imageFallbackHtml(item);
 }
}
function detailHeroMediaHtml(item){
 const url=heroImageUrl(item);
 return `<div class="detail-hero-media ${url?'has-image':''}">${url?`<img src="${esc(url)}" alt="${esc(restaurantName(item))}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove();this.parentElement.classList.remove('has-image');this.parentElement.classList.add('image-failed')">`:''}<span>STARTABLE</span></div>`;
}
function mealTable(item,items){
 if(!items?.length)return '<div class="content-empty">该餐期暂无公开套餐信息。</div>';
 return `<div class="course-list">${items.map(x=>`<article class="course-card"><div class="course-main"><h4>${esc(x.name)}</h4><strong>${priceHtml(item,x.price)}</strong></div><div class="course-body">${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${esc(d)}</li>`).join('')}</ol>`:'<p>待补充</p>'}</div>${x.note?`<p class="course-note">${esc(x.note)}</p>`:''}</article>`).join('')}</div>`;
}
function tabContent(item,tab){
 if(tab==='lunch'||tab==='dinner')return mealTable(item,item[tab]);
 if(tab==='pairings')return item.pairings?.length?mealTable(item,item.pairings):'<div class="content-empty">Pairing 信息待补充。</div>';
 if(tab==='ratings'){
  return ratingHtml(item);
 }
 if(tab==='links'){
  const allowed=new Set(['official','reservation','localListing','tabelog','openrice','dianping','ctrip','instagram']);
  const entries=Object.entries(item.links||{}).filter(([k,v])=>allowed.has(k)&&v);
  if(entries.length)return `<div class="link-list">${entries.map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(linkLabel(k,v))}</a>`).join('')}</div>`;
  if(item.phone)return `<div class="link-list"><a href="${esc(reservationHref(item))}">电话预约</a></div>`;
  return '<div class="content-empty">链接待补充。</div>';
 }
}
function linkLabel(key,url){
 if(key==='official')return isOfficialUrl(url)?'官网':'公开入口';
 if(key==='reservation')return isOfficialUrl(url)?'预约':'预约入口';
 if(key==='localListing'||key==='dianping')return '大众点评';
 if(key==='openrice')return 'OpenRice';
 if(key==='ctrip')return '携程';
 if(key==='tabelog')return 'Tabelog';
 if(key==='instagram')return 'Instagram';
 return key;
}
function fullDetail(item){
 const linkEntries=Object.entries(item.links||{}).filter(([k,v])=>['official','reservation','localListing','tabelog','openrice','dianping','ctrip','instagram'].includes(k)&&v);
 const links=linkEntries.length
  ? linkEntries.map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(linkLabel(k,v))}</a>`).join('')
  : item.phone?`<a href="${esc(reservationHref(item))}">电话预约</a>`:'<span>链接待补充</span>';
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
    <div class="budget-row"><dt>预算</dt><dd>${budgetHtml(item)}</dd></div>
    ${ratingRowHtml(item)}
   </dl>
  </section>
  <section class="detail-block">
   <h3>预约信息</h3>
   <p class="detail-lead">${esc(`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`)}</p>
   <p>${esc(item.reservation?.bookingRule||'需预约确认')}</p>
   <div class="reservation-guide">${reservationGuideHtml(item)}</div>
   ${reserveActionHtml(item)}
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
 const goDetail=()=>{rememberDetailNavigation(item);window.location.href=restaurantDetailUrl(item)};
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
 const reserve=f.querySelector('.reserve');
 const href=reservationHref(item);
 if(href){
  reserve.href=href;
  reserve.textContent=reservationButtonLabel(item);
  if(href.startsWith('tel:')){reserve.removeAttribute('target');reserve.removeAttribute('rel')}
 }else{
  reserve.textContent=reservationButtonLabel(item);
  reserve.removeAttribute('href');
  reserve.classList.add('reserve-disabled');
 }
 f.querySelector('.dress').textContent=dressText(item.dressCode);f.querySelector('.children').textContent=childText(item.childPolicy);
 f.querySelector('.solo').textContent=soloText(item);
 f.querySelector('.manners').innerHTML=mannersHtml(item);
 f.querySelector('.budget').innerHTML=`预算：${budgetHtml(item)}`;
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
 const ratingLine=ratingLineText(item);
 els.mapPanel.innerHTML=`<h3>${esc(restaurantName(item))} <span class="stars">${stars(item.stars)}</span></h3><p>${esc([displayArea(item),cuisineLabel(item)].filter(Boolean).join(' ｜ '))}</p><p>${esc(stationText(item))}</p>${ratingLine?`<p>${esc(ratingLine)}</p>`:''}<div class="source-row">${sourceBadges(item).map(x=>`<span class="source-badge">${esc(x)}</span>`).join('')}</div><div class="link-list"><a href="${restaurantDetailUrl(item)}">${state.lang==='en'?'View restaurant':'查看餐厅'}</a>${reserveActionHtml(item)}</div>`;
}
function updateCompare(){}
function previewKey(item){
 return `${item.city||cityLabel(item)||'global'}::${item.stars||0}`;
}
function freePreviewItems(items){
 const seen=new Map();
 return items.filter(item=>{
  const key=previewKey(item);
  const count=seen.get(key)||0;
  seen.set(key,count+1);
  return count<FREE_PREVIEW_PER_CITY_STAR;
 });
}
function scheduleSearchUsage(query){
 if(isPremium()||!query)return;
 clearTimeout(searchUsageTimer);
 searchUsageTimer=setTimeout(()=>{
  const current=els.search?.value.trim()||'';
  if(!current||current===state.lastCountedSearch)return;
  state.searchCount+=1;
  state.lastCountedSearch=current;
  localStorage.setItem(prefKey('searchCount'),String(state.searchCount));
  localStorage.setItem(prefKey('lastSearch'),current);
  updateAccessNotice();
 },650);
}
function updateAccessNotice(){
 if(!els.accessNotice)return;
 if(isPremium()){
  els.accessNotice.hidden=true;
  els.accessNotice.innerHTML='';
  return;
 }
 const remaining=Math.max(0,5-state.searchCount);
 const hidden=Math.max(0,state.filtered.length-freePreviewItems(state.filtered).length);
 const serverLocked=Number(state.serverMeta?.locked||0);
 const locked=Math.max(hidden,serverLocked);
 if(!locked&&state.searchCount<4){
  els.accessNotice.hidden=true;
  els.accessNotice.innerHTML='';
  return;
 }
 els.accessNotice.hidden=false;
 els.accessNotice.innerHTML=`<div><strong>${state.lang==='en'?'Free preview':'免费预览'}</strong><span>${state.lang==='en'?`Showing 3 restaurants per city and star level. Searches left: ${remaining}.`:`每个城市、每个星级可预览 3 家餐厅。剩余搜索次数：${remaining} 次。`}${locked?` ${state.lang==='en'?`${locked} more restaurants are locked.`:`还有 ${locked} 家已锁定。`}`:''}</span></div><button type="button" data-open-membership>${state.lang==='en'?'Upgrade':'开通会员'}</button>`;
 els.accessNotice.querySelector('[data-open-membership]')?.addEventListener('click',openMembershipModal);
}
function makeLimitCard(hiddenCount){
 const article=document.createElement('article');
 article.className='card limit-card';
 article.innerHTML=`<div><p class="eyebrow">${state.lang==='en'?'PREMIUM':'MEMBERSHIP'}</p><h2>${state.lang==='en'?'Unlock full restaurant access':'开通会员，查看全部餐厅'}</h2><p>${state.lang==='en'?`${hiddenCount} matching restaurants are hidden. Free preview shows 3 restaurants per city and star level.`:`当前筛选结果还有 ${hiddenCount} 家餐厅仅会员可看。免费模式每个城市、每个星级可预览 3 家。`}</p></div><button class="reserve" type="button">${state.lang==='en'?'Upgrade':'会员订阅'}</button>`;
 article.querySelector('button')?.addEventListener('click',openMembershipModal);
 return article;
}
function assistantAdd(role,html){
 if(!els.assistantMessages)return;
 const msg=document.createElement('div');
 msg.className=`assistant-message ${role}`;
 msg.innerHTML=html;
 els.assistantMessages.appendChild(msg);
 els.assistantMessages.scrollTop=els.assistantMessages.scrollHeight;
}
function ensureAssistantIntro(){
 if(!els.assistantMessages||els.assistantMessages.children.length)return;
 assistantAdd('assistant',`<p>${state.lang==='en'?'Tell me your city, area, cuisine, meal, dress code or child policy. I will recommend 1-3 restaurants from StarTable data.':'告诉我城市、地区、菜系、餐期、着装或儿童政策，星助理会基于当前数据库推荐 1-3 家。'}</p>`);
}
function formatAssistantResult(data){
 const items=Array.isArray(data.recommendations)?data.recommendations:[];
 if(!items.length)return `<p>${esc(data.note||'当前没有完全匹配的餐厅，请放宽条件。')}</p>`;
 return `<p>${esc(data.note||'基于当前 StarTable 数据推荐。')}</p><div class="assistant-rec-list">${items.map(item=>`<a href="${restaurantDetailUrl(item)}"><strong>${esc(item.nameZh||item.nameEn||item.id)} ${stars(item.stars)}</strong><span>${esc([cityLabel(item),item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</span><small>${esc(item.reason||'综合匹配推荐。')}</small></a>`).join('')}</div>`;
}
function parseAssistantIntent(message){
 const text=String(message||'').toLowerCase();
 const query={};
 for(const city of cities()){
  const tokens=[city.labelZh,city.labelEn,city.dataCity,city.id].filter(Boolean).map(value=>String(value).toLowerCase());
  if(tokens.some(token=>token&&text.includes(token))){
   query.city=city.labelZh;
   break;
  }
 }
 const area=[...new Set(state.data.map(displayArea).filter(Boolean))].find(value=>text.includes(String(value).toLowerCase()));
 if(area)query.area=area;
 if(/银座|ginza/.test(text))query.area='银座';
 if(/法餐|法式|french/.test(text))query.cuisineKeyword='法';
 if(/寿司|sushi/.test(text))query.cuisineKeyword='寿司';
 if(/中餐|粤菜|chinese|cantonese/.test(text))query.cuisineKeyword=/粤菜|cantonese/.test(text)?'粤菜':'中';
 if(/lunch|午餐/.test(text))query.meal='lunch';
 if(/dinner|晚餐/.test(text))query.meal='dinner';
 if(/没有着装|无着装|no dress|no dress code/.test(text))query.dress='none';
 if(/dress code|着装/.test(text)&&!query.dress)query.dress='required';
 if(/儿童|孩子|child|kid/.test(text))query.child='yes';
 if(/solo|一个人|1人|一人/.test(text))query.solo=true;
 return query;
}
function assistantBaseMatches(item,query){
 if(query.city&&cityLabel(item)!==query.city)return false;
 if(query.meal==='lunch'&&item.filters?.lunchAvailable!==true)return false;
 if(query.meal==='dinner'&&item.filters?.dinnerAvailable!==true)return false;
 if(query.dress&&filterDressCategory(item)!==query.dress)return false;
 if(query.child==='yes'&&filterChildCategory(item)!=='yes')return false;
 if(query.solo&&!(item.filters?.soloDiningAvailable===true||item.soloDining?.available===true))return false;
 return true;
}
function assistantScore(item,query){
 let score=(item.stars||0)*100;
 const areaText=[item.areaZh,item.area,item.address,...(item.transport?.stations||[]).map(station=>station.name)].filter(Boolean).join(' ');
 const cuisineText=[item.cuisineZh,item.cuisine].filter(Boolean).join(' ');
 if(query.area&&areaText.includes(query.area))score+=35;
 if(query.cuisineKeyword&&cuisineText.includes(query.cuisineKeyword))score+=35;
 if(ratingInfo(item))score+=5;
 if(item.reservation?.difficulty)score-=item.reservation.difficulty;
 return score;
}
function assistantReason(item,query){
 const reasons=[];
 if(query.city)reasons.push(`位于${query.city}`);
 if(query.area&&[item.areaZh,item.area,item.address,...(item.transport?.stations||[]).map(station=>station.name)].filter(Boolean).join(' ').includes(query.area))reasons.push(`地点匹配${query.area}`);
 if(query.cuisineKeyword&&[item.cuisineZh,item.cuisine].filter(Boolean).join(' ').includes(query.cuisineKeyword))reasons.push('菜系匹配');
 if(query.meal==='lunch')reasons.push('可预约 Lunch');
 if(query.meal==='dinner')reasons.push('可预约 Dinner');
 if(query.dress==='none')reasons.push('无明确 Dress Code');
 if(query.child==='yes')reasons.push('儿童政策已确认');
 if(query.solo)reasons.push('支持 Solo dining');
 if(ratingInfo(item))reasons.push('有公开评分参考');
 return reasons.join('，')||'综合星级、地点、菜系与筛选条件推荐。';
}
function localAssistantResult(message){
 const query=parseAssistantIntent(message);
 let pool=state.data.filter(item=>assistantBaseMatches(item,query));
 if(query.area||query.cuisineKeyword){
  const narrowed=pool.filter(item=>{
   const areaText=[item.areaZh,item.area,item.address,...(item.transport?.stations||[]).map(station=>station.name)].filter(Boolean).join(' ');
   const cuisineText=[item.cuisineZh,item.cuisine].filter(Boolean).join(' ');
   return (!query.area||areaText.includes(query.area))&&(!query.cuisineKeyword||cuisineText.includes(query.cuisineKeyword));
  });
  if(narrowed.length)pool=narrowed;
 }
 const recommendations=pool
  .sort((a,b)=>assistantScore(b,query)-assistantScore(a,query)||restaurantLocationRank(a)-restaurantLocationRank(b))
  .slice(0,3)
  .map(item=>({id:item.id,nameZh:item.nameZh,nameEn:item.nameEn,city:item.city,areaZh:item.areaZh,cuisineZh:item.cuisineZh,stars:item.stars,reason:assistantReason(item,query)}));
 return {
  query,
  recommendations,
  note:recommendations.length?'基于当前 StarTable 本地数据筛选推荐。':'当前数据中没有完全匹配条件的餐厅，请放宽地点、菜系或政策条件。'
 };
}
async function sendAssistantMessage(){
 const text=(els.assistantInput?.value||'').trim();
 if(!text)return;
 assistantAdd('user',`<p>${esc(text)}</p>`);
 els.assistantInput.value='';
 if(!isPremium()){
  state.searchCount+=1;
  localStorage.setItem(prefKey('searchCount'),String(state.searchCount));
  updateAccessNotice();
  if(state.searchCount>5){
   assistantAdd('assistant',`<p>${state.lang==='en'?'Free preview includes 5 assistant/search requests. Please upgrade to continue.':'免费预览包含 5 次搜索/星助理请求。继续使用请开通会员。'}</p><button type="button" data-open-membership>${state.lang==='en'?'Upgrade':'会员订阅'}</button>`);
   els.assistantMessages.querySelector('[data-open-membership]:last-child')?.addEventListener('click',openMembershipModal);
   return;
  }
 }
 if(location.protocol==='file:'){
  assistantAdd('assistant',formatAssistantResult(localAssistantResult(text)));
  return;
 }
 assistantAdd('assistant loading',`<p>${state.lang==='en'?'Searching StarTable data...':'正在查询 StarTable 数据...'}</p>`);
 try{
  const res=await fetch('/api/assistant',{method:'POST',headers:authHeaders({'Content-Type':'application/json'}),body:JSON.stringify({message:text,email:currentEmail(),searchCount:state.searchCount})});
 const data=await res.json();
 const loading=els.assistantMessages.querySelector('.assistant-message.loading:last-child');
 if(loading)loading.remove();
  if(!res.ok)throw new Error(data.error||'assistant failed');
  assistantAdd('assistant',formatAssistantResult(data));
 }catch(error){
  const loading=els.assistantMessages.querySelector('.assistant-message.loading:last-child');
  if(loading)loading.remove();
  assistantAdd('assistant',formatAssistantResult(localAssistantResult(text)));
 }
}
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
 const list=items=>items.length?`<div class="account-list">${items.map(x=>`<a href="${restaurantDetailUrl(x)}"><strong>${esc(restaurantName(x))}</strong><span>${stars(x.stars)} · ${esc(displayArea(x))}</span></a>`).join('')}</div>`:`<div class="account-empty">${esc(t('none'))}</div>`;
 const cityOptions=['',...cities().map(city=>city.labelZh)].map(value=>`<button class="account-city ${state.accountCity===value?'active':''}" type="button" data-account-city="${esc(value)}">${esc(cityDisplay(value))}</button>`).join('');
 const memberClass=`account-member ${esc(state.membership.status)}`;
 const memberMessage=state.user==='guest'?'登录后确认会员状态':(isPremium()?'当前邮箱已开通 Premium 会员':state.membership.message);
 const memberPlan=isPremium()?state.membership.plan:'Free';
 const memberRenewal=isPremium()?state.membership.renewal:'-';
 const memberAction=isPremium()?'会员中心':'会员订阅';
 els.accountPanel.innerHTML=`<div class="account-head"><div><p class="eyebrow">MY PAGE</p><strong>${esc(t('mypage'))}</strong><span>${esc(state.user==='guest'?'Guest':state.user)}</span></div><div class="account-actions"><button id="accountBackButton" class="ghost">${esc(t('back'))}</button><button id="logoutButton" class="ghost">${esc(t('logout'))}</button></div></div><div class="${memberClass}"><div><span>会员状态</span><strong>${esc(memberMessage)}</strong><small>绑定邮箱：${esc(state.user==='guest'?'未登录':state.user)}</small></div><div><span>方案</span><strong>${esc(memberPlan)}</strong><small>下次续费：${esc(memberRenewal)}</small></div><div class="account-member-actions"><button id="accountMembershipButton" class="ghost" type="button">${esc(memberAction)}</button><button id="accountManageSubscriptionButton" class="ghost" type="button">管理订阅</button></div></div><div class="account-city-row">${cityOptions}</div><div class="account-summary"><span>${esc(cityDisplay(state.accountCity))}${esc(t('done'))} <strong>${dones.length}</strong></span><span>${esc(t('want'))} <strong>${wants.length}</strong></span><span>${esc(t('favorite'))} <strong>${favs.length}</strong></span><span>${esc(t('globalDone'))} <strong>${allDones.length}</strong></span></div><div class="account-sections"><section><h3>${esc(t('done'))}</h3>${list(dones)}</section><section><h3>${esc(t('want'))}</h3>${list(wants)}</section><section><h3>${esc(t('favorite'))}</h3>${list(favs)}</section></div>`;
 $('accountBackButton')?.addEventListener('click',()=>{state.accountExpanded=false;updateAccount();window.scrollTo({top:0,behavior:'smooth'})});
 $('logoutButton')?.addEventListener('click',()=>{localStorage.removeItem('stSessionToken');setUser('guest')});
 $('accountMembershipButton')?.addEventListener('click',openMembershipModal);
 $('accountManageSubscriptionButton')?.addEventListener('click',manageSubscription);
 document.querySelectorAll('[data-account-city]').forEach(btn=>btn.addEventListener('click',()=>{state.accountCity=btn.dataset.accountCity;updateAccount()}));
 if(state.membership.status==='unknown')checkMembershipStatus();
}
function render(){
 els.grid.innerHTML='';
 const visibleItems=isPremium()?state.filtered:freePreviewItems(state.filtered);
 visibleItems.forEach(x=>els.grid.appendChild(makeCard(x)));
 const lockedCount=Math.max(0,state.filtered.length-visibleItems.length,Number(state.serverMeta?.locked||0));
 if(!isPremium()&&lockedCount>0)els.grid.appendChild(makeLimitCard(lockedCount));
 els.visible.textContent=state.filtered.length;
 els.empty.hidden=state.filtered.length!==0;
 updateAccessNotice();
 updateCompare();
 updateAccount();
}
function apply(options={}){
 const replaceUrl=options?.replace!==false;
 const q=els.search.value.trim();
 scheduleSearchUsage(q);
 const cityItems=selectedCityItems();
 updateStats(cityItems);
 if(q){
  state.filtered=sortRestaurants(cityItems.filter(x=>nameMatches(x,q)));
  render();
  syncFilterStateToUrl({replace:replaceUrl});
  return;
 }
 state.filtered=cityItems.filter(x=>{
 const mealOk=state.meal==='all'||availabilityOk(x,state.meal);
  const dressOk=!els.dress.value||filterDressCategory(x)===els.dress.value;
  const childOk=!els.child.value||filterChildCategory(x)===els.child.value;
  return mealOk&&soloOk(x)&&nameMatches(x,q)&&(!els.star.value||String(x.stars)===els.star.value)&&(!els.cuisine.value||x.cuisineZh===els.cuisine.value)&&(!els.area.value||displayArea(x)===els.area.value)&&priceFilterOk(x)&&dressOk&&childOk;
 });state.filtered=sortRestaurants(state.filtered);render();syncFilterStateToUrl({replace:replaceUrl})
}
async function init(){
 state.cityConfig=await loadCityConfig();
 loadFxRates().then(()=>render()).catch(error=>console.warn('FX rate load failed', error));
 rebuildCityControls();
 rebuildPriceOptions();
 const data=await loadRestaurantData();
 state.data=sortRestaurants(data);
 state.filtered=[...state.data];
 updateStats(selectedCityItems());
 addOptions(els.cuisine,new Set(state.data.map(x=>x.cuisineZh).filter(Boolean)));
 els.lastUpdated.textContent=state.data.map(x=>x.sync?.lastChecked).filter(Boolean).sort().at(-1)||'2026-08-02';
 updateCityButton();
 rebuildAreaControls();
 els.areaRail.addEventListener('click',e=>{const btn=e.target.closest('.area-pill');if(!btn)return;els.area.value=btn.dataset.area;document.querySelectorAll('.area-pill').forEach(x=>x.classList.toggle('active',x===btn));apply()});
 setLanguage(state.lang);
 readFilterStateFromUrl();
 apply({replace:true})
}
async function loadRestaurantData(){
 if(location.protocol!=='file:'){
  try{
   const res=await fetch('/api/restaurants',{headers:authHeaders()});
   if(res.ok){
    const payload=await res.json();
    if(Array.isArray(payload.restaurants)){
     state.serverMeta=payload.meta||null;
     if(payload.meta?.membership){
      setMembership(payload.meta.membership.active
       ? {status:'active',message:'当前邮箱已开通会员',plan:payload.meta.membership.plan,renewal:payload.meta.membership.renewal}
       : {status:'inactive',message:'当前邮箱暂未开通会员',plan:'Free',renewal:'-'});
     }
     return payload.restaurants;
    }
   }
  }catch(error){
   console.warn('API restaurant load failed, falling back to JSON', error);
  }
 }
 const res=await fetch('./data/restaurants.json');
 return res.json();
}
async function loadCityConfig(){
 try{
  const res=await fetch('./data/cities.json');
  if(res.ok)return res.json();
 }catch(error){
  console.warn('City config load failed', error);
 }
 return {cities:[],defaultPriceTiers:[]};
}
async function loadFxRates(){
 const cached=JSON.parse(localStorage.getItem('stFxRates')||'null');
 const today=new Date().toISOString().slice(0,10);
 if(cached?.date===today&&cached.rates){
  cnyRates={...cnyFallbackRates,...cached.rates,CNY:1};
  return;
 }
 const res=await fetch('https://open.er-api.com/v6/latest/CNY');
 if(!res.ok)throw new Error('fx failed');
 const data=await res.json();
 const rates=data.rates||{};
 const next={CNY:1};
 ['JPY','HKD','EUR','USD'].forEach(code=>{if(rates[code])next[code]=1/Number(rates[code])});
 cnyRates={...cnyFallbackRates,...next};
 localStorage.setItem('stFxRates',JSON.stringify({date:today,rates:next}));
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
els.membershipButton?.addEventListener('click',openMembershipModal);
els.membershipClose?.addEventListener('click',()=>els.membershipModal.close());
els.checkoutButtons.forEach(btn=>btn.addEventListener('click',()=>startCheckout(btn.dataset.checkoutPlan)));
els.manageSubscriptionButton?.addEventListener('click',manageSubscription);
els.assistantButton?.addEventListener('click',()=>{els.assistantPanel.hidden=!els.assistantPanel.hidden;if(!els.assistantPanel.hidden){ensureAssistantIntro();els.assistantInput?.focus()}});
els.assistantClose?.addEventListener('click',()=>{els.assistantPanel.hidden=true});
els.assistantSend?.addEventListener('click',sendAssistantMessage);
els.loginClose.addEventListener('click',()=>els.loginModal.close());
els.loginCodeSend?.addEventListener('click',requestLoginCode);
els.loginSubmit.addEventListener('click',verifyLoginCode);
window.addEventListener('popstate',()=>{readFilterStateFromUrl();apply({replace:true})});
init().then(handleCheckoutReturn).catch(e=>{els.empty.hidden=false;els.empty.textContent='数据加载失败，请确认已部署到 GitHub Pages。';console.error(e)});
