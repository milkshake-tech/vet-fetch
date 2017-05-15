"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var store = _interopRequire(require("../stores/store"));

var receivedSearchResults = exports.receivedSearchResults = function (searchResults) {
	return {
		type: constants.RECEIVED_SEARCH_RESULTS,
		searchResults: searchResults
	};
};

var capturePetSurvey = exports.capturePetSurvey = function (petProfile) {
	return {
		type: constants.CAPTURE_PET_SURVEY,
		petProfile: petProfile
	};
};
Object.defineProperty(exports, "__esModule", {
	value: true
});