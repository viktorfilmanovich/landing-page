// Добавляем прослушку на всем окне
window.addEventListener("click", function (event) {
  // Объявляем переменную для счетчика
  let counter;

  // Проверяем клик строго по кнопкам Плюс либо Минус
  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    // Находим обертку счетчика
    const counterWrapper = event.target.closest(".counter-wrapper");
    // Находим див с числом счетчика
    counter = counterWrapper.querySelector("[data-counter]");
  }

  // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
  if (event.target.dataset.action === "plus") {
    counter.textContent = ++counter.textContent;
  }

  // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
  if (event.target.dataset.action === "minus") {
    // Проверяем чтобы счетчик был больше 1
    if (parseInt(counter.textContent) > 1) {
      // Изменяем текст в счетчике уменьшая его на 1
      counter.textContent = --counter.textContent;
    } else if (
      event.target.closest(".cart-wrapper") &&
      parseInt(counter.textContent) === 1
    ) {
      // Удаляем товар из корзины
      event.target.closest(".cart-item").remove();
    }
    // Отображение статуса корзины Пустая / Полная
    toggleCartStatus();
    // Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
    printQuantity();
    // Записываем в storage
    updateStorage();
  }

  // Проверяем клик на + или - внутри коризины
  if (
    event.target.hasAttribute("data-action") &&
    event.target.closest(".cart-wrapper")
  ) {
    calcCartPriceAndDelivery();
    printQuantity();
    updateStorage();
  }
});
