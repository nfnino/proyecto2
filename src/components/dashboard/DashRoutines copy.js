import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Grid, InputLabel, Button, OutlinedInput } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getRoutines, updateRoutine, addRoutine, nameRoutines } from "../../actions/routineActions";

import Routines from "./Routines";

const useStyles = theme => ({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

class DashRoutines extends Component {

  constructor(){
    super();

    this.state={
        search: false,
        ejecutor: "",
        supervisor: "",
        estado: ""
    };
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

    componentDidMount() {
        this.props.getRoutines();
    }

    onSearch = e => {
      const searchInfo = {
        ejecutor: this.state.ejecutor,
        supervisor: this.state.supervisor,
        estado: this.state.estado
      };
      this.setState({search: true})
      this.props.nameRoutines(searchInfo, this.props.history)
    }

    render() {

        const { classes } = this.props;

        const { routines, routinesLoading } = this.props.routines;

        let dashboardContent;
        let botonAgregar;
        let busqueda;

        const res = Object.values(routines);

        if(this.props.auth.user.role === "Jefe de área") {
          botonAgregar = <Link to="/newRoutine" className="btn-flat waves-effect">
                            <i className="material-icons left">add</i> Nueva
                          </Link>
        } else {
          botonAgregar = <div></div>
        }

        busqueda = 
        <Grid container>
          <Grid item xs={8}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Grid container alignItems="center" direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.title} color="primary">Buscar rutinas</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="ejecutor">Ejecutor</InputLabel>
                      <OutlinedInput id="ejecutor" type="text" onChange={this.onChange} multiline/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="supervisor">Supervisor</InputLabel>
                      <OutlinedInput id="supervisor" type="text" onChange={this.onChange} multiline/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="estado">Estado</InputLabel>
                      <OutlinedInput id="estado" type="text" onChange={this.onChange} multiline/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={this.onSearch}> Buscar</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        if (res === null || routinesLoading) {
            dashboardContent = <p className="center-align">Loading...</p>;
          } else if (res.length > 0) {
            dashboardContent = <Routines routines={res}/>;
          } else {
            dashboardContent = <p className="center-align"> No hay rutinas </p>;
          }

        return (
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Card>
                  <CardContent>
                    {this.state.search ? dashboardContent : busqueda}
                    <br/>
                    <Grid item xs={12}>
                      {botonAgregar}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>  
            </Grid>
          </Grid>
        )
    }
}

DashRoutines.propTypes = {
    getRoutines: PropTypes.func.isRequired,
    nameRoutines: PropTypes.func.isRequired,
    routines: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    routines: state.routines,
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {getRoutines , updateRoutine, addRoutine, nameRoutines}
) (DashRoutines));