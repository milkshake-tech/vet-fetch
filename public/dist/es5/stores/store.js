"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var displayReducer = _interopRequire(require("../reducers/displayReducer"));

var petReducer = _interopRequire(require("../reducers/petReducer"));

var searchReducer = _interopRequire(require("../reducers/searchReducer"));

var userReducer = _interopRequire(require("../reducers/userReducer"));

// Combine reducers
var reducers = combineReducers({
	displayReducer: displayReducer,
	petReducer: petReducer,
	searchReducer: searchReducer,
	userReducer: userReducer
});

// Create createStore
var store = createStore(reducers, applyMiddleware(thunk));

module.exports = store;