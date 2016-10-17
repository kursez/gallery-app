import Marionette from 'backbone.marionette';
import Image from './../views/imageView';

export default Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: Image,
  className: 'row',

  onChildviewSelectEntry: function(child) {
    this.triggerMethod('select:entry', child.model);
  },

  onRender: function () {
    setTimeout(function () {
      this.$el.addClass('animate-image-300');
    }.bind(this), 300);
  }
});

