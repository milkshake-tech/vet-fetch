"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var api = _interopRequire(require("../utils/api"));

var navigation = _interopRequire(require("../utils/navigation"));

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var TopBar = _interopRequire(require("../components/TopBar"));

var Nav = _interopRequire(require("../components/Nav"));

var Footer = _interopRequire(require("../components/Footer"));

var RegisterPet = (function (Component) {
	function RegisterPet(props, context) {
		_classCallCheck(this, RegisterPet);

		_get(Object.getPrototypeOf(RegisterPet.prototype), "constructor", this).call(this, props, context);
		this.capturePetInformation = this.capturePetInformation.bind(this);
		this.registerPet = this.registerPet.bind(this);
		this.state = {
			registerPet: {
				name: "",
				species: "",
				ownerId: null,
				slug: null
			}
		};
	}

	_inherits(RegisterPet, Component);

	_prototypeProperties(RegisterPet, null, {
		capturePetInformation: {
			value: function capturePetInformation(event) {
				var registerPet = Object.assign({}, this.state.registerPet);
				registerPet[event.target.id] = event.target.value;
				registerPet.ownerId = this.props.currentUser.id;
				this.setState({
					registerPet: registerPet
				});
			},
			writable: true,
			configurable: true
		},
		registerPet: {
			value: function registerPet(event) {
				event.preventDefault();

				var loggedIn = this.props.currentUser || {};
				console.log("REGISTER PET: currentUser " + JSON.stringify(loggedIn));

				if (loggedIn.id == null) {
					alert("Please login or register to save your pets");
				}

				api.handlePost("/api/pet", this.state.registerPet, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}
					console.log(JSON.stringify(response.result));
					store.dispatch(actions.registerPet(response.result));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"section",
					{ className: "full-screen dark" },
					React.createElement(
						"div",
						{ className: "post-grid grid-2 clearfix" },
						React.createElement(
							"div",
							{ className: "entry clearfix" },
							React.createElement("input", { onChange: this.capturePetInformation, id: "name", type: "text", className: "form-control input-lg not-dark", placeholder: "Pet Name" }),
							" ",
							React.createElement("br", null),
							React.createElement("input", { onChange: this.capturePetInformation, id: "species", type: "email", className: "form-control input-lg not-dark", placeholder: "Species" }),
							" ",
							React.createElement("br", null),
							React.createElement(
								"button",
								{ onClick: this.registerPet, className: "btn nomargin" },
								"Register"
							)
						),
						React.createElement(
							"div",
							{ className: "entry clearfix" },
							React.createElement("div", { className: "entry-image", style: { background: "url(\"/images/desk.jpg\") center", opacity: 0.4, overflow: "visible" } })
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