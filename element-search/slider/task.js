const sliderArrowPrev =
  document.getElementsByClassName("slider__arrow_prev")[0];
const sliderArrowNext =
  document.getElementsByClassName("slider__arrow_next")[0];
const slideItems = document.querySelectorAll(".slider__item");
const sliderDots = document.querySelectorAll(".slider__dot");

function changeSlider(
  index = Array.from(slideItems).findIndex((item) =>
    item.classList.contains("slider__item_active")
  )
) {
  Array.from(slideItems).forEach((slideItem) =>
    slideItem.classList.remove("slider__item_active")
  );
  slideItems[index + 1].classList.add("slider__item_active");
}

sliderArrowNext.onclick = () => {
  if (
    Array.from(slideItems).findIndex((item) =>
      item.classList.contains("slider__item_active")
    ) >
    slideItems.length - 2
  ) {
    changeSlider(-1);
  } else {
    changeSlider();
  }
};

sliderArrowPrev.onclick = () => {
  let element =
    Array.from(slideItems).findIndex((item) =>
      item.classList.contains("slider__item_active")
    ) - 2;
  if (element < -1) {
    changeSlider(slideItems.length + element);
  } else {
    changeSlider(element);
  }
};

for (let i = 0; i < 5; i++) {
  sliderDots[i].onclick = () => {
    let element = i - 1;
    changeSlider(element);
  };
}
