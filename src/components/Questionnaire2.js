import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import AutocompleteBar from '../components/AutocompleteBar'

class Questionnaire2 extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount(){
		console.log("Questionnaire2 componentDidMount")
	}

	render(){
		return(
			<div>
				<article id="work" className="panel secondary">
					<div className="image">
						<img src="/images/dogface.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey-1" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
								<h2>Breed</h2>
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
