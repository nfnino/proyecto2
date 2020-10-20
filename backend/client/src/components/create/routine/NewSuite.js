import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Typography, Button, Grid, TextField} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { newSuite } from "../../../actions/routines/vipActions";

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

class NewSuite extends Component {

  constructor() {
    super();
    this.state = {
      sillas: 0,
      puertas: 0,
      lava_platos: 0,
      lamparas: 0,
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

  handleDateChange = (date) => {
    this.setState({extintor: date})
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      rutina: this.props.rutina,
      nombre: this.props.id,
      sillas: this.state.sillas,
      puertas: this.state.puertas,
      lava_platos: this.state.lava_platos,
      lamparas: this.state.lamparas,
      observacion: this.state.observacion,
    }
    console.log(data)
    this.props.newSuite(data, this.props.history);
  }
  
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.props)
    const {sillas, puertas, lava_platos, lamparas, observacion} = this.state;

    let disp_sillas=0, disp_puerts=0, disp_lavap=0, disp_lamps=0; 

    const ids_suites = ["s101","s102","s103","s104","s105","s106", "s107", "s108", "s109", "s111", "s111", "s112",
                    "s113", "s114", "s115", "s116", "s117", "s118", "s119", "s120", 
                    "s_party", "tribuna_norte", "tribuna_sur", "platea", "graderia_piso2", "graderia_piso3",
                    "box1","box2","box3","box4","box5","box6", "box7", "box8", "box9", "box10", "box11", "box12",
                    "box13", "box14", "box15", "box16", "box17", "box18"]

    if(this.props.id==="s101") {
      disp_sillas = 22; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s103") {
      disp_sillas = 22; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s105") {
      disp_sillas = 23; disp_puerts = 1; disp_lavap = 1; disp_lamps = 13;
    }
    else if(this.props.id==="s107") {
      disp_sillas = 19; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s109") {
      disp_sillas = 19; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s111") {
      disp_sillas = 20; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s113") {
      disp_sillas = 20; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s115") {
      disp_sillas = 16; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s117") {
      disp_sillas = 16; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s119") {
      disp_sillas = 16; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s102") {
      disp_sillas = 22; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s104") {
      disp_sillas = 22; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s106") {
      disp_sillas = 23; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s108") {
      disp_sillas = 23; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s110") {
      disp_sillas = 19; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s112") {
      disp_sillas = 20; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s114") {
      disp_sillas = 20; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s116") {
      disp_sillas = 16; disp_puerts = 1; disp_lavap = 1; disp_lamps = 12;
    }
    else if(this.props.id==="s118") {
      disp_sillas = 16; disp_puerts = 1; disp_lavap = 0; disp_lamps = 12;
    }
    else if(this.props.id==="s120") {
      disp_sillas = 16; disp_puerts = 1; disp_lavap = 0; disp_lamps = 12;
    }
    else if(this.props.id==="s_party") {
      disp_sillas = 27; disp_puerts = 1; disp_lavap = 1; disp_lamps = 4;
    }
    else if(this.props.id==="tribuna_norte") {
      disp_sillas = 118; disp_puerts = 2; disp_lavap = 1; disp_lamps = 17;
    }
    else if(this.props.id==="tribuna_sur") {
      disp_sillas = 124; disp_puerts = 2; disp_lavap = 1; disp_lamps = 14;
    }
    else if(this.props.id==="platea") {
      disp_sillas = 2276; disp_puerts = 0; disp_lavap = 0; disp_lamps = 14;
    }
    else if(this.props.id==="graderia_piso2") {
      disp_sillas = 3958; disp_puerts = 0; disp_lavap = 0; disp_lamps = 0;
    }
    else if(this.props.id==="graderia_piso3") {
      disp_sillas = 4578; disp_puerts = 0; disp_lavap = 0; disp_lamps = 0;
    }
    else if(this.props.id==="box1") {
      disp_sillas = 16; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box2") {
      disp_sillas = 15; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box3") {
      disp_sillas = 8; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box4") {
      disp_sillas = 13; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box5") {
      disp_sillas = 13; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box6") {
      disp_sillas = 8; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box7") {
      disp_sillas = 10; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box8") {
      disp_sillas = 14; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box9") {
      disp_sillas = 14; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box10") {
      disp_sillas = 9; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box11") {
      disp_sillas = 9; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box12") {
      disp_sillas = 15; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box13") {
      disp_sillas = 15; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box14") {
      disp_sillas = 8; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box15") {
      disp_sillas = 8; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box16") {
      disp_sillas = 16; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box17") {
      disp_sillas = 16; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }
    else if(this.props.id==="box18") {
      disp_sillas = 7; disp_puerts = 2; disp_lavap = 1; disp_lamps = 26;
    }

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Suite {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Sillas"
                  defaultValue={disp_sillas}
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
                id="sillas"
                label="Sillas No Disponibles"
                defaultValue={sillas}
                onChange={this.handleChange('sillas')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.sillas}</span>
              </Grid>  
              <Grid item xs={6}>
                <TextField
                  label="Puertas"
                  defaultValue={disp_puerts}
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
                label="Puertas Acceso No Disponibles"
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
              <Grid item xs={6}>
                <TextField
                  label="Lava Platos"
                  defaultValue={disp_lavap}
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
                id="lava_platos"
                label="Lava Platos No Disponibles"
                defaultValue={lava_platos}
                onChange={this.handleChange('lava_platos')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: "100%"
                }}>
                </TextField>
                <span className="red-text">{errors.lava_platos}</span>
              </Grid>  
              <Grid item xs={6}>
                <TextField
                  label="Lámparas"
                  defaultValue={disp_lamps}
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
                label="Lámparas No Disponibles"
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

NewSuite.propTypes = {
    newSuite: PropTypes.func.isRequired,
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
    {  newSuite }
)(NewSuite));