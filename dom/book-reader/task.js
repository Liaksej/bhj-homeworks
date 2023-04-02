const fontSize = document.querySelector(".book__control_font-size");
const fontColor = document.querySelector(".book__control_color");
const backgroundColor = document.querySelector(".book__control_background");
const book = document.getElementById("book");

function changeFontSize(event) {
  event.preventDefault();

  // Обнуляем все большие и маленькие
  if (book.classList.contains("book_fs-big")) {
    book.classList.remove("book_fs-big");
  }
  if (book.classList.contains("book_fs-small")) {
    book.classList.remove("book_fs-small");
  }
  fontSize
    .querySelector(".font-size_active")
    .classList.remove("font-size_active");

  event.target.classList.add("font-size_active");

  // Если кликнули по маленьким
  if (event.target.classList.contains("font-size_small")) {
    if (!book.classList.contains("book_fs-small")) {
      book.classList.add("book_fs-small");
    }
  }

  // Если кликнули по большим
  if (event.target.classList.contains("font-size_big")) {
    if (!book.classList.contains("book_fs-big")) {
      book.classList.add("book_fs-big");
    }
  }

  // Если кликнули по средним
  if (
    event.target.classList.contains("font-size") &&
    !book.classList.contains("book_fs-small, book_fs-big")
  ) {
    if (book.classList.contains("book_fs-small, book_fs-big")) {
      book.classList.remove("book_fs-small, book_fs-big");
    }
  }
}

function changeFontColor(event) {
  event.preventDefault();

  // Обнуляем все большие и маленькие
  if (book.classList.contains("book_color-gray")) {
    book.classList.remove("book_color-gray");
  }
  if (book.classList.contains("book_color-whitesmoke")) {
    book.classList.remove("book_color-whitesmoke");
  }
  if (book.classList.contains("book_color-black")) {
    book.classList.remove("book_color-black");
  }
  fontColor.querySelector(".color_active").classList.remove("color_active");

  event.target.classList.add("color_active");

  // Если кликнули по черному
  if (event.target.classList.contains("text_color_black")) {
    if (!book.classList.contains("book_color-black")) {
      book.style.color = event.target.getAttribute("data-text-color");
    }
  }

  // Если кликнули по серому
  if (event.target.classList.contains("text_color_gray")) {
    if (!book.classList.contains("text_color_gray")) {
      book.style.color = event.target.getAttribute("data-text-color");
    }
  }

  // Если кликнули по белому
  if (event.target.classList.contains("text_color_whitesmoke")) {
    if (!book.classList.contains("book_color-whitesmoke")) {
      book.style.color = event.target.getAttribute("data-text-color");
    }
  }
}

function changeBackgroundColor(event) {
  event.preventDefault();

  // Обнуляем все цвета фона
  if (book.classList.contains("book_bg-gray")) {
    book.classList.remove("book_bg-gray");
  }
  if (book.classList.contains("book_bg-black")) {
    book.classList.remove("book_bg-black");
  }
  if (book.classList.contains("book_bg-white")) {
    book.classList.remove("book_bg-white");
  }
  backgroundColor
    .querySelector(".color_active")
    .classList.remove("color_active");

  event.target.classList.add("color_active");

  // Если кликнули по выбору черного фона
  if (event.target.classList.contains("bg_color_black")) {
    if (!book.classList.contains("book_bg-black")) {
      book.classList.add("book_bg-black");
    }
  }

  // Если кликнули по выбору серого фона
  if (event.target.classList.contains("bg_color_gray")) {
    if (!book.classList.contains("book_bg-gray")) {
      book.classList.add("book_bg-gray");
    }
  }

  // Если кликнули по выбору белого фона
  if (event.target.classList.contains("bg_color_white")) {
    if (!book.classList.contains("book_bg-white")) {
      book.style.color = event.target.getAttribute("book_bg-white");
    }
  }
}

function preventLinkRun() {}

fontSize.addEventListener("click", changeFontSize, preventLinkRun);
for (const fontColorElement of fontColor.querySelectorAll(".color")) {
  fontColorElement.addEventListener("click", changeFontColor);
}
for (const backgroundColorElement of backgroundColor.querySelectorAll(
  ".color"
)) {
  backgroundColorElement.addEventListener("click", changeBackgroundColor);
}
