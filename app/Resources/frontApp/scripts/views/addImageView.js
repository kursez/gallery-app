import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import routes from './../settings/routes';
import template from './../templates/addImageTemplate';

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
    form.find('input[name="album"]').val(1);
    data = form.serialize();

    $.ajax({
      method: 'POST',
      cache: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: routes.postImage(),
      data: data,
      success: function(data) {
        console.log(this);
      }.bind(this),
      error: function(data) {
        console.log(data);
      }
    });
  }
});
