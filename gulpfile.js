const
    gulp = require('gulp'),
    stylelint = require('gulp-stylelint'),
    htmllint = require('gulp-htmllint'),
    fancyLog = require('fancy-log'),
    colors = require('ansi-colors');

gulp.task('lint-html', () => {
    return gulp
        .src(['**/*.html', '!node_modules/**'])
        .pipe(htmllint({}, htmllintReporter));
});

gulp.task('lint-css', () => {
    return gulp
        .src(['**/*.css', '!node_modules/**', '!**/font-awesome*.css'])
        .pipe(stylelint({
            reporters: [
                { formatter: 'string', console: true }
            ]
        }));
});

gulp.task('default', ['lint-html', 'lint-css']);

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
        });

        process.exitCode = 1;
    }
}
