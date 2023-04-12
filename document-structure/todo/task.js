const inputPhrase = document.getElementById("task__input");

function createTask(event) {
  if (event.value.trim()) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
                    <div class="task__title">
                        ${event.value}
                    </div>
                    <a class="task__remove" href="#">
                        x
                    </a>`;

    const taskContainer = document.getElementById("tasks__list");

    if (taskContainer.children.length > 0) {
      taskContainer.insertBefore(task, taskContainer.firstElementChild);
    } else {
      taskContainer.appendChild(task);
    }
    event.value = "";
  }
}

function doIfPrompt() {
  document.getElementById("tasks__add").addEventListener("click", (event) => {
    event.preventDefault();
    createTask(inputPhrase);
  });
}

function deleteElement(element) {
  if (element.target.classList.contains("task__remove")) {
    element.preventDefault();
    element.target.closest(".task").remove();
  }
}

function saveToLocalStorage() {
  localStorage.removeItem("taskList");
  if (
    document.getElementById("tasks__list") &&
    document.getElementById("tasks__list").children
  ) {
    const itemsForStore = [];
    for (const element of Array.from(
      document.getElementById("tasks__list").children
    )) {
      itemsForStore.push(element.querySelector(".task__title").textContent);
    }
    localStorage.setItem("taskList", JSON.stringify(itemsForStore));
    localStorage.getItem("taskList");
  }
}

function retrieveDataFromLocalStorage() {
  if (localStorage.hasOwnProperty("taskList")) {
    for (const element of JSON.parse(localStorage.getItem("taskList"))) {
      const task = document.createElement("div");
      task.classList.add("task");
      task.innerHTML = `
                    <div class="task__title">
                        ${element}
                    </div>
                    <a class="task__remove" href="#">
                        x
                    </a>`;
      document.getElementById("tasks__list").appendChild(task);
    }
  }
}

inputPhrase.addEventListener("input", doIfPrompt);

document.body.addEventListener("click", deleteElement);

window.addEventListener("beforeunload", saveToLocalStorage);

window.addEventListener("load", retrieveDataFromLocalStorage);
