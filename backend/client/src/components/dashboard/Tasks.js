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
                {title: 'Fecha Fin', field: 'fecha_fi'},
                {title: 'Fecha Fin Real', field: 'fecha_fin_real'},
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

        function createData(id, activo, tipo, supervisor, ejecutor, fecha_in, fecha_fi, fecha_fin_real) {
            let array = {"activo": activo,
                        "tipo": tipo, 
                        "supervisor": supervisor, 
                        "ejecutor": ejecutor,
                        "fecha_in": fecha_in, 
                        "fecha_fi": fecha_fi,
                        "fecha_fin_real": fecha_fin_real,
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
            let d_in = new Date(element.fecha_inicial_tent)
            let d_fi = new Date(element.fecha_final_tent)
            let d_real = "";
            let d3 ="Sin finalizar";
            
            let d1_mins = d_in.getMinutes()+""
            if (d1_mins.length < 2) {
                d1_mins = "0"+d1_mins
            } 
            let d2_mins = d_fi.getMinutes()+""
            if (d2_mins.length < 2) {
                d2_mins = "0"+d2_mins
            } 
            let d1 = d_in.toLocaleDateString() + " - " + d_in.getHours() + ":" + d1_mins;
            let d2 = d_fi.toLocaleDateString() + " - " + d_fi.getHours() + ":" + d2_mins;
            if (element.fecha_final_real!="") {
                d_real = new Date(element.fecha_final_real)
                let d3_mins = d_real.getMinutes()+""
                if (d3_mins.length < 2) {
                    d3_mins = "0"+d3_mins
                } 
                d3 = d_real.toLocaleDateString() + " - " + d_real.getHours() + ":" + d3_mins;
            }

            createData(element._id, element.activo, element.tipo_mant, element.supervisor,
                    element.ejecutor_interno, d1, d2, d3
            )
        });

        taskItems.reverse();

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