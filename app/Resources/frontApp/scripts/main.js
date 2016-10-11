/*
* Gallery Main file
*
**/

import GalleryApp from './components/app';
import $ from 'jquery';
import routes from './settings/routes'

document.addEventListener('DOMContentLoaded', () => {
  var app;

  $.ajax({
    method: 'GET',
    url: routes.getAlbums(),
    success: function(data) {
      app = new GalleryApp({
        initialData: JSON.parse(data)
      });

      console.log(JSON.parse(data));

      app.start();
    }
  });


});
