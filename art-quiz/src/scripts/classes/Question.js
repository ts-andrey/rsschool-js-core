class Question {
  constructor(mode, categoryNum, qNum) {
    this.category = categoryNum;
    this.answer = categoryNum + qNum;
    this.mode = mode;
  }

  getQuestion() {}
}

module.exports.Question = Question;
