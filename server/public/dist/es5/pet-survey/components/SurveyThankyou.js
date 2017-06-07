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
var AutocompleteBar = _interopRequire(require("../components/AutocompleteBar"));

var APIManager = _interopRequire(require("../../utils/APIManager"));

var SurveyThankyou = (function (Component) {
	function SurveyThankyou(props) {
		_classCallCheck(this, SurveyThankyou);

		_get(Object.getPrototypeOf(SurveyThankyou.prototype), "constructor", this).call(this, props);
		this.saveUserPet = this.saveUserPet.bind(this);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(SurveyThankyou, Component);

	_prototypeProperties(SurveyThankyou, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		saveUserPet: {
			value: function saveUserPet() {
				var newPetProfile = Object.assign({}, this.props.petProfile);
				newPetProfile.ownerID = this.props.user.id;

				APIManager.handlePost("/api/pet", newPetProfile, function (err, response) {
					if (err) return alert(err);

					if (response.confirmation === "Fail") return alert(JSON.stringify(response));

					if (response.confirmation === "Success") return browserHistory.push("/profile");
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;
				var user = this.props.user;
				var _this = this;

				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
					React.createElement(
						"div",
						{ style: { margin: 2 + "em" } },
						React.createElement(
							Link,
							{ to: "/survey-3", className: "button small back", style: { marginLeft: 2 + "em" } },
							"Back"
						)
					),
					React.createElement(
						"div",
						{ style: { display: "flex", justifyContent: "space-around" } },
						React.createElement(
							"div",
							{ className: "leftPanel" },
							React.createElement("img", { src: "/assets/images/corgi.png", style: { display: "block", marginTop: 4 + "em", marginLeft: "auto", marginRight: "auto" } })
						),
						React.createElement(
							"div",
							{ style: { width: 600 + "px", display: user.id === undefined ? "block" : "none" } },
							React.createElement(
								"h2",
								{ style: { margin: "25px" } },
								"Thank you! Your pet profile is ready."
							),
							React.createElement(
								"p",
								{ style: { margin: "25px" } },
								"Create an account to check it out and bookmark veterinarians."
							),
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement(
									Link,
									{ to: "/signup", className: "button" },
									"Sign Up"
								)
							)
						),
						React.createElement(
							"div",
							{ style: { width: 600 + "px", display: user.id === undefined ? "none" : "block" } },
							React.createElement(
								"h2",
								{ style: { margin: "25px" } },
								"Thank you! Your pet profile is ready."
							),
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement(
									"button",
									{ onClick: this.saveUserPet },
									"Save to profile"
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

	return SurveyThankyou;
})(Component);

var stateToProps = function (state) {
	return {
		petProfile: state.petReducer.petProfile,
		user: state.userReducer.user
	};
};

module.exports = connect(stateToProps)(SurveyThankyou);