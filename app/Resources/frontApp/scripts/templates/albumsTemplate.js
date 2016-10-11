export default `<ul class="">
                  <% _.each(albums, function(album) { %>
                    <li><%=album %></li>
                  <% }) %>
                </ul>
               `;