# generator-88mph [![Build Status](https://secure.travis-ci.org/LeonBlade/generator-88mph.png?branch=master)](https://travis-ci.org/LeonBlade/generator-88mph)

![](http://i.imgur.com/UmzFbiv.jpg)

## Introduction

### Who?

88mph gets its name from the movie *"Back to the Future"*, as if that wasn't obvious enough! The purpose of this generator is to scaffold out a reactive web app using a variety of tools.

### What?

88mph is powered by this cool stuff:

* [React](https://facebook.github.io/react/)
* [Alt](http://alt.js.org/)
* [Babel](http://babeljs.io/)
* [Browserify](http://browserify.org/)
* [Browser Sync](http://www.browsersync.io/)
* [Gulp](http://gulpjs.com/)
* And many more! (just a few more)

### Why?

Well, this is my first time making a generator. I wanted to put together something that I could use and maybe others could benefit from, if they happen to stumble across it.

## Getting Started

### Installation

If you haven't installed yo yet, here's how you do it:

```bash
npm install -g yo
```

To install generator-88mph from npm, run:

```bash
npm install -g generator-88mph
```

### Usage

You can choose to use the other generators listed below, when you're ready to start working on the project, you need to use:

```bash
gulp
```

If you want to run the server and watch your files for development, use:

```bash
gulp serve
```

Gulp manages all of the build steps including SCSS compilation, Watchify with Browserify will handle JavaScript and Browser Sync handles the CSS and HTML injection. 

All errors fail gracefully and will not crash Gulp if you happen to save with a missing semicolon in your SCSS or a syntax error in your JavaScript.

If you just want to watch and build without using Browser Sync, just use:

```bash
gulp watch
```

## Generators

### App

This is the core generator itself that will do all of the initial work for you. You can chose to generate a Hello World example to see how things work with Alt. You'll also be given the option to create basic templates as well, see the ```create``` generator below.

Example:

```bash
yo 88mph
```

### Hello World

This will just create the Hello World files for you if you didn't want them before, simple enough!  If you have existing ```app.js``` and ```index.html``` files you will be prompted to overrite them.

Example:

```bash
yo 88mph:helloworld
```

### Create

This generator calls the three below to create templates for you. By selecting certain combinations, they will link together appropriately. You can pass in arguments in the command, or typing it in the generator prompt.

Example:

```bash
yo 88mph:create ClassName
```

### Component, Action, Store

These generators will create template files for each type respectively. You have no individual way of connecting them when calling them seperately currently, see the ```helloworld``` generator or use ```create``` and create all of them to see how they work together.

Example:

```bash
yo 88mph:component ClassName
yo 88mph:store ClassName
yo 88mph:action ClassName
```

## Contributing

If for some reason you find yourself using this and you find a bug, just file an issue for it. I'll accept pretty much any pull request as well so feel free. I don't expect this to get much traction if *any* at all, but if you happen to use this, thank you!

## License

MIT
