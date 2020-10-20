import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsers } from "../../../actions/userActions";
import { addFachada } from "../../../actions/routines/fachadaActions";

import { Typography, Grid, Button, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

class NewFachada extends Component {
  constructor() {
    super();
    this.state = {
        fecha: new Date(),
        ejecutor: "",
        observacion: "",
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

  onSubmit = e => {
    e.preventDefault();
    const nueva = {
        fecha: this.state.fecha,
        ejecutor: this.props.auth.user.name,
    };
    this.props.addFachada(nueva, this.props.history)
  };
  
render() {
  const { classes } = this.props;

return (
  <Grid container direction="column" alignItems="center">
    <Grid item xs={12}>
      <Card container className={classes.root} variant="elevated">
          <Link to="/fachadas" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
          <CardContent align="center">
              <Typography variant="h4" style={{color:"#F59C00"}} gutterBottom>Nueva rutina de fachada :</Typography>
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

NewFachada.propTypes = {
    addFachada: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { addFachada }
)(NewFachada));