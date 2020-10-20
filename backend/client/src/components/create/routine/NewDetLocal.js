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
      puertas: 0,
      agua: "",
      gas: "",
      electricidad: "",
      lamparas: 0,
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
    const { puertas, agua, gas, electricidad, lamparas, ventaneria,
            pasillos, observacion} = this.state;

    const options = [
        {label: "SI", value: "SI"},
        {label: "NO", value: "NO"}
    ]

    let puert_disp = 0;
    let lamps_disp = 0;

    const ids_locales = ["ab101","ab102","ab103","ab104","ab201","ab202", "ab203", "ab204", "ab301", "ab302",
    "ab303", "ab304", "indigo_norte", "indigo_sur", "crepes", "tostao_101", "homeburger_102", "buffalowings_103", 
    "local_104", "tuboleta", "exp_1", "exp_2", "exp_3", "exp_4", "exp_5", "exp_6", "exp_7", "exp_8", "exp_9",
    "exp_10", "exp_11", "exp_12", "exp_13"]

    for(let i=0;i<ids_locales.length;i++) {
      if(this.props.id=="ab101") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab102") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab103") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab104") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab201") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab202") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab203") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab204") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab301") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab302") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab303") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="ab304") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="indigo_norte") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="indigo_sur") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="crepes") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="tostao_101") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="homeburger_102") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="buffalowings_103") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="local_104") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="tuboleta") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_1") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_2") {
        puert_disp = 0; lamps_disp= 0;
      }
      else if(this.props.id=="exp_3") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_4") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_5") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_6") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_7") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_8") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_9") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_10") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_11") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_12") {
        puert_disp = 0; lamps_disp = 0;
      }
      else if(this.props.id=="exp_13") {
        puert_disp = 0; lamps_disp = 0;
      }
    }

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Local {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                  label="Puertas"
                  defaultValue={puert_disp}
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
                id="puertas"
                label="Puertas faltantes"
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
              <Grid item xs={12}>
                <Autocomplete
                    id="agua"
                    defaultValue={agua}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('agua')}
                    style={{ width: "50%"}}
                    renderInput={(params) => <TextField {...params} label="Agua disponible" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.agua}</span>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    id="gas"
                    defaultValue={gas}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('gas')}
                    style={{ width: "50%"}}
                    renderInput={(params) => <TextField {...params} label="Gas disponible" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.gas}</span>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                    id="electricidad"
                    defaultValue={electricidad}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('electricidad')}
                    style={{ width: "50%"}}
                    renderInput={(params) => <TextField {...params} label="Electricidad disponible" variant="standard" multiline={true}/>}
                    />
                <span className="red-text">{errors.electricidad}</span>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Lamparas"
                  defaultValue={lamps_disp}
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
                id="lamparas"
                label="Lámparas faltantes"
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
              <Autocomplete
                    id="pasillos"
                    defaultValue={pasillos}
                    options={options}
                    getOptionLabel={(options) => options.label}
                    onChange={this.optionChange('pasillos')}
                    style={{ width: "100%"}}
                    renderInput={(params) => <TextField {...params} label="Pasillos Libres" variant="standard" multiline={true}/>}
                    />
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
                <Button variant="outlined" style={{backgroundColor:"#F59C00"}} onClick={this.onSubmit}> Agregar </Button>
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