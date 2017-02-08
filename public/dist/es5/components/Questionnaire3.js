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
var AutocompleteBar = _interopRequire(require("../components/AutocompleteBar"));

var Questionnaire3 = (function (Component) {
	function Questionnaire3(props) {
		_classCallCheck(this, Questionnaire3);

		_get(Object.getPrototypeOf(Questionnaire3.prototype), "constructor", this).call(this, props);
		this.conditionsList = ["allergies", "Arthritis", "Cancer", "Diabetes", "heart-disease", "Orthopedic Conditions", "Skin Conditions", "Thyroid Conditions"];
		this.highlightSelectedTile = this.highlightSelectedTile.bind(this);
		this.state = {
			highlight: false,
			highlightToggleState: {}
		};
	}

	_inherits(Questionnaire3, Component);

	_prototypeProperties(Questionnaire3, null, {
		highlightSelectedTile: {
			value: function highlightSelectedTile(event) {
				var highlightToggle = Object.assign({}, this.state.highlightToggleState);
				highlightToggle[event.target.id] = !this.state.highlight;

				this.setState({ highlight: !this.state.highlight, highlightToggleState: highlightToggle });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var highlightToggleState = this.state.highlightToggleState;
				// console.log("this.state.highlightToggleState: "+JSON.stringify(this.state.highlightToggleState))
				var highlightState = "";
				for (var _iterator = this.conditionsList[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
					var condition = _step.value;
					// console.log("condition: "+JSON.stringify(condition))
					var conditionName = condition;
					console.log("highlightToggleState: " + JSON.stringify(highlightToggleState));
					console.log("highlightToggleState[condition]: " + JSON.stringify(highlightToggleState[conditionName]));
					if (highlightToggleState[conditionName] == true) {
						highlightState = "lightgreen";
					}
				}
				console.log("highlightState: " + JSON.stringify(highlightState));


				var _this = this;
				var conditionTile = this.conditionsList.map(function (condition, i) {
					return React.createElement(
						"div",
						{ onClick: _this.highlightSelectedTile, key: i, id: condition, style: { margin: "10px", backgroundColor: highlightState }, className: "button" },
						condition
					);
				});

				return React.createElement(
					"div",
					null,
					React.createElement(
						"article",
						{ id: "work", className: "panel secondary" },
						React.createElement(
							"div",
							{ className: "image" },
							React.createElement("img", { src: "/images/dogface.png", alt: "", "data-position": "center center" })
						),
						React.createElement(
							"div",
							{ className: "content" },
							React.createElement(
								"ul",
								{ className: "actions spinX" },
								React.createElement(
									"li",
									null,
									React.createElement(
										Link,
										{ to: "/survey-2", className: "button small back" },
										"Back"
									)
								)
							),
							React.createElement(
								"div",
								{ className: "inner" },
								React.createElement(
									"header",
									null,
									React.createElement(
										"h2",
										null,
										"Pre-Existing Conditions"
									),
									React.createElement(
										"p",
										null,
										"Does your dog have a history of any of the following?"
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "col-md-12" },
										conditionTile
									)
								),
								React.createElement(
									Link,
									{ style: { margin: "40px" }, to: "/survey-results", className: "button" },
									"Next"
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

	return Questionnaire3;
})(Component);

module.exports = Questionnaire3;