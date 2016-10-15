import Marionette from 'backbone.marionette';

export default Marionette.Object.extend({
  loopCount: 1,
  loopPeriod: 1000,
  periodFeedback: 1,
  warnings: {
    'endCallBack': 'You need to set the endCalBack function with the "setEndCallback" Method in order for the delayLoopCallback to complete it\'s purpose);'
  },


  loopCallback: function () {},

  endCallback: function () {},

  setLoopCount: function (loopCount) {
    this.loopCount = loopCount;

    return this;
  },

  setLoopPeriod: function (loopPeriod) {
    this.loopPeriod = loopPeriod;

    return this;
  },

  setPeriodFeedback: function (periodFeedback) {
    this.periodFeedback = periodFeedback;

    return this;
  },

  setLoopCallback: function (loopCallback) {
    this.loopCallback = loopCallback;

    return this;
  },

  setEndCallback: function (endCallBack) {
    this.endCallback = endCallBack;

    return this;
  },

  execute: function () {
    let loopCount = this.loopCount;

    function executeDelay() {
      loopCount = loopCount - 1;


      if (loopCount > 0) {
        setTimeout(function () {
          this.loopCallback();
          executeDelay.apply(this);
        }.bind(this), this.loopPeriod * this.periodFeedback);
      } else {
        setTimeout(function () {
          this.endCallback();
          this.loopCallback();
        }.bind(this), this.loopPeriod * this.periodFeedback);
      }
    }

    executeDelay.apply(this);
  }

});
