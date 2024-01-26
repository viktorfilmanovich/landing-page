const containerOverflowHidden = document.querySelector(
    ".container.overflow-hidden"
  ),
  slider = document.querySelector(".slider-container"),
  paginationContainer = document.querySelector(".pagination-btns"),
  prevButton = document.querySelector(".slider-btn-prev"),
  nextButton = document.querySelector(".slider-btn-next");

const products = [
  {
    imageUrl: "../../assets/images/slider/electrolux-air-gate-2-eacs-12hg-m2n3",
    name: "Сплит-система Electrolux Air Gate 2 EACS-12HG-M2N3",
    price: 19690,
    rating: 10,
  },
  {
    imageUrl: "../../assets/images/slider/zanussi-paradiso-zacs-18-hpr-a18-n1",
    name: "Сплит-система Zanussi Paradiso ZACS-18 HPR/A18/N1",
    price: 48190,
    rating: 6,
  },
  {
    imageUrl: "../../assets/images/slider/ballu-bravo-bsq-36hn1-14y",
    name: "Сплит-система Ballu Bravo BSQ-36HN1_14Y",
    price: 53990,
    rating: 4,
  },
  {
    imageUrl: "../../assets/images/slider/toshiba-shorai-edge-ras-18j2vsg-ee",
    name: "Сплит-система TOSHIBA Shorai Edge RAS-18J2VSG-EE",
    price: 69990,
    rating: 7,
  },
  {
    imageUrl: "../../assets/images/slider/shuft-sftmi-18hn1",
    name: "Сплит-система SHUFT SFTMI-18HN1",
    price: 86690,
    rating: 8,
  },
  {
    imageUrl: "../../assets/images/slider/ac-electric-acem-18hn1-23y",
    name: "Сплит-система AC ELECTRIC ACEM-18HN1_23Y",
    price: 109990,
    rating: 5,
  },
  {
    imageUrl: "../../assets/images/slider/neoline-nag-24hn1",
    name: "Сплит-система NEOLINE NAG-24HN1",
    price: 116990,
    rating: 10,
  },
  {
    imageUrl: "../../assets/images/slider/komanchi-kat-24h-n1",
    name: "Сплит-система KOMANCHI KAT-24H/N1",
    price: 117990,
    rating: 5,
  },
  {
    imageUrl:
      "../../assets/images/slider/electrolux-monaco-super-dc-nverter-eacs-i-18hm-n3-15y",
    name: "Сплит-система Electrolux Monaco Super DC Inverter EACS/I-18HM/N3_15Y",
    price: 21390,
    rating: 7,
  },
  {
    imageUrl:
      "../../assets/images/slider/zanussi-elegante-dc-inverter-zacs-i-12-he-a18-n1",
    name: "Сплит-система Zanussi Elegante DC Inverter ZACS/I-12 HE/A18/N1",
    price: 48190,
    rating: 5,
  },
];

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0,
  slideWidth = 0,
  slidesLengthOnWindow = 4,
  padding = 30,
  paginationButtons = null,
  paginatePosition = 0,
  swipeTreshold = 20;

slider.addEventListener("mousedown", touchStart, { passive: true });
slider.addEventListener("mouseup", touchEnd, { passive: true });
slider.addEventListener("mouseleave", touchEnd, { passive: true });
slider.addEventListener("mousemove", touchMove, { passive: true });

slider.addEventListener("touchstart", touchStart, { passive: true });
slider.addEventListener("touchend", touchEnd, { passive: true });
slider.addEventListener("touchcancel", touchEnd, { passive: true });
slider.addEventListener("touchmove", touchMove, { passive: true });

prevButton.addEventListener("mousedown", () => {
  currentIndex -= 1;
  setPositionByIndex();
});

nextButton.addEventListener("mousedown", () => {
  currentIndex += 1;
  setPositionByIndex();
});

window.addEventListener("resize", () => {
  blockWidthCalc();
});

function disabledPaginationButtons() {
  currentIndex === 0
    ? prevButton.setAttribute("disabled", true)
    : prevButton.removeAttribute("disabled");

  currentIndex === products.length - slidesLengthOnWindow
    ? nextButton.setAttribute("disabled", true)
    : nextButton.removeAttribute("disabled");

  paginationButtons.forEach((x, index) =>
    index === currentIndex
      ? x.children[0].classList.add("pagination-btn-span--active")
      : x.children[0].classList.remove("pagination-btn-span--active")
  );
}

function blockWidthCalc() {
  if (window.innerWidth > 1350) {
    slidesLengthOnWindow = 4;
  }

  if (window.innerWidth <= 1350) {
    slidesLengthOnWindow = 3;
  }

  if (window.innerWidth <= 1000) {
    slidesLengthOnWindow = 2;
  }

  if (window.innerWidth <= 820) {
    slidesLengthOnWindow = 1;
  }

  slideWidth =
    (containerOverflowHidden.clientWidth - padding) / slidesLengthOnWindow;

  if (currentIndex > products.length - slidesLengthOnWindow)
    currentIndex = products.length - slidesLengthOnWindow;

  renderProducts(slideWidth);
  renderPagination(slidesLengthOnWindow);
  setPositionByIndex();
}

function renderProducts(blockWidth) {
  slider.innerHTML = products
    .map(
      (product) => `<div class="slide" style="width:${blockWidth}px">
        <div class="card-item">
          <picture>
            <source
              type="image/webp"
              srcset="${product.imageUrl + ".webp"}"
            />
            <img
              width="150"
              height="150"
              src="${product.imageUrl + ".jpg"}"
              alt="${product.name}"
              class="card-item__img"
            />
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
                  <use xlink:href="../../assets/images/icons/sprite.svg#full-star"></use>
                </svg>
                <div class="card-item__rating-overlay" style="width:${
                  100 - Math.round((product.rating / 10) * 100)
                }%"></div>
              </div>
              <h3 class="card-item__title">${
                product.name.length > 44
                  ? product.name.slice(0, 44) + "..."
                  : product.name
              }</h3>
              <p class="card-item__price">${product.price.toLocaleString(
                "ru-RU"
              )} ₽</p>
              <button value="${
                product.name
              }"  class="button-primary open-popup">Установить</button>
        </div>
      </div>
        `
    )
    .join("");

  const openPopupButtons = document.querySelectorAll(".open-popup");

  openPopupButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      background.classList.add("active");
      popup.classList.add("active");

      formThemeState = event.target.value;
    })
  );
}

function renderPagination(slidesLengthOnWindow) {
  paginationContainer.innerHTML = [
    ...new Array(products.length + 1 - slidesLengthOnWindow),
  ]
    .map(
      (_) =>
        `<button type="button" aria-label="Пролистнуть слайд" class="pagination-btn"><span class="pagination-btn-span"></span></button>`
    )
    .join("");

  paginationButtons = document.querySelectorAll(".pagination-btn");
  paginationButtons[paginatePosition].children[0].classList.add(
    "pagination-btn-span--active"
  );

  paginationButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;

      setPositionByIndex();
    });
  });
}

function disabledPrevAndNextButtons() {
  currentIndex === 0
    ? prevButton.setAttribute("disabled", true)
    : prevButton.removeAttribute("disabled");

  currentIndex === products.length - slidesLengthOnWindow
    ? nextButton.setAttribute("disabled", true)
    : nextButton.removeAttribute("disabled");
}

function touchStart(e) {
  startPos = getPositionX(e);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
  slider.classList.add("grabbing");
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  slider.classList.remove("grabbing");

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -swipeTreshold) {
    if (
      Math.round((-currentTranslate + 130) / slideWidth) >
      products.length - slidesLengthOnWindow
    ) {
      currentIndex = products.length - slidesLengthOnWindow;
    } else {
      currentIndex = Math.round((-currentTranslate + 130) / slideWidth);
    }
  }

  if (movedBy > swipeTreshold) {
    if (Math.round((-currentTranslate - 130) / slideWidth) < 0) {
      currentIndex = 0;
    } else {
      currentIndex = Math.round((-currentTranslate - 130) / slideWidth);
    }
  }

  setPositionByIndex();
}

function touchMove(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate =
    -((containerOverflowHidden.clientWidth - padding) / slidesLengthOnWindow) *
    currentIndex;

  prevTranslate = currentTranslate;

  setSliderPosition();
  disabledPrevAndNextButtons();
  disabledPaginationButtons();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

blockWidthCalc();
