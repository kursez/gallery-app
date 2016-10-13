import Marionette from 'backbone.marionette';
import _ from 'underscore';
import Backbone from 'backbone';
import template from './../templates/paginationTemplate';

export default Marionette.View.extend({
  tagName: 'div',
  className: 'pagination__body',
  template: _.template(template),

  events: {
    'click [data-prev]': 'previousPage',
    'click [data-next]': 'nextPage'
  },

  onRender: function () {
    var pages = this.getOption('pages'),
        page = this.getOption('page');

    page = parseInt(page);
    pages = parseInt(pages);

    if (page === pages) {
      this.$el.find('[data-next]').hide();
    }

    if (page === 1) {
      this.$el.find('[data-prev]').hide();
    }
  },

  previousPage: function () {
    var prevPage = parseInt(this.getOption('page')) - 1;

    Backbone.history.navigate('album/' + this.getOption('albumId') + '/page/' + prevPage, true);
  },

  nextPage: function () {
    var nextPage = parseInt(this.getOption('page')) + 1;

    Backbone.history.navigate('album/' + this.getOption('albumId') + '/page/' + nextPage, true);
  }
});
