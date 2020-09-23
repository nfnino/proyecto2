import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

import { getAssets } from "../../../actions/assetActions";

import { TextField, Typography, Grid, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
  },
  pos: {
    left: "40%",
    marginBottom: 12,
    width: 150,
  },
});

class Data extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.getAssets();
  }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
  
render() {
    const { classes } = this.props;
    const { assets } = this.props.assets;
    const { errors } = this.props;

    const { values, handleChange, listChange, dateChange } = this.props;

    let options_activos = []

    let options_rec = [
      {value: "Movistar Arena Colombia", label: "Movistar Arena Colombia"},
      {value: "Movistar Arena Chile", label: "Movistar Arena Chile"}
    ]

    let options_area = [
      {value: "Operaciones", label: "Operaciones"},
      {value: "Área 2", label: "Área 2"},
      {value: "Área 3", label: "Área 3"},
    ]

    let options_cat = [
      {value: "Accesos", label: "Accesos"},
      {value: "Acústica", label: "Acústica"},
      {value: "Aluminio/vidrio", label: "Aluminio/vidrio"},
      {value: "Aparatos sanitarios", label: "Aparatos sanitarios"},
      {value: "Arquitectura", label: "Arquitectura"},
      {value: "Acabados/interior", label: "Acabados/interior"},
      {value: "Cubiertas", label: "Cubiertas"},
      {value: "Dotaciones", label: "Dotaciones"},
      {value: "Equipos de cómputo", label: "Equipos de cómputo"},
      {value: "Equipos de seguridad en alturas", label: "Equipos de seguridad en alturas"},
      {value: "Estructuras metálicas", label: "Estructuras metálicas"},
      {value: "Fachada", label: "Fachada"},
      {value: "Gas", label: "Gas"},
      {value: "Hidrosanitario RCI", label: "Hidrosanitario RCI"},
      {value: "HVAC", label: "HVAC"},
      {value: "Iluminación exterior", label: "Iluminación exterior"},
      {value: "Seguridad y control", label: "Seguridad y control"},
      {value: "Subestación eléctrica", label: "Subestación eléctrica"},
      {value: "Transporte vertical", label: "Transporte vertical"},
      {value: "Urbanismo", label: "Urbanismo"},
      {value: "Vallas", label: "Vallas"},
      {value: "Ventanería de fachada", label: "Ventanería de fachada"},
      {value: "Voz", label: "Voz"},
      {value: "Datos y telecomunicaciones", label: "Datos y telecomunicaciones"}]

    if( assets.length !== 0) {
      let activos = Object.values(assets.data)
      let todos = activos.map(asset => ({
        value: asset.nombre,
        label: asset.nombre
      }))
      for(let i=0;i<todos.length;i++){
        options_activos.push(todos[i]);
      }
    }

return (
  <div>
      <Card container className={classes.root} variant="outlined">
      <CardContent align="center">
        <Typography variant="h4" color="primary" align="center" gutterBottom>Creación Activo </Typography>
                            <Typography variant="h5" color="primary"> Paso 1:</Typography>
                            <Typography variant="h6" color="textPrimary" gutterBottom>Ingresar Información Del Activo</Typography>
                            <br/>
          <br/>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
              id="recinto"
              defaultValue={values.recinto}
              options={options_rec}
              getOptionLabel={(options_rec) => options_rec.label}
              onChange={listChange('recinto')}
              style={{ width: 350}}
              renderInput={(params) => <TextField {...params} label="Recinto" required="true" variant="standard" multiline={true}/>}
              />
              <span className="red-text">{errors.recinto}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
              id="categoria"
              defaultValue={values.categoria}
              options={options_cat}
              getOptionLabel={(options_cat) => options_cat.label}
              onChange={listChange('categoria')}
              style={{ width: 350}}
              renderInput={(params) => <TextField {...params} label="Categoría" required="true" variant="standard" multiline={true} />}
              />
              <span className="red-text">{errors.categoria}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              id="nombre"
              label="Nombre"
              required="true"
              defaultValue={values.nombre}
              onChange={handleChange('nombre')}
              margin="normal"
              variant="standard"
              size="small"
              multiline={true}
              style={{
                width: 350
              }}>
              </TextField>
              <span className="red-text">{errors.nombre}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
              id="area"
              defaultValue={values.area}
              options={options_area}
              getOptionLabel={(options_area) => options_area.label}
              onChange={listChange('area')}
              style={{ width: 350}}
              renderInput={(params) => <TextField {...params} label="Área" required="true" variant="standard" multiline={true} />}
              />
              <span className="red-text">{errors.area}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              id="ubicacion"
              label="Ubicación"
              defaultValue={values.ubicacion}
              onChange={handleChange('ubicacion')}
              margin="normal"
              variant="standard"
              size="small"
              multiline={true}
              style={{
                width: 350
              }}>
              </TextField>
              <span className="red-text">{errors.ubicacion}</span>
            </Grid>
            <Grid item xs={12} sm={6}> 
               <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  variant="dialog"
                  inputVariant="standard"
                  format="DD/MM/yyyy"
                  margin="normal"
                  multiline={true}
                  style={{
                    width: 350
                  }}
                  label="Fecha de compra"
                  value={values.fecha_compra}
                  onChange={dateChange('fecha_compra')}
                />
              </MuiPickersUtilsProvider> 
              <span className="red-text">{errors.fecha_compra}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              id="valor"
              label="Valor"
              type="number"
              defaultValue={values.valor}
              onChange={handleChange('valor')}
              margin="normal"
              variant="standard"
              size="small"
              multiline={true}
              style={{
                width: 350
              }}>
              </TextField>
              <span className="red-text">{errors.valor}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              id="dias_garantia"
              label="Dias de garantía"
              type="number"
              defaultValue={values.dias_garantia}
              onChange={handleChange('dias_garantia')}
              margin="normal"
              variant="standard"
              size="small"
              multiline={true}
              style={{
                width: 350
              }}>
              </TextField>
              <span className="red-text">{errors.dias_garantia}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
               <KeyboardDatePicker
                variant="dialog"
                inputVariant="standard"
                format="DD/MM/yyyy"
                margin="normal"
                multiline={true}
                style={{
                  width: 350
                }}
                label="Fin garantía"
                value={values.fecha_fin_garantia}
                onChange={dateChange('fecha_fin_garantia')}
              />
              </MuiPickersUtilsProvider> 
              <span className="red-text">{errors.fecha_fin_garantia}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="dias_frec_mant_preventivo"
                label="Frecuencia mantenimiento"
                defaultValue={values.dias_frec_mant_preventivo}
                onChange={handleChange('dias_frec_mant_preventivo')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
              </TextField>
              <span className="red-text">{errors.dias_frec_mant_preventivo}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="observacion"
                label="Observaciones"
                defaultValue={values.observacion}
                onChange={handleChange('observacion')}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 740
                }}>
              </TextField>
              <span className="red-text">{errors.observacion}</span>
            </Grid>
            <Grid item xs={12}>
              <Divider component="li" />
              <li>
                <Typography
                  color="textSecondary"
                  display="block"
                  variant="overline"
                >
                  En caso de ser el reemplazo de otro activo:
                </Typography>
              </li>
              <Autocomplete
              id="activo_reemp"
              defaultValue={values.activo_reemp}
              options={options_activos}
              getOptionLabel={(options_activos) => options_activos.label}
              onChange={listChange('activo_reemp')}
              style={{ width: 350}}
              renderInput={(params) => <TextField {...params} label="Activo antiguo" variant="standard" multiline={true} />}
              />
            </Grid>
          </Grid>
          <br/>
          <Button variant="contained" onClick={this.continue} color="primary">Siguiente</Button>
        </CardContent>
      </Card>
      </div>
    );
  }
}

Data.propTypes = {
    errors: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    assets: state.assets,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getAssets }
)(Data));