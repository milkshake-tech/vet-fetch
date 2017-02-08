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

var actions = _interopRequire(require("../actions/actions"));

var connect = require("react-redux").connect;
var Landing = (function (Component) {
	function Landing(props, context) {
		_classCallCheck(this, Landing);

		_get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Landing, Component);

	_prototypeProperties(Landing, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(
						"article",
						{ id: "home", className: "panel special" },
						React.createElement(
							"div",
							{ className: "image" },
							React.createElement("img", { src: "/images/pic01vetFetch.png", alt: "", "data-position": "center center" })
						),
						React.createElement(
							"div",
							{ className: "content" },
							React.createElement(
								"div",
								{ className: "inner" },
								React.createElement(
									"header",
									null,
									React.createElement(
										"h1",
										null,
										"Vet Fetch"
									),
									React.createElement(
										"p",
										null,
										"How can we help you?"
									)
								),
								React.createElement(
									"nav",
									{ id: "nav" },
									React.createElement(
										"ul",
										{ className: "actions vertical special spinY" },
										React.createElement(
											"li",
											null,
											React.createElement(
												Link,
												{ to: "/survey", className: "button" },
												"Looking for pet insurance"
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												Link,
												{ to: "/adoption", className: "button" },
												"Looking for a pet"
											)
										)
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

	return Landing;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.accountReducer.currentUser };
};

module.exports = connect(stateToProps)(Landing);