import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.View.extend({
  tagName: 'p',
  className: 'type type--text-md type--red type--300 space--outer-top-xs',

  initialize: function () {
    this.template = _.template(this.getOption('error'));
  }
});
