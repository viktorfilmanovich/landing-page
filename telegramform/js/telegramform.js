document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  let self = e.currentTarget;
  let formData = new FormData(self);
  let name = self.querySelector('[name="name"]').value;
  let tel = self.querySelector('[name="phone"]').value;
  let address = self.querySelector('[name="address"]').value;

  formData.append("name", name);
  formData.append("phone", tel);
  formData.append("address", address);

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("отправлено");
      }
    }
  };
  xhr.open("POST", "/telegramform/php/send-message-to-telegram.php", true);
  xhr.send(formData);
  closingModal();
  self.reset();
  message.classList.add("active");
  setTimeout(() => {
    message.classList.remove("active");
  }, 5000);
});
