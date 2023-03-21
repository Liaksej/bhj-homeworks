const bannerOne = document.getElementById("modal_main");
const closeBtn = document.getElementsByClassName(
  "modal__close modal__close_times"
);
const showSuccess = document.getElementsByClassName(
  "btn btn_danger modal__close show-success"
)[0];
const bannerTwo = document.getElementById("modal_success");

bannerOne.classList.add("modal_active");
showSuccess.onclick = () => {
  bannerTwo.classList.add("modal_active");
};
closeBtn[0].onclick = () => {
  bannerOne.classList.remove("modal_active");
};
closeBtn[1].onclick = () => {
  bannerTwo.classList.remove("modal_active");
};
