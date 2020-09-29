import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

import { Grid, Card, CardContent, ListItem, List, ListItemText, Typography } from "@material-ui/core";

const useStyles = theme => ({
    root: {
      minWidth: 250,
    },
    media: {
        width: '100%',
        height: '100%'
    },
});

class DetalleParking extends Component {

    render() {
        const { classes } = this.props;
        let parking = this.props.parking

        const bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card ClassName={classes.root}>
                            <CardContent>
                                <Link to="/parkings" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" style={{color:"#F59C00"}}>Detalles Rutina Parking: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem >
                                                <ListItemText primary="Fecha ejecución" secondary={new Date(parking.fecha).toLocaleDateString()} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Ejecutor" secondary={parking.ejecutor} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Supervisor" secondary={parking.supervisor} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Carros N1" secondary={parking.carros_n1} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Carros N2" secondary={parking.carros_n2} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Carros N3" secondary={parking.carros_n3} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Carros N4" secondary={parking.carros_n4} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Carros" secondary={parking.carros} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Motos N1" secondary={parking.motos_n1} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Motos N2" secondary={parking.motos_n2} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Motos N3" secondary={parking.motos_n3} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Motos N4" secondary={parking.motos_n4} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Parq. Disponible Motos" secondary={parking.motos} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Cámaras Disponibles N1" secondary={parking.camaras_n1} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Cámaras Disponibles N2" secondary={parking.camaras_n2} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Cámaras Disponibles N3" secondary={parking.camaras_n3} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Cámaras Disponibles N4" secondary={parking.camaras_n4} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Cámaras Disponibles PTZ" secondary={parking.camaras_ptz} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Cámaras Disponibles" secondary={parking.camaras} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Observaciones" secondary={parking.observacion} />
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
                                {parking==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

DetalleParking.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        parking: state.parkings.parkings.data.find(parking => parking._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(DetalleParking));
