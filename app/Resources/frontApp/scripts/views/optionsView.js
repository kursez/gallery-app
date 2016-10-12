import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.View.extend({
  tagName: 'i',
  className: 'options__icon icon icon--plus',
  template: _.template(''),

  attributes: function () {
    return {
      'data-action': this.getOption('data-action')
    };
  },

  events: {
    'click': 'onClickEvent'
  },

  onClickEvent: function () {
    this.triggerMethod('open:modal', this);
  }
});
