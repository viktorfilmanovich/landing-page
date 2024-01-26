const closing = () => {
  thanksPopup.classList.remove("active");
  background.classList.remove("active");
};

thanksPopup.querySelector(".thanks__close").addEventListener("click", closing);
thanksPopup.querySelector(".button-primary").addEventListener("click", closing);
