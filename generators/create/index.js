"use strict";

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.external = this.options.external || {};
		this.args = this.args || this.options.args || [];
	},

	prompting: {
		getClassList: function () {
			var done = this.async();
			
			if (this.args.length) {
				this.classList = this.args;
				return done();
			}

			var prompts = [{
				name: "className",
				type: "string",
				message: "Tell me your class name(s)...",
				default: "MyClass"
			}];

			this.prompt(prompts, function (props) {
				this.classList = props.className.split(" ");
				done();
			}.bind(this));
		},

		getChoices: function () {
			var done = this.async();

			var prompts = [{
				name: "choices",
				type: "checkbox",
				message: "Which classes do you want to create?",
				choices: [
					{
						name: "Component",
						value: "component",
						checked: true
					},
					{ 
						name: "Store",
						value: "store",
						checked: true
					},
					{
						name: "Action",
						value: "action",
						checked: true
					}
				]
			}];

			this.prompt(prompts, function (props) {
				var choices = props.choices;

				var action = !!~choices.indexOf("action");
				var store = !!~choices.indexOf("store");
				var component = !!~choices.indexOf("component");

				var options = {
					options: {
						external: {
							action: action,
							store: store,
							component: component
						},
						args: this.classList
					}
				};

				component && this.composeWith("88mph:component", options);
				store && this.composeWith("88mph:store", options);
				action && this.composeWith("88mph:action", options);

				done();
			}.bind(this));
		}
	}

});