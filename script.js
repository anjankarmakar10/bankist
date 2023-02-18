'use strict';

///////////////////////////////////////
// element variables

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelector('.btn--show-modal');
const section1 = document.querySelector('#section--1');
let tabs = document.querySelectorAll('.operations__tab');
let tabContainer = document.querySelector('.operations__tab-container');
let tabsContents = document.querySelectorAll('.operations__content');
let nav = document.querySelector('nav');
let navLinks = document.querySelectorAll('.nav__link');
let header = document.querySelector('.header');

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

//Menu fade animation
//This function set the opacity of an element
function setOpaticy(item, opacity) {
  item.style.opacity = opacity;
}

function handleNavHover(event, opacity) {
  nav.addEventListener(event, e => {
    let link = e.target;
    if (link.classList.contains('nav__link')) {
      let logo = nav.closest('.nav').querySelector('img');
      navLinks.forEach(item => setOpaticy(item, opacity));
      setOpaticy(logo, opacity);
      setOpaticy(link, 1);
    }
  });
}

handleNavHover('mouseover', 0.5);
handleNavHover('mouseout', 1);

// Sticky Navigation

//to find a element position
// let initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', e => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// Add sticky on scroll up and remove on scroll down
// window.onscroll = function (e) {
//   if (this.oldScroll > this.scrollY) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }

//   if (window.scrollY === 0) {
//     nav.classList.remove('sticky');
//   }

//   this.oldScroll = this.scrollY;
// }

// Sticky Navigation : Intersection Observer API

let navHeight = nav.getBoundingClientRect().height;

let headerObserver = new IntersectionObserver(
  entires => {
    const [entry] = entires;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  },
  {
    root: null,
    treshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

// Reveal sections on scroll view

let revealObserver = new IntersectionObserver(
  entires => {
    const [entry] = entires;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
  },
  {
    root: null,
    threshold: 0.15,
  }
);

let sections = document.querySelectorAll('.section');
sections.forEach(section => {
  revealObserver.observe(section);
  section.classList.add('section--hidden');
});
