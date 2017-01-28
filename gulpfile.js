/* jshint camelcase:false */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var del = require('del');
var glob = require('glob');
var merge = require('merge-stream');
var paths = require('./gulp.config.json');
var plato = require('plato');
var plug = require('gulp-load-plugins')();
var reload = browserSync.reload;
var sass = require('gulp-sass');


var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;
var port = process.env.PORT || 7203;

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);

/**
* Lint the code, create coverage report, and a visualizer
* @return {Stream}
*/
gulp.task('analyze', function() {
    log('Analyzing source with JSHint');

    gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('js', function() {
    log('Bundling, minifying, and copying the app\'s JavaScript');

    return gulp
        .src(paths.js)
        // .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
        .pipe(plug.concat('all.min.js'))
        .pipe(plug.ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify({
            mangle: true
        }))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        // .pipe(plug.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build));
});

/**
 * Copy the Vendor JavaScript
 * @return {Stream}
 */
gulp.task('vendorjs', function() {
    log('Bundling, minifying, and copying the Vendor JavaScript');

    return gulp.src(paths.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.bytediff.start())
        .pipe(plug.uglify())
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build));
});
/**
 * Minify and bundle the styles
 * @return {Stream}
 */
gulp.task('styles', function() {

    gulp.src(paths.scss)
        .pipe(sass({onError: function(e) { console.log(e); } }))
        .pipe(plug.autoprefixer('last 2 version', '> 5%'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(plug.concat('all.min.css')) // Before bytediff or afters
        .pipe(gulp.dest(paths.build + 'content'));
});

/**
 * Build the optimized app
 * @return {Stream}
 */
gulp.task('build', ['js', 'vendorjs', 'styles'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
});

/**
 * Backwards compatible call to make stage and build equivalent
 */
gulp.task('stage', ['build'], function() {});

/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function(cb) {
    log('Cleaning: ' + plug.util.colors.blue(paths.build));

    var delPaths = [].concat(paths.build);
    del(delPaths, cb);
});

/**
 * Watch files and build
 */
gulp.task('watch', function() {
    log('Watching all files');

    var css = ['gulpfile.js'].concat(paths.scss);
    var js = ['gulpfile.js'].concat(paths.js);

    gulp
        .watch(js, ['js', 'vendorjs'])
        .on('change', logWatch);

    gulp
        .watch(css, ['styles']);

    function logWatch(event) {
        log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}
