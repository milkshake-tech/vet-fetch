"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ReactDOM = _interopRequire(require("react-dom"));

var api = _interopRequire(require("../utils/api"));

var PetProfile = (function (Component) {
	function PetProfile() {
		_classCallCheck(this, PetProfile);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(PetProfile, Component);

	_prototypeProperties(PetProfile, null, {
		componentDidMount: {
			value: function componentDidMount() {
				console.log("SLUG == " + this.props.slug);

				api.handleGet(endpoint, null, function (err, results) {
					if (err) {
						alert(err.message);
						return;
					}
					console.log("FETCH PET PROFILE: " + JSON.stringify(results));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					"Pet Profile goes here"
				);
			},
			writable: true,
			configurable: true
		}
	});

	return PetProfile;
})(Component);

module.exports = PetProfile;