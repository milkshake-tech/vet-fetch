import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../stores/store'
import { connect } from 'react-redux'
import AutocompleteBar from '../components/AutocompleteBar'
import APIManager from '../../utils/APIManager'

class SurveyThankyou extends Component {

	constructor(props){
		super(props)
		this.saveUserPet = this.saveUserPet.bind(this)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	saveUserPet(){
		let newPetProfile = Object.assign({}, this.props.petProfile)
		newPetProfile['ownerID'] = this.props.user.id

		APIManager.handlePost("/api/pet", newPetProfile, function(err, response){
			if(err) return alert(err)

			if (response.confirmation === 'Fail') return alert(JSON.stringify(response))

			if (response.confirmation === "Success") return browserHistory.push('/profile')
		})
	}

	render(){
		let {opacitySetting} = this.state
		let {user} = this.props
		let _this = this

		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{margin:2+'em'}}><Link to="/survey-3" className="button small back" style={{marginLeft: 2+'em'}}>Back</Link></div>

				<div style={{display:'flex', justifyContent: 'space-around'}}>
					<div className='leftPanel'>
						<img src="/assets/images/corgi.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />
					</div>

					<div style={{width:600+'px', display: user.id === undefined ? 'block':'none'}}>
						<h2 style={{margin: "25px"}}>Thank you! Your pet profile is ready.</h2>
						<p style={{margin: "25px"}}>Create an account to check it out and bookmark veterinarians.</p>
						<div style={{textAlign:'center'}}><Link to='/signup' className='button'>Sign Up</Link></div>
					</div>
					<div style={{width:600+'px', display: user.id === undefined ? 'none':'block'}}>
						<h2 style={{margin: "25px"}}>Thank you! Your pet profile is ready.</h2>
						<div style={{textAlign:'center'}}><button onClick={this.saveUserPet}>Save to profile</button></div>
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	petProfile: state.petReducer.petProfile,
	user: state.userReducer.user
})

export default connect(stateToProps)(SurveyThankyou)
