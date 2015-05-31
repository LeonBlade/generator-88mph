var gulp = require("gulp");
var concat = require("gulp-concat");
var chalk = require("chalk");
var sass = require("gulp-sass");
var util = require("gulp-util");
var plumber = require("gulp-plumber");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var watchify = require("watchify");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create()

// app path
var appPath = "app";
// destination path
var destPath = "build";

// if we are watching
var watch = false;

// our source files
var src = {
	webpages: "./" + appPath + "/*.html",
	sass: "./" + appPath + "/scss/*.scss",
	images: "./" + appPath + "/images/*.*"
}

// default task is to run build
gulp.task("default", ["build"]);

// main build task
gulp.task("build", ["html", "sass", "images", "scripts"]);

// called before watch starts
gulp.task("pre-watch", function () {
	watch = true;
});

// our watch task to watch files and perform other tasks
gulp.task("watch", ["pre-watch", "build"], function () {
	gulp.watch(src.webpages, ["html"]).on("change", function () {
		//if (browserSync.active)
			browserSync.reload();
	});
	gulp.watch(src.sass, ["sass"]);
	gulp.watch(src.images, ["images"]);
});

// called to move any HTML documents into the destination folder
gulp.task("html", function () {
	return gulp.src(src.webpages)
		.pipe(gulp.dest(destPath));
});

// build and move SCSS files to destination folder
gulp.task("sass", function () {
	return gulp.src(src.sass)
		.pipe(sourcemaps.init())
		.pipe(plumber(function (error) {
			util.beep();
			console.log(
				chalk.gray("\n====================================\n") +
				"[" + chalk.magenta("SASS") + "] " + chalk.red.bold("Error") +
				chalk.gray("\n------------------------------------\n") +
				chalk.yellow("Message:\n  ") +
				error.messageFormatted +
				chalk.gray("\n------------------------------------\n") +
				chalk.yellow("Details:") +
				chalk.green("\n  Line: ") + error.line +
				chalk.green("\n  Column: ") + error.column +
				chalk.gray("\n====================================\n")
			);
			this.emit("end");
		}))
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(concat("app.css"))
		.pipe(gulp.dest(destPath + "/css"))
		.pipe(browserSync.stream());
});

// called to move any images over
gulp.task("images", function () {
	return gulp.src(src.images)
		.pipe(gulp.dest(destPath + "/images"));
});

// called to proccess your javascript files
gulp.task("scripts", function () {
	// our browserify instance
	var bro = browserify({
		entries: "./" + appPath + "/js/app.js",
		debug: true,
		transform: [babelify]
	});
	
	// our javascript bundler
	var bundler = (watch) ? watchify(bro) : bro;

	// when the bundler updates
	bundler.on("update", function () {
		// call our rebundler again
		rebundle(bundler);
	});

	// our rebundle function
	function rebundle(bundler) {
		util.log("Browserify is bundling...");
		// tell browserify we are compiling
		browserSync.notify("Browserify is bundling...");
		// default bundler to not have an error
		bundler.error = false;
		// send our bundler bundle back
		return bundler.bundle()
			.on("error", function (error) {
				// set bundler error to true to check for later
				bundler.error = true;
				// beep and give us the error
				util.beep();
				// tell browserify we got an error
				browserSync.notify("Browserify Error!");
				// log the message
				console.log(
					chalk.gray("\n====================================\n") +
					"[" + chalk.blue("Browserify") + "] " + chalk.red.bold("Error") +
					chalk.gray("\n------------------------------------\n") +
					chalk.yellow("Message:\n  ") + error.message +
					chalk.gray("\n------------------------------------\n") +
					error.codeFrame + "\n" +
					chalk.gray("\n------------------------------------\n") +
					chalk.yellow("Details:") +
					chalk.green("\n  File: ") + error.filename +
					chalk.green("\n  Line: ") + error.loc.line +
					chalk.green("\n  Column: ") + error.loc.column +
					chalk.gray("\n====================================\n")
				);
			})
			.pipe(source("app.js"))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write("./"))
			.pipe(gulp.dest(destPath + "/js"))
			.on("end", function () {
				// don't do anything if we have an error
				if (!bundler.error) { 
					// we are done bundling
					util.log("Browserify finished bundling!");
					// tell browserify we got an error
					browserSync.notify("Browserify finished bundling!");
					// uglify the file
					gulp.src(destPath + "/js/app.js")
						.pipe(uglify())
						.pipe(rename({ extname: ".min.js" }))
						.pipe(gulp.dest(destPath + "/js"));

					// tell browser sync to reload the page
					browserSync.reload();
				}
			});
	}

	// call the rebundle to bundle the app
	return rebundle(bundler);
});

// called to serve the files on localhost
gulp.task("serve", ["watch"], function () {
	// initialize browser sync
	browserSync.init({ server: destPath });
});
