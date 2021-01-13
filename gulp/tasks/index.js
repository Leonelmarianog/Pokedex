/* eslint-disable import/no-extraneous-dependencies */
const { series, parallel } = require('gulp');
const { runIMGTasks } = require('./images');
const { runJSTasks, runJSTasksDev } = require('./javascript');
const { runCSSTasks, runCSSTasksDev } = require('./stylesheets');
const { copyHTML } = require('./markup');
const { startServer } = require('./server');
const runWatch = require('./watch');

module.exports = {
  runTasksDev: series([
    parallel([runJSTasksDev, runCSSTasksDev, runIMGTasks, copyHTML]),
    startServer,
  ]),
  runTasksProd: series([parallel([runJSTasks, runCSSTasks, runIMGTasks, copyHTML]), startServer]),
  runBuild: parallel([runJSTasks, runCSSTasks, runIMGTasks, copyHTML]),
  runWatch,
};
