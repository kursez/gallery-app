import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import AlbumView from './../views/albumView';
import DelayLoopCallback from './../services/delayLoopCallback';

export default Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: AlbumView,
  className: 'row',

  regions: {
    'title': '#title',
    'content': '#content'
  },

  onChildviewSelectAlbum: function (album) {
    var delayLoopCallback = new DelayLoopCallback();
    this.$el.addClass('animate-shrink-300');

    delayLoopCallback
      .setLoopCount(1)
      .setLoopPeriod(300)
      .setEndCallback(function () {
        Backbone.history.navigate('album/' + album.model.attributes.id + '/page/1', true);
      }.bind(this))
      .execute();
  },

  onChildviewDeleteAlbum: function (data) {
    this.triggerMethod('delete:album', data);
  },

  onChildviewEditAlbum: function (data) {
    this.triggerMethod('edit:album', data);
  },

  onChildviewOpenEditAlbumModal: function (id) {
    this.triggerMethod('open:edit:album:modal', id);
  }
});
