import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { addLocal } from "../../../actions/routines/localActions";

import { TextField, Typography, Grid, Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

class NewLocal extends Component {
  constructor() {
    super();
    this.state = {
        fecha: new Date(),
        ejecutor: "",
        supervisor: "",
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

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  supervisorChange(supervisor) {
    this.setState({
      supervisor: supervisor.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
        supervisor: this.state.supervisor,
    };
    this.props.addLocal(nueva, this.props.history)
  };
  
render() {
  const { classes } = this.props;
  const { errors } = this.state;
  const { users } = this.props.users;

//------------------------------ Ejecutor y supervisor dropdown ---------------------------------------
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
    if (temp.type === "Jefe de área") {
      options_supervisor.push(temp)
    }
  }
} 

return (
  <div>
      <Card container className={classes.root} variant="outlined">
          <Link to="/locales" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" color="primary" gutterBottom>Iniciar nueva rutina de baños :</Typography>
              <br/>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
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
          </CardContent>
          <br/>
          <Button className={classes.pos} onClick={this.onSubmit} variant="contained" color="primary" size="large">
            Crear
          </Button>
          <br/>
      </Card>
  </div>
    );
  }
}

NewLocal.propTypes = {
    getUsers: PropTypes.func.isRequired,
    addLocal: PropTypes.func.isRequired,
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
    { getUsers, addLocal }
)(NewLocal));