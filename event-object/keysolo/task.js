class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");

    this.reset();

    this.registerEvents();

    this.timeout();
  }

  inter;

  reset() {
    this.setNewWord();
    this.winsElement.textContent = "0";
    this.lossElement.textContent = "0";
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    const eventChecker = (event) => {
      if (event.key.toLowerCase() === this.currentSymbol.textContent) {
        this.success();
      } else {
        this.fail();
      }
    };
    document.addEventListener("keypress", eventChecker);
  }

  timeout() {
    if (document.querySelector(".timer")) {
      document.querySelector(".timer").remove();
    }
    let timer = document
      .querySelector(".status")
      .appendChild(document.createElement("p"));
    timer.classList.add("timer");
    timer.textContent = "5";
    this.inter = setInterval(() => {
      if (Number(timer.textContent) > 0) {
        timer.textContent = String(Number(timer.textContent) - 1);
      } else if (Number(timer.textContent) === 0) {
        this.fail();
      }
    }, 1000);
  }

  success() {
    if (this.currentSymbol.classList.contains("symbol_current"))
      this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add("symbol_current");
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      clearInterval(this.inter);
      this.reset();
      this.timeout();
    }
    clearInterval(this.inter);
    this.setNewWord();
    this.timeout();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
      clearInterval(this.inter);
      this.timeout();
    }
    clearInterval(this.inter);
    this.setNewWord();
    this.timeout();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        "bob",
        "awesome",
        "netology",
        "hello",
        "kitty",
        "rock",
        "youtube",
        "popcorn",
        "cinema",
        "love",
        "javascript",
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }
}

new Game(document.getElementById("game"));
