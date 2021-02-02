class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  // displays the chosen phrase in random order on the game board
  addPhraseToDisplay() {
    const letters = this.phrase.split("");
    const ul = document.getElementById("phrase");

    let html = ``;
    letters.forEach((letter) => {
      if (letter === " ") {
        html += `<li class="space"> </li>`;
      } else {
        html += `<li class="hide letter ${letter}">${letter}</li>`;
      }
    });

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
    if (this.phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  }

  // Shows matched letters that were chosen by the user.
  showMatchedLetter(letter) {
    let matches = document
      .getElementById("phrase")
      .getElementsByClassName(letter);
    //must make collection into an array to use array methods
    //learned from https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
    Array.from(matches).forEach((match) => {
      match.classList.replace("hide", "show");
    });
  }
}
