const totalPriceEl = document.querySelector(".total-price");

const priceWithoutSpaces = (str) => {
  return str.replace(/\s/g, "");
};

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};

const numToStr = function (num, arrText) {
  if (num % 10 === 1 && num % 100 !== 11) {
    return arrText[0];
  } else if (
    num % 10 >= 2 &&
    num % 10 <= 4 &&
    (num % 100 < 10 || num % 100 >= 20)
  ) {
    return arrText[1];
  }
  return arrText[2];
};

function observer() {
  const targets = document.querySelectorAll("[data-src]");

  const loadImage = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.getAttribute("data-src");
        observer.unobserve(entry.target);
        entry.target.removeAttribute("data-src");
      }
      entry.target.onerror = () => {
        entry.target.style.display = "none";
        entry.target.parentNode.children[1].classList.remove("none");
      };
    });
  };

  const options = {
    root: null,
    rootMargin: "50px",
    threshold: 0.05,
  };

  const observer = new IntersectionObserver(loadImage, options);
  targets.forEach((target) => {
    observer.observe(target);
  });
}

const startFinishLoader = () => {
  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 500);
};

let productsArray;
let productsPaginationArray = [];
let productsArrayFilter;
let pagePagination = 8;

const outputGoods = (array) => {
  ROOT_PRODUCTS_CONTAINER.innerHTML = array
    .map(
      (n) => `
        <div class="col-md-6">
          <div class="card mb-4" data-id="${n.id}">
            <div class="card__main-content">
              <div class="product-frame-img">
                <img class="product-img" data-src="${n.img}" alt="">
                <div class="img-error none">
                  Нет фотографии
                </div>
                <span class="product-frame-flare"></span>
              </div>
              <div class="card-body text-center">
                <div class="card__top">
                  <div class="card__title-group">
                    <div class="card__title-top">
                    <div class="card__rating">
                      <svg class="card__rating-icon">
                        <use xlink:href="sprite.svg#rating"></use>
                      </svg>
                      <svg class="card__rating-icon">
                        <use xlink:href="sprite.svg#rating"></use>
                      </svg>
                      <svg class="card__rating-icon">
                        <use xlink:href="sprite.svg#rating"></use>
                      </svg>
                      <svg class="card__rating-icon">
                        <use xlink:href="sprite.svg#rating"></use>
                      </svg>
                      <svg class="card__rating-icon">
                        <use xlink:href="sprite.svg#rating"></use>
                      </svg>
                    </div>
                    <h4 class="item-title">${n.title.replace(
                      "комплект",
                      ""
                    )}</h4>
                    </div>
                    <div class="card__info-details">
                        <ul class="card-details">
                          <li>
                            <p class="padding-right">Режимы</p>
                            <p class="card-details__modes padding-left">${
                              n.modes
                            }</p>
                          </li>
                          <li>
                            <p class="padding-right">Мощность</p>
                            <p class="card-details__power padding-left">${
                              n.power
                            }</p>
                          </li>
                          <li>
                            <p class="padding-right">Инвертор</p>
                            <p class="card-details__inverter padding-left">${
                              n.invertor
                            }</p>
                          </li>
                          <li>
                            <p class="padding-right">Макс. площадь</p>
                            <p class="card-details__area padding-left">${
                              n.area
                            } м²</p>
                          </li>
                          <li>
                            <p class="padding-right">Wi-Fi</p>
                            <p class="card-details__wifi padding-left">${
                              n.wifi
                            }</p>
                          </li>
                          <li>
                            <p class="padding-right">Уровень шума</p>
                            <p class="card-details__volume padding-left">${
                              n.volume
                            } дБ</p>
                          </li>
                          <li>
                            <p class="padding-right">Гарантия АСЦ</p>
                            <p class="card-details__warranty padding-left">${
                              n.warranty
                            }</p>
                          </li>
                        </ul>
                        <div class="details-title">
                          <div class="details-title-text">Развернуть характеристики</div>
                          <button class="nav__item-btn">
                            <span class="nav__item-btn-bar"></span>
                            <span class="nav__item-btn-bar"></span>
                          </button>
                        </div>
                    </div>
                  </div>
                  <div class="details-wrapper">
                    <!-- Счетчик -->
                    <div class="items counter-wrapper">
                      <button class="items__control" data-action="minus">-</button>
                      <div class="items__current" data-counter>1</div>
                      <button class="items__control" data-action="plus">+</button>
                    </div>
                    <!-- // Счетчик -->
                    <div class="price">
                      <div class="card__price">
                        <div class="card__price-currency">${normalPrice(
                          n.price
                        )}</div>
                        <span class="price__currency-rouble">₽</span>
                      </div>
                    </div>
                    <div class="card__bottom-group">
                      <button class="card__favourites-item" title="Добавить в избранное">
                        <svg data-favourites class="card__favourites-icon">
                          <use xlink:href="sprite.svg#favourites"></use>
                        </svg>
                      </button>
                      <button data-cart type="button" class="btn btn-block btn-outline-warning">
                        Купить
                      </button>
                    </div>
                    <span class="price__currency-delivery"> Бесплатная доставка</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");
  observer();
  startFinishLoader();
};

const modalProductTemplate = (
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
) => {
  return `
  <li class="modal-content__item">
    <article class="modal-content__product cart-product" data-id="${id}">
      <img src="${img}" alt="${title}" class="modal-product__img">
      <div class="modal-product__text">
        <div class="modal__card-rating">
          <svg class="card__rating-icon">
            <use xlink:href="sprite.svg#rating"></use>
          </svg>
          <svg class="card__rating-icon">
            <use xlink:href="sprite.svg#rating"></use>
          </svg>
          <svg class="card__rating-icon">
            <use xlink:href="sprite.svg#rating"></use>
          </svg>
          <svg class="card__rating-icon">
            <use xlink:href="sprite.svg#rating"></use>
          </svg>
          <svg class="card__rating-icon">
            <use xlink:href="sprite.svg#rating"></use>
          </svg>
        </div>
        <h3 class="modal-product__title">${title}</h3>
        <ul class="modal-product__parameters">
          <li>
            <p>Гарантия АСЦ</p>
            <strong class="modal-product__parameters-warranty">${warranty}</strong>
          </li>
          <li>
            <p>Инвертор</p>
            <strong class="modal-product__parameters-inverter">${inverter}</strong>
          </li>
          <li>
            <p>Wi-Fi</p>
            <strong class="modal-product__parameters-wifi">${wifi}</strong>
          </li>
          <li>
            <p>Максимальная площадь помещения</p>
            <strong class="modal-product__parameters-area">${area}</strong>
          </li>
          <li>
            <p>Уровень шума</p>
            <strong class="modal-product__parameters-volume">${volume}</strong>
          </li>
          <li>
            <p>Холодопроизводительность</p>
            <strong class="modal-product__parameters-power">${power}</strong>
          </li>
          <li>
            <p>Режимы</p>
            <strong class="modal-product__parameters-modes">${modes}</strong>
          </li>
        </ul>
        <div class="cart-product__bottom">
          <div class="items counter-wrapper">
            <button class="items__control" data-action="minus">-</button>
            <div class="items__current" data-counter>1</div>
            <button class="items__control" data-action="plus">+</button>
          </div>
          <div class="modal-price">
            <span class="modal-price__number">${price}</span>
            <span class="modal-price__symbol"> ₽</span>
          </div>
          <button data-modal="" type="button" class="btn btn-block btn-outline-warning modal__btn">
          Купить
          </button>
        </div>
      </div>
    </article>
  </li>
`;
};

const cartProductTemplate = (id, img, title, counter, price) => {
  return `
    <div class="cart-item" data-id="${id}">
      <div class="cart-item__top">
        <div class="cart-item__left">
          <div class="cart-item__img">
            <img src="${img}" alt="${title}">
          </div>
          <div class="cart-item__desc">
            <div class="cart-item__title">${title}</div>
            <div class="cart-item__details">
              <div class="items items--small counter-wrapper">
                <button class="items__control" data-action="minus">-</button>
                <div class="items__current" data-counter="">${counter}</div>
                <button class="items__control" data-action="plus">+</button>
              </div>
              <div class="cart-item__price">
                <div class="price__currency">${normalPrice(price)}</div>
                <div class="cart-item__rouble">₽</div>
              </div>
            </div>
          </div>
        </div>
        <button class="cart-item__button-delete">Удалить</button>
      </div>
    </div>
  `;
};

const errorRender = () => {
  ROOT_PRODUCTS_CONTAINER.innerHTML = `
  <div class="error-render">
      <svg class="error-render-svg">
        <use xlink:href="sprite.svg#error-render-sprite"></use>
      </svg>
      <div class="error-render-message">
        <p class="error-render__text">Ничего не найдено</p>
        <p class="error-render__text">Попробуйте изменить критерии поиска</p>
        <button class="reset-filters-btn" onclick="resetFiltersButton()">Сбросить фильтры</button>
      </div>
  </div>
`;
};

const resetFiltersButton = () => {
  document.querySelectorAll("#filters input").forEach((item) => {
    item.checked = false;
    document.querySelector('#country input[type="radio"]').checked = true;
  });

  search_term = "";
  searchInput.value = "";
  searchCancel.classList.remove("active");

  inputMin.value = "";
  inputMax.value = "";

  moreProductsBtn.classList.remove("none");

  filterGoods();

  searchButton.classList.remove("active");
  searchButton.children[0].classList.remove("active");
};

const showProductsSidebarQuantity = (array) => {
  document.querySelector(
    '.sidebar__category-quantity[data-type="standart"]'
  ).textContent =
    "(" + array.filter((item) => item.type === "standart").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-type="invertor"]'
  ).textContent =
    "(" + array.filter((item) => item.type === "invertor").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="15м²-20м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "15м²-20м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="25м²-30м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "25м²-30м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="30м²-40м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "30м²-40м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="40м²-50м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "40м²-50м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="60м²-70м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "60м²-70м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="70м²-80м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "70м²-80м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-rangearea="100м²"]'
  ).textContent =
    "(" + array.filter((item) => item.rangeArea === "100м²").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="rovex"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "rovex").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="jax"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "jax").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="ballu"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "BALLU").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="electrolux"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "Electrolux").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="zanussi"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "Zanussi").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="toshiba"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "TOSHIBA").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="shuft"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "SHUFT").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="denko"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "denko").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="centek"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "centek").length + ")";

  document.querySelector(
    '.sidebar__category-quantity[data-brand="lessar"]'
  ).textContent =
    "(" + array.filter((item) => item.brand === "lessar").length + ")";
};

const showQuantityAvailableProducts = (array) => {
  document.querySelector(".page__products-quantity").textContent =
    " " +
    array.length +
    " " +
    numToStr(array.length, ["товар", "товара", "товаров"]);

  document.querySelector(
    ".sidebar__bottom"
  ).children[0].children[0].textContent =
    " " +
    array.length +
    " " +
    numToStr(array.length, ["товар", "товара", "товаров"]);
};
