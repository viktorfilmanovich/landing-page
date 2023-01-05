window.addEventListener("click", (e) => {
  if (e.target.closest(".details-title")) {
    const parent = e.target.closest(".card");
    const cardDetails = parent.querySelector(".card-details");
    const navItemBtn = parent.querySelector(".nav__item-btn");

    cardDetails.classList.toggle("card-details--active");
    navItemBtn.classList.toggle("nav__item-btn--active");

    if (cardDetails.classList.contains("card-details--active")) {
      cardDetails.nextElementSibling.children[0].textContent =
        "Свернуть характеристики";
    } else {
      cardDetails.nextElementSibling.children[0].textContent =
        "Развернуть характеристики";
    }
  }
});
