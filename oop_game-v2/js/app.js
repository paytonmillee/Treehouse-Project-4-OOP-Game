let game;
//this is the button to start the game
document.getElementById("btn__reset").addEventListener("click", () => {
  game = new Game();
  game.startGame();
});
let keyboard = document.querySelectorAll(".key");

keyboard.forEach((key) => {
  key.addEventListener("click", () => {
    game.handleInteraction(key);
  });
});
