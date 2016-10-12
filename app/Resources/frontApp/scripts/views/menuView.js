import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/menuTemplate';

export default Marionette.View.extend({
  tagName: 'div',
  className: 'menu',
  template: _.template(template),

  attributes: function () {
    return {
      'data-type': this.getOption('data-type'),
      'data-type-id': this.getOption('data-type-id')
    };
  },

  initialize: function () {
    this.render();
  },

  events: {
    'click [data-delete]': 'deleteEntry',
    'click [data-edit]': 'editEntry'
  },

  deleteEnty: function () {
    //this.triggerMethod('open:modal', this);
  },

  editEntry: function () {
    //this.triggerMethod('open:modal', this);
  }
});
