/*
* Gallery Main file
*
**/

import GalleryApp from './components/app';

document.addEventListener('DOMContentLoaded', () => {
  const app = new GalleryApp();
  app.start();
});
