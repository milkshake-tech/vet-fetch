"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	vet: {
		id: null,
		firstName: "",
		lastName: "",
		practiceName: "",
		zipcode: "",
		email: "",
		password: ""
	}
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);
	switch (action.type) {
		case constants.RECEIVED_VET:
			newState.vet = action.vet;
			console.log("RECEIVED_VET NEW STATE: " + JSON.stringify(newState.vet));

			return newState;

		default:
			return state;
	}
};