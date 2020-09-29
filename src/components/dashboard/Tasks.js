import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { darBajaTask } from "../../actions/taskActions";
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

class Tasks extends Component {

    constructor(props){
        super(props);

        this.state={
            columns: [
                {title: 'Activo', field: 'activo'},
                {title: 'Tipo', field: 'tipo'},
                {title: 'Supervisor', field: 'supervisor'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Fecha Inicio', field: 'fecha_in'},
                {title: 'Fecha Fin', field: 'fecha_fi'}
            ],
            data: props.tasks.tasks.data,
            setOpen: false
        };
    }

    clear = (e) => {
        e.preventDefault();
        this.props.clear();
    }
    
    componentDidMount () {
        this.props.getUsers()
    }

    onUpdateClick = id => {
        const { history } = this.props;
        /*if(this.props.auth.user.role === "Jefe de área"){
            history.push(`/updateTask/${id}`);
        } 
        else {
            this.handleClickOpen()
            history.push("/tasks")
        } */
        history.push(`/updateTask/${id}`);
    }

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/tasks/${id}`);
    }

    onDeleteClick = id => {
        if(this.props.auth.user.role === "Jefe de área") {
            const tasks = this.props.tasks.tasks.data;
            const taskData = {
            id: id,
            estado: "Terminada",
            user_id: this.props.auth.user.id,
            user_name: this.props.auth.user.name,
            tasks: tasks
            };
            this.props.darBajaTask(taskData);
            window.location.reload(false);
        }
        else {
            this.handleClickOpen()
            this.props.history.push("/assets")
        }
    }

    handleClickOpen = () => {
        this.setState({setOpen: true})
    };
    
    handleClose = () => {
        this.setState({setOpen: false})
    };

    render() {
        const { auth } = this.props;
        const res = this.props.tasks.tasks;
        const tasks = res.data;
        const taskItems = [];

        function createData(id, activo, tipo, supervisor, ejecutor, fecha_in, fecha_fi) {
            let array = {"activo": activo,
                        "tipo": tipo, 
                        "supervisor": supervisor, 
                        "ejecutor": ejecutor,
                        "fecha_in": fecha_in, 
                        "fecha_fi": fecha_fi,
                        "id": id
                    }

            if(auth.user.role === "Operario") {
                if(auth.user.name === ejecutor) {
                    taskItems.push(array)
                }
            }else {
                taskItems.push(array)
            }
        }

        tasks.forEach(element => {
            createData(element._id, element.activo, element.tipo_mant, element.supervisor, element.ejecutor_interno,
                    element.fecha_inicial_tent, element.fecha_final_tent)
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
                <Grid container alignItems="center" direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <MaterialTable
                        title="Actividades"
                        columns={this.state.columns}
                        data={taskItems}
                        options={{
                            exportButton:true,
                            headerStyle: {
                                color: '#5BC500',
                                fontSize: 16
                            },
                            rowStyle: {
                                fontSize: 16,
                            }
                        }}
                        actions={[
                        {
                            icon: 'search',
                            tooltip: 'Detalle Actividad',
                            onClick: (event, rowData) => this.onDetailClick(rowData.id)
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Editar Actividad',
                            onClick: (event, rowData) => this.onUpdateClick(rowData.id)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar Actividad',
                            onClick: (event, rowData) => this.onDeleteClick(rowData.id)
                        },
                        ]}
                        >
                        </MaterialTable>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" size="large" onClick={this.clear}>Limpiar</Button>
                    </Grid>
                </Grid>
            </div>
            /* <div>
                <div className="row center-align">
                    <div className="col s12">
                        <h5>
                            <b>Actividades</b>
                        </h5>
                        <p className="grey-text text-darken-1">
                            Agregar o modificar actividades de mantenimiento
                        </p>
                        </div>
                </div>
                <div className="row">
                    <div className="col s12">
                    <table>
                        <tbody>
                            <tr>
                                <th>Activo</th>
                                <th>Tipo mant.</th>
                                <th>Descripción</th>
                                <th>Inicio</th>
                                <th>Final</th>
                                <th>Supervisor</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th><input type="text" placeholder="Buscar por palabra clave" onChange={(e)=>this.searchSpace(e)}/></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                                {taskItems}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div> */
        );
    }
}

Tasks.propTypes = {
    tasks: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    darBajaTask: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.tasks,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { darBajaTask, getUsers }
)(withRouter(Tasks));