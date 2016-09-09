"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var PetRow = _interopRequire(require("../components/PetRow"));

var navigation = _interopRequire(require("../utils/navigation"));

var Nav = _interopRequire(require("../components/Nav"));

var PetList = (function (Component) {
	function PetList() {
		_classCallCheck(this, PetList);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(PetList, Component);

	_prototypeProperties(PetList, null, {
		render: {
			value: function render() {
				var petList = this.props.petsArray.map(function (pet, i) {
					return React.createElement(PetRow, { key: i, pet: pet });
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"div",
						{ className: "section notopmargin nobottommargin" },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"h4",
								null,
								"Pets"
							),
							petList,
							React.createElement(
								"button",
								{ onClick: navigation.registerPet },
								"Add a Pet"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return PetList;
})(Component);

module.exports = PetList;