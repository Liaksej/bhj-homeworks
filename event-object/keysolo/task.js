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
      let ckeckedSymbol = this.currentSymbol.textContent;
      let inputSymbol = event.code;
      if (
        Object.entries(compareLetters)
          .find((element) => element[0] === inputSymbol)[1]
          .includes(ckeckedSymbol)
      ) {
        ckeckedSymbol = Object.entries(compareLetters).find(
          (element) => element[0] === inputSymbol
        )[0];
      }
      if (inputSymbol === ckeckedSymbol) {
        this.success();
      } else {
        this.fail();
      }
    };
    document.addEventListener("keypress", eventChecker);

    const compareLetters = {
      KeyQ: ["й", "q"],
      KeyW: ["ц", "w"],
      KeyE: ["у", "e"],
      KeyR: ["к", "r"],
      KeyT: ["е", "t"],
      KeyY: ["н", "y"],
      KeyU: ["г", "u"],
      KeyI: ["ш", "i"],
      KeyO: ["щ", "o"],
      KeyP: ["з", "p"],
      BracketLeft: ["х", "["],
      BracketRight: ["ъ", "]"],
      KeyA: ["ф", "a"],
      KeyS: ["ы", "s"],
      KeyD: ["в", "d"],
      KeyF: ["а", "f"],
      KeyG: ["п", "g"],
      KeyH: ["р", "h"],
      KeyJ: ["о", "j"],
      KeyK: ["л", "k"],
      KeyL: ["д", "l"],
      Semicolon: ["ж", ";"],
      Quote: ["э", "'"],
      KeyZ: ["я", "z"],
      KeyX: ["ч", "x"],
      KeyC: ["с", "c"],
      KeyV: ["м", "v"],
      KeyB: ["и", "b"],
      KeyN: ["т", "n"],
      KeyM: ["ь", "m"],
      Comma: ["б", ","],
      Period: ["ю", "."],
      Space: [" "],
    };
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
        "awesome домашка",
        "нетология the best",
        "hello",
        "kitty",
        "рок vs поп",
        "youtube",
        "popcorn",
        "cinema",
        "любовь",
        "javascript",
        "я учу js",
        "netology рулит",
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
