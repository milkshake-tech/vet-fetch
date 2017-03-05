import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
import actions from '../actions/actions'

class VetQuestionnaire1 extends Component {

	constructor(props){
		super(props)
		this.captureVet = this.captureVet.bind(this)
		this.state = {
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	captureVet(event){
		event.preventDefault()
		var vetProfile = Object.assign({}, this.props.vet)
		vetProfile[event.target.id] = event.target.value
		this.props.captureVetProfile(vetProfile)
	}

	render(){
		var {opacitySetting} = this.state

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/vet-portal" className="button small back">Back</Link></li>
						</ul>
						<div className="inner" style={{textAlign:'center'}}>
								<h2 style={{margin:"25px"}}>Name</h2>
								<p style={{margin: "10px"}}><input onChange={this.captureVet} id="firstName" style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"200px"}} placeholder="First" className="col-md-3" type="text"/></p>
								<p style={{margin: "10px"}}><input onChange={this.captureVet} id="lastName" style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"200px"}} placeholder="Last" className="col-md-3" type="text"/></p>
							<Link style={{margin:"20px"}} to="/vet-survey-2" className="button">Next</Link>
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

export default connect (stateToProps, dispatchToProps)(VetQuestionnaire1)
