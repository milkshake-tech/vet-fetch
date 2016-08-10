"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var connect = require("react-redux").connect;
var navigation = _interopRequire(require("../utils/navigation"));

var PetProfile = (function (Component) {
	function PetProfile() {
		_classCallCheck(this, PetProfile);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(PetProfile, Component);

	_prototypeProperties(PetProfile, null, {
		render: {
			value: function render() {
				var profile = this.props.pets[this.props.slug];
				return React.createElement(
					"div",
					null,
					React.createElement(
						"ul",
						null,
						profile && Object.keys(profile).map((function (key) {
							return React.createElement(
								"li",
								{ key: key },
								key,
								": ",
								profile[key]
							);
						}).bind(this))
					),
					React.createElement(
						"button",
						{ onClick: navigation.petsPage },
						"Back to Pets"
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return PetProfile;
})(Component);

// const stateToProps = function(state){
// 	console.log('STATE_TO_PROPS_PET_PROFILE: '+JSON.stringify(state))
// 	return {
// 		pets: state.petReducer.pets
// 	}
// }

module.exports = PetProfile;