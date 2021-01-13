const { runTasksDev, runTasksProd, runBuild, runWatch } = require('./gulp/tasks');

if (!process.env.BUILD) {
  runWatch();
}

exports.build = runBuild;
exports.default = process.env.NODE_ENV === 'development' ? runTasksDev : runTasksProd;
