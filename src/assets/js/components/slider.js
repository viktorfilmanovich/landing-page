const containerOverflowHidden = document.querySelector(
    ".container.overflow-hidden"
  ),
  slider = document.querySelector(".slider-container"),
  paginationContainer = document.querySelector(".pagination-btns"),
  prevButton = document.querySelector(".slider-btn-prev"),
  nextButton = document.querySelector(".slider-btn-next");

const products = [
  {
    imageUrl: "../../assets/images/slider/tcl-tac-07chsa",
    name: "Кондиционер настенный (сплит-система) TCL TAC-07CHSA/TPG [вентиляция, обогрев, осушение, охлаждение, до 20 м²]",
    price: 15999,
    rating: 5.2,
  },
  {
    imageUrl: "../../assets/images/slider/dexp-ac-ch9onf",
    name: "Кондиционер настенный (сплит-система) DEXP AC-CH9ONF [вентиляция, обогрев, осушение, охлаждение, до 25 м², 34 дБ]",
    price: 15999,
    rating: 8.8,
  },
  {
    imageUrl: "../../assets/images/slider/lg-pc12sq",
    name: "Кондиционер настенный (сплит-система) LG PC12SQ [инвертор, обогрев, осушение, охлаждение, до 35 м², 19 дБ]",
    price: 48799,
    rating: 3.1,
  },
  {
    imageUrl: "../../assets/images/slider/centek-ct-65a09",
    name: "Кондиционер настенный (сплит-система) Centek CT-65A09 [осушение, вентиляция, обогрев, охлаждение, до 25 м², 23 дБ]",
    price: 19399,
    rating: 6.9,
  },
  {
    imageUrl: "../../assets/images/slider/samsung-ar09aqhqdurner",
    name: "Кондиционер настенный (сплит-система) Samsung AR09AQHQDURNER [вентиляция, обогрев, осушение, охлаждение, до 26 м²]",
    price: 29999,
    rating: 4.7,
  },
  {
    imageUrl: "../../assets/images/slider/midea-msag2-12hrn1-i",
    name: "Кондиционер настенный (сплит-система) Midea MSAG2-12HRN1-I / MSAG2-12HRN1-O [обогрев, осушение, охлаждение, до 35 м², 26.5 дБ]",
    price: 34799,
    rating: 9.5,
  },
  {
    imageUrl: "../../assets/images/slider/tesla-ta36ffml-12410a",
    name: "Кондиционер настенный (сплит-система) Tesla TA36FFML-12410A [вентиляция, обогрев, охлаждение, до 35 м², 27 дБ]",
    price: 31799,
    rating: 7.6,
  },
  {
    imageUrl: "../../assets/images/slider/electrolux-eacs-09hg-m2",
    name: "Кондиционер настенный (сплит-система) Electrolux EACS-09HG-M2/N3 [обогрев, охлаждение, осушение, до 27 м², 25 дБ]",
    price: 41799,
    rating: 8.4,
  },
  {
    imageUrl: "../../assets/images/slider/hisense-as-12hr4svddj3g",
    name: "Кондиционер настенный (сплит-система) Hisense AS-12HR4SVDDJ3G [вентиляция, обогрев, осушение, охлаждение, до 32 м², 31.5 дБ]",
    price: 44799,
    rating: 3.3,
  },
  {
    imageUrl: "../../assets/images/slider/kentatsu-ksgp35hzrn1",
    name: "Кондиционер настенный (сплит-система) Kentatsu KSGP35HZRN1 / KSRP35HZRN1 [инвертор, обогрев, охлаждение, до 35 м², 21 дБ]",
    price: 60299,
    rating: 9.1,
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

slider.addEventListener("mousedown", touchStart);
slider.addEventListener("mouseup", touchEnd);
slider.addEventListener("mouseleave", touchEnd);
slider.addEventListener("mousemove", touchMove);

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchend", touchEnd);
slider.addEventListener("touchcancel", touchEnd);
slider.addEventListener("touchmove", touchMove);

prevButton.addEventListener("click", () => {
  currentIndex -= 1;
  setPositionByIndex();
});

nextButton.addEventListener("click", () => {
  currentIndex += 1;
  setPositionByIndex();
});

window.addEventListener("DOMContentLoaded", () => {
  blockWidthCalc();
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
        <div class="card-item" data-id="1">
          <picture>
            <source type="image/webp" srcset="${product.imageUrl + ".webp"}" />
            <img width="auto" height="150" class="card-item__img" src="${
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
                  <use xlink:href="../../assets/images/icons/sprite.svg#full-star"></use>
                </svg>
                <div class="card-item__rating-overlay" style="width:${
                  100 - Math.round((product.rating / 10) * 100)
                }%"></div>
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
}

function renderPagination(slidesLengthOnWindow) {
  paginationContainer.innerHTML = [
    ...new Array(products.length + 1 - slidesLengthOnWindow),
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

  // console.log(Math.round((-currentTranslate + 400) / slideWidth));

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
