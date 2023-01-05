// Фильтр сайдбара price range slider
const filtersPriceRender = document.querySelector("#filters__price-render");
const priceInputButton = document.createElement("button");

priceInputButton.classList.add("price-input__button");
priceInputButton.textContent = "Показать";

const inputMin = document.querySelector("#price-min");
const inputMax = document.querySelector("#price-max");
const sliderMin = document.querySelector("#min");
const sliderMax = document.querySelector("#max");
const progress = document.querySelector(".progress");

inputMin.value = normalPrice(inputMin.value);
inputMax.value = normalPrice(inputMax.value);

filtersPriceRender.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    filterGoods();
    priceInputButton.remove();
  }
  if (e.target.value == "") {
    e.target.nextElementSibling.classList.add("none");
  }
});

filtersPriceRender.addEventListener("input", (e) => {
  if (e.target.id === "price-min" || e.target.id === "min") {
    document.querySelector("#price-min-reset").classList.remove("none");
  }

  if (e.target.id === "price-max" || e.target.id === "max") {
    document.querySelector("#price-max-reset").classList.remove("none");
  }

  document.querySelector(".price-group").append(priceInputButton);
});

filtersPriceRender.addEventListener("click", (e) => {
  if (e.target.className === "price-reset") {
    e.target.previousElementSibling.value = "";
    e.target.classList.add("none");

    document.querySelector(".price-group").append(priceInputButton);
  }
});

priceInputButton.addEventListener("click", () => {
  filterGoods();
  priceInputButton.remove();
});

inputMin.addEventListener("input", () => {
  inputMin.value = priceWithoutSpaces(inputMin.value);

  if (inputMin.value > inputMax.max - 27000 - 1) {
    inputMin.value = inputMax.max - 27000;
  }

  sliderMin.value = inputMin.value;

  progress.style.left =
    (priceWithoutSpaces(inputMin.value) / priceWithoutSpaces(inputMax.max)) *
      100 +
    "%";

  inputMin.value = normalPrice(inputMin.value);
});

inputMax.addEventListener("input", () => {
  inputMax.value = priceWithoutSpaces(inputMax.value);

  if (inputMax.value > inputMax.max - 1) {
    inputMax.value = inputMax.max;
  }

  sliderMax.value = inputMax.value;

  progress.style.right =
    100 -
    (priceWithoutSpaces(inputMax.value) / priceWithoutSpaces(inputMax.max)) *
      100 +
    "%";

  inputMax.value = normalPrice(inputMax.value);
});

sliderMin.addEventListener("input", () => {
  inputMin.value = priceWithoutSpaces(inputMin.value);

  if (sliderMin.value > sliderMax.value - 27000 - 1) {
    sliderMin.value = sliderMax.value - 27000;
  }

  inputMin.value = sliderMin.value;

  progress.style.left =
    (priceWithoutSpaces(inputMin.value) / priceWithoutSpaces(inputMax.max)) *
      100 +
    "%";

  inputMin.value = normalPrice(inputMin.value);
});

sliderMax.addEventListener("input", () => {
  inputMax.value = priceWithoutSpaces(inputMax.value);

  if (sliderMax.value < parseInt(sliderMin.value) + 27000 + 1) {
    sliderMax.value = parseInt(sliderMin.value) + 27000;
  }

  inputMax.value = sliderMax.value;

  progress.style.right =
    100 -
    (priceWithoutSpaces(inputMax.value) / priceWithoutSpaces(inputMax.max)) *
      100 +
    "%";

  inputMax.value = normalPrice(inputMax.value);
});
