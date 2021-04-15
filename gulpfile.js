const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*

    -- TOP LEVEL FUNCTIONS --
    gulp.task  --> Define tasks
    gulp.src   --> Point to files to use
    gulp.dest  --> Points to folder to output
    gulp.watch --> Watch files and folders for changes
*/

// Logs Message
gulp.task('message', async function()
{
    return console.log('Gulp is running...');
});

// Copy All HTML files
gulp.task('copyHTML', async function()
{
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

/* NOT USEFUL BECAUSE WE USE IT IN SCRIPTS!
// Minify JS
gulp.task('minify', async function()
{
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
*/

// Compile Sass
gulp.task('sass', async function()
{
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
})

// Scripts  --> concatenate files into one file named main.js
gulp.task('scripts', async function ()
{
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Default Message
gulp.task('default',gulp.parallel(['message','copyHTML','imageMin','sass', 'scripts']));

// Instead of having to type 'gulp' all the time, we can run all watch commands:
gulp.task('watch', function()
{
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHTML'));
})
