const nav = document.querySelector('.header__wrapper');
const navBtn = document.querySelector('.header__nav-btn');

navBtn.addEventListener('click', () => {
  nav.classList.toggle('header__wrapper--active');
  navBtn.classList.toggle('header__nav-btn--active');
});

// window.addEventListener('resize', () => {
//   window.location.reload();
// });
