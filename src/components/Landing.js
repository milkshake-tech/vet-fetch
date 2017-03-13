import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class Landing extends Component {

	constructor(props, context){
		super(props, context)
	}

	componentDidMount() {
	}

	render() {

		return (
			<div id="home" className="jumbotron" style={{backgroundColor: 'white', textAlign:'center'}}>
			<div className="container" style={{marginTop: -5+"em"}}>
					<img src="/images/vetFetch_blue.png" />
				</div>
				<div className="row">
					<h2 style={{color: "#7ec2d9"}}>Search. Book. Review.</h2>
				</div>
				<div className="row" style={{height: 10+"em"}}>
					<div className="col-md-12" style={{textAlign: 'center', height: '100%', display:"flex", justifyContent:'center', alignItems:'center'}}>
						<input className="customInput" placeholder='Enter your zip' />
						<button className="search-btn">Submit</button>
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = function(state) {

	return {
		user: state.userReducer.user
	}
}

export default connect (stateToProps)(Landing)
