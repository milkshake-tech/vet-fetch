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
var Autosuggest = _interopRequire(require("react-autosuggest"));

var store = _interopRequire(require("../../stores/store"));

var connect = require("react-redux").connect;
var capturePetSurvey = require("../actions/actions").capturePetSurvey;
var CatBreeds = _interopRequire(require("../../utils/CatBreeds"));

var DogBreeds = _interopRequire(require("../../utils/DogBreeds"));

var AutocompleteBar = (function (Component) {
	function AutocompleteBar(props) {
		_classCallCheck(this, AutocompleteBar);

		_get(Object.getPrototypeOf(AutocompleteBar.prototype), "constructor", this).call(this, props);
		this.dogBreeds = DogBreeds.breeds;
		this.catBreeds = CatBreeds.breeds;
		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.getSuggestionValue = this.getSuggestionValue.bind(this);
		this.state = {
			breeds: [],
			value: "",
			suggestions: []
		};
	}

	_inherits(AutocompleteBar, Component);

	_prototypeProperties(AutocompleteBar, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var petProfile = this.props.petProfile;
				if (petProfile.dog === true) {
					return this.setState({ breeds: this.dogBreeds });
				}if (petProfile.cat === true) {
					return this.setState({ breeds: this.catBreeds });
				}
			},
			writable: true,
			configurable: true
		},
		onChange: {
			value: function onChange(event, newValue) {
				var response = Object.assign({}, this.props.petProfile);
				response.breed = newValue.newValue;
				this.props.capturePetSurveyResponse(response);

				this.setState({
					value: newValue.newValue
				});
			},
			writable: true,
			configurable: true
		},
		onSuggestionsFetchRequested: {
			value: function onSuggestionsFetchRequested(value) {
				this.setState({
					suggestions: this.getSuggestions(value.value)
				});
			},
			writable: true,
			configurable: true
		},
		onSuggestionsClearRequested: {
			value: function onSuggestionsClearRequested() {
				this.setState({
					suggestions: []
				});
			},
			writable: true,
			configurable: true
		},
		getSuggestions: {
			value: function getSuggestions(value) {
				var inputValue = value.trim().toLowerCase();
				var inputLength = inputValue.length;

				var suggestionArray = inputLength === 0 ? [] : this.state.breeds.filter(function (breed) {
					return breed.toLowerCase().slice(0, inputLength) === inputValue;
				});
				return suggestionArray.length === 0 ? ["No matches."] : suggestionArray;
			},
			writable: true,
			configurable: true
		},
		getSuggestionValue: {
			value: function getSuggestionValue(suggestion) {
				return suggestion;
			},
			writable: true,
			configurable: true
		},
		renderSuggestion: {
			value: function renderSuggestion(suggestion) {
				return React.createElement(
					"div",
					{ style: { margin: "5px" }, className: "button" },
					suggestion
				);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _state = this.state;
				var value = _state.value;
				var suggestions = _state.suggestions;
				var inputProps = {
					value: value,
					onChange: this.onChange
				};

				return React.createElement(
					"div",
					null,
					React.createElement(Autosuggest, {
						suggestions: suggestions,
						onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
						onSuggestionsClearRequested: this.onSuggestionsClearRequested,
						getSuggestionValue: this.getSuggestionValue,
						renderSuggestion: this.renderSuggestion,
						inputProps: inputProps
					})
				);
			},
			writable: true,
			configurable: true
		}
	});

	return AutocompleteBar;
})(Component);

var stateToProps = function (state) {
	return {
		petProfile: state.petReducer.petProfile
	};
};

var dispatchToProps = function (dispatch) {
	return {
		capturePetSurveyResponse: function (petProfile) {
			return dispatch(capturePetSurvey(petProfile));
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(AutocompleteBar);