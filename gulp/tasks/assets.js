'use strict';

var assetsTask = function (gulp, plugins, config, helpers) {
  gulp.task('assets', function () {
    var src = [config.paths.src + '/{images,videos,fonts}/**/*.*', '!**/.keep'];
    var dest = config.paths.dest;

    return gulp.src(src)
        .pipe(plugins.newer(dest))
        .pipe(gulp.dest(dest));
  });
};

module.exports = assetsTask;
