import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import template from './../templates/modalTemplate';
import AddImageView from './../views/addImageView';

export default Marionette.View.extend({
  el: '#modal',
  template: _.template(template),
  addImageView: new AddImageView(),

  regions: {
    'container': '.modal-container'
  },

  events: {
    'click': 'onClickEvent'
  },

  initialize: function () {
    this.render();

    Backbone.history.on("all", function () {
      this.closeModal();
    }.bind(this));
  },

  onClickEvent: function () {
    console.log('clicked');
  },

  openModal: function () {
    $(this.el).addClass('modal--open');
  },

  closeModal: function () {
    $(this.el).removeClass('modal--open');
  }
});
