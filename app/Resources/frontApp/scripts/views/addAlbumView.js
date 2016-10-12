import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import routes from './../settings/routes';
import template from './../templates/addAlbumTemplate';

export default Marionette.View.extend({
  tagName: 'form',
  className: 'form',
  template: _.template(template),

  initialize: function () {
    this.render();
  },

  events: {
    'click input[type="submit"]': 'onClickEvent'
  },

  onClickEvent: function (e) {
    e.preventDefault();
    var form,
        data;

    form = $(this.el);
    data = form.serialize();

    $.ajax({
      method: 'POST',
      url: routes.postAlbum(),
      data: data,

      success: function(data) {
        this.triggerMethod('add:album', data);
        this.triggerMethod('close:modal', this);
      }.bind(this),

      error: function(data) {
        this.triggerMethod('show:error', data);
      }.bind(this)
    });
  }
});
