const browserSync = require("browser-sync");
const gulp = require("gulp");

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

gulp.task("default", ["browserSync", "watch"]);
