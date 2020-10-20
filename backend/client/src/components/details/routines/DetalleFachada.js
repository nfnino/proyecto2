import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getFachadas } from "../../../actions/routines/fachadaActions";
import { getDetallesFachada } from "../../../actions/routines/fachadaActions";
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

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.fachada,
        }
    }

    componentDidMount() {
        this.props.getDetallesFachada(this.props.fachada._id);
        this.props.getFachadas();
    }

    render() {
        const { classes } = this.props;
        let fachada = this.props.fachada
        let detalles = this.props.fachadas.details
        let bruh = null;

        if(detalles != null && detalles.data != null) {
            const d = Object.values(detalles.data)

            let items = d.map(det => (
                <tr key={det._id} style={{ marginTop: "1rem" }}>
                <td> {det.nombre} </td>
                <td align="right"> {det.fuga_espirotubo}</td>
                <td align="right"> {det.presion_sensor} </td>
                <td align="right"> {det.presion_baja} </td>
                <td align="right"> {det.presion_alta} </td>
                <td align="right"> {det.colchones} </td>
                <td align="right"> {det.defecto_colchones} </td>
                <td align="right"> {det.generador_aire} </td>
                <td align="right"> {det.lamparas} </td>
                <td align="right"> {det.defecto_lamparas} </td>
                <td align="right"> {det.control} </td>
                <td align="right"> {det.tablero_electrico} </td>

                </tr>
            ));

            bruh = 
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
                                            <ListItemText primary="Fecha inicio" secondary={new Date(fachada.fecha).toLocaleDateString()} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Fecha fin" secondary={new Date(fachada.fecha_fin).toLocaleDateString()} />
                                        </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Ejecutor" secondary={fachada.ejecutor} />
                                            </ListItem>
                                        <ListItem >
                                            <ListItemText primary="Observaciones" secondary={fachada.observacion} />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography style={{color:"#F59C00"}}>Nombre</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Espirotubo con fuga</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Presión sensor analógico</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Presión en baja</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Presión en alta</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Colchones con defectos</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Defecto</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Tablero generador aire limpio</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Lámparas funcionando</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Fallo Lámparas</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Control Funcionando</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Tablero Eléc. limpio y organizado</Typography> </th>
                                                </tr>
                                                {items}
                                            </tbody>
                                        </table>
                                    </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        }

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
    getFachadas: PropTypes.func.isRequired,
    fachadas: PropTypes.object.isRequired,
    getDetallesFachada: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        fachadas: state.fachadas,
        fachada: state.fachadas.fachadas.data.find(fachada => fachada._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getDetallesFachada, getFachadas }
)(DetalleFachada));
