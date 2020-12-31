class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      // this is an array of phrases for the game
      "Wow coding is fun",
      "Coding can be hard",
      "Coding taught me a lot",
      "Drop it like its Hot",
      "Stop in the name of love",
    ];
    this.activePhrase = null;
  }
  startGame() {
    //the game begins by selecting a random phrase and presenting it to the user
    this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();

    document.getElementById("overlay").style.display = "none";
  }

  getRandomPhrase() {
    //will select random phrases from the phrase array
    const randomNum = Math.floor(Math.random() * this.phrases.length);
    let phrase = this.phrases[randomNum];
    this.activePhrase = new Phrase(phrase);
  }

  /**
   *function handleInteraction
    this method controls most of the game logic. It checks to see if the button clicked by
    the player matches a letter in the phrase, and then directs the game based on a correct 
    or incorrect guess.
   * @param {object} key : this is the button element selected by the user
   * 
   */

  handleInteraction(key) {
    console.log(key);
    key.disabled = true;
    let letter = key.innerText;
    let isMatched = this.activePhrase.checkLetter(letter);

    if (isMatched) {
      key.classList.add("chosen");
      this.activePhrase.showMatchedLetter(letter);
      this.checkForWin();
    } else {
      key.classList.add("wrong");
      this.removeLife();
    }
  }
  removeLife() {
    //removes a heart if missed try in the game
    if (this.missed < 4) {
      const scoreboard = document.getElementById("scoreboard");
      const image = scoreboard.getElementsByTagName("img");
      let currentImage = image[this.missed];

      if (currentImage.src.includes("liveHeart.png")) {
        let lostHeart = currentImage.src.replace(
          "liveHeart.png",
          "lostHeart.png"
        );
        currentImage.src = lostHeart;
      }
    } else {
      this.gameOver();
    }
    this.missed++;
  }

  checkForWin() {
    // is checking for the winning move from the players tries and then will display win if you win
    let hiddenLetters = document.getElementsByClassName("hide");
    if (!hiddenLetters.length) {
      this.gameOver(true);
    }
  }
  gameOver(won) {
    // is checking for the losing move from the players tries and then will display loss of you lose
    document.getElementById("overlay").style.display = "block";
    let gameMessage = document.getElementById("game-over-message");

    if (won) {
      gameMessage.textContent = "YAY YOU WON!";
      document.getElementById("overlay").className = "win";
    } else {
      gameMessage.textContent = "OOPsie Daisies, try again!";
      document.getElementById("overlay").className = "lose";
    }
    // Reset the game board

    let firstPhrase = document.getElementById("phrase").firstElementChild;
    firstPhrase.innerHTML = "";

    // Reset buttons on screen
    const button = document.querySelectorAll(".keyrow");

    for (const letters of button) {
      let items = letters.children;
      console.log(items);
      for (const element of items) {
        element.className = "key";
        element.removeAttribute("disabled");
      }
      this.resetGame();
    }
  }
  // Reset lives

  resetGame() {
    // this resets the game board once you hav e won or lost the game
    this.activePhrase = null;
    document.querySelector("#phrase ul").innerHTML = "";
    const keys = document.querySelectorAll("#qwerty button");

    keys.forEach((key) => {
      key.disabled = false;
      key.classList.remove("chosen", "wrong");
      key.classList.add("key");
    });
    document.querySelectorAll(".tries img").forEach((img) => {
      img.src = "images/liveHeart.png";
    });
  }
}
