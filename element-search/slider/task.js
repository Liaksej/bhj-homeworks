const sliderArrowPrev =
  document.getElementsByClassName("slider__arrow_prev")[0];
const sliderArrowNext =
  document.getElementsByClassName("slider__arrow_next")[0];
const slideItems = document.querySelectorAll(".slider__item");
let element = 0;
const sliderDots = document.querySelectorAll(".slider__dot");

function changeSlider() {
  Array.from(slideItems).forEach((slideItem) =>
    slideItem.classList.remove("slider__item_active")
  );
  slideItems[element + 1].classList.add("slider__item_active");
}

sliderArrowNext.onclick = () => {
  if (element > slideItems.length - 2) {
    element = -1;
  }
  changeSlider();
  element++;
};

sliderArrowPrev.onclick = () => {
  element = element - 2;
  if (element < -1) {
    element = slideItems.length + element;
  }
  changeSlider();
  element++;
};

for (let i = 0; i < 5; i++) {
  sliderDots[i].onclick = () => {
    element = i - 1;
    changeSlider();
    element += 1;
  };
}
