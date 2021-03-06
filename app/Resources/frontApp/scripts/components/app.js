import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Router from './../routers/mainRouter';

export default Marionette.Application.extend({
  region: '#app',

  onStart: function () {
    new Router();
    Backbone.history.start();
  }
});
