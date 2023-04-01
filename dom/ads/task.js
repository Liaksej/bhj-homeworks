const rotatorCase = document.querySelector(".rotator");

function changeElement() {
  let element = document.querySelector(".rotator__case_active");
  element.classList.remove("rotator__case_active");
  let targetBlock = element.nextElementSibling ?? rotatorCase.firstElementChild;
  targetBlock.classList.add("rotator__case_active");
  targetBlock.style.color = targetBlock.getAttribute("data-color");
  let timer =
    targetBlock.getAttribute("data-speed") ??
    rotatorCase.firstElementChild.getAttribute("data-speed");
  setTimeout(changeElement, +timer);
}

rotatorCase.firstElementChild.style.color =
  rotatorCase.firstElementChild.getAttribute("data-color");
setTimeout(
  changeElement,
  +rotatorCase.firstElementChild.getAttribute("data-speed")
);
