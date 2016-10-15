'use strict';

var iconsTask = function (gulp, plugins, config, helpers) {
  gulp.task('icons', function () {
    var src = config.paths.src + '/icons/*.svg';
    var dest = config.paths.dest + '/fonts';

    return gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.iconfont({
        formats: ['eot', 'ttf', 'woff', 'woff2'],
        fontName: 'iconfont',
        className: 'icon',
        normalize: true,
        appendCodepoints: false
      }))
      .on('glyphs', function (glyphs, options) {
        options.glyphs = glyphs;

        var stream = gulp.src('gulp/_icons.scss')
          .pipe(plugins.consolidate('lodash', options))
          .pipe(gulp.dest(config.paths.src + '/styles/common'));
      })
      .pipe(gulp.dest(dest));
  });
};

module.exports = iconsTask;
