import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class VetPortal extends Component {

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
					<div className="image">
						<img src="/images/survey.png" alt="" data-position="center center" />
					</div>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<header>
								<h2>Tell us about your vetinary practice</h2>
								<p>Answer a few questions about your clinic.</p>
							</header>
							<Link to="/vet-survey-1" className="button">Get Started</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default VetPortal
