$("#start-game").click(function () {
  $(".game-container").slideUp("slow");
  generateRandomNumber(29);
  getCardText();
  timerQuestionFunc();
});
