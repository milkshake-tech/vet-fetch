"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	searchResults: {
		offset: 0,
		totalResults: 0,
		veterinarians: [],
		zipcode: null
	}
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);
	switch (action.type) {
		case constants.RECEIVED_SEARCH_RESULTS:
			newState.searchResults = action.searchResults;
			return newState;

		default:
			return state;
	}
};