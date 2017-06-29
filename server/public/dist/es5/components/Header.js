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
var APIManager = _interopRequire(require("../utils/APIManager"));

var connect = require("react-redux").connect;
var store = _interopRequire(require("../stores/store"));

var _userActionsActions = require("../user/actions/actions");

var receivedUser = _userActionsActions.receivedUser;
var toggleSignupModal = _userActionsActions.toggleSignupModal;
var _userComponents = require("../user/components");

var UserCapture = _userComponents.UserCapture;
var UserLogin = _userComponents.UserLogin;
var Header = (function (Component) {
	function Header(props) {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), "constructor", this).call(this, props);
		this.captureUserInput = this.captureUserInput.bind(this);
		this.displayLogin = this.displayLogin.bind(this);
		this.displaySignUp = this.displaySignUp.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.state = {
			loginVisible: false,
			userCapture: {}
		};
	}

	_inherits(Header, Component);

	_prototypeProperties(Header, null, {
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
		displayLogin: {
			value: function displayLogin() {
				if (this.props.displaySignUpModal) {
					return;
				}
				return this.setState({ loginVisible: !this.state.loginVisible });
			},
			writable: true,
			configurable: true
		},
		displaySignUp: {
			value: function displaySignUp() {
				this.setState({ loginVisible: false });
				return this.props.toggleSignup(true);
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
						_this.setState({ loginVisible: false });
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
				var user = this.props.user;


				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "header" },
						React.createElement(
							"div",
							{ className: "logo-container" },
							React.createElement(
								Link,
								{ to: "/", className: "logo-link" },
								React.createElement("img", { src: "/assets/images/vetFetch_white_sm.png" })
							)
						),
						React.createElement(
							"div",
							{ className: "register-btn", id: user ? "menu-hidden" : "menu-active", onClick: this.displayLogin },
							"Sign Up / Log In"
						),
						React.createElement(
							"div",
							{ className: "register-btn", id: user ? "menu-active" : "menu-hidden" },
							React.createElement(
								Link,
								{ to: "/profile", className: "logo-link" },
								React.createElement("img", { src: "/assets/images/user.png" })
							)
						)
					),
					React.createElement(
						"div",
						{ className: "register-dropdown", id: this.state.loginVisible ? "menu-active" : "menu-hidden" },
						React.createElement("input", { id: "email", onChange: this.captureUserInput, placeholder: "Email", className: "login-input", style: localStyle.inputWidth, type: "text" }),
						React.createElement("input", { id: "password", onChange: this.captureUserInput, placeholder: "Password", className: "login-input", style: localStyle.inputWidth, type: "password" }),
						React.createElement(
							"div",
							{ className: "register-nav" },
							React.createElement(
								"button",
								{ onClick: this.loginUser },
								"Login"
							)
						),
						React.createElement(
							"p",
							{ className: "register-nav" },
							"New to vetFetch? Sign up ",
							React.createElement(
								"a",
								{ onClick: this.displaySignUp, style: localStyle.pointer },
								"here"
							)
						)
					),
					React.createElement(
						"div",
						{ style: { justifyContent: "center" } },
						React.createElement(UserCapture, null)
					),
					React.createElement(
						"div",
						{ style: { justifyContent: "center" } },
						React.createElement(UserLogin, null)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Header;
})(Component);

var localStyle = {
	pointer: {
		cursor: "pointer"
	},
	inputWidth: {
		width: 250 + "px"
	}
};

var stateToProps = function (state) {
	return {
		user: state.userReducer.user,
		displaySignUpModal: state.userReducer.displaySignUpModal
	};
};

var dispatchToProps = function (dispatch) {
	return {
		captureCurrentUser: function (user) {
			return dispatch(receivedUser(user));
		},
		toggleSignup: function (toggleState) {
			return dispatch(toggleSignupModal(toggleState));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Header);