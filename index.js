'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var colorguard = require('colorguard');

var pluginName = 'gulp-colorguard';
var pluginError = gutil.PluginError;

var logNoCollisions = function (filePath) {
    gutil.log(gutil.colors.magenta(filePath), 'has no css color collisions');
};

var processResults = function (results, file, logOk) {
    var self = this;
    if (!results || !results.collisions) {
        if (logOk) {
            logNoCollisions(file.path);
        }
        return;
    }
    results.collisions.forEach(function (err) {
        self.emit('error', new pluginError(pluginName, gutil.colors.magenta(file.path) + ': ' + err.message, {
            showStack: false
        }));
    });
};

module.exports = function (options) {
    options = options || {};
    var logOk = Boolean(options.logOk);
    delete options.logOk;

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        if (file.isStream()) {
            this.emit('error', new pluginError(pluginName, 'Streaming not supported'));
            return cb();
        }
        var results;
        try {
            results = colorguard.inspect(file.contents.toString(), options);
        } catch (err) {
            err.message = pluginName + ': ' + err.message;
            this.emit('error', new pluginError(pluginName, err));
        }
        processResults.call(this, results, file, logOk);
        this.push(file);
        cb();
    });
};
