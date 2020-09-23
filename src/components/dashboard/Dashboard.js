import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Operario from "./Operario";
import Contador from "./Contador";
import Super from "./Super";
import Jefe from "./Jefe";
import Gerente from "./Gerente";

import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
  const { user } = this.props.auth;

  const role = user.role;

/*   const isSuper = (
    user.role === "Superusuario"
  ); */

  /* const superuserLinks = (
    <div className="row s13">
              <div className="col s3">
                <Link
                  to="/users"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Usuarios
                </Link>
              </div>
              <div className="col s3">
                <Link
                  to="/assets"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Activos
                </Link>
              </div>
              <div className="col s3">
                <Link
                  to="/tasks"
                  style={{
                    width: "170px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Mantenimiento
                </Link>
              </div>
              <div className="col s3">
                <Link
                  to="/routines"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Rutinas
                </Link>
              </div>
              <div className="col s3">
                <Link
                  to="/venues"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Recintos
                </Link>
              </div>
            </div>
  );

  const otroLinks = (
    <div className = "row s12">
      <div className="col s4">
                <Link
                  to="/assets"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Activos
                </Link>
              </div>
              <div className="col s4">
                <Link
                  to="/tasks"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Actividades
                </Link>
              </div>
              <div className="col s4">
                <Link
                  to="/routines"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text">
                  Rutinas
                </Link>
              </div>
    </div>
  );
 */
  return (
      <div>
        {role==="Operario" ? <Operario/> : 
        role==="Contador" ? <Contador/> : 
        role==="Superusuario" ? <Super/> : 
        role==="Jefe de área"? <Jefe/> : 
        role==="Gerente de área"?<Gerente/> : 
        null}
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);