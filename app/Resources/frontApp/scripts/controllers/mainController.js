import Marionette from 'backbone.marionette';
import $ from 'jquery';
import routes from './../settings/routes'
import AlbumsView from './../views/albumCollectionView';
import AlbumCollection from './../collections/albums';
import ImagesView from './../views/imageCollectionView';
import ImageCollection from './../collections/images';

export default Marionette.Object.extend({
  initialize: function () {
    this.bodyView = this.getOption('mainRegion');
    this.data = this.getOption('initialData');
  },

  showAlbums: function() {
    var collection = new AlbumCollection(this.data),
        view = new AlbumsView({collection: collection});

    this.bodyView.showView(view);
  },

  showAlbum: function(id) {
    var collection,
        view;

    $.ajax({
      method: 'GET',
      url: routes.getAlbum(id),
      success: function(data) {
        console.log(JSON.parse(data).images);
        collection = new ImageCollection(JSON.parse(data).images);
        view = new ImagesView({collection: collection});
        this.bodyView.showView(view);
      }.bind(this)
    });
  },

  showAlbumPage: function(id, page) {
    // to do
    console.log('album page view', id, page);
  },

  onSelectEntry: function (e) {
    console.log(e);
  }
});
