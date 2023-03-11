const sliderContainer = document.querySelector(".slider-container");
const containerOverflowHidden = document.querySelector(
  ".container.overflow-hidden"
);
const paginationContainer = document.querySelector(".pagination-btns");
const buttonPrevious = document.querySelector(".slider-btn-prev");
const buttonNext = document.querySelector(".slider-btn-next");

const products = [
  {
    imageUrl: "../../assets/images/slider/tcl-tac-07chsa",
    name: "Кондиционер настенный (сплит-система) TCL TAC-07CHSA/TPG [вентиляция, обогрев, осушение, охлаждение, до 20 м²]",
    price: 14999,
  },
  {
    imageUrl: "../../assets/images/slider/dexp-ac-ch9onf",
    name: "Кондиционер настенный (сплит-система) DEXP AC-CH9ONF [вентиляция, обогрев, осушение, охлаждение, до 25 м², 34 дБ]",
    price: 14999,
  },
  {
    imageUrl: "../../assets/images/slider/lg-pc12sq",
    name: "Кондиционер настенный (сплит-система) LG PC12SQ [инвертор, обогрев, осушение, охлаждение, до 35 м², 19 дБ]",
    price: 57299,
  },
  {
    imageUrl: "../../assets/images/slider/centek-ct-65a09",
    name: "Кондиционер настенный (сплит-система) Centek CT-65A09 [осушение, вентиляция, обогрев, охлаждение, до 25 м², 23 дБ]",
    price: 20999,
  },
  {
    imageUrl: "../../assets/images/slider/samsung-ar09aqhqdurner",
    name: "Кондиционер настенный (сплит-система) Samsung AR09AQHQDURNER [вентиляция, обогрев, осушение, охлаждение, до 26 м²]",
    price: 34999,
  },
  {
    imageUrl: "../../assets/images/slider/midea-msag2-12hrn1-i",
    name: "Кондиционер настенный (сплит-система) Midea MSAG2-12HRN1-I / MSAG2-12HRN1-O [обогрев, осушение, охлаждение, до 35 м², 26.5 дБ]",
    price: 34799,
  },
  {
    imageUrl: "../../assets/images/slider/tesla-ta36ffml-12410a",
    name: "Кондиционер настенный (сплит-система) Tesla TA36FFML-12410A [вентиляция, обогрев, охлаждение, до 35 м², 27 дБ]",
    price: 26499,
  },
  {
    imageUrl: "../../assets/images/slider/electrolux-eacs-09hg-m2",
    name: "Кондиционер настенный (сплит-система) Electrolux EACS-09HG-M2/N3 [обогрев, охлаждение, осушение, до 27 м², 25 дБ]",
    price: 33799,
  },
  {
    imageUrl: "../../assets/images/slider/hisense-as-12hr4svddj3g",
    name: "Кондиционер настенный (сплит-система) Hisense AS-12HR4SVDDJ3G [вентиляция, обогрев, осушение, охлаждение, до 32 м², 31.5 дБ]",
    price: 44799,
  },
  {
    imageUrl: "../../assets/images/slider/kentatsu-ksgp35hzrn1",
    name: "Кондиционер настенный (сплит-система) Kentatsu KSGP35HZRN1 / KSRP35HZRN1 [инвертор, обогрев, охлаждение, до 35 м², 21 дБ]",
    price: 60299,
  },
];

let blocksOnWindow = 5;
const padding = 30;

let paginatePosition = 0;
let paginationButtons = null;

let productButtons = null;

let mouseStartPosition = 0;
let mouseEndPosition = 0;

let touchStart = null;
let touchMove = null;

let currentTranslate = 0;

const renderProducts = (blockWidth) => {
  sliderContainer.innerHTML = products
    .map(
      (product) => `<div class="slide" style="width:${blockWidth}px">
        <div class="card-item" data-id="1">
          <picture>
            <source type="image/webp" srcset="${product.imageUrl + ".webp"}" />
            <img width="150" height="150" class="card-item__img" src="${
              product.imageUrl + ".jpg"
            }" alt="${product.name}" />
          </picture>
              <div class="card-item__rating">
                <svg>
                  <use xlink:href="../../assets/images/icons/sprite.svg#full-star"></use>
                </svg>
                <svg>
                  <use xlink:href="../../assets/images/icons/sprite.svg#full-star"></use>
                </svg>
                <svg>
                  <use xlink:href="../../assets/images/icons/sprite.svg#full-star"></use>
                </svg>
                <svg>
                  <use xlink:href="../../assets/images/icons/sprite.svg#full-star"></use>
                </svg>
                <svg>
                  <use xlink:href="../../assets/images/icons/sprite.svg#half-star"></use>
                </svg>
              </div>
              <h3 class="card-item__title">${
                product.name.length > 78
                  ? product.name.slice(0, 78) + "..."
                  : product.name
              }</h3>
              <p class="card-item__price">${product.price.toLocaleString(
                "ru-RU"
              )} ₽</p>
              <button data-cart="" type="button" class="button-primary open-popup">Купить</button>
        </div>
      </div>
        `
    )
    .join("");

  const openPopupButtons = document.querySelectorAll(".open-popup");

  openPopupButtons.forEach((button) =>
    button.addEventListener("click", () => {
      popupBackground.classList.add("active");
      popup.classList.add("active");
    })
  );
};

const renderPagination = (blocksOnWindow) => {
  paginationContainer.innerHTML = [
    ...new Array(products.length + 1 - blocksOnWindow),
  ]
    .map(
      (_) =>
        `<button type="button" class="pagination-btn"><span class="pagination-btn-span"></span></button>`
    )
    .join("");

  paginationButtons = document.querySelectorAll(".pagination-btn");

  paginationButtons[paginatePosition].children[0].classList.add(
    "pagination-btn-span--active"
  );

  paginationButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      paginatePosition = index;

      currentTranslate =
        -((containerOverflowHidden.clientWidth - padding) / blocksOnWindow) *
        paginatePosition;

      sliderContainer.style.transform = `translateX(${currentTranslate}px)`;

      disabledOrEnabledPaginateButtons();
    });
  });
};

const disabledOrEnabledPaginateButtons = () => {
  paginatePosition === 0
    ? buttonPrevious.setAttribute("disabled", true)
    : buttonPrevious.removeAttribute("disabled");

  paginatePosition === products.length - blocksOnWindow
    ? buttonNext.setAttribute("disabled", true)
    : buttonNext.removeAttribute("disabled");

  paginationButtons.forEach((x, index) =>
    index === paginatePosition
      ? x.children[0].classList.add("pagination-btn-span--active")
      : x.children[0].classList.remove("pagination-btn-span--active")
  );
};

const blockWidthCalculation = () => {
  if (window.innerWidth > 1350) {
    blocksOnWindow = 4;
  }

  if (window.innerWidth <= 1350) {
    blocksOnWindow = 3;
  }

  if (window.innerWidth <= 1000) {
    blocksOnWindow = 2;
  }

  if (window.innerWidth <= 560) {
    blocksOnWindow = 1;
  }

  renderProducts(
    (containerOverflowHidden.clientWidth - padding) / blocksOnWindow
  );

  renderPagination(blocksOnWindow);
};

const next = () => {
  currentTranslate =
    currentTranslate -
    (containerOverflowHidden.clientWidth - padding) / blocksOnWindow;

  sliderContainer.style.transform = `translateX(${currentTranslate}px)`;

  paginatePosition = paginatePosition + 1;
};

const previous = () => {
  currentTranslate =
    currentTranslate +
    (containerOverflowHidden.clientWidth - padding) / blocksOnWindow;

  sliderContainer.style.transform = `translateX(${currentTranslate}px)`;

  paginatePosition = paginatePosition - 1;
};

window.addEventListener("resize", () => {
  blockWidthCalculation();

  if (currentTranslate === 0) {
    return;
  } else if (currentTranslate < 0) {
    currentTranslate =
      (-(containerOverflowHidden.clientWidth - padding) / blocksOnWindow) *
      paginatePosition;
    sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
  } else {
    currentTranslate =
      ((containerOverflowHidden.clientWidth - padding) / blocksOnWindow) *
      paginatePosition;
    sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
  }
});
window.addEventListener("DOMContentLoaded", () => {
  blockWidthCalculation();

  disabledOrEnabledPaginateButtons();
});

buttonNext.addEventListener("click", () => {
  next();
  disabledOrEnabledPaginateButtons();
});

buttonPrevious.addEventListener("click", () => {
  previous();
  disabledOrEnabledPaginateButtons();
});

sliderContainer.addEventListener("mousedown", (e) => {
  //Добавляем курсор grabbing при нажатии клавиши мыши
  sliderContainer.style.cursor = "grabbing";

  mouseStartPosition = e.clientX;
});

sliderContainer.addEventListener("mouseup", (e) => {
  //Добавляем курсор grab при отпускании клавиши мыши
  sliderContainer.style.cursor = "grab";

  mouseEndPosition = e.clientX;

  if (paginatePosition === 0 && mouseEndPosition > mouseStartPosition) {
    return;
  }

  if (
    paginatePosition === products.length - blocksOnWindow &&
    mouseEndPosition < mouseStartPosition
  ) {
    return;
  }

  if (mouseEndPosition === mouseStartPosition) {
    return;
  } else if (mouseEndPosition < mouseStartPosition) {
    next();
  } else {
    previous();
  }

  disabledOrEnabledPaginateButtons();
});

sliderContainer.addEventListener("touchstart", (e) => {
  touchStart = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchmove", (e) => {
  touchMove = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", () => {
  if (paginatePosition === 0 && touchMove > touchStart) {
    return;
  }

  if (
    paginatePosition === products.length - blocksOnWindow &&
    touchMove < touchStart
  ) {
    return;
  }

  if (touchMove != null) {
    touchStart > touchMove ? next() : previous();
  } else {
    return;
  }

  disabledOrEnabledPaginateButtons();
});
