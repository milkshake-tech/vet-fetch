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
var PetProfileRow = (function (Component) {
	function PetProfileRow(props) {
		_classCallCheck(this, PetProfileRow);

		_get(Object.getPrototypeOf(PetProfileRow.prototype), "constructor", this).call(this, props);
		this.toggleResultDetail = this.toggleResultDetail.bind(this);
		this.state = {
			displayResultDetail: false
		};
	}

	_inherits(PetProfileRow, Component);

	_prototypeProperties(PetProfileRow, null, {
		toggleResultDetail: {
			value: function toggleResultDetail(event) {
				return this.setState({ displayResultDetail: !this.state.displayResultDetail });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var pet = this.props.pet;
				var tagsList = Object.keys(pet.tags).map(function (tag, i) {
					if (pet.tags[tag] === true) {
						return React.createElement(
							"li",
							{ key: i, style: { listStyle: "none", fontSize: 10 + "px" } },
							React.createElement("img", { src: "/assets/images/check_grey.png", style: { display: "inline", margin: "auto 0.5em -0.75em auto" } }),
							tag
						);
					}
				});
				return React.createElement(
					"div",
					{ className: "searchResultCard", style: { height: "auto", marginTop: 1 + "em", marginLeft: 2 + "em", marginRight: 2 + "em", display: "block", overflowX: "hidden" }, onClick: this.toggleResultDetail },
					React.createElement("img", { src: pet.species === "dog" ? "/assets/images/dogface_sm.png" : "/assets/images/catface_sm.png", style: { display: "inline", margin: ".5em .5em -.75em auto" } }),
					React.createElement(
						"p",
						{ style: { display: "inline", fontSize: 14 + "px" } },
						pet.name
					),
					React.createElement(
						"div",
						{ style: { display: this.state.displayResultDetail ? "block" : "none" } },
						React.createElement(
							"div",
							{ style: { display: "flex", justifyContent: "space-around" } },
							React.createElement(
								"div",
								{ style: { textAlign: "left" } },
								React.createElement(
									"div",
									null,
									React.createElement(
										"p",
										{ style: { fontSize: 11 + "px", marginBottom: -1 + "em" } },
										"Stats"
									),
									React.createElement("div", { style: { border: "solid 1px #bbb", width: 95 + "%" } }),
									React.createElement("img", { src: "/assets/images/birthday.png", style: { display: "inline", margin: "auto 0.5em -0.75em auto" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline" } },
										pet.birthday,
										" "
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: pet.sex === "female" ? "/assets/images/female.png" : "/assets/images/male.png", style: { display: "inline", marginBottom: -0.25 + "em", marginRight: 0.5 + "em" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline" } },
										" ",
										pet.sex
									)
								),
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: "/assets/images/pawprint.png", style: { display: "inline", marginBottom: -0.25 + "em", marginRight: 0.5 + "em" } }),
									React.createElement(
										"p",
										{ style: { fontSize: 10 + "px", display: "inline" } },
										" ",
										pet.breed
									)
								)
							),
							React.createElement(
								"div",
								{ style: { marginLeft: 1 + "em", textAlign: "left" } },
								React.createElement(
									"p",
									{ style: { fontSize: 11 + "px", marginBottom: -1 + "em" } },
									"Medical Tags"
								),
								React.createElement("div", { style: { border: "solid 1px #bbb", width: 95 + "%" } }),
								React.createElement(
									"div",
									{ style: { display: "block" } },
									tagsList
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

	return PetProfileRow;
})(Component);

module.exports = PetProfileRow;