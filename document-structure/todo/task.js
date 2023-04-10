const inputPhrase = document.getElementById("task__input");

function createTask(event) {
  if (event.value.length > 0 && event.value.match(/\w/)) {
    const task = document.createElement("div");
    task.classList.add("task");

    const taskTitle = document.createElement("div");
    taskTitle.classList.add("task__title");
    taskTitle.textContent = event.value;

    const taskRemove = document.createElement("a");
    taskRemove.classList.add("task__remove");
    taskRemove.href = "#";
    taskRemove.textContent = "x";

    task.appendChild(taskTitle);
    task.appendChild(taskRemove);

    const taskContainer = document.getElementById("tasks__list");

    if (taskContainer.children.length > 0) {
      taskContainer.insertBefore(task, taskContainer.firstElementChild);
    } else {
      taskContainer.appendChild(task);
    }
    event.value = "";
  }
}

function doIfPrompt(event) {
  event.target.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      createTask(inputPhrase);
    }
  });
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
  localStorage.clear();
  if (
    document.getElementById("tasks__list") &&
    document.getElementById("tasks__list").children
  ) {
    localStorage.setItem(
      "taskList",
      document.getElementById("tasks__list").outerHTML
    );
    localStorage.getItem("taskList");
  }
}

function retrieveDataFromLocalStorage() {
  if (window.localStorage.hasOwnProperty("taskList")) {
    document.getElementById("tasks__list").outerHTML =
      localStorage.getItem("taskList");
  }
}

inputPhrase.addEventListener("input", doIfPrompt);

document.body.addEventListener("click", deleteElement);

window.addEventListener("beforeunload", saveToLocalStorage);

window.addEventListener("load", retrieveDataFromLocalStorage);
