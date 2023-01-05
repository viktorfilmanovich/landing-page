const loader = document.querySelector(".loader");

// Запускаем getProducts
getProducts();

// Асинхронная функция получения данных из файла catalogFinish.json
async function getProducts() {
  const response = await fetch("./js/catalogFinish.json");
  productsArray = await response.json();

  for (let i = 0; i < pagePagination; i++) {
    productsPaginationArray.push(productsArray[i]);
  }

  // Запускаем ф-ю рендера (отображения товаров)
  outputGoods(productsPaginationArray);
  initialState();
  updateStorage();
  initialStateFav();
  updateStorageFav();
  syncFavouritesProducts();
  toggleFavouritesStatus();
  toggleCartStatus();
  calcCartPriceAndDelivery();
  printQuantity();
  showProductsSidebarQuantity(productsArray);
  showQuantityAvailableProducts(productsArray);

  document.querySelector(".select-child").click();

  // loader.classList.add("hidden");
}
