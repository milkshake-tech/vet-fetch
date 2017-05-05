import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import { connect } from 'react-redux'
import {SearchResultItem} from '../components'

class SearchResults extends Component {
	constructor(props){
		super(props)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	render(){
		var {opacitySetting} = this.state
		var {searchResults} = this.props
		var vetResultsList = searchResults.veterinarians.map(function(result, i){
			return(
				<SearchResultItem key={i} resultItem={result} />
			)
		})
		return(
			<div className="jumbotron" style={{textAlign:'center'}}>
				<div className='searchResultsRow'>
					<div>
						<Link to="/"><div className='button small back' style={{display:'block', marginBottom: 2+'em', width:10+'em'}}>Back</div></Link>
						<img src='/assets/images/sittingdog.png'/>
					</div>
					<div>
						<h3>{searchResults.totalResults} veterinarians near {searchResults.zipcode}</h3>
						{vetResultsList}
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	searchResults: state.searchReducer.searchResults
})

export default connect(stateToProps)(SearchResults)
