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
var capturePetSurvey = require("../actions/actions").capturePetSurvey;
var Questionnaire1 = (function (Component) {
	function Questionnaire1(props) {
		_classCallCheck(this, Questionnaire1);

		_get(Object.getPrototypeOf(Questionnaire1.prototype), "constructor", this).call(this, props);
		this.captureResponse = this.captureResponse.bind(this);
		this.petTypeSelected = this.petTypeSelected.bind(this);
		this.state = {
			displaySelectionCheck: {
				dog: false,
				cat: false },
			opacitySetting: 0
		};
	}

	_inherits(Questionnaire1, Component);

	_prototypeProperties(Questionnaire1, null, {
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
				response[event.target.id] = event.target.value;
				this.props.capturePetSurveyResponse(response);
			},
			writable: true,
			configurable: true
		},
		petTypeSelected: {
			value: function petTypeSelected(event) {
				var displaySelection = Object.assign({}, this.state.displaySelectionCheck);
				displaySelection[event.target.id] = !displaySelection[event.target.id];
				this.setState({ displaySelectionCheck: displaySelection });
				this.props.capturePetSurveyResponse(displaySelection);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _state = this.state;
				var displaySelectionCheck = _state.displaySelectionCheck;
				var opacitySetting = _state.opacitySetting;


				var catImgDisplay = displaySelectionCheck.dog === true ? "none" : "inline";
				var dogImgDisplay = displaySelectionCheck.cat === true ? "none" : "inline";
				var displayNameCapture = displaySelectionCheck.dog === true || displaySelectionCheck.cat === true ? "block" : "none";
				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
					React.createElement(
						"div",
						{ style: { display: "flex", justifyContent: "space-around" } },
						React.createElement(
							"div",
							{ className: "leftPanel" },
							React.createElement(
								Link,
								{ to: "/searchresults", className: "button small back" },
								"Back"
							),
							React.createElement(
								"div",
								{ style: { marginTop: 2 + "em" } },
								React.createElement(
									"h2",
									{ style: { textAlign: "center" } },
									"Pick your pet"
								),
								React.createElement(
									"div",
									{ style: { textAlign: "center" } },
									React.createElement(
										"a",
										{ onClick: this.petTypeSelected, style: { borderBottom: "none", padding: "10px", cursor: "pointer" } },
										React.createElement("img", { style: { margin: "20px", display: dogImgDisplay }, id: "dog", src: "/assets/images/dog2.png", "data-position": "center center" })
									),
									React.createElement(
										"a",
										{ onClick: this.petTypeSelected, style: { borderBottom: "none", padding: "10px", cursor: "pointer" } },
										React.createElement("img", { style: { margin: "20px", display: catImgDisplay }, id: "cat", src: "/assets/images/cat2.png", "data-position": "center center" })
									)
								),
								React.createElement(
									"div",
									{ style: { display: displayNameCapture, textAlign: "center" } },
									React.createElement(
										"h2",
										null,
										"Name"
									),
									React.createElement(
										"p",
										{ style: { margin: "10px" } },
										React.createElement("input", { style: { margin: "auto", borderRight: "none", borderLeft: "none", borderTop: "none", display: "inline", fontSize: "25px", width: "250px" }, type: "text", placeholder: "Fido", onChange: this.captureResponse, id: "name" })
									)
								)
							)
						),
						React.createElement(
							"div",
							{ style: { marginTop: 4.5 + "em" } },
							React.createElement(
								"div",
								{ style: { display: "flex", justifyContent: "space-around" } },
								React.createElement(
									"div",
									{ style: { textAlign: "center" } },
									React.createElement(
										"h2",
										null,
										"Birthday"
									),
									React.createElement(
										"p",
										{ style: { margin: "10px" } },
										React.createElement("input", { style: { margin: "auto", borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "25px", width: "250px" }, type: "text", placeholder: "MM/DD/YYYY", onChange: this.captureResponse, id: "birthday" })
									)
								),
								React.createElement(
									"div",
									{ style: { textAlign: "center" } },
									React.createElement(
										"h2",
										null,
										"Sex"
									),
									React.createElement(
										"p",
										{ style: { margin: "10px" } },
										React.createElement(
											"select",
											{ style: { margin: "auto", borderRight: "none", borderLeft: "none", borderTop: "none", color: "#bbb", fontSize: "25px", width: "180px" }, type: "text", onChange: this.captureResponse, id: "sex", defaultValue: "Select sex" },
											React.createElement(
												"option",
												{ disabled: true },
												"Select sex"
											),
											React.createElement(
												"option",
												null,
												"Female"
											),
											React.createElement(
												"option",
												null,
												"Male"
											)
										)
									)
								)
							),
							React.createElement(
								Link,
								{ to: "/survey-2", style: { margin: "40px", float: "right" }, className: "button" },
								"Next"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Questionnaire1;
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

module.exports = connect(stateToProps, dispatchToProps)(Questionnaire1);