import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/albumTemplate';
import Album from './../models/album';

export default Marionette.View.extend({
  tagName: 'li',
  className: 'col-xs-12 col-sm-6 col-md-4',
  template: _.template(template),
  model: Album,
  events: {
    'click .album__info': 'onClickEvent'
  },

  onClickEvent: function () {
    this.trigger('select:album', this);
  }
});
