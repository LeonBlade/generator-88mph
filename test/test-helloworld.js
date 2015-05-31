"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("HelloWorld Generator", function () {

	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/helloworld")).on("end", done);
	});

	it("creates HelloWorld example files", function () {
		assert.file([
			"app/js/components/HelloWorld.react.js",
			"app/js/actions/HelloWorld.action.js",
			"app/js/stores/HelloWorld.store.js"
		]);
	});

	it("creates alt in case it wasn't there before", function () {
		assert.file(["app/js/alt.js"]);
	})

	it("creates app.js file which renders <HelloWorld />", function () {
		assert.fileContent("app/js/app.js", /React\.render\(<HelloWorld \/>/);
	});

});
