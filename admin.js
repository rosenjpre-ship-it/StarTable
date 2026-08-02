let data=[];
let currentId=null;
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

function statusOf(r){
 if(r.dressCode?.publicInfoStatus==='not explicitly published'||r.childPolicy?.publicInfoStatus==='not explicitly published')return '需确认政策';
 return '基础完整';
}
function filtered(){
 const q=$('adminSearch').value.trim().toLowerCase();
 const s=$('adminStatus').value;
 return data.filter(r=>{
  const hay=[r.nameZh,r.nameJa,r.nameEn,r.areaZh,r.cuisineZh,r.address,r.phone].join(' ').toLowerCase();
  const statusOk=!s||(s==='sourcePending'&&statusOf(r)==='需确认政策')||(s==='complete'&&statusOf(r)==='基础完整');
  return (!q||hay.includes(q))&&statusOk;
 });
}
function renderRows(){
 $('adminCount').textContent=data.length;
 $('adminRows').innerHTML=filtered().map(r=>`<tr>
  <td><strong>${esc(r.nameZh||r.name)}</strong><br><span class="updated">${esc(r.nameJa||r.nameEn||'')}</span></td>
  <td>${'★'.repeat(r.stars)}</td>
  <td>${esc(r.areaZh||'')}</td>
  <td>${esc(r.ratings?.tabelogScore||'-')}</td>
  <td><span class="status-pill">${esc(statusOf(r))}</span></td>
  <td><button data-id="${esc(r.id)}">编辑</button></td>
 </tr>`).join('');
}
function selectRecord(id){
 currentId=id;
 const item=data.find(r=>r.id===id);
 $('editor').value=JSON.stringify(item,null,2);
 document.querySelectorAll('[data-id]').forEach(btn=>btn.classList.toggle('active',btn.dataset.id===id));
}
function saveRecord(){
 if(!currentId)return;
 let next;
 try{next=JSON.parse($('editor').value)}catch(e){alert('JSON 格式错误，无法保存。');return}
 const index=data.findIndex(r=>r.id===currentId);
 if(index<0)return;
 data[index]=next;
 currentId=next.id;
 renderRows();
 selectRecord(currentId);
}
function downloadJson(){
 const blob=new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='restaurants.json';
 a.click();
 URL.revokeObjectURL(a.href);
}
async function copyRecord(){
 if(!$('editor').value)return;
 await navigator.clipboard.writeText($('editor').value);
}
async function init(){
 data=await fetch('./data/restaurants.json').then(r=>r.json());
 renderRows();
 if(data[0])selectRecord(data[0].id);
 $('adminSearch').addEventListener('input',renderRows);
 $('adminStatus').addEventListener('input',renderRows);
 $('adminRows').addEventListener('click',e=>{const btn=e.target.closest('[data-id]');if(btn)selectRecord(btn.dataset.id)});
 $('saveRecord').addEventListener('click',saveRecord);
 $('downloadButton').addEventListener('click',downloadJson);
 $('copyRecord').addEventListener('click',copyRecord);
}
init().catch(e=>{document.body.insertAdjacentHTML('beforeend','<div class="empty">管理表加载失败。</div>');console.error(e)});
