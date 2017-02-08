import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire3 extends Component {

	constructor(props){
		super(props)
		this.conditionsList = ["allergies", "Arthritis", "Cancer", "Diabetes", "heart-disease", "Orthopedic Conditions", "Skin Conditions", "Thyroid Conditions"]
		this.highlightSelectedTile = this.highlightSelectedTile.bind(this)
		this.state = {
			highlight: false,
			highlightToggleState: {}
		}
	}

	highlightSelectedTile(event){
		var highlightToggle = Object.assign({}, this.state.highlightToggleState)
		highlightToggle[event.target.id] = !this.state.highlight

		this.setState({highlight: !this.state.highlight, highlightToggleState: highlightToggle})
	}

	render(){
		var {highlightToggleState} = this.state
		// console.log("this.state.highlightToggleState: "+JSON.stringify(this.state.highlightToggleState))
		var highlightState = ""
		for (var condition of this.conditionsList){
			// console.log("condition: "+JSON.stringify(condition))
			var conditionName = condition
			console.log("highlightToggleState: "+JSON.stringify(highlightToggleState))
			console.log("highlightToggleState[condition]: "+JSON.stringify(highlightToggleState[conditionName]))
			if (highlightToggleState[conditionName] == true){
				highlightState = "lightgreen"
			}
		}
		console.log("highlightState: "+JSON.stringify(highlightState))


		var _this = this
		var conditionTile = this.conditionsList.map(function(condition, i){
			return(
					<div onClick={_this.highlightSelectedTile} key={i} id={condition} style={{margin: "10px", backgroundColor: highlightState}} className="button">
						{condition}
					</div>
				)
		  })

		return(
			<div>
				<article id="work" className="panel secondary">
					<div className="image">
						<img src="/images/dogface.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-2" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Pre-Existing Conditions</h2>
									<p>Does your dog have a history of any of the following?</p>
							</header>
							<div className="row">
								<div className="col-md-12">
									{conditionTile}
								</div>
							</div>
							<Link style={{margin:"40px"}} to="/survey-results" className="button">Next</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default Questionnaire3
