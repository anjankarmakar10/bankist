'use strict';

///////////////////////////////////////
// element variables

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelector('.btn--show-modal');

// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button Scrolling//
document.querySelector('.btn--scroll-to').addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation (using event delegation)//

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabs
let tabs = document.querySelectorAll('.operations__tab');
let tabContainer = document.querySelector('.operations__tab-container');

let tabsContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', e => {
  let clicked = e.target.closest('.operations__tab');

  //Guard Clause
  if (!clicked) return;

  //Remove all tabs and contents active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContents.forEach(t => t.classList.remove('operations__content--active'));

  // Add active class on clicked tabs and content
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
