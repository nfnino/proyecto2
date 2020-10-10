import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Button, TextField, Fab } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getTasks, editTask, addTask, nameTasks } from "../../actions/taskActions";

import Tasks from "./Tasks";

const useStyles = theme => ({
  root: {
    minWidth: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  input: {
    fontSize: 15
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
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.setState({search: false, activo:"", tipo_mant:"", descripcion:""})
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

    listChange = input => (e, obj) => {
      this.setState({[input]: obj.value});
    }

    render() {

      const { classes } = this.props;

      console.log(this.props)

        const { tasks, tasksLoading } = this.props.tasks;

        let options = [
          {value: "Correctivo", label: "Correctivo"},
          {value: "Preventivo", label: "Preventivo"},
        ]

        let dashboardContent;
        let botonAgregar;
        let busqueda;

        
        let res = null;
        if(tasks!=null) {
          res = Object.values(tasks);
        }

        if(this.props.auth.user.role === "Jefe de área") {
          botonAgregar = <Fab color="secondary" variant="extended" aria-label="add" href="/newTask">
                            <AddIcon />
                            Nueva
                          </Fab>
        } else {
          botonAgregar = <div></div>
        }

        busqueda=
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Grid container alignItems="center" direction="column" spacing={4}>
                  <Grid item xs={12}>
                    <br/>
                    <Typography variant="h5" color="secondary">BUSCAR ACTIVIDADES</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    id="activo"
                    label="Nombre del activo"
                    defaultValue={this.state.activo}
                    onChange={this.onChange}
                    variant="filled"
                    size="small"
                    multiline={true}
                    style={{
                      width: 300
                    }}>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                      <Autocomplete
                        id="tipo"
                        size="small"
                        defaultValue={this.state.tipo}
                        options={options}
                        getOptionLabel={(options) => options.label}
                        onChange={this.listChange('tipo_mant')}
                        style={{ width: 300}}
                        renderInput={(params) => <TextField {...params} label="Tipo de la actividad" variant="filled" multiline={true}/>}
                        />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                    id="descripcion"
                    label="Descripción"
                    defaultValue={this.state.descripcion}
                    onChange={this.onChange}
                    margin="normal"
                    variant="filled"
                    size="small"
                    multiline={true}
                    rows={3}
                    style={{
                      width: 300
                    }}>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" className={classes.input} size="large" color="secondary" style={{width: 150}} onClick={this.onSearch}> Buscar</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        if (res === null || tasksLoading) {
            dashboardContent = <p className="center-align">Loading...</p>;
          } else if (res.length > 0) {
            dashboardContent = <Tasks tasks={res} clear={this.clear}/>;
          } else {
            dashboardContent = <p className="center-align"> No hay actividades de mantenimiento </p>;
          }

        return (
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      {this.state.search ? dashboardContent : busqueda} 
                      <br/>
                      <Grid container justify="flex-end" spacing={2}>
                        <Grid item>
                          {botonAgregar}
                        </Grid>
                        <Grid item>
                          <Fab color="primary" variant="extended" aria-label="search" href="/report-Tasks">
                            <SearchIcon />
                            Reportes
                          </Fab>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
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