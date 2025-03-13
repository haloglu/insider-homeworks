let countdown;
let timeLeft;
let running = false;
let countdownCard = document.getElementById("countdownCard");

function toggleCountdown() {
  let hoursInput = document.getElementById("hoursInput");
  let minutesInput = document.getElementById("minutesInput");
  let secondsInput = document.getElementById("secondsInput");
  let startButton = document.getElementById("startButton");
  let startIcon = startButton.querySelector(".material-icons");

  if (
    !hoursInput.value &&
    !minutesInput.value &&
    !secondsInput.value &&
    !running
  ) {
    alert("Lütfen bir süre girin!");
    return;
  }

  if (!running) {
    let hours = Math.min(parseInt(hoursInput.value) || 0, 99);
    let minutes = Math.min(parseInt(minutesInput.value) || 0, 59);
    let seconds = Math.min(parseInt(secondsInput.value) || 0, 59);

    hoursInput.value = hours < 10 ? "0" + hours : hours;
    minutesInput.value = minutes < 10 ? "0" + minutes : minutes;
    secondsInput.value = seconds < 10 ? "0" + seconds : seconds;

    timeLeft = hours * 3600 + minutes * 60 + seconds;

    running = true;
    updateCountdown();

    countdown = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateCountdown();
      } else {
        clearInterval(countdown);
        running = false;
        startIcon.innerText = "play_arrow";
        alert("Süre doldu!");
        countdownCard.classList.remove("warning");
      }
    }, 1000);

    startIcon.innerText = "play_arrow";
    startButton.classList.add("start");
  } else {
    if (timeLeft === 0) {
      alert("Süre doldu!");
      let hours = parseInt(hoursInput.value) || 0;
      let minutes = parseInt(minutesInput.value) || 0;
      let seconds = parseInt(secondsInput.value) || 0;
      timeLeft = hours * 3600 + minutes * 60 + seconds;
      running = true;
      updateCountdown();

      countdown = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateCountdown();
        } else {
          clearInterval(countdown);
          running = false;
          startIcon.innerText = "play_arrow";
          alert("Süre doldu!");
          countdownCard.classList.remove("warning");
        }
      }, 1000);
    }
  }
}

function clearCountdown() {
  clearInterval(countdown);
  document.querySelector(".countdown").innerText = "00:00:00";
  document.getElementById("hoursInput").value = "";
  document.getElementById("minutesInput").value = "";
  document.getElementById("secondsInput").value = "";
  running = false;
  let startButton = document.getElementById("startButton");
  let startIcon = startButton.querySelector(".material-icons");
  startIcon.innerText = "play_arrow";
  startButton.classList.add("start");
  countdownCard.classList.remove("warning");
}

function updateCountdown() {
  let hours = Math.floor(timeLeft / 3600);
  let minutes = Math.floor((timeLeft % 3600) / 60);
  let seconds = timeLeft % 60;

  document.querySelector(".countdown").innerText = `${
    hours < 10 ? "0" + hours : hours
  }:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
