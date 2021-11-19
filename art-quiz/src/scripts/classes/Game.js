class Game {
  constuctor() {
    this.isStarted = false;
    this.isEnded = false;
    this.progress = [];
    this.data = [];
  }

  playsound(type) {
    let sound;
    if (type === 'answer-wrong') sound = new Audio('./assets/sounds/answer_wrong.mp3');
    if (type === 'answer-right') sound = new Audio('./assets/sounds/answer_right.mp3');
    if (type === 'end-perfect') sound = new Audio('./assets/sounds/game_perfect.mp3');
    if (type === 'end-bad') sound = new Audio('./assets/sounds/game_bad.mp3');
    if (type === 'end-normal') sound = new Audio('./assets/sounds/game_end.mp3');
    if (type === 'start') sound = new Audio('./assets/sounds/game_start.mp3');
    sound.play();
  }
}

module.exports.Game = Game;
