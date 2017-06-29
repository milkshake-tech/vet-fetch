"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	user: null,
	pets: null,
	displayLoginModal: false,
	displaySignUpModal: false
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);

	switch (action.type) {
		case constants.RECEIVED_USER:
			newState.user = action.user;
			return newState;

		case constants.RECEIVED_PETS:
			newState.pets = action.pets;
			return newState;

		case constants.TOGGLE_LOGIN_MODAL:
			newState.displayLoginModal = action.toggleState;
			return newState;

		case constants.TOGGLE_SIGNUP_MODAL:
			newState.displaySignUpModal = action.toggleState;
			return newState;

		default:
			return state;
	}
};