import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/basicLayoutTemplate';
import AlbumsView from './../views/albumCollectionView';
import ImagesView from './../views/imageCollectionView';
import TitleView from './../views/titleView';
import OptionsView from './../views/optionsView';
import ModalView from './../views/modalView';
import AlbumModal from './../models/album.js';

export default Marionette.View.extend({
  el: '#app',
  template: _.template(template),
  modal: new ModalView(),
  regions: {
    title: '#title',
    content: '#content',
    options: '#options',
    modal: '#modal'
  },

  initialize: function () {
    this.render();

    this.showChildView('modal', this.modal);
  },

  onShowAlbums: function () {
    var titleView = new TitleView({model: {title: 'Albums'}}),
        albumsView = new AlbumsView({collection: this.getOption('albumCollection')}),
        optionsView = new OptionsView({'data-options-action': ''});

    this.showChildView('title', titleView);
    this.showChildView('content', albumsView);
    this.showChildView('options', optionsView);
  },

  onShowImages: function (data) {
    var titleView = new TitleView({model: {title: 'Album: ' + data.name }}),
        imageView = new ImagesView({collection: this.getOption('imageCollection')}),
        optionsView = new OptionsView({'data-options-action': data.id});

    this.showChildView('title', titleView);
    this.showChildView('content', imageView);
    this.showChildView('options', optionsView);
  },

  onChildviewCloseModal: function() {
    this.modal.openModal();
  },

  onChildviewAddAlbum: function (data) {
    var albumModel = new AlbumModal(JSON.parse(data)),
        albumsView;

    this.getOption('albumCollection').add(albumModel);
    albumsView = new AlbumsView({collection: this.getOption('albumCollection')});
    this.showChildView('content', albumsView);
  },

  onChildviewRemoveAlbum: function (id) {
    var albumsView;

    this.getOption('albumCollection');
    albumsView = new AlbumsView({collection: this.getOption('albumCollection')});
    this.showChildView('content', albumsView);
  },

  onChildviewEditAlbum: function (id, name) {
    var albumsView;

    this.getOption('albumCollection');
    albumsView = new AlbumsView({collection: this.getOption('albumCollection')});
    this.showChildView('content', albumsView);
  },

  onChildviewAddImage: function (data) {
    // to do
  },

  onChildviewOpenModal: function(child) {
    var attr = child.$el.attr('data-options-action');

    if (typeof attr !== 'undefined') {
      if (attr === '') {
        this.modal.showChildView('container', this.modal.addAlbumView);
        this.modal.openModal();

      } else {
        this.modal.showChildView('container', this.modal.addImageView);
        this.modal.openModal();

      }
    }
  }
});
