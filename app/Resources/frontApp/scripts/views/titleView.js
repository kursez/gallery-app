import Marionette from 'backbone.marionette';
import _ from 'underscore';

export default Marionette.View.extend({
  tagName: 'h2',
  className: 'type type--title-md type--300 type--gray space--outer-bottom-xs',

  initialize: function () {
    this.template = _.template(this.getOption('model').title);
  }
});
