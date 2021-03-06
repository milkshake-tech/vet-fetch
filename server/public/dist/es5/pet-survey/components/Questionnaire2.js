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
var store = _interopRequire(require("../../stores/store"));

var AutocompleteBar = _interopRequire(require("../components/AutocompleteBar"));

var Questionnaire2 = (function (Component) {
	function Questionnaire2(props) {
		_classCallCheck(this, Questionnaire2);

		_get(Object.getPrototypeOf(Questionnaire2.prototype), "constructor", this).call(this, props);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(Questionnaire2, Component);

	_prototypeProperties(Questionnaire2, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;


				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
					React.createElement(
						"div",
						{ style: { margin: 2 + "em" } },
						React.createElement(
							Link,
							{ to: "/survey-1", className: "button small back", style: { marginLeft: 2 + "em" } },
							"Back"
						)
					),
					React.createElement(
						"div",
						{ style: { display: "flex", justifyContent: "space-around" } },
						React.createElement(
							"div",
							{ className: "leftPanel" },
							React.createElement("img", { src: "/assets/images/cat.png", style: { display: "block", marginTop: 4 + "em", marginLeft: "auto", marginRight: "auto" } })
						),
						React.createElement(
							"div",
							{ style: { width: 400 + "px" } },
							React.createElement(
								"h2",
								{ style: { margin: 25 + "px", textAlign: "center" } },
								"Breed"
							),
							React.createElement(AutocompleteBar, null)
						)
					),
					React.createElement(
						Link,
						{ to: "/survey-3", style: { marginRight: 6 + "em", float: "right" }, className: "button" },
						"Next"
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Questionnaire2;
})(Component);

module.exports = Questionnaire2;