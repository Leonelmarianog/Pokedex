/* eslint-disable no-console */
const { series, parallel, watch } = require('gulp');
const { runIMGTasks } = require('./gulp/tasks/images');
const { runJSTasks, runJSTasksDev, bundleJS } = require('./gulp/tasks/javascript');
const { runCSSTasks, runCSSTasksDev } = require('./gulp/tasks/stylesheets');
const { copyHTML } = require('./gulp/tasks/markup');
const { startServer } = require('./gulp/tasks/server');
const bundler = require('./gulp/config/bundler');

const isDevelopment = process.env.NODE_ENV === 'development';

const runTasksDev = series([
  parallel([runJSTasksDev, runCSSTasksDev, runIMGTasks, copyHTML]),
  startServer,
]);

const runTasksProd = series([
  parallel([runJSTasks, runCSSTasks, runIMGTasks, copyHTML]),
  startServer,
]);

watch(['./src/sass/**/*.scss'], { usePolling: true }, isDevelopment ? runCSSTasksDev : runCSSTasks);
watch(['./index.html'], { usePolling: true }, copyHTML);
watch(['./src/img/*.jpg', './src/img/*.png'], { usePolling: true }, runIMGTasks);
bundler.on('update', bundleJS);
bundler.on('log', console.log);

exports.default = isDevelopment ? runTasksDev : runTasksProd;
