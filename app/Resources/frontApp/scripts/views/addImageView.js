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
    e.preventDefault();
    var form,
      data;

    this.triggerMethod('show:loader', this);

    form = this.$el;
    form.attr('enctype', 'multipart/form-data');
    form.find('input[name="create_image[album]"]').val(this.getOption('imageId'));
    data = new FormData(form[0]);

    $.ajax({
      type: 'POST',
      url: routes.postImage(),
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        this.triggerMethod('add:image', data);
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
