import Alt from '../alt';

class HelloWorldAction {
	// our sample action
	myAction(foo) {
		// dispatch our action to be handled passing in our variable
		this.dispatch(foo);
	}

	// action to get data for foo
	fetchFoo() {
		// dispatch the action
		this.dispatch();

		// array of names to fetch
		let bar = ["world", "moon", "sun", "stars", "galaxy"];

		// simulate a fetch
		let fetch = new Promise((resolve, reject) => {
			// set a short timeout for the sake of example
			setTimeout(() => {
				// get random value
				let baz = Math.floor(Math.random() * bar.length);
				// resolve this Promise with our random value
				resolve(bar[baz]);
			}, 250);

			// set an impossible timeout to reject the promise
			setTimeout(() => {
				// reject the promise with error message
				reject("Request has timed out after 5 seconds!");
			}, 5000);
		});

		// respond to when fetch has completed
		fetch.then((foo) => {
			// call our action to update foo passing in our Promise return
			this.actions.myAction(foo);
		})
		// catch any errors from our Promise call
		.catch((error) => {
			// send out action to our error method passing in our error
			this.actions.fetchFooError(error);
		});
	}

	// our method to handle when fetching foo has failed (go alliteration)
	fetchFooError(error) {
		// send a dispatch out for our error
		this.dispatch(error);
	}
}

// export our created action
export default Alt.createActions(HelloWorldAction);
