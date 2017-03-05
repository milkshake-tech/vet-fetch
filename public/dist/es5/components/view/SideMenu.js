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

var actions = _interopRequire(require("../../actions/actions"));

var APIManager = _interopRequire(require("../../utils/APIManager"));

var SideMenu = (function (Component) {
	function SideMenu(props) {
		_classCallCheck(this, SideMenu);

		_get(Object.getPrototypeOf(SideMenu.prototype), "constructor", this).call(this, props);
		this.logout = this.logout.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	_inherits(SideMenu, Component);

	_prototypeProperties(SideMenu, null, {
		closeMenu: {
			value: function closeMenu(event) {
				var _this = this;
				var left = this.props.left;


				setTimeout(function () {
					_this.props.toggleSideMenu(false);
				}, 200);
			},
			writable: true,
			configurable: true
		},
		logout: {
			value: function logout(event) {
				event.preventDefault();
				var _this = this;
				APIManager.handleGet("/user/logout", null, function (err, response) {
					if (err) {
						alert("Error logging out: " + JSON.stringify(err.message));
						return;
					}

					if (response.confirmation == "Fail") {
						alert("Log out failed: " + JSON.stringify(response.message));
						return;
					}

					if (response.confirmation == "Success") {
						window.location.href = "/";
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var left = this.props.left;
				var toggleDisplay = left == true ? "0px" : "-170px";
				var overlayDisplay = left == true ? "inline" : "none";
				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "left side-menu", style: { height: "100%", backgroundColor: "white", display: "inline", transitionProperty: "left", transitionDuration: "0.5s", left: toggleDisplay, width: "170px", position: "fixed", zIndex: "1000" } },
						React.createElement(
							"div",
							{ className: "slimScrollDiv" },
							React.createElement(
								"div",
								{ className: "sidebar-inner slimscrollleft" },
								React.createElement(
									"div",
									{ id: "sidebar-menu" },
									React.createElement(
										"ul",
										null,
										React.createElement(
											"li",
											{ className: "text-muted menu-title" },
											"Navigation"
										),
										React.createElement(
											"li",
											{ className: "has_sub" },
											React.createElement(
												Link,
												{ onClick: this.closeMenu, className: "waves-effect", to: "/homeDashboard" },
												React.createElement("i", { className: "ti-home" }),
												" ",
												React.createElement(
													"span",
													null,
													" Home "
												)
											)
										),
										React.createElement(
											"li",
											{ className: "has_sub" },
											React.createElement(
												Link,
												{ onClick: this.closeMenu, className: "waves-effect", to: "/deliveriesDashboard" },
												React.createElement("i", { className: "icon-basket" }),
												" ",
												React.createElement(
													"span",
													null,
													" Claims "
												)
											)
										),
										React.createElement(
											"li",
											{ className: "has_sub" },
											React.createElement(
												Link,
												{ onClick: this.closeMenu, className: "waves-effect", to: "/wines" },
												React.createElement("i", { className: "icon-trophy" }),
												" ",
												React.createElement(
													"span",
													null,
													" Billing "
												)
											)
										),
										React.createElement(
											"li",
											{ className: "has_sub" },
											React.createElement(
												Link,
												{ onClick: this.closeMenu, className: "waves-effect", to: "/calendar" },
												React.createElement("i", { className: "icon-calender" }),
												" ",
												React.createElement(
													"span",
													null,
													" Calendar "
												)
											)
										),
										React.createElement(
											"li",
											{ className: "has_sub" },
											React.createElement(
												Link,
												{ onClick: this.closeMenu, className: "waves-effect", to: "/account" },
												React.createElement("i", { className: "icon-user" }),
												" ",
												React.createElement(
													"span",
													null,
													" Account "
												)
											)
										),
										React.createElement(
											"li",
											{ className: "has_sub" },
											React.createElement(
												Link,
												{ className: "waves-effect", to: "#", onClick: this.logout },
												React.createElement("i", { className: "ti-power-off m-r-10 text-danger" }),
												" ",
												React.createElement(
													"span",
													null,
													" Logout "
												)
											)
										)
									),
									React.createElement("div", { className: "clearfix" })
								)
							),
							React.createElement("div", { className: "clearfix" })
						)
					),
					React.createElement("div", { onClick: this.closeMenu, style: { display: overlayDisplay, opacity: "0.5", width: "100%", height: "100%", backgroundColor: "#000000", marginTop: "60px", position: "absolute", zIndex: "900" } })
				);
			},
			writable: true,
			configurable: true
		}
	});

	return SideMenu;
})(Component);

var stateToProps = function (state) {
	return {
		left: state.UIReducer.left
	};
};

var dispatchToProps = function (dispatch) {
	return {
		toggleSideMenu: function (left) {
			return dispatch(actions.showSideMenu(left));
		}
	};
};
module.exports = connect(stateToProps, dispatchToProps)(SideMenu);