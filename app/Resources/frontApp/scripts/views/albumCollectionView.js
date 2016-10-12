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

  onChildviewSelectEntry: function(child) {
    this.triggerMethod('select:entry', child.model);
  },

  onSelectEntry: function (e) {
    Backbone.history.navigate('album/' + e.attributes.id , true);
  }
});

