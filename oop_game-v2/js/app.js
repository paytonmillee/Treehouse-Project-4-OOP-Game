let game;
//this is the button to start the game
document.getElementById("btn__reset").addEventListener("click", (e) => {
  game = new Game();
  game.startGame();
});
let keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("click", (e) => {
    game.handleInteraction(key);
  });
});
