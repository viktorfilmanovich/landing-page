const favouritesEmpty = document.querySelector(".favourites__empty");
const favouritesButtonCatalog = document.querySelector(
  ".favourites__button-catalog"
);
const headerFavouritesButton = document.querySelector(
  ".header__favourites-button"
);
const favouritesBg = document.querySelector(".favourites-bg");
const favouritesBlock = document.querySelector(".favourites");
const favouritesButtonClose = document.querySelector(
  ".favourites__button-close"
);
const headerFavouritesCounter = document.querySelector(
  ".header__favourites-image-counter"
);
// Массив для записи товара, добавленного в избранное
let recordProducts = [];

function initialStateFav() {
  if (localStorage.getItem("favourites") !== null) {
    ROOT_FOVOURITES_PRODUCTS.innerHTML = localStorage.getItem("favourites");
    ROOT_FOVOURITES_PRODUCTS.querySelectorAll(".favourites-item").forEach(
      (item) => {
        recordProducts.push(item.dataset.id);
      }
    );
  }
}

function updateStorageFav() {
  let html = ROOT_FOVOURITES_PRODUCTS.innerHTML;
  html = html.trim();
  if (html.length) {
    localStorage.setItem("favourites", html);
  } else {
    localStorage.removeItem("favourites");
  }
}

// Добавление товара в избранное
window.addEventListener("click", function (event) {
  if (
    event.target.closest(".card__favourites-item") ||
    event.target.closest(".card__favourites-icon")
  ) {
    const parentCard = event.target.closest(".card");
    parentCard
      .querySelector(".card__favourites-icon")
      .classList.add("card__favourites-icon--orange");
    const cardInfo = {
      id: parentCard.dataset.id,
      imgSrc: parentCard.querySelector(".product-img").getAttribute("src"),
      title: parentCard.querySelector(".item-title").textContent,
      price: priceWithoutSpaces(
        parentCard.querySelector(".card__price-currency").textContent
      ),
    };

    const itemInFavourites = ROOT_FOVOURITES_PRODUCTS.querySelector(
      `[data-id="${cardInfo.id}"]`
    );

    if (itemInFavourites) {
      // Если число в массиве совпадает с id товара, который добавляем в избранное, то удаляем это число из массива
      recordProducts.forEach((item) => {
        if (item === cardInfo.id) {
          let perem = recordProducts.indexOf(item);
          recordProducts.splice(perem, 1);
        }
      });
      // Удаляем заливку оранжевым у иконки избранного
      parentCard
        .querySelector(".card__favourites-icon")
        .classList.remove("card__favourites-icon--orange");
      // Удаляем товар из избранного
      itemInFavourites.closest(".favourites-item").remove();
      // Запускаем счетчик избранного и обновление текста на главной кнопке избранного
      toggleFavouritesStatus();
    } else {
      // Добавляем число из id товара в массив
      recordProducts.push(cardInfo.id);
      const favouritesItemHTML = `<div class="favourites-item" data-id="${cardInfo.id}">
                                    <div class="favourites-item__top">
                                      <div class="favourites-item__left">
                                        <div class="favourites-item__img">
                                          <img src="${cardInfo.imgSrc}" alt="${cardInfo.title}">
                                        </div>
                                        <div class="favourites-item__desc">
                                          <div class="favourites-item__title">${cardInfo.title}</div>
                                          <div class="favourites-item__details">
                                            <div class="items counter-wrapper">
                                              <button class="items__control" data-action="minus">-</button>
                                              <div class="items__current" data-counter>1</div>
                                              <button class="items__control" data-action="plus">+</button>
                                            </div>
                                            <div class="favourites__price">
                                              <div class="favourites-item__price-currency">${cardInfo.price}</div>
                                              <div class="favourites-item__price-rouble">₽</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <button data-fav type="button" class="favourites-item__button-add-cart">
                                        Добавить в корзину
                                      </button>
                                      <button class="favourites-item__button-delete">Удалить</button>
                                    </div>
                                  </div>`;
      ROOT_FOVOURITES_PRODUCTS.insertAdjacentHTML(
        "beforeend",
        favouritesItemHTML
      );
      toggleFavouritesStatus();
    }
    updateStorageFav();
  }
});

// Удаление товара из избранного
window.addEventListener("click", function (event) {
  if (event.target.closest(".favourites-item__button-delete")) {
    const parentFav = event.target.closest(".favourites-item");
    recordProducts.forEach((item) => {
      if (item === parentFav.dataset.id) {
        let indexItem = recordProducts.indexOf(item);
        recordProducts.splice(indexItem, 1);
      }
    });
    ROOT_PRODUCTS_CONTAINER.querySelectorAll(".card").forEach((item) => {
      if (item.dataset.id === parentFav.dataset.id) {
        item
          .querySelector(".card__favourites-icon")
          .classList.remove("card__favourites-icon--orange");
      }
    });
    parentFav.remove();
    toggleFavouritesStatus();
    updateStorageFav();
  }
});

// Добавление товара в корзину
window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-fav")) {
    const cardFav = event.target.closest(".favourites-item");
    const cardFavInfo = {
      id: cardFav.dataset.id,
      imgSrc: cardFav
        .querySelector(".favourites-item__img img")
        .getAttribute("src"),
      title: cardFav.querySelector(".favourites-item__title").textContent,
      price: priceWithoutSpaces(
        cardFav.querySelector(".favourites-item__price-currency").textContent
      ),
      counter: cardFav.querySelector(".items__current").textContent,
    };
    const itemFavouritesInCart = ROOT_CART_WRAPPER.querySelector(
      `[data-id="${cardFavInfo.id}"]`
    );
    if (itemFavouritesInCart) {
      alert("этот товар уже добавлен из избранного в корзину");
    } else {
      ROOT_CART_WRAPPER.insertAdjacentHTML(
        "beforeend",
        cartProductTemplate(
          cardFavInfo.id,
          cardFavInfo.imgSrc,
          cardFavInfo.title,
          cardFavInfo.counter,
          cardFavInfo.price
        )
      );
    }
    toggleCartStatus();
    calcCartPriceAndDelivery();
    printQuantity();
    updateStorage();
  }
});

// Добавление всех товаров в корзину / Закрытие окна избранного, если в нем пусто
window.addEventListener("click", function (event) {
  if (
    event.target.closest(".favourites__button-catalog") &&
    ROOT_FOVOURITES_PRODUCTS.children.length > 0
  ) {
    ROOT_FOVOURITES_PRODUCTS.childNodes.forEach((item) => {
      const prevCardInfo = {
        id: item.dataset.id,
        imgSrc: item
          .querySelector(".favourites-item__img img")
          .getAttribute("src"),
        title: item.querySelector(".favourites-item__title").textContent,
        price: priceWithoutSpaces(
          item.querySelector(".favourites-item__price-currency").textContent
        ),
        counter: item.querySelector("[data-counter]").textContent,
      };
      const itemFavourInCart = ROOT_CART_WRAPPER.querySelector(
        `[data-id="${prevCardInfo.id}"]`
      );
      if (itemFavourInCart) {
        alert("один из этих товаров уже был добавлен из избранного в корзину");
      } else {
        ROOT_CART_WRAPPER.insertAdjacentHTML(
          "beforeend",
          cartProductTemplate(
            prevCardInfo.id,
            prevCardInfo.imgSrc,
            prevCardInfo.title,
            prevCardInfo.counter,
            prevCardInfo.price
          )
        );
      }
    });
    toggleCartStatus();
    calcCartPriceAndDelivery();
    printQuantity();
    updateStorage();
  }
  if (
    event.target.closest(".favourites__button-catalog") &&
    ROOT_FOVOURITES_PRODUCTS.children.length == 0
  ) {
    closeFavourites();
  }
});

// Открываем окно с избранным
headerFavouritesButton.addEventListener("click", () => {
  favouritesBg.classList.add("favourites-bg--active");
  favouritesBlock.classList.add("active");
  document.body.style.overflowY = "hidden";
});

// Зарываем окно с избранным
favouritesButtonClose.addEventListener("click", closeFavourites);
favouritesBg.addEventListener("click", closeFavourites);

// Функция закрытия окна с избранным
function closeFavourites() {
  favouritesBg.classList.remove("favourites-bg--active");
  favouritesBlock.classList.remove("active");
  document.body.style.overflowY = "visible";
}
