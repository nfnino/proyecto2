import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { addAsset } from "../../../actions/assetActions";

import Data from "./Data";
import AssetImage from "./AssetImage";
import AssetDocument from "./AssetDocument";
import Success from "./Success";

import { withStyles } from '@material-ui/core/styles';

/* import { TextField, Typography, Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'; */

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

class AssetForm extends Component {
  constructor() {
    super();
    this.state = {
      recinto: "",
      ubicacion: "",
      categoria: "",
      area: "",
      nombre: "",
      fecha_compra: new Date(),
      valor: "",
      dias_garantia: "",
      fecha_fin_garantia: new Date(),
      imagenes: [],
      manual: "",
      dias_frec_mant_preventivo: "",
      estado: "Creado",
      observacion: "",
      activo_reemp: "",
      errors: {},
      step:1,
      file: '',
      filename: 'Cargar imágenes',
      uploadedFile: {},
      manualname: 'Subir documento del manual'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
        step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({
        step: step - 1
    })
  }

  handleChange = input => e => {
    console.log("[IN] : ",input)
    console.log("[VAL] : ", e.target.value)
    this.setState({[input]: e.target.value});
  }

  listChange = input => (e, obj) => {
    console.log("[IN] : ",input)
    console.log("[VAL] : ", obj.value)
    this.setState({[input]: obj.value});
  }

  dateChange = input => e => {
    console.log("[IN] : ",input)
    console.log("[VAL] : ", e)
    this.setState({[input]: e});
  }

  fileChange = e => {
    console.log(e.target.files[0].name)
    this.setState({file: e.target.files[0]});
    this.setState({filename: e.target.files[0].name})
  }

  docChange = e => {
    console.log(e.target.files[0].name)
    this.setState({manual: e.target.files[0]});
    this.setState({manualname: e.target.files[0].name})
  }

  /* onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  catChange = (event, obj) => {
    if(obj) {
      this.setState({ categoria: obj.value})
    }
  }

  recChange = (event, obj) => {
    if(obj) {
      this.setState({ recinto: obj.value})
    }
  }

  areaChange = (event, obj) => {
    console.log("noice! smort!")
    if(obj) {
      this.setState({ area: obj.value})
    }
  }

  handleDateChange = (date) => {
    this.setState({fecha_compra: date})
  };

  handleDateChange2 = (date) => {
    this.setState({fecha_fin_garantia: date})
  }; */

 /*  uploadScreenshotFile = (event) => {
    let ims = []
    for(let size=0; size < event.target.files.length; size++){
      console.log('Selected file:', event.target.files[size]);
      console.log(event.target.files[size])
      let file = event.target.files[size];
      console.log("uploading screenshot file...");
      // Do necessary request to upload here.......
      ims.push(file)
    }
    console.log(ims)
    this.setState({imagenes: ims})
  } */

/* onSubmit = e => {
  e.preventDefault();
  const newAsset = {
    recinto: this.state.recinto,
    ubicacion: this.state.ubicacion,
    categoria: this.state.categoria,
    nombre: this.state.nombre,
    fecha_compra: this.state.fecha_compra,
    valor: this.state.valor,
    dias_garantia: this.state.dias_garantia,
    fecha_fin_garantia: this.state.fecha_fin_garantia,
    manual: this.state.manual,
    dias_frec_mant_preventivo: this.state.dias_frec_mant_preventivo,
    estado: this.state.estado,
    area: this.state.area,
    observacion: this.state.observacion,
    }; 
  this.props.addAsset(newAsset, this.props.history); 
}; */
  
render() {
    //const { classes } = this.props;
    //const { errors } = this.state;

    const { step } = this.state;
    const {recinto, ubicacion, categoria, nombre, fecha_compra, valor, dias_garantia, fecha_fin_garantia,
    dias_frec_mant_preventivo, estado, area, observacion, activo_reemp} = this.state;
    
    const values = {recinto, ubicacion, categoria, nombre, fecha_compra, valor, dias_garantia, fecha_fin_garantia,
      dias_frec_mant_preventivo, estado, area, observacion, activo_reemp}

    const {file, filename, uploadedFile, manual, manualname} = this.state;
    const values2 = {file, filename, manual, manualname, uploadedFile}; 
    
    switch(step) {
      case 1:
        return (
           <Data
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            listChange={this.listChange}
            dateChange={this.dateChange}
            values={values}
           />
        )
    case 2:
        return (
          <AssetImage
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            fileChange={this.fileChange}
            values={values2}
           />
        ) 
    case 3:
        return (
          <AssetDocument 
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            docChange={this.docChange}
            values={values2}
            data={values}
          />
        )
    case 4:
        return <Success 
                prevStep={this.prevStep}
                data={values}
              />
    }

    /* let options_rec = [
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
      {value: "Datos y telecomunicaciones", label: "Datos y telecomunicaciones"}
    ] */



/* return (
  <div>
      <Card container className={classes.root} variant="outlined">
      <Link to="/assets" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              assets
      </Link>
      <CardContent align="center">
          <Typography variant="h3" gutterBottom>Nuevo activo :</Typography>
          <br/>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
              id="recinto"
              defaultValue={this.state.recinto}
              options={options_rec}
              getOptionLabel={(options_rec) => options_rec.label}
              onChange={this.recChange}
              style={{ width: 350}}
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
              onChange={this.catChange}
              style={{ width: 350}}
              renderInput={(params) => <TextField {...params} label="Categoría" variant="standard" multiline={true} />}
              />
              <span className="red-text">{errors.categoria}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              id="nombre"
              label="Nombre"
              defaultValue={this.state.nombre}
              onChange={this.onChange}
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
              defaultValue={this.state.area}
              options={options_area}
              getOptionLabel={(options_area) => options_area.label}
              onChange={this.areaChange}
              style={{ width: 350}}
              renderInput={(params) => <TextField {...params} label="Área" variant="standard" multiline={true} />}
              />
              <span className="red-text">{errors.area}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              id="ubicacion"
              label="Ubicación"
              defaultValue={this.state.ubicacion}
              onChange={this.onChange}
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
                  value={this.state.fecha_compra}
                  onChange={this.handleDateChange}
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
              onChange={this.onChange}
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
              defaultValue={this.state.dias_garantia}
              onChange={this.onChange}
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
                value={this.state.fecha_fin_garantia}
                onChange={this.handleDateChange2}
              />
              </MuiPickersUtilsProvider> 
              <span className="red-text">{errors.fecha_fin_garantia}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="manual"
                label="Manual"
                defaultValue={this.state.manual}
                onChange={this.onChange}
                margin="normal"
                variant="standard"
                size="small"
                multiline={true}
                style={{
                  width: 350
                }}>
              </TextField>
              <span className="red-text">{errors.manual}</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="dias_frec_mant_preventivo"
                label="Frecuencia mantenimiento"
                defaultValue={this.state.dias_frec_mant_preventivo}
                onChange={this.onChange}
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
                defaultValue={this.state.observacion}
                onChange={this.onChange}
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
        </CardContent>
        <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
          Crear
        </Button>
      </Card>
      </div>
    ); */
  }
}

AssetForm.propTypes = {
    /* addAsset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired */
};

const mapStateToProps = state => ({
    //errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(AssetForm));