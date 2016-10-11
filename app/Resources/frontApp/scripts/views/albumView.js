import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/albumTemplate';

export default Marionette.View.extend({
  tagName: 'section',
  template: _.template(template),
  templateContext: function() {
    return {
      albums: this.getOption('album')
    };
  }
});
