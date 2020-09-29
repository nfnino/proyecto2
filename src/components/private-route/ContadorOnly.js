import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const ContadorOnly = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user.role === "Contador" ? (
        <Component {...props} /> 
      ) : (
        <Redirect to="/Dashboard" />
      )
    }
  />
);
ContadorOnly.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ContadorOnly);