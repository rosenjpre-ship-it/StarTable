const state = { data: [], filtered: [] };

const els = {
  grid: document.getElementById('restaurantGrid'),
  template: document.getElementById('restaurantTemplate'),
  search: document.getElementById('searchInput'),
  star: document.getElementById('starFilter'),
  cuisine: document.getElementById('cuisineFilter'),
  area: document.getElementById('areaFilter'),
  difficulty: document.getElementById('difficultyFilter'),
  visible: document.getElementById('visibleCount'),
  courses: document.getElementById('courseCount'),
  total: document.getElementById('totalRestaurants'),
  reset: document.getElementById('resetButton'),
  empty: document.getElementById('emptyState')
};

function difficultyStars(n){ return '★'.repeat(n) + '☆'.repeat(5 - n); }
function michelinStars(n){ return '★'.repeat(n); }

function populateFilters(data){
  const cuisines = [...new Set(data.map(x => x.cuisine))].sort();
  const areas = [...new Set(data.map(x => x.area))].sort();
  cuisines.forEach(value => els.cuisine.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`));
  areas.forEach(value => els.area.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`));
}

function createCard(item){
  const fragment = els.template.content.cloneNode(true);
  const card = fragment.querySelector('.restaurant-card');
  const summary = fragment.querySelector('.card-summary');
  const detail = fragment.querySelector('.card-detail');

  fragment.querySelector('.restaurant-ja').textContent = item.nameJa;
  fragment.querySelector('.restaurant-name').textContent = item.name;
  fragment.querySelector('.stars').textContent = michelinStars(item.stars);
  fragment.querySelector('.difficulty').textContent = difficultyStars(item.difficulty);
  fragment.querySelector('.booking').textContent = item.booking;
  fragment.querySelector('.plate').textContent = item.plate;

  const chips = fragment.querySelector('.chips');
  [item.cuisine, item.area, `${item.lunch.length} 个午餐套餐`].forEach(text => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = text;
    chips.appendChild(span);
  });

  const link = fragment.querySelector('.booking-link');
  link.href = item.url;

  const tbody = fragment.querySelector('.course-body');
  item.lunch.forEach(course => {
    const tr = document.createElement('tr');
    [course.name, course.price, course.note].forEach((value, index) => {
      const td = document.createElement('td');
      td.textContent = value;
      if(index === 1) td.style.fontWeight = '700';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  summary.addEventListener('click', () => {
    const expanded = summary.getAttribute('aria-expanded') === 'true';
    summary.setAttribute('aria-expanded', String(!expanded));
    detail.hidden = expanded;
  });

  return fragment;
}

function render(){
  els.grid.innerHTML = '';
  state.filtered.forEach(item => els.grid.appendChild(createCard(item)));
  els.visible.textContent = state.filtered.length;
  els.courses.textContent = state.filtered.reduce((sum, x) => sum + x.lunch.length, 0);
  els.empty.hidden = state.filtered.length !== 0;
}

function applyFilters(){
  const q = els.search.value.trim().toLowerCase();
  state.filtered = state.data.filter(item => {
    const haystack = [
      item.name, item.nameJa, item.cuisine, item.area, item.booking, item.plate,
      ...item.lunch.flatMap(x => [x.name, x.price, x.note])
    ].join(' ').toLowerCase();

    return (!q || haystack.includes(q))
      && (!els.star.value || String(item.stars) === els.star.value)
      && (!els.cuisine.value || item.cuisine === els.cuisine.value)
      && (!els.area.value || item.area === els.area.value)
      && (!els.difficulty.value || String(item.difficulty) === els.difficulty.value);
  });
  render();
}

async function init(){
  try{
    const response = await fetch('./data/restaurants.json');
    if(!response.ok) throw new Error('数据加载失败');
    state.data = await response.json();
    state.filtered = [...state.data];
    els.total.textContent = state.data.length;
    populateFilters(state.data);
    render();
  }catch(error){
    els.empty.hidden = false;
    els.empty.textContent = '无法加载餐厅数据。请通过本地服务器或 GitHub Pages 打开此网站。';
    console.error(error);
  }
}

[els.search, els.star, els.cuisine, els.area, els.difficulty].forEach(el => {
  el.addEventListener('input', applyFilters);
});

els.reset.addEventListener('click', () => {
  els.search.value = '';
  els.star.value = '';
  els.cuisine.value = '';
  els.area.value = '';
  els.difficulty.value = '';
  state.filtered = [...state.data];
  render();
});

init();
