// (function ($) {
//   $(".contact-form2").submit(function (event) {
//     event.preventDefault();

//     // Сохраняем в переменную form id текущей формы, на которой сработало событие submit
//     let form = $("#" + $(this).attr("id"))[0];

//     // Сохраняем в переменную класс с параграфом для вывода сообщений
//     let message = $(this).find(".contact-form__message2");

//     let fd = new FormData(form);
//     $.ajax({
//       url: "/telegramform/php/send-message-to-telegram2.php",
//       type: "POST",
//       data: fd,
//       processData: false,
//       contentType: false,
//       success: function success(res) {
//         let respond = $.parseJSON(res);
//         if (respond.err) {
//           message.html(respond.err).css("color", "#d42121");
//           setTimeout(() => {
//             message.text("");
//           }, 3000);
//         } else if (respond.okSend) {
//           message.html(respond.okSend).css("color", "#21d4bb");

//           //Сброс заполненных полей ввода
//           jQuery("#form-contact2").trigger("reset");

//           //Время отображения текста благодарности
//           setTimeout(() => {
//             message.text("");
//           }, 5000);
//         } else {
//           alert("Необработанная ошибка. Проверьте консоль и устраните.");
//         }
//       },
//     });
//   });
// })(jQuery);

document.querySelector(".contact-form2").addEventListener("submit", (e) => {
  e.preventDefault();
  let message = document.querySelector(".contact-form__message2");
  let self = e.currentTarget;
  let formData = new FormData(self);
  let tel = self.querySelector('[name="phone2"]').value;
  formData.append("phone2", tel);
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        message.style.color = "#21d4bb";
        message.innerText = "Спасибо! Ожидайте звонка.";
        setTimeout(() => {
          message.innerText = "";
        }, 3000);
      }
    }
  };
  xhr.open("POST", "/telegramform/php/send-message-to-telegram2.php", true);
  xhr.send(formData);
  self.reset();
});
