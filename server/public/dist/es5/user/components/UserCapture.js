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
var connect = require("react-redux").connect;
var store = _interopRequire(require("../../stores/store"));

var APIManager = _interopRequire(require("../../utils/APIManager"));

var UserCapture = (function (Component) {
	function UserCapture(props) {
		_classCallCheck(this, UserCapture);

		_get(Object.getPrototypeOf(UserCapture.prototype), "constructor", this).call(this, props);
		this.captureUserInput = this.captureUserInput.bind(this);
		this.saveUser = this.saveUser.bind(this);
		this.saveUserPet = this.saveUserPet.bind(this);
		this.state = {
			opacitySetting: 0,
			user: null,
			displayErrorAlert: false,
			displaySuccessAlert: false,
			errorMsg: null
		};
	}

	_inherits(UserCapture, Component);

	_prototypeProperties(UserCapture, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		captureUserInput: {
			value: function captureUserInput(event) {
				var userCapture = Object.assign({}, this.state.user);
				userCapture[event.target.id] = event.target.value;
				this.setState({ user: userCapture });
			},
			writable: true,
			configurable: true
		},
		saveUser: {
			value: function saveUser(event) {
				var saveUser = Object.assign({}, this.state.user);
				var petProfile = Object.assign({}, this.props.petProfile);
				this.setState({ displayErrorAlert: false });

				if (saveUser.email === undefined || saveUser.phone === undefined || saveUser.password === undefined || saveUser.confirmPassword === undefined) {
					return this.setState({ displayErrorAlert: true, errorMsg: "Oops! Looks like some information is missing. Please fill out all fields to sign up." });
				}if (saveUser.password !== saveUser.confirmPassword) {
					return this.setState({ displayErrorAlert: true, errorMsg: "Oops, your password entries don't match. Please try again." });
				}var _this = this;
				APIManager.handlePost("/api/user", saveUser, function (err, response) {
					if (err) return alert(err);

					if (response.confirmation === "Fail") return alert(JSON.stringify(response));

					if (response.confirmation === "Success") {
						if (petProfile.name === undefined) {
							return browserHistory.push("/profile");
						}

						return _this.saveUserPet(response.result.id);
					}
				});
			},
			writable: true,
			configurable: true
		},
		saveUserPet: {
			value: function saveUserPet(userID) {
				var newPetProfile = Object.assign({}, this.props.petProfile);
				newPetProfile.ownerID = userID;

				var _this = this;
				APIManager.handlePost("/api/pet", newPetProfile, function (err, response) {
					if (err) return alert(err);

					if (response.confirmation === "Fail") return alert(JSON.stringify(response));

					if (response.confirmation === "Success") {
						return browserHistory.push("/profile");
					}
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _state = this.state;
				var opacitySetting = _state.opacitySetting;
				var displayErrorAlert = _state.displayErrorAlert;
				var displaySuccessAlert = _state.displaySuccessAlert;
				var errorMsg = _state.errorMsg;
				var errorAlertDisplay = displayErrorAlert === true ? "block" : "none";
				var successAlertDisplay = displaySuccessAlert === true ? "block" : "none";

				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
					React.createElement(
						"div",
						{ style: { display: "flex", justifyContent: "space-around" } },
						React.createElement(
							"div",
							{ className: "leftPanel" },
							React.createElement("img", { src: "/assets/images/flamingo.png", className: "signUpImg" })
						),
						React.createElement(
							"div",
							{ style: { width: 600 + "px", textAlign: "center" } },
							React.createElement(
								"h2",
								{ style: { margin: 25 + "px" } },
								"Sign Up"
							),
							React.createElement(
								"div",
								{ style: { display: errorAlertDisplay, margin: 2 + "em" } },
								errorMsg
							),
							React.createElement(
								"p",
								null,
								React.createElement("input", { id: "email", onChange: this.captureUserInput, style: { borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "20px", margin: "auto", width: "350px" }, placeholder: "Email", className: "col-md-3", type: "text" })
							),
							React.createElement(
								"p",
								null,
								React.createElement("input", { id: "phone", onChange: this.captureUserInput, style: { borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "20px", margin: "auto", width: "350px" }, placeholder: "Telephone", className: "col-md-3", type: "text" })
							),
							React.createElement(
								"p",
								null,
								React.createElement("input", { id: "password", onChange: this.captureUserInput, style: { borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "20px", margin: "auto", width: "350px" }, placeholder: "Password", className: "col-md-3", type: "password" })
							),
							React.createElement(
								"p",
								null,
								React.createElement("input", { id: "confirmPassword", onChange: this.captureUserInput, style: { borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "20px", margin: "auto", width: "350px" }, placeholder: "Confirm Password", className: "col-md-3", type: "password" })
							),
							React.createElement(
								"div",
								{ onClick: this.saveUser, className: "button" },
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

	return UserCapture;
})(Component);

var stateToProps = function (state) {
	return {
		petProfile: state.petReducer.petProfile
	};
};

module.exports = connect(stateToProps)(UserCapture);