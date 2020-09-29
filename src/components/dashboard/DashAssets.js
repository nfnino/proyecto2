import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Button, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getAssets, addAsset, nameAssets } from "../../actions/assetActions";

import Assets from "./Assets";

const useStyles = theme => ({
  root: {
    minWidth: 250,
    //background: "#E9EAE8"
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
  paper: {
    //background: "#E9EAE8"
  }
});

class DashAssets extends Component {

    constructor(){
      super();
      this.state={
          search: false,
          categoria: "",
          area: ""
      };
      this.clear = this.clear.bind(this);
    }

    clear() {
      this.setState({search: false, categoria:"", area:""})
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

    listChange = input => (e, obj) => {
      if(obj!=null) {
        this.setState({[input]: obj.value});
      }
    }

    render() {

      const { classes } = this.props;

        const { assets, assetsLoading } = this.props.assets;

        let options_cat = [
          {value: "Accesos", label: "Accesos"},
          {value: "Acústica", label: "Acústica"},
          {value: "Aluminio/vidrio", label: "Aluminio/vidrio"},
          {value: "Aparatos sanitarios", label: "Aparatos sanitarios"},
          {value: "Arquitectura", label: "Arquitectura"},
          {value: "Acabados/interior", label: "Acabados/interior"},
          {value: "Cubiertas", label: "Cubiertas"},
          {value: "Dotaciones", label: "Dotaciones"},
          {value: "Equipos de cómputo", label: "Equipos de cómputo"},
          {value: "Equipos de seguridad en alturas", label: "Equipos de seguridad en alturas"},
          {value: "Estructuras metálicas", label: "Estructuras metálicas"},
          {value: "Fachada", label: "Fachada"},
          {value: "Gas", label: "Gas"},
          {value: "Hidrosanitario RCI", label: "Hidrosanitario RCI"},
          {value: "HVAC", label: "HVAC"},
          {value: "Iluminación exterior", label: "Iluminación exterior"},
          {value: "Seguridad y control", label: "Seguridad y control"},
          {value: "Subestación eléctrica", label: "Subestación eléctrica"},
          {value: "Transporte vertical", label: "Transporte vertical"},
          {value: "Urbanismo", label: "Urbanismo"},
          {value: "Vallas", label: "Vallas"},
          {value: "Ventanería de fachada", label: "Ventanería de fachada"},
          {value: "Voz", label: "Voz"},
          {value: "Datos y telecomunicaciones", label: "Datos y telecomunicaciones"}]

          let options_area = [
            {value: "Operaciones", label: "Operaciones"},
            {value: "Área 2", label: "Área 2"},
            {value: "Área 3", label: "Área 3"},
          ]

        let botonAgregar;
        let dashboardContent;
        let busqueda;

        console.log(this.props)

        let res = null;
        if (assets!=null) {
          res = Object.values(assets);
        }

        if(this.props.auth.user.role === "Contador") {
          botonAgregar = <Fab color="secondary" variant="extended" aria-label="add" href="/newAsset">
                          <AddIcon />
                          Nuevo Activo
                        </Fab>
        } else {
          botonAgregar = <div></div>
        }

        busqueda = 
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Grid container alignItems="center" direction="column" spacing={4}>
                  <Grid item xs={12}>
                    <br/>
                    <Typography className={classes.title} variant="h5" color="primary">BUSCAR ACTIVOS</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {/* 
                      <InputLabel htmlFor="categ">Categoría</InputLabel>
                      <OutlinedInput id="categoria" type="text" onChange={this.onChange} multiline/> */}
                      <Autocomplete
                        id="categoria"
                        defaultValue={this.state.categoria}
                        options={options_cat}
                        getOptionLabel={(options_cat) => options_cat.label}
                        onChange={this.listChange('categoria')}
                        style={{ width: 300}}
                        renderInput={(params) => <TextField {...params} label="Categoría del activo" inputLabelProps={{classes:{input: classes.input}}} variant="filled" multiline={true}/>}
                        />
                  </Grid>
                  <Grid item xs={12}>
                      {/* <InputLabel htmlFor="area">Área</InputLabel>
                      <OutlinedInput id="area" type="text" onChange={this.onChange} multiline/> */}
                      <Autocomplete
                        id="area"
                        defaultValue={this.state.area}
                        options={options_area}
                        getOptionLabel={(options_area) => options_area.label}
                        onChange={this.listChange('area')}
                        style={{ width: 300}}
                        renderInput={(params) => <TextField {...params} label="Área del activo" inputLabelProps={{classes:{input: classes.input}}} variant="filled" multiline={true}/>}
                        />
                  </Grid>
                  <Grid item xs={12}>
                    <Button className={classes.input} variant="contained" size="large" style={{width: 150}} color="primary" onClick={this.onSearch}> Buscar</Button>
                    <br/>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        

        if (res === null || assetsLoading) {
            dashboardContent = <p className="center-align">Cargando...</p>;
          } else if (res.length > 0) {
            dashboardContent = <Assets assets={res} clear={this.clear}/>;
          } else {
            dashboardContent = <p className="center-align"> No hay activos </p>;
          }

        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12}>
                  <Card variant="elevated" className={classes.paper}>
                    <CardContent>
                      {this.state.search ? dashboardContent : busqueda}
                      <br/>
                      <Grid container justify="flex-end" spacing={2}>
                        <Grid item>
                          {botonAgregar}
                        </Grid>
                        <Grid item>
                          <Fab color="primary" variant="extended" aria-label="search" href="/report-Assets">
                            <SearchIcon />
                            Reportes
                          </Fab>
                        </Grid>
                      </Grid>
                      {/* <Card className={classes.root} variant="outlined">
                        <CardContent>
                          <Grid container alignItems="center" direction="column" spacing={3}>
                            <Grid item xs={12}>
                              <Typography className={classes.title} variant="overline" color="primary"> Otras Acciones</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item >
                                  {botonAgregar}
                                </Grid>
                                <Grid item >
                                  <Link to="/report-Assets" color="primary"> 
                                    <Button variant="outlined" color="primary" size="medium"> Reportes </Button> 
                                  </Link>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card> */}
                    </CardContent>
                  </Card>
                </Grid>
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