const formConsultation = document.querySelector(".contact-form--consultation");
const inputPhoneConsult = formConsultation.querySelector(
  'input[name="consultPhone"]'
);
const inputCheckboxConsult = formConsultation.querySelector(
  'input[name="consultCheckbox"]'
);
const phoneNotificationConsult = document.querySelector(
  ".notification--phone-consultation"
);
const checkboxNotificationConsult = document.querySelector(
  ".notification--checkbox-consultation"
);

phoneNotificationConsult
  .querySelector(".notification__alert-close")
  .addEventListener("click", () => {
    phoneNotificationConsult.classList.remove("active");
  });
checkboxNotificationConsult
  .querySelector(".notification__alert-close")
  .addEventListener("click", () => {
    checkboxNotificationConsult.classList.remove("active");
  });

formConsultation.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputPhoneConsult.value.length < 18) {
    phoneNotificationConsult.classList.add("active");
  } else {
    phoneNotificationConsult.classList.remove("active");
  }

  if (!inputCheckboxConsult.checked) {
    checkboxNotificationConsult.classList.add("active");
  } else {
    checkboxNotificationConsult.classList.remove("active");
  }

  if (inputPhoneConsult.value.length === 18 && inputCheckboxConsult.checked) {
    const formData = new FormData();
    formData.append("consultPhone", inputPhoneConsult.value);

    fetch("assets/php/go.php", {
      method: "POST",
      body: formData,
    });

    thanksPopup.classList.add("active");

    inputPhoneConsult.value = "";
  }
});
