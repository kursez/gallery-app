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

    var form,
        data;

    e.preventDefault();

    form = $(this.el);
    data = form.serialize();

    $.ajax({
      method: 'POST',
      url: routes.postAlbum(),
      data: data,
      success: function(data) {
        this.triggerMethod('close:modal', this);

        console.log(data);
      }.bind(this),
      error: function(data) {
        console.log(data);
      }
    });
  }
});
