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

var receivedSearchResults = require("../vet-search/actions/actions").receivedSearchResults;
var connect = require("react-redux").connect;
var APIManager = _interopRequire(require("../utils/APIManager"));

var Header = _interopRequire(require("./Header"));

var Footer = _interopRequire(require("./Footer"));

var Landing = (function (Component) {
	function Landing(props, context) {
		_classCallCheck(this, Landing);

		_get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props);
		this.captureZipcode = this.captureZipcode.bind(this);
		this.onEnterPress = this.onEnterPress.bind(this);
		this.searchVets = this.searchVets.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = {
			searchZipcode: null,
			focus: false
		};
	}

	_inherits(Landing, Component);

	_prototypeProperties(Landing, null, {
		captureZipcode: {
			value: function captureZipcode(event) {
				this.setState({ searchZipcode: event.target.value });
			},
			writable: true,
			configurable: true
		},
		onEnterPress: {
			value: function onEnterPress(event) {
				if (event.key === "Enter") {
					return this.searchVets();
				}
			},
			writable: true,
			configurable: true
		},
		searchVets: {
			value: function searchVets() {
				var _this = this;
				APIManager.handleGet("/api/search", { zipcode: this.state.searchZipcode, offset: 0 }, function (err, res) {
					if (err) return alert("Oops something went wrong. Try a different search.");
					if (res.confirmation === "Fail") return alert(JSON.stringify(res.message));
					if (res.confirmation === "Success") {
						_this.props.fetchSearchResults(res.results);
						browserHistory.push("/searchresults");
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		handleFocus: {
			value: function handleFocus(event) {
				this.setState({ focus: true });
			},
			writable: true,
			configurable: true
		},
		handleBlur: {
			value: function handleBlur(event) {
				this.setState({ focus: false });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "jumbotron" },
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "/assets/images/vetFetch_blue.png", className: "landingLogo" })
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"h2",
							{ className: "jumbotron-title" },
							"Find local care."
						)
					),
					React.createElement(
						"div",
						{ className: "searchRow" },
						React.createElement(
							"div",
							null,
							React.createElement("input", { className: "customInput", placeholder: "Enter your zip", onChange: this.captureZipcode, onKeyPress: this.onEnterPress, onFocus: this.handleFocus, onBlur: this.handleBlur })
						),
						React.createElement(
							"div",
							{ id: "submit-btn", className: this.state.focus ? "slide-true" : "slide-false" },
							React.createElement(
								"button",
								{ onClick: this.searchVets },
								"Search"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Landing;
})(Component);

var stateToProps = function (state) {
	return {
		user: state.userReducer.user,
		pets: state.userReducer.pets
	};
};

var dispatchToProps = function (dispatch) {
	return {
		fetchSearchResults: function (searchResults) {
			return dispatch(receivedSearchResults(searchResults));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Landing);