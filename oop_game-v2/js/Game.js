class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      // this is an array of phrases for the game to go through each time game is
      //lost or won.
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
    //removes the start game overlay when button is selected to play
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
  
   * 
   */

  handleInteraction(keyEvent) {
    keyEvent.disabled = true;
    let letter = keyEvent.innerText;
    let letterFound = this.activePhrase.checkLetter(letter);

    if (letterFound) {
      keyEvent.classList.add("chosen");
      this.activePhrase.showMatchedLetter(letter);
      this.checkForWin();
    } else {
      keyEvent.classList.add("wrong");
      this.removeLife();
    }
  }
  removeLife() {
    //removes a heart if missed try in the game
    if (this.missed < 4) {
      const scoreBoardLives = document.getElementById("scoreboard");
      const images = scoreBoardLives.getElementsByTagName("img");
      let currentLife = images[this.missed];

      currentLife.src = "images/lostHeart.png";
    } else {
      this.gameOver();
    }
    this.missed++;
  }

  checkForWin() {
    // is checking for the winning move from the players tries and then will display win if you win(false)
    let remainingLetters = document.getElementsByClassName("hide");
    if (!remainingLetters.length) {
      this.gameOver(true);
    }
  }
  gameOver(didUserWin) {
    // is checking for the losing move from the players tries and then will display loss of you lose(true)
    document.getElementById("overlay").style.display = "flex";
    let gameMessage = document.getElementById("game-over-message");

    if (didUserWin) {
      gameMessage.textContent = "YAY YOU WON! Would you like to try again?";
      document.getElementById("overlay").className = "win";
    } else {
      gameMessage.textContent = "OOPsie Daisies, try again!";
      document.getElementById("overlay").className = "lose";
    }
    //resetting of game board
    let keyboard = document.querySelectorAll(".key");
    keyboard.forEach((key) => {
      key.disabled = false;

      key.classList.remove("wrong");
      key.classList.remove("chosen");
    });
    const ul = document.getElementById("phrase");
    ul.innerHTML = "";
    const scoreBoardLives = document.getElementById("scoreboard");
    const images = scoreBoardLives.getElementsByTagName("img");
    //must make collection into an array to use array methods
    //learned from https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
    Array.from(images).forEach((image) => {
      image.src = "images/liveHeart.png";
    });
  }
}
