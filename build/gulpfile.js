var gulp = require("gulp");
var jshint = require("gulp-jshint");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var minifyhtml = require("gulp-minify-html");
var gzip = require('gulp-gzip');
var rjs = require("gulp-requirejs");
var sass = require("gulp-sass");
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var notify = require('gulp-notify');

try{
	console.log('Starting directory: ' + process.cwd());
	process.chdir('..');
	console.log('end directory: ' + process.cwd());
}catch(err){
	console.log('change current working direcotry is error');
}

var paths = {
	rev: "public/rev/",
	root: "public/",
	scss: {
		source: "public/scss/",
		release: "public/scss/"
	},

	css: {
		source: "public/scss/",
		release: "public/css/"
	},

	images: {
		source: "public/images/",
		release: "public/images/"
	},

	js: {
		source: "public/js/",
		release: "public/js/"
	}
};

gulp.task('clean', function(){
	return gulp.src([paths.css.release + 'share-list*min.*'], {read: false})
				.pipe(clean({force: true}))
				.pipe(notify({ message: 'task clean has finished' }));
});

/**
 * user list page
 */
// reg and all scss task
gulp.task('sass', function(){
	return gulp.src(paths.scss.source + "*.scss")
		.pipe(sass())
		.pipe(gulp.dest(paths.scss.release))
		.pipe(notify({ message: 'scss task ok' }));
});

gulp.task('allCss', ['sass'], function(){
	return gulp.src([paths.css.source + 'common.css', paths.css.source + 'shage-page.css', paths.css.source + 'userlist.css'])
		.pipe(concat('all.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.css.release))
		.pipe(gzip())
		.pipe(gulp.dest(paths.css.release))
		.pipe(notify({
			message: "all css have been gzip"
		}));
});

/**
 * user list page
 */
gulp.task('userCSS', ['sass'], function(){
	return gulp.src([paths.css.source + 'common.css', paths.css.source + 'userlist.css'])
		.pipe(concat('manager.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.css.release))
		.pipe(rev())
		.pipe(gulp.dest(paths.css.release))
		.pipe(rev.manifest())
		.pipe(gulp.dest(paths.rev))
		.pipe(notify({
			message: "user css have been finished"
		}));
});

gulp.task('userRev', ['userCSS'], function(){
	var opts = {
		conditionals: true,
		spare: true
    };
	return gulp.src([paths.rev + '*.json', paths.root + 'user-list.html'])		
		.pipe(revCollector({
			replaceReved: true
		}))

		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.root))

		.pipe(minifyhtml(opts))
		.pipe(gulp.dest(paths.root))
		pipe(notify({
			message: 'userlist Rev task is finished'
		}));
});

gulp.task('watchUser', function(){
	gulp.watch([paths.css.source + 'common.scss', paths.css.source + 'userlist.scss'], ['userRev']);
});


// js task


// gulp watch
gulp.task('watchSCSS', [], function(){
	gulp.watch(paths.scss.source + "*.scss", ['allCss']);
});


gulp.task('default', ['allCss'], function(){

});



/**
 * share list page
 */

gulp.task('SLScss', ['clean', 'sass'], function(){
	return gulp.src([paths.scss.source + 'share-list.css', paths.scss.source + 'common.css'])
				.pipe(concat('share-list.css'))
				.pipe(rename({ suffix: '.min' }))
				.pipe(minifycss())
				.pipe(gulp.dest(paths.css.release))
				/*
				.pipe(gzip())
				.pipe(gulp.dest(paths.css.release))
				*/
				.pipe(rev())
				.pipe(gulp.dest(paths.css.release))
				.pipe(rev.manifest())
				.pipe(gulp.dest(paths.rev))

				.pipe(notify({
					message: 'task share-list.scss has finished.'
				}));
});

gulp.task('SLRev', ['SLScss'], function(){
	return gulp.src([paths.rev + '*.json', paths.root + 'share-list.html'])
				
				.pipe(revCollector({
					replaceReved: true
				}))
				.pipe(rename({ suffix: '.min' }))
				.pipe(gulp.dest(paths.root))
				.pipe(notify({
					message: 'SLRev task has finished.'
				}));
})

	
gulp.task('watchSLS', function(){
	gulp.watch(paths.scss.source + 'share-list.scss', ['SLRev']);
});

gulp.task('share-list', [], function(){});
