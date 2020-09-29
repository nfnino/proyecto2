import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUsers } from "../../actions/userActions";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MaterialTable from 'material-table';
import { Grid } from "@material-ui/core";

class Routines extends Component {

    constructor(props){
        super(props);

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Supervisor', field: 'supervisor'}
            ],
            data: props.routines.routines.data,
            setOpen: false,
        };
    }

    componentDidMount () {
        this.props.getUsers()
    }

    /* onUpdateClick = id => {
        const { history } = this.props;
        if(this.props.auth.user.role === "Jefe de área"){
            history.push(`/updateRoutine/${id}`);
        } 
        else {
            this.handleClickOpen()
            this.props.history.push("/routines")
        }
    } */

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/routines/${id}`);
    }

    handleClickOpen = () => {
        this.setState({setOpen: true})
    };
    
    handleClose = () => {
        this.setState({setOpen: false})
    };

    render() {
        const { auth } = this.props;
        const res = this.props.routines.routines;
        const routines = res.data;

        const routineItems = [];

        /* let jefe;

        if(this.props.auth.user.role === "Jefe de área"){
            jefe = true;
        } else {
            jefe = false;
        } */
        
        function createData(id, fecha, ejecutor, supervisor) {
            let array = {"fecha": fecha,
                        "ejecutor": ejecutor, 
                        "supervisor": supervisor,
                        "id": id
                    }
            if(auth.user.role === "Operario") {
                if(auth.user.name === ejecutor) {
                    routineItems.push(array)
                }
            }else {
                routineItems.push(array)
            }
        }

        routines.forEach(element => {
            createData(element._id, element.fecha, element.ejecutor, element.supervisor)
        });

        return (
            <div>
                <Dialog
                open={this.state.setOpen}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Rol no autorizado..."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Permisos necesarios no cumplidos para realizar esta acción.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid container>
                    <Grid item xs={12}>
                    <MaterialTable
                    title="Rutinas"
                    columns={this.state.columns}
                    data={routineItems}
                    options={{
                        exportButton:true,
                    }}
                    actions={[
                        {
                            icon: 'search',
                            tooltip: 'Detalle Rutina',
                            onClick: (event, rowData) => this.onDetailClick(rowData.id)
                        }/* ,
                        {
                        icon: 'edit',
                        tooltip: 'Editar Rutina',
                        onClick: (event, rowData) => this.onUpdateClick(rowData.id)
                        },
                        {
                        icon: 'delete',
                        tooltip: 'Eliminar Rutina',
                        onClick: (event, rowData) => this.onDeleteClick(rowData.id)
                        }, */
                    ]}
                    >
                    </MaterialTable>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Routines.propTypes = {
    routines: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    routines: state.routines,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers }
)(withRouter(Routines));