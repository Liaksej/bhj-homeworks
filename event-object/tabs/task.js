const tabName = document.querySelector(".tab__navigation");
const tabContent = document.querySelector(".tab__contents");

function tabSelector(event) {
  if (event.target.classList.contains("tab")) {
    Array.from(tabName.children).forEach((tab) =>
      tab.classList.remove("tab_active")
    );
    Array.from(tabContent.children).forEach((content) =>
      content.classList.remove("tab__content_active")
    );
    event.target.classList.add("tab_active");
    for (let i = 0; i < tabContent.children.length; i++) {
      if (tabName.children[i].classList.contains("tab_active")) {
        tabContent.children[i].classList.add("tab__content_active");
      }
    }
  }
}

tabName.addEventListener("click", tabSelector);
