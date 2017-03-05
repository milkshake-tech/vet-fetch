"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	left: false
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);

	switch (action.type) {
		case constants.RECEIVE_SIDEMENU_STATE:
			newState.left = action.left;
			return newState;

		default:
			return state;
	}
};