/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const noop = require('gulp-noop');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const {
  sassInputFiles,
  cssOutputFiles,
  cssAndSassOutputFiles,
  cssOutputFolder,
} = require('../config/paths');

const isDevelopment = process.env.NODE_ENV === 'development';

function cleanCSS() {
  return src(cssAndSassOutputFiles).pipe(clean());
}

function compileSass() {
  return src(sassInputFiles)
    .pipe(isDevelopment ? sourcemaps.init() : noop())
    .pipe(sass().on('error', sass.logError))
    .pipe(isDevelopment ? sourcemaps.write() : noop())
    .pipe(dest(cssOutputFolder));
}

function copySass() {
  return src(sassInputFiles).pipe(dest(cssOutputFolder));
}

function minifyCSS() {
  return src(cssOutputFiles)
    .pipe(
      cleancss({ debug: true }, (details) => {
        console.log(`${details.name}: Original Size->${details.stats.originalSize} bytes`);
        console.log(`${details.name}: Minified Size->${details.stats.minifiedSize} bytes`);
      })
    )
    .pipe(dest(cssOutputFolder));
}

module.exports = {
  runCSSTasksDev: series([cleanCSS, compileSass, copySass]),
  runCSSTasks: series([cleanCSS, compileSass, minifyCSS]),
};
