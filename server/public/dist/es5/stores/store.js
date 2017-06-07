"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var searchReducer = _interopRequire(require("../vet-search/reducers/searchReducer"));

var petReducer = _interopRequire(require("../pet-survey/reducers/petReducer"));

var userReducer = _interopRequire(require("../user/reducers/userReducer"));

var store;

module.exports = {
	configureStore: function (initialState) {
		var reducers = combineReducers({
			petReducer: petReducer,
			searchReducer: searchReducer,
			userReducer: userReducer
		});

		store = createStore(reducers, initialState, applyMiddleware(thunk));
		return store;
	},

	currentStore: function () {
		return store;
	}
};