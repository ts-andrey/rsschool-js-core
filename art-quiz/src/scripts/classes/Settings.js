class Settings {
  constructor() {
    this.isMute = false;
    this.isTimerOn = false;
    this.time = 30;
    this.volume = 100;
  }
}

module.exports.SettingsStore = Settings;
