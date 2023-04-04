const widget = document.querySelector(".chat-widget");
const input = document.getElementById("chat-widget__input");
const chatContainer = document.getElementById("chat-widget__messages");
const responseMessages = [
  "Кто тут?",
  "К сожалению, все операторы заняты",
  "Ожидайте ответа",
  "Спасибо, что написали нам! До свидения!",
  "К сожалению, мы не можем ответить вам сейчас.",
];

widget.addEventListener("click", function openWidget() {
  if (!widget.classList.contains("widget.classList")) {
    widget.classList.add("chat-widget_active");
  }
});

function sendMessage(...classes) {
  const message = document.createElement("div");
  message.classList.add("message", ...classes);
  const msg = message.appendChild(document.createElement("div"));
  msg.classList.add("message__text");
  msg.textContent =
    input.value || responseMessages[Math.floor(Math.random() * 5)];
  if (input.value !== "") {
    input.value = "";
  }

  const time = message.appendChild(document.createElement("div"));
  time.classList.add("message__time");
  time.textContent = `${new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
  chatContainer.appendChild(message);
  chatContainer.parentElement.scrollTop =
    chatContainer.parentElement.scrollHeight;
}

function addClientMessage() {
  input.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && input.value.length > 0) {
      const clientClass = "message_client";
      sendMessage(clientClass);
    }
  });
}

input.addEventListener("focus", addClientMessage);

function response() {
  sendMessage();
}

const targetList = document.querySelector(".chat-widget__messages");

config = { attributes: true, childList: true, characterData: true };
const observer = new MutationObserver((targetList) => {
  for (const mutationRecord of targetList) {
    if (
      mutationRecord.type === "childList" &&
      chatContainer.lastElementChild.classList.contains("message_client")
    ) {
      response();
    }
  }
});

observer.observe(targetList, config);
