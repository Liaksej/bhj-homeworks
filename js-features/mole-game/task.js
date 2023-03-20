const getHole = (index) => document.getElementById(`hole${index}`);
let positiveClicks = document.getElementById("dead");
let negativeClicks = document.getElementById("lost");

for (let index = 1; index < 10; index++) {
  getHole(index).onclick = () => {
    if (getHole(index).classList.contains("hole_has-mole")) {
      positiveClicks.textContent = String(
        Number(positiveClicks.textContent) + 1
      );
      if (Number(positiveClicks.textContent) === 10) {
        alert("Вы победили");
        positiveClicks.textContent = "0";
        negativeClicks.textContent = "0";
      }
    } else {
      negativeClicks.textContent = String(
        Number(negativeClicks.textContent) + 1
      );
      if (Number(negativeClicks.textContent) === 5) {
        alert("Вы проиграли");
        positiveClicks.textContent = "0";
        negativeClicks.textContent = "0";
      }
    }
  };
}
