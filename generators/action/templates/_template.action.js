import alt from '../alt';

class <%= _s.classify(className) %>Action {

	action<%= _s.classify(className) %>(param) {
		this.dispatch(param);
	}

}

export default alt.createActions(<%= _s.classify(className) %>Action);
