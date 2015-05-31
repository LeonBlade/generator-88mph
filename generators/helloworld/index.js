"use strict";

var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var _ = require("lodash");
var _s = require("underscore.string");

module.exports = yeoman.generators.Base.extend({

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
		}
	}

});
