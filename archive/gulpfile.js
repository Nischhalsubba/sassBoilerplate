/*
 * Build pipeline from the archived JR Cologne Gulp Starter Kit.
 * Keeps the historical task names and output paths while expressing each build
 * step as a named function so the responsibilities are easy to follow.
 */

const gulp = require("gulp");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const less = require("gulp-less");
const stylus = require("gulp-stylus");
const autoprefixer = require("gulp-autoprefixer");
const minifyCss = require("gulp-clean-css");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const pug = require("gulp-pug");
const dependents = require("gulp-dependents");

const srcFolder = "./src/";
const srcAssetsFolder = `${srcFolder}assets/`;
const distFolder = "./dist/";
const distAssetsFolder = `${distFolder}assets/`;
const nodeModulesFolder = "./node_modules/";
const distNodeModulesFolder = `${distFolder}node_modules/`;
const nodeDependencies = Object.keys(require("./package.json").dependencies || {});

/** Removes the generated distribution directory before a full build. */
function clearTask() {
  return del([distFolder]);
}

/** Copies authored HTML files from src into the distribution directory. */
function htmlTask() {
  return gulp
    .src([`${srcFolder}**/*.html`], {
      base: srcFolder,
      since: gulp.lastRun("html"),
    })
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.stream());
}

/** Compiles non-partial Pug templates into HTML in the distribution directory. */
function pugTask() {
  return gulp
    .src([`${srcFolder}pug/**/!(_)*.pug`], {
      base: `${srcFolder}pug`,
      since: gulp.lastRun("pug"),
    })
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.stream());
}

/** Compiles Sass/SCSS sources, adds prefixes, minifies CSS, and writes source maps. */
function sassTask() {
  return gulp
    .src(
      [`${srcAssetsFolder}sass/**/*.sass`, `${srcAssetsFolder}scss/**/*.scss`],
      { since: gulp.lastRun("sass") },
    )
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(dependents())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${distAssetsFolder}css`))
    .pipe(browserSync.stream());
}

/** Compiles optional Less sources and writes optimized CSS plus source maps. */
function lessTask() {
  return gulp
    .src([`${srcAssetsFolder}less/**/!(_)*.less`], {
      since: gulp.lastRun("less"),
    })
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${distAssetsFolder}css`))
    .pipe(browserSync.stream());
}

/** Compiles optional Stylus sources and writes optimized CSS plus source maps. */
function stylusTask() {
  return gulp
    .src([`${srcAssetsFolder}stylus/**/!(_)*.styl`], {
      since: gulp.lastRun("stylus"),
    })
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${distAssetsFolder}css`))
    .pipe(browserSync.stream());
}

/** Bundles, transpiles, concatenates, and minifies authored JavaScript. */
function jsTask() {
  return gulp
    .src([`${srcAssetsFolder}js/**/*.js`], { since: gulp.lastRun("js") })
    .pipe(plumber())
    .pipe(webpack({ mode: "production" }))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${distAssetsFolder}js`))
    .pipe(browserSync.stream());
}

/** Optimizes supported image assets and copies them into the distribution tree. */
function imagesTask() {
  return gulp
    .src([`${srcAssetsFolder}images/**/*.+(png|jpg|jpeg|gif|svg|ico)`], {
      since: gulp.lastRun("images"),
    })
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(`${distAssetsFolder}images`))
    .pipe(browserSync.stream());
}

/** Builds the glob used to copy or watch one runtime dependency. */
function dependencyGlob(dependency) {
  return `${nodeModulesFolder}${dependency}/**/*.*`;
}

/** Copies declared runtime dependencies into dist for the historical static workflow. */
function vendorTask() {
  if (nodeDependencies.length === 0) {
    return Promise.resolve();
  }

  return gulp
    .src(nodeDependencies.map(dependencyGlob), {
      base: nodeModulesFolder,
      since: gulp.lastRun("vendor"),
    })
    .pipe(gulp.dest(distNodeModulesFolder))
    .pipe(browserSync.stream());
}

/** Starts BrowserSync against the generated distribution directory. */
function serveTask() {
  return browserSync.init({
    server: { baseDir: ["dist"] },
    port: 3000,
    open: false,
  });
}

/** Watches source and dependency paths and runs the corresponding rebuild tasks. */
function watchTask() {
  const watchImages = [`${srcAssetsFolder}images/**/*.+(png|jpg|jpeg|gif|svg|ico)`];
  const watchVendor = nodeDependencies.map(dependencyGlob);
  const watchSource = [
    `${srcFolder}**/*.html`,
    `${srcFolder}pug/**/*.pug`,
    `${srcAssetsFolder}sass/**/*.sass`,
    `${srcAssetsFolder}scss/**/*.scss`,
    `${srcAssetsFolder}less/**/*.less`,
    `${srcAssetsFolder}stylus/**/*.styl`,
    `${srcAssetsFolder}js/**/*.js`,
  ];

  gulp.watch(watchSource, gulp.series("dev")).on("change", browserSync.reload);
  gulp.watch(watchImages, gulp.series("images")).on("change", browserSync.reload);

  if (watchVendor.length > 0) {
    gulp.watch(watchVendor, gulp.series("vendor")).on("change", browserSync.reload);
  }
}

gulp.task("clear", clearTask);
gulp.task("html", htmlTask);
gulp.task("pug", pugTask);
gulp.task("sass", sassTask);
gulp.task("less", lessTask);
gulp.task("stylus", stylusTask);
gulp.task("js", jsTask);
gulp.task("images", imagesTask);
gulp.task("vendor", vendorTask);
gulp.task("build", gulp.series("clear", "html", "pug", "sass", "less", "stylus", "js", "images", "vendor"));
gulp.task("dev", gulp.series("html", "pug", "sass", "less", "stylus", "js"));
gulp.task("serve", serveTask);
gulp.task("watch", watchTask);
gulp.task("default", gulp.series("build", gulp.parallel("serve", "watch")));
