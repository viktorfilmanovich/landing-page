const thanks = document.querySelector(".thanks");
const thanksButtonClose = document.querySelector(".thanks__button-close");

function openThanks() {
  thanks.classList.add("active");
  setTimeout(autoCloseThanks, 7000);
  function autoCloseThanks() {
    thanks.classList.remove("active");
  }
}

thanksButtonClose.addEventListener("click", closeThanks);

function closeThanks() {
  thanks.classList.remove("active");
}
