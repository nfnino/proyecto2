import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getrcis } from "../../../actions/routines/rciActions";
import { getGabinetes } from "../../../actions/routines/rciActions";

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

class Detallerci extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.rci,
        }
    }

    componentDidMount() {
        this.props.getGabinetes(this.props.rci._id);
        this.props.getrcis();
    }

    render() {
        const { classes } = this.props;
        let rci = this.props.rci
        let detalles = this.props.rcis.details
        let bruh = null;

        if(detalles != null && detalles.data != null) {
            const d = Object.values(detalles.data)
            console.log(d)
            let userItems = d.map(user => (
                <tr key={user._id} style={{ marginTop: "1rem" }}>
                <td> {user.nombre} </td>
                <td align="right"> {user.manguera}</td>
                <td align="right"> {new Date(user.extintor).getMonth()+1+"/"+new Date(user.extintor).getFullYear()} </td>
                <td align="right"> {user.conexion} </td>
                <td align="right"> {user.presion} </td>
                <td align="right"> {user.limpieza ? "Hecho" : "No hecho"} </td>
                <td align="right"> {user.seguro} </td>
                <td align="right"> {user.observacion} </td>
                </tr>
            ));
            console.log(rci.fecha_fin)
            const f1 = new Date(rci.fecha).toLocaleDateString()
            const f2 = new Date(rci.fecha_fin).toLocaleDateString()
            console.log("fechafin: ",f2)
            const h1 = new Date(rci.fecha).getHours()
            const h2 = new Date(rci.fecha_fin).getHours()
            const m1 = new Date(rci.fecha).getMinutes()
            const m2 = new Date(rci.fecha_fin).getMinutes()
            const date1 = f1+" - "+h1+":"+m1;
            let date2 = "Aún no ha sido finalizada";
            if(rci.fecha_fin!==null){
                date2 = f2+" - "+h2+":"+m2
            }

            bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Link to="/rcis" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" style={{color:"#F59C00"}}>Detalles Rutina Gabinetes RCI: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Fecha inicio" secondary={date1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Fecha fin" secondary={date2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Ejecutor" secondary={rci.ejecutor} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography style={{color:"#F59C00"}}>Nombre</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Estado Manguera</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Recarga Extintor</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Conexión Limpia y Seca</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Verificar Presión Agua</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Limpieza Gabinete</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Gabinete con Seguro</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Observaciones</Typography> </th>
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
                                {rci==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

Detallerci.propTypes = {
    getrcis: PropTypes.func.isRequired,
    rcis: PropTypes.object.isRequired,
    getGabinetes: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        rcis: state.rcis,
        rci: state.rcis.rcis.data.find(rci => rci._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getGabinetes, getrcis }
)(Detallerci));
