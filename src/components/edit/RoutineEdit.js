import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateRoutine } from "../../actions/routineActions";

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

class RoutineEdit extends Component {

    constructor(ownProps) {
        super(ownProps);
        const routine = ownProps.routines.routines.data.find(routine => ownProps.routine_id === routine._id)
        this.state = {
          id: ownProps.routine_id, 
          fecha: routine.fecha,
          ejecutor: routine.ejecutor,
          supervisor: routine.supervisor,
          estado: routine.estado,
          estado_aux: routine.estado,
          errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    handleDateChange = (date) => {
        this.setState({fecha: date})
    };

    ejecutorChange = (event, ejecutor) => {
        this.setState({
          ejecutor: ejecutor.value
        })
      }

    supervisorChange = (event, supervisor) => {
        this.setState({
            supervisor: supervisor.value
        })
    }

    onSubmit = e => {
        e.preventDefault();
    
    const newInfo = {
        id: this.state.id,
        fecha: this.state.fecha,
        ejecutor: this.state.ejecutor,
        supervisor: this.state.supervisor,
        estado: this.state.estado,
      };
        this.props.updateRoutine(newInfo, this.props.history); 
    };

    render() {
        const { users } = this.props.users;
        const { classes } = this.props;
        const { errors } = this.state;

//------------------------------ Ejecutor y supervisor dropdown ---------------------------------------
let options_ejecutor = []
let options_supervisor = []

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
    if (temp.type === "Jefe de área") {
        options_supervisor.push(temp)
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
                <Link to="/routines" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Rutinas
                </Link>
                <CardContent align="center">
                    <Typography variant="h4" gutterBottom>Editar Rutina :</Typography>
                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                                label="Fecha Inicio"
                                value={this.state.fecha}
                                onChange={this.handleDateChange}
                                />
                            </MuiPickersUtilsProvider> 
                            <span className="red-text">{errors.fecha}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                            id="ejecutor"
                            defaultValue={this.state.ejecutor}
                            options={options_ejecutor}
                            getOptionLabel={(options_ejecutor) => options_ejecutor.label}
                            onChange={this.ejecutorChange}
                            style={{ width: 350}}
                            renderInput={(params) => <TextField {...params} label="Ejecutor" variant="standard" multiline={true}/>}
                            />
                            <span className="red-text">{errors.ejecutor}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="supervisor"
                                defaultValue={this.state.supervisor}
                                options={options_supervisor}
                                getOptionLabel={(options_supervisor) => options_supervisor.label}
                                onChange={this.supervisorChange}
                                style={{ width: 350}}
                                renderInput={(params) => <TextField {...params} label="Supervisor" variant="standard" multiline={true}/>}
                                />
                            <span className="red-text">{errors.supervisor}</span>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                            id="estado"
                            label="Estado"
                            defaultValue={this.state.estado}
                            onChange={this.onChange}
                            margin="normal"
                            variant="standard"
                            size="small"
                            multiline={true}
                            style={{
                                width: 350
                            }}>
                            </TextField>
                            <span className="red-text">{errors.estado}</span>
                        </Grid>
                    </Grid>
                </CardContent>
                <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
                    Actualizar
                </Button>
            </Card>

    let cerrada =
    <Card>
        <Link to="/routines" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Rutinas
        </Link>
        <CardContent align="center">
            <Typography variant="h1" gutterBottom>Oops!!</Typography>
            <Typography variant="h4" gutterBottom>Esta rutina ya no se puede modificar.</Typography>
        </CardContent>
    </Card>

    return (
        <div>
            {isClosed ? cerrada : abierta}
        </div>
      );
    }
}

RoutineEdit.propTypes = {
    updateRoutine: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    routine_id: ownProps.match.params.id,
    users: state.users,
    routines: state.routines,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { updateRoutine }
)(RoutineEdit));