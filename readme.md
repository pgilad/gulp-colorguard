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
var colorguard = require('gulp-colorguard');

//example with basic css copying
gulp.task('css', function() {
    gulp.src('./src/css/**/*.css')
        .pipe(colorguard())
        .pipe(gulp.dest('./public/css'));
});

//example with less-preprocesser
var less = require('gulp-less');

gulp.task('css', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(colorguard())
        .pipe(gulp.dest('./public/css'));
});

//example with verbose logging
gulp.task('css', function() {
    gulp.src('./src/less/**/*.css')
        .pipe(colorguard({
            logOk: true
        }))
        .pipe(gulp.dest('./public/css'));

        // then if no errors:
        // --> main.css has no css color collisions
});
```

## API

[Options](https://github.com/SlexAxton/css-colorguard#programmatic) are passed through to css-colorguard,
except for `options.logOk` which affects this gulp plugin behavior only.

### logOk

Be verbose and log files that have no collisions. Off by default.

**Type**: `Boolean`

**Default**: `false`

## License

MIT ©[Gilad Peleg](http://giladpeleg.com)
