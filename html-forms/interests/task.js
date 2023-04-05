const mainInteres = document.querySelector(".interests_main");

function groupChangeChildren(event) {
  if (
    Array.from(
      mainInteres.querySelectorAll(".interest__check:checked")
    ).includes(event.target) &&
    event.target
      .closest("ul")
      .parentElement.classList.contains("interests_main")
  ) {
    Array.from(
      event.target
        .closest("li.interest")
        .querySelectorAll("input.interest__check")
    ).forEach((element) => (element.checked = true));
  } else if (
    event.target.classList.contains("interest__check") &&
    event.target.checked === false &&
    event.target
      .closest("ul")
      .parentElement.classList.contains("interests_main")
  ) {
    Array.from(
      event.target
        .closest("li.interest")
        .querySelectorAll("input.interest__check")
    ).forEach((element) => (element.checked = false));
  }
}

mainInteres.addEventListener("change", groupChangeChildren);
