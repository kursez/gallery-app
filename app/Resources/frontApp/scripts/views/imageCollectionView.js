import Marionette from 'backbone.marionette';
import Image from './../views/imageView';

export default Marionette.CollectionView.extend({
  tagName: 'ul',
  childView: Image,
  className: 'row',

  onChildviewSelectEntry: function (child) {
    this.triggerMethod('select:entry', child.model);
  },

  initialize: function () {
    window.onpopstate = function (e) {
      e.preventDefault();
      this.$el.removeClass('animate-image');
    }.bind(this);
  },

  onRender: function () {
    setTimeout(function () {
      this.$el.addClass('animate-image');
    }.bind(this), 0);
  }
});

