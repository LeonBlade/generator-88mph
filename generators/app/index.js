"use strict";

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var merge = require("merge");
var mkdirp = require("mkdirp");
var _s = require("underscore.string");

module.exports = yeoman.generators.Base.extend({
	
	prompting: function () {
		var done = this.async();

		this.log(yosay(
			"If my calculations are correct, when this baby hits " 
			+ chalk.red("88mph")
			+ "...you're gonna see some serious shit."
		));

		var prompts = [
			{
				name: "appname",
				type: "input",
				message: "What's the name of your app?",
				default: this.appname
			},
			{
				name: "helloworld",
				type: "confirm",
				message: "Do you want a Hello World example?",
				default: false
			},
			{
				name: "createTemplates",
				type: "confirm",
				message: "Do you want create some templates?",
				default: false
			}
		];

		this.prompt(prompts, function (props) {
			this.props = props;
			this.appname = props.appname;
			done();
		}.bind(this));
	},

	writing: {

		folders: function () {
			mkdirp("app");
			mkdirp("app/js");
			mkdirp("app/js/actions");
			mkdirp("app/js/components");
			mkdirp("app/js/stores");
			mkdirp("app/scss");
			mkdirp("app/images");
		},

		helloworld: function () {
			if (this.props.helloworld) {
				this.composeWith("88mph:helloworld", {
					options: { 
						external: { 
							appname: this.appname 
						}
					} 
				});
			}
		},

		app: function () {
			this.fs.copy(
				this.templatePath("alt.js"),
				this.destinationPath("app/js/alt.js")
			);

			this.fs.copyTpl(
				this.templatePath("_app.js"),
				this.destinationPath("app/js/app.js"),
				{
					appname: this.appname,
					helloworld: this.props.helloworld,
					_s: _s
				}
			);

			this.fs.copyTpl(
				this.templatePath("_index.html"),
				this.destinationPath("app/index.html"),
				{
					appname: this.appname,
					helloworld: this.props.helloworld,
					_s: _s
				}
			);

		},

		create: function () {
			if (this.props.createTemplates) {
				this.composeWith("88mph:create");
			}
		},

		root: function () {
			if (this.fs.exists(this.destinationPath("package.json"))) {
				var destPackage = this.fs.readJSON(this.destinationPath("package.json"));
				var templatePackage = this.fs.readJSON(this.templatePath("_package.json"));

				if (!destPackage.devDependencies) {
					destPackage.devDependencies = templatePackage.devDependencies;
				}
				else {
					destPackage.devDependencies = merge(
						destPackage.devDependencies, 
						templatePackage.devDependencies
					);
				}

				this.fs.writeJSON(this.destinationPath("package.json"), destPackage);
			}
			else {
				this.fs.copyTpl(
					this.templatePath("_package.json"),
					this.destinationPath("package.json"),
					{
						appname: this.appname,
						_s: _s
					}
				);
			}

			this.fs.copy(
				this.templatePath("gulpfile.js"),
				this.destinationPath("gulpfile.js")
			);
		}
	},

	install: function () {
		this.installDependencies({ bower: false });
	}
});
