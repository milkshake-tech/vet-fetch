import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import {Footer} from '../components'


class Main extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	render() {
		var {opacitySetting} = this.state

		return (
			<div style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
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
