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

import { getAssets, addAsset, nameAssets } from "../../actions/assetActions";

import Assets from "./Assets";

const useStyles = theme => ({
  root: {
    minWidth: 250,
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

class DashAssets extends Component {

    constructor(){
      super();

      this.state={
          search: false,
          categoria: "",
          area: ""
      };
    }

    componentDidMount() {
        this.props.getAssets();
    }

    onSearch = e => {
      const searchInfo = {
        categoria: this.state.categoria,
        area: this.state.area
      };
      this.setState({search: true});
      this.props.nameAssets(searchInfo, this.props.history)
    }

    onChange = e => {
      this.setState({[e.target.id]: e.target.value})
    }

    render() {

      const { classes } = this.props;

        const { assets, assetsLoading } = this.props.assets;

        let botonAgregar;
        let dashboardContent;
        let busqueda;

        const res = Object.values(assets);

        if(this.props.auth.user.role === "Contador") {
          botonAgregar = <Link to="/newAsset" className="btn-flat waves-effect">
                          <i className="material-icons left">add</i> Nuevo
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
                    <Typography className={classes.title} color="primary">Buscar activos</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="categ">Categoría</InputLabel>
                      <OutlinedInput id="categoria" type="text" onChange={this.onChange} multiline/>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="area">Área</InputLabel>
                      <OutlinedInput id="area" type="text" onChange={this.onChange} multiline/>
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
        

        if (res === null || assetsLoading) {
            dashboardContent = <p className="center-align">Cargando...</p>;
          } else if (res.length > 0) {
            dashboardContent = <Assets assets={res}/>;
          } else {
            dashboardContent = <p className="center-align"> No hay activos </p>;
          }

        return (
          <Grid container spacing={2}>
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
            {/* <div className="container">
          <Link to="/Dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Regresar
          </Link>
            {dashboardContent}
            {botonAgregar}
        </div> */}
        </Grid>
        )
    }
}

DashAssets.propTypes = {
    getAssets: PropTypes.func.isRequired,
    nameAssets: PropTypes.func.isRequired,
    assets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    assets: state.assets,
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {getAssets, addAsset, nameAssets}
) (DashAssets));