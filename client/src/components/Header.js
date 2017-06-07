import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import APIManager from '../utils/APIManager'
import { connect } from 'react-redux'
import store from '../stores/store'
import { receivedUser } from '../user/actions/actions'

class Header extends Component {

	constructor(props){
		super(props)
		this.captureUserInput = this.captureUserInput.bind(this)
		this.displayLogin = this.displayLogin.bind(this)
		this.displaySignUp = this.displaySignUp.bind(this)
		this.loginUser = this.loginUser.bind(this)
		this.state = {
			loginVisible: false,
			userCapture: {}
		}
	}

	captureUserInput(event){
		const id = event.target.id
		const value = event.target.value
		let newUserCapture = Object.assign({}, this.state.userCapture)
		newUserCapture[id] = value
		this.setState({ userCapture: newUserCapture })
	}

	displayLogin(){
		this.setState({ loginVisible:!this.state.loginVisible })
	}

	displaySignUp(){
		this.setState({ loginVisible:false })
		browserHistory.push('/signup')
	}

	loginUser(){
		let _this = this
		APIManager.handlePost('/login', this.state.userCapture, (err, res) => {
			if(err){
				return alert('Oops! Your email or password is incorrect.')
			}

			if (res.confirmation === 'Success') {
				_this.props.captureCurrentUser(res.result)
				_this.setState({ loginVisible:false })
				browserHistory.push('/profile')
				return
			}
		})
	}

	render() {
		let { user } = this.props

		return (
			<div>
				<div className="header">
	        <div className='logo-container'>
	          <Link to='/' className='logo-link'><img src="/assets/images/vetFetch_white_sm.png"/></Link>
	        </div>

	        <div className='register-btn' id={ user ? 'menu-hidden' : 'menu-active' } onClick={ this.displayLogin }>
	          Sign Up / Log In
	        </div>

					<div className='register-btn' id={ user ? 'menu-active' : 'menu-hidden' } >
					 <Link to='/profile' className='logo-link'><img src='/assets/images/user.png'/></Link>
				 </div>
	      </div>

				<div className='register-dropdown' id={ this.state.loginVisible ? 'menu-active' : 'menu-hidden' }>
					<input id="email" onChange={ this.captureUserInput } className='login-input' style={ localStyle.inputWidth } placeholder="Email" type="text"/>
					<input id="password" onChange={ this.captureUserInput } className='login-input' style={ localStyle.inputWidth } placeholder="Password" type="password"/>

					<div className='register-nav'>
						<button onClick={ this.loginUser }>Login</button>
					</div>

					<p className='register-nav'>New to vetFetch? Sign up <a onClick={ this.displaySignUp } style={ localStyle.pointer }>here</a></p>
				</div>
			</div>
		)
	}
}

const localStyle = {
	pointer: {
		cursor: 'pointer'
	},
	inputWidth: {
		width: 250+'px'
	}
}

const stateToProps = (state) => ({
	user: state.userReducer.user
})

const dispatchToProps = (dispatch) => ({
	captureCurrentUser: (user) => dispatch(receivedUser(user))
})

export default connect(stateToProps, dispatchToProps)(Header)
