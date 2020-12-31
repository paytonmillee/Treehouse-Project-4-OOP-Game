class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  // displays the chosen phrase in random order on the game board
  addPhraseToDisplay() {
    const letters = this.phrase.split("");
    const ul = document.querySelector("#phrase ul");

    for (let i = 0; i < letters.length; i++) {
      let li = document.createElement("li");
      if (letters[i] === " ") {
        li.setAttribute("class", `space ${letters[i]}`);
      } else {
        li.setAttribute("class", `hide letter ${letters[i]}`);
      }
      ul.appendChild(li);
    }
    return letters;
  }
  /**
   *checkLetter function
   * @param{string} letter-this is the letter that is inside the button
   * @returns{boolean} is there a match inside of the phrase
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  // displays the correct letter on the screen once confirmed a match
  showMatchedLetter(letter) {
    let ul = document.getElementById("phrase").firstElementChild;

    for (let i = 0; i < this.phrase.length; i++) {
      let phraseMatch = ul.getElementsByClassName(letter)[i];

      if (phraseMatch) {
        phraseMatch.classList = `show letter ${letter}`;
        phraseMatch.textContent = letter;
      }
    }
  }
}
