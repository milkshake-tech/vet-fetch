import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import store from '../../stores/store'
import actions from '../../actions/actions'
import APIManager from '../../utils/APIManager'

class SideMenu extends Component {
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
	}

	closeMenu(event){
		var {left} = this.props

		setTimeout(() => {
				this.props.toggleSideMenu(false)
		}, 200)
	}

	logout(event){
		event.preventDefault()
		var _this = this
		APIManager.handleGet('/user/logout', null, function(err, response){
			if (err){
				alert("Error logging out: "+JSON.stringify(err.message))
				return
			}

			if (response.confirmation == "Fail"){
				alert("Log out failed: "+JSON.stringify(response.message))
				return
			}

			if (response.confirmation == "Success"){
				window.location.href = "/"
				return
			}
		})
	}

	render() {
		var {left} = this.props
		var toggleDisplay = left == true ? "0px" : "-170px"
		var overlayDisplay = left == true ? "inline" : "none"
		return(
			<div>
			<div className="left side-menu" style={{height: "100%", backgroundColor: 'white', display: "inline", transitionProperty: "left", transitionDuration:"0.5s", left: toggleDisplay, width: "170px", position: "fixed", zIndex:"1000"}}>
				<div className="slimScrollDiv">
					<div className="sidebar-inner slimscrollleft">
						<div id="sidebar-menu">
							<ul>
								<li className="text-muted menu-title">Navigation</li>
								<li className="has_sub">
									<Link onClick={this.closeMenu} className="waves-effect" to="/homeDashboard" ><i className="ti-home"></i> <span> Home </span></Link>
								</li>
								<li className="has_sub">
									<Link onClick={this.closeMenu} className="waves-effect" to="/deliveriesDashboard" ><i className="icon-basket"></i> <span> Claims </span></Link>
								</li>
								<li className="has_sub">
									<Link onClick={this.closeMenu} className="waves-effect" to="/wines" ><i className="icon-trophy"></i> <span> Billing </span></Link>
								</li>
								<li className="has_sub">
									<Link onClick={this.closeMenu} className="waves-effect" to="/calendar" ><i className="icon-calender"></i> <span> Calendar </span></Link>
								</li>
								<li className="has_sub">
									<Link onClick={this.closeMenu} className="waves-effect" to="/account" ><i className="icon-user"></i> <span> Account </span></Link>
								</li>
								<li className="has_sub">
									<Link className="waves-effect" to="#" onClick={this.logout} ><i className="ti-power-off m-r-10 text-danger"></i> <span> Logout </span></Link>
								</li>
							</ul>
							<div className="clearfix"></div>
						</div>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			<div onClick={this.closeMenu} style={{display: overlayDisplay, opacity: "0.5", width:"100%", height:"100%", backgroundColor: "#000000", marginTop: "60px", position: "absolute", zIndex: "900"}}>
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
    toggleSideMenu: (left) => dispatch(actions.showSideMenu(left))
  }
}
export default connect (stateToProps, dispatchToProps)(SideMenu)
