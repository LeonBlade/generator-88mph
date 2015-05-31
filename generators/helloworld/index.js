"use strict";

var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var _s = require("underscore.string");

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		if (this.options.external) {
			this.appname = this.options.external.appname;
		}
		else if (this.fs.exists(this.destinationPath("package.json"))) {
			var destPackage = this.fs.readJSON(this.destinationPath("package.json"));
			this.appname = destPackage.name;
		}
	},

	writing: {
		action: function () {
			this.fs.copy(
				this.templatePath("HelloWorld.action.js"),
				this.destinationPath("app/js/actions/HelloWorld.action.js")
			);
		},
		component: function () {
			this.fs.copy(
				this.templatePath("HelloWorld.react.js"),
				this.destinationPath("app/js/components/HelloWorld.react.js")
			);
		},
		store: function () {
			this.fs.copy(
				this.templatePath("HelloWorld.store.js"),
				this.destinationPath("app/js/stores/HelloWorld.store.js")
			);
		},
		scss: function () {
			this.fs.copy(
				this.templatePath("app.scss"),
				this.destinationPath("app/scss/app.scss")
			);
		},
		images: function () {
			this.fs.copy(
				this.templatePath("bttf.jpg"),
				this.destinationPath("app/images/bttf.jpg")
			);
		},
		html: function () {
			this.fs.copyTpl(
				this.templatePath("../../app/templates/_index.html"),
				this.destinationPath("app/index.html"),
				{
					appname: this.appname,
					helloworld: true,
					_s: _s
				}
			);
		},
		alt: function () {
			this.fs.copy(
				this.templatePath("../../app/templates/alt.js"),
				this.destinationPath("app/js/alt.js")
			);
		},
		app: function () {
			this.fs.copyTpl(
				this.templatePath("../../app/templates/_app.js"),
				this.destinationPath("app/js/app.js"),
				{
					appname: this.appname,
					helloworld: true,
					_s: _s
				}
			);
		}
	}

});
