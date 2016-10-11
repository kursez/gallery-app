import {Marionette} from './../vendor/vendor';
import {_} from './../vendor/vendor';
import template from './../templates/albumsTemplate';

export default Marionette.View.extend({
  tagName: 'section',
  template: _.template(template),
  templateContext: function() {
    return {
      albums: this.getOption('albums')
    };
  }
});
