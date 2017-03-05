import React, { Component } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import actions from '../../actions/actions'
import APIManager from '../../utils/APIManager'

class TopBar extends Component {
	constructor(props, context){
		super(props, context)
		this.logout = this.logout.bind(this)
		this.toggleMenu = this.toggleMenu.bind(this)
	}

	toggleMenu(event){
		var {left} = this.props
		this.props.toogleSideMenu(!left)
	}

	logout(event){
		// event.preventDefault()
		// APIManager.handleGet('/user/logout', null, function(err, response){
		// 	if (err){
		// 		alert(err.message)
		// 		return
		// 	}
		//
		// 	if (response.confirmation == "Fail"){
		// 		alert(response.message)
		// 		return
		// 	}
		//
		// 	if (response.confirmation == "Success"){
		// 		alert(response.message)
		// 		window.location.href = "/"
		// 		return
		// 	}
		// })
	}

	render(){
		return(
			<div className="topbar">
        <div className="topbar-left" style={{float: "right"}}>
            <div className="text-center">
               	<Link to="/vet-home" className="logo">
                    <i className="icon-c-logo"> <img src="" height="42"/> </i>
                    <span><img src="" height="20"/></span>
                </Link>
            </div>
        </div>

        <div className="navbar navbar-default" role="navigation" style={{backgroundColor: 'white'}}>
            <div className="container">
							<div className="">
								<div className="pull-left">
										<button onClick={this.toggleMenu} style={{color: '#36404a'}} className="button-menu-mobile waves-effect waves-light">
												<i className="md md-menu"></i>
										</button>
										<span className="clearfix"></span>
								</div>
							</div>
            </div>
      	</div>
 		</div>
		)
	}
}

const stateToProps = (state) => {
	return{
		left: state.UIReducer.left
	}
}

const dispatchToProps = (dispatch) => {
  return{
    toogleSideMenu: (left) => dispatch(actions.showSideMenu(left)),
  }
}
export default connect (stateToProps, dispatchToProps)(TopBar)
