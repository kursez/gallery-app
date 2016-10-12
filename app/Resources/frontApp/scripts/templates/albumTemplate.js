export default `
<div class="album" <% if (featuredImage !== null) { %>style="background-image: url('<%= featuredImage %>');"<% } %> >
  <div class="album__menu"></div>
  <div class="album__info">
    <h3 class="album__name"><%=name %></h3>
    <span class="album__count">Images: <%= imageCount %></span>
  </div>
</div>
`;