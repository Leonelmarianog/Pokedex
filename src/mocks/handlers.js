/* eslint-disable import/no-extraneous-dependencies */
const { rest } = require('msw');
const fs = require('fs');

const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon/:id/', (req, res, ctx) => {
    const { id } = req.params;

    if (!(Number(id) === 25)) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Resource not found',
        })
      );
    }

    const pokemonData = fs.readFileSync(`${__dirname}/fixtures/pikachu.json`, 'utf-8');
    return res(ctx.status(200), ctx.body(pokemonData));
  }),
];

module.exports = handlers;
