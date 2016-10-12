export default `
                <div class="album" <% if (featuredImage !== null) { %>style="background-image: url('<%= featuredImage %>');"<% } %> >
                  <div class="menu menu--right">
                    <i class="menu__icon icon icon--wheel"></i>
                    <ul class="menu__list">
                      <li class="menu__item">edit</li>
                      <li class="menu__item">delete</li>
                    </ul>
                  </div>
                  <div class="album__info">
                    <h3 class="album__name"><%=name %></h3>
                    <span class="album__count">Images: <%= imageCount %></span>
                  </div>
                </div>
               `;