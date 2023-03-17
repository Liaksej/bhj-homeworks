const timer = document.getElementById("timer");

/////ЗАДАНИЕ БЕЗ ЗВЕЗДОЧКИ НА ВСЯКИЙ/////
// let interv = setInterval(() => {
//   if (Number(timer.textContent) > 0) {
//     timer.textContent = Number(timer.textContent) - 1;
//   } else {
//     alert("Вы победили в конкурсе!");
//     clearInterval(interv);
//   }
// }, 1000);

let startTime = "00:01:01";
let hours = Number(startTime.substring(0, 2));
let minutes = Number(startTime.substring(3, 5));
let seconds = Number(startTime.substring(6, 8));
let target = new Date();
let handler;

function start() {
  target.setHours(hours);
  target.setMinutes(minutes);
  target.setSeconds(seconds);
  target.setMilliseconds(0);
  timer.innerHTML = target.toTimeString().split(" ")[0];
}

function updateTimer() {
  let time = target.getTime();
  target.setTime(time - 1000);
  timer.innerHTML = target.toTimeString().split(" ")[0];
  if (
    target.getHours() === 0 &&
    target.getMinutes() === 0 &&
    target.getSeconds() === 0
  ) {
    alert("Вы победили в конкурсе!");
    clearInterval(handler);
    location = "extended-demo.gif";
    window.location;
  }
}

handler = setInterval(updateTimer, 1000);
start();
