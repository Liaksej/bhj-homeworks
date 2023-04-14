const textAreaElement = document.getElementById("editor");

function saveToLocalStorage() {
  localStorage.removeItem("textSave");
  if (textAreaElement && textAreaElement.value.trim()) {
    localStorage.setItem("textSave", textAreaElement.value);
  }
}

function retrieveDataFromLocalStorage() {
  if (localStorage.hasOwnProperty("textSave")) {
    textAreaElement.value = localStorage.getItem("textSave");
  }
}

const buttonClearContent = document.createElement("button");
buttonClearContent.id = "clear";
buttonClearContent.textContent = "Очистить";
document.querySelector(".card").appendChild(buttonClearContent);

document.getElementById("clear").addEventListener("click", (event) => {
  event.defaultPrevented;
  textAreaElement.value = "";
});

window.addEventListener("beforeunload", saveToLocalStorage);

retrieveDataFromLocalStorage();
