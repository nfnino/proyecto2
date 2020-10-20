import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { addParking } from "../../../actions/routines/parkingActions";

import { TextField, Typography, Grid, Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
        carros_n1: 0,
        carros_n2: 0,
        carros_n3: 0,
        carros_n4: 0,
        motos_n1: 0,
        motos_n2: 0,
        motos_n3: 0,
        motos_n4: 0,
        camaras_n1: 0,
        camaras_n2: 0,
        camaras_n3: 0,
        camaras_n4: 0,
        camaras_ptz: 0,
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

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
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

return (
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12}>
      <Card container className={classes.root} variant="outlined">
          <Link to="/parkings" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Nueva rutina de parking & CCTV :</Typography>
              <br/>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Carros N1"
                    defaultValue={62}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid> 
                  <Grid item xs={6}>
                    <TextField
                        id="carros_n1"
                        label="Parqueaderos No Disponibles Carros N1"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Motos N1"
                    defaultValue={6}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="motos_n1"
                        label="Parqueaderos No Disponibles Motos N1"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Carros N2"
                    defaultValue={85}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="carros_n2"
                        label="Parqueaderos No Disponibles Carros N2"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Motos N2"
                    defaultValue={6}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="motos_n2"
                        label="Parqueaderos No Disponibles Motos N2"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Carros N3"
                    defaultValue={85}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="carros_n3"
                        label="Parqueaderos No Disponibles Carros N3"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Motos N3"
                    defaultValue={6}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="motos_n3"
                        label="Parqueaderos No Disponibles Motos N3"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Carros N4"
                    defaultValue={82}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="carros_n4"
                        label="Parqueaderos No Disponibles Carros N4"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Parqueaderos Motos N4"
                    defaultValue={0}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="motos_n4"
                        label="Parqueaderos No Disponibles Motos N4"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Cámaras Nivel 1"
                    defaultValue={19}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="camaras_n1"
                        label="Cámaras sin servicio N1"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Cámaras Nivel 2"
                    defaultValue={11}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="camaras_n2"
                        label="Cámaras sin servicio N2"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Cámaras Nivel 3"
                    defaultValue={15}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="camaras_n3"
                        label="Cámaras sin servicio N3"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Cámaras Nivel 4"
                    defaultValue={19}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="camaras_n4"
                        label="Cámaras sin servicio N4"
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
                  <Grid item xs={6}>
                  <TextField
                    label="Cámaras PTZ"
                    defaultValue={9}
                    margin="normal"
                    variant="filled"
                    size="small"
                    contentEditable="false"
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    multiline={true}
                    style={{
                      width: "100%"
                    }}
                  />
                </Grid>
                  <Grid item xs={6}>
                    <TextField
                        id="camaras_ptz"
                        label="Cámaras sin servicio PTZ"
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