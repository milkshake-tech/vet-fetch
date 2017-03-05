import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../stores/store'
import actions from '../actions/actions'
import APIManager from '../utils/APIManager'
import {TopBar, SideMenu} from './view'

class VetHome extends Component {

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
		var {vet} = this.props

		return(
			<div>
			<TopBar />
			<SideMenu />
			<div className="content-page" style={{marginLeft: "0px"}}>
				<div className="content">
					<div className="container" >
						<div className="row">
							<div>content goes here</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		vet: state.vetReducer.vet
	}
}

export default connect (stateToProps) (VetHome)
