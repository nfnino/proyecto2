import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoutine } from "../../actions/routineActions";

import { getUsers } from "../../actions/userActions";

import { TextField, Typography, Grid, Divider, Button } from "@material-ui/core";
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

class RoutineForm extends Component {
  constructor() {
    super();
    this.state = {
      fecha: new Date(),
      ejecutor: "",
      supervisor: "",
      espacio_vip: "",
      estado: "Creada",
      espacio_local: "",
      espacio_banio: "",
      espacio_parq: "",
      espacio_fach: "",
      espacio_pant: "",
      espacio_rci: "",
      observaciones: "",
      recinto: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getUsers();
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

  recChange = (event, obj) => {
    if(obj) {
      this.setState({ recinto: obj.value})
    }
  }

onSubmit = e => {
    e.preventDefault();

const newRoutine = {
    fecha: this.state.fecha,
    ejecutor: this.state.ejecutor,
    supervisor: this.state.supervisor,
    espacio_vip: this.state.espacio_vip,
    estado: this.state.estado,
    espacio_local: this.state.espacio_local,
    espacio_banio: this.state.espacio_banio,
    espacio_parq: this.state.espacio_parq,
    espacio_fach: this.state.espacio_fach,
    espacio_pant: this.state.espacio_pant,
    espacio_rci: this.state.espacio_rci,
    observaciones: this.state.observaciones,
    recinto: this.state.recinto,
    errors: {}
    };
    console.log("Ejecutor en estado", this.state.ejecutor)
    console.log("Supervisor en estado", this.state.supervisor)
    this.props.addRoutine(newRoutine, this.props.history); 
};
  
render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const { users } = this.props.users;

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

    let options_rec = [
      {value: "Movistar Arena Colombia", label: "Movistar Arena Colombia"},
      {value: "Movistar Arena Chile", label: "Movistar Arena Chile"}
    ]

    console.log(options_ejecutor)
    console.log(options_supervisor)

return (
  <div>
  <Card container className={classes.root} variant="outlined">
  <Link to="/routines" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Rutinas
  </Link>
  <CardContent align="center">
      <Typography variant="h3" gutterBottom>Nueva rutina de disponibilidad :</Typography>
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
                width: 740
              }}
              label="Fecha inicio"
              value={this.state.fecha}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider> 
          <span className="red-text">{errors.fecha}</span>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
              id="recinto"
              defaultValue={this.state.recinto}
              options={options_rec}
              getOptionLabel={(options_rec) => options_rec.label}
              onChange={this.recChange}
              style={{ width: 740}}
              renderInput={(params) => <TextField {...params} label="Recinto" variant="standard" multiline={true} />}
              />
          <span className="red-text">{errors.recinto}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
          id="ejecutor"
          defaultValue={this.state.ejecutor}
          options={options_ejecutor}
          getOptionLabel={(options_ejecutor) => options_ejecutor.label}
          onChange={this.ejecutorChange}
          style={{ width: 350}}
          renderInput={(params) => <TextField {...params} label="Ejecutor" variant="standard" multiline={true} />}
          />
          <span className="red-text">{errors.ejecutor}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="supervisor"
            defaultValue={this.state.supervisor}
            options={options_supervisor}
            getOptionLabel={(options_supervisor) => options_supervisor.label}
            onChange={this.supervisorChange}
            style={{ width: 350}}
            renderInput={(params) => <TextField {...params} label="Supervisor" variant="standard" multiline={true} />}
            />
          <span className="red-text">{errors.supervisor}</span>
        </Grid>
        <Grid item xs={12}>
          <br/>
          <Divider/>
        </Grid>
        <Grid item xs={12} sm={6}> 
          <TextField
            id="espacio_vip"
            label="Espacio VIP"
            type="text"
            defaultValue={this.state.espacio_vip}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_vip}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="espacio_local"
            label="Espacio Locales"
            type="text"
            defaultValue={this.state.espacio_local}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_local}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="espacio_banio"
            label="Espacio Baños"
            type="text"
            defaultValue={this.state.espacio_banio}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_banio}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="espacio_parq"
            label="Espacio Parque"
            type="text"
            defaultValue={this.state.espacio_parq}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_parq}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="espacio_fach"
            label="Espacio Fachada"
            type="text"
            defaultValue={this.state.espacio_fach}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_fach}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="espacio_pant"
            label="Espacio Pantalla"
            type="text"
            defaultValue={this.state.espacio_pant}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_pant}</span>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="espacio_rci"
            label="Espacio RCI"
            type="text"
            defaultValue={this.state.espacio_rci}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 350
            }}>
          </TextField>
          <span className="red-text">{errors.espacio_rci}</span>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="observaciones"
            label="Observaciones"
            defaultValue={this.state.observaciones}
            onChange={this.onChange}
            margin="normal"
            variant="standard"
            size="small"
            multiline={true}
            style={{
              width: 740
            }}>
          </TextField>
          <span className="red-text">{errors.observaciones}</span>
        </Grid>
      </Grid>
    </CardContent>
    <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
      Crear
    </Button>
  </Card>
  
  {/* </div>
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/routines" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              routines
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Nueva Rutina</b> :
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.fecha}
                  error={errors.fecha}
                  id="fecha"
                  type="date"
                  className={classnames("", {
                    invalid: errors.fecha
                  })}
                />
                <label htmlFor="fecha">Fecha</label>
                <span className="red-text">{errors.fecha}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.ejecutor}
                  error={errors.ejecutor}
                  id="ejecutor"
                  type="text"
                  className={classnames("", {
                    invalid: errors.ejecutor
                  })}
                />
                <label htmlFor="ejecutor">Ejecutor </label>
                <span className="red-text">{errors.ejecutor}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.supervisor}
                  error={errors.supervisor}
                  id="supervisor"
                  type="text"
                  className={classnames("", {
                    invalid: errors.supervisor
                  })}
                />
                <label htmlFor="supervisor">Supervisor</label>
                <span className="red-text">{errors.supervisor}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_vip}
                  error={errors.espacio_vip}
                  id="espacio_vip"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_vip
                  })}
                />
                <label htmlFor="espacio_vip">Espacio VIP</label>
                <span className="red-text">{errors.espacio_vip}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_local}
                  error={errors.espacio_local}
                  id="espacio_local"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_local
                  })}
                />
                <label htmlFor="espacio_local">Espacio Locales</label>
                <span className="red-text">{errors.espacio_local}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_banio}
                  error={errors.espacio_banio}
                  id="espacio_banio"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_banio
                  })}
                />
                <label htmlFor="espacio_banio">Espacio Baño</label>
                <span className="red-text">{errors.espacio_banio}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_parq}
                  error={errors.espacio_parq}
                  id="espacio_parq"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_parq
                  })}
                />
                <label htmlFor="espacio_parq">Espacio Parque</label>
                <span className="red-text">{errors.espacio_parq}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_fach}
                  error={errors.espacio_fach}
                  id="espacio_fach"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_fach
                  })}
                />
                <label htmlFor="espacio_fach">Espacio Fachada</label>
                <span className="red-text">{errors.espacio_fach}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_pant}
                  error={errors.espacio_pant}
                  id="espacio_pant"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_pant
                  })}
                />
                <label htmlFor="espacio_pant">Espacio Pantalla</label>
                <span className="red-text">{errors.espacio_pant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.espacio_rci}
                  error={errors.espacio_rci}
                  id="espacio_rci"
                  type="text"
                  className={classnames("", {
                    invalid: errors.espacio_rci
                  })}
                />
                <label htmlFor="espacio_rci">Espacio RCI</label>
                <span className="red-text">{errors.espacio_rci}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.observaciones}
                  error={errors.observaciones}
                  id="observaciones"
                  type="text"
                  className={classnames("", {
                    invalid: errors.observaciones
                  })}
                />
                <label htmlFor="observaciones">Observaciones</label>
                <span className="red-text">{errors.observaciones}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.recinto}
                  error={errors.recinto}
                  id="recinto"
                  type="text"
                  className={classnames("", {
                    invalid: errors.recinto
                  })}
                />
                <label htmlFor="recinto">Recinto</label>
                <span className="red-text">{errors.recinto}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      </div>
    );
  }
}

RoutineForm.propTypes = {
    addRoutine: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    
};

const mapStateToProps = state => ({
    errors: state.errors,
    users: state.users,
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { addRoutine, getUsers }
)(RoutineForm));