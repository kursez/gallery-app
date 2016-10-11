/*
* Gallery Main file
*
**/

import GalleryApp from './components/app';

var data = [1, 2];

document.addEventListener('DOMContentLoaded', () => {
  var app = new GalleryApp({
    initialData: data}
  );

  app.start();
});
