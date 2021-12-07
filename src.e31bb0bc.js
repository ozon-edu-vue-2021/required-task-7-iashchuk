// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../public/data.json":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Петя",
  "friends": [10, 2, 6]
}, {
  "id": 2,
  "name": "Вася",
  "friends": [5, 1, 3]
}, {
  "id": 3,
  "name": "Оля",
  "friends": [9, 4, 3]
}, {
  "id": 4,
  "name": "Максим",
  "friends": [11, 12, 2]
}, {
  "id": 5,
  "name": "Елена",
  "friends": [7, 8, 4]
}, {
  "id": 6,
  "name": "Иван",
  "friends": [6, 1, 12]
}, {
  "id": 7,
  "name": "Никита",
  "friends": [1, 8, 5]
}, {
  "id": 8,
  "name": "Марат",
  "friends": [11, 12, 10]
}, {
  "id": 9,
  "name": "Анатолий",
  "friends": [1, 2, 3]
}, {
  "id": 10,
  "name": "Наташа",
  "friends": [8, 4, 2]
}, {
  "id": 11,
  "name": "Марина",
  "friends": [1, 5, 8]
}, {
  "id": 12,
  "name": "Кирилл",
  "friends": [5, 2, 12]
}];
},{}],"constants/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGES = exports.MAX_PERSON_IN_SUBLIST = void 0;
var PAGES = {
  LIST: 'list',
  DETAILS: 'details',
  NOT_FOUND: 'not-found'
};
exports.PAGES = PAGES;
var MAX_PERSON_IN_SUBLIST = 3;
exports.MAX_PERSON_IN_SUBLIST = MAX_PERSON_IN_SUBLIST;
},{}],"views/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderListView = void 0;

var renderPerson = function renderPerson(person) {
  return "\n    <li class=\"persons__item\" data-id=".concat(person.id, ">\n        <strong>").concat(person.name, "</strong>\n    </li>\n");
};

var renderView = function renderView(markup) {
  return "\n    <div class=\"list-view\">\n        <div class=\"background\"></div>\n        <ul class=\"persons\">\n            ".concat(markup.join(''), "\n        </ul>\n    </div>\n");
};

var renderListView = function renderListView(_ref) {
  var contacts = _ref.contacts;
  var container = document.querySelector('.container');
  var personsMarkup = contacts.map(renderPerson);
  container.innerHTML = renderView(personsMarkup);
};

exports.renderListView = renderListView;
},{}],"views/details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDetailsView = void 0;

var getRenderPerson = function getRenderPerson(contactsDictionary) {
  return function (personId) {
    var value = contactsDictionary[personId];

    if (!value) {
      return '';
    }

    return "\n    <li class=\"contacts__item\"}>\n        <i class=\"fa fa-male contacts__icon\"></i>\n        <span>".concat(value.name, "</span>\n    </li>\n");
  };
};

var renderView = function renderView(_ref) {
  var name = _ref.name,
      friends = _ref.friends,
      notFriends = _ref.notFriends,
      popular = _ref.popular;
  return "\n    <div class=\"details-view\">\n        <div class=\"background details__background\">\n          <div class=\"arrow details__arrow\"></div>\n          <div class=\"avatar details__avatar\"></div>\n          <div class=\"details__name\">".concat(name, "</div>\n        </div>\n        <ul class=\"contacts\">\n            <li class=\"contacts__item contacts__item_title\">\u0414\u0440\u0443\u0437\u044C\u044F</li>\n            ").concat(friends.join(''), "\n            <li class=\"contacts__item contacts__item_title\">\u041D\u0435 \u0432 \u0434\u0440\u0443\u0437\u044C\u044F\u0445</li>\n            ").concat(notFriends.join(''), "\n            <li class=\"contacts__item contacts__item_title\">\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043B\u044E\u0434\u0438</li>\n            ").concat(popular.join(''), "\n        </ul>\n    </div>\n");
};

var renderDetailsView = function renderDetailsView(_ref2) {
  var person = _ref2.person,
      contactsDictionary = _ref2.contactsDictionary,
      rankedPersonsByFriends = _ref2.rankedPersonsByFriends;
  var container = document.querySelector('.container');
  var renderPerson = getRenderPerson(contactsDictionary);
  var friends = person.friends.map(renderPerson);
  var notFriends = person.notFriends.map(renderPerson);
  var popular = rankedPersonsByFriends.map(renderPerson);
  container.innerHTML = renderView({
    name: person.name,
    friends: friends,
    notFriends: notFriends,
    popular: popular
  });
};

exports.renderDetailsView = renderDetailsView;
},{}],"views/not-found.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNotFound = void 0;

var renderView = function renderView() {
  return "\n    <div class=\"notfound-view\">\n        <div class=\"background\">\n            <div class=\"arrow\"></div>\n        </div>\n        <p class=\"notfound__text\">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>\n    </div>\n";
};

var renderNotFound = function renderNotFound() {
  var container = document.querySelector('.container');
  container.innerHTML = renderView();
};

exports.renderNotFound = renderNotFound;
},{}],"views/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "renderDetailsView", {
  enumerable: true,
  get: function () {
    return _details.renderDetailsView;
  }
});
Object.defineProperty(exports, "renderListView", {
  enumerable: true,
  get: function () {
    return _list.renderListView;
  }
});
Object.defineProperty(exports, "renderNotFound", {
  enumerable: true,
  get: function () {
    return _notFound.renderNotFound;
  }
});

var _list = require("./list");

var _details = require("./details");

var _notFound = require("./not-found");
},{"./list":"views/list.js","./details":"views/details.js","./not-found":"views/not-found.js"}],"controllers/details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDetailsHandlers = void 0;

var _constants = require("../constants");

var handleArrowClick = function handleArrowClick(state) {
  return function () {
    state.page = _constants.PAGES.LIST;
  };
};

var addDetailsHandlers = function addDetailsHandlers(state) {
  var arrow = document.querySelector('.arrow');
  var onArrowClick = handleArrowClick(state);
  arrow.addEventListener('click', onArrowClick);
  return function () {
    arrow.removeEventListener('click', onArrowClick);
  };
};

exports.addDetailsHandlers = addDetailsHandlers;
},{"../constants":"constants/index.js"}],"controllers/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListHandlers = void 0;

var _constants = require("../constants");

var handlePersonClick = function handlePersonClick(state) {
  return function (evt) {
    if (!evt.target.dataset.id) {
      return;
    }

    state.currentPersonId = Number(evt.target.dataset.id);
    state.page = _constants.PAGES.DETAILS;
  };
};

var addListHandlers = function addListHandlers(state) {
  var persons = document.querySelector('.persons');
  var onPersonClick = handlePersonClick(state);
  persons.addEventListener('click', onPersonClick);
  return function () {
    persons.removeEventListener('click', onPersonClick);
  };
};

exports.addListHandlers = addListHandlers;
},{"../constants":"constants/index.js"}],"controllers/not-found.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNotFoundHandlers = void 0;

var _constants = require("../constants");

var handleArrowClick = function handleArrowClick(state) {
  return function () {
    state.page = _constants.PAGES.LIST;
  };
};

var addNotFoundHandlers = function addNotFoundHandlers(state) {
  var arrow = document.querySelector('.arrow');
  var onArrowClick = handleArrowClick(state);
  arrow.addEventListener('click', onArrowClick);
  return function () {
    arrow.removeEventListener('click', onArrowClick);
  };
};

exports.addNotFoundHandlers = addNotFoundHandlers;
},{"../constants":"constants/index.js"}],"controllers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "addDetailsHandlers", {
  enumerable: true,
  get: function () {
    return _details.addDetailsHandlers;
  }
});
Object.defineProperty(exports, "addListHandlers", {
  enumerable: true,
  get: function () {
    return _list.addListHandlers;
  }
});
Object.defineProperty(exports, "addNotFoundHandlers", {
  enumerable: true,
  get: function () {
    return _notFound.addNotFoundHandlers;
  }
});

var _details = require("./details");

var _list = require("./list");

var _notFound = require("./not-found");
},{"./details":"controllers/details.js","./list":"controllers/list.js","./not-found":"controllers/not-found.js"}],"router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _views = require("./views");

var _controllers = require("./controllers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var beforeUnmount = function beforeUnmount() {};

var _default = function _default(state) {
  var page = state.page;
  beforeUnmount();

  if (page === _constants.PAGES.LIST) {
    (0, _views.renderListView)(state);
    beforeUnmount = (0, _controllers.addListHandlers)(state);
    return;
  }

  if (page === _constants.PAGES.DETAILS) {
    var person = state.contactsDictionary[state.currentPersonId];

    if (person) {
      (0, _views.renderDetailsView)(_objectSpread(_objectSpread({}, state), {}, {
        person: person
      }));
      beforeUnmount = (0, _controllers.addDetailsHandlers)(state);
      return;
    }
  }

  (0, _views.renderNotFound)();
  beforeUnmount = (0, _controllers.addNotFoundHandlers)(state);
};

exports.default = _default;
},{"./constants":"constants/index.js","./views":"views/index.js","./controllers":"controllers/index.js"}],"../node_modules/on-change/lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSUBSCRIBE = exports.TARGET = exports.PATH_SEPARATOR = void 0;
var PATH_SEPARATOR = '.';
exports.PATH_SEPARATOR = PATH_SEPARATOR;
var TARGET = Symbol('target');
exports.TARGET = TARGET;
var UNSUBSCRIBE = Symbol('unsubscribe');
exports.UNSUBSCRIBE = UNSUBSCRIBE;
},{}],"../node_modules/on-change/lib/is-builtin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBuiltinWithMutableMethods = isBuiltinWithMutableMethods;
exports.isBuiltinWithoutMutableMethods = isBuiltinWithoutMutableMethods;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isBuiltinWithMutableMethods(value) {
  return value instanceof Date || value instanceof Set || value instanceof Map || value instanceof WeakSet || value instanceof WeakMap || ArrayBuffer.isView(value);
}

function isBuiltinWithoutMutableMethods(value) {
  return (_typeof(value) === 'object' ? value === null : typeof value !== 'function') || value instanceof RegExp;
}
},{}],"../node_modules/on-change/lib/is-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = Array.isArray;
exports.default = _default;
},{}],"../node_modules/on-change/lib/is-symbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSymbol;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isSymbol(value) {
  return _typeof(value) === 'symbol';
}
},{}],"../node_modules/on-change/lib/path.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants.js");

var _isArray = _interopRequireDefault(require("./is-array.js"));

var _isSymbol = _interopRequireDefault(require("./is-symbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var path = {
  after: function after(path, subPath) {
    if ((0, _isArray.default)(path)) {
      return path.slice(subPath.length);
    }

    if (subPath === '') {
      return path;
    }

    return path.slice(subPath.length + 1);
  },
  concat: function concat(path, key) {
    if ((0, _isArray.default)(path)) {
      path = _toConsumableArray(path);

      if (key) {
        path.push(key);
      }

      return path;
    }

    if (key && key.toString !== undefined) {
      if (path !== '') {
        path += _constants.PATH_SEPARATOR;
      }

      if ((0, _isSymbol.default)(key)) {
        return path + key.toString();
      }

      return path + key;
    }

    return path;
  },
  initial: function initial(path) {
    if ((0, _isArray.default)(path)) {
      return path.slice(0, -1);
    }

    if (path === '') {
      return path;
    }

    var index = path.lastIndexOf(_constants.PATH_SEPARATOR);

    if (index === -1) {
      return '';
    }

    return path.slice(0, index);
  },
  last: function last(path) {
    if ((0, _isArray.default)(path)) {
      return path[path.length - 1] || '';
    }

    if (path === '') {
      return path;
    }

    var index = path.lastIndexOf(_constants.PATH_SEPARATOR);

    if (index === -1) {
      return path;
    }

    return path.slice(index + 1);
  },
  walk: function walk(path, callback) {
    if ((0, _isArray.default)(path)) {
      var _iterator = _createForOfIteratorHelper(path),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          callback(key);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (path !== '') {
      var position = 0;
      var index = path.indexOf(_constants.PATH_SEPARATOR);

      if (index === -1) {
        callback(path);
      } else {
        while (position < path.length) {
          if (index === -1) {
            index = path.length;
          }

          callback(path.slice(position, index));
          position = index + 1;
          index = path.indexOf(_constants.PATH_SEPARATOR, position);
        }
      }
    }
  },
  get: function get(object, path) {
    this.walk(path, function (key) {
      if (object) {
        object = object[key];
      }
    });
    return object;
  }
};
var _default = path;
exports.default = _default;
},{"./constants.js":"../node_modules/on-change/lib/constants.js","./is-array.js":"../node_modules/on-change/lib/is-array.js","./is-symbol.js":"../node_modules/on-change/lib/is-symbol.js"}],"../node_modules/on-change/lib/is-iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIterator;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isIterator(value) {
  return _typeof(value) === 'object' && typeof value.next === 'function';
}
},{}],"../node_modules/on-change/lib/wrap-iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapIterator;

var _constants = require("./constants.js");

// eslint-disable-next-line max-params
function wrapIterator(iterator, target, thisArg, applyPath, prepareValue) {
  var originalNext = iterator.next;

  if (target.name === 'entries') {
    iterator.next = function () {
      var result = originalNext.call(this);

      if (result.done === false) {
        result.value[0] = prepareValue(result.value[0], target, result.value[0], applyPath);
        result.value[1] = prepareValue(result.value[1], target, result.value[0], applyPath);
      }

      return result;
    };
  } else if (target.name === 'values') {
    var keyIterator = thisArg[_constants.TARGET].keys();

    iterator.next = function () {
      var result = originalNext.call(this);

      if (result.done === false) {
        result.value = prepareValue(result.value, target, keyIterator.next().value, applyPath);
      }

      return result;
    };
  } else {
    iterator.next = function () {
      var result = originalNext.call(this);

      if (result.done === false) {
        result.value = prepareValue(result.value, target, result.value, applyPath);
      }

      return result;
    };
  }

  return iterator;
}
},{"./constants.js":"../node_modules/on-change/lib/constants.js"}],"../node_modules/on-change/lib/ignore-property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ignoreProperty;

var _isSymbol = _interopRequireDefault(require("./is-symbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ignoreProperty(cache, options, property) {
  return cache.isUnsubscribed || options.ignoreSymbols && (0, _isSymbol.default)(property) || options.ignoreUnderscores && property.charAt(0) === '_' || 'ignoreKeys' in options && options.ignoreKeys.includes(property);
}
},{"./is-symbol.js":"../node_modules/on-change/lib/is-symbol.js"}],"../node_modules/on-change/lib/cache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("./path.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
@class Cache
@private
*/
var Cache = /*#__PURE__*/function () {
  function Cache(equals) {
    _classCallCheck(this, Cache);

    this._equals = equals;
    this._proxyCache = new WeakMap();
    this._pathCache = new WeakMap();
    this.isUnsubscribed = false;
  }

  _createClass(Cache, [{
    key: "_getDescriptorCache",
    value: function _getDescriptorCache() {
      if (this._descriptorCache === undefined) {
        this._descriptorCache = new WeakMap();
      }

      return this._descriptorCache;
    }
  }, {
    key: "_getProperties",
    value: function _getProperties(target) {
      var descriptorCache = this._getDescriptorCache();

      var properties = descriptorCache.get(target);

      if (properties === undefined) {
        properties = {};
        descriptorCache.set(target, properties);
      }

      return properties;
    }
  }, {
    key: "_getOwnPropertyDescriptor",
    value: function _getOwnPropertyDescriptor(target, property) {
      if (this.isUnsubscribed) {
        return Reflect.getOwnPropertyDescriptor(target, property);
      }

      var properties = this._getProperties(target);

      var descriptor = properties[property];

      if (descriptor === undefined) {
        descriptor = Reflect.getOwnPropertyDescriptor(target, property);
        properties[property] = descriptor;
      }

      return descriptor;
    }
  }, {
    key: "getProxy",
    value: function getProxy(target, path, handler, proxyTarget) {
      if (this.isUnsubscribed) {
        return target;
      }

      var reflectTarget = target[proxyTarget];
      var source = reflectTarget || target;

      this._pathCache.set(source, path);

      var proxy = this._proxyCache.get(source);

      if (proxy === undefined) {
        proxy = reflectTarget === undefined ? new Proxy(target, handler) : target;

        this._proxyCache.set(source, proxy);
      }

      return proxy;
    }
  }, {
    key: "getPath",
    value: function getPath(target) {
      return this.isUnsubscribed ? undefined : this._pathCache.get(target);
    }
  }, {
    key: "isDetached",
    value: function isDetached(target, object) {
      return !Object.is(target, _path.default.get(object, this.getPath(target)));
    }
  }, {
    key: "defineProperty",
    value: function defineProperty(target, property, descriptor) {
      if (!Reflect.defineProperty(target, property, descriptor)) {
        return false;
      }

      if (!this.isUnsubscribed) {
        this._getProperties(target)[property] = descriptor;
      }

      return true;
    }
  }, {
    key: "setProperty",
    value: function setProperty(target, property, value, receiver, previous) {
      // eslint-disable-line max-params
      if (!this._equals(previous, value) || !(property in target)) {
        var descriptor = this._getOwnPropertyDescriptor(target, property);

        if (descriptor !== undefined && 'set' in descriptor) {
          return Reflect.set(target, property, value, receiver);
        }

        return Reflect.set(target, property, value);
      }

      return true;
    }
  }, {
    key: "deleteProperty",
    value: function deleteProperty(target, property, previous) {
      if (Reflect.deleteProperty(target, property)) {
        if (!this.isUnsubscribed) {
          var properties = this._getDescriptorCache().get(target);

          if (properties) {
            delete properties[property];

            this._pathCache.delete(previous);
          }
        }

        return true;
      }

      return false;
    }
  }, {
    key: "isSameDescriptor",
    value: function isSameDescriptor(a, target, property) {
      var b = this._getOwnPropertyDescriptor(target, property);

      return a !== undefined && b !== undefined && Object.is(a.value, b.value) && (a.writable || false) === (b.writable || false) && (a.enumerable || false) === (b.enumerable || false) && (a.configurable || false) === (b.configurable || false) && a.get === b.get && a.set === b.set;
    }
  }, {
    key: "isGetInvariant",
    value: function isGetInvariant(target, property) {
      var descriptor = this._getOwnPropertyDescriptor(target, property);

      return descriptor !== undefined && descriptor.configurable !== true && descriptor.writable !== true;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this._descriptorCache = null;
      this._pathCache = null;
      this._proxyCache = null;
      this.isUnsubscribed = true;
    }
  }]);

  return Cache;
}();

exports.default = Cache;
},{"./path.js":"../node_modules/on-change/lib/path.js"}],"../node_modules/on-change/lib/is-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

function isObject(value) {
  return toString.call(value) === '[object Object]';
}
},{}],"../node_modules/on-change/lib/smart-clone/diff/is-diff-certain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDiffCertain;

function isDiffCertain() {
  return true;
}
},{}],"../node_modules/on-change/lib/smart-clone/diff/is-diff-arrays.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDiffArrays;

function isDiffArrays(clone, value) {
  return clone.length !== value.length || clone.some(function (item, index) {
    return value[index] !== item;
  });
}
},{}],"../node_modules/on-change/lib/smart-clone/methods/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMMUTABLE_OBJECT_METHODS = void 0;
var IMMUTABLE_OBJECT_METHODS = new Set(['hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf']);
exports.IMMUTABLE_OBJECT_METHODS = IMMUTABLE_OBJECT_METHODS;
},{}],"../node_modules/on-change/lib/smart-clone/methods/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MUTABLE_ARRAY_METHODS = exports.HANDLED_ARRAY_METHODS = void 0;

var _isDiffCertain = _interopRequireDefault(require("../diff/is-diff-certain.js"));

var _isDiffArrays = _interopRequireDefault(require("../diff/is-diff-arrays.js"));

var _object = require("./object.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var IMMUTABLE_ARRAY_METHODS = new Set(['concat', 'includes', 'indexOf', 'join', 'keys', 'lastIndexOf']);
var MUTABLE_ARRAY_METHODS = {
  push: _isDiffCertain.default,
  pop: _isDiffCertain.default,
  shift: _isDiffCertain.default,
  unshift: _isDiffCertain.default,
  copyWithin: _isDiffArrays.default,
  reverse: _isDiffArrays.default,
  sort: _isDiffArrays.default,
  splice: _isDiffArrays.default,
  flat: _isDiffArrays.default,
  fill: _isDiffArrays.default
};
exports.MUTABLE_ARRAY_METHODS = MUTABLE_ARRAY_METHODS;
var HANDLED_ARRAY_METHODS = new Set([].concat(_toConsumableArray(_object.IMMUTABLE_OBJECT_METHODS), _toConsumableArray(IMMUTABLE_ARRAY_METHODS), _toConsumableArray(Object.keys(MUTABLE_ARRAY_METHODS))));
exports.HANDLED_ARRAY_METHODS = HANDLED_ARRAY_METHODS;
},{"../diff/is-diff-certain.js":"../node_modules/on-change/lib/smart-clone/diff/is-diff-certain.js","../diff/is-diff-arrays.js":"../node_modules/on-change/lib/smart-clone/diff/is-diff-arrays.js","./object.js":"../node_modules/on-change/lib/smart-clone/methods/object.js"}],"../node_modules/on-change/lib/smart-clone/diff/is-diff-sets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDiffSets;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isDiffSets(clone, value) {
  if (clone.size !== value.size) {
    return true;
  }

  var _iterator = _createForOfIteratorHelper(clone),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;

      if (!value.has(element)) {
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
}
},{}],"../node_modules/on-change/lib/smart-clone/methods/set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MUTABLE_SET_METHODS = exports.IMMUTABLE_SET_METHODS = exports.HANDLED_SET_METHODS = exports.COLLECTION_ITERATOR_METHODS = void 0;

var _isDiffSets = _interopRequireDefault(require("../diff/is-diff-sets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var COLLECTION_ITERATOR_METHODS = ['keys', 'values', 'entries'];
exports.COLLECTION_ITERATOR_METHODS = COLLECTION_ITERATOR_METHODS;
var IMMUTABLE_SET_METHODS = new Set(['has', 'toString']);
exports.IMMUTABLE_SET_METHODS = IMMUTABLE_SET_METHODS;
var MUTABLE_SET_METHODS = {
  add: _isDiffSets.default,
  clear: _isDiffSets.default,
  delete: _isDiffSets.default,
  forEach: _isDiffSets.default
};
exports.MUTABLE_SET_METHODS = MUTABLE_SET_METHODS;
var HANDLED_SET_METHODS = new Set([].concat(_toConsumableArray(IMMUTABLE_SET_METHODS), _toConsumableArray(Object.keys(MUTABLE_SET_METHODS)), COLLECTION_ITERATOR_METHODS));
exports.HANDLED_SET_METHODS = HANDLED_SET_METHODS;
},{"../diff/is-diff-sets.js":"../node_modules/on-change/lib/smart-clone/diff/is-diff-sets.js"}],"../node_modules/on-change/lib/smart-clone/diff/is-diff-maps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDiffMaps;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isDiffMaps(clone, value) {
  if (clone.size !== value.size) {
    return true;
  }

  var bValue;

  var _iterator = _createForOfIteratorHelper(clone),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          aValue = _step$value[1];

      bValue = value.get(key);

      if (bValue !== aValue || bValue === undefined && !value.has(key)) {
        return true;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return false;
}
},{}],"../node_modules/on-change/lib/smart-clone/methods/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MUTABLE_MAP_METHODS = exports.HANDLED_MAP_METHODS = void 0;

var _isDiffMaps = _interopRequireDefault(require("../diff/is-diff-maps.js"));

var _set = require("./set.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var IMMUTABLE_MAP_METHODS = new Set([].concat(_toConsumableArray(_set.IMMUTABLE_SET_METHODS), ['get']));
var MUTABLE_MAP_METHODS = {
  set: _isDiffMaps.default,
  clear: _isDiffMaps.default,
  delete: _isDiffMaps.default,
  forEach: _isDiffMaps.default
};
exports.MUTABLE_MAP_METHODS = MUTABLE_MAP_METHODS;
var HANDLED_MAP_METHODS = new Set([].concat(_toConsumableArray(IMMUTABLE_MAP_METHODS), _toConsumableArray(Object.keys(MUTABLE_MAP_METHODS)), _toConsumableArray(_set.COLLECTION_ITERATOR_METHODS)));
exports.HANDLED_MAP_METHODS = HANDLED_MAP_METHODS;
},{"../diff/is-diff-maps.js":"../node_modules/on-change/lib/smart-clone/diff/is-diff-maps.js","./set.js":"../node_modules/on-change/lib/smart-clone/methods/set.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("../../path.js"));

var _isArray = _interopRequireDefault(require("../../is-array.js"));

var _isObject = _interopRequireDefault(require("../../is-object.js"));

var _array = require("../methods/array.js");

var _set = require("../methods/set.js");

var _map = require("../methods/map.js");

var _object = require("../methods/object.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CloneObject = /*#__PURE__*/function () {
  function CloneObject(value, path, argumentsList, hasOnValidate) {
    _classCallCheck(this, CloneObject);

    this._path = path;
    this._isChanged = false;
    this._clonedCache = new Set();
    this._hasOnValidate = hasOnValidate;
    this._changes = hasOnValidate ? [] : null;
    this.clone = path === undefined ? value : this._shallowClone(value);
  }

  _createClass(CloneObject, [{
    key: "_shallowClone",
    value: function _shallowClone(value) {
      var _this = this;

      var clone = value;

      if ((0, _isObject.default)(value)) {
        clone = _objectSpread({}, value);
      } else if ((0, _isArray.default)(value)) {
        clone = _toConsumableArray(value);
      } else if (value instanceof Date) {
        clone = new Date(value);
      } else if (value instanceof Set) {
        clone = new Set(_toConsumableArray(value).map(function (item) {
          return _this._shallowClone(item);
        }));
      } else if (value instanceof Map) {
        clone = new Map();

        var _iterator = _createForOfIteratorHelper(value.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                item = _step$value[1];

            clone.set(key, this._shallowClone(item));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this._clonedCache.add(clone);

      return clone;
    }
  }, {
    key: "preferredThisArg",
    value: function preferredThisArg(isHandledMethod, name, thisArg, thisProxyTarget) {
      if (isHandledMethod) {
        if ((0, _isArray.default)(thisProxyTarget)) {
          this._onIsChanged = _array.MUTABLE_ARRAY_METHODS[name];
        } else if (thisProxyTarget instanceof Set) {
          this._onIsChanged = _set.MUTABLE_SET_METHODS[name];
        } else if (thisProxyTarget instanceof Map) {
          this._onIsChanged = _map.MUTABLE_MAP_METHODS[name];
        }

        return thisProxyTarget;
      }

      return thisArg;
    }
  }, {
    key: "update",
    value: function update(fullPath, property, value) {
      var _this2 = this;

      var changePath = _path.default.after(fullPath, this._path);

      if (property !== 'length') {
        var object = this.clone;

        _path.default.walk(changePath, function (key) {
          if (object && object[key]) {
            if (!_this2._clonedCache.has(object[key])) {
              object[key] = _this2._shallowClone(object[key]);
            }

            object = object[key];
          }
        });

        if (this._hasOnValidate) {
          this._changes.push({
            path: changePath,
            property: property,
            previous: value
          });
        }

        if (object && object[property]) {
          object[property] = value;
        }
      }

      this._isChanged = true;
    }
  }, {
    key: "undo",
    value: function undo(object) {
      var change;

      for (var index = this._changes.length - 1; index !== -1; index--) {
        change = this._changes[index];
        _path.default.get(object, change.path)[change.property] = change.previous;
      }
    }
  }, {
    key: "isChanged",
    value: function isChanged(value) {
      return this._onIsChanged === undefined ? this._isChanged : this._onIsChanged(this.clone, value);
    }
  }], [{
    key: "isHandledMethod",
    value: function isHandledMethod(name) {
      return _object.IMMUTABLE_OBJECT_METHODS.has(name);
    }
  }]);

  return CloneObject;
}();

exports.default = CloneObject;
},{"../../path.js":"../node_modules/on-change/lib/path.js","../../is-array.js":"../node_modules/on-change/lib/is-array.js","../../is-object.js":"../node_modules/on-change/lib/is-object.js","../methods/array.js":"../node_modules/on-change/lib/smart-clone/methods/array.js","../methods/set.js":"../node_modules/on-change/lib/smart-clone/methods/set.js","../methods/map.js":"../node_modules/on-change/lib/smart-clone/methods/map.js","../methods/object.js":"../node_modules/on-change/lib/smart-clone/methods/object.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _array = require("../methods/array.js");

var _cloneObject = _interopRequireDefault(require("./clone-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CloneArray = /*#__PURE__*/function (_CloneObject) {
  _inherits(CloneArray, _CloneObject);

  var _super = _createSuper(CloneArray);

  function CloneArray() {
    _classCallCheck(this, CloneArray);

    return _super.apply(this, arguments);
  }

  _createClass(CloneArray, null, [{
    key: "isHandledMethod",
    value: function isHandledMethod(name) {
      return _array.HANDLED_ARRAY_METHODS.has(name);
    }
  }]);

  return CloneArray;
}(_cloneObject.default);

exports.default = CloneArray;
},{"../methods/array.js":"../node_modules/on-change/lib/smart-clone/methods/array.js","./clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneObject = _interopRequireDefault(require("./clone-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CloneDate = /*#__PURE__*/function (_CloneObject) {
  _inherits(CloneDate, _CloneObject);

  var _super = _createSuper(CloneDate);

  function CloneDate() {
    _classCallCheck(this, CloneDate);

    return _super.apply(this, arguments);
  }

  _createClass(CloneDate, [{
    key: "undo",
    value: function undo(object) {
      object.setTime(this.clone.getTime());
    }
  }, {
    key: "isChanged",
    value: function isChanged(value, equals) {
      return !equals(this.clone.valueOf(), value.valueOf());
    }
  }]);

  return CloneDate;
}(_cloneObject.default);

exports.default = CloneDate;
},{"./clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _set = require("../methods/set.js");

var _cloneObject = _interopRequireDefault(require("./clone-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CloneSet = /*#__PURE__*/function (_CloneObject) {
  _inherits(CloneSet, _CloneObject);

  var _super = _createSuper(CloneSet);

  function CloneSet() {
    _classCallCheck(this, CloneSet);

    return _super.apply(this, arguments);
  }

  _createClass(CloneSet, [{
    key: "undo",
    value: function undo(object) {
      var _iterator = _createForOfIteratorHelper(this.clone),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          object.add(value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(object),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _value = _step2.value;

          if (!this.clone.has(_value)) {
            object.delete(_value);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }], [{
    key: "isHandledMethod",
    value: function isHandledMethod(name) {
      return _set.HANDLED_SET_METHODS.has(name);
    }
  }]);

  return CloneSet;
}(_cloneObject.default);

exports.default = CloneSet;
},{"../methods/set.js":"../node_modules/on-change/lib/smart-clone/methods/set.js","./clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = require("../methods/map.js");

var _cloneObject = _interopRequireDefault(require("./clone-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CloneMap = /*#__PURE__*/function (_CloneObject) {
  _inherits(CloneMap, _CloneObject);

  var _super = _createSuper(CloneMap);

  function CloneMap() {
    _classCallCheck(this, CloneMap);

    return _super.apply(this, arguments);
  }

  _createClass(CloneMap, [{
    key: "undo",
    value: function undo(object) {
      var _iterator = _createForOfIteratorHelper(this.clone.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          object.set(key, value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(object.keys()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _key = _step2.value;

          if (!this.clone.has(_key)) {
            object.delete(_key);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }], [{
    key: "isHandledMethod",
    value: function isHandledMethod(name) {
      return _map.HANDLED_MAP_METHODS.has(name);
    }
  }]);

  return CloneMap;
}(_cloneObject.default);

exports.default = CloneMap;
},{"../methods/map.js":"../node_modules/on-change/lib/smart-clone/methods/map.js","./clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-weakset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneObject = _interopRequireDefault(require("./clone-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CloneWeakSet = /*#__PURE__*/function (_CloneObject) {
  _inherits(CloneWeakSet, _CloneObject);

  var _super = _createSuper(CloneWeakSet);

  function CloneWeakSet(value, path, argumentsList, hasOnValidate) {
    var _this;

    _classCallCheck(this, CloneWeakSet);

    _this = _super.call(this, undefined, path, argumentsList, hasOnValidate);
    _this._arg1 = argumentsList[0];
    _this._weakValue = value.has(_this._arg1);
    return _this;
  }

  _createClass(CloneWeakSet, [{
    key: "isChanged",
    value: function isChanged(value) {
      return this._weakValue !== value.has(this._arg1);
    }
  }, {
    key: "undo",
    value: function undo(object) {
      if (this._weakValue && !object.has(this._arg1)) {
        object.add(this._arg1);
      } else {
        object.delete(this._arg1);
      }
    }
  }]);

  return CloneWeakSet;
}(_cloneObject.default);

exports.default = CloneWeakSet;
},{"./clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js"}],"../node_modules/on-change/lib/smart-clone/clone/clone-weakmap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneObject = _interopRequireDefault(require("./clone-object.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CloneWeakMap = /*#__PURE__*/function (_CloneObject) {
  _inherits(CloneWeakMap, _CloneObject);

  var _super = _createSuper(CloneWeakMap);

  function CloneWeakMap(value, path, argumentsList, hasOnValidate) {
    var _this;

    _classCallCheck(this, CloneWeakMap);

    _this = _super.call(this, undefined, path, argumentsList, hasOnValidate);
    _this._weakKey = argumentsList[0];
    _this._weakHas = value.has(_this._weakKey);
    _this._weakValue = value.get(_this._weakKey);
    return _this;
  }

  _createClass(CloneWeakMap, [{
    key: "isChanged",
    value: function isChanged(value) {
      return this._weakValue !== value.get(this._weakKey);
    }
  }, {
    key: "undo",
    value: function undo(object) {
      var weakHas = object.has(this._weakKey);

      if (this._weakHas && !weakHas) {
        object.set(this._weakKey, this._weakValue);
      } else if (!this._weakHas && weakHas) {
        object.delete(this._weakKey);
      } else if (this._weakValue !== object.get(this._weakKey)) {
        object.set(this._weakKey, this._weakValue);
      }
    }
  }]);

  return CloneWeakMap;
}(_cloneObject.default);

exports.default = CloneWeakMap;
},{"./clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js"}],"../node_modules/on-change/lib/smart-clone/smart-clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isArray = _interopRequireDefault(require("../is-array.js"));

var _isBuiltin = require("../is-builtin.js");

var _isObject = _interopRequireDefault(require("../is-object.js"));

var _cloneObject = _interopRequireDefault(require("./clone/clone-object.js"));

var _cloneArray = _interopRequireDefault(require("./clone/clone-array.js"));

var _cloneDate = _interopRequireDefault(require("./clone/clone-date.js"));

var _cloneSet = _interopRequireDefault(require("./clone/clone-set.js"));

var _cloneMap = _interopRequireDefault(require("./clone/clone-map.js"));

var _cloneWeakset = _interopRequireDefault(require("./clone/clone-weakset.js"));

var _cloneWeakmap = _interopRequireDefault(require("./clone/clone-weakmap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmartClone = /*#__PURE__*/function () {
  function SmartClone(hasOnValidate) {
    _classCallCheck(this, SmartClone);

    this._stack = [];
    this._hasOnValidate = hasOnValidate;
  }

  _createClass(SmartClone, [{
    key: "isCloning",
    get: function get() {
      return this._stack.length > 0;
    }
  }, {
    key: "start",
    value: function start(value, path, argumentsList) {
      var CloneClass = _cloneObject.default;

      if ((0, _isArray.default)(value)) {
        CloneClass = _cloneArray.default;
      } else if (value instanceof Date) {
        CloneClass = _cloneDate.default;
      } else if (value instanceof Set) {
        CloneClass = _cloneSet.default;
      } else if (value instanceof Map) {
        CloneClass = _cloneMap.default;
      } else if (value instanceof WeakSet) {
        CloneClass = _cloneWeakset.default;
      } else if (value instanceof WeakMap) {
        CloneClass = _cloneWeakmap.default;
      }

      this._stack.push(new CloneClass(value, path, argumentsList, this._hasOnValidate));
    }
  }, {
    key: "update",
    value: function update(fullPath, property, value) {
      this._stack[this._stack.length - 1].update(fullPath, property, value);
    }
  }, {
    key: "preferredThisArg",
    value: function preferredThisArg(target, thisArg, thisProxyTarget) {
      var name = target.name;
      var isHandledMethod = SmartClone.isHandledMethod(thisProxyTarget, name);
      return this._stack[this._stack.length - 1].preferredThisArg(isHandledMethod, name, thisArg, thisProxyTarget);
    }
  }, {
    key: "isChanged",
    value: function isChanged(isMutable, value, equals) {
      return this._stack[this._stack.length - 1].isChanged(isMutable, value, equals);
    }
  }, {
    key: "undo",
    value: function undo(object) {
      if (this._previousClone !== undefined) {
        this._previousClone.undo(object);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this._previousClone = this._stack.pop();
      return this._previousClone.clone;
    }
  }], [{
    key: "isHandledType",
    value: function isHandledType(value) {
      return (0, _isObject.default)(value) || (0, _isArray.default)(value) || (0, _isBuiltin.isBuiltinWithMutableMethods)(value);
    }
  }, {
    key: "isHandledMethod",
    value: function isHandledMethod(target, name) {
      if ((0, _isObject.default)(target)) {
        return _cloneObject.default.isHandledMethod(name);
      }

      if ((0, _isArray.default)(target)) {
        return _cloneArray.default.isHandledMethod(name);
      }

      if (target instanceof Set) {
        return _cloneSet.default.isHandledMethod(name);
      }

      if (target instanceof Map) {
        return _cloneMap.default.isHandledMethod(name);
      }

      return (0, _isBuiltin.isBuiltinWithMutableMethods)(target);
    }
  }]);

  return SmartClone;
}();

exports.default = SmartClone;
},{"../is-array.js":"../node_modules/on-change/lib/is-array.js","../is-builtin.js":"../node_modules/on-change/lib/is-builtin.js","../is-object.js":"../node_modules/on-change/lib/is-object.js","./clone/clone-object.js":"../node_modules/on-change/lib/smart-clone/clone/clone-object.js","./clone/clone-array.js":"../node_modules/on-change/lib/smart-clone/clone/clone-array.js","./clone/clone-date.js":"../node_modules/on-change/lib/smart-clone/clone/clone-date.js","./clone/clone-set.js":"../node_modules/on-change/lib/smart-clone/clone/clone-set.js","./clone/clone-map.js":"../node_modules/on-change/lib/smart-clone/clone/clone-map.js","./clone/clone-weakset.js":"../node_modules/on-change/lib/smart-clone/clone/clone-weakset.js","./clone/clone-weakmap.js":"../node_modules/on-change/lib/smart-clone/clone/clone-weakmap.js"}],"../node_modules/on-change/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./lib/constants.js");

var _isBuiltin = require("./lib/is-builtin.js");

var _path = _interopRequireDefault(require("./lib/path.js"));

var _isSymbol = _interopRequireDefault(require("./lib/is-symbol.js"));

var _isIterator = _interopRequireDefault(require("./lib/is-iterator.js"));

var _wrapIterator = _interopRequireDefault(require("./lib/wrap-iterator.js"));

var _ignoreProperty = _interopRequireDefault(require("./lib/ignore-property.js"));

var _cache = _interopRequireDefault(require("./lib/cache.js"));

var _smartClone = _interopRequireDefault(require("./lib/smart-clone/smart-clone.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  equals: Object.is,
  isShallow: false,
  pathAsArray: false,
  ignoreSymbols: false,
  ignoreUnderscores: false,
  ignoreDetached: false,
  details: false
};

var onChange = function onChange(object, _onChange) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options = _objectSpread(_objectSpread({}, defaultOptions), options);
  var proxyTarget = Symbol('ProxyTarget');
  var _options = options,
      equals = _options.equals,
      isShallow = _options.isShallow,
      ignoreDetached = _options.ignoreDetached,
      details = _options.details;
  var cache = new _cache.default(equals);
  var hasOnValidate = typeof options.onValidate === 'function';
  var smartClone = new _smartClone.default(hasOnValidate); // eslint-disable-next-line max-params

  var validate = function validate(target, property, value, previous, applyData) {
    return !hasOnValidate || smartClone.isCloning || options.onValidate(_path.default.concat(cache.getPath(target), property), value, previous, applyData) === true;
  };

  var handleChangeOnTarget = function handleChangeOnTarget(target, property, value, previous) {
    if (!(0, _ignoreProperty.default)(cache, options, property) && !(ignoreDetached && cache.isDetached(target, object))) {
      handleChange(cache.getPath(target), property, value, previous);
    }
  }; // eslint-disable-next-line max-params


  var handleChange = function handleChange(changePath, property, value, previous, applyData) {
    if (smartClone.isCloning) {
      smartClone.update(changePath, property, previous);
    } else {
      _onChange(_path.default.concat(changePath, property), value, previous, applyData);
    }
  };

  var getProxyTarget = function getProxyTarget(value) {
    return value ? value[proxyTarget] || value : value;
  };

  var prepareValue = function prepareValue(value, target, property, basePath) {
    if ((0, _isBuiltin.isBuiltinWithoutMutableMethods)(value) || property === 'constructor' || isShallow && !_smartClone.default.isHandledMethod(target, property) || (0, _ignoreProperty.default)(cache, options, property) || cache.isGetInvariant(target, property) || ignoreDetached && cache.isDetached(target, object)) {
      return value;
    }

    if (basePath === undefined) {
      basePath = cache.getPath(target);
    }

    return cache.getProxy(value, _path.default.concat(basePath, property), handler, proxyTarget);
  };

  var handler = {
    get: function get(target, property, receiver) {
      if ((0, _isSymbol.default)(property)) {
        if (property === proxyTarget || property === _constants.TARGET) {
          return target;
        }

        if (property === _constants.UNSUBSCRIBE && !cache.isUnsubscribed && cache.getPath(target).length === 0) {
          cache.unsubscribe();
          return target;
        }
      }

      var value = (0, _isBuiltin.isBuiltinWithMutableMethods)(target) ? Reflect.get(target, property) : Reflect.get(target, property, receiver);
      return prepareValue(value, target, property);
    },
    set: function set(target, property, value, receiver) {
      value = getProxyTarget(value);
      var reflectTarget = target[proxyTarget] || target;
      var previous = reflectTarget[property];

      if (equals(previous, value) && property in target) {
        return true;
      }

      var isValid = validate(target, property, value, previous);

      if (isValid && cache.setProperty(reflectTarget, property, value, receiver, previous)) {
        handleChangeOnTarget(target, property, target[property], previous);
        return true;
      }

      return !isValid;
    },
    defineProperty: function defineProperty(target, property, descriptor) {
      if (!cache.isSameDescriptor(descriptor, target, property)) {
        var previous = target[property];

        if (validate(target, property, descriptor.value, previous) && cache.defineProperty(target, property, descriptor, previous)) {
          handleChangeOnTarget(target, property, descriptor.value, previous);
        }
      }

      return true;
    },
    deleteProperty: function deleteProperty(target, property) {
      if (!Reflect.has(target, property)) {
        return true;
      }

      var previous = Reflect.get(target, property);
      var isValid = validate(target, property, undefined, previous);

      if (isValid && cache.deleteProperty(target, property, previous)) {
        handleChangeOnTarget(target, property, undefined, previous);
        return true;
      }

      return !isValid;
    },
    apply: function apply(target, thisArg, argumentsList) {
      var thisProxyTarget = thisArg[proxyTarget] || thisArg;

      if (cache.isUnsubscribed) {
        return Reflect.apply(target, thisProxyTarget, argumentsList);
      }

      if ((details === false || details !== true && !details.includes(target.name)) && _smartClone.default.isHandledType(thisProxyTarget)) {
        var applyPath = _path.default.initial(cache.getPath(target));

        var isHandledMethod = _smartClone.default.isHandledMethod(thisProxyTarget, target.name);

        smartClone.start(thisProxyTarget, applyPath, argumentsList);
        var result = Reflect.apply(target, smartClone.preferredThisArg(target, thisArg, thisProxyTarget), isHandledMethod ? argumentsList.map(function (argument) {
          return getProxyTarget(argument);
        }) : argumentsList);
        var isChanged = smartClone.isChanged(thisProxyTarget, equals);
        var previous = smartClone.stop();

        if (_smartClone.default.isHandledType(result) && isHandledMethod) {
          if (thisArg instanceof Map && target.name === 'get') {
            applyPath = _path.default.concat(applyPath, argumentsList[0]);
          }

          result = cache.getProxy(result, applyPath, handler);
        }

        if (isChanged) {
          var applyData = {
            name: target.name,
            args: argumentsList,
            result: result
          };
          var changePath = smartClone.isCloning ? _path.default.initial(applyPath) : applyPath;
          var property = smartClone.isCloning ? _path.default.last(applyPath) : '';

          if (validate(_path.default.get(object, changePath), property, thisProxyTarget, previous, applyData)) {
            handleChange(changePath, property, thisProxyTarget, previous, applyData);
          } else {
            smartClone.undo(thisProxyTarget);
          }
        }

        if ((thisArg instanceof Map || thisArg instanceof Set) && (0, _isIterator.default)(result)) {
          return (0, _wrapIterator.default)(result, target, thisArg, applyPath, prepareValue);
        }

        return result;
      }

      return Reflect.apply(target, thisArg, argumentsList);
    }
  };
  var proxy = cache.getProxy(object, options.pathAsArray ? [] : '', handler);
  _onChange = _onChange.bind(proxy);

  if (hasOnValidate) {
    options.onValidate = options.onValidate.bind(proxy); // eslint-disable-line unicorn/prefer-prototype-methods
  }

  return proxy;
};

onChange.target = function (proxy) {
  return proxy && proxy[_constants.TARGET] || proxy;
};

onChange.unsubscribe = function (proxy) {
  return proxy[_constants.UNSUBSCRIBE] || proxy;
};

var _default = onChange;
exports.default = _default;
},{"./lib/constants.js":"../node_modules/on-change/lib/constants.js","./lib/is-builtin.js":"../node_modules/on-change/lib/is-builtin.js","./lib/path.js":"../node_modules/on-change/lib/path.js","./lib/is-symbol.js":"../node_modules/on-change/lib/is-symbol.js","./lib/is-iterator.js":"../node_modules/on-change/lib/is-iterator.js","./lib/wrap-iterator.js":"../node_modules/on-change/lib/wrap-iterator.js","./lib/ignore-property.js":"../node_modules/on-change/lib/ignore-property.js","./lib/cache.js":"../node_modules/on-change/lib/cache.js","./lib/smart-clone/smart-clone.js":"../node_modules/on-change/lib/smart-clone/smart-clone.js"}],"watcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _onChange = _interopRequireDefault(require("on-change"));

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(state) {
  return (0, _onChange.default)(state, function handler() {
    (0, _router.default)(this);
  });
};

exports.default = _default;
},{"on-change":"../node_modules/on-change/index.js","./router":"router.js"}],"repository/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repository = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Repository = /*#__PURE__*/function () {
  function Repository(data) {
    _classCallCheck(this, Repository);

    this._data = data;
  }

  _createClass(Repository, [{
    key: "_getNotFriends",
    value: function _getNotFriends(personId, count) {
      var result = [];

      var _iterator = _createForOfIteratorHelper(this._data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var person = _step.value;
          var notFriends = person.friends.filter(function (item) {
            return item !== personId;
          });
          result.push.apply(result, _toConsumableArray(notFriends));

          if (result.length >= count) {
            return result.length > count ? result.slice(0, count) : result;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      ;
    }
  }, {
    key: "_getRankedPersonsByFriends",
    value: function _getRankedPersonsByFriends(contactsDictionary, friendsIds, count) {
      var groupedByRepeat = friendsIds.reduce(function (acc, id) {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(groupedByRepeat).sort(function (_ref, _ref2) {
        var _contactsDictionary$f, _contactsDictionary$s;

        var _ref3 = _slicedToArray(_ref, 2),
            firstId = _ref3[0],
            firstCount = _ref3[1];

        var _ref4 = _slicedToArray(_ref2, 2),
            secondId = _ref4[0],
            secondCount = _ref4[1];

        var compare = secondCount - firstCount;

        if (compare) {
          return compare;
        }

        var firstName = ((_contactsDictionary$f = contactsDictionary[firstId]) === null || _contactsDictionary$f === void 0 ? void 0 : _contactsDictionary$f.name) || '';
        var secondName = ((_contactsDictionary$s = contactsDictionary[secondId]) === null || _contactsDictionary$s === void 0 ? void 0 : _contactsDictionary$s.name) || '';
        return firstName.localeCompare(secondName);
      }).slice(0, count).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            id = _ref6[0];

        return id;
      });
    }
  }, {
    key: "getContactsData",
    value: function getContactsData(countInSublist) {
      var _this = this;

      var friendsIds = [];

      var contactsDictionary = this._data.reduce(function (acc, person) {
        acc[person.id] = _objectSpread(_objectSpread({}, person), {}, {
          notFriends: _this._getNotFriends(person.id, countInSublist)
        });
        friendsIds.push.apply(friendsIds, _toConsumableArray(person.friends));
        return acc;
      }, {});

      return {
        contacts: this._data,
        contactsDictionary: contactsDictionary,
        rankedPersonsByFriends: this._getRankedPersonsByFriends(contactsDictionary, friendsIds, countInSublist)
      };
    }
  }]);

  return Repository;
}();

exports.Repository = Repository;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _data = _interopRequireDefault(require("../public/data.json"));

var _constants = require("./constants");

var _router = _interopRequireDefault(require("./router"));

var _watcher = _interopRequireDefault(require("./watcher"));

var _repository = require("./repository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var repository = new _repository.Repository(_data.default);

var _repository$getContac = repository.getContactsData(_constants.MAX_PERSON_IN_SUBLIST),
    contacts = _repository$getContac.contacts,
    contactsDictionary = _repository$getContac.contactsDictionary,
    rankedPersonsByFriends = _repository$getContac.rankedPersonsByFriends;

var initialState = {
  page: _constants.PAGES.LIST,
  currentPersonId: null,
  contacts: contacts,
  contactsDictionary: contactsDictionary,
  rankedPersonsByFriends: rankedPersonsByFriends
};
var state = (0, _watcher.default)(initialState);
(0, _router.default)(state);
},{"../public/data.json":"../public/data.json","./constants":"constants/index.js","./router":"router.js","./watcher":"watcher.js","./repository":"repository/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "9177" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map