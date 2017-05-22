import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import { connect } from 'react-redux'
import {Footer, Header} from '../components'

class Main extends Component {
	constructor(props, context){
		super(props, context)
	}

	render() {

		return (
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {

	return {
		user: state.userReducer.user,
	}
}

export default connect (stateToProps)(Main)
