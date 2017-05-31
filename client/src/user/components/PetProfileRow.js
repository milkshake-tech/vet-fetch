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
		let {pet} = this.props
		let tagsList = Object.keys(pet.tags).map(function(tag, i) {
			if (pet.tags[tag] === true){
				return <li key={i} style={{listStyle:'none', fontSize:10+'px'}}><img src="/assets/images/check_grey.png" style={{display:'inline', margin:'auto 0.5em -0.75em auto'}}/>
								{tag}</li>
			}
		})
		return(
			<div className="searchResultCard" style={{height:'auto', marginTop:1+'em', marginLeft: 2+'em', marginRight:2+'em', display:'block', overflowX:'hidden'}} onClick={this.toggleResultDetail}>
				<img src={pet.species === 'dog' ? '/assets/images/dogface_sm.png' : '/assets/images/catface_sm.png'} style={{display:'inline', margin: '.5em .5em -.75em auto'}}/>
				<p style={{display: 'inline', fontSize: 14+'px'}}>{pet.name}</p>

				<div style={{display: this.state.displayResultDetail ? 'block' : 'none'}}>
					<div style={{display: 'flex', justifyContent:'space-around'}}>
						<div style={{textAlign:'left'}}>
							<div>
								<p style={{fontSize: 11+'px', marginBottom: -1+'em'}}>Stats</p>
								<div style={{border:'solid 1px #bbb', width:95+'%'}}></div>
								<img src="/assets/images/birthday.png" style={{display:'inline', margin:'auto 0.5em -0.75em auto'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}>{pet.birthday} </p>
							</div>
							<div>
								<img src={pet.sex === 'female' ? '/assets/images/female.png' : '/assets/images/male.png'} style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}> {pet.sex}</p>
							</div>
							<div>
								<img src="/assets/images/pawprint.png" style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}> {pet.breed}</p>
							</div>
						</div>

						<div style={{marginLeft: 1+'em', textAlign:'left'}}>
							<p style={{fontSize: 11+'px', marginBottom: -1+'em'}}>Medical Tags</p>
							<div style={{border:'solid 1px #bbb', width:95+'%'}}></div>

							<div style={{display:'block'}}>
								{tagsList}
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PetProfileRow
