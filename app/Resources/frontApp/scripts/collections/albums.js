import Backbone from 'backbone';
import Album from './../models/album';

export default Backbone.Collection.extend({
  model: Album
});
