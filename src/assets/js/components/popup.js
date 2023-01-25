const closePopupButton = document.querySelector(".popup__close-button");
const popupBackground = document.querySelector(".popup-background");
const popup = document.querySelector(".popup");

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
