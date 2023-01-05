let hoursTimer = document.querySelector(".promo__right-hour");
let minutesTimer = document.querySelector(".promo__right-minute");
let secondsTimer = document.querySelector(".promo__right-second");
let dateEnd = new Date("May 1 2022 00:00:00");

function timer() {
  let dateStart = new Date();
  let remaindTime = dateEnd - dateStart;

  if (
    dateEnd.getDate() === dateStart.getDate() ||
    dateStart.getDate() > dateEnd.getDate()
  ) {
    dateEnd.setDate(dateStart.getDate() + 1);
  }

  let hours = Math.floor(remaindTime / 1000 / 60 / 60) % 24;
  let minutes = Math.floor(remaindTime / 1000 / 60) % 60;
  let seconds = Math.floor(remaindTime / 1000) % 60;

  hoursTimer.textContent = hours;
  minutesTimer.textContent = minutes;
  secondsTimer.textContent = seconds;
}

timer();
setInterval(timer, 1000);
