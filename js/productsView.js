const row = document.querySelector(".row");
const temp = localStorage.getItem("temp");
row.dataset.temp = temp;

// Перекрашиваем активную и неактивную кнопки
function itemButtonColor() {
  const itemGrid = document.querySelectorAll(".category__button-item-grid");
  const itemList = document.querySelectorAll(".category__button-item-list");

  if (localStorage.getItem("temp") === "grid") {
    itemList.forEach((item) => {
      item.classList.remove("category__button-item-list--orange");
    });
    itemGrid.forEach((item) => {
      item.classList.add("category__button-item-grid--orange");
    });

    closeDetailsProducts();
  }
  if (localStorage.getItem("temp") === "list") {
    itemGrid.forEach((item) => {
      item.classList.remove("category__button-item-grid--orange");
    });
    itemList.forEach((item) => {
      item.classList.add("category__button-item-list--orange");
    });
  }
  if (document.querySelector('.row[data-temp="null"]')) {
    itemList.forEach((item) => {
      item.classList.add("category__button-item-list--orange");
    });
  }
}

itemButtonColor();

// Кликаем по кнопкам отображения списка товаров и меняем отображение списка
// А также записываем отображение списка в localStorage
document.querySelectorAll("button[data-view]").forEach((item) => {
  item.addEventListener("click", () => {
    const view = item.dataset.view;
    row.dataset.temp = view;
    localStorage.setItem("temp", view);

    itemButtonColor();
  });
});

//Функция закрытия меню характеристик. Если меню открыты - закрываем. А также меняем текст со "Свернуть характеристики" на "Основные характеристики"
function closeDetailsProducts() {
  document.querySelectorAll(".card-details").forEach((item) => {
    if (item.classList.contains("card-details--active")) {
      item.classList.remove("card-details--active");
      item.previousElementSibling.querySelector(
        ".details-title-text"
      ).textContent = "Основные характеристики";
    }
  });
  document.querySelectorAll(".nav__item-btn").forEach((item) => {
    if (item.classList.contains("nav__item-btn--active")) {
      item.classList.remove("nav__item-btn--active");
    }
  });
}
