"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var userReducer = _interopRequire(require("../reducers/userReducer"));

var petReducer = _interopRequire(require("../reducers/petReducer"));

var displayReducer = _interopRequire(require("../reducers/displayReducer"));

var searchReducer = _interopRequire(require("../reducers/searchReducer"));

var vetReducer = _interopRequire(require("../reducers/vetReducer"));

var UIReducer = _interopRequire(require("../reducers/UIReducer"));

// Combine reducers
var reducers = combineReducers({
	userReducer: userReducer,
	petReducer: petReducer,
	displayReducer: displayReducer,
	searchReducer: searchReducer,
	vetReducer: vetReducer,
	UIReducer: UIReducer
});

// Create createStore
var store = createStore(reducers, applyMiddleware(thunk));

module.exports = store;