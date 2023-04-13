const dataOfJson = Object;

function createPage() {
  document.getElementById("poll__title").textContent = dataOfJson.title;

  for (const answer of dataOfJson.answers) {
    let pollAnswer = document.createElement("div");
    document.getElementById("poll__answers").appendChild(pollAnswer);

    document.getElementById(
      "poll__answers"
    ).lastElementChild.outerHTML = `<button class="poll__answer">
              ${answer}
            </button>`;
  }
}

function buttonClick(event) {
  if (event.target.classList.contains("poll__answer")) {
    let allButtons = Array.from(
      document.getElementById("poll__answers").children
    );

    for (let i = 0; i < allButtons.length; i++) {
      if (event.target.textContent === allButtons[i].textContent) {
        showResult(i);
        break;
      }
    }

    alert("Спасибо, ваш голос засчитан!");
  }
}

function createStatInfo(result) {
  document.getElementById("poll__answers").innerHTML = "";

  let allAnswersAmount = result.stat.reduce(
    (accumulator, currentValue) => accumulator + currentValue.votes,
    0
  );

  for (const answer of result.stat) {
    let statAnswer = document.createElement("div");
    document.getElementById("poll__answers").appendChild(statAnswer);
    document.getElementById(
      "poll__answers"
    ).lastElementChild.outerHTML = `<div class="stat__answer">
              ${answer.answer}: <b>${(
      (answer.votes / allAnswersAmount) *
      100
    ).toFixed(2)} %</b>
            </div>`;
  }
}

function showResult(i) {
  fetch("https://students.netoservices.ru/nestjs-backend/poll", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: `vote=${dataOfJson.id}&answer=${i}`,
  })
    .then((response) =>
      !response.ok ? alert(`Ой, ошибочка ${response.status}`) : response.json()
    )
    .catch(reportError)
    .then((result) => createStatInfo(result));
}

fetch("https://students.netoservices.ru/nestjs-backend/poll")
  .then((response) =>
    !response.ok ? alert(`Ой, ошибочка ${response.status}`) : response.json()
  )
  .catch(reportError)
  .then((result) => {
    dataOfJson.id = result.id;
    dataOfJson.title = result.data.title;
    dataOfJson.answers = result.data.answers;
    createPage();
  });

document.addEventListener("click", buttonClick);
