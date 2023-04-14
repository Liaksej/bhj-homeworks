const banner = document.getElementById("subscribe-modal");
const closeBtn = document.querySelector(".modal__close_times");

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : false;
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

if (!getCookie("popupIsClosed")) {
  banner.classList.add("modal_active");
}

closeBtn.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal__close_times")) {
    banner.classList.remove("modal_active");
    setCookie("popupIsClosed", true, { "max-age": 30 });
  }
});
