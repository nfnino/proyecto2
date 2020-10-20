import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBaths } from "../../../actions/routines/bathActions";
import { getDetallesBath } from "../../../actions/routines/bathActions";

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

class DetalleBath extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.bath,
        }
    }

    componentDidMount() {
        this.props.getDetallesBath(this.props.bath._id);
        this.props.getBaths();
    }

    render() {
        const { classes } = this.props;
        let bath = this.props.bath
        let detalles = this.props.baths.details
        let bruh =null;

        if(detalles.data != null) {
            const d = Object.values(detalles.data)
            console.log(d)

                    let userItems = d.map(user => (
                        <tr key={user._id} style={{ marginTop: "1rem" }}>
                        <td> {user.nombre} </td>
                        <td align="right"> {user.sanitarios}</td>
                        <td align="right"> {user.orinales} </td>
                        <td align="right"> {user.lavamanos} </td>
                        <td align="right"> {user.secamanos} </td>
                        <td align="right"> {user.panaleras} </td>
                        <td align="right"> {user.duchas} </td>
                        <td align="right"> {user.luminarias} </td>
                        </tr>
                    ));

            const f1 = new Date(bath.fecha).toLocaleDateString()
            const f2 = new Date(bath.fecha_fin).toLocaleDateString()
            const h1 = new Date(bath.fecha).getHours()
            const h2 = new Date(bath.fecha_fin).getHours()
            const m1 = new Date(bath.fecha).getMinutes()
            const m2 = new Date(bath.fecha_fin).getMinutes()
            const date1 = f1+" - "+h1+":"+m1;
            let date2 = "Aún no ha sido finalizada";
            if(bath.fecha_fin!=null){
                date2 = f2+" - "+h2+":"+m2
            }

            bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Link to="/baths" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" style={{color:"#F59C00"}}>Detalles Rutina Baños: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Fecha inicio" secondary={date1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Fecha fin" secondary={date2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Ejecutor" secondary={bath.ejecutor} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Supervisor" secondary={bath.supervisor} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Observaciones" secondary={bath.observacion} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Sanitarios Faltantes Total" secondary={bath.total_sanitarios} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Orinales Faltantes Total" secondary={bath.total_orinales} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Lavamanos Faltantes Total" secondary={bath.total_lavamanos} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Secamanos Faltantes Total" secondary={bath.total_secamanos} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Pañaleras Faltantes Total" secondary={bath.total_panaleras} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Duchas Faltantes Total" secondary={bath.total_duchas} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Luminarias Faltantes Total" secondary={bath.total_luminarias} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography style={{color:"#F59C00"}}>Nombre</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Sanitarios Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Orinales Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Lavamanos Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Secamanos Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Panaleras Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Duchas Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Luminarias Faltantes</Typography> </th>
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
                                {bath==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

DetalleBath.propTypes = {
    getBaths: PropTypes.func.isRequired,
    baths: PropTypes.object.isRequired,
    getDetallesBath: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        baths: state.baths,
        bath: state.baths.baths.data.find(bath => bath._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getDetallesBath, getBaths }
)(DetalleBath));
