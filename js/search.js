// Поиск вверху страницы
const searchInput = document.querySelector(".header__input-search");
const searchCancel = document.querySelector(".header__search-cansel");
const searchButton = document.querySelector(".header__search-btn");
const searchVariants = document.querySelector(".header__search-variants");

let search_term = "";
let productsVariantsArray = [];
let countVariants = 10;

searchInput.addEventListener("click", () => {
  if (
    productsArrayFilter !== undefined &&
    productsArrayFilter.length > 0 &&
    searchInput.value !== ""
  ) {
    searchVariants.classList.remove("none");
  }
});

searchInput.addEventListener("input", async (e) => {
  search_term = e.target.value.toLowerCase();

  productsArrayFilter = await productsArray.filter(
    (n) => !search_term || n.title.toLowerCase().includes(search_term)
  );

  if (productsArrayFilter.length > 0 && search_term) {
    searchCancel.classList.add("active");
    searchVariants.classList.remove("none");
    searchButton.classList.add("active");
    searchButton.children[0].classList.add("active");
  } else {
    searchVariants.classList.add("none");
    searchButton.classList.remove("active");
    searchButton.children[0].classList.remove("active");
  }

  productsVariantsArray = [];

  productsArrayFilter.length < 10
    ? (countVariants = productsArrayFilter.length)
    : (countVariants = 10);

  for (i = 0; i < countVariants; i++) {
    productsVariantsArray.push(productsArrayFilter[i]);
  }

  searchVariants.innerHTML = productsVariantsArray
    .map(
      (n) => `
    <li class="header__search-variant">${n.title.replace(
      "Сплит-система",
      ""
    )}</li>
  `
    )
    .join("");

  document.querySelectorAll(".header__search-variant").forEach((item) => {
    item.addEventListener("click", async () => {
      search_term = item.textContent.toLowerCase();
      searchInput.value = "";

      await filterGoods();

      searchVariants.classList.add("none");
      searchInput.value = item.textContent;
    });
  });
});

searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    searchVariants.classList.add("none");

    search_term = searchInput.value.toLowerCase();

    await filterGoods();
  }
});

searchCancel.addEventListener("click", () => {
  searchInput.value = "";

  searchCancel.classList.remove("active");
  searchVariants.classList.add("none");
  searchButton.classList.remove("active");
  searchButton.children[0].classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target != searchVariants && e.target != searchInput)
    searchVariants.classList.add("none");
});

searchButton.addEventListener("click", async () => {
  search_term = searchInput.value.toLowerCase();

  await filterGoods();
});
