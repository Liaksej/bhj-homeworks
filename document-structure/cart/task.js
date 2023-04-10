const productQuantityControls = document.querySelectorAll(
  ".product__quantity-controls"
);
const productAddButtons = document.querySelectorAll(".product__add");
const cart = document.querySelector(".cart").outerHTML;

function changeQuantity(event) {
  let number = Number(
    event.target
      .closest(".product__quantity-controls")
      .querySelector(".product__quantity-value").textContent
  );
  if (event.target.classList.contains("product__quantity-control_dec")) {
    number = number > 1 ? number - 1 : 1;
  } else if (event.target.classList.contains("product__quantity-control_inc")) {
    number = number >= 1 ? number + 1 : 1;
  }
  event.target
    .closest(".product__quantity-controls")
    .querySelector(".product__quantity-value").textContent =
    number.toString(10);
}

function addToCart(event) {
  if (event.target.classList.contains("product__add")) {
    if (
      document.querySelector(".cart__products") &&
      Array.from(document.querySelector(".cart__products").children).length >
        0 &&
      Array.from(document.querySelector(".cart__products").children).includes(
        document.querySelector(
          `[data-id="${event.target.closest(".product").dataset.id}"]`
        )
      )
    ) {
      let quantity = document
        .querySelector(
          `.cart__product[data-id="${
            event.target.closest(".product").dataset.id
          }"]`
        )
        .querySelector(".cart__product-count").textContent;
      document
        .querySelector(
          `.cart__product[data-id="${
            event.target.closest(".product").dataset.id
          }"]`
        )
        .querySelector(".cart__product-count").textContent = `${
        Number(quantity) +
        Number(
          event.target
            .closest(".product__quantity")
            .querySelector(".product__quantity-value").textContent
        )
      }`;
    } else {
      if (!document.querySelector(".cart")) {
        document.querySelector(".header").insertAdjacentHTML("afterend", cart);
      }

      const cartProduct = document.createElement("div");
      cartProduct.classList.add("cart__product");
      cartProduct.dataset.id = event.target.closest(".product").dataset.id;

      const cartProductImage = document.createElement("img");
      cartProductImage.classList.add("cart__product-image");
      cartProductImage.src = event.target
        .closest(".product")
        .querySelector(".product__image").src;

      const cartProductCount = document.createElement("div");
      cartProductCount.classList.add("cart__product-count");
      cartProductCount.textContent = event.target
        .closest(".product")
        .querySelector(".product__quantity-value").textContent;

      cartProduct.appendChild(cartProductImage);
      cartProduct.appendChild(cartProductCount);
      document.querySelector(".cart__products").appendChild(cartProduct);

      if (
        !event.target
          .closest(".product__quantity")
          .querySelector(".product__delete")
      ) {
        const deleteButton = document.createElement("div");
        deleteButton.classList.add("product__add", "product__delete");
        deleteButton.textContent = "Удалить из корзины";
        event.target.closest(".product__quantity").appendChild(deleteButton);
      }
    }
  }
  flightImg(event.target);
}

function flightImg(event) {
  let startImagePosition = event
    .closest(".product")
    .querySelector(".product__image")
    .getBoundingClientRect();

  let endImagePosition = document
    .querySelector(
      `.cart__product[data-id="${event.closest(".product").dataset.id}"]`
    )
    .getBoundingClientRect();

  let { topPass, leftPass } = {
    topPass: (startImagePosition.top - endImagePosition.top) / 5,
    leftPass: (endImagePosition.left - startImagePosition.left) / 5,
  };

  let copyImage = event
    .closest(".product")
    .querySelector(".product__image")
    .cloneNode(true);

  copyImage.style.position = "fixed";
  copyImage.classList.add("copy__image");
  copyImage.style.top = `${Math.round(startImagePosition.top)}px`;
  copyImage.style.left = `${Math.round(startImagePosition.left)}px`;
  document.body.appendChild(copyImage);

  let interval = setInterval(() => {
    if (
      parseInt(document.querySelector(".copy__image").style.top, 10) -
        endImagePosition.bottom >
        15 ||
      parseInt(document.querySelector(".copy__image").style.left, 10) -
        endImagePosition.right >
        5
    ) {
      document.querySelector(".copy__image").style.top = `${
        parseInt(document.querySelector(".copy__image").style.top, 10) - topPass
      }px`;
      document.querySelector(".copy__image").style.left = `${
        parseInt(document.querySelector(".copy__image").style.left, 10) +
        leftPass
      }px`;
    } else {
      document.querySelector(".copy__image").remove();
      clearInterval(interval);
    }
  }, 50);
}

function deleteFromCart(event) {
  if (event.target.classList.contains("product__delete")) {
    document
      .querySelector(
        `.cart__product[data-id="${
          event.target.closest(".product").dataset.id
        }"]`
      )
      .remove();
    event.target.remove();
  }
  if (
    document.querySelector(".cart") &&
    Array.from(document.querySelector(".cart__products").children).length === 0
  ) {
    document.querySelector(".cart").remove();
  }
}

function saveToLocalStorage() {
  localStorage.clear();
  if (
    document.querySelector(".cart") &&
    document.querySelector(".cart__products").children
  ) {
    localStorage.setItem("cartList", document.querySelector(".cart").outerHTML);
    localStorage.getItem("cartList");
  }
}

function retrieveDataFromLocalStorage() {
  if (localStorage.hasOwnProperty("cartList")) {
    document.querySelector(".cart").outerHTML =
      localStorage.getItem("cartList");
  }
  if (document.querySelectorAll(".cart__product").length === 0) {
    document.querySelector(".cart").remove();
  }
  if (document.querySelector(".cart")) {
    let productsInCart = document.querySelectorAll(".cart__product");
    for (let product of productsInCart) {
      let deleteButton = document.createElement("div");
      deleteButton.classList.add("product__add", "product__delete");
      deleteButton.textContent = "Удалить из корзины";
      document
        .querySelector(`.product[data-id="${product.dataset.id}"]`)
        .querySelector(".product__quantity")
        .appendChild(deleteButton);
    }
  }
}

for (const productQuantityControl of productQuantityControls) {
  productQuantityControl.addEventListener("click", changeQuantity);
}

for (const productAddButton of productAddButtons) {
  productAddButton.addEventListener("click", addToCart);
}

document.addEventListener("click", deleteFromCart);

window.addEventListener("beforeunload", saveToLocalStorage);

window.addEventListener("load", retrieveDataFromLocalStorage);
