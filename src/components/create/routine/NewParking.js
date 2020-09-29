import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { addParking } from "../../../actions/routines/parkingActions";

import { TextField, Typography, Grid, Button, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    width: 600,
    minWidth: 300
  },
  pos: {
    left: "40%",
    width: 170,
    marginBottom: 20
  },
});

class NewParking extends Component {
  constructor() {
    super();
    this.state = {
        fecha: new Date(),
        ejecutor: "",
        supervisor: "",
        carros_n1: "",
        carros_n2: "",
        carros_n3: "",
        carros_n4: "",
        motos_n1: "",
        motos_n2: "",
        motos_n3: "",
        motos_n4: "",
        camaras_n1: "",
        camaras_n2: "",
        camaras_n3: "",
        camaras_n4: "",
        camaras_ptz: "",
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

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
        supervisor: this.state.supervisor,
        carros_n1: this.state.carros_n1,
        carros_n2: this.state.carros_n2,
        carros_n3: this.state.carros_n3,
        carros_n4: this.state.carros_n4,
        motos_n1: this.state.motos_n1,
        motos_n2: this.state.motos_n2,
        motos_n3: this.state.motos_n3,
        motos_n4: this.state.motos_n4,
        camaras_n1: this.state.camaras_n1,
        camaras_n2: this.state.camaras_n2,
        camaras_n3: this.state.camaras_n3,
        camaras_n4: this.state.camaras_n4,
        camaras_ptz: this.state.camaras_ptz,
        observacion: this.state.observacion,
    };
    this.props.addParking(nueva, this.props.history)
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

return (
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12}>
      <Card container className={classes.root} variant="outlined">
          <Link to="/parkings" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Nueva rutina de parking :</Typography>
              <br/>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <TextField
                        id="carros_n1"
                        label="Parq. Disponibles Carros N1"
                        defaultValue={this.state.carros_n1}
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
                    <span className="red-text">{errors.carros_n1}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="motos_n1"
                        label="Parq. Disponibles Motos N1"
                        defaultValue={this.state.motos_n1}
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
                    <span className="red-text">{errors.motos_n1}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="carros_n2"
                        label="Parq. Disponibles Carros N2"
                        defaultValue={this.state.carros_n2}
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
                    <span className="red-text">{errors.carros_n2}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="motos_n2"
                        label="Parq. Disponibles Motos N2"
                        defaultValue={this.state.motos_n2}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.motos_n2}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="carros_n3"
                        label="Parq. Disponibles Carros N3"
                        defaultValue={this.state.carros_n3}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.carros_n3}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="motos_n3"
                        label="Parq. Disponibles Motos N3"
                        defaultValue={this.state.motos_n3}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.motos_n3}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="carros_n4"
                        label="Parq. Disponibles Carros N4"
                        defaultValue={this.state.carros_n4}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.carros_n4}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="motos_n4"
                        label="Parq. Disponibles Motos N4"
                        defaultValue={this.state.motos_n4}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.motos_n4}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="camaras_n1"
                        label="Cámaras en servicio N1"
                        defaultValue={this.state.camaras_n1}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.camaras_n1}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="camaras_n2"
                        label="Cámaras en servicio N2"
                        defaultValue={this.state.camaras_n2}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.camaras_n2}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="camaras_n3"
                        label="Cámaras en servicio N3"
                        defaultValue={this.state.camaras_n3}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.camaras_n3}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="camaras_n4"
                        label="Cámaras en servicio N4"
                        defaultValue={this.state.camaras_n4}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.camaras_n4}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="camaras_ptz"
                        label="Cámaras en servicio PTZ"
                        defaultValue={this.state.camaras_ptz}
                        onChange={this.onChange}
                        margin="normal"
                        variant="standard"
                        size="small"
                        multiline={true}
                        style={{
                            width: "100%"
                        }}>
                    </TextField>
                    <span className="red-text">{errors.camaras_ptz}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        id="observacion"
                        label="Observaciones"
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
          <Button className={classes.pos} onClick={this.onSubmit} variant="contained" style={{backgroundColor:"#F59C00"}} size="large">
            Crear
          </Button>
          <br/>
      </Card>
    </Grid>
  </Grid>
    );
  }
}

NewParking.propTypes = {
    getUsers: PropTypes.func.isRequired,
    addParking: PropTypes.func.isRequired,
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
    { getUsers, addParking }
)(NewParking));