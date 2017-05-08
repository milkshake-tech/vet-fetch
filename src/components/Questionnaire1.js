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

		var catImgDisplay = displaySelectionCheck.dog == true ? "none" : "inline"
		var dogImgDisplay = displaySelectionCheck.cat == true ? "none" : "inline"
		return(
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{display:'flex', justifyContent: 'space-around'}}>

					<div>
						<Link to="/searchresults" className="button small back">Back</Link>

						<div style={{marginTop:2+'em'}}>
							<h2>Pick your pet</h2>
							<a onClick={this.petTypeSelected} style={{borderBottom: "none", padding: '10px', cursor:"pointer"}}><img style={{margin:"20px", display:dogImgDisplay}} id="dog" src="/assets/images/dog2.png" data-position="center center" /></a>
							<a onClick={this.petTypeSelected} style={{borderBottom: "none", padding: '10px', cursor:"pointer"}}><img style={{margin:"20px", display:catImgDisplay}} id="cat" src="/assets/images/cat2.png" data-position="center center" /></a>
						</div>
					</div>

					<div style={{marginTop:4.5+'em'}}>
						<div style={{display: 'flex', justifyContent: 'space-around'}}>
							<div style={{textAlign:'center'}}>
								<h2>Age</h2>
								<p style={{margin: "10px"}}><input style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"100px", placeholder:'2'}} type="text"/></p>
							</div>

							<div style={{textAlign:'center'}}>
								<h2>Sex</h2>
								<p style={{margin: "10px"}}>
									<select style={{margin:"auto", borderRight:"none", borderLeft:"none", borderTop:"none", fontSize:"25px", width:"140px"}} type="text">
										<option>Female</option>
										<option>Male</option>
									</select>
									</p>
							</div>

						</div>

						<Link to="/survey-2" style={{margin:"40px"}} className="button">Next</Link>
					</div>

				</div>
			</div>
		)
	}
}

export default Questionnaire1
