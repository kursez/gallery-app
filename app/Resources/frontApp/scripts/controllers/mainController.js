import Marionette from 'backbone.marionette';
import AlbumsView from './../views/albumsView';

export default Marionette.Object.extend({
  showAlbums: function() {
    console.log('albums view');
  },
  showAlbum: function(id) {
    console.log('album view', id);
  },
  showAlbumPage: function(id, page) {
    console.log('album page view', id, page);
  }
});
