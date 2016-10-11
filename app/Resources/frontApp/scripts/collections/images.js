import Backbone from 'backbone';
import Image from './../models/image';

export default Backbone.Collection.extend({
  model: Image
});
