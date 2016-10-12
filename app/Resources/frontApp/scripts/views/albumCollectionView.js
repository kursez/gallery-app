import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import AlbumView from './../views/albumView';

export default Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: AlbumView,
  className: 'row',

  regions: {
    'title': '#title',
    'content': '#content'
  },

  onChildviewSelectAlbum: function(album) {
    Backbone.history.navigate('album/' + album.model.attributes.id , true);
  }
});
