function uploadForm() {
  let request = new XMLHttpRequest();
  if (request) {
    request.open(
      "POST",
      "https://students.netoservices.ru/nestjs-backend/auth",
      true
    );

    request.responseType = "json";

    let formData = new FormData(document.getElementById("signin__form"));

    request.send(formData);

    request.onload = () => {
      const dataObject = request.response;
      localStorage.setItem("responseData", JSON.stringify(dataObject.user_id));
      if (dataObject.success) {
        document.querySelector(".welcome").classList.add("welcome_active");
        document.getElementById("user_id").textContent = dataObject.user_id;
        document.querySelector(".signin").classList.remove("signin_active");
        showExitButton();
      } else {
        alert("Неверный логин/пароль");
      }
      document.querySelector("#signin__form").reset();
    };
  }
}

function showExitButton() {
  const exitButton = document.createElement("button");
  const divElement = document.createElement("div");
  exitButton.id = "exit_button";
  exitButton.textContent = "Выход";
  divElement.appendChild(exitButton);
  document.querySelector("#welcome").appendChild(divElement);
}

if (localStorage.hasOwnProperty("responseData")) {
  document.querySelector(".welcome").classList.add("welcome_active");
  document.getElementById("user_id").textContent =
    localStorage.getItem("responseData");
  document.querySelector(".signin").classList.remove("signin_active");
  showExitButton();
}

document.getElementById("signin__btn").addEventListener("click", (event) => {
  event.preventDefault();
  uploadForm();
});

document.body.addEventListener("click", (event) => {
  if (event.target === document.getElementById("exit_button")) {
    document.querySelector(".signin").classList.add("signin_active");
    document.querySelector(".welcome").classList.remove("welcome_active");
    document.getElementById("exit_button").remove();
    localStorage.removeItem("responseData");
  }
});
