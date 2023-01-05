const btnNext = document.querySelector(".carousel__button--next");
const brnPrevious = document.querySelector(".carousel__button--prev");
const slides = document.querySelectorAll(".carousel__item");
const totalSlides = slides.length;
const btnsPagination = document.querySelectorAll(
  ".carousel__button-pagination"
);

let slidePosition = 0;

btnNext.addEventListener("click", () => {
  nextSlide();

  resetAndStartInterval();
});

brnPrevious.addEventListener("click", () => {
  previousSlide();

  resetAndStartInterval();
});

btnsPagination.forEach((item, index) =>
  item.addEventListener("click", () => {
    slidePosition = index;

    updateSlidePosition();

    resetAndStartInterval();
  })
);

const nextSlide = () => {
  slidePosition === totalSlides - 1 ? (slidePosition = 0) : slidePosition++;

  updateSlidePosition();
};

const previousSlide = () => {
  slidePosition === 0 ? (slidePosition = totalSlides - 1) : slidePosition--;

  updateSlidePosition();
};

const updateSlidePosition = () => {
  slides.forEach((item) => item.classList.remove("carousel__item--visible"));

  slides[slidePosition].classList.add("carousel__item--visible");

  btnsPagination.forEach((item) =>
    item.children[0].classList.remove("carousel__button-span--active")
  );

  btnsPagination[slidePosition].children[0].classList.add(
    "carousel__button-span--active"
  );
};

let autoPlay = setInterval(nextSlide, 6000);

const resetAndStartInterval = () => {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 6000);
};
