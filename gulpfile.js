// 引用外掛
const gulp = require('gulp'),
			// clean
			del = require('del'),
			// pug
			pug = require('gulp-pug'),
			// postCss
			postcss = require('gulp-postcss'),
			autoprefixer = require('autoprefixer'),
			sass = require('gulp-sass'),
			lost = require('lost'),
			rucksack = require('rucksack-css'),
			// 整個sass資料夾import
			bulkSass = require('gulp-sass-bulk-import'),
			// markdown
			markdown = require('gulp-markdown'),
			// 壓縮css
			minifyCSS = require('gulp-minify-css'),
			// 重新命名min檔用
			rename = require("gulp-rename"),
			// 偵錯工具
			plumber = require('gulp-plumber'),
			notify = require("gulp-notify"),
			// sourcemap
			sourcemaps = require('gulp-sourcemaps'),
			// webServer
			webServer = require('gulp-webserver');

// 路徑
const src_pug = './src/assets/pug/*.pug',
			end_pug = './',
			src_sass = './src/assets/**/*.sass',
			end_sass = './src/assets/css/';

// webServer網址
const serverSite = 'seansu.local';

// sass編譯css的排列
/*
	nested: 一般css，但尾巴在同一行
	expanded: 完整的css排列
	compact: 每一段變成一行
	compressed: 壓縮成一行
*/
const sassCompile = 'compact';

// pug
gulp.task('template', () => {
	return gulp.src(src_pug)
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest(end_pug))
	.pipe(notify({
		message: 'pug Compily'
	}));
});


// postCss
gulp.task('styles', () => {
	var processors = [
		lost,
		rucksack({
			fallbacks: true
		}),
		autoprefixer({
			browsers: ['last 4 version']
		})
	];
	return gulp.src(src_sass)
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
		.pipe(bulkSass())
		.pipe(sass({
			outputStyle: sassCompile
		}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(end_sass));
});


// 監聽
gulp.task('watch', () => {
	gulp.watch(src_pug, ['template']);
	gulp.watch(src_sass, ['styles']);
});


// server
gulp.task('webServer', () => {
	gulp.src('./')
		.pipe(webServer({
			host: serverSite,
			fallback: 'index.html',
			livereload: true
		}));
});


// cmd輸入"gulp"時，要執行的task
gulp.task('default', ['template', 'styles', 'webServer', 'watch']);