import Marionette from 'backbone.marionette';
import _ from 'underscore';
import template from './../templates/imageTemplate';
import Image from './../models/image';

export default Marionette.View.extend({
  tagName: 'li',
  className: 'col-xs-12 col-sm-6 col-md-4',
  template: _.template(template),
  model: Image,
  triggers: {
    click: 'select:entry'
  }
});
