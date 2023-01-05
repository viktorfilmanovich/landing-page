// Открыть/закрыть корзину
const cartButton = document.querySelector(".header__cart-button");
const background = document.querySelector(".background");
const korzina = document.querySelector(".korzina");
const korzinaButtonClose = document.querySelector(".korzina__button-close");

cartButton.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  background.classList.add("active");
  // setTimeout(() => background.classList.add("active"), 100);
  setTimeout(() => korzina.classList.add("active"), 300);
});

korzinaButtonClose.addEventListener("click", closeCart);
background.addEventListener("click", closeCart);

// Закрываем корзину
function closeCart() {
  korzina.classList.remove("active");
  setTimeout(() => background.classList.remove("active"), 300);
  document.body.style.overflowY = "visible";

  // Если форма заказа открыта, то закрываем
  if (formBlock.classList.contains("active")) {
    formBlock.classList.remove("active");
  }
}
