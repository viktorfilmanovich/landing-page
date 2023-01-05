function syncFavouritesProducts() {
  ROOT_PRODUCTS_CONTAINER.querySelectorAll(".card").forEach((item) => {
    recordProducts.forEach((i) => {
      if (item.dataset.id === i) {
        item
          .querySelector(".card__favourites-icon")
          .classList.add("card__favourites-icon--orange");
      } else {
        return;
      }
    });
  });
}
