import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: function() {
    return {
      comments: []
    }
  }
});
