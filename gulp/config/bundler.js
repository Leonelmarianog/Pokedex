/* eslint-disable import/no-extraneous-dependencies */
const browserify = require('browserify');
const babelify = require('babelify');
const { scripts } = require('./paths');

const browserifyOpts = {
  entries: [`${scripts.input}/index.js`],
  debug: true,
};

const bundler = browserify(browserifyOpts);

// https://stackoverflow.com/questions/61755999/uncaught-referenceerror-regeneratorruntime-is-not-defined-in-react
bundler.transform(
  babelify.configure({
    presets: [['@babel/preset-env']],
    plugins: ['@babel/plugin-transform-runtime'],
  })
);

module.exports = bundler;
