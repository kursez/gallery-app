'use strict';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var scriptsTask = function (gulp, plugins, config, helpers) {

  gulp.task('scripts', function () {
    var dest = config.paths.dest + '/scripts';

    return plugins.browserify(config.paths.src + '/scripts/main.js').transform("babelify", { presets: ["es2015"] }).bundle()
        .pipe(plugins.plumber(helpers.onError))
        .pipe(source('./main.js'))
        .pipe(buffer())
        .pipe(gulp.dest(dest))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest(dest))
        .on('end', function () {
          gulp.src(config.paths.src + '/scripts/**/*.js')
            .pipe(plugins.jshint('.jshintrc'))
            .pipe(plugins.jshint.reporter('default'));
        });
  });
};

module.exports = scriptsTask;
