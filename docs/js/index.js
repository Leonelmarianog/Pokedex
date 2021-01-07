(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPokemon;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @param {String|Number} id - Pokemon Name or Id Number
 * @returns {Object}
 */
function getPokemon(_x) {
  return _getPokemon.apply(this, arguments);
}

function _getPokemon() {
  _getPokemon = _asyncToGenerator(function* (id) {
    var response = yield fetch("https://pokeapi.co/api/v2/pokemon/".concat(id, "/"));

    if (!response.ok) {
      var error = new Error();
      error.image = './img/worried-pikachu.png';
      error.message = 'Sorry, something went wrong! Try again in a few minutes!.';
      throw error;
    }

    var pokemonData = yield response.json();
    return pokemonData;
  });
  return _getPokemon.apply(this, arguments);
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Pokemon {
  /**
   * @param {Object} pokemonData
   * @param {Number} pokemonData.id
   * @param {String} pokemonData.name
   * @param {Number} pokemonData.weight
   * @param {Number} pokemonData.height
   * @param {String} pokemonData.image
   * @param {Array<import('../entities/Type')>} pokemonData.types
   * @param {Array<import('../entities/Stat')>} pokemonData.stats
   */
  constructor(_ref) {
    var {
      id,
      name,
      weight,
      height,
      image,
      types,
      stats
    } = _ref;
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.image = image;
    this.types = types;
    this.stats = stats;
  }

}

exports.default = Pokemon;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Stat {
  /**
   * @param {Object} StatData
   * @param {String} StatData.name
   * @param {Number} StatData.value
   */
  constructor(_ref) {
    var {
      name,
      value
    } = _ref;
    this.name = name;
    this.value = value;
  }

}

exports.default = Stat;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Type {
  /**
   * @param {Object} TypeData
   * @param {String} TypeData.name
   */
  constructor(_ref) {
    var {
      name
    } = _ref;
    this.name = name;
  }

}

exports.default = Type;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Pokemon", {
  enumerable: true,
  get: function get() {
    return _Pokemon.default;
  }
});
Object.defineProperty(exports, "Stat", {
  enumerable: true,
  get: function get() {
    return _Stat.default;
  }
});
Object.defineProperty(exports, "Type", {
  enumerable: true,
  get: function get() {
    return _Type.default;
  }
});

var _Pokemon = _interopRequireDefault(require("./Pokemon.js"));

var _Stat = _interopRequireDefault(require("./Stat.js"));

var _Type = _interopRequireDefault(require("./Type.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./Pokemon.js":2,"./Stat.js":3,"./Type.js":4}],6:[function(require,module,exports){
"use strict";

var _pokedex = _interopRequireDefault(require("./pokedex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _pokedex.default)();

},{"./pokedex.js":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pokemonMapper;

var _index = require("../entities/index.js");

/**
 * @param {Object} statData
 * @returns {import('../entities/Stat')}
 */
function statMapper(statData) {
  var {
    name
  } = statData.stat;
  var {
    base_stat: value
  } = statData;
  return new _index.Stat({
    name,
    value: Number(value)
  });
}
/**
 * @param {Object} typeData
 * @param {String} typeData.name
 * @returns {import('../entities/Type')}
 */


function typeMapper(_ref) {
  var {
    name
  } = _ref;
  return new _index.Type({
    name
  });
}
/**
 * @param {Object} pokemonData
 * @param {string} pokemonData.id
 * @param {String} pokemonData.name
 * @param {String} pokemonData.weight
 * @param {String} pokemonData.height
 * @param {Object} pokemonData.sprites
 * @param {Array<Object>} pokemonData.types
 * @param {Array<Object>} pokemonData.stats
 */


function pokemonMapper(_ref2) {
  var {
    id,
    name,
    height,
    weight,
    sprites,
    types,
    stats
  } = _ref2;
  return new _index.Pokemon({
    id: Number(id),
    name,
    height: Number(height),
    weight: Number(weight),
    image: sprites.front_default,
    types: types.map(obj => typeMapper(obj.type)),
    stats: stats.map(obj => statMapper(obj))
  });
}

},{"../entities/index.js":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _service = _interopRequireDefault(require("./services/service.js"));

var _index = require("./ui/index.js");

var _index2 = require("./utilities/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @returns {Promise<Boolean>}
 */
function loadFirstPokemon() {
  return _loadFirstPokemon.apply(this, arguments);
}
/**
 * @returns {Promise<Boolean>}
 */


function _loadFirstPokemon() {
  _loadFirstPokemon = _asyncToGenerator(function* () {
    (0, _index.setLoading)(true);

    try {
      var pokemon = yield (0, _service.default)(1);
      (0, _index.setLoading)(false);
      (0, _index.displayPokemon)(pokemon);
      return true;
    } catch (error) {
      (0, _index.setLoading)(false);
      (0, _index.showModal)(error.image, error.message);
      return false;
    }
  });
  return _loadFirstPokemon.apply(this, arguments);
}

function loadRequestedPokemon() {
  return _loadRequestedPokemon.apply(this, arguments);
}
/**
 * @param {Object} event - Event Object
 * @returns {Promise<Boolean>}
 */


function _loadRequestedPokemon() {
  _loadRequestedPokemon = _asyncToGenerator(function* () {
    (0, _index.setLoading)(true);

    try {
      var pokemonNameOrId = document.querySelector('#pokemon-input').value.toLowerCase().trim();
      (0, _index2.validateInput)(pokemonNameOrId);
      var pokemon = yield (0, _service.default)(pokemonNameOrId);
      (0, _index.setLoading)(false);
      (0, _index.displayPokemon)(pokemon);
      return true;
    } catch (error) {
      (0, _index.setLoading)(false);
      (0, _index.showModal)(error.image, error.message);
      return false;
    }
  });
  return _loadRequestedPokemon.apply(this, arguments);
}

function loadNewPokemon(_x) {
  return _loadNewPokemon.apply(this, arguments);
}

function _loadNewPokemon() {
  _loadNewPokemon = _asyncToGenerator(function* (event) {
    (0, _index.setLoading)(true);

    try {
      var {
        action
      } = event.currentTarget.dataset;
      var currentPokemonId = Number(document.querySelector('#id').textContent);
      var newPokemonId = (0, _index2.getNewPokemonId)(action, currentPokemonId);
      var pokemon = yield (0, _service.default)(newPokemonId);
      (0, _index.setLoading)(false);
      (0, _index.displayPokemon)(pokemon);
      return true;
    } catch (error) {
      (0, _index.setLoading)(false);
      (0, _index.showModal)(error.image, error.message);
      return false;
    }
  });
  return _loadNewPokemon.apply(this, arguments);
}

function init() {
  loadFirstPokemon();
  document.querySelector('#btn-next').addEventListener('click', loadNewPokemon);
  document.querySelector('#btn-previous').addEventListener('click', loadNewPokemon);
  document.querySelector('#btn-search').addEventListener('click', loadRequestedPokemon);
  document.querySelector('#btn-close-modal').addEventListener('click', _index.closeModal);
}

},{"./services/service.js":9,"./ui/index.js":11,"./utilities/index.js":15}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPokemonByIdOrName;

var _api = _interopRequireDefault(require("../api/api.js"));

var _storage = require("../storage/storage.js");

var _mapper = _interopRequireDefault(require("../mappers/mapper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @param {String|Number} pokemonId - Pokemon Name or Id Number
 * @returns {Promise<import('../entities/Pokemon')>}
 */
function getPokemonByIdOrName(_x) {
  return _getPokemonByIdOrName.apply(this, arguments);
}

function _getPokemonByIdOrName() {
  _getPokemonByIdOrName = _asyncToGenerator(function* (pokemonId) {
    try {
      var pokemonData = (0, _storage.getPokemon)(pokemonId);
      var pokemon = (0, _mapper.default)(pokemonData);
      return pokemon;
    } catch (error) {
      var _pokemonData = yield (0, _api.default)(pokemonId);

      (0, _storage.savePokemon)(_pokemonData);

      var _pokemon = (0, _mapper.default)(_pokemonData);

      return _pokemon;
    }
  });
  return _getPokemonByIdOrName.apply(this, arguments);
}

},{"../api/api.js":1,"../mappers/mapper.js":7,"../storage/storage.js":10}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPokemon = getPokemon;
exports.savePokemon = savePokemon;

/**
 * @param {String|Number} id - Pokemon Name or Id Number
 * @returns {Object}
 */
function getPokemon(id) {
  var pokemonData = JSON.parse(localStorage.getItem(id));

  if (!pokemonData) {
    throw new Error('Pokemon not in storage.');
  }

  return pokemonData;
}
/**
 * @param {Object} pokemonData
 */


function savePokemon(pokemonData) {
  if (!pokemonData) {
    throw new Error('A pokemon is needed in order to save it.');
  }

  try {
    localStorage.setItem("".concat(pokemonData.id), JSON.stringify(pokemonData));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem("".concat(pokemonData.id), JSON.stringify(pokemonData));
  }
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "showModal", {
  enumerable: true,
  get: function get() {
    return _modal.showModal;
  }
});
Object.defineProperty(exports, "closeModal", {
  enumerable: true,
  get: function get() {
    return _modal.closeModal;
  }
});
Object.defineProperty(exports, "setLoading", {
  enumerable: true,
  get: function get() {
    return _textHelpers.default;
  }
});
Object.defineProperty(exports, "displayPokemon", {
  enumerable: true,
  get: function get() {
    return _pokedex.default;
  }
});

var _modal = require("./modal.js");

var _textHelpers = _interopRequireDefault(require("./textHelpers.js"));

var _pokedex = _interopRequireDefault(require("./pokedex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./modal.js":12,"./pokedex.js":13,"./textHelpers.js":14}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showModal = showModal;
exports.closeModal = closeModal;

/**
 * @param {String} image
 * @param {String} message
 */
function showModal(image, message) {
  document.querySelector('#modal-img').src = image;
  document.querySelector('#modal-text').innerText = message;
  document.querySelector('#modal').style.display = 'block';
  document.querySelector('#overlay').style.opacity = '0.5';
}

function closeModal() {
  document.querySelector('#modal').style.display = 'none';
  document.querySelector('#overlay').style.opacity = '0';
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = displayPokemon;

/**
 * @param {Number} id
 * @param {String} name
 * @param {Number} height
 * @param {Number} weight
 * @param {String} image
 */
function displayBasicInfo(id, name, height, weight, image) {
  document.querySelector('#id').textContent = "".concat(id);
  document.querySelector('#name').textContent = "".concat(name);
  document.querySelector('#height').textContent = "".concat(height);
  document.querySelector('#weight').textContent = "".concat(weight);
  document.querySelector('#image').src = image || './img/no-image.png';
}
/**
@param {Array<import('../entities/Type')>} types
 */


function displayTypes(types) {
  var $types = document.querySelector('#types');

  if ($types.children.length !== 0) {
    $types.innerHTML = '';
  }

  for (var i = 0; i < types.length; i += 1) {
    var $type = document.createElement('p');
    $type.textContent = types[i].name;
    $type.className = "pill pill-".concat(types[i].name);
    $types.appendChild($type);
  }
}
/**
 * @param {Array<import('../entities/Stat')>} stats
 */


function displayStats(stats) {
  document.querySelector('#stat-value-hp').textContent = stats[0].value;
  document.querySelector('#stat-fill-hp').style.width = "".concat(Math.min(stats[0].value, 100), "%");
  document.querySelector('#stat-value-attack').textContent = stats[1].value;
  document.querySelector('#stat-fill-attack').style.width = "".concat(Math.min(stats[1].value, 100), "%");
  document.querySelector('#stat-value-defense').textContent = stats[2].value;
  document.querySelector('#stat-fill-defense').style.width = "".concat(Math.min(stats[2].value, 100), "%");
  document.querySelector('#stat-value-speed').textContent = stats[3].value;
  document.querySelector('#stat-fill-speed').style.width = "".concat(Math.min(stats[3].value, 100), "%");
  document.querySelector('#stat-value-sa').textContent = stats[4].value;
  document.querySelector('#stat-fill-sa').style.width = "".concat(Math.min(stats[4].value, 100), "%");
  document.querySelector('#stat-value-sd').textContent = stats[5].value;
  document.querySelector('#stat-fill-sd').style.width = "".concat(Math.min(stats[5].value, 100), "%");
}
/**
 * @param {Object} pokemon - Pokemon entity
 * @param {Number} pokemon.id
 * @param {String} pokemon.name
 * @param {Number} pokemon.height
 * @param {Number} pokemon.weight
 * @param {String} pokemon.image
 * @param {Array<import('../entities/Type')>} pokemon.types
 * @param {Array<import('../entities/Stat')>} pokemon.stats
 */


function displayPokemon(_ref) {
  var {
    id,
    name,
    height,
    weight,
    image,
    types,
    stats
  } = _ref;
  displayBasicInfo(id, name, height, weight, image);
  displayTypes(types);
  displayStats(stats);
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setLoading;

/**
 * @param {Boolean} status
 */
function setLoading(status) {
  if (!status) {
    document.querySelector('#loading').style.display = 'none';
  } else {
    document.querySelector('#loading').style.display = 'block';
  }
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getNewPokemonId", {
  enumerable: true,
  get: function get() {
    return _pagination.default;
  }
});
Object.defineProperty(exports, "validateInput", {
  enumerable: true,
  get: function get() {
    return _validation.default;
  }
});

var _pagination = _interopRequireDefault(require("./pagination.js"));

var _validation = _interopRequireDefault(require("./validation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./pagination.js":16,"./validation.js":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNewPokemonId;

/**
 * @param {Number} currentPokemonId
 * @returns {Number}
 */
function getNextPokemonId(currentPokemonId) {
  var nextPokemonId = currentPokemonId + 1;

  if (nextPokemonId === 899) {
    nextPokemonId = 1;
  }

  return nextPokemonId;
}
/**
 * @param {Number} currentPokemonId
 * @returns {Number}
 */


function getPreviousPokemonId(currentPokemonId) {
  var previousPokemonId = currentPokemonId - 1;

  if (previousPokemonId === 0) {
    previousPokemonId = 898;
  }

  return previousPokemonId;
}
/**
 * @param {String} action - "Next" or "Previous"
 * @param {Number} currentPokemonId
 * @returns {Number}
 */


function getNewPokemonId(action, currentPokemonId) {
  var newPokemonId;

  if (action === 'get-next') {
    newPokemonId = getNextPokemonId(currentPokemonId);
  }

  if (action === 'get-previous') {
    newPokemonId = getPreviousPokemonId(currentPokemonId);
  }

  return newPokemonId;
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateInput;

/**
 * @param {String} input
 * @returns {Boolean}
 */
function validateInput(input) {
  var error = new Error();

  if (input.length === 0) {
    error.image = './img/pikachu-pickaxe.jpg';
    error.message = "Don't mess with the search bar!";
    throw error;
  }

  return true;
}

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBpL2FwaS5qcyIsInNyYy9qcy9lbnRpdGllcy9Qb2tlbW9uLmpzIiwic3JjL2pzL2VudGl0aWVzL1N0YXQuanMiLCJzcmMvanMvZW50aXRpZXMvVHlwZS5qcyIsInNyYy9qcy9lbnRpdGllcy9pbmRleC5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy9tYXBwZXJzL21hcHBlci5qcyIsInNyYy9qcy9wb2tlZGV4LmpzIiwic3JjL2pzL3NlcnZpY2VzL3NlcnZpY2UuanMiLCJzcmMvanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwic3JjL2pzL3VpL2luZGV4LmpzIiwic3JjL2pzL3VpL21vZGFsLmpzIiwic3JjL2pzL3VpL3Bva2VkZXguanMiLCJzcmMvanMvdWkvdGV4dEhlbHBlcnMuanMiLCJzcmMvanMvdXRpbGl0aWVzL2luZGV4LmpzIiwic3JjL2pzL3V0aWxpdGllcy9wYWdpbmF0aW9uLmpzIiwic3JjL2pzL3V0aWxpdGllcy92YWxpZGF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtTQUM4QixVOzs7OztrQ0FBZixXQUEwQixFQUExQixFQUE4QjtBQUMzQyxRQUFNLFFBQVEsU0FBUyxLQUFLLDZDQUFzQyxFQUF0QyxPQUE1Qjs7QUFFQSxRQUFJLENBQUMsUUFBUSxDQUFDLEVBQWQsRUFBa0I7QUFDaEIsVUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFKLEVBQWQ7QUFFQSxNQUFBLEtBQUssQ0FBQyxLQUFOLEdBQWMsMkJBQWQ7QUFDQSxNQUFBLEtBQUssQ0FBQyxPQUFOLEdBQWdCLDJEQUFoQjtBQUVBLFlBQU0sS0FBTjtBQUNEOztBQUVELFFBQU0sV0FBVyxTQUFTLFFBQVEsQ0FBQyxJQUFULEVBQTFCO0FBQ0EsV0FBTyxXQUFQO0FBQ0QsRzs7Ozs7Ozs7Ozs7O0FDbEJjLE1BQU0sT0FBTixD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QUFJLGlCQUFpQixLQUFLLENBQTFCLEVBQTZCO0FBQzNCLElBQUEsaUJBQWlCLEdBQUcsR0FBcEI7QUFDRDs7QUFFRCxTQUFPLGlCQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDZSxTQUFTLGVBQVQsQ0FBeUIsTUFBekIsRUFBaUMsZ0JBQWpDLEVBQW1EO0FBQ2hFLE1BQUksWUFBSjs7QUFFQSxNQUFJLE1BQU0sS0FBSyxVQUFmLEVBQTJCO0FBQ3pCLElBQUEsWUFBWSxHQUFHLGdCQUFnQixDQUFDLGdCQUFELENBQS9CO0FBQ0Q7O0FBRUQsTUFBSSxNQUFNLEtBQUssY0FBZixFQUErQjtBQUM3QixJQUFBLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxnQkFBRCxDQUFuQztBQUNEOztBQUVELFNBQU8sWUFBUDtBQUNEOzs7Ozs7Ozs7O0FDN0NEO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsU0FBUyxhQUFULENBQXVCLEtBQXZCLEVBQThCO0FBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSixFQUFkOztBQUVBLE1BQUksS0FBSyxDQUFDLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsSUFBQSxLQUFLLENBQUMsS0FBTixHQUFjLDJCQUFkO0FBQ0EsSUFBQSxLQUFLLENBQUMsT0FBTixHQUFnQixpQ0FBaEI7QUFFQSxVQUFNLEtBQU47QUFDRDs7QUFFRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGlkIC0gUG9rZW1vbiBOYW1lIG9yIElkIE51bWJlclxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0UG9rZW1vbihpZCkge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkfS9gKTtcclxuXHJcbiAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoKTtcclxuXHJcbiAgICBlcnJvci5pbWFnZSA9ICcuL2ltZy93b3JyaWVkLXBpa2FjaHUucG5nJztcclxuICAgIGVycm9yLm1lc3NhZ2UgPSAnU29ycnksIHNvbWV0aGluZyB3ZW50IHdyb25nISBUcnkgYWdhaW4gaW4gYSBmZXcgbWludXRlcyEuJztcclxuXHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBva2Vtb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gIHJldHVybiBwb2tlbW9uRGF0YTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb2tlbW9uIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwb2tlbW9uRGF0YVxuICAgKiBAcGFyYW0ge051bWJlcn0gcG9rZW1vbkRhdGEuaWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBva2Vtb25EYXRhLm5hbWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHBva2Vtb25EYXRhLndlaWdodFxuICAgKiBAcGFyYW0ge051bWJlcn0gcG9rZW1vbkRhdGEuaGVpZ2h0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwb2tlbW9uRGF0YS5pbWFnZVxuICAgKiBAcGFyYW0ge0FycmF5PGltcG9ydCgnLi4vZW50aXRpZXMvVHlwZScpPn0gcG9rZW1vbkRhdGEudHlwZXNcbiAgICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2VudGl0aWVzL1N0YXQnKT59IHBva2Vtb25EYXRhLnN0YXRzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IGlkLCBuYW1lLCB3ZWlnaHQsIGhlaWdodCwgaW1hZ2UsIHR5cGVzLCBzdGF0cyB9KSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgIHRoaXMudHlwZXMgPSB0eXBlcztcbiAgICB0aGlzLnN0YXRzID0gc3RhdHM7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXQge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IFN0YXREYXRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBTdGF0RGF0YS5uYW1lXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBTdGF0RGF0YS52YWx1ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBuYW1lLCB2YWx1ZSB9KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFR5cGUge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IFR5cGVEYXRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBUeXBlRGF0YS5uYW1lXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IG5hbWUgfSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cbn1cbiIsImltcG9ydCBQb2tlbW9uIGZyb20gJy4vUG9rZW1vbi5qcyc7XG5pbXBvcnQgU3RhdCBmcm9tICcuL1N0YXQuanMnO1xuaW1wb3J0IFR5cGUgZnJvbSAnLi9UeXBlLmpzJztcblxuZXhwb3J0IHsgUG9rZW1vbiwgU3RhdCwgVHlwZSB9O1xuIiwiaW1wb3J0IGluaXQgZnJvbSAnLi9wb2tlZGV4LmpzJztcclxuXHJcbmluaXQoKTtcclxuIiwiaW1wb3J0IHsgUG9rZW1vbiwgU3RhdCwgVHlwZSB9IGZyb20gJy4uL2VudGl0aWVzL2luZGV4LmpzJztcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdERhdGFcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4uL2VudGl0aWVzL1N0YXQnKX1cbiAqL1xuZnVuY3Rpb24gc3RhdE1hcHBlcihzdGF0RGF0YSkge1xuICBjb25zdCB7IG5hbWUgfSA9IHN0YXREYXRhLnN0YXQ7XG4gIGNvbnN0IHsgYmFzZV9zdGF0OiB2YWx1ZSB9ID0gc3RhdERhdGE7XG4gIHJldHVybiBuZXcgU3RhdCh7IG5hbWUsIHZhbHVlOiBOdW1iZXIodmFsdWUpIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlRGF0YVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVEYXRhLm5hbWVcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4uL2VudGl0aWVzL1R5cGUnKX1cbiAqL1xuZnVuY3Rpb24gdHlwZU1hcHBlcih7IG5hbWUgfSkge1xuICByZXR1cm4gbmV3IFR5cGUoeyBuYW1lIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2tlbW9uRGF0YVxuICogQHBhcmFtIHtzdHJpbmd9IHBva2Vtb25EYXRhLmlkXG4gKiBAcGFyYW0ge1N0cmluZ30gcG9rZW1vbkRhdGEubmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHBva2Vtb25EYXRhLndlaWdodFxuICogQHBhcmFtIHtTdHJpbmd9IHBva2Vtb25EYXRhLmhlaWdodFxuICogQHBhcmFtIHtPYmplY3R9IHBva2Vtb25EYXRhLnNwcml0ZXNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gcG9rZW1vbkRhdGEudHlwZXNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gcG9rZW1vbkRhdGEuc3RhdHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9rZW1vbk1hcHBlcih7IGlkLCBuYW1lLCBoZWlnaHQsIHdlaWdodCwgc3ByaXRlcywgdHlwZXMsIHN0YXRzIH0pIHtcbiAgcmV0dXJuIG5ldyBQb2tlbW9uKHtcbiAgICBpZDogTnVtYmVyKGlkKSxcbiAgICBuYW1lLFxuICAgIGhlaWdodDogTnVtYmVyKGhlaWdodCksXG4gICAgd2VpZ2h0OiBOdW1iZXIod2VpZ2h0KSxcbiAgICBpbWFnZTogc3ByaXRlcy5mcm9udF9kZWZhdWx0LFxuICAgIHR5cGVzOiB0eXBlcy5tYXAoKG9iaikgPT4gdHlwZU1hcHBlcihvYmoudHlwZSkpLFxuICAgIHN0YXRzOiBzdGF0cy5tYXAoKG9iaikgPT4gc3RhdE1hcHBlcihvYmopKSxcbiAgfSk7XG59XG4iLCJpbXBvcnQgZ2V0UG9rZW1vbkJ5SWRPck5hbWUgZnJvbSAnLi9zZXJ2aWNlcy9zZXJ2aWNlLmpzJztcbmltcG9ydCB7IHNob3dNb2RhbCwgY2xvc2VNb2RhbCwgc2V0TG9hZGluZywgZGlzcGxheVBva2Vtb24gfSBmcm9tICcuL3VpL2luZGV4LmpzJztcbmltcG9ydCB7IGdldE5ld1Bva2Vtb25JZCwgdmFsaWRhdGVJbnB1dCB9IGZyb20gJy4vdXRpbGl0aWVzL2luZGV4LmpzJztcblxuLyoqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCb29sZWFuPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZEZpcnN0UG9rZW1vbigpIHtcbiAgc2V0TG9hZGluZyh0cnVlKTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwb2tlbW9uID0gYXdhaXQgZ2V0UG9rZW1vbkJ5SWRPck5hbWUoMSk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgZGlzcGxheVBva2Vtb24ocG9rZW1vbik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgc2hvd01vZGFsKGVycm9yLmltYWdlLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxCb29sZWFuPn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZFJlcXVlc3RlZFBva2Vtb24oKSB7XG4gIHNldExvYWRpbmcodHJ1ZSk7XG4gIHRyeSB7XG4gICAgY29uc3QgcG9rZW1vbk5hbWVPcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bva2Vtb24taW5wdXQnKS52YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICB2YWxpZGF0ZUlucHV0KHBva2Vtb25OYW1lT3JJZCk7XG4gICAgY29uc3QgcG9rZW1vbiA9IGF3YWl0IGdldFBva2Vtb25CeUlkT3JOYW1lKHBva2Vtb25OYW1lT3JJZCk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgZGlzcGxheVBva2Vtb24ocG9rZW1vbik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgc2hvd01vZGFsKGVycm9yLmltYWdlLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBFdmVudCBPYmplY3RcbiAqIEByZXR1cm5zIHtQcm9taXNlPEJvb2xlYW4+fVxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkTmV3UG9rZW1vbihldmVudCkge1xuICBzZXRMb2FkaW5nKHRydWUpO1xuICB0cnkge1xuICAgIGNvbnN0IHsgYWN0aW9uIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgY29uc3QgY3VycmVudFBva2Vtb25JZCA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaWQnKS50ZXh0Q29udGVudCk7XG4gICAgY29uc3QgbmV3UG9rZW1vbklkID0gZ2V0TmV3UG9rZW1vbklkKGFjdGlvbiwgY3VycmVudFBva2Vtb25JZCk7XG4gICAgY29uc3QgcG9rZW1vbiA9IGF3YWl0IGdldFBva2Vtb25CeUlkT3JOYW1lKG5ld1Bva2Vtb25JZCk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgZGlzcGxheVBva2Vtb24ocG9rZW1vbik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgc2hvd01vZGFsKGVycm9yLmltYWdlLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgbG9hZEZpcnN0UG9rZW1vbigpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLW5leHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWROZXdQb2tlbW9uKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bi1wcmV2aW91cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZE5ld1Bva2Vtb24pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLXNlYXJjaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZFJlcXVlc3RlZFBva2Vtb24pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuLWNsb3NlLW1vZGFsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU1vZGFsKTtcbn1cbiIsImltcG9ydCBnZXRQb2tlbW9uRnJvbUFQSSBmcm9tICcuLi9hcGkvYXBpLmpzJztcclxuaW1wb3J0IHtcclxuICBnZXRQb2tlbW9uIGFzIGdldFBva2Vtb25Gcm9tU3RvcmFnZSxcclxuICBzYXZlUG9rZW1vbiBhcyBzYXZlUG9rZW1vbkluU3RvcmFnZSxcclxufSBmcm9tICcuLi9zdG9yYWdlL3N0b3JhZ2UuanMnO1xyXG5pbXBvcnQgcG9rZW1vbk1hcHBlciBmcm9tICcuLi9tYXBwZXJzL21hcHBlci5qcyc7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwb2tlbW9uSWQgLSBQb2tlbW9uIE5hbWUgb3IgSWQgTnVtYmVyXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPGltcG9ydCgnLi4vZW50aXRpZXMvUG9rZW1vbicpPn1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFBva2Vtb25CeUlkT3JOYW1lKHBva2Vtb25JZCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwb2tlbW9uRGF0YSA9IGdldFBva2Vtb25Gcm9tU3RvcmFnZShwb2tlbW9uSWQpO1xyXG4gICAgY29uc3QgcG9rZW1vbiA9IHBva2Vtb25NYXBwZXIocG9rZW1vbkRhdGEpO1xyXG4gICAgcmV0dXJuIHBva2Vtb247XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnN0IHBva2Vtb25EYXRhID0gYXdhaXQgZ2V0UG9rZW1vbkZyb21BUEkocG9rZW1vbklkKTtcclxuICAgIHNhdmVQb2tlbW9uSW5TdG9yYWdlKHBva2Vtb25EYXRhKTtcclxuICAgIGNvbnN0IHBva2Vtb24gPSBwb2tlbW9uTWFwcGVyKHBva2Vtb25EYXRhKTtcclxuICAgIHJldHVybiBwb2tlbW9uO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBpZCAtIFBva2Vtb24gTmFtZSBvciBJZCBOdW1iZXJcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQb2tlbW9uKGlkKSB7XHJcbiAgY29uc3QgcG9rZW1vbkRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkKSk7XHJcblxyXG4gIGlmICghcG9rZW1vbkRhdGEpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignUG9rZW1vbiBub3QgaW4gc3RvcmFnZS4nKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwb2tlbW9uRGF0YTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2tlbW9uRGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVQb2tlbW9uKHBva2Vtb25EYXRhKSB7XHJcbiAgaWYgKCFwb2tlbW9uRGF0YSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIHBva2Vtb24gaXMgbmVlZGVkIGluIG9yZGVyIHRvIHNhdmUgaXQuJyk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7cG9rZW1vbkRhdGEuaWR9YCwgSlNPTi5zdHJpbmdpZnkocG9rZW1vbkRhdGEpKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgJHtwb2tlbW9uRGF0YS5pZH1gLCBKU09OLnN0cmluZ2lmeShwb2tlbW9uRGF0YSkpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBzaG93TW9kYWwsIGNsb3NlTW9kYWwgfSBmcm9tICcuL21vZGFsLmpzJztcbmltcG9ydCBzZXRMb2FkaW5nIGZyb20gJy4vdGV4dEhlbHBlcnMuanMnO1xuaW1wb3J0IGRpc3BsYXlQb2tlbW9uIGZyb20gJy4vcG9rZWRleC5qcyc7XG5cbmV4cG9ydCB7IHNob3dNb2RhbCwgY2xvc2VNb2RhbCwgc2V0TG9hZGluZywgZGlzcGxheVBva2Vtb24gfTtcbiIsIi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IGltYWdlXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd01vZGFsKGltYWdlLCBtZXNzYWdlKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbC1pbWcnKS5zcmMgPSBpbWFnZTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsLXRleHQnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3ZlcmxheScpLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG59XG4iLCIvKipcclxuICogQHBhcmFtIHtOdW1iZXJ9IGlkXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHdlaWdodFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gaW1hZ2VcclxuICovXHJcbmZ1bmN0aW9uIGRpc3BsYXlCYXNpY0luZm8oaWQsIG5hbWUsIGhlaWdodCwgd2VpZ2h0LCBpbWFnZSkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpZCcpLnRleHRDb250ZW50ID0gYCR7aWR9YDtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZScpLnRleHRDb250ZW50ID0gYCR7bmFtZX1gO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZWlnaHQnKS50ZXh0Q29udGVudCA9IGAke2hlaWdodH1gO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWlnaHQnKS50ZXh0Q29udGVudCA9IGAke3dlaWdodH1gO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbWFnZScpLnNyYyA9IGltYWdlIHx8ICcuL2ltZy9uby1pbWFnZS5wbmcnO1xyXG59XHJcblxyXG4vKipcclxuQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2VudGl0aWVzL1R5cGUnKT59IHR5cGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBkaXNwbGF5VHlwZXModHlwZXMpIHtcclxuICBjb25zdCAkdHlwZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdHlwZXMnKTtcclxuXHJcbiAgaWYgKCR0eXBlcy5jaGlsZHJlbi5sZW5ndGggIT09IDApIHtcclxuICAgICR0eXBlcy5pbm5lckhUTUwgPSAnJztcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGNvbnN0ICR0eXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgJHR5cGUudGV4dENvbnRlbnQgPSB0eXBlc1tpXS5uYW1lO1xyXG4gICAgJHR5cGUuY2xhc3NOYW1lID0gYHBpbGwgcGlsbC0ke3R5cGVzW2ldLm5hbWV9YDtcclxuICAgICR0eXBlcy5hcHBlbmRDaGlsZCgkdHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2VudGl0aWVzL1N0YXQnKT59IHN0YXRzXHJcbiAqL1xyXG5mdW5jdGlvbiBkaXNwbGF5U3RhdHMoc3RhdHMpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdC12YWx1ZS1ocCcpLnRleHRDb250ZW50ID0gc3RhdHNbMF0udmFsdWU7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXQtZmlsbC1ocCcpLnN0eWxlLndpZHRoID0gYCR7TWF0aC5taW4oc3RhdHNbMF0udmFsdWUsIDEwMCl9JWA7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGF0LXZhbHVlLWF0dGFjaycpLnRleHRDb250ZW50ID0gc3RhdHNbMV0udmFsdWU7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXQtZmlsbC1hdHRhY2snKS5zdHlsZS53aWR0aCA9IGAke01hdGgubWluKHN0YXRzWzFdLnZhbHVlLCAxMDApfSVgO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdC12YWx1ZS1kZWZlbnNlJykudGV4dENvbnRlbnQgPSBzdGF0c1syXS52YWx1ZTtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdC1maWxsLWRlZmVuc2UnKS5zdHlsZS53aWR0aCA9IGAke01hdGgubWluKHN0YXRzWzJdLnZhbHVlLCAxMDApfSVgO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdC12YWx1ZS1zcGVlZCcpLnRleHRDb250ZW50ID0gc3RhdHNbM10udmFsdWU7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXQtZmlsbC1zcGVlZCcpLnN0eWxlLndpZHRoID0gYCR7TWF0aC5taW4oc3RhdHNbM10udmFsdWUsIDEwMCl9JWA7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGF0LXZhbHVlLXNhJykudGV4dENvbnRlbnQgPSBzdGF0c1s0XS52YWx1ZTtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhdC1maWxsLXNhJykuc3R5bGUud2lkdGggPSBgJHtNYXRoLm1pbihzdGF0c1s0XS52YWx1ZSwgMTAwKX0lYDtcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXQtdmFsdWUtc2QnKS50ZXh0Q29udGVudCA9IHN0YXRzWzVdLnZhbHVlO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGF0LWZpbGwtc2QnKS5zdHlsZS53aWR0aCA9IGAke01hdGgubWluKHN0YXRzWzVdLnZhbHVlLCAxMDApfSVgO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtPYmplY3R9IHBva2Vtb24gLSBQb2tlbW9uIGVudGl0eVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcG9rZW1vbi5pZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcG9rZW1vbi5uYW1lXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwb2tlbW9uLmhlaWdodFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcG9rZW1vbi53ZWlnaHRcclxuICogQHBhcmFtIHtTdHJpbmd9IHBva2Vtb24uaW1hZ2VcclxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2VudGl0aWVzL1R5cGUnKT59IHBva2Vtb24udHlwZXNcclxuICogQHBhcmFtIHtBcnJheTxpbXBvcnQoJy4uL2VudGl0aWVzL1N0YXQnKT59IHBva2Vtb24uc3RhdHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXlQb2tlbW9uKHsgaWQsIG5hbWUsIGhlaWdodCwgd2VpZ2h0LCBpbWFnZSwgdHlwZXMsIHN0YXRzIH0pIHtcclxuICBkaXNwbGF5QmFzaWNJbmZvKGlkLCBuYW1lLCBoZWlnaHQsIHdlaWdodCwgaW1hZ2UpO1xyXG4gIGRpc3BsYXlUeXBlcyh0eXBlcyk7XHJcbiAgZGlzcGxheVN0YXRzKHN0YXRzKTtcclxufVxyXG4iLCIvKipcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldExvYWRpbmcoc3RhdHVzKSB7XG4gIGlmICghc3RhdHVzKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkaW5nJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cbn1cbiIsImltcG9ydCBnZXROZXdQb2tlbW9uSWQgZnJvbSAnLi9wYWdpbmF0aW9uLmpzJztcbmltcG9ydCB2YWxpZGF0ZUlucHV0IGZyb20gJy4vdmFsaWRhdGlvbi5qcyc7XG5cbmV4cG9ydCB7IGdldE5ld1Bva2Vtb25JZCwgdmFsaWRhdGVJbnB1dCB9O1xuIiwiLyoqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjdXJyZW50UG9rZW1vbklkXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROZXh0UG9rZW1vbklkKGN1cnJlbnRQb2tlbW9uSWQpIHtcclxuICBsZXQgbmV4dFBva2Vtb25JZCA9IGN1cnJlbnRQb2tlbW9uSWQgKyAxO1xyXG5cclxuICBpZiAobmV4dFBva2Vtb25JZCA9PT0gODk5KSB7XHJcbiAgICBuZXh0UG9rZW1vbklkID0gMTtcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXh0UG9rZW1vbklkO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtOdW1iZXJ9IGN1cnJlbnRQb2tlbW9uSWRcclxuICogQHJldHVybnMge051bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldFByZXZpb3VzUG9rZW1vbklkKGN1cnJlbnRQb2tlbW9uSWQpIHtcclxuICBsZXQgcHJldmlvdXNQb2tlbW9uSWQgPSBjdXJyZW50UG9rZW1vbklkIC0gMTtcclxuXHJcbiAgaWYgKHByZXZpb3VzUG9rZW1vbklkID09PSAwKSB7XHJcbiAgICBwcmV2aW91c1Bva2Vtb25JZCA9IDg5ODtcclxuICB9XHJcblxyXG4gIHJldHVybiBwcmV2aW91c1Bva2Vtb25JZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb24gLSBcIk5leHRcIiBvciBcIlByZXZpb3VzXCJcclxuICogQHBhcmFtIHtOdW1iZXJ9IGN1cnJlbnRQb2tlbW9uSWRcclxuICogQHJldHVybnMge051bWJlcn1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5ld1Bva2Vtb25JZChhY3Rpb24sIGN1cnJlbnRQb2tlbW9uSWQpIHtcclxuICBsZXQgbmV3UG9rZW1vbklkO1xyXG5cclxuICBpZiAoYWN0aW9uID09PSAnZ2V0LW5leHQnKSB7XHJcbiAgICBuZXdQb2tlbW9uSWQgPSBnZXROZXh0UG9rZW1vbklkKGN1cnJlbnRQb2tlbW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFjdGlvbiA9PT0gJ2dldC1wcmV2aW91cycpIHtcclxuICAgIG5ld1Bva2Vtb25JZCA9IGdldFByZXZpb3VzUG9rZW1vbklkKGN1cnJlbnRQb2tlbW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ld1Bva2Vtb25JZDtcclxufVxyXG4iLCIvKipcclxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XHJcbiAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChpbnB1dCkge1xyXG4gIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCk7XHJcblxyXG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcclxuICAgIGVycm9yLmltYWdlID0gJy4vaW1nL3Bpa2FjaHUtcGlja2F4ZS5qcGcnO1xyXG4gICAgZXJyb3IubWVzc2FnZSA9IFwiRG9uJ3QgbWVzcyB3aXRoIHRoZSBzZWFyY2ggYmFyIVwiO1xyXG5cclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuIl19
