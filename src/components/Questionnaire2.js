import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire2 extends Component {

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

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-1" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
								<h2 style={{margin:"25px"}}>Breed</h2>
								<AutocompleteBar />
							<Link style={{margin:"20px"}} to="/survey-3" className="button">Next</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default Questionnaire2
