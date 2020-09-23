import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../../actions/taskActions";

import { getAssets } from "../../actions/assetActions";
import { getUsers } from "../../actions/userActions";

import { TextField, Typography, Grid, Divider, Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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

class TaskForm extends Component {
  constructor() {
    super();
    this.state = {
      activo: "",
      tipo_mant: "",
      fecha_inicial_tent: new Date(),
      fecha_final_tent: new Date(),
      imagen_antes_mant: "",
      desc_falla:"",
      email_compras:"",
      desc_materiales_compras: "",
      ejecutor_interno:"",
      supervisor:"",
      nit_empresa_externa: "",
      nombre_empresa_externa: "",
      doc_orden_compra: "",
      valor_externo: "",
      fecha_inicial_real: "",
      fecha_final_real: "",
      estado:"Creada",
      responsable:"interno",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getAssets();
    this.props.getUsers();
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

  handleSwitch = e => {
    this.setState({responsable: e.target.value})
  }

  handleIniDateChange = (date) => {
    this.setState({fecha_inicial_tent: date})
  };

  handleEndDateChange = (date) => {
    this.setState({fecha_final_tent: date})
  };

  activoChange(activo) {
    console.log("activo: ", activo)
    this.setState({
      activo: activo.value
    });
  }

  tipoChange(v) {
    console.log(v)
    this.setState({
      tipo_mant: v.value
    })
  }

  ejecutorChange(ejecutor) {
    this.setState({
      ejecutor_interno: ejecutor.value
    })
  }

  supervisorChange(supervisor) {
    this.setState({
      supervisor: supervisor.value
    })
  }

  onSubmit = e => {
      e.preventDefault();

  const newTask = {
      activo: this.state.activo,
      tipo_mant: this.state.tipo_mant,
      fecha_inicial_tent: this.state.fecha_inicial_tent,
      fecha_final_tent: this.state.fecha_final_tent,
      imagen1_antes_mant: this.state.imagen1_antes_mant,
      desc_falla: this.state.desc_falla,
      email_compras: this.state.email_compras,
      desc_materiales_compras: this.state.desc_materiales_compras,
      ejecutor_interno: this.state.ejecutor_interno,
      supervisor: this.state.supervisor,
      nit_empresa_externa: this.state.nit_empresa_externa,
      nombre_empresa_externa: this.state.nombre_empresa_externa,
      doc_orden_compra: this.state.doc_orden_compra,
      valor_externo: this.state.valor_externo,
      fecha_inicial_real: this.state.fecha_inicial_real,
      fecha_final_real: this.state.fecha_final_real,
      responsable: this.state.responsable,
      estado: this.state.estado,
      usuario: this.props.auth.user.name,
      user_id: this.props.auth.user.id
      };
      this.props.addTask(newTask, this.props.history); 
  };
  
render() {
  const { classes } = this.props;
  const { assets } = this.props.assets;
  const { users } = this.props.users;
  const { errors } = this.state;
  const usuario_actual = this.props.auth.user;


//------------------------------ Activos dropdown ---------------------------------------
let options = []

if( assets.length !== 0) {

  let activos = Object.values(assets.data)

  let todos = activos.map(asset => ({
    value: asset.nombre,
    label: asset.nombre,
    area: asset.area
  }))

  for(let i=0; i<todos.length; i++) {
    if(todos[i].area===usuario_actual.area) {
      options.push(todos[i]);
    }
  }
}
//------------------------------------------------------------------------------------------//

//------------------------------ Ejecutor y supervisor dropdown ---------------------------------------
let options_ejecutor = []
let options_supervisor = []

if( users.length !== 0) {

  let usuarios = Object.values(users.data)

  let nuevo = usuarios.map(user => ({
        value: user.name,
        label: user.name,
        type: user.role
  }))

  for (let i = 0; i < nuevo.length; i++) {
    let temp = nuevo[i]
    if (temp.type === "Operario") {
      options_ejecutor.push(temp)
    }
    if (temp.type === "Jefe de área") {
      options_supervisor.push(temp)
    }
  }

  } 
  
//------------------------------------------------------------------------------------------//

//------------------------------ Tipo activo dropdown ---------------------------------------
let options_t = [
  {value: "Correctivo", label: "Correctivo"},
  {value: "Preventivo", label: "Preventivo"},
]
//------------------------------------------------------------------------------------------//

//----------------------------- Responsable de la tarea ------------------------------------//
let resp_int =  
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
                      <Autocomplete
                      id="ejecutor_interno"
                      defaultValue={this.state.ejecutor_interno}
                      options={options_ejecutor}
                      getOptionLabel={(options_ejecutor) => options_ejecutor.label}
                      onChange={(event, value) => this.ejecutorChange(value)}
                      style={{ width: 350}}
                      renderInput={(params) => <TextField {...params} label="Ejecutor interno" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.ejecutor_interno}</span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Autocomplete
                      id="supervisor"
                      defaultValue={this.state.supervisor}
                      options={options_supervisor}
                      getOptionLabel={(options_supervisor) => options_supervisor.label}
                      onChange={(event, value) => this.supervisorChange(value)}
                      style={{ width: 350}}
                      renderInput={(params) => <TextField {...params} label="Supervisor" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.supervisor}</span>
                  </Grid>
</Grid>

let resp_ext = 
            <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Autocomplete
                  id="ejecutor_interno"
                  defaultValue={this.state.ejecutor_interno}
                  options={options_ejecutor}
                  getOptionLabel={(options_ejecutor) => options_ejecutor.label}
                  onChange={(event, value) => this.ejecutorChange(value)}
                  style={{ width: 740}}
                  renderInput={(params) => <TextField {...params} label="Supervisor interno" variant="standard" multiline={true}/>}
                  />
                  <span className="red-text">{errors.ejecutor_interno}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  id="nit_empresa_externa"
                  label="Nit Empresa"
                  defaultValue={this.state.nit_empresa_externa}
                  onChange={this.onChange}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: 350
                  }}>
                  </TextField>
                  <span className="red-text">{errors.nit_empresa_externa}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  id="nombre_empresa_externa"
                  label="Nombre Empresa"
                  defaultValue={this.state.nombre_empresa_externa}
                  onChange={this.onChange}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: 350
                  }}>
                  </TextField>
                  <span className="red-text">{errors.nombre_empresa_externa}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  id="doc_orden_compra"
                  label="Documento orden de compra"
                  defaultValue={this.state.doc_orden_compra}
                  onChange={this.onChange}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: 350
                  }}>
                  </TextField>
                  <span className="red-text">{errors.doc_orden_compra}</span>
              </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  id="valor_externo"
                  label="Valor externo"
                  defaultValue={this.state.valor_externo}
                  onChange={this.onChange}
                  margin="normal"
                  variant="standard"
                  size="small"
                  multiline={true}
                  style={{
                    width: 350
                  }}>
                  </TextField>
                  <span className="red-text">{errors.valor_externo}</span>
              </Grid>
            </Grid>
//------------------------------------------------------------------------------------------//

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <Link to="/tasks" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              tasks
          </Link>
          <CardContent align="center">
              <Typography variant="h4" gutterBottom>Nueva tarea :</Typography>
              <br/>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                      <Autocomplete
                      id="activo"
                      defaultValue={this.state.activo}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={(event, value) => this.activoChange(value)}
                      style={{ width: 350}}
                      renderInput={(params) => <TextField {...params} label="Activo" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.activo}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Autocomplete
                      id="tipo_mant"
                      defaultValue={this.state.tipo_mant}
                      options={options_t}
                      getOptionLabel={(options_t) => options_t.label}
                      onChange={(event, value)=>this.tipoChange(value)}
                      style={{ width: 350}}
                      renderInput={(params) => <TextField {...params} label="Tipo mantenimiento" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.tipo_mant}</span>
                  </Grid>
                  <Grid item xs={12} md={6}> 
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
                          label="Fecha Inicio (Tentativa)"
                          value={this.state.fecha_inicial_tent}
                          onChange={this.handleIniDateChange}
                        />
                      </MuiPickersUtilsProvider> 
                      <span className="red-text">{errors.fecha_inicial_tent}</span>
                  </Grid>
                  <Grid item xs={12} md={6}> 
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
                          label="Fecha Fin (Tentativa)"
                          value={this.state.fecha_final_tent}
                          onChange={this.handleEndDateChange}
                        />
                      </MuiPickersUtilsProvider> 
                      <span className="red-text">{errors.fecha_final_tent}</span>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                      id="desc_falla"
                      label="Descripción falla"
                      defaultValue={this.state.desc_falla}
                      onChange={this.onChange}
                      margin="normal"
                      variant="standard"
                      size="small"
                      multiline={true}
                      style={{
                        width: 740
                      }}>
                      </TextField>
                      <span className="red-text">{errors.desc_falla}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <TextField
                      id="email_compras"
                      label="Email compras"
                      defaultValue={this.state.email_compras}
                      onChange={this.onChange}
                      margin="normal"
                      variant="standard"
                      size="small"
                      multiline={true}
                      style={{
                        width: 350
                      }}>
                      </TextField>
                      <span className="red-text">{errors.email_compras}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <TextField
                      id="desc_materiales_compras"
                      label="Descripción materiales compra"
                      defaultValue={this.state.desc_materiales_compras}
                      onChange={this.onChange}
                      margin="normal"
                      variant="standard"
                      size="small"
                      multiline={true}
                      style={{
                        width: 350
                      }}>
                      </TextField>
                      <span className="red-text">{errors.desc_materiales_compras}</span>
                  </Grid>
                  <Grid item xs={12}>
                  <Divider variant="middle"/>
                  <br/>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Responsable de la tarea</FormLabel>
                      <RadioGroup row="1" aria-label="responsable" name="responsable" value={this.state.externo} onChange={this.handleSwitch}>
                        <FormControlLabel value="interno" control={<Radio color="primary"/>} label="Interno" />
                        <FormControlLabel value="externo" control={<Radio color="primary"/>} label="Externo" />
                      </RadioGroup>
                    </FormControl>    
                  </Grid>
              </Grid>
              {this.state.responsable==='interno' ? resp_int : resp_ext}
          </CardContent>
          <br/>
          <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
            Crear
          </Button>
      </Card>
  </div>
/*       <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/tasks" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              tasks
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Nueva </b> Actividad de Mantenimiento :
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                    <pre>Activo: "{this.state.activo}"</pre>
                    <AsyncSelect
                      value={this.state.activo}
                      defaultOptions={options}
                      onChange={this.activoChange}/>
            
                <span className="red-text">{errors.activo}</span> 
              </div>
              <div className="input-field col s12">
                <pre>Tipo de mantenimiento: "{this.state.tipo_mant}"</pre>
                    <AsyncSelect
                      value={this.state.tipo_mant}
                      defaultOptions={options_t}
                      onChange={this.tipoChange}/>
                      <span className="red-text">{errors.tipo_mant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.fecha_inicial_tent}
                  error={errors.fecha_inicial_tent}
                  id="fecha_inicial_tent"
                  type="date"
                  className={classnames("", {
                    invalid: errors.fecha_inicial_tent
                  })}
                />
                <label htmlFor="fecha_inicial_tent">Inicio tentativo</label>
                <span className="red-text">{errors.fecha_inicial_tent}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.fecha_final_tent}
                  error={errors.fecha_final_tent}
                  id="fecha_final_tent"
                  type="date"
                  className={classnames("", {
                    invalid: errors.fecha_final_tent
                  })}
                />
                <label htmlFor="fecha_final_tent">Finalizacion tentativa</label>
                <span className="red-text">{errors.fecha_final_tent}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.imagen1_antes_mant}
                  error={errors.imagen1_antes_mant}
                  id="imagen1_antes_mant"
                  type="text"
                  className={classnames("", {
                    invalid: errors.imagen1_antes_mant
                  })}
                />
                <label htmlFor="imagen1_antes_mant">Imagen antes 1</label>
                <span className="red-text">{errors.imagen1_antes_mant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.imagen2_antes_mant}
                  error={errors.imagen2_antes_mant}
                  id="imagen2_antes_mant"
                  type="text"
                  className={classnames("", {
                    invalid: errors.imagen2_antes_mant
                  })}
                />
                <label htmlFor="imagen2_antes_mant">Imagen antes 2</label>
                <span className="red-text">{errors.imagen2_antes_mant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.imagen3_antes_mant}
                  error={errors.imagen3_antes_mant}
                  id="imagen3_antes_mant"
                  type="text"
                  className={classnames("", {
                    invalid: errors.imagen3_antes_mant
                  })}
                />
                <label htmlFor="imagen3_antes_mant">Imagen antes 3</label>
                <span className="red-text">{errors.imagen3_antes_mant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.imagen4_antes_mant}
                  error={errors.imagen4_antes_mant}
                  id="imagen4_antes_mant"
                  type="text"
                  className={classnames("", {
                    invalid: errors.imagen4_antes_mant
                  })}
                />
                <label htmlFor="imagen4_antes_mant">Imagen antes 4</label>
                <span className="red-text">{errors.imagen4_antes_mant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.imagen5_antes_mant}
                  error={errors.imagen5_antes_mant}
                  id="imagen5_antes_mant"
                  type="text"
                  className={classnames("", {
                    invalid: errors.imagen5_antes_mant
                  })}
                />
                <label htmlFor="imagen5_antes_mant">Imagen antes 5</label>
                <span className="red-text">{errors.imagen5_antes_mant}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.desc_falla}
                  error={errors.desc_falla}
                  id="desc_falla"
                  type="text"
                  className={classnames("", {
                    invalid: errors.desc_falla
                  })}
                />
                <label htmlFor="desc_falla">Descripción falla</label>
                <span className="red-text">{errors.desc_falla}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email_compras}
                  error={errors.email_compras}
                  id="email_compras"
                  type="text"
                  className={classnames("", {
                    invalid: errors.email_compras
                  })}
                />
                <label htmlFor="email_compras">Email compras</label>
                <span className="red-text">{errors.email_compras}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.desc_materiales_compras}
                  error={errors.desc_materiales_compras}
                  id="desc_materiales_compras"
                  type="text"
                  className={classnames("", {
                    invalid: errors.desc_materiales_compras
                  })}
                />
                <label htmlFor="desc_materiales_compras">Descripción materiales compras</label>
                <span className="red-text">{errors.desc_materiales_compras}</span>
              </div>
              <div className="input-field col s12">
                <pre>Ejecutor interno: "{this.state.ejecutor_interno}"</pre>
                    <AsyncSelect
                      value={this.state.ejecutor_interno}
                      defaultOptions={options_ejecutor}
                      onChange={this.ejecutorChange}/>
              </div>
              <div className="input-field col s12">
                <pre>Supervisor: "{this.state.supervisor}"</pre>
                    <AsyncSelect
                      value={this.state.supervisor}
                      defaultOptions={options_supervisor}
                      onChange={this.supervisorChange}/>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.nit_empresa_externa}
                  error={errors.nit_empresa_externa}
                  id="nit_empresa_externa"
                  type="text"
                  className={classnames("", {
                    invalid: errors.nit_empresa_externa
                  })}
                />
                <label htmlFor="nit_empresa_externa">NIT empresa</label>
                <span className="red-text">{errors.nit_empresa_externa}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.nombre_empresa_externa}
                  error={errors.nombre_empresa_externa}
                  id="nombre_empresa_externa"
                  type="text"
                  className={classnames("", {
                    invalid: errors.nombre_empresa_externa
                  })}
                />
                <label htmlFor="nombre_empresa_externa">Nombre empresa</label>
                <span className="red-text">{errors.nombre_empresa_externa}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.doc_orden_compra}
                  error={errors.doc_orden_compra}
                  id="doc_orden_compra"
                  type="text"
                  className={classnames("", {
                    invalid: errors.doc_orden_compra
                  })}
                />
                <label htmlFor="doc_orden_compra">Documento orden compra</label>
                <span className="red-text">{errors.doc_orden_compra}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.valor_externo}
                  error={errors.valor_externo}
                  id="valor_externo"
                  type="text"
                  className={classnames("", {
                    invalid: errors.valor_externo
                  })}
                />
                <label htmlFor="valor_externo">Valor monto externo</label>
                <span className="red-text">{errors.valor_externo}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */
    );
  }
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
    getAssets: PropTypes.func.isRequired,
    assets: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  assets: state.assets,
  users: state.users,
  auth: state.auth,
  errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getAssets, getUsers, addTask }
)(TaskForm));