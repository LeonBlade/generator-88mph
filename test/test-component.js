"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("Component Generator", function () {

	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/component"))
			.withPrompts({ className: "test-name my-Test_class" })
			.on("end", done);
	});

	it("creates component file with proper name", function () {
		assert.file(["app/js/components/TestName.react.js"]);
	});

	it("sets the class name to TestName", function () {
		assert.fileContent(
			"app/js/components/TestName.react.js",
			/class TestName extends React\.Component \{/
		);
	});

	it("has a method named render", function () {
		assert.fileContent(
			"app/js/components/TestName.react.js",
			/render\(\) \{/
		);
	});

	it("can generate multiple classes at once", function () {
		assert.file(["app/js/components/MyTestClass.react.js"]);
	});
});

describe("Component Generator with arguments", function () {
	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/component"))
			.withArguments(["test-name", "my-Test_class"])
			.on("end", done);
	});

	it("generates files from arguments", function () {
		assert.file([
			"app/js/components/TestName.react.js",
			"app/js/components/MyTestClass.react.js"
		]);
	});
});
