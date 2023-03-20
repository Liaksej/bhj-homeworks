const img = document.getElementById("cookie");
const counter = document.getElementById("clicker__counter");
const counterBlock = document.getElementsByClassName("clicker__status")[0];
counterBlock.insertAdjacentHTML(
  "beforeend",
  `<br>Скорость клика: <span id="speed">0</span>`
);
let date2;
img.onclick = () => {
  let date = new Date();
  if (Number(counter.textContent % 2) === 0) {
    img.width += 20;
    img.height += 20;
  } else {
    img.width -= 20;
    img.height -= 20;
  }
  let clickCount = document.getElementById("speed");
  clickCount.textContent = String(
    (1 / ((date - (date2 ?? date)) / 1000)).toFixed(2)
  );
  counter.textContent = String(Number(counter.textContent) + 1);
  date2 = date;
};
