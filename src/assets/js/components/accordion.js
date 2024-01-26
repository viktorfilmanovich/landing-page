titles.forEach((question) =>
  question.addEventListener("click", toggleAccordion)
);

function toggleAccordion() {
  let thisItem = this.parentNode;

  accordionItems.forEach((item) => {
    if (thisItem === item) {
      thisItem.classList.toggle("active");
      return;
    }
    item.classList.remove("active");
  });
}
