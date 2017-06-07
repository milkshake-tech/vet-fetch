"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var store = _interopRequire(require("../../stores/store"));

var receivedUser = exports.receivedUser = function (user) {
	return {
		type: constants.RECEIVED_USER,
		user: user
	};
};

var receivedPets = exports.receivedPets = function (pets) {
	return {
		type: constants.RECEIVED_PETS,
		pets: pets
	};
};
Object.defineProperty(exports, "__esModule", {
	value: true
});