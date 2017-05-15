import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class SearchResultItem extends Component {

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
		var {resultItem} = this.props
		return(
			<div className="searchResultCard" style={{height:'auto', marginTop:1+'em', marginLeft: 2+'em', marginRight:2+'em', display:'block', overflowX:'hidden'}} onClick={this.toggleResultDetail}>
				<p style={{fontSize: 12+'px'}}>{resultItem.venue.name}</p>
				<div style={{display: this.state.displayResultDetail ? 'block' : 'none'}}>
					<div style={{display: 'flex', justifyContent:'space-around'}}>
						<div style={{textAlign:'left'}}>
							<div>
								<p style={{fontSize: 11+'px', marginBottom: -1+'em'}}>Practice Info</p>
								<div style={{border:'solid 1px #bbb', width:95+'%'}}></div>
								<img src="/assets/images/mappin.png" style={{display:'inline'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}> {resultItem.venue.location.address}</p>
								<p style={{fontSize: 10+'px', marginTop: -2+'em', marginLeft:2+'em'}}>{resultItem.venue.location.city}, {resultItem.venue.location.state}</p>
								<p style={{fontSize: 10+'px', marginTop: -3.5+'em', marginLeft:2+'em'}}>{resultItem.venue.location.postalCode}</p>
							</div>
							<div style={{marginTop: -2.5+'em'}}>
								<img src="/assets/images/phone.png" style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}>{resultItem.venue.contact.formattedPhone}</p>
							</div>
							<div>
								<img src="/assets/images/globe.png" style={{display:'inline', marginBottom:-.25+'em', marginRight:.5+'em'}}/>
								<p style={{fontSize: 10+'px', display:'inline'}}>{resultItem.venue.url ? <a href={resultItem.venue.url} style={{border:'none'}}>Website</a> : 'Site not found for practice'}</p>
							</div>
						</div>

						<div style={{marginLeft: 1+'em', textAlign:'left'}}>
							<p style={{fontSize: 11+'px', marginBottom: -1+'em'}}>Details</p>
							<div style={{border:'solid 1px #bbb', width:95+'%'}}></div>

							<div style={{display:'block'}}>
								<img src="/assets/images/clock.png" style={{display:'inline'}}/>
								<p style={{fontSize: 10+'px', display:'inline', marginLeft: .5+'em'}}>Open: {(resultItem.venue.hours !== undefined && resultItem.venue.hours.isOpen === true) ? 'Yes':'No'}</p>
							</div>

							<div style={{display: (resultItem.venue.hours !== undefined && resultItem.venue.hours.status !== undefined) ? 'block' : 'none'}}>
								<img src="/assets/images/lightbulb.png" style={{display:'inline'}}/>
								<p style={{fontSize: 10+'px', display:'inline', marginTop: -2+'em', marginLeft: .5+'em'}}>{(resultItem.venue.hours !== undefined && resultItem.venue.hours.status !== undefined) ? resultItem.venue.hours.status : ''}</p>
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

export default SearchResultItem
