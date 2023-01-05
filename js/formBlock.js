const formBlock = document.querySelector(".border-top");
const orderButtonClose = document.querySelector(".order__button-close");

function openFormBlock() {
  document.body.style.overflowY = "hidden";
  formBlock.classList.add("active");
}

orderButtonClose.addEventListener("click", closeFormBlock);

function closeFormBlock() {
  formBlock.classList.remove("active");
  setTimeout(() => background.classList.remove("active"), 300);
  document.body.style.overflowY = "visible";

  //Убираем сообщения о незаполненных инпутах
  document
    .querySelector(".order__alert-text-number")
    .classList.remove("order__alert-text-number--active");
  document
    .querySelector(".order__alert-text-address")
    .classList.remove("order__alert-text-address--active");
  document
    .querySelector(".order__alert-text-checkbox")
    .classList.remove("order__alert-text-checkbox--active");

  //Убираем красные бордеры у инпутов
  telInput.classList.remove("order__input--number-red");
  addressInput.classList.remove("order__input--address-red");
  orderCheckbox.style.border = "1px solid #67d36f";

  // Очищаем поля формы
  document.querySelector(".order").reset();
}
