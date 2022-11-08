import obj from '../../main/pets.json';
import { popurRun } from './popup.js';

const blockPagination = document.querySelector('.slide__pagination');
const BUTNS = document.querySelector('.btns__slider-pets');
const pagBlocks = document.querySelectorAll('.pagination__block');
const allPagBtns = BUTNS.querySelectorAll('.btn__our-pets');
const numberStr = document.querySelector('.num__page-slider');
const btnR = BUTNS.querySelector('.pets--right');
const btnAllR = BUTNS.querySelector('.pets--all__right');
const btnL = document.querySelector('.pets--left');
const btnAllL = document.querySelector('.pets--left__all');
const arrName = [];
const arrDesctop2 = [];
let count = 0;
function paginationNumbers(counts) {
  BUTNS.addEventListener('click', (ev) => {
    if (ev.target.className === 'btn__our-pets pets--right') {

      numberStr.innerHTML = +numberStr.textContent + 1;
      allPagBtns.forEach(x => x.classList.remove('inactive'));
      pageCards(+numberStr.innerHTML)

      if (+numberStr.textContent !== 1 && +numberStr.textContent !== arrDesctop2.length) {
        allPagBtns.forEach(x => x.classList.remove('inactive'));
        allPagBtns.forEach(x => x.removeAttribute('disabled'));
      }

    } if (ev.target.className === 'btn__our-pets pets--left') {
      numberStr.innerHTML = +numberStr.textContent - 1;
      allPagBtns.forEach(x => x.classList.remove('inactive'));
      pageCards(+numberStr.innerHTML);

      if (+numberStr.textContent !== 1 && +numberStr.textContent !== arrDesctop2.length) {
        allPagBtns.forEach(x => x.classList.remove('inactive'));
        allPagBtns.forEach(x => x.removeAttribute('disabled'));
      }

    }
    if (ev.target.className === 'btn__our-pets pets--all__right') {
      allPagBtns.forEach(x => x.classList.remove('inactive'));
      numberStr.innerHTML = arrDesctop2.length;
      pageCards(arrDesctop2.length)
    }
    if (ev.target.className === 'btn__our-pets pets--left__all') {
      allPagBtns.forEach(x => x.classList.remove('inactive'));
      numberStr.innerHTML = 1;
      pageCards(1);
    }

    if (+numberStr.textContent === arrDesctop2.length) {
      btnR.classList.add('inactive');
      btnR.setAttribute("disabled", "disabled");
      btnAllR.classList.add('inactive');
      btnAllR.setAttribute("disabled", "disabled");
      btnL.classList.remove('inactive');
      btnL.removeAttribute("disabled");
      btnAllL.classList.remove('inactive');
      btnAllL.removeAttribute("disabled");
    }
    if (+numberStr.textContent === 1) {
      btnL.classList.add('inactive');
      btnL.setAttribute("disabled", "disabled");
      btnAllL.classList.add('inactive');
      btnAllL.setAttribute("disabled", "disabled");
      btnR.classList.remove('inactive');
      btnR.removeAttribute("disabled");
      btnAllR.classList.remove('inactive');
      btnAllR.removeAttribute("disabled");
    }
  });
}
function newArrNames() {
  pagBlocks.forEach(x => arrName.push(x.querySelector('.our__pets--slider').textContent));
}
newArrNames();
function lengthArrs(x) {
  if (x === 6) count = 8;
  else if (x === 8) count = 6;
  else if (x === 16) count = 3;
  for (let i = 0; i < x; i++) {
    let ar = []
    let ra = []
    while (ar.length < count) {
      let ob = {}
      let num = Math.floor(Math.random() * 8);
      if (!ar.includes(arrName[num])) {
        for (let j of obj) {
          if (arrName[num] === j.name) {
            ar.push(arrName[num]);
            ob = {
              name: j.name,
              img: `.${j.img}`,
            };
            ra.push(ob)
          }
        }
      }
    }
    arrDesctop2.push(ra)
  }
  paginationNumbers(arrDesctop2.length);
}

(function () {
  if (window.innerWidth > 1279) {
    lengthArrs(6);
  }
  if (window.innerWidth < 1280 && window.innerWidth > 767) {
    lengthArrs(8);
    pagBlocks.forEach((x, y) => {
      if (y > 5) x.remove('div');
    });

  }
  if (window.innerWidth < 768) {
    lengthArrs(16);
    pagBlocks.forEach((x, y) => {
      if (y > 2) x.remove('div');
    });
  }
}())

function pageCards(page) {
  blockPagination.innerHTML = ''
  for (let i = 0; i < arrDesctop2[0].length; i++) {
    const card = document.createElement("div")
    const card_img = document.createElement("div");
    const img = document.createElement("img");
    const card_text = document.createElement("div");
    const btn = document.createElement('button');
    const title = document.createElement('h3');
    card.classList.add("pagination__block");
    card.style.opacity = 1;
    btn.classList.add('btn', 'btn__white');
    btn.innerText = 'Learn more';
    card_text.classList.add('slider__title');
    title.classList.add('our__pets--slider');
    img.src = `${arrDesctop2[page - 1][i]['img']}`;
    card_img.classList.add('slider__img');
    title.innerText = arrDesctop2[page - 1][i]['name'];
    card_text.appendChild(title);
    card_img.appendChild(img)
    card.appendChild(card_img);
    card.appendChild(card_text);
    card.appendChild(btn);
    card.id = `${arrDesctop2[page - 1][i]['name'].toLowerCase()}`;

    blockPagination.appendChild(card)
    popurRun()
  }
}

pageCards(1);





















