import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPantallas } from "../../../actions/routines/pantallaActions";
import { getDetallesPantalla } from "../../../actions/routines/pantallaActions";

import { withStyles } from '@material-ui/core/styles';

import { Grid, Card, CardContent, ListItem, List, ListItemText, Typography} from "@material-ui/core";

const useStyles = theme => ({
    root: {
      minWidth: 250,
    },
    inline: {
        display: 'inline',
      },
    media: {
        width: '100%',
        height: '100%'
    },
});

class DetallePantalla extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.pantalla,
        }
    }

    componentDidMount() {
        this.props.getDetallesPantalla(this.props.pantalla._id);
        this.props.getPantallas();
    }

    render() {
        const { classes } = this.props;
        let pantalla = this.props.pantalla
        console.log(this.props.pantallas)
        let detalles = this.props.pantallas.details

        let bruh = null;

        if(detalles.data != null) {
            const d = Object.values(detalles.data)
            console.log(d)

                    let userItems = d.map(user => (
                        <tr key={user._id} style={{ marginTop: "1rem" }}>
                        <td> {user.nombre} </td>
                        <td align="right"> {user.brak1}</td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        <td align="right"> {user.brak1} </td>
                        </tr>
                    ));

            const f1 = new Date(pantalla.fecha).toLocaleDateString()
            const f2 = new Date(pantalla.fecha_fin).toLocaleDateString()
            const h1 = new Date(pantalla.fecha).getHours()
            const h2 = new Date(pantalla.fecha_fin).getHours()
            const m1 = new Date(pantalla.fecha).getMinutes()
            const m2 = new Date(pantalla.fecha_fin).getMinutes()
            const date1 = f1+" - "+h1+":"+m1;
            let date2 = "Aún no ha sido finalizada";
            if(pantalla.fecha_fin!=null){
                date2 = f2+" - "+h2+":"+m2
            }

            bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Link to="/pantallas" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h3" color="primary">Detalles Rutina Pantallas: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Fecha inicio" secondary={date1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Fecha fin" secondary={date2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Ejecutor" secondary={pantalla.ejecutor} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Supervisor" secondary={pantalla.supervisor} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Falla en paneles" secondary={pantalla.falla} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="No. Paneles con falla" secondary={pantalla.paneles} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Tipo de falla" secondary={pantalla.tipo_falla} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="CPU limpia y funcionando" secondary={pantalla.cpu} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Control funcionando" secondary={pantalla.control} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Tableros eléctricos limpios" secondary={pantalla.tableros} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Plano eléctrico actualizarlo" secondary={pantalla.plano} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Corriente F1" secondary={pantalla.corriente_f1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Corriente F2" secondary={pantalla.corriente_f2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Corriente F3" secondary={pantalla.corriente_f3} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography color="primary">Nombre</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 1 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 2 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 3 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 4 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 5 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 6 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 7 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 8 (AMP)</Typography> </th>
                                                    <th align="right"><Typography color="primary">Brak 9 (AMP)</Typography> </th>
                                                </tr>
                                                {userItems}
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
                                {pantalla==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

DetallePantalla.propTypes = {
    getPantallas: PropTypes.func.isRequired,
    pantallas: PropTypes.object.isRequired,
    getDetallesPantalla: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        pantallas: state.pantallas,
        pantalla: state.pantallas.pantallas.data.find(pantalla => pantalla._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getDetallesPantalla, getPantallas }
)(DetallePantalla));