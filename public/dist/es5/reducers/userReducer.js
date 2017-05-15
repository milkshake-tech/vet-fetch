"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	user: {
		id: null,
		email: "",
		phone: ""
	}
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {
		case constants.RECEIVED_USER:
			var newState = Object.assign({}, state);
			newState.user = action.user;
			return newState;

		default:
			return state;
	}
};