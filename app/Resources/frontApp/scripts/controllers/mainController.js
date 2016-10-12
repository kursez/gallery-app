import Marionette from 'backbone.marionette';
import $ from 'jquery';
import routes from './../settings/routes';
import AlbumCollection from './../collections/albums';
import ImageCollection from './../collections/images';
import BasicLayoutView from './../views/basicLayoutView';

export default Marionette.Object.extend({
  albumCollection: null,
  imageCollection: null,
  appLayout: new BasicLayoutView(),

  showAlbums: function () {
    if (this.albumCollection === null) {
      $.ajax({
        method: 'GET',
        url: routes.getAlbums(),
        success: function(data) {
          this.albumCollection = new AlbumCollection(JSON.parse(data));
          this.appLayout.options.albumCollection = this.albumCollection;
          this.appLayout.triggerMethod('show:albums');
        }.bind(this)
      });
    } else {
      this.appLayout.triggerMethod('show:albums');
    }
  },

  showAlbum: function (id) {
    $.ajax({
      method: 'GET',
      url: routes.getAlbum(id),
      success: function(data) {
        data = JSON.parse(data);

        this.imageCollection = new ImageCollection(data.images);
        this.appLayout.options.imageCollection = this.imageCollection;
        this.appLayout.triggerMethod('show:images', data.name);
      }.bind(this)
    });
  },

  showAlbumPage: function (id, page) {
    // to do
    console.log('album page view', id, page);
  }
});
