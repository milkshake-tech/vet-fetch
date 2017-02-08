import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Autosuggest from 'react-autosuggest'
import DogBreeds from '../utils/DogBreeds'

class AutocompleteBar extends Component {

	constructor(props){
		super(props)
		this.breeds = DogBreeds.breeds
		this.onChange = this.onChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
		this.state = {
		 value: '',
		 suggestions: []
	 }
	}

	componentDidMount(){
		var arrayCheck= Array.isArray(this.breeds)
		console.log("AutocompleteBar this.breeds: "+JSON.stringify(this.breeds))
	}

	onChange(event, newValue){

    this.setState({
      value: newValue.newValue
    });
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
	console.log("getSuggestions: "+JSON.stringify(value))
  return inputLength === 0 ? [] : this.breeds.filter(breed =>
    breed.toLowerCase().slice(0, inputLength) === inputValue
  )
}

getSuggestionValue(suggestion){
	return suggestion
}

renderSuggestion(suggestion){
	return(
		<div style={{margin:"40px"}}>
			{suggestion}
		</div>
	)
}

	render(){
		const { value, suggestions} = this.state;

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

export default AutocompleteBar
