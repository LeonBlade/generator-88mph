"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("App Generator", function () {

	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/app"))
			.withPrompts({ 
				className: "test-name",
				helloworld: false,
				createTemplates: false 
			})
			.on("end", done);
	});

	it("creates all the normal files for a project", function () {
		assert.file([
			"app/js/app.js",
			"app/js/alt.js",
			"app/index.html",
			"package.json",
			"gulpfile.js"
		]);
	});

	it("doesn't create the HelloWorld example files", function () {
		assert.noFile([
			"app/helloworld.html",
			"app/js/helloworld.js",
			"app/js/components/HelloWorld.react.js",
			"app/js/stores/HelloWorld.store.js",
			"app/js/actions/HelloWorld.action.js"
		]);
	});

	it("doesn't inject HelloWorld related things into app.js", function () {
		assert.noFileContent(
			"app/js/app.js",
			/<HelloWorld \/>/
		);

		assert.noFileContent(
			"app/js/app.js",
			/import HelloWorld/
		);
	});

	it("doesn't include app.css in the index.html file", function () {
		assert.noFileContent(
			"app/index.html",
			/main\.css/
		);
	});

});

describe("App Generator with HelloWorld", function () {

	before(function (done) {
		var generators = [
			[helpers.createDummyGenerator(), "88mph:helloworld"]
		];

		helpers.run(path.join(__dirname, "../generators/app"))
			.withPrompts({ 
				className: "test-name",
				helloworld: true,
				createTemplates: false 
			})
			.withGenerators(generators)
			.on("end", done);
	});

	it("Creates all the normal files for a project", function () {
		assert.file([
			"app/js/app.js",
			"app/js/alt.js",
			"app/index.html",
			"package.json",
			"gulpfile.js"
		]);
	});

	it("Injects HelloWorld related things into app.js", function () {
		assert.fileContent(
			"app/js/app.js",
			/<HelloWorld \/>/
		);

		assert.fileContent(
			"app/js/app.js",
			/import HelloWorld/
		);
	});

	it("Includes app.css in the index.html file", function () {
		assert.fileContent(
			"app/index.html",
			/app\.css/
		);
	});

});

describe("App Generator and Creating Templates", function () {

	before(function (done) {
		var generators = [
			[helpers.createDummyGenerator(), "88mph:create"]
		];

		helpers.run(path.join(__dirname, "../generators/app"))
			.withPrompts({ 
				className: "test-name",
				helloworld: false,
				createTemplates: true 
			})
			.withGenerators(generators)
			.on("end", done);
	});

	it("Creates all the normal files for a project", function () {
		assert.file([
			"app/js/app.js",
			"app/js/alt.js",
			"app/index.html",
			"package.json",
			"gulpfile.js"
		]);
	});

	it("Doesn't injects HelloWorld related things into app.js", function () {
		assert.noFileContent(
			"app/js/app.js",
			/<HelloWorld \/>/
		);

		assert.noFileContent(
			"app/js/app.js",
			/import HelloWorld/
		);
	});

	it("Doesn't include app.css in the index.html file", function () {
		assert.noFileContent(
			"app/index.html",
			/app\.css/
		);
	});

});
