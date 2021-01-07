/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');
const bundler = require('../config/bundler');
const { jsOutputFiles, jsOutputFolder } = require('../config/paths');

function cleanJS() {
  return src(jsOutputFiles).pipe(clean());
}

function bundleJS() {
  return bundler
    .bundle()
    .on('error', console.error)
    .pipe(source('index.js'))
    .pipe(dest(jsOutputFolder));
}

function minifyJS() {
  return src(jsOutputFiles).pipe(terser()).pipe(dest(jsOutputFolder));
}

module.exports = {
  runJSTasksDev: series([cleanJS, bundleJS]),
  runJSTasks: series([cleanJS, bundleJS, minifyJS]),
  bundleJS,
};
