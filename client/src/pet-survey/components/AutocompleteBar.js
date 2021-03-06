import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest'
import store from '../../stores/store'
import { connect } from 'react-redux'
import {capturePetSurvey} from '../actions/actions'
import CatBreeds from '../../utils/CatBreeds'
import DogBreeds from '../../utils/DogBreeds'

class AutocompleteBar extends Component {

	constructor(props){
		super(props)
		this.dogBreeds = DogBreeds.breeds
		this.catBreeds = CatBreeds.breeds
		this.onChange = this.onChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
		this.state = {
			breeds: [],
		 	value: '',
		 	suggestions: []
	 }
	}

	componentDidMount(){
		let {petProfile} = this.props
		if (petProfile.dog === true) return this.setState({breeds: this.dogBreeds})
		if (petProfile.cat === true) return this.setState({breeds: this.catBreeds})
	}

	onChange(event, newValue){
		let response = Object.assign({}, this.props.petProfile)
		response['breed'] = newValue.newValue
		this.props.capturePetSurveyResponse(response)

	  this.setState({
      value: newValue.newValue
    })
  }

  onSuggestionsFetchRequested(value) {
    this.setState({
      suggestions: this.getSuggestions(value.value)
    })

  }

  onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    })
  }

	getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

	let suggestionArray = inputLength === 0 ? [] : this.state.breeds.filter(breed =>
		breed.toLowerCase().slice(0, inputLength) === inputValue
	)
	return (suggestionArray.length === 0) ? ['No matches.'] : suggestionArray

}

getSuggestionValue(suggestion){
	return suggestion
}

renderSuggestion(suggestion){
	return(
		<div style={{margin:"5px"}} className="button">
			{suggestion}
		</div>
	)
}

	render(){
		const {value, suggestions} = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    }

		return(
			<div>
			 <Autosuggest
				 suggestions={suggestions}
				 onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				 onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				 getSuggestionValue={this.getSuggestionValue}
				 renderSuggestion={this.renderSuggestion}
				 inputProps={inputProps}
			 />
		 </div>
		)
	}
}

const stateToProps = (state) => ({
	petProfile: state.petReducer.petProfile
})

const dispatchToProps = (dispatch) => ({
	capturePetSurveyResponse: (petProfile) => dispatch(capturePetSurvey(petProfile))
})

export default connect(stateToProps, dispatchToProps)(AutocompleteBar)
