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

var receivedUser = require("../user/actions/actions").receivedUser;
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
				var newUserCapture = Object.assign({}, this.state.userCapture);
				newUserCapture[event.target.id] = event.target.value;
				this.setState({ userCapture: newUserCapture });
			},
			writable: true,
			configurable: true
		},
		displayLogin: {
			value: function displayLogin() {
				this.setState({ loginVisible: !this.state.loginVisible });
			},
			writable: true,
			configurable: true
		},
		displaySignUp: {
			value: function displaySignUp() {
				this.setState({ loginVisible: false });
				browserHistory.push("/signup");
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
							{ style: { marginLeft: 6 + "em" } },
							React.createElement(
								Link,
								{ to: "/", style: { border: "none" } },
								React.createElement("img", { src: "/assets/images/vetFetch_white_sm.png" })
							)
						),
						React.createElement(
							"div",
							{ style: { marginRight: 6 + "em", cursor: "pointer", display: user.id === undefined ? "block" : "none" }, onClick: this.displayLogin },
							"Sign Up / Log In"
						),
						React.createElement(
							"div",
							{ style: { marginRight: 6 + "em", cursor: "pointer", display: user.id === undefined ? "none" : "block" } },
							React.createElement(
								Link,
								{ to: "/profile", style: { border: "none" } },
								React.createElement("img", { src: "/assets/images/user.png" })
							)
						)
					),
					React.createElement(
						"div",
						{ style: { display: this.state.loginVisible ? "block" : "none", border: "1px solid black", width: 350 + "px", backgroundColor: "white", position: "fixed", right: 0, top: 45 + "px", boxShadow: "rgb(211, 211, 211) 2px 5px 6px 7px" } },
						React.createElement(
							"p",
							{ style: { margin: "1em auto 1em auto" } },
							React.createElement("input", { id: "email", onChange: this.captureUserInput, style: { borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "12px", margin: "auto", width: "250px" }, placeholder: "Email", type: "text" })
						),
						React.createElement(
							"p",
							{ style: { margin: "auto" } },
							React.createElement("input", { id: "password", onChange: this.captureUserInput, style: { borderRight: "none", borderLeft: "none", borderTop: "none", fontSize: "12px", margin: "auto", width: "250px" }, placeholder: "Password", type: "password" })
						),
						React.createElement(
							"div",
							{ style: { margin: "1em auto", fontSize: 8 + "px", textAlign: "center" } },
							React.createElement(
								"button",
								{ onClick: this.loginUser },
								"Login"
							)
						),
						React.createElement(
							"p",
							{ style: { margin: "1em auto 1em auto", textAlign: "center" } },
							"New to vetFetch? Sign up ",
							React.createElement(
								"a",
								{ style: { cursor: "pointer" }, onClick: this.displaySignUp },
								"here"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Header;
})(Component);

var stateToProps = function (state) {
	return {
		user: state.userReducer.user
	};
};

var dispatchToProps = function (dispatch) {
	return {
		captureCurrentUser: function (user) {
			return dispatch(receivedUser(user));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Header);