const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__menu-item");

burger.addEventListener("click", () => {
  menu.classList.toggle("active");
  burger.classList.toggle("active");
});

menuLinks.forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    burger.classList.remove("active");
  })
);
