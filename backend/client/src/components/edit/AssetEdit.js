import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateAsset } from "../../actions/assetActions";
import { Grid, TextField, Button, Card, CardContent } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    maxWidth: 800,
  },
  pos: {
    left: "40%",
    width: 170,
  },
});

class AssetEdit extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
          id: ownProps.asset._id, 
          recinto: ownProps.asset.recinto,
          ubicacion: ownProps.asset.ubicacion,
          categoria: ownProps.asset.categoria,
          nombre: ownProps.asset.nombre,
          fecha_compra: ownProps.asset.fecha_compra,
          valor: ownProps.asset.valor,
          dias_garantia: ownProps.asset.dias_garantia,
          fecha_fin_garantia: ownProps.asset.fecha_fin_garantia,
          manual: ownProps.asset.manual,
          cod_qr: ownProps.asset.cod_qr,
          dias_frec_mant_preventivo: ownProps.asset.dias_frec_mant_preventivo,
          estado: ownProps.asset.estado,
          observacion: ownProps.asset.observacion,
          errors: {}
        };
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
  
    listChange = input => (e, obj) => {
      this.setState({[input]: obj.value});
    }

    dateChange = input => e => {
      this.setState({[input]: e});
    }

    onSubmit = e => {
        e.preventDefault();
    
    const newInfo = {
        id: this.state.id,
      recinto: this.state.recinto,
      ubicacion: this.state.ubicacion,
      categoria: this.state.categoria,
      nombre: this.state.nombre,
      fecha_compra: this.state.fecha_compra,
      valor: this.state.valor,
      dias_garantia: this.state.dias_garantia,
      fecha_fin_garantia: this.state.fecha_fin_garantia,
      manual: this.state.manual,
      cod_qr: this.state.cod_qr,
      dias_frec_mant_preventivo: this.state.dias_frec_mant_preventivo,
      estado: this.state.estado,
      observacion: this.state.observacion,
      user_id: this.props.auth.user.id,
      user_name: this.props.auth.user.name,
      };
        this.props.updateAsset(newInfo, this.props.history); 
    };

    render() {
        const { errors } = this.state;
        const { classes } = this.props;

        let options_rec = [
            {value: "Movistar Arena Colombia", label: "Movistar Arena Colombia"}
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
          {value: "Datos y telecomunicaciones", label: "Datos y telecomunicaciones"}
        ]
    

    return (
        <div className="container">
          <Card container className={classes.root} variant="outlined">
            <CardContent align="center">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                  id="recinto"
                  defaultValue={this.state.recinto}
                  options={options_rec}
                  getOptionLabel={(options_rec) => options_rec.label}
                  onChange={this.listChange('recinto')}
                  style={{ width: "100%"}}
                  renderInput={(params) => <TextField {...params} label="Recinto" variant="standard" multiline={true}/>}
                  />
                  <span className="red-text">{errors.recinto}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                  id="categoria"
                  defaultValue={this.state.categoria}
                  options={options_cat}
                  getOptionLabel={(options_cat) => options_cat.label}
                  onChange={this.listChange('categoria')}
                  style={{ width: "100%"}}
                  renderInput={(params) => <TextField {...params} label="Categoría" variant="standard" multiline={true} />}
                  />
                  <span className="red-text">{errors.categoria}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  id="nombre"
                  label="Nombre"
                  defaultValue={this.state.nombre}
                  onChange={this.handleChange('nombre')}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: "100%"
                  }}>
                  </TextField>
                  <span className="red-text">{errors.nombre}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                  id="area"
                  defaultValue={this.state.area}
                  options={options_area}
                  getOptionLabel={(options_area) => options_area.label}
                  onChange={this.listChange('area')}
                  style={{ width: "100%"}}
                  renderInput={(params) => <TextField {...params} label="Área" variant="standard" multiline={true} />}
                  />
                  <span className="red-text">{errors.area}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  id="ubicacion"
                  label="Ubicación"
                  defaultValue={this.state.ubicacion}
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
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      variant="dialog"
                      inputVariant="standard"
                      format="DD/MM/yyyy"
                      margin="normal"
                      multiline={true}
                      style={{
                        width: "100%"
                      }}
                      label="Fecha de compra"
                      value={this.state.fecha_compra}
                      onChange={this.dateChange('fecha_compra')}
                    />
                  </MuiPickersUtilsProvider> 
                  <span className="red-text">{errors.fecha_compra}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  id="valor"
                  label="Valor"
                  type="number"
                  defaultValue={this.state.valor}
                  onChange={this.handleChange('valor')}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: "100%"
                  }}>
                  </TextField>
                  <span className="red-text">{errors.valor}</span>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  id="dias_garantia"
                  label="Dias de garantía"
                  type="number"
                  defaultValue={this.state.dias_garantia}
                  onChange={this.handleChange('dias_garantia')}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: "100%"
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
                      width: "100%"
                    }}
                    label="Fin garantía"
                    value={this.state.fecha_fin_garantia}
                    onChange={this.dateChange('fecha_fin_garantia')}
                  />
                  </MuiPickersUtilsProvider> 
                  <span className="red-text">{errors.fecha_fin_garantia}</span>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" multiple id="customFile" 
                    name="imagenes" accept=".png, .jpeg, .jpg" 
                    onChange={this.uploadScreenshotFile} />{/*className="multiple-upload"}
                    <label className="custom-file-label" htmlFor="customFile" >
                      {this.state.imagenes.length===0 ? "Cargar imágenes" : this.state.imagenes.length + " archivos cargados"}
                    </label>
                  </div>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="dias_frec_mant_preventivo"
                    label="Frecuencia mantenimiento"
                    defaultValue={this.state.dias_frec_mant_preventivo}
                    onChange={this.handleChange('dias_frec_mant_preventivo')}
                    margin="normal"
                    variant="standard"
                    size="small"
                    multiline={true}
                    style={{
                      width: "100%"
                    }}>
                  </TextField>
                  <span className="red-text">{errors.dias_frec_mant_preventivo}</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="observacion"
                    label="Observaciones"
                    defaultValue={this.state.observacion}
                    onChange={this.handleChange('observacion')}
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
              </Grid>
              <br/>
              <Button variant="contained" onClick={this.onSubmit} color="primary">Siguiente</Button>
            </CardContent>
          </Card>
        </div>
      );
    }
}

AssetEdit.propTypes = {
    updateAsset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps)
  let id = ownProps.match.params.id;
  return {
    auth: state.auth,
      asset: state.assets.assets.data.find(asset => asset._id === id)
  }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { updateAsset }
)(AssetEdit));