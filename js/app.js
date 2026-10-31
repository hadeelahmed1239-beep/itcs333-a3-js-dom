document.addEventListener('DOMContentLoaded', function () {
  let form = document.querySelector('#todo-form');
  let input = document.querySelector('#todo-input');
  let errorMsg = document.querySelector('#error-msg');
  let list = document.querySelector('#todo-list');
  let counter = document.querySelector('#counter');
  let filters = document.querySelectorAll('.filters button');
  let currentFilter = 'all';

  function updateCounter() {
    let count = 0;
    for (let li of list.children) {
      if (!li.classList.contains('completed')) {
        count++;
      }
    }
    if (count === 1) {
      counter.textContent = '1 item left';
    } else {
      counter.textContent = count + ' items left';
    }
  }

  function applyFilter() {
    for (let li of list.children) {
      let done = li.classList.contains('completed');
      if (currentFilter === 'active' && done) {
        li.style.display = 'none';
      } else if (currentFilter === 'done' && !done) {
        li.style.display = 'none';
      } else {
        li.style.display = '';
      }
    }
  }

  function addItem(e) {
    e.preventDefault();
    let text = input.value.trim();

    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');

    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = text;
    span.className = 'item-text';
    let btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);

    input.value = '';
    applyFilter();
    updateCounter();
  }

  // Event delegation: one listener on the list
  function handleListClick(e) {
    let target = e.target;
    let li = target.tagName === 'LI' ? target : target.parentNode;

    if (target.classList.contains('delete-btn')) {
      list.removeChild(li);
    } else {
      li.classList.toggle('completed');
    }
    applyFilter();
    updateCounter();
  }

  function setFilter(e) {
    if (e.target.id === 'filter-active') {
      currentFilter = 'active';
    } else if (e.target.id === 'filter-done') {
      currentFilter = 'done';
    } else {
      currentFilter = 'all';
    }
    applyFilter();
  }

  form.addEventListener('submit', addItem);
  list.addEventListener('click', handleListClick);
  for (let btn of filters) {
    btn.addEventListener('click', setFilter);
  }

  updateCounter();
});
