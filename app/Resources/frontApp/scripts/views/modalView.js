import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import template from './../templates/modalTemplate';

import AddImageView from './../views/addImageView';
import AddAlbumView from './../views/addAlbumView';
import EditImageView from './../views/editImageView';
import EditAlbumView from './../views/editAlbumView';
import ErrorView from './../views/errorView.js';

export default Marionette.View.extend({
  tagName: 'div',
  className: 'modal__body modal__body--big',
  template: _.template(template),

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

  showAddAlbumView: function () {
    var addAlbumView = new AddAlbumView();

    this.showChildView('container', addAlbumView);
  },

  showAddImageView: function (id) {
    var addImageView = new AddImageView({imageId: id});

    this.showChildView('container', addImageView);
  },

  showEditAlbumView: function (id) {
    var editAlbumView = new EditAlbumView({albumId: id});

    this.showChildView('container', editAlbumView);
  },

  showEditImageView: function (id) {
    var editImageView = new EditImageView({imageId: id});

    this.showChildView('container', editImageView);
  },

  openModal: function () {
    $('#modal').addClass('modal--open');
  },

  closeModal: function () {
    $('#modal').removeClass('modal--open');
    this.$el.find('.modal__error').hide();
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

  onChildviewEditAlbum: function (data) {
    this.triggerMethod('edit:album', data);
  },

  onChildviewEditImage: function (data) {
    this.triggerMethod('edit:image', data);
  },

  onChildviewShowError: function (data) {
    var errorView = new ErrorView({error: JSON.parse(data.responseText)});
    this.showChildView('error', errorView);
    this.$el.find('.modal__error').show();
  }
});
