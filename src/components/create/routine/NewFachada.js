import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { addFachada } from "../../../actions/routines/fachadaActions";

import { TextField, Typography, Grid, Button, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

class NewParking extends Component {
  constructor() {
    super();
    this.state = {
        fecha: new Date(),
        ejecutor: "",
        supervisor: "",
        blower: "",
        fuga_espirotubo: "",
        presion_sensor: null,
        presion_alta: null,
        presion_baja: null,
        colchones: "",
        defecto_colchones: "",
        generador_aire: "",
        lamparas: "",
        defecto_lamparas: "",
        control: "",
        tablero_electrico: "",
        observacion: "",
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

  supervisorChange(supervisor) {
    this.setState({
      supervisor: supervisor.value
    })
  }

  blowerChange(data) {
    this.setState({
      blower: data.value
    })
  }

  fugaChange(data) {
    this.setState({
      fuga_espirotubo: data.value
    })
  }

  colchonesChange(data) {
    this.setState({
      colchones: data.value
    })
  }

  generadorChange(data) {
    this.setState({
      generador_aire: data.value
    })
  }

  lamparasChange(data) {
    this.setState({
      lamparas: data.value
    })
  }

  controlChange(data) {
    this.setState({
      control: data.value
    })
  }

  tableroChange(data) {
    this.setState({
      tablero_electrico: data.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
        supervisor: this.state.supervisor,
        blower: this.state.blower,
        fuga_espirotubo: this.state.fuga_espirotubo,
        presion_sensor: this.state.presion_sensor,
        presion_alta: this.state.presion_alta,
        presion_baja: this.state.presion_baja,
        colchones: this.state.colchones,
        defecto_colchones: this.state.defecto_colchones,
        generador_aire: this.state.generador_aire,
        lamparas: this.state.lamparas,
        defecto_lamparas: this.state.defecto_lamparas,
        control: this.state.control,
        tablero_electrico: this.state.tablero_electrico,
        observacion: this.state.observacion,
    };
    this.props.addFachada(nueva, this.props.history)
  };
  
render() {
  const { classes } = this.props;
  const { errors } = this.state;
  const { users } = this.props.users;

//------------------------------ Supervisor dropdown ---------------------------------------
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
    if (temp.type === "Jefe de área") {
      options_supervisor.push(temp)
    }
  }
} 
//------------------------------ Opciones ---------------------------------------

const options_blower = [
    {value:"Blower-1", label:"Blower-1"},
    {value:"Blower-2", label:"Blower-2"},
    {value:"Blower-3", label:"Blower-3"},
    {value:"Blower-4", label:"Blower-4"},
];

const options = [
    {value:"No", label:"No"},
    {value:"Si", label:"Si"}
];

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <Link to="/fachadas" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" color="primary" gutterBottom>Nueva rutina de fachada :</Typography>
              <br/>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                      <Autocomplete
                      id="blower"
                      defaultValue={this.state.blower}
                      options={options_blower}
                      getOptionLabel={(options_blower) => options_blower.label}
                      onChange={(event, value) => this.blowerChange(value)}
                      style={{ width: "100%"}}
                      renderInput={(params) => <TextField {...params} label="Blower" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.blower}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Autocomplete
                      id="supervisor"
                      defaultValue={this.state.supervisor}
                      options={options_supervisor}
                      getOptionLabel={(options_supervisor) => options_supervisor.label}
                      onChange={(event, value) => this.supervisorChange(value)}
                      style={{ width: "100%"}}
                      renderInput={(params) => <TextField {...params} label="Supervisor" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.supervisor}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Autocomplete
                      id="fuga_espirotubo"
                      defaultValue={this.state.fuga_espirotubo}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={(event, value) => this.fugaChange(value)}
                      style={{ width: "100%"}}
                      renderInput={(params) => <TextField {...params} label="Espirotubo con fuga de aire" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.fuga_espirotubo}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                        id="presion_sensor"
                        label="Presión sensor analógico 0-10 Vdc"
                        defaultValue={this.state.presion_sensor}
                        onChange={this.onChange}
                        margin="normal"
                        type="Number"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.presion_sensor}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                        id="presion_baja"
                        label="Presión de baja"
                        defaultValue={this.state.presion_baja}
                        onChange={this.onChange}
                        margin="normal"
                        type="Number"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.presion_baja}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                        id="presion_alta"
                        label="Presión de alta"
                        defaultValue={this.state.presion_alta}
                        onChange={this.onChange}
                        margin="normal"
                        type="Number"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.presion_alta}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <br/>
                        <Divider></Divider>
                    <br/>
                      <Autocomplete
                      id="colchones"
                      defaultValue={this.state.colchones}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={(event, value) => this.colchonesChange(value)}
                      style={{ width: "100%"}}
                      renderInput={(params) => <TextField {...params} label="Colchones con defectos" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.colchones}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="colchones_defectos"
                        label="Defecto"
                        defaultValue={this.state.colchones_defectos}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.colchones_defectos}</span>
                  </Grid>
                  <Grid item xs={12}>
                  <br/>
                    <Divider></Divider>
                    <br/>
                    <Autocomplete
                        id="generador_aire"
                        defaultValue={this.state.generador_aire}
                        options={options}
                        getOptionLabel={(options) => options.label}
                        onChange={(event, value) => this.generadorChange(value)}
                        style={{ width: "100%"}}
                        renderInput={(params) => <TextField {...params} label="Tablero generador aire limpio" variant="standard" multiline={true}/>}
                        />
                    <span className="red-text">{errors.generador_aire}</span>
                  </Grid>
                    <Grid item xs={12}>
                    <br/>
                    <Divider></Divider>
                    <br/>
                        <Autocomplete
                            id="lamparas"
                            defaultValue={this.state.lamparas}
                            options={options}
                            getOptionLabel={(options) => options.label}
                            onChange={(event, value) => this.lamparasChange(value)}
                            style={{ width: "100%"}}
                            renderInput={(params) => <TextField {...params} label="Lamparas funcionando" variant="standard" multiline={true}/>}
                            />
                        <span className="red-text">{errors.lamparas}</span>
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="defecto_lamparas"
                        label="Fallo"
                        defaultValue={this.state.defecto_lamparas}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.defecto_lamparas}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="control"
                        defaultValue={this.state.control}
                        options={options}
                        getOptionLabel={(options) => options.label}
                        onChange={(event, value) => this.controlChange(value)}
                        style={{ width: "100%"}}
                        renderInput={(params) => <TextField {...params} label="Control funcionando" variant="standard" multiline={true}/>}
                        />
                    <span className="red-text">{errors.control}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                        id="tablero_electrico"
                        defaultValue={this.state.tablero_electrico}
                        options={options}
                        getOptionLabel={(options) => options.label}
                        onChange={(event, value) => this.tableroChange(value)}
                        style={{ width: "100%"}}
                        renderInput={(params) => <TextField {...params} label="Tablero eléctrico limpio y organizado" variant="standard" multiline={true}/>}
                        />
                    <span className="red-text">{errors.tablero_electrico}</span>
                  </Grid>
                  <Grid item xs={12}>
                  <br/>
                    <Divider></Divider>
                    <br/>
                    <TextField
                        id="observacion"
                        label="Observaciónes"
                        defaultValue={this.observacion}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.observacion}</span>
                  </Grid>
                </Grid>
          </CardContent>
          <br/>
          <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
            Crear
          </Button>
          <br/>
      </Card>
  </div>
    );
  }
}

NewParking.propTypes = {
    getUsers: PropTypes.func.isRequired,
    addFachada: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getUsers, addFachada }
)(NewParking));