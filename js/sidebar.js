const filterSidebar = document.querySelector(".category__filter");
const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar__header");
const sidebarButtonClose = document.querySelector(".sidebar__button-close");
const sidebarBottom = document.querySelector(".sidebar__bottom");

// Фильтры сайдбара (кроме фильтра price range slider)
const filtersClickRender = document.querySelectorAll("#filters__click-render");

filtersClickRender.forEach((elem) =>
  elem.addEventListener("input", filterGoods)
);

async function filterGoods() {
  productsPaginationArray = [];

  inputMin.value = priceWithoutSpaces(inputMin.value);
  inputMax.value = priceWithoutSpaces(inputMax.value);

  const country = filters.querySelector("#country input:checked").value,
    types = [...filters.querySelectorAll("#type input:checked")].map(
      (n) => n.value
    ),
    rangeAreas = [...filters.querySelectorAll("#rangeArea input:checked")].map(
      (n) => n.value
    ),
    brands = [...filters.querySelectorAll("#brand input:checked")].map(
      (n) => n.value
    ),
    priceMin = document.querySelector("#price-min").value,
    priceMax = document.querySelector("#price-max").value;

  productsArrayFilter = await productsArray.filter(
    (n) =>
      (!country || n.country === country) &&
      (!types.length || types.includes(n.type)) &&
      (!rangeAreas.length || rangeAreas.includes(n.rangeArea)) &&
      (!brands.length || brands.includes(n.brand)) &&
      (!priceMin || priceMin <= n.price) &&
      (!priceMax || priceMax >= n.price) &&
      (!search_term || n.title.toLowerCase().includes(search_term))
  );

  inputMin.value = normalPrice(inputMin.value);
  inputMax.value = normalPrice(inputMax.value);

  sortPrice();

  if (productsArrayFilter.length < 8 && productsArrayFilter.length != 0) {
    pagePagination = productsArrayFilter.length;
  } else {
    pagePagination = 8;
  }

  for (let i = 0; i < pagePagination; i++) {
    productsPaginationArray.push(productsArrayFilter[i]);
  }

  try {
    outputGoods(productsPaginationArray);
    moreProductsBtnDisabled(productsArrayFilter);
    syncFavouritesProducts();
    showProductsSidebarQuantity(productsArrayFilter);
    showQuantityAvailableProducts(productsArrayFilter);
    moreProductsBtn.classList.remove("none");
    startFinishLoader();
  } catch (error) {
    startFinishLoader();
    console.log(error.message);
    errorRender();
    showProductsSidebarQuantity(productsArrayFilter);

    document.querySelector(".page__products-quantity").textContent =
      "нет товаров";

    moreProductsBtn.classList.add("none");
  }
}

filterSidebar.addEventListener("click", () => {
  sidebar.classList.add("sidebar--mobile");
  sidebarHeader.classList.add("sidebar__header--mobile");
  sidebarButtonClose.classList.add("sidebar__button-close--mobile");
  sidebarBottom.classList.add("sidebar__bottom--mobile");
  document.body.style.overflow = "hidden";
});

// Свернуть/развернуть категории меню
document.querySelectorAll(".sidebar__item-title").forEach((item) => {
  item.addEventListener("click", () => {
    item
      .closest(".sidebar__item")
      .children[1].classList.toggle("sidebar__item-menu--close");
    item.children[0].classList.toggle("sidebar__title-btn--rotate");
  });
});

sidebarButtonClose.addEventListener("click", () => {
  closeSidebar();
  document.body.style.overflow = "visible";
});

sidebarBottom.children[0].addEventListener("click", () => {
  closeSidebar();
  document.body.style.overflow = "visible";
});

function closeSidebar() {
  sidebar.classList.remove("sidebar--mobile");
  sidebarHeader.classList.remove("sidebar__header--mobile");
  sidebarButtonClose.classList.remove("sidebar__button-close--mobile");
  sidebarBottom.classList.remove("sidebar__bottom--mobile");
}
