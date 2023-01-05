const itemList = document.querySelector(".sort__list");
const select = document.querySelector("#select");
const selectChildMain = document.querySelector(".select-child-main");
const selectMenu = document.querySelector(".select-parent-menu");
const selectItemBtn = document.querySelector(".select__item-btn");

select.addEventListener("click", (e) => {
  e.stopPropagation();

  selectMenu.classList.toggle("select-parent-menu--active");
  selectItemBtn.classList.toggle("select-item-btn--active");
  selectMenuColor();
});

window.addEventListener("click", (e) => {
  if (e.target.className != selectMenu) {
    selectMenu.classList.remove("select-parent-menu--active");
    selectItemBtn.classList.remove("select-item-btn--active");
  }
  selectMenuColor();
});

document.querySelectorAll(".select-child").forEach((item) =>
  item.addEventListener("click", () => {
    selectChildMain.textContent = item.textContent.toLowerCase();

    productsPaginationArray = [];

    sortPrice();

    if (productsArrayFilter !== undefined) {
      for (let i = 0; i < pagePagination; i++) {
        productsPaginationArray.push(productsArrayFilter[i]);
      }
    } else {
      for (let i = 0; i < pagePagination; i++) {
        productsPaginationArray.push(productsArray[i]);
      }
    }

    outputGoods(productsPaginationArray);
    syncFavouritesProducts();
  })
);

// Если меню открыто, то добавляем красный цвет для selectChildMain и selectItemBtn. Если нет - меняем на цвет по умолчанию
function selectMenuColor() {
  if (selectMenu.classList.contains("select-parent-menu--active")) {
    selectChildMain.classList.add("select-child-main--red");
    selectItemBtn.children[0].classList.add("select__item-btn-bar--red");
    selectItemBtn.children[1].classList.add("select__item-btn-bar--red");
  } else {
    selectChildMain.classList.remove("select-child-main--red");
    selectItemBtn.children[0].classList.remove("select__item-btn-bar--red");
    selectItemBtn.children[1].classList.remove("select__item-btn-bar--red");
  }
}

function sortPrice() {
  if (selectChildMain.textContent === "сначала популярные") {
    sortID();
  }
  if (selectChildMain.textContent === "сначала недорогие") {
    sortLow();
  }
  if (selectChildMain.textContent === "сначала дорогие") {
    sortHigh();
  }

  function sortID() {
    if (productsArrayFilter !== undefined) {
      return productsArrayFilter.sort((a, b) => a.id - b.id);
    } else {
      return productsArray.sort((a, b) => a.id - b.id);
    }
  }

  function sortLow() {
    if (productsArrayFilter !== undefined) {
      return productsArrayFilter.sort((a, b) => a.price - b.price);
    } else {
      return productsArray.sort((a, b) => a.price - b.price);
    }
  }

  function sortHigh() {
    if (productsArrayFilter !== undefined) {
      return productsArrayFilter.sort((a, b) => b.price - a.price);
    } else {
      return productsArray.sort((a, b) => b.price - a.price);
    }
  }
}
