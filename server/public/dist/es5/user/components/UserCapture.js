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

var receivedUser = require("../actions/actions").receivedUser;
var UserCapture = (function (Component) {
	function UserCapture(props) {
		_classCallCheck(this, UserCapture);

		_get(Object.getPrototypeOf(UserCapture.prototype), "constructor", this).call(this, props);
		this.captureUserInput = this.captureUserInput.bind(this);
		this.postUser = this.postUser.bind(this);
		this.state = {
			opacitySetting: 0,
			user: null,
			displayErrorAlert: false,
			errorMsg: null
		};
	}

	_inherits(UserCapture, Component);

	_prototypeProperties(UserCapture, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				setTimeout(function () {
					_this.setState({ opacitySetting: 1 });
				}, 100);
			},
			writable: true,
			configurable: true
		},
		captureUserInput: {
			value: function captureUserInput(event) {
				var id = event.target.id;
				var value = event.target.value;
				var userCapture = Object.assign({}, this.state.user);
				userCapture[id] = value;
				this.setState({ user: userCapture });
			},
			writable: true,
			configurable: true
		},
		postUser: {
			value: function postUser(event) {
				var newUser = Object.assign({}, this.state.user);

				if (newUser.email === undefined || newUser.phone === undefined || newUser.password === undefined || newUser.confirmPassword === undefined) {
					return this.setState({ displayErrorAlert: true, errorMsg: "Oops! Looks like some information is missing. Please fill out all fields to sign up." });
				}if (newUser.password !== newUser.confirmPassword) {
					return this.setState({ displayErrorAlert: true, errorMsg: "Oops, your password entries don't match. Please try again." });
				}var _this = this;
				APIManager.handlePost("/api/user", newUser, function (err, res) {
					if (err) return alert(err);

					if (res.confirmation === "Fail") return alert(JSON.stringify(response));

					if (res.confirmation === "Success") {
						_this.props.captureCurrentUser(res.result);
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
				var errorMsg = _state.errorMsg;
				var errorAlertDisplay = displayErrorAlert === true ? "block" : "none";

				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting } },
					React.createElement(
						"div",
						{ className: "jumbotron-container" },
						React.createElement(
							"div",
							{ className: "left-panel" },
							React.createElement("img", { src: "/assets/images/flamingo.png", className: "signUp-img" })
						),
						React.createElement(
							"div",
							{ className: "right-panel" },
							React.createElement(
								"h2",
								null,
								"Sign Up"
							),
							React.createElement(
								"div",
								{ style: { display: errorAlertDisplay, margin: 2 + "em" } },
								errorMsg
							),
							React.createElement("input", { id: "email", onChange: this.captureUserInput, placeholder: "Email", className: "signUp-input", style: localStyle.inputWidth, type: "text" }),
							React.createElement("input", { id: "phone", onChange: this.captureUserInput, placeholder: "Telephone", className: "signUp-input", style: localStyle.inputWidth, type: "text" }),
							React.createElement("input", { id: "password", onChange: this.captureUserInput, placeholder: "Password", className: "signUp-input", style: localStyle.inputWidth, type: "password" }),
							React.createElement("input", { id: "confirmPassword", onChange: this.captureUserInput, placeholder: "Confirm Password", className: "signUp-input", style: localStyle.inputWidth, type: "password" }),
							React.createElement(
								"div",
								{ onClick: this.postUser, className: "button" },
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

var localStyle = {
	inputWidth: {
		width: 350 + "px"
	}
};

var stateToProps = function (state) {
	return {
		user: state.userReducer.user };
};

var dispatchToProps = function (dispatch) {
	return {
		captureCurrentUser: function (user) {
			return dispatch(receivedUser(user));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(UserCapture);