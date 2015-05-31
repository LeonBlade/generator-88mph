import Alt from '../alt';

import HelloWorldAction from '../actions/HelloWorld.action';

class HelloWorldStore {
	// constructor for HelloWorldStore
	constructor() {
		// initialize variables
		this.foo = null;
		this.error = null;

		// bind listeners on this Store
		this.bindListeners({
			handleMyAction: HelloWorldAction.MY_ACTION,
			handleFetchFoo: HelloWorldAction.FETCH_FOO,
			handleFetchFooError: HelloWorldAction.FETCH_FOO_ERROR
		});
	}

	// handling myAction from HelloWorldAction
	handleMyAction(foo) {
		// store foo on the store
		this.foo = foo;
	}

	// this is dispatched at the start of the action
	handleFetchFoo() {
		// reset foo while loading
		this.foo = null;
	}

	// responding to fetch foo error
	handleFetchFooError(error) {
		// store the error message in the store
		this.error = error;
	}
}

// export our created store from alt
export default Alt.createStore(HelloWorldStore, 'HelloWorldStore');
