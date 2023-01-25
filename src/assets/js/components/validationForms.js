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

const formPopup = document.querySelector(".contact-form--popup");

const inputNamePopup = formPopup.querySelector('input[name="popupName"]');
const inputPhonePopup = formPopup.querySelector('input[name="popupPhone"]');
const inputCheckboxPopup = formPopup.querySelector(
  'input[name="popupCheckbox"]'
);

const nameNotificationPopup = document.querySelector(
  ".notification--name-popup"
);
const phoneNotificationPopup = document.querySelector(
  ".notification--phone-popup"
);
const checkboxNotificationPopup = document.querySelector(
  ".notification--checkbox-popup"
);

nameNotificationPopup
  .querySelector(".notification__alert-close")
  .addEventListener("click", () => {
    nameNotificationPopup.classList.remove("active");
  });
phoneNotificationPopup
  .querySelector(".notification__alert-close")
  .addEventListener("click", () => {
    phoneNotificationPopup.classList.remove("active");
  });
checkboxNotificationPopup
  .querySelector(".notification__alert-close")
  .addEventListener("click", () => {
    checkboxNotificationPopup.classList.remove("active");
  });

formPopup.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputNamePopup.value.length === 0) {
    nameNotificationPopup.classList.add("active");
  } else {
    nameNotificationPopup.classList.remove("active");
  }

  if (inputPhonePopup.value.length < 18) {
    phoneNotificationPopup.classList.add("active");
  } else {
    phoneNotificationPopup.classList.remove("active");
  }

  if (!inputCheckboxPopup.checked) {
    checkboxNotificationPopup.classList.add("active");
  } else {
    checkboxNotificationPopup.classList.remove("active");
  }

  if (
    inputNamePopup.value.length !== 0 &&
    inputPhonePopup.value.length === 18 &&
    inputCheckboxPopup.checked
  ) {
    const formData = new FormData();
    formData.append("popupName", inputNamePopup.value);
    formData.append("popupPhone", inputPhonePopup.value);

    fetch("assets/php/go.php", {
      method: "POST",
      body: formData,
    });

    popupBackground.classList.remove("active");
    formPopup.parentNode.classList.remove("active");
    thanksPopup.classList.add("active");

    inputNamePopup.value = "";
    inputPhonePopup.value = "";
  }
});
