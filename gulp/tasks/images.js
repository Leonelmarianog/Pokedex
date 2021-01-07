/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const { imgOutputFiles, imgInputFiles, imgOutputFolder } = require('../config/paths');

function cleanIMG() {
  return src(imgOutputFiles).pipe(clean());
}

function copyIMG() {
  return src(imgInputFiles).pipe(dest(imgOutputFolder));
}

module.exports = { runIMGTasks: series([cleanIMG, copyIMG]) };
