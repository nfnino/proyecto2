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
      sillas: "",
      puertas: "",
      lava_platos: "",
      lamparas: "",
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

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom> Suite {this.props.id} :</Typography>
              <br/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                id="sillas"
                label="Sillas Disponibles"
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
              <Grid item xs={12} sm={6}>
                <TextField
                id="puertas"
                label="Puertas Acceso Disponibles"
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
                <TextField
                id="lava_platos"
                label="Lava Platos Disponibles"
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
              <Grid item xs={12} sm={6}>
                <TextField
                id="lamparas"
                label="Lámparas Disponibles"
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