import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

class SearchResultItem extends Component {

	constructor(props){
		super(props)
	}

	componentDidMount(){
	}

	render(){
		var {resultItem} = this.props
		console.log('RESULT ITEM: '+JSON.stringify(resultItem))
		return(
			<div className="button" style={{height:'auto', margin:1+'em', display:'block'}}>
				<p style={{fontSize: 10+'px'}}>{resultItem.venue.name}</p>
				<div><img src="/assets/images/mappin.png" style={{display:'inline'}}/><p style={{fontSize: 10+'px', display:'inline'}}> {resultItem.venue.location.address}, {resultItem.venue.location.city}, {resultItem.venue.location.state} {resultItem.venue.location.postalCode} <br/> {resultItem.venue.contact.formattedPhone}</p></div>
			</div>
		)
	}
}

export default SearchResultItem
