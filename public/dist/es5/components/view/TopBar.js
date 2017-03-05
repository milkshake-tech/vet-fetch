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

var Router = _reactRouter.Router;
var Route = _reactRouter.Route;
var IndexRoute = _reactRouter.IndexRoute;
var Link = _reactRouter.Link;
var connect = require("react-redux").connect;
var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var APIManager = _interopRequire(require("../../utils/APIManager"));

var TopBar = (function (Component) {
	function TopBar(props, context) {
		_classCallCheck(this, TopBar);

		_get(Object.getPrototypeOf(TopBar.prototype), "constructor", this).call(this, props, context);
		this.logout = this.logout.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	_inherits(TopBar, Component);

	_prototypeProperties(TopBar, null, {
		toggleMenu: {
			value: function toggleMenu(event) {
				var left = this.props.left;
				this.props.toogleSideMenu(!left);
			},
			writable: true,
			configurable: true
		},
		logout: {
			value: function logout(event) {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "topbar" },
					React.createElement(
						"div",
						{ className: "topbar-left", style: { float: "right" } },
						React.createElement(
							"div",
							{ className: "text-center" },
							React.createElement(
								Link,
								{ to: "/vet-home", className: "logo" },
								React.createElement(
									"i",
									{ className: "icon-c-logo" },
									" ",
									React.createElement("img", { src: "", height: "42" }),
									" "
								),
								React.createElement(
									"span",
									null,
									React.createElement("img", { src: "", height: "20" })
								)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "navbar navbar-default", role: "navigation", style: { backgroundColor: "white" } },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"div",
								{ className: "" },
								React.createElement(
									"div",
									{ className: "pull-left" },
									React.createElement(
										"button",
										{ onClick: this.toggleMenu, style: { color: "#36404a" }, className: "button-menu-mobile waves-effect waves-light" },
										React.createElement("i", { className: "md md-menu" })
									),
									React.createElement("span", { className: "clearfix" })
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

	return TopBar;
})(Component);

var stateToProps = function (state) {
	return {
		left: state.UIReducer.left
	};
};

var dispatchToProps = function (dispatch) {
	return {
		toogleSideMenu: function (left) {
			return dispatch(actions.showSideMenu(left));
		} };
};
module.exports = connect(stateToProps, dispatchToProps)(TopBar);
// event.preventDefault()
// APIManager.handleGet('/user/logout', null, function(err, response){
// 	if (err){
// 		alert(err.message)
// 		return
// 	}
//
// 	if (response.confirmation == "Fail"){
// 		alert(response.message)
// 		return
// 	}
//
// 	if (response.confirmation == "Success"){
// 		alert(response.message)
// 		window.location.href = "/"
// 		return
// 	}
// })