import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire3 extends Component {

	constructor(props){
		super(props)
		this.conditionsList = ["Allergies", "Arthritis", "Cancer", "Diabetes", "Ear Infections", "Heart Disease", "Neutered or Spayed", "Orthopedic Conditions", "Skin Conditions", "Thyroid Conditions"]
		this.highlightSelectedTile = this.highlightSelectedTile.bind(this)
		this.state = {
			highlight: false,
			highlightToggleState: {},
			opacitySetting: 0
				}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	highlightSelectedTile(event){
		var {highlightToggleState} = this.state
		var highlightToggle = Object.assign({}, highlightToggleState)

		if (highlightToggle[event.target.id] == null){
			highlightToggle[event.target.id] = true
			console.log("new condition clicked: "+JSON.stringify(event.target.id)+", "+JSON.stringify(highlightToggle[event.target.id]))

			this.setState({highlight: true, highlightToggleState: highlightToggle})
			return
		}
		highlightToggle[event.target.id] = !this.state.highlight
		console.log("condition clicked again: "+JSON.stringify(event.target.id)+", "+JSON.stringify(highlightToggle[event.target.id]))

		this.setState({highlight: !this.state.highlight, highlightToggleState: highlightToggle})
	}

	render(){
		var {highlightToggleState, opacitySetting} = this.state
		var highlightState = {}
		var highlightColor = ""

		for (var condition of this.conditionsList){
			var conditionName = condition
			if (highlightToggleState[conditionName] == true){
				highlightState[conditionName] = "lightgreen"
				console.log("highlight color for: "+JSON.stringify(conditionName)+", "+JSON.stringify(highlightState))
			}
		}

		var _this = this
		var conditionTile = this.conditionsList.map(function(condition, i){
			return(
					<div onClick={_this.highlightSelectedTile} key={i} id={condition} style={{margin: "10px", backgroundColor: highlightState[condition]}} className="button">
						{condition}
					</div>
				)
		  })

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="image">
						<img src="/images/dogface.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-2" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
								<h2 style={{margin: "25px"}}>Does your dog have a history of any of the following?</h2>
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
