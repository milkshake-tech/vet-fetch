import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../stores/store'
import { connect } from 'react-redux'
import { receivedSearchResults } from '../actions/actions'
import { toggleSignupModal } from '../../user/actions/actions'
import { SearchResultItem } from '../components'
import { UserCapture } from '../../user/components'
import APIManager from '../../utils/APIManager'

class SearchResults extends Component {
	constructor(props){
		super(props)
		this.resultsPagination = this.resultsPagination.bind(this)
		this.startPetSurvey = this.startPetSurvey.bind(this)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	resultsPagination(event){
		let {searchResults} = this.props
		var searchOffset = parseInt(searchResults.offset)+parseInt(event.target.id)
		if (searchOffset < 0){
			searchOffset = 0
		}
		let _this = this
		APIManager.handleGet('/api/search', {zipcode: searchResults.zipcode, offset: searchOffset}, function(err, res){
			if (err) return alert('Oops something went wrong loading your results.')
			if (res.confirmation === 'Success') {
				_this.props.fetchSearchResults(res.results)
				return
			}
		})
	}

	startPetSurvey(){
		if (this.props.user === null){
			this.props.toggleSignup(true)
		} else{
			browserHistory.push('/survey-1')
		}
	}

	render(){
		var {opacitySetting} = this.state
		let {searchResults} = this.props
		let displayedSearchResults = 10+parseInt(searchResults.offset)
		if (displayedSearchResults > searchResults.totalResults){
			displayedSearchResults = searchResults.totalResults
		}
		var vetResultsList = searchResults.veterinarians.map(function(result, i){
			return(
				<SearchResultItem key={i} resultItem={result} />
			)
		})
		if (searchResults.veterinarians.length === 0){
			vetResultsList = <p style={{marginTop:1+'em'}}>Woof! Looks like they are no more search results to display.</p>
			displayedSearchResults = 0
		}
		return(
			<div className='jumbotron' style={{textAlign:'center'}}>
				<div>
					<Link to="/" style={{border:'none'}}><div className='button small back' style={{display:'block', marginLeft: 2+'em', width:22+'em'}}>Start a new search</div></Link>
				</div>
				<div className='searchResultsRow'>
					<div className='leftPanel'>
						<img src="/assets/images/sittingdog.png" className='searchImg'/>
						<p style={{display:'block', fontSize: 14+'px', margin:2+'em'}}>Psss...Save your pet records on vetFetch for your next appointment.</p>
						<button style={{marginBottom: 4+'em'}} onClick={this.startPetSurvey}>Get started here, woof!</button>
					</div>

					<div>
						<h3>{searchResults.totalResults} veterinarians near {searchResults.zipcode}</h3>
						<div style={{fontSize:10+'px'}}>
							<button id='-10' onClick={this.resultsPagination}>Last</button>
							<p style={{display:'inline', fontSize:11+'px', marginLeft:1+'em', marginRight:1+'em'}}>displaying {displayedSearchResults} of {searchResults.totalResults} results</p>
							<button id='10' onClick={this.resultsPagination}>Next</button>
						</div>
						<div style={{marginTop: 2+'em', border:'solid rgb(219,220,255)', borderRadius:.75+'em', height: 400+'px', width:600+'px', overflowY:'scroll'}}>
							{vetResultsList}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	searchResults: state.searchReducer.searchResults,
	user: state.userReducer.user
})

const dispatchToProps = (dispatch) => ({
	fetchSearchResults: (searchResults) => dispatch(receivedSearchResults(searchResults)),
	toggleSignup: (toggleState) => dispatch(toggleSignupModal(toggleState))
})

export default connect(stateToProps, dispatchToProps)(SearchResults)
