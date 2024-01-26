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
