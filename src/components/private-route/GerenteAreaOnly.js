import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const GerenteAreaOnly = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user.role === "Gerente de área" ? (
        <Component {...props} /> 
      ) : (
        <Redirect to="/Dashboard" />
      )
    }
  />
);
GerenteAreaOnly.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(GerenteAreaOnly);