export default `
<h2 class="type type--title-md type--gray">Add Image</h2>
<form class="form" enctype="multipart/form-data">
  <div class="form-field">
    <input name="create_image[name]" type="text" placeholder="Image name">
  </div>
  <div class="form-field hidden">
    <input name="create_image[album]" type="text">
  </div>
  <div class="form-field">
    <input name="create_image[src]" type="file">
  </div>
  <div class="form-field">
    <input name="submit" type="submit" value="submit">
  </div>
</form>
`;