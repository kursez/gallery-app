import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import template from './../templates/modalTemplate';
import AddImageView from './../views/addImageView';
import AddAlbumView from './../views/addAlbumView';
import ErrorView from './../views/errorView.js';

export default Marionette.View.extend({
  tagName: 'div',
  className: 'modal__body modal__body--big',
  template: _.template(template),
  addImageView: new AddImageView(),
  addAlbumView: new AddAlbumView(),

  regions: {
    'container': '.modal__content',
    'error': '.modal__error'
  },

  events: {
    'click .modal__close': 'closeModal'
  },

  initialize: function () {
    Backbone.history.on("all", function () {
      this.closeModal();
    }.bind(this));
  },

  openModal: function () {
    $('#modal').addClass('modal--open');
  },

  closeModal: function () {
    $('#modal').removeClass('modal--open');
  },

  onChildviewCloseModal: function () {
    this.closeModal();
  },

  onChildviewAddAlbum: function (data) {
    this.triggerMethod('add:album', data);
  },

  onChildviewAddImage: function (data) {
    this.triggerMethod('add:image', data);
  },

  onChildviewShowError: function (data) {
    var errorView = new ErrorView({error: JSON.parse(data.responseText)});
    this.showChildView('error', errorView);
  }
});
