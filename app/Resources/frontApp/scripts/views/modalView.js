import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import template from './../templates/modalTemplate';
import AddImageView from './../views/addImageView';
import AddAlbumView from './../views/addAlbumView';

export default Marionette.View.extend({
  el: '#modal',
  template: _.template(template),
  addImageView: new AddImageView(),
  addAlbumView: new AddAlbumView(),

  regions: {
    'container': '.modal__content'
  },

  events: {
    'click .modal__close': 'closeModal'
  },

  initialize: function () {
    this.render();

    Backbone.history.on("all", function () {
      this.closeModal();
    }.bind(this));
  },

  openModal: function () {
    $(this.el).addClass('modal--open');
  },

  closeModal: function () {
    $(this.el).removeClass('modal--open');
  }
});
