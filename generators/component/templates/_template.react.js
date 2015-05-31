import React from 'react';
<% if (store || action) { %>
<% if (store) { %>import <%= _s.classify(className) %>Store from '../stores/<%= _s.classify(className) %>.store';<% } %><%= (action && store) ? "\n" : "" %><% if (action) { %>import <%= _s.classify(className) %>Action from '../actions/<%= _s.classify(className) %>.action';<% } %>
<% } %>
class <%= _s.classify(className) %> extends React.Component {
<% if (store || action) { %><% if (store) { %>
	constructor(props) {
		super(props);
		this.state = <%= _s.classify(className) %>Store.getState();
	}
<% } %>
	componentDidMount() {<% if (store) { %>
		<%= _s.classify(className) %>Store.listen(this.onChange.bind(this));<% } if (action) { %>
		<%= _s.classify(className) %>Action.action<%= _s.classify(className) %>();<% } %>
	}
<% if (store) { %>
	componentWillUnmount() {
		<%= _s.classify(className) %>Store.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
<% } %><% } %>
	render() {
		return <div><% if (store) { %>{ this.state.param }<% } else { %><%= _s.titleize(_s.humanize(className)) %><% } %></div>
	}
	
}

export default <%= _s.classify(className) %>;
