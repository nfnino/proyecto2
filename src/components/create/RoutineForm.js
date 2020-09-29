import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Typography, Grid, Button } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

class RoutineForm extends Component {

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

  onClick(tipo) {
    let path = `/new${tipo}`;
    this.props.history.push(path);
  }
  
render() {
    const { classes } = this.props;

return (
  <div>
    <Card container className={classes.root} variant="outlined">
      <Link to="/routines" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Rutinas
      </Link>
      <CardContent align="center">
        <Typography variant="h3" gutterBottom>Nueva rutina de disponibilidad :</Typography>
        <br/>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Button onClick={this.onClick("vip")}> VIP's </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("RutLocales")}> Locales </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("Bath")}> Baños </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("Parking")}> Parking </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("Silleteria")}> Silletería </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("Fachada")}> Fachada </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("Pantalla")}> Pantalla </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.onClick("rci")}> Gabinetes RCI </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </div>
    );
  }
}

RoutineForm.propTypes = {
    
};

const mapStateToProps = state => ({
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(RoutineForm));