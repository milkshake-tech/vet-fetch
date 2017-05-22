import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class PetProfileRow extends Component {

	constructor(props){
		super(props)
		this.toggleResultDetail = this.toggleResultDetail.bind(this)
		this.state = {
			displayResultDetail: false
		}
	}

	toggleResultDetail(event){
		return this.setState({displayResultDetail: !this.state.displayResultDetail})
	}

	render(){
		var {pet} = this.props
		return(
			<div className="searchResultCard" style={{height:'auto', marginTop:1+'em', marginLeft: 2+'em', marginRight:2+'em', display:'block', overflowX:'hidden'}} onClick={this.toggleResultDetail}>
				<p style={{fontSize: 11+'px'}}>{pet.name}</p>
				<div style={{display: this.state.displayResultDetail ? 'block' : 'none'}}>
					<div style={{display: 'flex', justifyContent:'space-around'}}>
						<div style={{textAlign:'left'}}>
							<div>
								<p style={{fontSize: 11+'px', marginBottom: -1+'em'}}>Stats</p>
								<div style={{border:'solid 1px #bbb', width:95+'%'}}></div>
								<img src="/assets/images/mappin.png" style={{display:'inline'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}> </p>
								<p style={{fontSize: 10+'px', marginTop: -2+'em', marginLeft:2+'em'}}></p>
							</div>
							<div style={{marginTop: -2.5+'em'}}>
								<img src="/assets/images/phone.png" style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}></p>
							</div>
							<div>
								<img src="/assets/images/globe.png" style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
							</div>
						</div>

						<div style={{marginLeft: 1+'em', textAlign:'left'}}>
							<p style={{fontSize: 11+'px', marginBottom: -1+'em'}}>Medical Tags</p>
							<div style={{border:'solid 1px #bbb', width:95+'%'}}></div>

							<div style={{display:'block'}}>
								<img src="/assets/images/clock.png" style={{display:'inline'}}/>
							</div>

							<div>
								<img src="/assets/images/lightbulb.png" style={{display:'inline'}}/>
								<p style={{fontSize: 10+'px', display:'inline', marginTop: -2+'em', marginLeft: .5+'em'}}></p>
							</div>

							<div style={{display:'block'}}>
								<img src="/assets/images/star.png" style={{display:'inline'}}/>
								<p style={{fontSize: 10+'px', display: 'inline', marginTop: -2.5+'em', marginLeft: .5+'em'}}>Bookmark</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PetProfileRow
