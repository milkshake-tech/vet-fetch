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
var InsurancePlans = _interopRequire(require("../utils/InsurancePlans"));

var InsuranceDetail = (function (Component) {
	function InsuranceDetail(props) {
		_classCallCheck(this, InsuranceDetail);

		_get(Object.getPrototypeOf(InsuranceDetail.prototype), "constructor", this).call(this, props);
		this.insuranceResults = InsurancePlans;
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(InsuranceDetail, Component);

	_prototypeProperties(InsuranceDetail, null, {
		componentDidMount: {
			value: function componentDidMount() {
				console.log("InsuranceDetail componentDidMount: " + JSON.stringify(this.props.location.state));
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;
				var plan = this.props.location.state.plan;

				return React.createElement(
					"div",
					null,
					React.createElement(
						"article",
						{ id: "work", className: "panel secondary", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1.25s" } },
						React.createElement(
							"div",
							{ className: "image" },
							React.createElement("img", { src: "/images/sittingdog.png", alt: "", "data-position": "center center" })
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
										plan.company
									)
								),
								React.createElement(
									"p",
									null,
									"Plan: ",
									plan.plan
								),
								React.createElement(
									"p",
									null,
									"Cost: $",
									plan.premium,
									"/month "
								),
								React.createElement(
									Link,
									{ to: "/signup", style: { margin: "25px" }, className: "button" },
									"Save for Later"
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

	return InsuranceDetail;
})(Component);

module.exports = InsuranceDetail;