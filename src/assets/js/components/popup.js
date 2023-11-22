const closePopupButton = document.querySelector(".popup__close-button");
const popupBackground = document.querySelector(".popup-background");
const popup = document.querySelector(".popup");

const openPopupButtons = document.querySelectorAll(".open-popup");

openPopupButtons.forEach((button) =>
  button.addEventListener("click", () => {
    popupBackground.classList.add("active");
    popup.classList.add("active");
  })
);

const closingModal = () => {
  popupBackground.classList.remove("active");
  popup.classList.remove("active");

  setTimeout(() => {
    inputNamePopup.value = "";
    inputPhonePopup.value = "";
    inputCheckboxPopup.checked = true;

    nameNotificationPopup.classList.remove("active");
    phoneNotificationPopup.classList.remove("active");
    checkboxNotificationPopup.classList.remove("active");
  }, 250);
};

closePopupButton.addEventListener("click", closingModal);
popupBackground.addEventListener("click", closingModal);
