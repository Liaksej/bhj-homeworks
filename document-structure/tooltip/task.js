function toggleTooltip(element) {
  if (document.querySelector(".tooltip")) {
    document.querySelector(".tooltip").remove();
  }
  if (element.target.classList.contains("has-tooltip")) {
    element.preventDefault();
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip", "tooltip_active");
    tooltip.textContent = element.target.title;
    const position = element.target.getBoundingClientRect();
    let coordinatesX = position.x;
    let coordinatesY = position.y;
    let height = position.height;
    tooltip.style.top = `${coordinatesY + height}px`;
    tooltip.style.left = `${coordinatesX}px`;
    element.target.insertAdjacentElement("afterend", tooltip);
  }
}

document.body.addEventListener("click", toggleTooltip);
