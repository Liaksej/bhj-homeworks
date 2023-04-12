function toggleTooltip(element) {
  element.preventDefault();
  if (element.target.classList.contains("has-tooltip")) {
    if (document.querySelector(".tooltip")) {
      if (
        document.querySelector(".tooltip").textContent === element.target.title
      ) {
        document.querySelector(".tooltip").remove();
        return;
      }
      document.querySelector(".tooltip").remove();
    }

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
