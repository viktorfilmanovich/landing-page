function toggleCartStatus() {
  const ROOT_CART_WRAPPER = document.querySelector(".cart-wrapper");
  const cartEmptyBadge = document.querySelector("[data-cart-empty]");
  const orderForm = document.querySelector("#order-form");
  if (ROOT_CART_WRAPPER.children.length > 0) {
    // Скрываем надпись "Ваша корзина пуста"
    cartEmptyBadge.classList.add("none");
    document.querySelector(".cart-total").classList.remove("none");
    orderForm.classList.remove("none");
    //Отображаем кнопку очистить корзину
    cartButtonClear.classList.add("active");
  } else {
    // Показываем надпись "Ваша корзина пуста"
    cartEmptyBadge.classList.remove("none");
    document.querySelector(".cart-total").classList.add("none");
    // Скрываем кнопку очистить корзину
    cartButtonClear.classList.remove("active");
  }
}
