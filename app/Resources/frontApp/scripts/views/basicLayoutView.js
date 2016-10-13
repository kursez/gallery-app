import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/basicLayoutTemplate';

import AlbumsView from './../views/albumCollectionView';
import ImagesView from './../views/imageCollectionView';
import TitleView from './../views/titleView';
import OptionsView from './../views/optionsView';
import ModalView from './../views/modalView';
import PaginationView from './../views/paginationView';

import AlbumModel from './../models/album';
import ImageModel from './../models/image';

export default Marionette.View.extend({
  el: '#app',
  template: _.template(template),
  modal: new ModalView(),
  pagination: new PaginationView(),
  regions: {
    title: '#title',
    content: '#content',
    options: '#options',
    modal: '#modal',
    pagination: '#pagination'
  },

  initialize: function () {
    this.render();

    this.showChildView('modal', this.modal);
    this.showChildView('pagination', this.pagination);
  },

  onShowAlbums: function () {
    var titleView = new TitleView({model: {title: 'Albums'}}),
        optionsView = new OptionsView({'data-options-action': ''});

    this.albumsView = new AlbumsView({collection: this.getOption('albumCollection')});
    this.showChildView('title', titleView);
    this.showChildView('content', this.albumsView);
    this.showChildView('options', optionsView);

    this.pagination.$el.hide();
  },

  onShowAlbum: function (album, pagination) {
    var titleView = new TitleView({model: {title: 'Album: ' + album.name }}),
        optionsView = new OptionsView({'data-options-action': album.id});

    this.imagesView = new ImagesView({collection: this.getOption('imageCollection')});
    this.showChildView('title', titleView);
    this.showChildView('content', this.imagesView);
    this.showChildView('options', optionsView);

    if (pagination) {
      this.pagination.$el.show();
      this.pagination.options.pages = pagination.pages;
      this.pagination.options.page = pagination.page;
      this.pagination.options.albumId = album.id;
      this.pagination.render();
    } else {
      this.pagination.$el.hide();
    }
  },

  onChildviewCloseModal: function() {
    this.modal.openModal();
  },

  onChildviewAddAlbum: function (data) {
    var albumModel = new AlbumModel(JSON.parse(data));

    this.getOption('albumCollection').add(albumModel);
    this.albumsView.render();
  },

  onChildviewDeleteAlbum: function (id) {
    var deletedAlbum;

    id = parseInt(id);

    deletedAlbum = this.getOption('albumCollection').find(function (model) {
      return model.attributes.id === id;
    });

    this.getOption('albumCollection').remove(deletedAlbum);
    this.albumsView.render();
  },

  onChildviewEditAlbum: function (data) {
    var child,
        id;

    data = JSON.parse(data);
    id = parseInt(data.id);

    console.log('ID:' + id);

    child = this.getOption('albumCollection').find(function (model) {
      return model.attributes.id === id;
    });

    console.log(child);
    this.albumsView.render();
  },

  onChildviewAddImage: function (data) {
    var imageModel = new ImageModel(JSON.parse(data));

    this.getOption('imageCollection').add(imageModel);
    this.imagesView.render();
  },

  onChildviewEditImage: function () {
    this.albumsView.render();
  },

  onChildviewDeleteImage: function (id) {
    var removedImage;

    id = parseInt(id);

    removedImage = this.getOption('imageCollection').find(function (model) {
      return model.attributes.id === id;
    });

    this.getOption('imageCollection').remove(removedImage);
    this.imagesView.render();
  },

  onChildviewOpenEditAlbumModal: function (id) {
    this.modal.editAlbumView.options.albumId = id;
    this.modal.showChildView('container', this.modal.editAlbumView);
    this.modal.openModal();
  },

  onChildviewOpenEditImageModal: function (id) {
    this.modal.editImageView.options.imageId = id;
    this.modal.showChildView('container', this.modal.editImageView);
    this.modal.openModal();
  },

  onChildviewOpenModal: function(child) {
    var attr = child.$el.attr('data-options-action');

    if (typeof attr !== 'undefined') {
      if (attr === '') {
        this.modal.showChildView('container', this.modal.addAlbumView);
        this.modal.openModal();

      } else {
        this.modal.addImageView.options.albumId = attr;
        this.modal.showChildView('container', this.modal.addImageView);
        this.modal.openModal();

      }
    }
  }
});
