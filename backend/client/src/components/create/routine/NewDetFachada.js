import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getDetail, newDetFachada } from "../../../actions/routines/fachadaActions";

import { TextField, Typography, Grid, Button, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    width: 800,
    minWidth: 350
  },
  pos: {
    left: "40%",
    width: 170,
    marginBottom: 20
  },
});

class NewDetFachada extends Component {
  constructor() {
    super();
    this.state = {
        fuga_espirotubo: "",
        presion_sensor: "",
        presion_alta: null,
        presion_baja: null,
        colchones: "",
        defecto_colchones: "",
        generador_aire: "",
        lamparas: "",
        defecto_lamparas: "",
        control: "",
        tablero_electrico: "",
        errors: {} 
    };
  }

  componentDidMount() {
    this.props.getDetail(this.props.id);
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

  presionChange(data) {
    this.setState({
      presion_sensor: data.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        rutina: this.props.rutina,
        nombre: this.props.id,
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
    };
    this.props.newDetFachada(nueva, this.props.history)
  };
  
render() {
  const { classes } = this.props;
  const { errors } = this.state;

//------------------------------ Opciones ---------------------------------------
const options = [
    {value:"No", label:"No"},
    {value:"Si", label:"Si"}
];

return (
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12}>
      <Card container className={classes.root} variant="elevated">
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Nuevo detalle de fachada :</Typography>
              <br/>
              <Grid container spacing={2}>
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
                    <Autocomplete
                      id="presion_sensor"
                      defaultValue={this.state.presion_sensor}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={(event, value) => this.presionChange(value)}
                      style={{ width: "100%"}}
                      renderInput={(params) => <TextField {...params} label="El sensor analógico tiene presión" variant="standard" multiline={true}/>}
                      />
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
                    <Divider/>
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

NewDetFachada.propTypes = {
    getDetail: PropTypes.func.isRequired,
    newDetFachada: PropTypes.func.isRequired,
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
    { getDetail, newDetFachada }
)(NewDetFachada));