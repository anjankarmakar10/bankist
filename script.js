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
  // section.classList.add('section--hidden');
});

// Lazy Loading Images

let imgs = document.querySelectorAll('img[data-src]');

let imgObserver = new IntersectionObserver(
  (entires, observer) => {
    const [entry] = entires;

    if (!entry.isIntersecting) return;

    let image = entry.target;
    image.src = image.dataset.src;

    // When the image load then remove this blur class
    image.addEventListener('load', () => {
      image.classList.remove('lazy-img');
    });

    // at last sopt observing images
    observer.unobserve(image);
  },
  { threshold: 0, rootMargin: '200px' }
);

imgs.forEach(img => {
  imgObserver.observe(img);
});

//Slider

let slides = document.querySelectorAll('.slide');
let btnSliderRight = document.querySelector('.slider__btn--right');
let btnSliderLeft = document.querySelector('.slider__btn--left');
let dotContainer = document.querySelector('.dots');

let currentSlide = 0;
let maxSlide = slides.length - 1;

function createDots() {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

function activateDot(slide) {
  // remove the active class form all dot
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });

  // add the active class to current dot
  let currentSlide = document.querySelector(
    `.dots__dot[data-slide="${slide}"]`
  );
  currentSlide.classList.add('dots__dot--active');
}

function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function nextSlide() {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else currentSlide--;

  goToSlide(currentSlide);
  activateDot(currentSlide);
}

function init() {
  createDots();
  activateDot(0);
  goToSlide(0);
}

init();

// Event handler
btnSliderLeft.addEventListener('click', prevSlide);
btnSliderRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', e => {
  let key = e.key.toLowerCase();
  key == 'arrowleft' && prevSlide();
  key == 'arrowright' && nextSlide();
});

dotContainer.addEventListener('click', e => {
  let element = e.target;

  if (element.classList.contains('dots__dot')) {
    // change the slide
    let { slide } = element.dataset;
    goToSlide(slide);

    activateDot(slide);
  }
});




// DOM lifecycle

 // this event call after the dom content loaded
// document.addEventListener('DOMContentLoaded', e => {
//   console.log('HTML parsed and Dom tree built');
// });


 // this event call after the page fully loaded
// document.addEventListener('load', e => {
//   console.log('page fully loaded');
// });
