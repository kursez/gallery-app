export default {
  getAlbums: function() {
    return 'albums';
  },

  getAlbum: function(id) {
    return 'album/' + id;
  },

  postAlbum: function() {
    return 'album';
  },

  putAlbum: function(id) {
    return 'album' + id;
  },

  deleteAlbum: function(id) {
    return 'album' + id;
  }
};
