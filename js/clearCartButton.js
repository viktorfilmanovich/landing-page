const cartButtonClear = document.querySelector(".cart-button-clear");

cartButtonClear.addEventListener("click", clearCartButton);

function clearCartButton() {
  productArray.splice(0, productArray.length);
  ROOT_CART_WRAPPER.innerHTML = "";
  // Отображение статуса корзины Пустая / Полная
  toggleCartStatus();
  // Пересчет общей стоимости товаров в корзине
  calcCartPriceAndDelivery();
  // Отображаем сумму товаров на кнопке Корзина
  printQuantity();
  // Обновляем localStorage
  updateStorage();
}
