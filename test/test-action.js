"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("Action Generator", function () {

	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/action"))
			.withPrompts({ className: "test-name my-Test_class" })
			.on("end", done);
	});

	it("creates action file with proper name", function () {
		assert.file(["app/js/actions/TestName.action.js"]);
	});

	it("sets the class name to TestNameAction", function () {
		assert.fileContent(
			"app/js/actions/TestName.action.js",
			/class TestNameAction \{/
		);
	});

	it("has a method named actionTestName", function () {
		assert.fileContent(
			"app/js/actions/TestName.action.js",
			/actionTestName\([^\)]+\) \{/
		);
	});

	it("can generate multiple classes at once", function () {
		assert.file(["app/js/actions/MyTestClass.action.js"]);
	});
});

describe("Action Generator (with args)", function () {
	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/action"))
			.withArguments(["test-name", "my-Test_class"])
			.on("end", done);
	});

	it("generates files from arguments", function () {
		assert.file([
			"app/js/actions/TestName.action.js",
			"app/js/actions/MyTestClass.action.js"
		]);
	});
});
