"use strict";

var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var _ = require("lodash");
var _s = require("underscore.string");

module.exports = yeoman.generators.Base.extend({

	prompting: function () {
		var done = this.async();

		this.external = this.options.external || {};
		this.args = this.args || this.options.args || [];

		if (!this.args.length) {
			// Have Yeoman greet the user.
			this.log(yosay(
				"If my calculations are correct, when this baby hits " 
				+ chalk.red("88mph")
				+ "...you're gonna see some serious shit."
			));

			var prompts = [{
				name: "className",
				type: "string",
				message: "Tell me your class name(s)...",
				default: "MyClass"
			}];

			var that = this;

			this.prompt(prompts, function (props) {
				that.classList = props.className.split(" ");
				done();
			});
		}
		else {
			this.classList = this.args;
			done();
		}
	},

	writing: {
		templates: function () {
			for (var i in this.classList) {
				var className = this.classList[i];
				this.fs.copyTpl(
					this.templatePath("_template.store.js"),
					this.destinationPath("app/js/stores/" + _s.classify(className) + ".store.js"),
					{ 
						className: className, 
						action: this.external.action, 
						store: this.external.store, 
						_s: _s 
					}
				);
			}
		}
	}

});
