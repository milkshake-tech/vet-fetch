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
var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var APIManager = _interopRequire(require("../utils/APIManager"));

var UserProfile = (function (Component) {
	function UserProfile(props) {
		_classCallCheck(this, UserProfile);

		_get(Object.getPrototypeOf(UserProfile.prototype), "constructor", this).call(this, props);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(UserProfile, Component);

	_prototypeProperties(UserProfile, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
				var _this = this;

				APIManager.handleGet("/user/currentuser", null, function (err, response) {
					if (err) {
						alert(JSON.stringify(err));
						return;
					}
					if (response.confirmation == "Fail") {
						console.log("res: " + JSON.stringify(response));
						return;
					}

					if (response.confirmation == "Success") {
						console.log("res: " + JSON.stringify(response));
						_this.props.captureCurrentUser(response.user);
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;
				console.log("this.props.user: " + JSON.stringify(this.props.user));
				var user = this.props.user;


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
									" "
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
										"Profile"
									)
								),
								React.createElement(
									"p",
									null,
									"Contact email: ",
									user.email
								)
							)
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
										{ to: "/survey-results", className: "button small back" },
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
										"Pets"
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement("img", { style: { cursor: "pointer" }, src: "/images/dog2.png" })
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

	return UserProfile;
})(Component);

var stateToProps = function (state) {
	return {
		user: state.userReducer.user
	};
};

var dispatchToProps = function (dispatch) {
	return {
		captureCurrentUser: function (user) {
			return dispatch(actions.receivedUser(user));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(UserProfile);