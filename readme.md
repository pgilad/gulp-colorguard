# [gulp](https://github.com/wearefractal/gulp)-colorguard
> Keep a watchful eye on your css colors.

[![NPM Version](http://img.shields.io/npm/v/gulp-colorguard.svg?style=flat)](https://npmjs.org/package/gulp-colorguard)
[![NPM Downloads](http://img.shields.io/npm/dm/gulp-colorguard.svg?style=flat)](https://npmjs.org/package/gulp-colorguard)
[![Build Status](http://img.shields.io/travis/pgilad/gulp-colorguard.svg?style=flat)](https://travis-ci.org/pgilad/gulp-colorguard)

*Issues with the output should be reported on the css-colorguard [issue tracker](https://github.com/SlexAxton/css-colorguard/issues).*

## Install

Install with [npm](https://npmjs.org/package/gulp-colorguard)

```bash
$ npm install --save-dev gulp-colorguard
```

## Usage

```js
var gulp = require('gulp');
var less = require('gulp-less');
var colorguard = require('gulp-colorguard');

//example with basic css copying
gulp.task('css', function() {
    gulp.src('./src/css/**/*.css')
        .pipe(colorguard())
        .pipe(gulp.dest('./public/css'));
});

//example with less-preprocesser
gulp.task('css', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(colorguard())
        .pipe(gulp.dest('./public/css'));
});
```

## API

[Options](https://github.com/SlexAxton/css-colorguard#programmatic) are passed through to css-colorguard,
except for `options.logOk` which relates to this gulp plugin behavior only.

### logOk

Log files that have no collisions.

**Type**: `Boolean`

**Default**: `false`

## License

MIT ©2014 **Gilad Peleg**
