const telInput = document.querySelector("#tel");
const addressInput = document.querySelector("#address");
const orderCheckbox = document.querySelector(".order__checkbox");

// Вешаем обработчик на кнопку формы
document.querySelector(".order").addEventListener("submit", (e) => {
  e.preventDefault();

  // Проверяем поля телефона, адреса, чекбокса на пустоту или заполненность, показываем или скрываем сообщения. А затем, если все поля заполнены - собираем данные с инпутов, отправляем в mail.php

  // Если количество символов в поле телефона меньше 18, то показываем сообщение с информацией о необходимом количестве символов и меняем цвет border у инпута телефона
  if (telInput.value.length < 18) {
    document
      .querySelector(".order__alert-text-number")
      .classList.add("order__alert-text-number--active");
    telInput.classList.add("order__input--number-red");
  }

  //Если количество символов в поле телефона равно 18, то скрываем сообщение о вводе необходимого количества символов и меняем цвет border у инпута телефона на цвет по умолчанию
  if (telInput.value.length === 18) {
    document
      .querySelector(".order__alert-text-number")
      .classList.remove("order__alert-text-number--active");
    telInput.classList.remove("order__input--number-red");
  }

  // Вешаем обработчик на инпут телефона. Если вводим номер полностью, то убираем сообщение, удаляем красный border и добавляем зеленый бордер. Если введен не полностью - добавляем сообщение, удаляем зеленый бордер и добавляем красный бордер
  telInput.addEventListener("input", () => {
    if (telInput.value.length === 18) {
      document
        .querySelector(".order__alert-text-number")
        .classList.remove("order__alert-text-number--active");
      telInput.classList.remove("order__input--number-red");
      telInput.classList.add("order__input--number-green");
    }
    if (telInput.value.length < 18) {
      document
        .querySelector(".order__alert-text-number")
        .classList.add("order__alert-text-number--active");
      telInput.classList.remove("order__input--number-green");
      telInput.classList.add("order__input--number-red");
    }
  });

  // Если поле адреса пустое, то показываем сообщение с информацией о вводе адреса доставки
  if (addressInput.value === "") {
    document
      .querySelector(".order__alert-text-address")
      .classList.add("order__alert-text-address--active");
    addressInput.classList.add("order__input--address-red");
  }

  // Если поле адреса не пустое, то скрываем сообщение с информацией о вводе адреса доставки
  if (addressInput.value !== "") {
    document
      .querySelector(".order__alert-text-address")
      .classList.remove("order__alert-text-address--active");
    addressInput.classList.remove("order__input--address-red");
  }

  // Вешаем обработчик на инпут адреса. Если поле адреса не пустое, то убираем сообщение, красный border и добавляем зеленый бордер. А если поле адреса пустое, то показываем сообщение, убираем зеленый border и добавляем красный бордер
  addressInput.addEventListener("input", () => {
    if (addressInput.value !== "") {
      document
        .querySelector(".order__alert-text-address")
        .classList.remove("order__alert-text-address--active");
      addressInput.classList.remove("order__input--address-red");
      addressInput.classList.add("order__input--address-green");
    }
    if (addressInput.value === "") {
      document
        .querySelector(".order__alert-text-address")
        .classList.add("order__alert-text-address--active");
      addressInput.classList.remove("order__input--address-green");
      addressInput.classList.add("order__input--address-red");
    }
  });

  // Если чекбокс не нажат, то показываем сообщение и border у чекбокса меняем на красный
  if (orderCheckbox.checked != true) {
    document
      .querySelector(".order__alert-text-checkbox")
      .classList.add("order__alert-text-checkbox--active");
    orderCheckbox.style.border = "1px solid #ff8383";
  }

  // Если чекбокс нажат, то убираем сообщение
  if (orderCheckbox.checked) {
    document
      .querySelector(".order__alert-text-checkbox")
      .classList.remove("order__alert-text-checkbox--active");
  }

  // Вешаем обработчик на инпут checkbox. Если checkbox нажат, то убираем сообщение. Если не нажат, то показываем сообщение
  orderCheckbox.addEventListener("input", () => {
    if (orderCheckbox.checked) {
      document
        .querySelector(".order__alert-text-checkbox")
        .classList.remove("order__alert-text-checkbox--active");
      orderCheckbox.style.border = "1px solid #67d36f";
    }
    if (orderCheckbox.checked != true) {
      document
        .querySelector(".order__alert-text-checkbox")
        .classList.add("order__alert-text-checkbox--active");
      orderCheckbox.style.border = "1px solid #ff8383";
    }
  });

  // Если количество символов в поле телефона равно 18, поле адреса не пустое и инпут политики конфиденциальности в состоянии нажатого чекбокса, то скрываем оба сообщения о вводе цифр телефона и вводе адреса, меняем цвета border у обоих инпутов на цвета по умолчанию, а также собираем и передаем данные в mail.php и запускаем последующие функции
  if (
    telInput.value.length === 18 &&
    addressInput.value !== "" &&
    orderCheckbox.checked
  ) {
    document
      .querySelector(".order__alert-text-number")
      .classList.remove("order__alert-text-number--active");
    document
      .querySelector(".order__alert-text-address")
      .classList.remove("order__alert-text-address--active");
    telInput.classList.remove("order__input--number-green");
    addressInput.classList.remove("order__input--address-green");

    // Собираем данные и отправляем в mail.php
    let self = e.currentTarget;
    let formData = new FormData(self);
    let tel = self.querySelector('[name="Телефон"]').value;
    let address = self.querySelector('[name="Адрес"]').value;
    formData.append("Товары", JSON.stringify(productArray));
    formData.append("Телефон", tel);
    formData.append("Адрес", address);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    //Передаем данные в php
    xhr.open("POST", "mail.php", true);

    xhr.send(formData);

    // Очищаем поля формы
    self.reset();

    // очищаем dom коллекцию в корзине перед запуском цикла for of
    productArray.splice(0, productArray.length);
    console.log(productArray.length);
    ROOT_CART_WRAPPER.innerHTML = "";

    // Отображение статуса корзины Пустая / Полная
    toggleCartStatus();
    // Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
    // Выводим количество добавленных товаров в корзину на кнопке Корзина
    printQuantity();
    // Закрываем блок формы
    closeFormBlock();
    // Окно благодарности
    openThanks();
  }
});
