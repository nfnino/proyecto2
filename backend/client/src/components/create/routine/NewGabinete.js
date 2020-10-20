import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typography, Button, Grid, TextField, Checkbox, FormControlLabel, FormGroup,} from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Card from '@material-ui/core/Card';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import MomentUtils from '@date-io/moment';
import CardContent from '@material-ui/core/CardContent';

import { newGabinete } from "../../../actions/routines/rciActions";

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

class NewGabinete extends Component {

  constructor() {
    super();
    this.state = {
      manguera: "",
      extintor: new Date(),
      conexion: "",
      presion: "",
      limpieza: false,
      seguro: "",
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

  handleCheck = (e) => {
    this.setState({limpieza: !this.state.limpieza})
  }

  handleDateChange = (date) => {
    this.setState({extintor: date})
  };

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
      manguera: this.state.manguera,
      extintor: this.state.extintor,
      conexion: this.state.conexion,
      presion: this.state.presion,
      limpieza: this.state.limpieza,
      seguro: this.state.seguro,
      observacion: this.state.observacion,
    }
    console.log(data)
    this.props.newGabinete(data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.props)
    const {manguera, conexion, presion, limpieza, seguro, observacion} = this.state;

    const options = [
      {label: "Correcto", value: "Correcto"},
      {label: "Incorrecto", value: "Incorrecto"}
    ]

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Gabinete {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                    id="manguera"
                    defaultValue={manguera}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('manguera')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Estado Manguera" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.manguera}</span>
              </Grid>  
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                    variant="dialog"
                    inputVariant="standard"
                    format="MM/yyyy"
                    margin="normal"
                    multiline={true}
                    style={{
                        width: "100%"
                    }}
                    label="Próxima Recarga Extintor"
                    value={this.state.extintor}
                    onChange={this.handleDateChange}
                    />
                </MuiPickersUtilsProvider> 
                <span className="red-text">{errors.extintor}</span>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    id="conexion"
                    defaultValue={conexion}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('conexion')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Conexión Limpia y Seca" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.conexion}</span>
              </Grid>  
              <Grid item xs={12}>
                <TextField
                id="presion"
                label="Verificar Presión Agua"
                defaultValue={presion}
                onChange={this.handleChange('presion')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.presion}</span>
              </Grid>  
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                  label="Hacer limpieza"
                    control={
                      <Checkbox 
                        checked={this.state.limpieza}
                        onChange={this.handleCheck}
                        name="limpieza"
                      />
                    }
                  />
                </FormGroup>
                <span className="red-text">{errors.limpieza}</span>
              </Grid>  
              <Grid item xs={12}>
                <Autocomplete
                    id="seguro"
                    defaultValue={seguro}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('seguro')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Gabinete con Seguro" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.seguro}</span>
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
                <Button variant="outlined" style={{color:"#F59C00"}} onClick={this.onSubmit}> Agregar </Button>
              </Grid>
            </Grid>
          </CardContent>
          <br/>
      </Card>
  </div>
    );
  }
}

NewGabinete.propTypes = {
    newGabinete: PropTypes.func.isRequired,
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
    {  newGabinete }
)(NewGabinete));