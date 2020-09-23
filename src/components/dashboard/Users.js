import React, { Component, forwardRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import MaterialTable from 'material-table';
import { CardContent, Grid, Card } from "@material-ui/core";
import DeleteOutline from '@material-ui/icons/DeleteOutline';


class Users extends Component {

    constructor(props){
        super(props);

        this.state={
            columns: [
                {title: 'Nombre', field: 'name'},
                {title: 'Rol', field: 'role'},
                {title: 'Documento', field: 'documento'},
                {title: 'Email', field: 'email'},
                {title: 'Área', field: 'area'},
                {title: 'Estado', field: 'active'}
            ],
            data: props.users.users.data
        };
    }

// Delete account
    onDeleteClick = id => {
        const { users } = this.props;
        const userData = {
        id: id,
        user_id: this.props.auth.user.id,
        user_name: this.props.auth.user.name,
        users: users
        };
        console.log(this.props)
        this.props.deleteUser(userData);
        this.props.history.push("/Dashboard")
    };

    actividad(bool) {
        if(bool){
            return "Activo"
        }
        return "Inactivo"
    }

    render() {
        const tableIcons = {
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} color="primary"/>),
        }

        const res = this.props.users.users;
        const users = res.data;

        function actividad(bool) {
            if(bool){
                return "Activo"
            }
            return "Inactivo"
        }
        
        const userItems = [];

        function createData(id, name, role, area, documento, email, active) {
            let array = {"name": name,
                        "role": role, 
                        "documento": documento, 
                        "email": email, 
                        "area": area, 
                        "active": actividad(active),
                        "id": id
                    }
            userItems.push(array)
        }

        users.forEach(element => {
            createData(element._id, element.name, element.role, element.area, element.documento, element.email, element.active)
        });

        /* let userItems = users.map(user => (
            <tr key={user._id} style={{ marginTop: "1rem" }}>
               <td> {user.name} </td>
               <td> {user.email} </td>
               <td> {user.role} </td>
               <td> {this.actividad(user.active)} </td>
               <td>
                <button
                    style={{ marginRight: "1rem" }}
                    onClick={this.onDeleteClick.bind(this, user._id)}
                    className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3">
                    <i className="material-icons">delete</i>
                </button>
                </td>
            </tr>
        )); */

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <MaterialTable
                            title="Usuarios"
                            icons={tableIcons}
                            columns={this.state.columns}
                            data={userItems}
                            options={{
                                exportButton:true,
                                headerStyle: {
                                    color: '#00A9E0',
                                    fontSize: 16
                                }
                            }}
                            actions={[
                                {
                                icon: tableIcons.Delete,
                                tooltip: 'Eliminar Usuario',
                                onClick: (event, rowData) => this.onDeleteClick(rowData.id)
                                },
                            ]}
                            >
                            </MaterialTable>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            /* <div>
            <div className="row">
                <div className="col s12 center-align">
                    <h5>
                        <b>Usuarios</b>
                    </h5>
                    <p className="grey-text text-darken-1">
                        Agregar o eliminar usuarios
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col s12 board">
                    <table>
                        <tbody>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            {userItems}
                        </tbody>
                    </table>
                </div>
            </div>
            </div> */
        );
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { deleteUser }
)(withRouter(Users));