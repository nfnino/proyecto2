import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { addPantalla } from "../../../actions/routines/pantallaActions";

import { TextField, Typography, Grid, Button } from "@material-ui/core";
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
    marginBottom:20
  },
});

class NewPantalla extends Component {
  constructor() {
    super();
    this.state = {
        fecha: new Date(),
        ejecutor: "",
        falla: "",
        paneles: "",
        tipo_falla: "",
        cpu: "",
        control: "",
        tableros: "",
        plano: "",
        corriente_f1:null,
        corriente_f2:null,
        corriente_f3:null,
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

  onChange = input => e => {
    console.log(e.target.value)
    this.setState({ [input]: e.target.value });
  };

  optionsChange = input => (e, obj) => {
    console.log(input)
    console.log(obj.value)
    this.setState({
      [input]: obj.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
        falla: this.state.falla,
        paneles: this.state.paneles,
        tipo_falla: this.state.tipo_falla,
        cpu: this.state.cpu,
        control: this.state.control,
        tableros: this.state.tableros,
        plano: this.state.plano,
        corriente_f1:this.state.corriente_f1,
        corriente_f2:this.state.corriente_f2,
        corriente_f3:this.state.corriente_f3,
    };
    this.props.addPantalla(nueva, this.props.history)
  };
  
render() {
  const { classes } = this.props;
  const { errors } = this.state;

const options = [
    {value:"No", label:"No"},
    {value:"Si", label:"Si"},
];

return (
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12}>
      <Card container className={classes.root} variant="outlined">
          <Link to="/pantallas" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Iniciar nueva rutina de pantalla :</Typography>
              <br/>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <Autocomplete
                      id="falla"
                      defaultValue={this.state.falla}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={this.optionsChange('falla')}
                      style={{ width: "90%"}}
                      renderInput={(params) => <TextField {...params} label="Paneles con falla" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.falla}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    id="paneles"
                    label="No. Paneles con falla"
                    defaultValue={this.state.paneles}
                    onChange={this.onChange('paneles')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "90%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.paneles}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    id="tipo_falla"
                    label="Tipo de falla"
                    defaultValue={this.state.tipo_falla}
                    onChange={this.onChange('tipo_falla')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "90%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.tipo_falla}</span>
                  </Grid>
                  <Grid item xs={12}>
                      <Autocomplete
                      id="cpu"
                      defaultValue={this.state.cpu}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={this.optionsChange('cpu')}
                      style={{ width: "90%"}}
                      renderInput={(params) => <TextField {...params} label="CPU limpia y funcionando" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.cpu}</span>
                  </Grid>
                  <Grid item xs={12}>
                      <Autocomplete
                      id="control"
                      defaultValue={this.state.control}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={this.optionsChange('control')}
                      style={{ width: "90%"}}
                      renderInput={(params) => <TextField {...params} label="Control funcionando" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.control}</span>
                  </Grid>
                  <Grid item xs={12}>
                      <Autocomplete
                      id="tableros"
                      defaultValue={this.state.tableros}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={this.optionsChange('tableros')}
                      style={{ width: "90%"}}
                      renderInput={(params) => <TextField {...params} label="Tableros eléctricos limpios" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.tableros}</span>
                  </Grid>
                <Grid item xs={12}>
                      <Autocomplete
                      id="plano"
                      defaultValue={this.state.plano}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={this.optionsChange('plano')}
                      style={{ width: "90%"}}
                      renderInput={(params) => <TextField {...params} label="Plano eléctrico actualizado" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.plano}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    id="corriente_f1"
                    label="Corriente F1 (AMP)"
                    defaultValue={this.state.corriente_f1}
                    onChange={this.onChange('corriente_f1')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "90%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.corriente_f1}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    id="corriente_f2"
                    label="Corriente F2 (AMP)"
                    defaultValue={this.state.corriente_f2}
                    onChange={this.onChange('corriente_f2')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "90%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.corriente_f2}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    id="corriente_f3"
                    label="Corriente F3 (AMP)"
                    defaultValue={this.state.corriente_f3}
                    onChange={this.onChange('corriente_f3')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                        width: "90%"
                    }}>
                    </TextField>
                    <span className="red-text">{errors.corriente_f3}</span>
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

NewPantalla.propTypes = {
    getUsers: PropTypes.func.isRequired,
    addPantalla: PropTypes.func.isRequired,
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
    { getUsers, addPantalla }
)(NewPantalla));