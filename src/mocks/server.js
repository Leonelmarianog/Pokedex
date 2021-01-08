/* eslint-disable import/no-extraneous-dependencies */
const { setupServer } = require('msw/node');
const handlers = require('./handlers');

const server = setupServer(...handlers);

module.exports = server;
