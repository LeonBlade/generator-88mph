import React from 'react';
<% if (helloworld) { %>
import HelloWorld from './components/HelloWorld.react';
<% } %>
React.render(<% if (helloworld) { %><HelloWorld /><% } else { %><h2>Hello, world!</h2><% } %>, document.getElementById("app"));
