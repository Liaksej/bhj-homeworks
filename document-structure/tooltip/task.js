const elementWithTooltip = document.querySelectorAll(".has-tooltip");

function openTooltip(element) {
  if (element.target.classList.contains("has-tooltip")) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip", "tooltip_active");
    tooltip.textContent = element.target.title;
    element.target.insertAdjacentElement("afterend", tooltip);
  }
}

function closeTooltip(element) {
  if (element.target.classList.contains("has-tooltip")) {
    if (document.querySelectorAll(".tooltip_active").length > 0) {
      document.querySelector(".tooltip_active").remove();
    }
  }
}

for (const elementWithTooltipElement of elementWithTooltip) {
  elementWithTooltipElement.addEventListener("mousedown", openTooltip);
  elementWithTooltipElement.addEventListener("mouseup", closeTooltip);
  elementWithTooltipElement.addEventListener("click", (element) => {
    element.preventDefault();
  });
}
