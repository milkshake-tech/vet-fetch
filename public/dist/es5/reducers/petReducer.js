"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
	petProfile: {}
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);

	switch (action.type) {
		case constants.CAPTURE_PET_SURVEY:
			newState.petProfile = action.petProfile;
			return newState;

		default:
			return state;
	}
};