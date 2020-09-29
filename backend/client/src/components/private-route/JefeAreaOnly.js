import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const JefeAreaOnly = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user.role === "Jefe de área" ? (
        <Component {...props} /> 
      ) : (
        <Redirect to="/Dashboard" />
      )
    }
  />
);
JefeAreaOnly.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(JefeAreaOnly);