import React, { Component} from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
require ("./SideNav.css");



class SideNav extends Component {
  onLogoutClick = e => {
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };

  // Hide Side Nav
  toggleMenu = e => {
    let sideNav = document.querySelector(".side");
    sideNav.classList.add("invisibile");

    let hamburger = document.querySelector(".hamburger-top-menu");
    hamburger.classList.add("hamburger-visible");

    let rightSide = document.querySelector(".right");
    rightSide.classList.add("no-side");

    let rightSideRight = document.querySelector(".right-top");
    rightSideRight.classList.add("right-top-visibile");
  };




  render() {

    return (
      
      <nav id= "hola" className="side">
        <ul className="top">
          <li>
            <i
              onClick={this.toggleMenu}
              className="material-icons hamburger-side-menu"
            >
              menu
            </i>
          </li>
          <NavLink exact activeClassName="active-page" to="/dashboard">
            <li>
              <i className="material-icons icon">home</i>Home
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/tasks">
            <li>
              <i className="material-icons icon">check_circle</i>My Tasks
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/calendar">
            <li>
              <i className="material-icons icon">calendar_today</i>NOC Calendar
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/schedmail">
            <li>
              <i className="material-icons icon">alternate_email</i>Email Manager
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/emailnotifications">
            <li>
              <i className="material-icons icon">settings</i>Notifications Settings
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/filemanager">
            <li>
              <i className="material-icons icon">attach_file</i>File Manager
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/charts">
            <li>
              <i className="material-icons icon">bar_chart</i>Charts 
            </li>
          </NavLink>
          <NavLink exact activeClassName="active-page" to="/links">
            <li>
              <i className="material-icons icon">info</i>Helpful links
            </li>
          </NavLink>
          <div className="sign-out" onClick={this.onLogoutClick}>
            <li>
              <i className="material-icons icon">arrow_back</i>Sign Out
            </li>
          </div>
        </ul>

        
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(withRouter(SideNav))
);
