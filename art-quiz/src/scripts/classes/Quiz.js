class Quiz {
  constructor(dataArray, progress) {
    this.data = dataArray;
    if (progress) this.progress = progress;
    else
      this.progress = {
        artCategory: {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
          11: [],
        },
        imgCategory: {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
          11: [],
        },
      };
  }
}

module.exports.Quiz = Quiz;
