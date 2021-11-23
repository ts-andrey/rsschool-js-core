class Game {
  constuctor(type) {
    this.isStarted = false;
    this.isEnded = false;
    this.gameType = type;
    this.progress = [];
    this.data = [];
  }

  playsound(type, volume) {
    let sound;
    if (type === false) sound = new Audio('./assets/sounds/answer_wrong.mp3');
    if (type === true) sound = new Audio('./assets/sounds/answer_right.mp3');
    if (type === 'perfect') sound = new Audio('./assets/sounds/game_perfect.mp3');
    if (type === 'bad') sound = new Audio('./assets/sounds/game_bad.mp3');
    if (type === 'normal') sound = new Audio('./assets/sounds/game_end.mp3');
    if (type === 'start') sound = new Audio('./assets/sounds/game_start.mp3');
    sound.volume = volume;
    sound.play();
  }
}

module.exports.Game = Game;
