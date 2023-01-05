function toggleFavouritesStatus() {
  const headerFavouritesCounter = document.querySelector(
    ".header__favourites-image-counter"
  );
  const headerFavouritesIcon = document.querySelector(
    ".header__favourites-image"
  );
  if (ROOT_FOVOURITES_PRODUCTS.children.length > 0) {
    favouritesEmpty.classList.add("none");
    headerFavouritesCounter.classList.add("active");
    headerFavouritesIcon.classList.add("active");
    favouritesButtonCatalog.textContent = "Купить все";
  } else {
    favouritesEmpty.classList.remove("none");
    headerFavouritesCounter.classList.remove("active");
    headerFavouritesIcon.classList.remove("active");
    favouritesButtonCatalog.textContent = "Перейти в каталог";
  }
  headerFavouritesCounter.children[0].textContent =
    ROOT_FOVOURITES_PRODUCTS.children.length;
}
