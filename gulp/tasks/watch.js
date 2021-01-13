/* eslint-disable import/no-extraneous-dependencies */
const { watch } = require('gulp');
const { runIMGTasks } = require('./images');
const { runJSTasks, runJSTasksDev } = require('./javascript');
const { runCSSTasks, runCSSTasksDev } = require('./stylesheets');
const { copyHTML } = require('./markup');

const isDevelopment = process.env.NODE_ENV === 'development';

function runWatch() {
  watch(
    ['./src/sass/**/*.scss'],
    { usePolling: true },
    isDevelopment ? runCSSTasksDev : runCSSTasks
  );
  watch(['./index.html'], { usePolling: true }, copyHTML);
  watch(
    ['./src/js/**/*.js', '!./src/js/**/*.test.js'],
    { usePolling: true },
    isDevelopment ? runJSTasksDev : runJSTasks
  );
  watch(['./src/img/*.jpg', './src/img/*.png'], { usePolling: true }, runIMGTasks);
}

module.exports = runWatch;
