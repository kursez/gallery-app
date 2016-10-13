import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import routes from './../settings/routes';
import template from './../templates/menuTemplate';

export default Marionette.View.extend({
  tagName: 'div',
  className: 'menu',
  template: _.template(template),

  attributes: function () {
    return {
      'data-type': this.getOption('data-type'),
      'data-type-id': this.getOption('data-type-id')
    };
  },

  initialize: function () {
    this.render();
  },

  events: {
    'click [data-delete]': 'deleteEntry',
    'click [data-edit]': 'editEntry'
  },

  deleteEntry: function (e) {
    e.preventDefault();
    var route,
        dataType = this.$el.attr('data-type'),
        dataTypeId = this.$el.attr('data-type-id');

    if (dataType === 'album') {
      route = routes.deleteAlbum(dataTypeId);

    } else if (dataType === 'image') {
      route = routes.deleteImage(dataTypeId);

    } else {
      throw new Error({'error':'No such data type'});

    }

    $.ajax({
      method: 'DELETE',
      url: route,

      success: function() {
        this.triggerMethod('delete:' + dataType, dataTypeId);
        this.triggerMethod('close:modal', this);
      }.bind(this),

      error: function(data) {
        this.triggerMethod('show:error', data);
      }.bind(this)
    });
  },

  editEntry: function (e) {
    e.preventDefault();

    var route,
        dataType = this.$el.attr('data-type'),
        dataTypeId = this.$el.attr('data-type-id');

    if (dataType === 'album') {
      route = routes.putAlbum(dataTypeId);

    } else if (dataType === 'image') {
      route = routes.putImage(dataTypeId);

    } else {
      throw new Error({'error':'No such data type'});

    }

    $.ajax({
      method: 'PUT',
      url: route,
      data: data,

      success: function(data) {
        this.triggerMethod('edit:' + dataType, data);
        this.triggerMethod('close:modal', this);
      }.bind(this),

      error: function(data) {
        this.triggerMethod('show:error', data);
      }.bind(this)
    });
  }
});
