/* global describe, it */
'use strict';
var expect = require('expect.js')
var path = require('path');
var fs = require('fs');

var gutil = require('gulp-util');
var colorguard = require('../index');

describe('gulp-colorguard', function () {
    it('files should pass through', function (cb) {
        var stream = colorguard();

        stream.on('error', function () {}).on('data', function (file) {
            expect(file.path).to.be('style.css');
            cb();
        });
        var file = './tests/fixtures/style.css';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: path.basename(file),
            contents: new Buffer(fs.readFileSync(file).toString())
        }));

        stream.end();
    });

    it('should throw error on basic validation', function (cb) {
        var stream = colorguard();

        stream.on('error', function (err) {
            expect(err.plugin).to.be('gulp-colorguard');
            expect(err.message).to.contain('#fffffa');
            expect(err.message).to.contain('#ffffff');
            expect(err.message).to.contain('line: 2');
            cb();
        });
        var file = './tests/fixtures/style.css';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: path.basename(file),
            contents: new Buffer(fs.readFileSync(file).toString())
        }));

        stream.end();
    });

    it('should throw on multiple colors collisions', function (cb) {
        var stream = colorguard();

        stream.on('error', function (err) {
            expect(err.message).to.contain('#fffffa');
            expect(err.message).to.contain('#ffffff');
            expect(err.message).to.contain('line: 2, 8, 14');
            cb();
        });
        var file = './tests/fixtures/multiple.css';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: path.basename(file),
            contents: new Buffer(fs.readFileSync(file).toString())
        }));

        stream.end();
    });

    it('should handle faulty css', function (cb) {
        var stream = colorguard();

        stream.on('error', function (err) {
            expect(err.message).to.contain('gulp-colorguard');
            cb();
        });
        var file = './tests/fixtures/error.css';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: path.basename(file),
            contents: new Buffer(fs.readFileSync(file).toString())
        }));

        stream.end();
    });

    it('should be ok with a good css file', function (cb) {
        var stream = colorguard();

        stream.on('error', function (err) {
            expect(err).to.not.be.ok();
        }).on('data', function (data) {
            expect(data).to.be.ok();
            expect(data.path).to.be('good.css');
        }).on('end', cb);
        var file = './tests/fixtures/good.css';

        stream.write(new gutil.File({
            base: path.basename(file),
            path: path.basename(file),
            contents: new Buffer(fs.readFileSync(file).toString())
        }));

        stream.end();
    });
});
