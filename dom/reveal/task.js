const blockToShow = document.querySelectorAll(".reveal");

function showBlock() {
  for (const blockToShowElement of blockToShow) {
    const { top, bottom } = blockToShowElement.getBoundingClientRect();

    if (bottom > 0 && top < window.innerHeight) {
      if (!blockToShowElement.classList.contains("reveal_active")) {
        blockToShowElement.classList.add("reveal_active");
      }
    } else {
      if (blockToShowElement.classList.contains("reveal_active")) {
        blockToShowElement.classList.remove("reveal_active");
      }
    }
  }
}

document.addEventListener("scroll", showBlock);
