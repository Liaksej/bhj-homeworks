function createCurrency(currencyResponse) {
  const currencyNodes = document.querySelectorAll(".item__code");

  for (const currencyResponseKey in currencyResponse) {
    let currencyText = currencyResponse[currencyResponseKey].CharCode;
    let currencyElement;

    for (const currencyNode of currencyNodes) {
      if (currencyNode.textContent.includes(currencyText)) {
        currencyElement = currencyNode;
        break;
      }
    }

    if (currencyElement !== undefined) {
      currencyElement
        .closest(".item")
        .querySelector(
          ".item__value"
        ).textContent = `${currencyResponse[currencyResponseKey].Value}`;
    } else {
      let valute = document.createElement("div");
      document.getElementById("items").appendChild(valute);
      document.getElementById(
        "items"
      ).lastElementChild.outerHTML = `<div class="item">
            <div class="item__code">
                    ${currencyResponse[currencyResponseKey].CharCode}
                </div>
                <div class="item__value">
                    ${currencyResponse[currencyResponseKey].Value}
                </div>
                <div class="item__currency">
                    руб.
                </div>
          </div>`;
    }
  }
}
function saveToLocalStorage() {
  localStorage.removeItem("currencyData");
  if (document.getElementById("items").children) {
    let dataList = [];
    for (const element of Array.from(
      document.getElementById("items").children
    )) {
      if (element.querySelector(".item__code")) {
        dataList.push({
          itemCode: element.querySelector(".item__code").textContent,
          itemValue: element.querySelector(".item__value").textContent,
        });
      }
    }
    localStorage.setItem("currencyData", JSON.stringify(dataList));
    // localStorage.removeItem("currencyData");
  }
}

function retrieveDataFromLocalStorage() {
  if (localStorage.hasOwnProperty("currencyData")) {
    const currencyDataRetried = JSON.parse(
      localStorage.getItem("currencyData")
    );
    if (currencyDataRetried.length > 0) {
      for (const currencyItem in currencyDataRetried) {
        let valute = document.createElement("div");
        document.getElementById("items").appendChild(valute);
        document.getElementById(
          "items"
        ).lastElementChild.outerHTML = `<div class="item">
            <div class="item__code">
                    ${currencyDataRetried[currencyItem].itemCode}
                </div>
                <div class="item__value">
                    ${currencyDataRetried[currencyItem].itemValue}
                </div>
                <div class="item__currency">
                    руб.
                </div>
          </div>`;
      }
    }
  }
}

retrieveDataFromLocalStorage();

const currency = new XMLHttpRequest();

currency.open(
  "GET",
  "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
);

currency.responseType = "json";

currency.send();

if (
  localStorage.hasOwnProperty("currencyData") &&
  document.getElementById("loader").classList.contains("loader_active") &&
  document.querySelector(".item__value")
) {
  document.getElementById("loader").classList.remove("loader_active");
}

currency.onload = function () {
  if (currency.status !== 200) {
    alert("Ошибка" + currency.status);
    return;
  }

  let currencyResponse = currency.response.response.Valute;
  if (
    document.getElementById("loader").classList.contains("loader_active") &&
    currency.status === 200
  ) {
    document.getElementById("loader").classList.remove("loader_active");
  }

  createCurrency(currencyResponse);
};

currency.onerror = function () {
  alert("Ошибка!");
};

window.addEventListener("beforeunload", saveToLocalStorage);
