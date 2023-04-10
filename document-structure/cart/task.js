const productQuantityContrlols = document.querySelectorAll(
  ".product__quantity-controls"
);
const productAddButtons = document.querySelectorAll(".product__add");

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
    }
  }
}

for (const productQuantityContrlol of productQuantityContrlols) {
  productQuantityContrlol.addEventListener("click", changeQuantity);
}

for (const productAddButton of productAddButtons) {
  productAddButton.addEventListener("click", addToCart);
}
