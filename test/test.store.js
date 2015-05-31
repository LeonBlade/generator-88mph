"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("Store Generator", function () {

	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/store"))
			.withPrompts({ className: "test-name my-Test_class" })
			.on("end", done);
	});

	it("creates store file with proper name", function () {
		assert.file(["app/js/stores/TestName.store.js"]);
	});

	it("sets the class name to TestNameStore", function () {
		assert.fileContent(
			"app/js/stores/TestName.store.js",
			/class TestNameStore \{/
		);
	});

	it("can generate multiple classes at once", function () {
		assert.file(["app/js/stores/MyTestClass.store.js"]);
	});
});

describe("Store Generator with arguments", function () {
	before(function (done) {
		helpers.run(path.join(__dirname, "../generators/store"))
			.withArguments(["test-name", "my-Test_class"])
			.on("end", done);
	});

	it("generates files from arguments", function () {
		assert.file([
			"app/js/stores/TestName.store.js",
			"app/js/stores/MyTestClass.store.js"
		]);
	});
});
