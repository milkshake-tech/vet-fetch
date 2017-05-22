import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../../stores/store'
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
				<div style={{margin:2+'em'}}><Link to="/survey-1" className="button small back" style={{marginLeft: 2+'em'}}>Back</Link></div>

				<div style={{display:'flex', justifyContent: 'space-around'}}>
					<div className='leftPanel'>
						<img src="/assets/images/cat.png" style={{display: 'block', marginTop:4+'em', marginLeft:'auto', marginRight:'auto'}} />
					</div>
					<div style={{width:400+'px'}}>
						<h2 style={{margin:25+'px', textAlign:'center'}}>Breed</h2>
						<AutocompleteBar />
					</div>
				</div>
				<Link to="/survey-3" style={{marginRight:6+'em', float:'right'}} className="button">Next</Link>
			</div>
		)
	}
}


export default Questionnaire2
