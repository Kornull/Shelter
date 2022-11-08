const headerElements = document.querySelector('.header');
const btnBurger = document.querySelector('.burger');
const burgerWhite = document.querySelector('.header--our');
const blocksHeader = headerElements.querySelectorAll('div');
const burgerIcon = headerElements.querySelector('span');
const nav = headerElements.querySelector('.nav');
const navLink = nav.querySelectorAll('.nav__link');
const logoBurger = headerElements.querySelector('.burger__logo');
const shadow = document.querySelector('.shadow');
let widthWindow;


// Remove all classes
function removeClass() {
  document.body.classList.remove('active');
  nav.classList.remove('active');
  blocksHeader.forEach(x => x.classList.remove('active'));
  burgerIcon.classList.remove('active');
  logoBurger.classList.remove('active__logo');
  shadow.classList.remove('active');
  navLink.forEach(x => {
    if (x.querySelector('#text-our')) {
      x.querySelector('a').classList.add('link--our');
      x.querySelector('a').classList.remove('link');
      if (x.querySelector('.active--color')) {
        x.querySelector('a').classList.add('active--link-our');
        x.querySelector('a').classList.remove('active--link');
      }
    }
  });
  if (burgerWhite) {
    burgerWhite.classList.remove('active');
    logoBurger.classList.add('logo--pets');
  }
};

// Click
if (btnBurger) {
  btnBurger.onclick = () => {
    document.body.classList.toggle('active');
    nav.classList.toggle('active');
    blocksHeader.forEach(x => x.classList.toggle('active'));
    burgerIcon.classList.toggle('active');
    logoBurger.classList.toggle('active__logo');
    shadow.classList.toggle('active');
    if (burgerWhite) {
      burgerWhite.classList.toggle('active');
    }
    if (logoBurger.classList.contains('logo--pets')) {
      logoBurger.classList.remove('logo--pets');
    } else {
      if (burgerWhite) {
        logoBurger.classList.add('logo--pets');
      }
    }

    navLink.forEach(x => {
      if (x.querySelector('#text-our')) {


      }
      if (x.querySelector('.active--color')) {
        x.querySelector('a').classList.toggle('active--link-our');
        x.querySelector('a').classList.toggle('active--link');
      }
    });
  }
}

navLink.forEach(x => x.onclick = (el) => {
  removeClass();
});



// Remove
window.addEventListener("orientationchange", removeClass);
window.addEventListener('resize', function (el) {
  widthWindow = window.innerWidth
  if (widthWindow > 767) {
    removeClass();
  }
});

shadow.addEventListener('click', removeClass);