import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import routes from './../settings/routes';
import template from './../templates/editAlbumTemplate';

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
        url = routes.putAlbum(this.getOption('albumId'));

    form = this.$el;
    data = new FormData(form[0]);
    //data = form.serialize();

    $.ajax({
      type: 'PUT',
      url: url,
      data: data,
      contentType: 'application/x-www-form-urlencoded',
      processData: false,

      success: function(data) {
        this.triggerMethod('edit:album', data);
        this.triggerMethod('close:modal', this);
      }.bind(this),

      error: function(data) {
        this.triggerMethod('show:error', data);
      }.bind(this)
    });
  }
});
