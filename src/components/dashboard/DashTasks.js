import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Grid, InputLabel, Button, OutlinedInput, Divider } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getTasks, editTask, addTask, nameTasks } from "../../actions/taskActions";

import Tasks from "./Tasks";

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

class DashTasks extends Component {

  constructor(){
    super();

    this.state={
        search: false,
          activo: "",
          tipo_mant: "",
          descripcion:""
    };
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  onSearch = e => {
    const searchInfo = {
      activo: this.state.activo,
      tipo: this.state.tipo_mant,
      descripcion: this.state.descripcion
    };
    this.setState({search: true});
    this.props.nameTasks(searchInfo, this.props.history)
  }

    componentDidMount() {
        this.props.getTasks();
    }

    render() {

      const { classes } = this.props;

      console.log(this.props)

        const { tasks, tasksLoading } = this.props.tasks;

        console.log(tasks)

        let dashboardContent;
        let botonAgregar;
        let busqueda;

        const res = Object.values(tasks);

        if(this.props.auth.user.role === "Jefe de área") {
          botonAgregar = <Link to="/newTask" className="btn-flat waves-effect">
                            <i className="material-icons left">add</i> Nueva
                        </Link>
        } else {
          botonAgregar = <div></div>
        }

        busqueda=
        <Grid container>
          <Grid item xs={8}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Grid container alignItems="center" direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <Typography className={classes.title} color="primary">Buscar actividades</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="activ">Activo</InputLabel>
                      <OutlinedInput id="activo" type="text" onChange={this.onChange} multiline/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="tipo">Tipo</InputLabel>
                      <OutlinedInput id="tipo_mant" type="text" onChange={this.onChange} multiline/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="descripcion">Descripción</InputLabel>
                      <OutlinedInput id="descripcion" type="text" onChange={this.onChange} multiline/>
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

        if (res === null || tasksLoading) {
            dashboardContent = <p className="center-align">Loading...</p>;
          } else if (res.length > 0) {
            dashboardContent = <Tasks tasks={res}/>;
          } else {
            dashboardContent = <p className="center-align"> No hay actividades de mantenimiento </p>;
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

DashTasks.propTypes = {
    getTasks: PropTypes.func.isRequired,
    nameTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tasks: state.tasks,
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {getTasks, nameTasks, editTask, addTask }
) (DashTasks));