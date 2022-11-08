import petsConfig from '../../main/pets.json';
const slide = document.querySelector('.pets__slider');
const paginSlide = document.querySelector('.slide__pagination')
const popupPets = document.querySelector('.popup--pets');
const slider = document.querySelector('.slider__carousel');
const popup = document.querySelector('.popup');
// const id = Array.from(document.all).map(i => i.id).filter(i => i != "");

const arrId = ["img", "name", "type", "breed", "description", "age", "inoculations", "diseases", "parasites"];
export function popurRun() {
  if (slide) {
    slider.querySelectorAll('.slider__block').forEach(el => {
      el.addEventListener('click', function (x) {
        let namePet = el.id;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        openPopup(namePet)
      });
    })
  } else if (paginSlide){
    paginSlide.querySelectorAll('.pagination__block').forEach(el => {
      el.addEventListener('click', function (x) {
        let namePet = el.id;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        openPopup(namePet)
      });
    })
  }
}

const openPopup = (el) => {
  const namePets = el.slice(0, 1).toUpperCase() + el.slice(1);
  petsConfig.forEach(j => {
    if (namePets === j.name) {
      arrId.forEach(i => {
        if (i === 'img') {
          if (popupPets) {
            popup.querySelector(`#${i}`).innerHTML = `<img src="../${j[i]}">`;
          } else {
            popup.querySelector(`#${i}`).innerHTML = `<img src="${j[i]}">`;
          }
        } else {
          popup.querySelector(`#${i}`).innerText = j[i];
        }
      });
    }
  });
};
const closePopup = () => {
  popup.classList.remove('active');
  document.body.style.overflow = '';

};
popup.addEventListener('click', (ev) => {
  ev.target.classList.forEach(x => {
    if (x === 'popup') closePopup();
  });
});
popurRun()
popup.querySelector('.popup__close').addEventListener('click', closePopup);