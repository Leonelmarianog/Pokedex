/* eslint-disable import/no-extraneous-dependencies */
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const { jsInputFile } = require('./paths');

const browserifyOpts = {
  entries: [jsInputFile],
  cache: {},
  packageCache: {},
  debug: true,
};

const bundler = watchify(browserify(browserifyOpts));

bundler.transform(
  babelify.configure({
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
  })
);

module.exports = bundler;
