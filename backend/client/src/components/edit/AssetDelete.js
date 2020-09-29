import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { eliminarAsset } from "../../actions/assetActions";

import { Card, CardContent, Typography, Grid, Button, CardActions, List, ListItem, ListItemText, 
        Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      maxWidth: 600,
    },
    pos: {
      left: "40%",
      marginBottom: 12,
      width: 150,
    },
    media: {
        width: '100%',
        height: '100%'
    }, 
    button:{
        textalign: "center",
    }
  });

class AssetDelete extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
          id: ownProps.asset._id, 
          recinto: ownProps.asset.recinto,
          ubicacion: ownProps.asset.ubicacion,
          categoria: ownProps.asset.categoria,
          nombre: ownProps.asset.nombre,
          valor: ownProps.asset.valor,
          estado: ownProps.asset.estado,
          observacion: ownProps.asset.observacion,
          imagen: ownProps.asset.imagen,
          soporte_delete: ownProps.asset.soporte_delete,
          errors: {},
          setOpen: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onClick = () => {
        this.handleClickOpen()
    }

    handleClickOpen = () => {
        this.setState({setOpen: true})
    };
    
    handleClose = () => {
        this.setState({setOpen: false})
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = e => {
        const newInfo = {
            id: this.state.id,
            user_id: this.props.auth.user.id,
            user_name: this.props.auth.user.name
        };
        this.props.eliminarAsset(newInfo, this.props.history); 
    };

    render() {

        const { classes } = this.props;
        
        let paraBorrar = false;

        if(this.state.estado==="Petición para eliminar") {
            paraBorrar = true;
        } 

        const borrar = 
        <Card>
            <Link to="/assets" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                assets
            </Link>
            <CardContent align="center">
                <Dialog
                    open={this.state.setOpen}
                    onClose={this.handleClose}
                    >
                    <DialogTitle>Imagen del Activo</DialogTitle>
                    <DialogContent>
                        <img className={classes.media} src={this.state.imagen} alt="" width="100%" height="100%"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography variant="h4" color="primary" gutterBottom>Eliminar activo :</Typography>
                <br/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List>
                            <ListItem>
                                <ListItemText primary="Nombre" secondary={this.state.nombre}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Categoría" secondary={this.state.categoria}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Ubicación" secondary={this.state.ubicacion}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Estado" secondary={this.state.estado}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Valor" secondary={this.state.valor}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Observación" secondary={this.state.observacion}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Soporte eliminación" secondary={<a href={this.state.soporte_delete} download>Descargar</a>}/>
                            </ListItem>
                            <ListItem >
                                <Button color="primary" onClick={this.onClick} >Imagen</Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.button}>
                <Button size="large" color="primary" onClick={this.onSubmit}>
                    Confirmar eliminar activo
                </Button>
            </CardActions>
        </Card>

        const whoops =
        <Card>
            <Link to="/assets" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                assets
            </Link>
            <CardContent align="center">
                <Typography variant="h2" gutterBottom>Oops!!</Typography>
                <Typography variant="h5" gutterBottom>Parece que este activo no se puede eliminar aún o yá ha sido eliminado</Typography>
            </CardContent>
        </Card>

    return (
        <div style={{maxWidth:"600px", minWidth:"300px"}}>
            {paraBorrar ? borrar : whoops}
        </div>
      );
    }
}

AssetDelete.propTypes = {
    eliminarAsset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    let id = ownProps.match.params.id;
    return {
        asset: state.assets.assets.data.find(asset => asset._id === id),
        auth: state.auth
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { eliminarAsset }
)(AssetDelete));