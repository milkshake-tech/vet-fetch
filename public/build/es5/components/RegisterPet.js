"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ReactDOM = _interopRequire(require("react-dom"));

var api = _interopRequire(require("../utils/api"));

var RegisterPet = (function (Component) {
	function RegisterPet(props, context) {
		_classCallCheck(this, RegisterPet);

		_get(Object.getPrototypeOf(RegisterPet.prototype), "constructor", this).call(this, props, context);
		this.updatePet = this.updatePet.bind(this);
		this.register = this.register.bind(this);
		this.state = {
			pet: {
				name: "",
				breed: "",
				sex: ""
			}
		};
	}

	_inherits(RegisterPet, Component);

	_prototypeProperties(RegisterPet, null, {
		componentDidMount: {
			value: function componentDidMount() {
				console.log("RegisterPet componentDidMount");
			},
			writable: true,
			configurable: true
		},
		updatePet: {
			value: function updatePet(event) {
				console.log("updatePet: " + event.target.id + " == " + event.target.value);
				var updatedPet = Object.assign({}, this.state.pet);
				updatedPet[event.target.id] = event.target.value;
				this.setState({
					pet: updatedPet
				});
			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register(event) {
				event.preventDefault();
				api.handlePost("/api/pet", this.state.pet, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}
					console.log(JSON.stringify(response));
					window.location.ref = "/account";
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
					React.createElement(
						"p",
						null,
						"Tell us About Your Pet"
					),
					React.createElement(
						"form",
						{ action: "/api/pet", method: "post" },
						React.createElement("input", { type: "text", onChange: this.updatePet, id: "name", placeholder: "Name" }),
						React.createElement("br", null),
						React.createElement("input", { type: "text", onChange: this.updatePet, id: "breed", placeholder: "Breed" }),
						React.createElement("br", null),
						React.createElement("input", { type: "text", onChange: this.updatePet, id: "sex", placeholder: "Sex" }),
						React.createElement("br", null),
						React.createElement(
							"button",
							{ onClick: this.register },
							"Register"
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return RegisterPet;
})(Component);

module.exports = RegisterPet;