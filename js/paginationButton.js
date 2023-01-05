const moreProductsBtn = document.querySelector(".more-products-btn");

const moreProductsBtnDisabled = (array) => {
  array.length == productsPaginationArray.length
    ? (moreProductsBtn.disabled = true)
    : (moreProductsBtn.disabled = false);
};

moreProductsBtn.addEventListener("click", () => {
  productsPaginationArray = [];

  const checkArray = (array) => {
    pagePagination >= array.length - productsPaginationArray.length - 8
      ? (pagePagination = array.length - productsPaginationArray.length)
      : (pagePagination += 8);
    for (let i = 0; i < pagePagination; i++) {
      productsPaginationArray.push(array[i]);
    }

    moreProductsBtnDisabled(array);
  };

  productsArrayFilter !== undefined
    ? checkArray(productsArrayFilter)
    : checkArray(productsArray);

  outputGoods(productsPaginationArray);
  syncFavouritesProducts();
});
