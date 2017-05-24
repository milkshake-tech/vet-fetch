import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import APIManager from '../utils/APIManager'
import {connect} from 'react-redux'
import store from '../stores/store'
import {receivedUser} from '../user/actions/actions'

class Header extends Component {

	constructor(props, context){
		super(props, context)
		this.captureUserInput = this.captureUserInput.bind(this)
		this.displayLogin = this.displayLogin.bind(this)
		this.displaySignUp = this.displaySignUp.bind(this)
		this.loginUser = this.loginUser.bind(this)
		this.logout = this.logout.bind(this)
		this.state = {
			loginVisible: false,
			userCapture: {}
		}
	}

	captureUserInput(event){
		let newUserCapture = Object.assign({}, this.state.userCapture)
		newUserCapture[event.target.id] = event.target.value
		this.setState({userCapture: newUserCapture})
	}

	displayLogin(){
		this.setState({loginVisible:!this.state.loginVisible})
	}

	displaySignUp(){
		this.setState({loginVisible:false})
		browserHistory.push('/signup')
	}

	loginUser(){
		let _this = this
		APIManager.handlePost('/user/login', this.state.userCapture, function(err, response){
			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))
			if (response.confirmation === 'Success') {
				_this.props.captureCurrentUser(response.currentUser)
				_this.setState({loginVisible:false})
				browserHistory.push('/profile')
				return
			}
		})
	}

	logout(){
		let _this = this
		APIManager.handleGet('/user/logout', null, function(err, response){
			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))
			if (response.confirmation === 'Success') {
				_this.props.captureCurrentUser({})
				browserHistory.push('/')
				return
			}
		})
	}

	render() {
		let {user} = this.props

		return (
			<div>
				<div className="header">
	        <div style={{marginLeft:6+'em'}}>
	          <Link to='/' style={{border: 'none'}}><img src="/assets/images/vetFetch_white_sm.png"/></Link>
	        </div>
	        <div style={{marginRight:6+'em', cursor:'pointer', display: user.id === undefined ? 'block':'none'}} onClick={this.displayLogin}>
	          Sign Up / Log In
	        </div>
					<div style={{marginRight:6+'em', cursor:'pointer', display: user.id === undefined ? 'none':'block'}} onClick={this.logout}>
					 Logout
				 </div>
	      </div>
				<div style={{display:this.state.loginVisible ? 'block':'none', border:'1px solid black', width:350+'px', backgroundColor:'white', position:'fixed', right:0, top:45+'px', boxShadow:'rgb(211, 211, 211) 2px 5px 6px 7px'}}>
					<p style={{margin:'1em auto 1em auto'}}><input id="email" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"12px", margin: 'auto', width:"250px"}} placeholder="Email" type="text"/></p>
					<p style={{margin:'auto'}}><input id="password" onChange={this.captureUserInput} style={{borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"12px", margin: 'auto', width:"250px"}} placeholder="Password" type="password"/></p>
					<div style={{margin: '1em auto', fontSize:8+'px', textAlign:'center'}}><button onClick={this.loginUser}>Login</button></div>
					<p style={{margin:'1em auto 1em auto', textAlign:'center'}}>New to vetFetch? Sign up <a style={{cursor:'pointer'}} onClick={this.displaySignUp}>here</a></p>
				</div>
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
	return {
		captureCurrentUser: (user) => dispatch(receivedUser(user))
	}
}

export default connect(stateToProps, dispatchToProps)(Header)
