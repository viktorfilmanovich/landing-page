const thanksPopup = document.querySelector(".thanks");

thanksPopup.querySelector(".thanks__close").addEventListener("click", () => {
  thanksPopup.classList.remove("active");
});

thanksPopup.querySelector(".button-primary").addEventListener("click", () => {
  thanksPopup.classList.remove("active");
});
