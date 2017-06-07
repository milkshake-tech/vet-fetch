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

var connect = require("react-redux").connect;
var capturePetSurvey = require("../actions/actions").capturePetSurvey;
var AutocompleteBar = _interopRequire(require("../components/AutocompleteBar"));

var Questionnaire3 = (function (Component) {
	function Questionnaire3(props) {
		_classCallCheck(this, Questionnaire3);

		_get(Object.getPrototypeOf(Questionnaire3.prototype), "constructor", this).call(this, props);
		this.conditionsList = ["Allergies", "Arthritis", "Cancer", "Diabetes", "Ear Infections", "Heart Disease", "Neutered or Spayed", "Orthopedic Conditions", "Skin Conditions", "Thyroid Conditions"];
		this.captureResponse = this.captureResponse.bind(this);
		this.highlightSelectedTile = this.highlightSelectedTile.bind(this);
		this.state = {
			highlight: false,
			highlightToggleState: {},
			opacitySetting: 0
		};
	}

	_inherits(Questionnaire3, Component);

	_prototypeProperties(Questionnaire3, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		captureResponse: {
			value: function captureResponse(event) {
				var response = Object.assign({}, this.props.petProfile);
				response.tags = this.state.highlightToggleState;
				this.props.capturePetSurveyResponse(response);
				browserHistory.push("/thankyou");
			},
			writable: true,
			configurable: true
		},
		highlightSelectedTile: {
			value: function highlightSelectedTile(event) {
				var highlightToggleState = this.state.highlightToggleState;
				var highlightToggle = Object.assign({}, highlightToggleState);

				if (highlightToggle[event.target.id] === null) {
					highlightToggle[event.target.id] = true;

					this.setState({ highlight: true, highlightToggleState: highlightToggle });
					return;
				}
				highlightToggle[event.target.id] = !this.state.highlight;
				this.setState({ highlight: !this.state.highlight, highlightToggleState: highlightToggle });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _state = this.state;
				var highlightToggleState = _state.highlightToggleState;
				var opacitySetting = _state.opacitySetting;
				var highlightState = {};
				var highlightColor = "";

				for (var _iterator = this.conditionsList[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
					var condition = _step.value;
					var conditionName = condition;
					if (highlightToggleState[conditionName] === true) {
						highlightState[conditionName] = "lightgreen";
					}
				}

				var _this = this;
				var conditionTile = this.conditionsList.map(function (condition, i) {
					return React.createElement(
						"div",
						{ onClick: _this.highlightSelectedTile, key: i, id: condition, style: { margin: "10px", backgroundColor: highlightState[condition] }, className: "button" },
						condition
					);
				});

				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
					React.createElement(
						"div",
						{ style: { margin: 2 + "em" } },
						React.createElement(
							Link,
							{ to: "/survey-2", className: "button small back", style: { marginLeft: 2 + "em" } },
							"Back"
						)
					),
					React.createElement(
						"div",
						{ style: { display: "flex", justifyContent: "space-around" } },
						React.createElement(
							"div",
							{ className: "leftPanel" },
							React.createElement("img", { src: "/assets/images/dog_boxer.png", style: { display: "block", marginTop: 4 + "em", marginLeft: "auto", marginRight: "auto" } })
						),
						React.createElement(
							"div",
							{ style: { width: 600 + "px" } },
							React.createElement(
								"h2",
								{ style: { margin: "25px" } },
								"Does your pet have a history of any of the following?"
							),
							React.createElement(
								"div",
								{ style: { margin: 2 + "em" } },
								conditionTile
							),
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement(
									"div",
									{ className: "button", onClick: this.captureResponse },
									"Submit"
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

var stateToProps = function (state) {
	return {
		petProfile: state.petReducer.petProfile
	};
};

var dispatchToProps = function (dispatch) {
	return {
		capturePetSurveyResponse: function (petProfile) {
			return dispatch(capturePetSurvey(petProfile));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Questionnaire3);