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
var store = _interopRequire(require("../../stores/store"));

var _actionsActions = require("../actions/actions");

var receivedPets = _actionsActions.receivedPets;
var receivedUser = _actionsActions.receivedUser;
var APIManager = _interopRequire(require("../../utils/APIManager"));

var PetProfileRow = require("../components").PetProfileRow;
var UserProfile = (function (Component) {
	function UserProfile(props) {
		_classCallCheck(this, UserProfile);

		_get(Object.getPrototypeOf(UserProfile.prototype), "constructor", this).call(this, props);
		this.fetchPets = this.fetchPets.bind(this);
		this.logout = this.logout.bind(this);
		this.state = {
			opacitySetting: 0
		};
	}

	_inherits(UserProfile, Component);

	_prototypeProperties(UserProfile, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.setState({ opacitySetting: 1 });
			},
			writable: true,
			configurable: true
		},
		fetchPets: {
			value: function fetchPets(userID) {
				var _this = this;
				APIManager.handleGet("/api/pet", { ownerID: userID }, function (err, response) {
					if (err) return alert(JSON.stringify(err));

					if (response.confirmation === "Fail") return browserHistory.push("/");

					if (response.confirmation === "Success") {
						_this.props.capturePets(response.results);
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		logout: {
			value: function logout() {
				var _this = this;
				APIManager.handleGet("/logout", null, function (err, response) {
					if (response.confirmation === "Fail") return alert(JSON.stringify(response));
					if (response.confirmation === "Success") {
						_this.props.captureCurrentUser({});
						browserHistory.push("/");
						return;
					}
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var opacitySetting = this.state.opacitySetting;
				var _props = this.props;
				var pets = _props.pets;
				var user = _props.user;
				var petResults = undefined;

				if (pets === null) {
					petResults = React.createElement(
						"h2",
						null,
						"Nothing to see here"
					);
				} else {
					petResults = pets.map(function (result, i) {
						return React.createElement(PetProfileRow, { key: i, pet: result });
					});
				}

				return React.createElement(
					"div",
					{ className: "jumbotron", style: { opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s" } },
					React.createElement(
						"div",
						{ style: { margin: 2 + "em" } },
						React.createElement(
							Link,
							{ to: "/", className: "button small back", style: { marginLeft: 2 + "em" } },
							"Search Veterinarians"
						)
					),
					React.createElement(
						"div",
						{ style: { display: "flex", justifyContent: "space-around" } },
						React.createElement(
							"div",
							{ className: "leftPanel", style: { textAlign: "center" } },
							React.createElement(
								"h2",
								null,
								"Profile"
							),
							React.createElement("img", { src: "/assets/images/email.png", style: { display: "inline", marginBottom: -0.25 + "em", marginRight: 0.5 + "em" } }),
							React.createElement(
								"p",
								{ style: { display: "inline", fontSize: 12 + "px" } },
								user.email
							),
							React.createElement(
								"button",
								{ onClick: this.logout, style: { fontSize: 8 + "px", display: "block", margin: "1em auto" } },
								"Logout"
							)
						),
						React.createElement(
							"div",
							{ style: { width: 600 + "px", textAlign: "center" } },
							React.createElement(
								"h2",
								null,
								"Pets"
							),
							petResults
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return UserProfile;
})(Component);

var stateToProps = function (state) {
	return {
		user: state.userReducer.user,
		pets: state.userReducer.pets
	};
};

var dispatchToProps = function (dispatch) {
	return {
		captureCurrentUser: function (user) {
			return dispatch(receivedUser(user));
		},
		capturePets: function (pets) {
			return dispatch(receivedPets(pets));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(UserProfile);