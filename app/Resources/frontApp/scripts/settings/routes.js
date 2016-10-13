export default {
  getAlbums: function() {
    return 'albums';
  },

  getAlbum: function(id) {
    return 'album/' + id;
  },

  getAlbumWithPagination: function(id, page) {
    return 'album/' + id + '?page=' + page;
  },

  postAlbum: function() {
    return 'album';
  },

  putAlbum: function(id) {
    return 'album/' + id;
  },

  deleteAlbum: function(id) {
    return 'album/' + id;
  },

  getImage: function(id) {
    return 'image/' + id;
  },

  postImage: function() {
    return 'image';
  },

  putImage: function(id) {
    return 'image/' + id;
  },

  deleteImage: function(id) {
    return 'image/' + id;
  }
};
