"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var store = _interopRequire(require("../../stores/store"));

var receivedSearchResults = exports.receivedSearchResults = function (searchResults) {
	return {
		type: constants.RECEIVED_SEARCH_RESULTS,
		searchResults: searchResults
	};
};
Object.defineProperty(exports, "__esModule", {
	value: true
});