/* eslint-disable import/no-extraneous-dependencies */
const { src, dest } = require('gulp');
const { htmlInputFile, publicRoot } = require('../config/paths');

function copyHTML() {
  return src(htmlInputFile).pipe(dest(publicRoot));
}

module.exports = { copyHTML };
