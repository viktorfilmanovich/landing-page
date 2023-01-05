// Анимация главной страницы при загрузке сайта
window.addEventListener("DOMContentLoaded", () => {
  const animateTop1 = document.querySelector(".animate-top-one");
  const animateTop2 = document.querySelector(".animate-top-two");
  const animateTop3 = document.querySelector(".animate-top-three");
  const animateTop4 = document.querySelector(".animate-top-four");

  animateTop1.classList.add("animate-top-one-end");
  setTimeout(() => {
    animateTop2.classList.add("animate-top-two-end");
  }, 500);
  setTimeout(() => {
    animateTop3.classList.add("animate-top-three-end");
  }, 700);
  setTimeout(() => {
    animateTop4.classList.add("animate-top-four-end");
  }, 900);
});

//Кнопка "вернуться наверх сайта"
const scroll = document.querySelector(".scrollTop");

window.addEventListener("scroll", function () {
  scroll.classList.toggle("active", window.scrollY > 500);
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Фиксированный header при скролле
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Открыть/закрыть меню при наведении/увода/клика курсором мыши
const navItems = document.querySelectorAll(".nav__item");
const menuItemLinks = document.querySelectorAll(".nav__item-link");

let isMobile = false;

window.addEventListener("DOMContentLoaded", () => {
  // Если разрешение экрана меньше или равно 769px , то запускаем отслеживание клика и увода мыши
  if (document.body.clientWidth <= 769) {
    isMobile = true;
  }

  //Если разрешение экрана больше 769px, то запускаем отслеживания наведения и увода курсора мыши
  if (document.body.clientWidth > 769) {
    isMobile = false;
  }

  // if (isMobile) {
  //   navItems.forEach((i) => {
  //     i.addEventListener("mouseleave", hideSub, false);
  //     i.addEventListener("click", clickedSub, false);
  //   });
  //   function hideSub(e) {
  //     if (this.children.length > 1) {
  //       this.children.length[1].classList.remove("menu__submenu--active");
  //     } else {
  //       return false;
  //     }
  //   }
  //   function clickedSub(e) {
  //     menuItemLinks.forEach((item) => {
  //       item.classList.remove("nav__item-link--active");
  //     });
  //     this.children[0].classList.toggle("nav__item-link--active");
  //     this.children[1].classList.toggle("menu__submenu--active");
  //   }
  // }

  if (!isMobile) {
    for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener("mouseenter", showSub, false);
      navItems[i].addEventListener("mouseleave", hideSub, false);
    }

    function showSub(e) {
      if (this.children.length > 1) {
        this.children[0].classList.add("nav__item-link--active");
        this.children[0].children[0].classList.add("nav__item-btn--active");
        this.children[1].classList.add("menu__submenu--active");
      } else {
        return false;
      }
    }

    function hideSub(e) {
      if (this.children.length > 1) {
        this.children[0].classList.remove("nav__item-link--active");
        this.children[0].children[0].classList.remove("nav__item-btn--active");
        this.children[1].classList.remove("menu__submenu--active");
      } else {
        return false;
      }
    }
  }
});

// Mobile menu
let hamb = document.querySelector(".hamb");
let menu = document.querySelector(".menu");

hamb.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamb.classList.toggle("active");
  menu.classList.toggle("active");
}

const nav = document.querySelectorAll(".nav");

nav.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamb.classList.remove("active");
  menu.classList.remove("active");
}

//Плавное появление блоков при скролле
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 50;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

// Acordion
let accordion = document.querySelector(".accordion");
let items = accordion.querySelectorAll(".accordion__item");
let title = accordion.querySelectorAll(".accordion__title");

title.forEach((question) =>
  question.addEventListener("click", toggleAccordion)
);

function toggleAccordion() {
  let thisItem = this.parentNode;

  items.forEach((item) => {
    if (thisItem == item) {
      // если этот элемент равен выбранному элементу, открыть его
      thisItem.classList.toggle("active");
      item.querySelector(".accordion__btn").classList.toggle("active");
      return;
    }
    // в противном случае удалить открытый класс
    item.classList.remove("active");
    item.querySelector(".accordion__btn").classList.remove("active");
  });
}

//Квалификация лида и подмена текстов в форме
const cardButtons = document.querySelectorAll(".card__button");
const infoButtons = document.querySelectorAll(".info-button");
const mainButton = document.querySelector('[value="Мастер"]');

let formSubject = document.querySelector('[name="form_subject"]');
let formTitle = document.querySelector(".right-block-form__title");
let formTitleVariable = document.querySelector(".title-form-text-first");
let btnForm = document.querySelector('[value="form1"]');

cardButtons.forEach((item) => {
  item.addEventListener("click", () => {
    formTitle.textContent = item.value;
    formTitleVariable.textContent = item.innerText;
    btnForm.textContent = item.textContent;
    formSubject.value = item.value;
  });
});

infoButtons.forEach((item) => {
  item.addEventListener("click", () => {
    formTitle.textContent = "Нужна консультация?";
    formTitleVariable.textContent = "Перезвоните мне";
    btnForm.textContent = "Перезвоните мне";
    formSubject.value = "Консультация";
  });
});

mainButton.addEventListener("click", () => {
  formTitle.textContent = "Вам нужен мастер?";
  formTitleVariable.textContent = "Вызвать мастера";
  btnForm.textContent = "Вызвать мастера";
  formSubject.value = "Вызвать мастера";
});

// Modal
const openPopup = document.querySelectorAll(".open-popup");
const popupBg = document.querySelector(".popup-bg");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".close-popup");
const inputs = document.querySelectorAll(".contact-form__input");

openPopup.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    popupBg.classList.add("active");
    popup.classList.add("active");
    document.body.style.overflowY = "hidden";
    scroll.classList.remove("active");
  });
});

closePopup.addEventListener("click", closingModal);
popupBg.addEventListener("click", closingModal);

function closingModal() {
  popup.classList.remove("active");
  popupBg.classList.remove("active");
  document.querySelector(".contact-form").reset();
  document
    .querySelectorAll(".contact-form label")
    .forEach((item) => item.classList.remove("active"));
  document.body.style.overflowY = "visible";
  scroll.classList.add("active");
}

// Сообщение после отправки формы
const messageBg = document.querySelector(".contact-form__message-bg");
const message = document.querySelector(".contact-form__message");
const buttonCloseMessage = document.querySelector(
  ".contact-form__message__button-close"
);

buttonCloseMessage.addEventListener("click", closeMessage);
messageBg.addEventListener("click", closeMessage);

function closeMessage() {
  message.classList.remove("active");
  messageBg.classList.remove("active");
  document.body.style.overflowY = "visible";
}

// Маска ввода телефона
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(
    document.querySelectorAll(".contact-form__input_phone"),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ __ __",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});

// Не даем юзеру ввести цифры в поле для имени
document.querySelectorAll(".contact-form__input_name").forEach((item) => {
  item.addEventListener("keydown", (event) => {
    if ("1234567890".indexOf(event.key) != -1) {
      event.preventDefault();
      const contactFormAlertInfo = document.querySelector(
        ".contact-form__alert-info"
      );
      contactFormAlertInfo.classList.add("contact-form__alert-info--active");
      setTimeout(() => {
        contactFormAlertInfo.classList.remove(
          "contact-form__alert-info--active"
        );
      }, 5000);
    }
  });
});

// Задаем или убираем класс active для input label в форме
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".contact-form__input").forEach((item) => {
    item.addEventListener("focus", () => {
      item.nextElementSibling.classList.add("active");
    });
    item.addEventListener("blur", () => {
      if (item.value.trim() === "") {
        item.nextElementSibling.classList.remove("active");
      }
    });
  });
});
