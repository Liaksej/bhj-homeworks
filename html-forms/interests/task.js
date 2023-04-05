const mainInterest = document.querySelector(".interests_main");

function groupChangeChildren(event) {
  // Проставляет и убирает indeterminate, а также добавляет checked, если внутренние вложенные элементы checked
  function checkIndetermination() {
    {
      const lengthOfAllCkeckboxes = event.target
        .closest("ul")
        .querySelectorAll(".interest__check").length;
      const lengthOfCheckedCheckboxes = event.target
        .closest("ul")
        .querySelectorAll(".interest__check:checked").length;
      let targetRecursion = event.target;
      if (
        lengthOfAllCkeckboxes > lengthOfCheckedCheckboxes &&
        lengthOfCheckedCheckboxes !== 0
      ) {
        // Рекурсивно проставляет indeterminate у родителей
        function recursionUpdate(targetRecursion) {
          if (
            targetRecursion
              .closest("ul")
              .parentElement.classList.contains("interests_main")
          ) {
            return targetRecursion;
          } else {
            let newTarget = targetRecursion
              .closest("ul")
              .parentElement.querySelector(".interest__check");

            let result = recursionUpdate(newTarget);
            result.indeterminate = true;
            return targetRecursion;
          }
        }

        recursionUpdate(targetRecursion);
      } else if (lengthOfAllCkeckboxes === lengthOfCheckedCheckboxes) {
        // Рекурсивно изменяет indeterminate у родителей на checked
        function recursionChange(targetRecursion) {
          if (
            targetRecursion
              .closest("ul")
              .parentElement.classList.contains("interests_main")
          ) {
            return targetRecursion;
          } else {
            let newTarget = targetRecursion
              .closest("ul")
              .parentElement.querySelector(".interest__check");

            let result = recursionChange(newTarget);
            result.checked = true;
            result.indeterminate = false;
            return targetRecursion;
          }
        }

        recursionChange(targetRecursion);
      } else if (lengthOfCheckedCheckboxes === 0) {
        // Рекурсивно убирает indeterminate и checked у родителей
        function recursionDiscard(targetRecursion) {
          if (
            targetRecursion
              .closest("ul")
              .parentElement.classList.contains("interests_main")
          ) {
            return targetRecursion;
          } else {
            let newTarget = targetRecursion
              .closest("ul")
              .parentElement.querySelector(".interest__check");

            let result = recursionDiscard(newTarget);
            if (
              result.closest("ul").querySelectorAll(".interest__check:checked")
                .length === 0
            ) {
              result.indeterminate = false;
            }
            result.checked = false;
            return targetRecursion;
          }
        }

        recursionDiscard(targetRecursion);

        event.target
          .closest("ul")
          .parentElement.querySelector(".interest__check").checked = false;
        event.target
          .closest("ul")
          .parentElement.querySelector(
            ".interest__check"
          ).indeterminate = false;
      } else if (
        lengthOfCheckedCheckboxes === 0 &&
        Array.from(
          event.target.closest("ul").querySelectorAll(".interest__check")
        ).find((element) => element.indeterminate === true)
      ) {
      }
    }
  }

  if (
    Array.from(
      mainInterest.querySelectorAll(".interest__check:checked")
    ).includes(event.target) &&
    (event.target
      .closest("ul")
      .parentElement.classList.contains("interests_main") ||
      event.target.closest("ul").parentElement.classList.contains("interest"))
  ) {
    Array.from(
      event.target
        .closest("li.interest")
        .querySelectorAll("input.interest__check")
    ).forEach((element) => {
      element.checked = true;
      element.indeterminate = false;
    });
  } else if (
    event.target.classList.contains("interest__check") &&
    event.target.checked === false &&
    (event.target
      .closest("ul")
      .parentElement.classList.contains("interests_main") ||
      event.target.closest("ul").parentElement.classList.contains("interest"))
  ) {
    Array.from(
      event.target
        .closest("li.interest")
        .querySelectorAll("input.interest__check")
    ).forEach((element) => (element.checked = false));
  }

  if (
    Array.from(
      mainInterest.querySelectorAll(".interest__check:checked")
    ).includes(event.target) &&
    event.target.closest("ul").classList.contains("interests_active")
  ) {
    checkIndetermination();
  } else if (
    event.target.classList.contains("interest__check") &&
    event.target.checked === false
  ) {
    checkIndetermination();
  }
}

mainInterest.addEventListener("change", groupChangeChildren);
