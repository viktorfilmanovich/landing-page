forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.querySelector('input[name="name"]');
    const phone = form.querySelector('input[name="phone"]');
    const checkbox = form.querySelector('input[name="checkbox"]');

    const nameNotification = form.querySelector(
      ".contact-form__notification--name-popup"
    );
    const phoneNotification = form.querySelector(
      ".contact-form__notification--phone-popup"
    );
    const checkboxNotification = form.querySelector(
      ".contact-form__notification--checkbox-popup"
    );

    const button = form.querySelector("button");

    const buttonText = button.querySelector("span");
    const loader = form.querySelector("button").querySelector(".loader");

    const isPopupForm = name !== null;

    const formData = new FormData();

    if (isPopupForm) {
      if (name.value.length === 0) {
        nameNotification.classList.add("contact-form__notification--active");
      } else {
        nameNotification.classList.remove("contact-form__notification--active");
      }
    }

    if (phone.value.length !== 18) {
      phoneNotification.classList.add("contact-form__notification--active");
    } else {
      phoneNotification.classList.remove("contact-form__notification--active");
    }

    if (!checkbox.checked) {
      checkboxNotification.classList.add("contact-form__notification--active");
    } else {
      checkboxNotification.classList.remove(
        "contact-form__notification--active"
      );
    }

    if (isPopupForm) {
      if (
        name.value.length === 0 ||
        phone.value.length !== 18 ||
        !checkbox.checked
      ) {
        return;
      }
    } else {
      if (phone.value.length !== 18 || !checkbox.checked) {
        return;
      }
    }

    if (isPopupForm) name.blur();
    phone.blur();

    buttonText.textContent = "";
    loader.classList.add("loader--active");

    formData.append("theme", isPopupForm ? formThemeState : button.value);
    if (isPopupForm) formData.append("name", name.value);
    formData.append("phone", phone.value);

    fetch("assets/php/go.php", {
      method: "POST",
      body: formData,
    });

    if (isPopupForm) {
      setTimeout(() => {
        form.parentNode.classList.remove("active");
      }, 1000);

      setTimeout(() => {
        thanksPopup.classList.add("active");
      }, 1450);
    } else {
      setTimeout(() => {
        background.classList.add("active");
        thanksPopup.classList.add("active");
      }, 1000);
    }

    setTimeout(
      () => {
        form.reset();

        formThemeState = "";

        buttonText.textContent = "Отправить";
        loader.classList.remove("loader--active");
      },
      isPopupForm ? 1600 : 1000
    );
  });
});

notifications.forEach((notification) => {
  notification
    .querySelector(".contact-form__notification-close")
    .addEventListener("click", () =>
      notification.classList.remove("contact-form__notification--active")
    );
});
