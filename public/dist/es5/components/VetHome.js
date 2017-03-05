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

var _view = require("./view");

var TopBar = _view.TopBar;
var SideMenu = _view.SideMenu;
var VetHome = (function (Component) {
	function VetHome(props) {
		_classCallCheck(this, VetHome);

		_get(Object.getPrototypeOf(VetHome.prototype), "constructor", this).call(this, props);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(VetHome, Component);

	_prototypeProperties(VetHome, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;
				var vet = this.props.vet;


				return React.createElement(
					"div",
					null,
					React.createElement(TopBar, null),
					React.createElement(SideMenu, null),
					React.createElement(
						"div",
						{ className: "content-page", style: { marginLeft: "0px" } },
						React.createElement(
							"div",
							{ className: "content" },
							React.createElement(
								"div",
								{ className: "container" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										null,
										"content goes here"
									)
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

	return VetHome;
})(Component);

var stateToProps = function (state) {
	return {
		vet: state.vetReducer.vet
	};
};

module.exports = connect(stateToProps)(VetHome);