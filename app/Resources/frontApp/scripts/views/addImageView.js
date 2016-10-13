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

    form = $(this.el);
    form.find('input[name="album"]').val(1);
    data = form.serialize();

    console.log(form.find('[name^="file"]'));

    data = new FormData(form.find('[name^="file"]'));

    console.log(form.find('input[name^="file"]').get(0).files);
    $.each(form.find('input[name^="file"]').get(0).files, function(i, file) {
      console.log(i, file);
      data.append(i, file);
    });

    console.log(data);

    $.ajax({
      method: 'POST',
      url: routes.postImage(),
      data: data,
      contentType: 'multipart/form-data',
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
