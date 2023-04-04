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

widget.addEventListener("click", () => {
  if (!widget.classList.contains("widget.classList")) {
    widget.classList.add("chat-widget_active");
  }
});

function addMessage() {
  function sendMessage(event) {
    if (event.code === "Enter" && input.value.length > 0) {
      const message = document.createElement("div");
      message.classList.add("message", "message_client");
      const msg = message.appendChild(document.createElement("div"));
      msg.classList.add("message__text");
      msg.textContent = input.value;
      input.value = "";
      const time = message.appendChild(document.createElement("div"));
      time.classList.add("message__time");
      time.textContent = `${new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`;
      chatContainer.appendChild(message);
    }
  }

  input.addEventListener("keydown", sendMessage);
}

input.addEventListener("focus", addMessage);

function response() {
  if (chatContainer.lastElementChild.classList.contains("message_client")) {
    const message = document.createElement("div");
    message.classList.add("message");

    const time = message.appendChild(document.createElement("div"));
    time.classList.add("message__time");
    time.textContent = `${new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;

    const msg = message.appendChild(document.createElement("div"));
    msg.classList.add("message__text");
    msg.textContent = responseMessages[Math.floor(Math.random() * 5)];

    chatContainer.appendChild(message);
  }
}

const targetList = document.querySelector(".chat-widget__messages");

config = { attributes: true, childList: true, characterData: true };
const observer = new MutationObserver((targetList) => {
  for (const mutationRecord of targetList) {
    if (mutationRecord.type === "childList") {
      response();
    }
  }
});

observer.observe(targetList, config);
