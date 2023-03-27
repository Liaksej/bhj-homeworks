const menuItem = document.querySelectorAll(".menu__item");
let linkOpener = false;

for (let menuItemElement of menuItem) {
  menuItemElement.onclick = () => {
    if (menuItemElement.contains(menuItemElement.querySelector(".menu_sub"))) {
      if (
        menuItemElement
          .querySelector(".menu_sub")
          .classList.contains("menu_active")
      ) {
        menuItemElement
          .querySelector(".menu_sub")
          .classList.remove("menu_active");
        return linkOpener;
      }
      menuItemElement.querySelector(".menu_sub").classList.add("menu_active");
      Array.from(menuItem).forEach((item) => {
        if (
          item !== menuItemElement &&
          item.querySelector(".menu_sub") &&
          item.querySelector(".menu_sub").classList.contains("menu_active")
        ) {
          item.querySelector(".menu_sub").classList.remove("menu_active");
        }
      });
      return linkOpener;
    } else {
      linkOpener = true;
      return true;
    }
  };
}
