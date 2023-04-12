const mainInterest = document.querySelector(".interests_main");

function checkIndetermination(event) {
  const targetCheckbox = event.closest(".interests_active");

  if (!targetCheckbox) return;

  const parentCheckbox = targetCheckbox
    .closest(".interest")
    .querySelector(".interest__check");
  const childCheckboxes = Array.from(
    targetCheckbox.querySelectorAll(".interest__check")
  );

  if (childCheckboxes.every((item) => item.checked)) {
    parentCheckbox.checked = true;
    parentCheckbox.indeterminate = false;
  } else if (
    childCheckboxes.some((item) => item.checked || item.indeterminate)
  ) {
    parentCheckbox.indeterminate = true;
  } else {
    parentCheckbox.checked = false;
    parentCheckbox.indeterminate = false;
  }

  checkIndetermination(parentCheckbox);
}

function groupChangeChildren(event) {
  if (event.target.matches(".interest__check")) {
    Array.from(
      event.target
        .closest("li.interest")
        .querySelectorAll("input.interest__check")
    ).forEach((element) => {
      element.checked = event.target.checked;
    });
  }

  checkIndetermination(event.target);
}

mainInterest.addEventListener("change", groupChangeChildren);
