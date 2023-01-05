const sliderBtnPrev = document.querySelector(".slider-btn-prev");
const sliderBtnNext = document.querySelector(".slider-btn-next");
const containerResize = document.querySelector(".container.overflow-hidden");
const slider = document.querySelector(".slider-container");
const slides = Array.from(document.querySelectorAll(".slide"));
const paginationBtns = document.querySelectorAll(".pagination-btn");

let slidesOnWindow = 0;
let padding = 30;
let currentTranslate = 0;
let slideWidth = 0;
let slidePosition = 0;

let mouseStartPosition = 0;
let mouseEndPosition = 0;

let touchStart = null;
let touchMove = null;

sliderBtnNext.addEventListener("click", () => {
  next();
  paginationBtnUpdate();
});

sliderBtnPrev.addEventListener("click", () => {
  previous();
  paginationBtnUpdate();
});

paginationBtns.forEach((item, index) =>
  item.addEventListener("click", () => {
    slidePosition = index;

    paginationBtnUpdate();

    currentTranslate = -slideWidth * slidePosition;

    slider.style.transform = `translateX(${currentTranslate}px)`;
  })
);

slider.addEventListener("mousedown", (e) => {
  mouseStartPosition = e.clientX;
});

slider.addEventListener("mouseup", (e) => {
  mouseEndPosition = e.clientX;

  if (mouseEndPosition == mouseStartPosition) {
    return;
  } else if (mouseEndPosition < mouseStartPosition) {
    next();
  } else {
    previous();
  }

  paginationBtnUpdate();
});

slider.addEventListener("touchstart", (e) => {
  touchStart = e;
});

slider.addEventListener("touchmove", (e) => {
  touchMove = e;
});

slider.addEventListener("touchend", () => {
  if (touchMove != null) {
    touchStart.touches[0].clientX > touchMove.touches[0].clientX
      ? next()
      : previous();
  } else {
    return;
  }

  paginationBtnUpdate();
});

window.addEventListener("DOMContentLoaded", () => {
  responsive();
});

window.addEventListener("resize", () => {
  responsive();

  if (currentTranslate == 0) {
    return;
  } else if (currentTranslate < 0) {
    currentTranslate = -slideWidth * slidePosition;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  } else {
    currentTranslate = slideWidth * slidePosition;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }
});

const next = () => {
  currentTranslate = currentTranslate - slideWidth;

  slider.style.transform = `translateX(${currentTranslate}px)`;

  slidePosition += 1;
};

const previous = () => {
  currentTranslate = currentTranslate + slideWidth;

  slider.style.transform = `translateX(${currentTranslate}px)`;

  slidePosition -= 1;
};

const paginationBtnUpdate = () => {
  paginationBtns.forEach((item) =>
    item.children[0].classList.remove("pagination-btn-span--active")
  );

  paginationBtns[slidePosition].children[0].classList.add(
    "pagination-btn-span--active"
  );
};

const responsive = () => {
  if (window.innerWidth > 1130) {
    slidesOnWindow = 5;
    slideWidth = containerResize.clientWidth / slidesOnWindow;

    slides.forEach((item) => (item.style.width = `${slideWidth}px`));
  }

  if (window.innerWidth <= 1130) {
    slidesOnWindow = 4;
    slideWidth = (containerResize.clientWidth - padding) / slidesOnWindow;

    slides.forEach((item) => (item.style.width = `${slideWidth}px`));
  }

  if (window.innerWidth <= 920) {
    slidesOnWindow = 3;
    slideWidth = (containerResize.clientWidth - padding) / slidesOnWindow;

    slides.forEach((item) => (item.style.width = `${slideWidth}px`));
  }

  if (window.innerWidth <= 690) {
    slidesOnWindow = 2;
    slideWidth = (containerResize.clientWidth - padding) / slidesOnWindow;

    slides.forEach((item) => (item.style.width = `${slideWidth}px`));
  }

  if (window.innerWidth <= 490) {
    slidesOnWindow = 1;
    slideWidth = (containerResize.clientWidth - padding) / slidesOnWindow;

    slides.forEach((item) => (item.style.width = `${slideWidth}px`));
  }
};

paginationBtns[slidePosition].children[0].classList.add(
  "pagination-btn-span--active"
);
