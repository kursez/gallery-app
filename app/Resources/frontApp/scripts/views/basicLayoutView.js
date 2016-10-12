import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/basicLayoutTemplate';
import AlbumsView from './../views/albumCollectionView';
import ImagesView from './../views/imageCollectionView';
import TitleView from './../views/titleView';

export default Marionette.View.extend({
  el: '#app',
  template: _.template(template),
  regions: {
    title: '#title',
    content: '#content'
  },

  initialize: function () {
    this.render();
  },

  onShowAlbums: function () {
    var title = new TitleView({model: {title: 'Albums'}}),
        albumsView = new AlbumsView({collection: this.getOption('albumCollection')});

    this.showChildView('title', title);
    this.showChildView('content', albumsView);
  },

  onShowImages: function () {
    var title = new TitleView({model: {title: 'Album'}}),
        imageView = new ImagesView({collection: this.getOption('imageCollection')});

    this.showChildView('title', title);
    this.showChildView('content', imageView);
  }
});