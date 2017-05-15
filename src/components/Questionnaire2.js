import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../stores/store'
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
			<div className='jumbotron' style={{opacity: opacitySetting, transitionProperty: "opacity", transitionDuration: "1s"}}>
				<div style={{display:'flex', justifyContent: 'space-around'}}>

					<div className='leftPanel'>
						<Link to="/survey-1" className="button small back">Back</Link>
						<img src="/assets/images/cat2.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />

					</div>
					<div style={{width:400+'px'}}>
						<h2 style={{margin:"25px"}}>Breed</h2>
						<AutocompleteBar />
						<Link style={{margin:"40px", float: 'right'}} to="/survey-3" className="button">Next</Link>
					</div>
				</div>
			</div>
		)
	}
}


export default Questionnaire2
