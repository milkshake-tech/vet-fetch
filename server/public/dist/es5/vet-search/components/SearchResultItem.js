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
var SearchResultItem = (function (Component) {
	function SearchResultItem(props) {
		_classCallCheck(this, SearchResultItem);

		_get(Object.getPrototypeOf(SearchResultItem.prototype), "constructor", this).call(this, props);
		this.toggleResultDetail = this.toggleResultDetail.bind(this);
		this.state = {
			displayResultDetail: false
		};
	}

	_inherits(SearchResultItem, Component);

	_prototypeProperties(SearchResultItem, null, {
		toggleResultDetail: {
			value: function toggleResultDetail(event) {
				return this.setState({ displayResultDetail: !this.state.displayResultDetail });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var resultItem = this.props.resultItem;
				return React.createElement(
					"div",
					{ className: "searchResultCard", style: { height: "auto", marginTop: 1 + "em", marginLeft: 2 + "em", marginRight: 2 + "em", display: "block", overflowX: "hidden" }, onClick: this.toggleResultDetail },
					React.createElement(
						"p",
						{ style: { fontSize: 11 + "px" } },
						resultItem.venue.name
					),
					React.createElement(
						"div",
						{ style: { display: this.state.displayResultDetail ? "block" : "none" } },
						React.createElement(
							"div",
							{ style: { display: "flex", justifyContent: "space-around" } },
							React.createElement(
								"div",
								{ style: { textAlign: "left" } },
								React.createElement(
									"div",
									null,
									React.createElement(
										"p",
										{ style: { fontSize: 11 + "px", marginBottom: -1 + "em" } },
										"Practice Info"
									),
									React.createElement("div", { style: { border: "solid 1px #bbb", width: 95 + "%" } }),
									React.createElement("img", { src: "/assets/images/mappin.png", style: { display: "inline" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline" } },
										" ",
										resultItem.venue.location.address
									),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", marginTop: -2 + "em", marginLeft: 2 + "em" } },
										resultItem.venue.location.city,
										", ",
										resultItem.venue.location.state
									),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", marginTop: -3.5 + "em", marginLeft: 2 + "em" } },
										resultItem.venue.location.postalCode
									)
								),
								React.createElement(
									"div",
									{ style: { marginTop: -2.5 + "em" } },
									React.createElement("img", { src: "/assets/images/phone.png", style: { display: "inline", marginBottom: -0.25 + "em", marginRight: 0.5 + "em" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline" } },
										resultItem.venue.contact.formattedPhone
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: "/assets/images/globe.png", style: { display: "inline", marginBottom: -0.25 + "em", marginRight: 0.5 + "em" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline" } },
										resultItem.venue.url ? React.createElement(
											"a",
											{ href: resultItem.venue.url, style: { border: "none" } },
											"Website"
										) : "Site not found for practice"
									)
								)
							),
							React.createElement(
								"div",
								{ style: { marginLeft: 1 + "em", textAlign: "left" } },
								React.createElement(
									"p",
									{ style: { fontSize: 11 + "px", marginBottom: -1 + "em" } },
									"Details"
								),
								React.createElement("div", { style: { border: "solid 1px #bbb", width: 95 + "%" } }),
								React.createElement(
									"div",
									{ style: { display: "block" } },
									React.createElement("img", { src: "/assets/images/clock.png", style: { display: "inline" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline", marginLeft: 0.5 + "em" } },
										"Open: ",
										resultItem.venue.hours !== undefined && resultItem.venue.hours.isOpen === true ? "Yes" : "No"
									)
								),
								React.createElement(
									"div",
									{ style: { display: resultItem.venue.hours !== undefined && resultItem.venue.hours.status !== undefined ? "block" : "none" } },
									React.createElement("img", { src: "/assets/images/lightbulb.png", style: { display: "inline" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline", marginTop: -2 + "em", marginLeft: 0.5 + "em" } },
										resultItem.venue.hours !== undefined && resultItem.venue.hours.status !== undefined ? resultItem.venue.hours.status : ""
									)
								),
								React.createElement(
									"div",
									{ style: { display: "block" } },
									React.createElement("img", { src: "/assets/images/star.png", style: { display: "inline" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline", marginTop: -2.5 + "em", marginLeft: 0.5 + "em" } },
										"Bookmark"
									)
								)
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return SearchResultItem;
})(Component);

module.exports = SearchResultItem;