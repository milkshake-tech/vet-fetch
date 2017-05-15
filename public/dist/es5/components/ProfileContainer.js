"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactRouter = require("react-router");

var Link = _reactRouter.Link;
var browserHistory = _reactRouter.browserHistory;
var store = _interopRequire(require("../stores/store"));

var connect = require("react-redux").connect;
var receivedSearchResults = require("../actions/actions").receivedSearchResults;
var SearchResultItem = require("../components").SearchResultItem;
var APIManager = _interopRequire(require("../utils/APIManager"));

var ProfileContainer = (function (Component) {
	function ProfileContainer(props) {
		_classCallCheck(this, ProfileContainer);

		_get(Object.getPrototypeOf(ProfileContainer.prototype), "constructor", this).call(this, props);
		this.resultsPagination = this.resultsPagination.bind(this);
		this.startPetSurvey = this.startPetSurvey.bind(this);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(ProfileContainer, Component);

	_prototypeProperties(ProfileContainer, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		resultsPagination: {
			value: function resultsPagination(event) {
				var searchResults = this.props.searchResults;
				var searchOffset = parseInt(searchResults.offset) + parseInt(event.target.id);
				if (searchOffset < 0) {
					searchOffset = 0;
				}
				var _this = this;
				APIManager.handleGet("/api/search", { zipcode: searchResults.zipcode, offset: searchOffset }, function (err, res) {
					if (err) return alert("Oops something went wrong loading your results.");
					if (res.confirmation === "Success") {
						_this.props.fetchSearchResults(res.results);
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		startPetSurvey: {
			value: function startPetSurvey() {
				browserHistory.push("/survey-1");
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;
				var searchResults = this.props.searchResults;
				var displayedSearchResults = 10 + parseInt(searchResults.offset);
				if (displayedSearchResults > searchResults.totalResults) {
					displayedSearchResults = searchResults.totalResults;
				}
				var vetResultsList = searchResults.veterinarians.map(function (result, i) {
					return React.createElement(SearchResultItem, { key: i, resultItem: result });
				});
				if (searchResults.veterinarians.length === 0) {
					vetResultsList = React.createElement(
						"p",
						{ style: { marginTop: 1 + "em" } },
						"'Woof! Looks like they are no more search results to display.'"
					);
					displayedSearchResults = 0;
				}
				return React.createElement(
					"div",
					{ className: "jumbotron", style: { textAlign: "center" } },
					React.createElement(
						"div",
						{ className: "searchResultsRow" },
						React.createElement(
							"div",
							null,
							React.createElement(
								Link,
								{ to: "/" },
								React.createElement(
									"div",
									{ className: "button small back", style: { display: "block", marginBottom: 2 + "em", marginLeft: 2 + "em", width: 22 + "em" } },
									"Start a new search"
								)
							),
							React.createElement("img", { src: "/assets/images/sittingdog.png", style: { margin: 2 + "em" } }),
							React.createElement(
								"p",
								{ style: { display: "block", fontSize: 12 + "px" } },
								"Psss...Save your pet records on vetFetch for your next appointment."
							),
							React.createElement(
								"button",
								{ style: { marginBottom: 4 + "em" }, onClick: this.startPetSurvey },
								"Get started here, woof!"
							)
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"h3",
								null,
								searchResults.totalResults,
								" veterinarians near ",
								searchResults.zipcode
							),
							React.createElement(
								"div",
								{ style: { fontSize: 10 + "px" } },
								React.createElement(
									"button",
									{ id: "-10", onClick: this.resultsPagination },
									"Last"
								),
								React.createElement(
									"p",
									{ style: { display: "inline", fontSize: 11 + "px", marginLeft: 1 + "em", marginRight: 1 + "em" } },
									"displaying ",
									displayedSearchResults,
									" of ",
									searchResults.totalResults,
									" results"
								),
								React.createElement(
									"button",
									{ id: "10", onClick: this.resultsPagination },
									"Next"
								)
							),
							React.createElement(
								"div",
								{ style: { marginTop: 2 + "em" } },
								vetResultsList
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return ProfileContainer;
})(Component);

var stateToProps = function (state) {
	return {
		searchResults: state.searchReducer.searchResults
	};
};

var dispatchToProps = function (dispatch) {
	return {
		fetchSearchResults: function (searchResults) {
			return dispatch(receivedSearchResults(searchResults));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(ProfileContainer);