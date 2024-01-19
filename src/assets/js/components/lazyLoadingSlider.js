function appendSliderScriptToBody() {
  const script = document.createElement("script");
  script.src = "assets/js/slider.js";
  document.body.append(script);
}

const productSliderObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();

        appendSliderScriptToBody();
      }
    });
  },
  {
    rootMargin: "100px 0px 100px 0px",
  }
);

const productSection = document.querySelector(".product-section");
productSliderObserver.observe(productSection);
