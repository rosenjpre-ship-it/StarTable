const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const stars=n=>'★'.repeat(n);
const diff=n=>n?'★'.repeat(n)+'☆'.repeat(5-n):'待评估';
const normalizeSearch=value=>String(value||'').toLowerCase().normalize('NFKC').replace(/\s+/g,'').replace(/[·・･\-.＿_]/g,'').replace(/[臺]/g,'台').replace(/[龍]/g,'龙').replace(/[銀]/g,'银').replace(/[壽]/g,'寿').replace(/[廣]/g,'广').replace(/[國]/g,'国').replace(/[廳]/g,'厅').replace(/[樓]/g,'楼').replace(/[灣]/g,'湾').replace(/[麵]/g,'面');
const normalizeId=value=>normalizeSearch(value).replace(/[^a-z0-9\u4e00-\u9fffぁ-んァ-ンー]/g,'');
const slugFromName=value=>String(value||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const activeUser=localStorage.getItem('stUser')||'guest';
const prefKey=name=>`st:${activeUser}:${name}`;
const userState={
 favorites:new Set(JSON.parse(localStorage.getItem(prefKey('favorites'))||'[]')),
 marks:JSON.parse(localStorage.getItem(prefKey('marks'))||'{}')
};
let cityConfig={cities:[],defaultPriceTiers:[]};
const cnyFallbackRates={JPY:.049,HKD:.92,EUR:8.35,USD:7.2,CNY:1};
let cnyRates={...cnyFallbackRates};
function listReturnUrl(){
 const raw=new URLSearchParams(location.search).get('return');
 if(raw){
  try{
   if(/^[?#]/.test(raw))return `./index.html${raw}`;
   if(/^\.\/index\.html(?:[?#].*)?$/.test(raw))return raw;
   if(/^index\.html(?:[?#].*)?$/.test(raw))return `./${raw}`;
   const url=new URL(raw, location.href);
   if(url.origin===location.origin)return `./index.html${url.search}${url.hash}`;
  }catch(error){
   console.warn('Invalid return URL', error);
  }
 }
 return './index.html';
}
function updateBackLinks(){
 const href=listReturnUrl();
 document.querySelectorAll('[data-back-list], .nav-link').forEach(link=>link.setAttribute('href',href));
}
function restaurantIdFromLocation(){
 const params=new URLSearchParams(location.search);
 const id=params.get('id');
 if(id)return id;
 const hashParams=new URLSearchParams(String(location.hash||'').replace(/^#/,''));
 const hashId=hashParams.get('id');
 if(hashId)return hashId;
 const match=location.pathname.match(/\/restaurant(?:\.html)?\/([^/?#]+)/);
 if(match)return decodeURIComponent(match[1]);
 return sessionStorage.getItem('stPendingRestaurantId')||'';
}
function findRestaurantById(data,id){
 const raw=String(id||'').trim();
 if(!raw)return null;
 const exact=data.find(item=>item.id===raw);
 if(exact)return exact;
 const normalized=normalizeId(raw);
 const direct=data.find(item=>normalizeId(item.id)===normalized);
 if(direct)return direct;
 const withoutCity=raw.replace(/^(tokyo|hk|hong-kong|shanghai|paris)-/i,'');
 if(withoutCity&&withoutCity!==raw){
  const stripped=data.find(item=>item.id===withoutCity||normalizeId(item.id)===normalizeId(withoutCity));
  if(stripped)return stripped;
 }
 const citylessNormalized=normalizeId(withoutCity);
 return data.find(item=>[item.name,item.nameEn,item.nameZh,item.nameJa,...(item.aliases||[]),...(item.searchKeywords||[])].some(candidate=>{
  const slug=slugFromName(candidate);
  return slug&&(slug===raw||slug===withoutCity||normalizeId(slug)===normalized||normalizeId(slug)===citylessNormalized);
 }))||null;
}
function saveUserState(){
 localStorage.setItem(prefKey('favorites'),JSON.stringify([...userState.favorites]));
 localStorage.setItem(prefKey('marks'),JSON.stringify(userState.marks));
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
function ratingInfo(item){
 const r=item.ratings||{};
 const config=cityConfigForItem(item);
 for(const platform of config?.ratingPlatforms||[]){
  const value=r[platform.key];
  if(value)return {label:platform.label,value,url:r[platform.urlKey]};
 }
 return r.localScore?{label:r.localPlatform||'本地评分',value:r.localScore,url:r.localUrl}:null;
}
function ratingRowHtml(item){
 const info=ratingInfo(item);
 if(info)return `<div><dt>${esc(info.label)}</dt><dd>${esc(info.value)}</dd></div>`;
 if(item.ratings?.publicInfoStatus==='stable public score not found'){
  return '<div><dt>本地评分</dt><dd>已核对，暂无稳定公开评分。</dd></div>';
 }
 return '';
}
function fieldSource(item,field){
 const checked=item.sync?.lastChecked||item.transport?.lastChecked||'2026-08-02';
 const ratingSource=(cityConfigForItem(item)?.ratingPlatforms||[]).map(x=>x.label).filter(Boolean).join(' / ')||'本地评分平台';
 const map={basic:'官网 / 米其林 / 公开预约页',transport:'地址与车站公开信息',reservation:'官网 / 预约页 / 电话',course:'官网 / 预约页 / 米其林',rating:ratingSource,policy:'官网 / 预约页',budget:'官网 / 预约页 / 米其林'};
 return `<span class="field-source">${esc(map[field]||'公开来源')} · ${esc(checked)}</span>`;
}
function sourceBadges(item){
 const badges=[];
 const ratingSource=(cityConfigForItem(item)?.ratingPlatforms||[]).map(x=>x.label).filter(Boolean).join('/')||'本地评分平台';
 if(item.sync?.source)badges.push(`来源：公开官网/预约页/米其林/${ratingSource}`);
 if(item.sync?.lastChecked)badges.push(`检查：${item.sync.lastChecked}`);
 if(item.dressCode?.publicInfoStatus==='not explicitly published')badges.push('着装需预约确认');
 if(item.childPolicy?.publicInfoStatus==='not explicitly published')badges.push('儿童政策需预约确认');
 return badges.map(x=>`<span class="source-badge">${esc(x)}</span>`).join('');
}
function cityConfigForItem(item){
 const raw=String(item.city||'').toLowerCase();
 return cityConfig.cities.find(config=>String(config.dataCity||'').toLowerCase()===raw||String(config.labelZh||'').toLowerCase()===raw||String(config.id||'').toLowerCase()===raw)||null;
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
function budgetHtml(item){
 const b=item.budget;
 if(!b||b.verified===false)return '需预约确认';
 if(b.publicPriceStatus==='tier estimate only')return '需预约确认';
 const currency=currencyForItem(item);
 const lunch=b.lunchFrom!=null?cnyEstimate(Number(b.lunchFrom),currency):null;
 const dinner=b.dinnerFrom!=null?cnyEstimate(Number(b.dinnerFrom),currency):null;
 return `<span class="budget-line">Lunch ${esc(localBudgetAmount(item,b.lunchFrom))}${lunch?`<span class="cny-price">${esc(lunch)}</span>`:''}</span><span class="budget-line">Dinner ${esc(localBudgetAmount(item,b.dinnerFrom))}${dinner?`<span class="cny-price">${esc(dinner)}</span>`:''}</span>`;
}
function localBudgetAmount(item,value){
 if(value==null)return '需预约确认';
 const config=cityConfigForItem(item);
 const symbol=config?.currencySymbol||'¥';
 return `${symbol}${Number(value).toLocaleString('zh-CN')} 起`;
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
 return '前往官网预约';
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
 if(item.tableManners?.notes?.length)return item.tableManners.notes;
 return [
  '准时到店；迟到会影响餐序，建议提前 5-10 分钟抵达。',
  '预约前整理过敏、忌口、同行人数与联系方式，避免临时更改。',
  '避免强烈香水、香氛护手霜或烟味。',
  '拍照前观察店内氛围，避免影响厨师和其他客人。'
 ];
}
function mannersHtml(item){
 return mannersList(item).map((x,i)=>`<li><span class="manners-label">${String(i+1).padStart(2,'0')}</span><span class="manners-text">${esc(x)}</span></li>`).join('');
}
function heroImageUrl(item){
 return item.heroImage||item.image?.url||item.media?.hero||item.media?.heroImage||'';
}
function detailHeroMediaHtml(item){
 const url=heroImageUrl(item);
 return `<div class="detail-hero-media ${url?'has-image':''}">${url?`<img src="${esc(url)}" alt="${esc(item.nameZh||item.name)} 餐厅照片" loading="lazy" onerror="this.remove();this.parentElement.classList.remove('has-image')">`:''}<span>STARTABLE</span></div>`;
}
function mealTable(item,items){
 if(!items?.length)return '<div class="content-empty">该餐期暂无公开套餐信息。</div>';
 return `<div class="course-list">${items.map(x=>`<article class="course-card"><div class="course-main"><h4>${esc(x.name)}</h4><strong>${priceHtml(item,x.price)}</strong></div><div class="course-body">${x.details?.length?`<ol class="course-details">${x.details.map(d=>`<li>${esc(d)}</li>`).join('')}</ol>`:'<p>待补充</p>'}</div>${x.note?`<p class="course-note">${esc(x.note)}</p>`:''}</article>`).join('')}</div>`;
}
function links(item){
 const entries=Object.entries(item.links||{}).filter(([k,v])=>['official','reservation','localListing','tabelog','openrice','dianping','ctrip','instagram'].includes(k)&&v);
 if(entries.length)return entries.map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(linkLabel(k,v))}</a>`).join('');
 if(item.phone)return `<a href="${esc(reservationHref(item))}">电话预约</a>`;
 return '<span>链接待补充</span>';
}
function linkLabel(key,url){
 if(key==='official')return isOfficialUrl(url)?'官网':'公开入口';
 if(key==='reservation')return isOfficialUrl(url)?'预约':'预约入口';
 if(key==='localListing')return listingLabel(url);
 if(key==='dianping')return '大众点评';
 if(key==='openrice')return 'OpenRice';
 if(key==='ctrip')return '携程';
 if(key==='tabelog')return 'Tabelog';
 if(key==='instagram')return 'Instagram';
 return key;
}
function listingLabel(url){
 const value=String(url||'').toLowerCase();
 if(value.includes('guide.michelin.com'))return '米其林';
 if(value.includes('viamichelin.com'))return 'ViaMichelin';
 if(value.includes('joinpearl.co'))return 'Pearl';
 if(value.includes('laliste.com'))return 'La Liste';
 if(value.includes('cityhui.com'))return '城市惠';
 if(value.includes('trip.com')||value.includes('ctrip.com'))return '携程';
 if(value.includes('tripadvisor.'))return 'Tripadvisor';
 if(value.includes('maps.apple.com'))return '大众点评';
 return '公开资料';
}
function isTokyo(item){
 return String(item.city||'').toLowerCase().includes('tokyo');
}
function render(item){
 document.title=`${item.nameZh||item.name} | StarTable`;
 if(item.locked){
  $('restaurantDetail').innerHTML=`<section class="detail-identity"><div class="detail-copy locked-detail"><p class="eyebrow">PREMIUM</p><h1>${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars||0)}</span></h1><p class="sub">${esc([item.nameJa,item.nameEn,item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</p><p class="detail-lead">该餐厅完整资料仅会员可查看。会员可解锁全部餐厅详情、预约入口、Course、用餐规则和高阶筛选。</p><div class="restaurant-actions"><a class="reserve" href="./index.html#membership">返回首页开通会员</a></div></div></section>`;
  return;
 }
 const isFav=userState.favorites.has(item.id);
 const mark=userState.marks[item.id];
 $('restaurantDetail').innerHTML=`
 <section class="detail-identity">
  <div class="detail-copy">
    <p class="eyebrow">RESTAURANT DETAIL</p>
    <h1>${esc(item.nameZh||item.name)} <span class="stars">${stars(item.stars)}</span></h1>
    <p class="sub">${esc([item.nameJa,item.nameEn,item.areaZh,item.cuisineZh].filter(Boolean).join(' ｜ '))}</p>
    <div class="source-row">${sourceBadges(item)}</div>
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
    <div><dt>交通信息</dt><dd class="station-line">${stationHtml(item).replace('交通信息：','')}</dd></div>
    <div class="budget-row"><dt>预算</dt><dd>${budgetHtml(item)}</dd></div>
    ${ratingRowHtml(item)}
   </dl>
   ${fieldSource(item,'basic')}
  </section>
  <section class="detail-block">
   <h3>预约信息</h3>
   <p class="detail-lead">${esc(`${diff(item.reservation?.difficulty||0)} ${item.reservation?.difficultyLabel||''}`)}</p>
   <p>${esc(item.reservation?.bookingRule||'需预约确认')}</p>
   <div class="reservation-guide">${reservationGuideHtml(item)}</div>
   ${reserveActionHtml(item)}
   ${fieldSource(item,'reservation')}
  </section>
  <section class="detail-block">
   <h3>用餐规则</h3>
   <dl class="detail-list compact">
    <div><dt>Dress Code</dt><dd>${esc(dressText(item.dressCode))}</dd></div>
    <div><dt>儿童政策</dt><dd>${esc(childText(item.childPolicy))}</dd></div>
    <div><dt>Solo dining</dt><dd>${esc(soloText(item))}</dd></div>
   </dl>
   <ul class="manners detail-manners">${mannersHtml(item)}</ul>
   ${fieldSource(item,'policy')}
  </section>
  <section class="detail-block">
   <h3>链接</h3>
   <div class="link-list">${links(item)}</div>
  </section>
 </div>
 <div class="detail-menu-grid">
  <section class="modal-section"><h3>Lunch Course</h3>${mealTable(item,item.lunch)}${fieldSource(item,'course')}</section>
  <section class="modal-section"><h3>Dinner Course</h3>${mealTable(item,item.dinner)}${fieldSource(item,'course')}</section>
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
 updateBackLinks();
 cityConfig=await loadCityConfig();
 loadFxRates().then(()=>{
  const id=restaurantIdFromLocation();
  if(id)loadRestaurantData(id).then(item=>item&&render(item));
 }).catch(error=>console.warn('FX rate load failed', error));
 const id=restaurantIdFromLocation();
 const pendingReturn=sessionStorage.getItem('stPendingReturnUrl');
 if(!new URLSearchParams(location.search).get('return')&&pendingReturn){
  const url=new URL(location.href);
  if(id)url.searchParams.set('id',id);
  url.searchParams.set('return',pendingReturn);
  history.replaceState(null,'',`${url.pathname}${url.search}${url.hash}`);
  updateBackLinks();
 }
 if(!id){
  renderMissing('缺少餐厅 ID。请从餐厅列表重新打开详情页。');
  return;
 }
 const item=await loadRestaurantData(id);
 if(!item){
  renderMissing('未找到这家餐厅。请返回列表重新选择。');
  return;
 }
 render(item);
}
function renderMissing(message){
 $('restaurantDetail').innerHTML=`<section class="detail-identity"><div class="detail-copy locked-detail"><p class="eyebrow">NOT FOUND</p><h1>餐厅详情未找到</h1><p class="detail-lead">${esc(message)}</p><div class="restaurant-actions"><a class="reserve" data-back-list href="${esc(listReturnUrl())}">返回餐厅列表</a></div></div></section>`;
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
async function loadRestaurantData(id){
 if(location.protocol!=='file:'&&id){
  try{
   const token=localStorage.getItem('stSessionToken')||'';
   const headers=token?{Authorization:`Bearer ${token}`}:{};
   const res=await fetch(`/api/restaurants?id=${encodeURIComponent(id)}`,{headers});
   if(res.status===402){
    const payload=await res.json();
    return payload.restaurant ? {...payload.restaurant, locked:true} : null;
   }
   if(res.ok){
    const payload=await res.json();
    if(payload.restaurant)return payload.restaurant;
   }
  }catch(error){
   console.warn('API restaurant detail load failed, falling back to JSON', error);
  }
 }
 const data=await fetch('./data/restaurants.json').then(r=>r.json());
 return findRestaurantById(data,id);
}
init().catch(e=>{$('restaurantDetail').innerHTML='<div class="empty">餐厅详情加载失败。</div>';console.error(e)});
