function calcCartPriceAndDelivery() {
  const deliveryCost = document.querySelector(".delivery-cost");
  const cartDelivery = document.querySelector("[data-cart-delivery]");
  const dataPredvCart = document.querySelector("[data-predv-cart]");

  // Общая стоимость товаров
  let priceTotal = 0;

  document.querySelectorAll(".cart-item").forEach((item) => {
    // Находим цены
    const itemPriceEl = priceWithoutSpaces(
      item.querySelector(".price__currency").textContent
    );
    // Находим счетчики
    const amountEl = item.querySelector("[data-counter]").textContent;
    // Добавляем стоимость товара в общую стоимость (цену пропускаем через функцию, которая убирает пробелы в цене и умножаем ее на кол-во товаров в корзине)
    priceTotal += itemPriceEl * amountEl;
  });

  // Отображаем цену на странице и добавляем пробел перед каждыми тремя числами справа
  totalPriceEl.innerText = normalPrice(priceTotal);
  // Скрываем / Показываем блок со стоимостью доставки
  if (priceTotal > 0) {
    cartDelivery.classList.remove("none");
    // На кнопке в корзине показываем текст Оформить заказ
    dataPredvCart.innerText = "Перейти к оформлению";
  } else {
    cartDelivery.classList.add("none");
    // На кнопке в корзине показываем текст Перейти к покупкам
    dataPredvCart.innerText = "Перейти к покупкам";
  }

  // Указываем стоимость доставки
  if (priceTotal >= 10000) {
    deliveryCost.classList.add("free");
    deliveryCost.innerText = "бесплатно";
  } else {
    deliveryCost.classList.remove("free");
    deliveryCost.innerText = "250 ₽";
  }
}
