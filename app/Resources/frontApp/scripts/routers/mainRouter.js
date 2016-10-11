import Marionette from 'backbone.marionette';
import Controller from './../controllers/mainController';

export default Marionette.AppRouter.extend({
  appRoutes: {
    '': 'showAlbums',
    'album/:id': 'showAlbum',
    'album/:id/page/:page': 'showAlbumPage'
  },
  initialize: function() {
    this.controller = new Controller({
      initialData: this.getOption('initialData'),
      mainRegion: this.getOption('mainRegion')
    });
  }
});
