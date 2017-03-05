"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var _reactRouter = require("react-router");

var Link = _reactRouter.Link;
var browserHistory = _reactRouter.browserHistory;
var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var VetQuestionnaire2 = (function (Component) {
	function VetQuestionnaire2(props) {
		_classCallCheck(this, VetQuestionnaire2);

		_get(Object.getPrototypeOf(VetQuestionnaire2.prototype), "constructor", this).call(this, props);
		this.captureVet = this.captureVet.bind(this);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(VetQuestionnaire2, Component);

	_prototypeProperties(VetQuestionnaire2, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		captureVet: {
			value: function captureVet(event) {
				event.preventDefault();
				var vetProfile = Object.assign({}, this.props.vet);
				vetProfile[event.target.id] = event.target.value;
				this.props.captureVetProfile(vetProfile);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;



				return React.createElement(
					"div",
					null,
					React.createElement(
						"article",
						{ id: "work", className: "panel secondary", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
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
										{ to: "/vet-survey-1", className: "button small back" },
										"Back"
									)
								)
							),
							React.createElement(
								"div",
								{ className: "inner", style: { textAlign: "center" } },
								React.createElement(
									"h2",
									{ style: { margin: "25px" } },
									"Tell us about your practice"
								),
								React.createElement(
									"p",
									{ style: { margin: "10px" } },
									React.createElement("input", { onChange: this.captureVet, id: "practiceName", style: { margin: "auto", borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "25px", width: "250px" }, placeholder: "Practice Name", className: "col-md-3", type: "text" })
								),
								React.createElement(
									"p",
									{ style: { margin: "10px" } },
									React.createElement("input", { onChange: this.captureVet, id: "zipcode", style: { margin: "auto", borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "25px", width: "200px" }, placeholder: "Zipcode", className: "col-md-3", type: "text" })
								),
								React.createElement(
									Link,
									{ style: { margin: "20px" }, to: "/vet-survey-3", className: "button" },
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

	return VetQuestionnaire2;
})(Component);

var stateToProps = function (state) {
	return {
		vet: state.vetReducer.vet
	};
};

var dispatchToProps = function (dispatch) {
	return {
		captureVetProfile: function (vet) {
			return dispatch(actions.receivedVet(vet));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(VetQuestionnaire2);