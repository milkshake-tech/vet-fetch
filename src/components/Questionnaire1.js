import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class Questionnaire1 extends Component {

	constructor(props){
		super(props)
		this.petTypeSelected = this.petTypeSelected.bind(this)
		this.state = {
			displaySelectionCheck: {
				dog: false,
				cat: false,
			},
			opacitySetting: 0
		}
	}

	componentDidMount(){
		this.setState({opacitySetting: 1})
	}

	petTypeSelected(event){
		var displaySelection = Object.assign({}, this.state.displaySelectionCheck)
		displaySelection[event.target.id] = !displaySelection[event.target.id]
		this.setState({displaySelectionCheck: displaySelection})
	}

	render(){
		var {displaySelectionCheck, opacitySetting} = this.state
		var dogImgDisplay = displaySelectionCheck.dog == true ? "images/check.png" : "/images/dog.png"
		var catImgDisplay = displaySelectionCheck.cat == true ? "images/check.png" : "/images/cat.png"

		return(
			<div>
				<article id="work" className="panel secondary" style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
					<div className="content">
						<ul className="actions spinX">
							<li><Link to="/survey" className="button small back">Back</Link></li>
						</ul>
						<div className="inner">
							<div style={{textAlign: "center"}}className="row">
								<div className="col-md-6">
										<h2>Pick your pet</h2>
										<a onClick={this.petTypeSelected} style={{borderBottom: "none", padding: '10px', cursor:"pointer"}}><img style={{margin:"20px"}} id="dog" src={dogImgDisplay} data-position="center center" /></a>

										<a onClick={this.petTypeSelected} style={{borderBottom: "none", padding: '10px', cursor:"pointer"}}><img style={{margin:"20px"}} id="cat" src={catImgDisplay} data-position="center center" /></a>
								</div>
							</div>
						</div>
					</div>
					<div className="content">
						<div className="inner" style={{marginTop: "100px"}}>
							<div style={{textAlign: "center"}} className="row">
								<div className="col-md-6">
										<h2>Age</h2>
									<p style={{margin: "10px"}}><input style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"100px"}} className="col-md-3" type="text"/> years old.</p>
								</div>
							</div>
						</div>
						<div style={{textAlign: "center"}} className="row">
							<Link to="/survey-2" style={{margin:"40px"}} className="button">Next</Link>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default Questionnaire1
