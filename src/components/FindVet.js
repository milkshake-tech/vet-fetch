import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class FindVet extends Component {

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
								<h2>Find a vetenarian near you</h2>
								<input type="text" placeholder="Enter your zipcode"/>
							</header>
							<Link to="/survey-1" className="button">Search</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default FindVet
