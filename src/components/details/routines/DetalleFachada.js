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

class DetalleFachada extends Component {

    render() {
        const { classes } = this.props;
        let fachada = this.props.fachada

        const bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card ClassName={classes.root}>
                            <CardContent>
                                <Link to="/fachadas" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" style={{color:"#F59C00"}}>Detalles Rutina Fachada: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem >
                                                <ListItemText primary="Fecha ejecución" secondary={new Date(fachada.fecha).toLocaleDateString()} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Ejecutor" secondary={fachada.ejecutor} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Supervisor" secondary={fachada.supervisor} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Blower" secondary={fachada.blower} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Fuga en espirotubo" secondary={fachada.fuga_espirotubo} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Presión sensor analógico 0-10 Vdc" secondary={fachada.presion_sensor} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Presión de baja" secondary={fachada.presion_baja} />
                                                </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Presión de alta" secondary={fachada.presion_alta} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Defecto en colchones" secondary={fachada.colchones} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Descripción defecto" secondary={fachada.defecto_colchones} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Tablero generador aire limpio" secondary={fachada.generador_aire} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Lámparas funcionando" secondary={fachada.lamparas} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Descripción falla" secondary={fachada.defecto_lamparas} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Control funcionando" secondary={fachada.control} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Tablero eléctrico limpio y funcionando" secondary={fachada.tablero_electrico} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Observaciones" secondary={fachada.observacion} />
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
                                {fachada==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

DetalleFachada.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        fachada: state.fachadas.fachadas.data.find(fachada => fachada._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(DetalleFachada));
