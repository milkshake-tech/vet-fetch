import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import {receivedSearchResults} from '../actions/actions'
import { connect } from 'react-redux'
import APIManager from '../utils/APIManager'

class Landing extends Component {

	constructor(props, context){
		super(props)
		this.captureZipcode = this.captureZipcode.bind(this)
		this.searchVets = this.searchVets.bind(this)
		this.state = {
			searchZipcode: null
		}
	}

	captureZipcode(event){
		this.setState({searchZipcode: event.target.value})
	}

	searchVets(){
		let _this = this
		APIManager.handleGet('/api/search', {zipcode: this.state.searchZipcode}, function(err, res){
			if (err) return alert('Oops something went wrong. Try a different search.')
			if (res.confirmation === 'Success') {
				_this.props.fetchSearchResults(res.results)}
				browserHistory.push('/searchresults')
				return
		})
	}

	render() {

		return (
			<div className='jumbotron' style={{textAlign:'center'}}>
				<div>
					<img src='/assets/images/vetFetch_blue.png'/>
				</div>
				<div >
					<h2 style={{color: '#7ec2d9'}}>Search. Book. Review.</h2>
				</div>
				<div className="searchRow">
					<div style={{margin: .5+'em'}}><input className="customInput" placeholder='Enter your zip' onChange={this.captureZipcode}/></div>
					<div style={{margin: .5+'em'}}><button onClick={this.searchVets}>Submit</button></div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	user: state.userReducer.user
})

const dispatchToProps = (dispatch) => ({
	fetchSearchResults: (searchResults) => dispatch(receivedSearchResults(searchResults))
})

export default connect (stateToProps, dispatchToProps)(Landing)
