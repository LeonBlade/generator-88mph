import alt from '../alt';
<% if (action) { %>
import <%= _s.classify(className) %>Action from '../actions/<%= _s.classify(className) %>.action';
<% } %>
class <%= _s.classify(className) %>Store {

	constructor() {
		this.param = null;

		this.bindListeners({<% if (action) { %>
			handleAction<%= _s.classify(className) %>: <%= _s.classify(className) %>Action.ACTION_<%= _s.underscored(className).toUpperCase() %>
		<% } %>});
	}
<% if (action) { %>
	handleAction<%= _s.classify(className) %>(param) {
		this.param = param;
	}
<% } %>
}

export default alt.createStore(<%= _s.classify(className) %>Store, '<%= _s.classify(className) %>Store');
