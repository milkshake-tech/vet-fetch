import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../stores/store'
import actions from '../actions/actions'
import APIManager from '../utils/APIManager'

class UserProfile extends Component {

	constructor(props){
		super(props)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
		var _this = this

		APIManager.handleGet('/user/currentuser', null, function(err, response){
			if (err){
				alert(JSON.stringify(err))
				return
			}
			if (response.confirmation == "Fail"){
				console.log("res: "+JSON.stringify(response))
				return
			}

			if (response.confirmation == "Success"){
				console.log("res: "+JSON.stringify(response))
				_this.props.captureCurrentUser(response.user)
				return
			}
		})
	}

	render(){
		var {opacitySetting} = this.state
		console.log("this.props.user: "+JSON.stringify(this.props.user))
		var {user} = this.props

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="content">
						<ul className="actions spinX">
							<li> </li>
						</ul>
						<div className="inner">
							<header>
								<h2>Profile</h2>
							</header>
							<p>Contact email: {user.email}</p>
						</div>
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-results" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Pets</h2>
							</header>

							<div>
								<img style={{cursor:"pointer"}} src="/images/dog2.png"/>
							</div>

						</div>
					</div>
				</article>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

const dispatchToProps = (dispatch) => {
	return{
		captureCurrentUser: (user) => dispatch(actions.receivedUser(user))
	}
}

export default connect (stateToProps, dispatchToProps) (UserProfile)
