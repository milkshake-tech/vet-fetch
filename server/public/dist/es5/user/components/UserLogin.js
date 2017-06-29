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

var _actionsActions = require("../actions/actions");

var receivedUser = _actionsActions.receivedUser;
var toggleLoginModal = _actionsActions.toggleLoginModal;
var toggleSignupModal = _actionsActions.toggleSignupModal;
var UserLogin = (function (Component) {
	function UserLogin(props) {
		_classCallCheck(this, UserLogin);

		_get(Object.getPrototypeOf(UserLogin.prototype), "constructor", this).call(this, props);
		this.captureUserInput = this.captureUserInput.bind(this);
		this.closeLoginModal = this.closeLoginModal.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.state = {
			userCapture: null,
			displayErrorAlert: false,
			errorMsg: null
		};
	}

	_inherits(UserLogin, Component);

	_prototypeProperties(UserLogin, null, {
		captureUserInput: {
			value: function captureUserInput(event) {
				var id = event.target.id;
				var value = event.target.value;
				var newUserCapture = Object.assign({}, this.state.userCapture);
				newUserCapture[id] = value;
				this.setState({ userCapture: newUserCapture });
			},
			writable: true,
			configurable: true
		},
		closeLoginModal: {
			value: function closeLoginModal(event) {
				return this.props.toggleLogin(false);
			},
			writable: true,
			configurable: true
		},
		loginUser: {
			value: function loginUser() {
				var _this = this;
				APIManager.handlePost("/login", this.state.userCapture, function (err, res) {
					if (err) {
						return alert("Oops! Your email or password is incorrect.");
					}

					if (res.confirmation === "Success") {
						_this.props.captureCurrentUser(res.result);
						_this.props.toggleLogin(false);
						browserHistory.push("/profile");
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _state = this.state;
				var displayErrorAlert = _state.displayErrorAlert;
				var errorMsg = _state.errorMsg;
				var errorAlertDisplay = displayErrorAlert === true ? "block" : "none";
				var modalDisplay = this.props.displayLoginModal ? "block" : "none";

				return React.createElement(
					"div",
					{ className: "modal", style: { display: modalDisplay } },
					React.createElement(
						"div",
						{ className: "modal-wrapper" },
						React.createElement(
							"div",
							{ className: "modal-content" },
							React.createElement(
								"div",
								{ className: "modal-close-btn", onClick: this.closeLoginModal },
								"x"
							),
							React.createElement(
								"h2",
								null,
								"Log In"
							),
							React.createElement(
								"h5",
								null,
								"Log in to save your pet records and bookmark veterinarians."
							),
							React.createElement(
								"div",
								{ style: { display: errorAlertDisplay, margin: 2 + "em" } },
								errorMsg
							),
							React.createElement("input", { id: "email", onChange: this.captureUserInput, placeholder: "Email", className: "signup-input", style: localStyle.inputWidth, type: "text" }),
							React.createElement("input", { id: "password", onChange: this.captureUserInput, placeholder: "Password", className: "signup-input", style: localStyle.inputWidth, type: "password" }),
							React.createElement(
								"div",
								{ onClick: this.loginUser, className: "button" },
								"Log In"
							),
							React.createElement("img", { src: "/assets/images/corgi.png", className: "login-img" })
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return UserLogin;
})(Component);

var localStyle = {
	inputWidth: {
		width: 350 + "px"
	}
};

var stateToProps = function (state) {
	return {
		user: state.userReducer.user,
		displayLoginModal: state.userReducer.displayLoginModal
	};
};

var dispatchToProps = function (dispatch) {
	return {
		captureCurrentUser: function (user) {
			return dispatch(receivedUser(user));
		},
		toggleLogin: function (toggleState) {
			return dispatch(toggleLoginModal(toggleState));
		} };
};

module.exports = connect(stateToProps, dispatchToProps)(UserLogin);