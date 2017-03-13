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
					{ id: "home", className: "jumbotron", style: { backgroundColor: "white", textAlign: "center" } },
					React.createElement(
						"div",
						{ className: "container", style: { marginTop: -5 + "em" } },
						React.createElement("img", { src: "/images/vetFetch_blue.png" })
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"h2",
							{ style: { color: "#7ec2d9" } },
							"Search. Book. Review."
						)
					),
					React.createElement(
						"div",
						{ className: "row", style: { height: 10 + "em" } },
						React.createElement(
							"div",
							{ className: "col-md-12", style: { textAlign: "center", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" } },
							React.createElement("input", { className: "customInput", placeholder: "Enter your zip" }),
							React.createElement(
								"button",
								{ className: "search-btn" },
								"Submit"
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
		user: state.userReducer.user
	};
};

module.exports = connect(stateToProps)(Landing);