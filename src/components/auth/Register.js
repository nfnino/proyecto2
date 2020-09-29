import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import { TextField, Typography, Grid, Button, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
    minWidth: 280,
    maxWidth: 600,
  },
  pos: {
    left: "35%",
    width: 170,
    marginBottom: 20,
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      documento: "",
      email: "",
      password: "",
      password2: "",
      role: "",
      area: "",
      errors: {}
    };
  }

  /* componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  } */

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ 
      [e.target.id]: e.target.value 
    });
  };

  roleChange = role => {
    this.setState({
      role: role.value
    });
  };

  areaChange = area => {
    this.setState({
      area: area.value
    });
  };

onSubmit = e => {
    e.preventDefault();

const newUser = {
      name: this.state.name,
      documento: this.state.documento,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role,
      area: this.state.area,
      user_id: this.props.auth.user.id,
      user_name: this.props.auth.user.name
    };
    this.props.registerUser(newUser, this.props.history); 
};
  
render() {
    const { classes } = this.props; 
    const { errors } = this.state;

    const options = [
      { label: "Superusuario", value: "Superusuario", },
      { label: "Contador",     value: "Contador", },
      { label: "Operario",     value: "Operario",  },
      { label: "Jefe de área", value: "Jefe de área" },
      { label: "Gerente de área", value: "Gerente de área"}
    ];
  
    const options_area = [
      { label: "Operaciones", value:"Operaciones"},
      { label: "Área 2", value:"Área 2"},
      { label: "Área 3", value:"Área 3"}
    ]

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <Link to="/users" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Usuarios
          </Link>
          <CardContent align="center">
              <Typography variant="h4" color="primary" gutterBottom>Nuevo usuario :</Typography>
              <br/>
              <Grid container spacing={1}>
                  <Grid item xs={12}>
                      <TextField
                      id="name"
                      required="true"
                      label="Nombre completo"
                      defaultValue={this.state.name}
                      onChange={this.onChange}
                      margin="normal"
                      variant="standard"
                      size="small"
                      multiline={true}
                      style={{
                        width: "60%"
                      }}>
                      </TextField>
                  </Grid>
                  <Grid item xs={12}><span className="red-text">{errors.name}</span></Grid>
                  <Grid item xs={12}>
                      <TextField
                      id="documento"
                      required="true"
                      label="Documento de identidad"
                      defaultValue={this.state.documento}
                      onChange={this.onChange}
                      margin="normal"
                      variant="standard"
                      size="small"
                      multiline={true}
                      style={{
                        width: "60%"
                      }}>
                      </TextField>
                  </Grid>
                  <Grid item xs={12}><span className="red-text">{errors.documento}</span></Grid>
                  <Grid item xs={12}>
                      <TextField
                      id="email"
                      required="true"
                      label="Correo electrónico"
                      defaultValue={this.state.email}
                      onChange={this.onChange}
                      margin="normal"
                      variant="standard"
                      size="small"
                      multiline={true}
                      style={{
                        width: "60%"
                      }}>
                      </TextField>
                  </Grid>
                  <Grid item xs={12}><span className="red-text">{errors.email}</span></Grid>
                  <Grid item xs={12} >
                      <Autocomplete
                      id="role"
                      defaultValue={this.state.role}
                      options={options}
                      getOptionLabel={(options) => options.label}
                      onChange={(event, value) => this.roleChange(value)}
                      style={{ width: "60%"}}
                      renderInput={(params) => <TextField {...params} label="Rol" required="true" variant="standard" multiline={true}/>}
                      />
                  </Grid>
                  <Grid item xs={12}><span className="red-text">{errors.role}</span></Grid>
                  {this.state.role==="Jefe de área"||this.state.role==="Gerente de área"?
                  <Grid item xs={12}>
                      <Autocomplete
                      id="area"
                      defaultValue={this.state.area}
                      options={options_area}
                      getOptionLabel={(options_area) => options_area.label}
                      onChange={(event, value)=>this.areaChange(value)}
                      style={{ width: "60%"}}
                      renderInput={(params) => <TextField {...params} label="Área" variant="standard" multiline={true}/>}
                      />
                  </Grid>:null}
                  <Grid item xs={12}><span className="red-text">{errors.area}</span></Grid>
                  <Grid item xs={12}>
                      <TextField
                      type='password'
                      id="password"
                      required="true"
                      label="Contraseña"
                      defaultValue={this.state.password}
                      onChange={this.onChange}
                      margin="normal"
                      variant="outlined"
                      size="small"
                      style={{
                        width: "60%"
                      }}>
                      </TextField>
                  </Grid>
                  <Grid item xs={12}><span className="red-text">{errors.password}</span></Grid>
                  <Grid item xs={12}>
                      <TextField
                      type='password'
                      id="password2"
                      required="true"
                      label="Repetir contraseña"
                      defaultValue={this.state.password2}
                      onChange={this.onChange}
                      margin="normal"
                      variant="outlined"
                      size="small"
                      style={{
                        width: "60%"
                      }}>
                      </TextField>
                  </Grid>
                  <Grid item xs={12}><span className="red-text">{errors.password2}</span></Grid>
              </Grid>
          </CardContent>
          <br/>
          <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
            Crear
          </Button>
      </Card>
   </div> /*
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/users" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Usuarios
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Agregar</b> usuario
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.documento}
                  error={errors.documento}
                  id="documento"
                  type="text"
                  className={classnames("", {
                    invalid: errors.documento
                  })}
                />
                <label htmlFor="documento">Número de documento</label>
                <span className="red-text">{errors.documento}</span>
              </div>
              <div className="input-field col s12">
                <pre>Rol: "{this.state.role}"</pre>
                    <AsyncSelect
                      value={this.state.role}
                      defaultOptions={options}
                      onChange={this.roleChange}/>
                <span className="red-text">{errors.role}</span>
              </div>
              <div className="input-field col s12">
                <pre>Área: "{this.state.area}"</pre>
                    <AsyncSelect
                      value={this.state.area}
                      defaultOptions={options_area}
                      onChange={this.areaChange}/>
                <span className="red-text">{errors.area}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
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
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  </div> */
    );
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { registerUser }
    )(withRouter(Register))
);