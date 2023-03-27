const bannerOne = document.getElementById("modal_main");
const closeBtn = document.getElementsByClassName(
  "modal__close modal__close_times"
);
const showSuccess = document.getElementsByClassName("btn");

bannerOne.classList.add("modal_active");

for (const showSuccessItem of showSuccess) {
  showSuccessItem.onclick = function () {
    if (this.closest(".modal").classList.contains("modal_active")) {
      this.closest(".modal").classList.remove("modal_active");
    }
    if (this.closest("#modal_main")) {
      document.getElementById("modal_success").classList.add("modal_active");
    }
  };
}
for (const closeBtnElement of closeBtn) {
  closeBtnElement.onclick = function () {
    if (this.closest("#modal_main")) {
      this.closest("#modal_main").classList.remove("modal_active");
    } else if (this.closest("#modal_success")) {
      this.closest("#modal_success").classList.remove("modal_active");
    }
  };
}
