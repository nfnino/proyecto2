import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Typography, Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { newDetLocal } from "../../../actions/routines/localActions";

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
  },
  table: {
    minWidth: 500
  },
  pos: {
    left: "40%",
    width: 170,
  },
});

class NewDetLocal extends Component {

  constructor() {
    super();
    this.state = {
      ubicacion: "",
      puertas: null,
      agua: "",
      gas: "",
      electricidad: "",
      lamparas: "",
      ventaneria: "",
      pasillos: "",
      observacion: "",
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

  handleChange = input => e => {
    this.setState({[input]: e.target.value});
  }

  optionChange = input => (e, obj) => {
      this.setState({
          [input]: obj.value
      })
  }

  onSubmit = e => {
    e.preventDefault();
    const data = {
        rutina: this.props.rutina,
        nombre: this.props.id,
        ubicacion: this.state.ubicacion,
        puertas: this.state.puertas,
        agua: this.state.agua,
        gas: this.state.gas,
        electricidad: this.state.electricidad,
        lamparas: this.state.lamparas,
        ventaneria: this.state.ventaneria,
        pasillos: this.state.pasillos,
        observacion: this.state.observacion,
    }
    console.log(data)
    this.props.newDetLocal(data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(errors)
    console.log(this.props)
    const {ubicacion, puertas, agua, gas, electricidad, lamparas, ventaneria,
            pasillos, observacion} = this.state;

    const options = [
        {label: "SI", value: "SI"},
        {label: "NO", value: "NO"}
    ]

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" color="primary" gutterBottom> Local {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                id="ubicacion"
                label="Ubicación"
                defaultValue={ubicacion}
                onChange={this.handleChange('ubicacion')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.ubicacion}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <TextField
                id="puertas"
                label="Puertas en servicio"
                defaultValue={puertas}
                onChange={this.handleChange('puertas')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.puertas}</span>
              </Grid>  
              <Grid item xs={12} sm={6}>
                <Autocomplete
                    id="agua"
                    defaultValue={agua}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('agua')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Agua disponible" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.agua}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                    id="gas"
                    defaultValue={gas}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('gas')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Gas disponible" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.gas}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                    id="electricidad"
                    defaultValue={electricidad}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('electricidad')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Electricidad disponible" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.electricidad}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="lamparas"
                label="Lámparas en servicio"
                defaultValue={lamparas}
                onChange={this.handleChange('lamparas')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.lamparas}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                    id="ventaneria"
                    defaultValue={ventaneria}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('ventaneria')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Ventaneria sin fallas" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.ventaneria}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                id="pasillos"
                label="Pasillos libres"
                defaultValue={pasillos}
                onChange={this.handleChange('pasillos')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.pasillos}</span>
              </Grid>  
              <Grid item xs={12}>
                <TextField
                id="observacion"
                label="Observaciones"
                defaultValue={observacion}
                onChange={this.handleChange('observacion')}
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
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={this.onSubmit}> Agregar </Button>
              </Grid>
            </Grid>
          </CardContent>
          <br/>
      </Card>
  </div>
    );
  }
}

NewDetLocal.propTypes = {
    newDetLocal: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    rutina: ownProps.match.params.rutina,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { newDetLocal }
)(NewDetLocal));