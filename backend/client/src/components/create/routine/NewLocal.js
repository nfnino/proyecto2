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
    width: 600,
    minWidth: 300
  },
  pos: {
    left: "37%",
    width: 170,
    marginBottom: 20
  },
});

class NewLocal extends Component {
  constructor() {
    super();
    this.state = {
        fecha: new Date(),
        ejecutor: "",
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


  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
    };
    this.props.addLocal(nueva, this.props.history)
  };
  
render() {
  const { classes } = this.props;
  const { errors } = this.state;

return (
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12}>
      <Card container className={classes.root} variant="elevated">
          <Link to="/locales" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Iniciar nueva rutina locales :</Typography>
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