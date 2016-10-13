import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/paginationTemplate';

export default Marionette.View.extend({
  tagName: 'div',
  className: 'pagination__body',
  template: _.template(template),

  initialize: function () {
    this.render();
  },

  events: {
    'click [data-prev]': 'previousPage',
    'click [data-next]': 'nextPage'
  },

  previousPage: function (e) {

  },

  nextPage: function (e) {

  }
});
