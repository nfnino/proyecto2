import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editTask } from "../../actions/taskActions";

import { TextField, Typography, Grid, Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
  },
  pos: {
    left: "40%",
    width: 170,
  },
});

class TaskEdit extends Component {

    constructor(ownProps) {
        super(ownProps);
        const task = ownProps.tasks.tasks.data.find(task => ownProps.task_id === task._id);
        this.state = {
          id: ownProps.task_id, 
          fecha_inicial_tent: task.fecha_inicial_tent,
          fecha_final_tent: task.fecha_final_tent,
          ejecutor_interno: task.ejecutor_interno,
          ejecutor_interno_aux: task.ejecutor_interno,
          nit_empresa_externa: task.nit_empresa_externa,
          nombre_empresa_externa: task.nombre_empresa_externa,
          responsable: task.responsable,
          estado: task.estado,
          estado_aux: task.estado,
          errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    handleIniDateChange = (date) => {
        this.setState({fecha_inicial_tent: date})
    };
    
    handleEndDateChange = (date) => {
        this.setState({fecha_final_tent: date})
    };

    ejecutorChange = (event, ejecutor) => {
      this.setState({
        ejecutor_interno: ejecutor.value
      })
    }

    onSubmit = e => {
        e.preventDefault();
    
    const newInfo = {
        id: this.state.id,
        fecha_inicial_tent: this.state.fecha_inicial_tent,
        fecha_final_tent: this.state.fecha_final_tent,
        ejecutor_interno: this.state.ejecutor_interno,
        nit_empresa_externa: this.state.nit_empresa_externa,
        nombre_empresa_externa: this.state.nombre_empresa_externa,
        user_name: this.props.auth.user.name,
        user_id: this.props.auth.user.id
      };
        this.props.editTask(newInfo, this.props.history); 
    };

    render() {
      
      const { classes, auth } = this.props;
      const users = this.props.users.users;
      const { errors } = this.state;

      let autorizado = false;

      if(this.state.responsable==="externo"){
        if(this.state.ejecutor_interno_aux===auth.user.name) {
          autorizado = true;
        }
      } 
      if(auth.user.role === "Jefe de área"){
        autorizado = true;
      } 

//------------------------------ Ejecutor y supervisor dropdown ---------------------------------------
let options_ejecutor = []

if( users.length !== 0) {
  let usuarios = Object.values(users.data)

  let nuevo = usuarios.map(user => ({
        value: user.name,
        label: user.name,
        type: user.role
  }))

  for (let i = 0; i < nuevo.length; i++) {
    let temp = nuevo[i]
    if (temp.type === "Operario") {
      options_ejecutor.push(temp)
    }
  }
}
//------------------------------------------------------------------------------------------//

  let isClosed = false;
  if (this.state.estado_aux === "Cerrada") {
    isClosed = true
  }

  let abierta =
            <Card container className={classes.root} variant="outlined">
                <Link to="/tasks" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Tareas
                </Link>
                <CardContent align="center">
                    <Typography variant="h4" gutterBottom>Editar tarea :</Typography>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                variant="dialog"
                                inputVariant="standard"
                                format="DD/MM/yyyy"
                                margin="normal"
                                multiline={true}
                                style={{
                                    width: 350
                                }}
                                label="Fecha Inicio (Tentativa)"
                                value={this.state.fecha_inicial_tent}
                                onChange={this.handleIniDateChange}
                                />
                            </MuiPickersUtilsProvider> 
                            <span className="red-text">{errors.fecha_inicial_tent}</span>
                        </Grid>
                        <Grid item xs={12} md={6}> 
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                variant="dialog"
                                inputVariant="standard"
                                format="DD/MM/yyyy"
                                margin="normal"
                                multiline={true}
                                style={{
                                    width: 350
                                }}
                                label="Fecha Fin (Tentativa)"
                                value={this.state.fecha_final_tent}
                                onChange={this.handleEndDateChange}
                                />
                            </MuiPickersUtilsProvider> 
                            <span className="red-text">{errors.fecha_final_tent}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                            id="ejecutor_interno"
                            defaultValue={this.state.ejecutor_interno}
                            options={options_ejecutor}
                            getOptionLabel={(options_ejecutor) => options_ejecutor.label}
                            onChange={this.ejecutorChange}
                            style={{ width: 740}}
                            renderInput={(params) => <TextField {...params} label="Ejecutor interno:" variant="standard" multiline={true}/>}
                            />
                            <span className="red-text">{errors.ejecutor_interno}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            id="nit_empresa_externa"
                            label="Nit Empresa"
                            defaultValue={this.state.nit_empresa_externa}
                            onChange={this.onChange}
                            margin="normal"
                            variant="standard"
                            size="small"
                            multiline={true}
                            style={{
                                width: 350
                            }}>
                            </TextField>
                            <span className="red-text">{errors.nit_empresa_externa}</span>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            id="nombre_empresa_externa"
                            label="Nombre Empresa"
                            defaultValue={this.state.nombre_empresa_externa}
                            onChange={this.onChange}
                            margin="normal"
                            variant="standard"
                            size="small"
                            multiline={true}
                            style={{
                                width: 350
                            }}>
                            </TextField>
                            <span className="red-text">{errors.nombre_empresa_externa}</span>
                        </Grid>
                    </Grid>
                </CardContent>
                <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
                    Actualizar
                </Button>
            </Card>

  let cerrada =
    <Card>
            <Link to="/tasks" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Tareas
            </Link>
            <CardContent align="center">
                <Typography variant="h2" color="primary" gutterBottom>Oops!!</Typography>
                <Typography variant="h4" gutterBottom>Esta actividad ya no se puede modificar.</Typography>
            </CardContent>
    </Card>

    return (
      <div>
        {autorizado ? (isClosed ? cerrada : abierta) : <div><h2 color="primary">No autorizado</h2></div>}
      </div>
      );
    }
}

TaskEdit.propTypes = {
    editTask: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    tasks: state.tasks,
    users: state.users,
    auth: state.auth,
    task_id: ownProps.match.params.id, 
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { editTask }
)(TaskEdit));