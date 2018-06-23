const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const runSequence = require("run-sequence");
const sourcemaps = require("gulp-sourcemaps");
const useref = require("gulp-useref");

gulp.task("browserSync", function() {
  browserSync({ server: { baseDir: "src" } });
});

gulp.task("watch", function() {
  gulp.watch(["*.html", "scripts/**/*.js"], { cwd: "src" }, browserSync.reload);
  gulp.watch("src/stylesheets/**/*.css", function() {
    return gulp
      .src("src/stylesheets/**/*.css")
      .pipe(browserSync.reload({ stream: true }));
  });
});

gulp.task("useref", function() {
  return gulp
    .src("src/*.html")
    .pipe(useref())
    .pipe(gulp.dest("dist"));
});

gulp.task("html", function() {
  return gulp
    .src("dist/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("css", function() {
  const plugins = [autoprefixer({ cascade: false }), cssnano()];
  return gulp
    .src("dist/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task("images", function() {
  return gulp
    .src("src/images/**/*.png")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("clean:dist", function() {
  return del.sync("dist");
});

gulp.task("build", function(callback) {
  runSequence("clean:dist", "useref", ["html", "css"], "images", callback);
});
gulp.task("default", ["browserSync", "watch"]);
