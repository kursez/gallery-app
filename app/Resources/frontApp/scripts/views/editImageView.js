import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import routes from './../settings/routes';
import template from './../templates/editImageTemplate';

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
      data,
      url = routes.putImage(this.getOption('imageId'));

    this.triggerMethod('show:loader', this);

    form = this.$el;
    data = form.serialize();

    $.ajax({
      type: 'PUT',
      url: url,
      data: data,
      cache: false,
      processData: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (data) {
        this.triggerMethod('edit:image', data);
        this.triggerMethod('close:modal', this);
        this.triggerMethod('hide:loader', this);
      }.bind(this),

      error: function (data) {
        this.triggerMethod('show:error', data);
        this.triggerMethod('hide:loader', this);
      }.bind(this)
    });
  }
});
