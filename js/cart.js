// Div внутри корзины, в который мы добавляем товары
const btnPredv = document.querySelector(".btn-predv");
const pricePlusText = document.querySelector(".price-plus__text");
const cartImage = document.querySelector(".header__cart-image");
const cartButtonText = document.querySelector(".header__cart-button-text");

// Считываем с localStorage товары и отображаем их в корзине
function initialState() {
  if (localStorage.getItem("products") !== null) {
    document
      .querySelector(".cart-main")
      .querySelector(".cart-wrapper").innerHTML =
      localStorage.getItem("products");
  }
}

// Считываем с корзины товары и добавляем их в localStorage
function updateStorage() {
  let parent = document
    .querySelector(".cart-main")
    .querySelector(".cart-wrapper");
  let html = parent.innerHTML;
  html = html.trim();

  if (html.length) {
    localStorage.setItem("products", html);
  } else {
    localStorage.removeItem("products");
  }
}

let productArray = [];

// Функция вывода общей суммы под кнопку корзины
const printQuantity = () => {
  if (ROOT_CART_WRAPPER.children.length > 0) {
    cartImage.classList.add("header__cart-image--color");
    cartButtonText.textContent = totalPriceEl.textContent + " ₽";
    cartButtonText.classList.add("header__cart-button-text--color");
    cartButtonText.parentNode.classList.add("header__cart-group--color");
  } else {
    cartImage.classList.remove("header__cart-image--color");
    cartButtonText.textContent = "Корзина";
    cartButtonText.classList.remove("header__cart-button-text--color");
    cartButtonText.parentNode.classList.remove("header__cart-group--color");
  }
};

// Добавление товара в корзину
window.addEventListener("click", function (event) {
  // Проверяем что клик был совершен по кнопке "Добавить в корзину"
  if (event.target.hasAttribute("data-cart")) {
    // Находим карточку с товаром, внутри которой был совершен клик
    const card = event.target.closest(".card");

    // Меняем текст на кнопке при добавлении в корзину и возвращаем текст по умолчанию через 2 сек
    card.querySelector(".btn").textContent = "✔ В корзине";
    setTimeout(() => (card.querySelector(".btn").textContent = "Купить"), 2000);

    // Собираем данные с этого товара и записываем их в единый объект productInfo
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".item-title").innerText,
      price: priceWithoutSpaces(
        card.querySelector(".card__price-currency").textContent
      ),
      counter: card.querySelector("[data-counter]").textContent,
    };
    // Проверять если ли уже такой товар в корзине
    const itemInCart = ROOT_CART_WRAPPER.querySelector(
      `[data-id="${productInfo.id}"]`
    );

    // Если товар есть в корзине
    if (itemInCart) {
      const counterElement = itemInCart.querySelector("[data-counter]");
      counterElement.textContent =
        parseInt(counterElement.textContent) + parseInt(productInfo.counter);
    } else {
      // Если товара нет в корзине, то собранные данные вставляем в шаблон и шаблон вставляем в корзину

      ROOT_CART_WRAPPER.insertAdjacentHTML(
        "beforeend",
        cartProductTemplate(
          productInfo.id,
          productInfo.imgSrc,
          productInfo.title,
          productInfo.counter,
          productInfo.price
        )
      );
    }
    // Сбрасываем счетчик добавленного товара на "1"
    card.querySelector("[data-counter]").innerText = "1";
    // Отображение статуса корзины Пустая / Полная
    toggleCartStatus();
    // Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
    // Отображаем сумму товаров на кнопке Корзина
    printQuantity();
    updateStorage();
  }
});

// Удаление товара из корзины
window.addEventListener("click", function (event) {
  // Поверяем что нажали на кнопку удалить товар
  if (event.target.closest(".cart-item__button-delete")) {
    // Удаляем товар
    event.target.closest(".cart-item").remove();
    // Отображение статуса корзины Пустая / Полная
    toggleCartStatus();
    // Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
    // Пересчитываем товары в корзине и показываем число на кнопке Корзина
    printQuantity();
    // Обновляем localStorage
    updateStorage();
  }
});

//Нажатие на кнопку "Оформить заказ"
const podtverzd = btnPredv.addEventListener("click", (e) => {
  // document.querySelector(".order__btn").textContent = "Вызвать";

  productArray.splice(0, productArray.length);

  let array = ROOT_CART_WRAPPER.children;
  let totalprice = totalPriceEl.textContent + " ₽";

  for (item of array) {
    let title = item.querySelector(".cart-item__title").textContent;
    let price = item.querySelector(".price__currency").textContent;
    let counter = item.querySelector(".items__current").textContent + " шт";
    let obj = {};
    obj.title = title;
    obj.price = price;
    obj.counter = counter;
    obj.totalprice = totalprice;

    productArray.push(obj);
  }

  // Если количество товаров в корзине равно 0 то...
  if (productArray.length == 0) {
    // ...Закрываем корзину
    closeCart();
  } else {
    // ...А если количество товаров не равно 0, то закрываем корзину и открываем блок формы с задержкой по времени
    korzina.classList.remove("active");
    setTimeout(() => openFormBlock(), 400);
  }
});
