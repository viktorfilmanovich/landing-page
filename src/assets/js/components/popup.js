openPopupButtons.forEach((button) =>
  button.addEventListener("click", (event) => {
    background.classList.add("active");
    popup.classList.add("active");

    formThemeState = event.target.value;
  })
);

const closingModal = () => {
  const form = popup.querySelector("form");

  const nameNotification = form.querySelector(
    ".contact-form__notification--name-popup"
  );
  const phoneNotification = form.querySelector(
    ".contact-form__notification--phone-popup"
  );
  const checkboxNotification = form.querySelector(
    ".contact-form__notification--checkbox-popup"
  );

  background.classList.remove("active");
  popup.classList.remove("active");
  if (thanksPopup.classList.contains("active"))
    thanksPopup.classList.remove("active");

  setTimeout(() => {
    form.reset();

    formThemeState = "";

    nameNotification.classList.remove("contact-form__notification--active");
    phoneNotification.classList.remove("contact-form__notification--active");
    checkboxNotification.classList.remove("contact-form__notification--active");
  }, 500);
};

closePopupButton.addEventListener("click", closingModal);
background.addEventListener("click", closingModal);
