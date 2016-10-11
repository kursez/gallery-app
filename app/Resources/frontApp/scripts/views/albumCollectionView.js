import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Album from './../views/albumView';

export default Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: Album,
  className: 'row',
  onChildviewSelectEntry: function(child) {
    this.triggerMethod('select:entry', child.model);
  },

  onSelectEntry: function (e) {
    Backbone.history.navigate('album/' + e.attributes.id , true);
  }
});

