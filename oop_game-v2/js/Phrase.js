class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  // displays the chosen phrase in random order on the game board
  addPhraseToDisplay() {
    console.log(this.phrase);
    const letters = this.phrase.split("");
    const ul = document.getElementById("phrase");

    let html = ``;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === " ") {
        html += `<li class="space"> </li>`;
      } else {
        html += `<li class="hide letter ${letters[i]}">${letters[i]}</li>`;
      }
    }

    ul.insertAdjacentHTML("beforeend", html);
  }
  /**
   * checkLetter function
   * @param{string} letter-this is the letter that is inside of the button
   * @returns{boolean}- is there a match inside of the phrase provided
   */

  /**
   * @param{string} letter-this is the letter that inside of the button
   *
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  // Shows matched letters that were chosen by the user.
  showMatchedLetter(letter) {
    console.log(letter);
    let match = document
      .getElementById("phrase")
      .getElementsByClassName(letter);
    console.log(match);
    for (let i = 0; i < match.length; i++) {
      match[i].classList.replace("hide", "show");
    }
  }
}
