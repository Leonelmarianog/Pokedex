/* eslint-disable import/no-extraneous-dependencies */
const { rest } = require('msw');
const fs = require('fs');

const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/:id/', (req, res, ctx) => {
    const { id } = req.params;

    const spectrierJSON = fs.readFileSync(`${__dirname}/fixtures/spectrier.json`, 'utf-8');
    const bulbasaurJSON = fs.readFileSync(`${__dirname}/fixtures/bulbasaur.json`, 'utf-8');
    const ivysaurJSON = fs.readFileSync(`${__dirname}/fixtures/ivysaur.json`, 'utf-8');

    if (Number(id) === 897) {
      return res(ctx.status(200), ctx.body(spectrierJSON));
    }

    if (Number(id) === 1) {
      return res(ctx.status(200), ctx.body(bulbasaurJSON));
    }

    if (Number(id) === 2) {
      return res(ctx.status(200), ctx.body(ivysaurJSON));
    }

    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Resource not found',
      })
    );
  }),
];

module.exports = handlers;
