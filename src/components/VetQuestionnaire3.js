import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import actions from '../actions/actions'

class VetQuestionnaire3 extends Component {

	constructor(props){
		super(props)
		this.captureVet = this.captureVet.bind(this)
		this.saveVetProfile = this.saveVetProfile.bind(this)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
		//TODO: GET customers within vet zipcode and flash alert
	}

	captureVet(event){
		event.preventDefault()
		var vetProfile = Object.assign({}, this.props.vet)
		vetProfile[event.target.id] = event.target.value
		this.props.captureVetProfile(vetProfile)
	}

	saveVetProfile(event){
		console.log("saveVetProfile: "+JSON.stringify(this.props.vet))
		//TODO: POST vet
	}

	render(){
		var {opacitySetting} = this.state


		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/vet-survey-2" className="button small back">Back</Link></li>
						</ul>
						<div className="inner" style={{textAlign:'center'}}>
								<h2 style={{margin:"25px"}}>Create Profile</h2>
								<p style={{margin: "10px"}}><input onChange={this.captureVet} id="email" style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"250px"}} placeholder="Email" className="col-md-3" type="text"/></p>
								<p style={{margin: "10px"}}><input onChange={this.captureVet} id="password" style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"200px"}} placeholder="Password" className="col-md-3" type="password"/></p>
							<Link style={{margin:"20px"}} onClick={this.saveVetProfile} to="/vet-home" className="button">Login</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

const stateToProps = function(state){
	return {
		vet: state.vetReducer.vet
	}
}

const dispatchToProps = (dispatch) => {
  return{
    captureVetProfile: (vet) => dispatch(actions.receivedVet(vet))
  }
}

export default connect (stateToProps, dispatchToProps) (VetQuestionnaire3)
