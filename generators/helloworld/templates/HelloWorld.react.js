import React from 'react';

import HelloWorldStore from '../stores/HelloWorld.store';
import HelloWorldAction from '../actions/HelloWorld.action';

class HelloWorld extends React.Component {
	// when our component is being constructed
	constructor(props) {
		// call super on this component
		super(props);
		
		// set our state to the HelloWorldStore state
		this.state = HelloWorldStore.getState();
	}

	// called when the component finishes mounting
	componentDidMount() {
		// listening for state change on HelloWorldStore
		HelloWorldStore.listen(this.onChange.bind(this));

		// send action to fetch foo
		HelloWorldAction.fetchFoo();
	}

	// called when the component is going to be removed
	componentWillUnmount() {
		// cleanup the listener before we unmount the component
		HelloWorldStore.unlisten(this.onChange);
	}

	// listening for state change from HelloWorldStore
	onChange(state) {
		// update our state to match the Store state
		this.setState(state);
	}

	// render HelloWorld component
	render() {
		// if we have an error
		if (this.state.error) {
			// render an error message
			return (
				<div>
					<h3>Error</h3>
					<p>{ this.state.error }</p>
				</div>
			);
		}

		// if foo is falsy
		if (!this.state.foo) {
			// render a loading header because why not
			return (
				<div>
					<i className="fa fa-spinner fa-2x fa-spin"></i>
				</div>
			);
		}

		// finally render the actual view normally
		return (
			<div>
				<h2>Hello, { this.state.foo }!</h2>
				<button className="ghost" onClick={HelloWorldAction.fetchFoo}>Greet</button>
			</div>
		);
	}
}

export default HelloWorld;
