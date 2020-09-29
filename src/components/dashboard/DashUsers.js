import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../actions/userActions";

import Users from "./Users";
import { Button } from "@material-ui/core";

class DashUsers extends Component {
  
    componentDidMount() {
        this.props.getUsers();
      }

    render() {
        const { users, usersLoading } = this.props.users;

        let dashboardContent;

        console.log(this.props)

        const res = Object.values(users)

        if(this.props.auth.user.role!=="Superusuario"){
          dashboardContent = <p className="center-align">Acceso denegado</p>;
        } 
        else if (res === null || usersLoading) {
            dashboardContent = <p className="center-align">Cargando ...</p>;
          } else if (res.length> 0) {
            dashboardContent = <div>
                                  <Users users={res}/>
                                  <Button style={{marginTop:10, justifySelf:"center"}} variant="contained" color="primary" href="/register"> + Nuevo Usuario</Button>

                                </div>;
          } else {
            dashboardContent = <div> No hay usuarios </div>;
          }

        return (
            <div className="container" style={{width:"900px"}}>
              <Button variant="text" color="primary" href="/dashboard"> &lt;&lt; Regresar</Button>
                {dashboardContent}
            </div>
        )
    }
}

DashUsers.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.users,
    auth: state.auth
});

export  default connect(
    mapStateToProps,
    {getUsers}
) (DashUsers);