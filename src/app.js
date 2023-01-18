const cardHeader = document.querySelector(".card");
const timeSecond = document.getElementById("time-second");
const nextBtn = document.getElementById("next");
const numberArray = [];

let timerEndSecond = new Audio(
  "https://cdn.freesound.org/previews/202/202193_1037630-lq.mp3"
);
let zeroTime = new Audio(
  "https://cdn.freesound.org/previews/321/321585_5494558-lq.mp3"
);
let counter = 30;
let questionInterval;

function timerQuestionFunc() {
  clearInterval(questionInterval);
  questionInterval = setInterval(() => {
    counter--;
    timeSecond.innerHTML = counter;
    if (counter === 0) {
      clearInterval(questionInterval);
      zeroTime.play();
      zeroTime.volume = 1;
    }
    if (counter < 11) {
      timeSecond.style.color = "red";
      timerEndSecond.play();
    }
  }, 1000);
}

nextBtn.addEventListener(
  "click",
  function (e) {
    generateRandomNumber(23);
    getCardText();
    nextTimer();

    e.preventDefault();
  },
  false
);

function generateRandomNumber(maxNum) {
  let random = Math.floor(Math.random() * maxNum);
  random = Number(random);

  if (!numberArray.includes(random)) {
    numberArray.push(random);
    return random;
  } else {
    if (numberArray.length < maxNum) {
      return generateRandomNumber(maxNum);
    } else {
      console.log("Başka numara yok.");
      return false;
    }
  }
}

function nextTimer() {
  counter = 30;
  timeSecond.innerHTML = counter;
  timeSecond.style.color = "white";
  timerQuestionFunc();
}

function getCardText() {
  fetch("https://github.com/canliae/kuantum-vadisi/blob/main/json/question.json")
    .then((data) => data.json())
    .then((newData) => {
      cardHeader.innerHTML = `<h2>${
        newData[numberArray[numberArray.length - 1]].soru
      }</h2>`;
    })
    .catch((err) => console.error(err));
}
