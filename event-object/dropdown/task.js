const dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("click", function (event) {
  if (
    !event.currentTarget
      .querySelector(".dropdown__list")
      .classList.contains("dropdown__list_active")
  ) {
    dropdown
      .querySelector(".dropdown__list")
      .classList.add("dropdown__list_active");
  } else {
    dropdown
      .querySelector(".dropdown__list")
      .classList.remove("dropdown__list_active");
  }

  if (event.target.classList.contains("dropdown__link")) {
    dropdown.querySelector(".dropdown__value").textContent =
      event.target.textContent;
    event.preventDefault();
  }
});
