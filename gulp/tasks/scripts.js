/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');
const bundler = require('../config/bundler');
const { scripts } = require('../config/paths');

function cleanJS() {
  return src(`${scripts.output}/*`).pipe(clean());
}

function bundleJS() {
  return bundler
    .bundle()
    .on('error', console.error)
    .pipe(source('index.js'))
    .pipe(dest(scripts.output));
}

function minifyJS() {
  return src(`${scripts.output}/*.js`).pipe(terser()).pipe(dest(scripts.output));
}

module.exports = {
  runJSTasksDev: series([cleanJS, bundleJS]),
  runJSTasks: series([cleanJS, bundleJS, minifyJS]),
  bundleJS,
};
