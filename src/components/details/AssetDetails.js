import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

import { Button, Grid, Card, CardContent, ListItem, List, ListItemText, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = theme => ({
    root: {
      minWidth: 250,
    },
    media: {
        width: '100%',
        height: '100%'
    },
});

class AssetDetails extends Component {

    constructor(){
        super();
        this.state={
            setOpen: false,
            setOpen2: false,
        };
    }

    handleClickOpen = () => {
        this.setState({setOpen: true})
    };
    
    handleClose = () => {
        this.setState({setOpen: false})
    };

    onClick = () => {
        this.handleClickOpen()
    }

    handleClickOpen2 = () => {
        this.setState({setOpen2: true})
    };
    
    handleClose2 = () => {
        this.setState({setOpen2: false})
    };

    onClick2 = () => {
        this.handleClickOpen2()
    }

    render() {
        const { classes } = this.props;
        let asset = this.props.asset

        let source = asset.imagen
        let qr = asset.cod_qr
        console.log(source)
        console.log(qr)

        const bruh = 
                <Grid container>
                    <Dialog
                        open={this.state.setOpen}
                        onClose={this.handleClose}
                        >
                        <DialogTitle>Imagen del Activo</DialogTitle>
                        <DialogContent>
                            <img className={classes.media} src={source} alt="" width="500" height="600"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.setOpen2}
                        onClose={this.handleClose2}
                        >
                        <DialogTitle>Código QR</DialogTitle>
                        <DialogContent>
                            <img className={classes.media} src={qr} alt="" width="500" height="600"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose2} color="primary">
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                <Grid item xs={12}>
                    <Card ClassName={classes.root}>
                        <CardContent>
                            <Link to="/assets" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i>Regresar
                            </Link>
                            <br/>
                            <br/>
                            <Grid container justify="center" spacing={2}>
                                <Typography variant="h3" color="primary">Detalles Del Activo: </Typography>
                                <Grid item xs={12}>
                                    <List>
                                        <ListItem >
                                            <ListItemText primary="Nombre" secondary={asset.nombre} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Categoría" secondary={asset.categoria} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Área" secondary={asset.area} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Recinto" secondary={asset.recinto} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Ubicación" secondary={asset.ubicacion} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Fecha Compra" secondary={new Date(asset.fecha_compra).toLocaleDateString()} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Valor" secondary={asset.valor} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Días Garantía" secondary={asset.dias_garantia} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Tareas Activas" secondary={asset.tareas_activas} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Fecha Fin Garantía" secondary={new Date(asset.fecha_fin_garantia).toLocaleDateString()} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Frecuencia Mantenimiento" secondary={asset.dias_frec_mant_preventivo} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Observación" secondary={asset.observacion} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Estado" secondary={asset.estado} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Activo Antiguo" secondary={asset.activo_reemp} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Manual" secondary={<a href={asset.manual} download> 
                                                    Descargar
                                                </a>}/>
                                        </ListItem>
                                        <ListItem >
                                            <Button color="primary" onClick={this.onClick} >Imagen</Button>
                                        </ListItem>
                                        <ListItem >
                                            <Button color="primary" onClick={this.onClick2} >Código QR</Button>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        <Card variant="elevation" className={classes.root}>
                            <CardContent>
                                {asset==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

AssetDetails.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        asset: state.assets.assets.data.find(asset => asset._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(AssetDetails));
