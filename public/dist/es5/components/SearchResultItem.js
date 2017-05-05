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
	}

	_inherits(SearchResultItem, Component);

	_prototypeProperties(SearchResultItem, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var resultItem = this.props.resultItem;
				console.log("RESULT ITEM: " + JSON.stringify(resultItem));
				return React.createElement(
					"div",
					{ className: "button", style: { height: "auto", margin: 1 + "em", display: "block" } },
					React.createElement(
						"p",
						{ style: { fontSize: 10 + "px" } },
						resultItem.venue.name
					),
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "/assets/images/mappin.png", style: { display: "inline" } }),
						React.createElement(
							"p",
							{ style: { fontSize: 10 + "px", display: "inline" } },
							" ",
							resultItem.venue.location.address,
							", ",
							resultItem.venue.location.city,
							", ",
							resultItem.venue.location.state,
							" ",
							resultItem.venue.location.postalCode,
							" ",
							React.createElement("br", null),
							" ",
							resultItem.venue.contact.formattedPhone
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