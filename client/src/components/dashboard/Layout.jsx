import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { getProjects } from "../../actions/projectsActions";


import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Schedmail from "./MainContent/Schedmail";
import Calendar from "./MainContent/Calendar";
import Charts from "./MainContent/Charts";
import Tasks from "./MainContent/Tasks";
import Filemanager from "./MainContent/Filemanager";
import Links from "./MainContent/Helpful_links";
import Emanot from "./MainContent/EmailNotifications";
//import Project from "./MainContent/Project/Project";
import NotFound from "../404/404";

import "./Layout.scss";


class Layout extends Component {
  componentDidMount() {
  }

  render() {

    let dashboardContent;
      dashboardContent = (
        <>
          <SideNav  />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
               // projects={projects}
                component={Dashboard}
              />
               <Route
                exact
                path="/schedmail"
                component={Schedmail}
              />
                 <Route
                exact
                path="/emailnotifications"
                component={Emanot}
              />

                <Route
                exact
                path="/charts"
                component={Charts}
              />

<Route
                exact
                path="/filemanager"
                component={Filemanager}
              />

<Route
                exact
                path="/links"
                component={Links}
              />


               <Route
                exact
                path="/calendar"
                component={Calendar}
              />


              <Route
                exact
                path="/tasks"
                component={Tasks}
              />
              
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );


    return (
      
      <div className="wrapper">{dashboardContent}</div>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};


export default withRouter(
  connect(
  )(Layout)
);
