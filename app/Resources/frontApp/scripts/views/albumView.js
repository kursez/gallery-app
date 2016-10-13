import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/albumTemplate';
import Album from './../models/album';
import MenuView from './../views/menuView';

export default Marionette.View.extend({
  tagName: 'li',
  className: 'col-xs-12 col-sm-6 col-md-4',
  template: _.template(template),
  model: Album,

  regions: {
    'menu': '.album__menu'
  },

  events: {
    'click .album__info': 'onClickEvent'
  },

  onRender: function () {
    var menuView = new MenuView({
      'data-type': 'album',
      'data-type-id': this.model.attributes.id
    });

    this.showChildView('menu', menuView);
  },

  onClickEvent: function () {
    this.trigger('select:album', this);
  },

  onChildviewDeleteAlbum: function (data) {
    this.triggerMethod('delete:album', data);
  },

  onChildviewOpenEditAlbumModal: function (id) {
    this.triggerMethod('open:edit:album:modal', id);
  }
});
