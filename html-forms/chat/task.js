const widget = document.querySelector(".chat-widget");
const input = document.getElementById("chat-widget__input");
const chatContainer = document.getElementById("chat-widget__messages");
const responseMessages = [
  "Кто тут?",
  "К сожалению, все операторы заняты",
  "Ожидайте ответа",
  "Спасибо, что написали нам! До свидания!",
  "К сожалению, мы не можем ответить вам сейчас.",
];

// Добавляет сообщения в тело чата, как от автоответчика, так и от клиента
function sendMessage(idle, ...classes) {
  const message = document.createElement("div");
  message.classList.add("message", ...classes);
  const msg = message.appendChild(document.createElement("div"));
  msg.classList.add("message__text");
  msg.textContent = idle
    ? "Чем можем быть вам полезны?"
    : input.value || responseMessages[Math.floor(Math.random() * 5)];

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

  // Автопрокрутка окна чата до последнего комментария
  chatContainer.parentElement.scrollTop =
    chatContainer.parentElement.scrollHeight;

  clearInterval(idleInterval);
  idleInterval = setInterval(doIfIdle, 30000);
}

// Инициирует отправку сообщений от клиента
function addClientMessage() {
  input.addEventListener("keydown", function (event) {
    if (
      event.code === "Enter" &&
      input.value.length > 0 &&
      input.value.match(/\w/gm)
    ) {
      const clientClass = "message_client".trim();
      sendMessage(false, clientClass);
    }
  });
}

// Инициирует ответ автоответчика
function response(idle = false) {
  sendMessage(idle);
}

// Инициирует ответ от автоответчика в случае, если клиент не отвечает 30 секунд
function doIfIdle() {
  if (widget.classList.contains("chat-widget_active")) {
    response(true);
  }
}

// Наблюдает за появлением новых сообщений от клиента в чате и вызывает автоответчик
const config = { attributes: true, childList: true, characterData: true };
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

// Открывает окно виджета
widget.addEventListener("click", function openWidget() {
  if (!widget.classList.contains("widget.classList")) {
    widget.classList.add("chat-widget_active");
  }
});

input.addEventListener("focus", addClientMessage);

observer.observe(chatContainer, config);

let idleInterval = setInterval(doIfIdle, 30000);
