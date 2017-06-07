import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import { receivedSearchResults } from '../vet-search/actions/actions'
import { connect } from 'react-redux'
import APIManager from '../utils/APIManager'
import Header from './Header'
import Footer from './Footer'

class Landing extends Component {

	constructor(props, context){
		super(props)
		this.captureZipcode = this.captureZipcode.bind(this)
		this.onEnterPress = this.onEnterPress.bind(this)
		this.searchVets = this.searchVets.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
		this.state = {
			searchZipcode: null,
			focus: false
		}
	}

	captureZipcode(event){
		const value = event.target.value
		this.setState({ searchZipcode: value })
	}

	onEnterPress(event){
		if(event.key === 'Enter') return this.searchVets()
	}

	searchVets(){
		let _this = this
		APIManager.handleGet('/api/search', {zipcode: this.state.searchZipcode, offset: 0}, (err, res) => {
			if (err) return alert('Oops something went wrong. Try a different search.')
			if (res.confirmation === 'Fail') return alert(JSON.stringify(res.message))
			if (res.confirmation === 'Success') {
				_this.props.fetchSearchResults(res.results)
				browserHistory.push('/searchresults')
				return
			}
		})
	}

	handleFocus(event){
		this.setState({ focus: true })
	}

	handleBlur(event){
		this.setState({ focus: false })
	}

	render() {
		return (
			<div className='jumbotron'>
				<div>
					<img src='/assets/images/vetFetch_blue.png' className='landing-logo'/>
				</div>

				<div >
					<h2 className='jumbotron-title'>Find local care.</h2>
				</div>

				<div className="searchRow">
					<div>
						<input className="custom-input" placeholder='Enter your zip' onChange={this.captureZipcode} onKeyPress={this.onEnterPress} onFocus={this.handleFocus} onBlur={this.handleBlur}/>
					</div>

					<div id='submit-btn' className={this.state.focus ? 'slide-true' : 'slide-false'}>
						<button onClick={this.searchVets}>Search</button>
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	user: state.userReducer.user,
	pets: state.userReducer.pets
})

const dispatchToProps = (dispatch) => ({
	fetchSearchResults: (searchResults) => dispatch(receivedSearchResults(searchResults))
})

export default connect (stateToProps, dispatchToProps)(Landing)
