import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

import { getAssets } from "../../../actions/assetActions";
import { getUsers } from "../../../actions/userActions";

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

const useStyles = theme => ({
  root: {
    maxWidth: 800,
    minWidth: 300
  },
  pos: {
    left: "40%",
    marginBottom: 12,
    width: 150,
  },
  title: {
    fontSize: 24
  }
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
    this.props.getUsers();
  }

    continue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
  
render() {
    const { classes} = this.props;
    const { assets } = this.props.assets;
    const { users } = this.props.users;
    const { errors } = this.props;
    const usuario_actual = this.props.auth.user;


    const { values, handleChange, listChange, dateChange, handleSwitch } = this.props;

    //------------------------------ Activos dropdown ---------------------------------------
let options = []

if( assets != null && assets.length !== 0) {

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

if( users!=null && users.length !== 0) {

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

let resp_int =  
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
                      <Autocomplete
                      id="ejecutor_interno"
                      defaultValue={values.ejecutor_interno}
                      options={options_ejecutor}
                      getOptionLabel={(options_ejecutor) => options_ejecutor.label}
                      onChange={listChange('ejecutor_interno')}
                      style={{ width: 350}}
                      renderInput={(params) => <TextField {...params} label="Ejecutor interno" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.ejecutor_interno}</span>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Autocomplete
                      id="supervisor"
                      defaultValue={values.supervisor}
                      options={options_supervisor}
                      getOptionLabel={(options_supervisor) => options_supervisor.label}
                      onChange={listChange('supervisor')}
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
                  defaultValue={values.ejecutor_interno}
                  options={options_ejecutor}
                  getOptionLabel={(options_ejecutor) => options_ejecutor.label}
                  onChange={listChange('ejecutor_interno')}
                  style={{ width: 740}}
                  renderInput={(params) => <TextField {...params} label="Supervisor interno" variant="standard" multiline={true}/>}
                  />
                  <span className="red-text">{errors.ejecutor_interno}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  id="nombre_empresa_externa"
                  label="Nombre Empresa"
                  defaultValue={values.nombre_empresa_externa}
                  onChange={handleChange('nombre_empresa_externa')}
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
                  id="valor_externo"
                  label="Valor externo"
                  defaultValue={values.valor_externo}
                  onChange={handleChange('valor_externo')}
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
                      defaultValue={values.activo}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={listChange('activo')}
                      style={{ width: 350}}
                      renderInput={(params) => <TextField {...params} label="Activo" variant="standard" multiline={true}/>}
                      />
                      <span className="red-text">{errors.activo}</span>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Autocomplete
                      id="tipo_mant"
                      defaultValue={values.tipo_mant}
                      options={options_t}
                      getOptionLabel={(options_t) => options_t.label}
                      onChange={listChange('tipo_mant')}
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
                          value={values.fecha_inicial_tent}
                          onChange={dateChange('fecha_inicial_tent')}
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
                          value={values.fecha_final_tent}
                          onChange={dateChange('fecha_final_tent')}
                        />
                      </MuiPickersUtilsProvider> 
                      <span className="red-text">{errors.fecha_final_tent}</span>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                      id="desc_falla"
                      label="Descripción Actividad"
                      defaultValue={values.desc_falla}
                      onChange={handleChange('desc_falla')}
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
                      defaultValue={values.email_compras}
                      onChange={handleChange('email_compras')}
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
                      defaultValue={values.desc_materiales_compras}
                      onChange={handleChange('desc_materiales_compras')}
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
                      <RadioGroup row="1" aria-label="responsable" name="responsable" value={values.externo} onChange={handleSwitch}>
                        <FormControlLabel value="interno" control={<Radio color="primary"/>} label="Interno" />
                        <FormControlLabel value="externo" control={<Radio color="primary"/>} label="Externo" />
                      </RadioGroup>
                    </FormControl>    
                  </Grid>
              </Grid>
              {values.responsable==='interno' ? resp_int : resp_ext}
          </CardContent>
          <br/>
          <Button className={classes.pos} onClick={this.continue} variant="contained" color="secondary" size="large">
            Siguiente
          </Button>
      </Card>
      </div>
    );
  }
}

Data.propTypes = {
    errors: PropTypes.object.isRequired,
    assets: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    assets: state.assets,
    users: state.users,
    auth: state.auth,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getAssets, getUsers }
)(Data));