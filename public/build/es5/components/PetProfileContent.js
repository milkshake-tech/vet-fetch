"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var navigation = _interopRequire(require("../utils/navigation"));

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var PetHealthRecord = _interopRequire(require("../components/PetHealthRecord"));

var PetStats = _interopRequire(require("../components/PetStats"));

var PetProfileInfo = (function (Component) {
	function PetProfileInfo(props, context) {
		_classCallCheck(this, PetProfileInfo);

		_get(Object.getPrototypeOf(PetProfileInfo.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(PetProfileInfo, Component);

	_prototypeProperties(PetProfileInfo, null, {
		render: {
			value: function render() {
				var petSlug = this.props.slug;
				var petProfile = this.props.pets[petSlug] || {};

				var display = this.props.showHealthRecord;
				var content = null;

				switch (display) {
					case false:
						return content = React.createElement(PetStats, { pets: this.props.pets, slug: this.props.slug, showHealthRecord: this.props.showHealthRecord });
					case true:
						return content = React.createElement(PetHealthRecord, { pets: this.props.pets, slug: this.props.slug, showHealthRecord: this.props.showHealthRecord });

					default:
						return content = null;
				}

				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						null,
						content
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return PetProfileInfo;
})(Component);

module.exports = PetProfileInfo;