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

  handleInteraction(key) {
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
      const images = scoreboard.getElementsByTagName("img");
      let currentImage = images[this.missed];

      currentImage.src = "images/lostHeart.png";
    } else {
      this.gameOver();
    }
    this.missed++;
  }

  checkForWin() {
    // is checking for the winning move from the players tries and then will display win if you win(false)
    let hiddenLetters = document.getElementsByClassName("hide");
    if (!hiddenLetters.length) {
      this.gameOver(true);
    }
  }
  gameOver(won) {
    // is checking for the losing move from the players tries and then will display loss of you lose(true)
    document.getElementById("overlay").style.display = "flex";
    let gameMessage = document.getElementById("game-over-message");

    if (won) {
      gameMessage.textContent = "YAY YOU WON!";
      document.getElementById("overlay").className = "win";
    } else {
      gameMessage.textContent = "OOPsie Daisies, try again!";
      document.getElementById("overlay").className = "lose";
    }
    //resetting of game board
    let keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      key.disabled = false;
      console.log(typeof key);
      console.log(key);
      key.classList.remove("wrong");
      key.classList.remove("chosen");
    });
    const ul = document.getElementById("phrase");
    ul.innerHTML = "";
    const scoreboard = document.getElementById("scoreboard");
    const images = scoreboard.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      images[i].src = "images/liveHeart.png";
    }
  }
}
