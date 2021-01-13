/* eslint-disable import/no-extraneous-dependencies */
const browserify = require('browserify');
const babelify = require('babelify');
const { jsInputFile } = require('./paths');

const browserifyOpts = {
  entries: [jsInputFile],
  debug: true,
};

const bundler = browserify(browserifyOpts);

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
