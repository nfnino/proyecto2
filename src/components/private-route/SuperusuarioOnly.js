import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const SuperusuarioOnly = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user.role === "Superusuario" ? (
        <Component {...props} /> 
      ) : (
        <Redirect to="/Dashboard" />
      )
    }
  />
);
SuperusuarioOnly.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(SuperusuarioOnly);