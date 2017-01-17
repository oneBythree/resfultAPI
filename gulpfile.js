'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'), // sass插件
    autoprefixer = require('gulp-autoprefixer'), //css3 自动补全插件
    minifyCSS = require('gulp-minify-css'), // css压缩插件
    concat = require('gulp-concat'), // js合并插件
    uglify = require('gulp-uglify'), //js压缩插件
    util = require('gulp-util'), // 打印错误日志
    htmlmin = require('gulp-htmlmin'), //html压缩插件
    imagemin = require('gulp-imagemin'), //图片压缩插件
    babel = require('gulp-babel'), // es5语法
    nodemon = require('gulp-nodemon'); // 自动重启node程序

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var publicPath = './app/public',
    staticPath = './app/static';

/**
 * [压缩scss description]
 * @param  {[type]} )[description]
 * @return {[type]}   [description]
 */
gulp.task('css', function() {
    gulp.src([publicPath + '/css/**/*.scss', '!' + publicPath + '/css/index.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            // browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(minifyCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(staticPath + '/css/'));
})

/**
 * [压缩蔬菜进场信息（列表） description]
 * @param  {[type]} [description]
 * @return {[type]}   [description]
 */
gulp.task('matterInRegConcat', function() {
    gulp.src([publicPath + '/scripts/filters/date.js', publicPath + '/scripts/components/header.js', publicPath + '/scripts/controllers/matter_in_reg/index.js'])
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('index.js'))
        .pipe(uglify().on('error', function(err) {
            util.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(staticPath + '/scripts/controllers/matter_in_reg/'));
})


gulp.task('lineJs', function() {
    gulp.src([publicPath + '/scripts/controllers/**/*.js', '!' + publicPath + '/scripts/components/**/*.js', '!' + publicPath + '/scripts/filter/**/*.js', '!' + publicPath + '/scripts/matter_in_reg/**/*.js'])
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify().on('error', function(err) {
            util.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(staticPath + '/scripts/controllers/'));
})

/**
 * [压缩图片 description]
 * @param  {[type]}  [description]
 * @return {[type]}   [description]
 */
gulp.task('images', function() {
    gulp.src(publicPath + '/images/**/*.{png,jpg,gif,ico,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest(staticPath + '/images/'));
})

/**
 * [压缩html description]
 * @param  [description]
 * @return {[type]}   [description]
 */
gulp.task('html', function() {
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        uglify: true,
        minifyCSS: true
    };
    gulp.src(publicPath + '/views/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest(staticPath + '/views/'))
})


gulp.task('node', function() {
    // gulp.watch('')
    var stream = nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: ['ignored.js'],
        task: ['css', 'html']
    })
    stream
        .on('restart', function() {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10) // restart the server in 10 seconds 
        })
})


gulp.task('server', ["node"], function() {
    var files = [
        publicPath + '/views/**/*.html',
        publicPath + '/css/**/*.scss',
        publicPath + '/scipts/**/*.js',
        publicPath + '/images/**/*.{png,jpg,gif,ico,svg}*'
    ];

    //gulp.run(["node"]);
    browserSync.init(files, {
        proxy: 'http://localhost:8888',
        browser: 'chrome',
        notify: false,
        port: 9999
    });

    gulp.watch(publicPath + '/views/**/*.html', ['html']);
    gulp.watch(publicPath + '/css/**/*.scss', ['css']);
    gulp.watch(publicPath + '/scripts/**/*.js', ['matterInRegConcat']);
    // gulp.watch(publicPath + '/scripts/filters/date.js', ['matterInRegConcat'])
    gulp.watch(publicPath + '/images/**/*.{png,jpg,gif,ico,svg}*', ['image']);
    gulp.watch(files).on("change", reload);
});
