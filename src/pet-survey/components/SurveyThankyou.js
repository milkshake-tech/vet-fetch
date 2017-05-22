import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../stores/store'
import { connect } from 'react-redux'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire3 extends Component {

	constructor(props){
		super(props)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		console.log('Line 15 petPROFILE: '+JSON.stringify(this.props.petProfile))
		//check for current user. If current user === true, display btn to profile page
		//if current user === null, display btn to create account
		this.setState({opacitySetting: 1})
	}

	render(){
		var {opacitySetting} = this.state
		var _this = this


		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{margin:2+'em'}}><Link to="/survey-3" className="button small back" style={{marginLeft: 2+'em'}}>Back</Link></div>

				<div style={{display:'flex', justifyContent: 'space-around'}}>
					<div className='leftPanel'>
						<img src="/assets/images/corgi.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />
					</div>

					<div style={{width:600+'px'}}>
						<h2 style={{margin: "25px"}}>Thank you! Your pet profile is ready.</h2>
						<p style={{margin: "25px"}}>Create an account to check it out and bookmark veterinarians.</p>
						<div style={{textAlign:'center'}}><Link to='/signup' className='button'>Sign Up</Link></div>
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => ({
	petProfile: state.petReducer.petProfile
})

export default connect(stateToProps)(Questionnaire3)
