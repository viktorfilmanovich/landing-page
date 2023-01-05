const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const close = document.querySelector(".modal__close");
const back = document.querySelector(".modal__back");
let arrayModal = modalContent.querySelector(".modal__left").children;

const dataModals = document.querySelectorAll("[data-modal]");
const itemTitles = document.querySelectorAll(".item-title");

// Если хотим нажать на карточку и открыть попап
window.addEventListener("click", (e) => {
  if (e.target.className === "item-title") {
    let parent = e.target.closest(".card");
    let id = parent.dataset.id;
    let img = parent.querySelector(".product-img").getAttribute("src");
    let title = parent.querySelector(".item-title").textContent;
    let warranty = parent.querySelector(".card-details__warranty").textContent;
    let inverter = parent.querySelector(".card-details__inverter").textContent;
    let wifi = parent.querySelector(".card-details__wifi").textContent;
    let area = parent.querySelector(".card-details__area").textContent;
    let volume = parent.querySelector(".card-details__volume").textContent;
    let power = parent.querySelector(".card-details__power").textContent;
    let modes = parent.querySelector(".card-details__modes").textContent;
    let price = normalPrice(
      parent.querySelector(".card__price-currency").textContent
    );
    modalContent
      .querySelector(".modal__left")
      .insertAdjacentHTML(
        "afterbegin",
        modalProductTemplate(
          img,
          title,
          price,
          id,
          warranty,
          inverter,
          wifi,
          area,
          volume,
          power,
          modes
        )
      );
    modal.classList.add("modal--bg");
    setTimeout(() => {
      modalContent.classList.add("modal__content--show");
    }, 300);
    document.body.style.overflowY = "hidden";
  }
});

window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-modal")) {
    // Находим карточку с товаром, внутри которой был совершен клик
    const modalContentProduct = event.target.closest(".modal-content__product");

    // Меняем текст на кнопке при добавлении в корзину и возвращаем текст по умолчанию через 2 сек
    modalContentProduct.querySelector("[data-modal]").textContent =
      "✔ В корзине";
    setTimeout(
      () =>
        (modalContentProduct.querySelector("[data-modal]").textContent =
          "Купить"),
      2000
    );

    const productModalInfo = {
      id: modalContentProduct.dataset.id,
      imgSrc: modalContentProduct
        .querySelector(".modal-product__img")
        .getAttribute("src"),
      title: modalContentProduct.querySelector(".modal-product__title")
        .textContent,
      price: modalContentProduct.querySelector(".modal-price__number")
        .textContent,
      counter: modalContentProduct.querySelector("[data-counter]").textContent,
    };

    const itemModalInCart = ROOT_CART_WRAPPER.querySelector(
      `[data-id="${productModalInfo.id}"]`
    );

    if (itemModalInCart) {
      const counterModalElement =
        itemModalInCart.querySelector("[data-counter]");
      counterModalElement.textContent =
        parseInt(counterModalElement.textContent) +
        parseInt(productModalInfo.counter);
    } else {
      ROOT_CART_WRAPPER.insertAdjacentHTML(
        "beforeend",
        cartProductTemplate(
          productModalInfo.id,
          productModalInfo.imgSrc,
          productModalInfo.title,
          productModalInfo.counter,
          productModalInfo.price
        )
      );
    }
    // Сбрасываем счетчик товара в модульном окне на 1
    modalContentProduct.querySelector("[data-counter]").textContent = "1";
    // Отображаем / скрываем статус "ваша корзина пуста"
    toggleCartStatus();
    // Пересчет общей стоимости в корзине
    calcCartPriceAndDelivery();
    // Пересчитываем товары в корзине и показываем число на кнопке Корзина
    printQuantity();

    updateStorage();
  }
});

close.addEventListener("click", closeModal);
back.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

function closeModal() {
  modalContent.classList.remove("modal__content--show");
  modal.classList.remove("modal--bg");
  setTimeout(() => {
    modalContent.querySelector(".modal__left").innerHTML = "";
  }, 500);
  document.body.style.overflowY = "visible";
  arrayModal = 0;
}
