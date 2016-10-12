import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/basicLayoutTemplate';
import AlbumsView from './../views/albumCollectionView';
import ImagesView from './../views/imageCollectionView';
import TitleView from './../views/titleView';
import OptionsView from './../views/optionsView';
import ModalView from './../views/modalView';

export default Marionette.View.extend({
  el: '#app',
  template: _.template(template),
  modal: new ModalView(),
  regions: {
    title: '#title',
    content: '#content',
    options: '#options'
  },


  initialize: function () {
    this.render();
  },

  onShowAlbums: function () {
    var titleView = new TitleView({model: {title: 'Albums'}}),
        albumsView = new AlbumsView({collection: this.getOption('albumCollection')}),
        optionsView = new OptionsView({'data-action': 'add-album'});

    this.showChildView('title', titleView);
    this.showChildView('content', albumsView);
    this.showChildView('options', optionsView);
  },

  onShowImages: function (title) {
    var titleView = new TitleView({model: {title: 'Album: ' + title }}),
        imageView = new ImagesView({collection: this.getOption('imageCollection')}),
        optionsView = new OptionsView({'data-action': 'add-image'});

    this.showChildView('title', titleView);
    this.showChildView('content', imageView);
    this.showChildView('options', optionsView);
  },

  onChildviewCloseModal: function() {
    this.modal.openModal();
  },

  onChildviewOpenModal: function(child) {
    console.log(child);

    this.modal.showChildView('container', this.modal.addImageView);
    this.modal.openModal();
  }
});