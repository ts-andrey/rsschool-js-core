class Config {
  constructor(obj) {
    this.isMute = obj.isMute;
    this.isTimerOn = obj.isTimerOn;
    this.time = obj.time;
    this.volume = obj.volume;
  }
}

module.exports.Config = Config;
