import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getLocales } from "../../../actions/routines/localActions";
import { getDetallesLocal } from "../../../actions/routines/localActions";

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

class DetalleLocal extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.local,
        }
    }

    componentDidMount() {
        this.props.getDetallesLocal(this.props.local._id);
        this.props.getLocales();
    }

    render() {
        const { classes } = this.props;
        let local = this.props.local
        console.log(this.props.locals)
        let detalles = this.props.locals.details

        let bruh = null;

        if(detalles.data != null) {
            const d = Object.values(detalles.data)
            console.log(d)

                    let userItems = d.map(user => (
                        <tr key={user._id} style={{ marginTop: "1rem" }}>
                        <td> {user.nombre} </td>
                        <td align="right"> {user.puertas} </td>
                        <td align="right"> {user.agua} </td>
                        <td align="right"> {user.gas} </td>
                        <td align="right"> {user.electricidad} </td>
                        <td align="right"> {user.lamparas} </td>
                        <td align="right"> {user.ventaneria} </td>
                        <td align="right"> {user.pasillos} </td>
                        <td align="right"> {user.observacion} </td>
                        </tr>
                    ));

            const f1 = new Date(local.fecha).toLocaleDateString()
            const f2 = new Date(local.fecha_fin).toLocaleDateString()
            const h1 = new Date(local.fecha).getHours()
            const h2 = new Date(local.fecha_fin).getHours()
            const m1 = new Date(local.fecha).getMinutes()
            const m2 = new Date(local.fecha_fin).getMinutes()
            const date1 = f1+" - "+h1+":"+m1;
            let date2 = "Aún no ha sido finalizada";
            if(local.fecha_fin!=null){
                date2 = f2+" - "+h2+":"+m2
            }

            bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Link to="/locales" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" style={{color:"#F59C00"}}>Detalles Rutina Locales: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Fecha inicio" secondary={date1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Fecha fin" secondary={date2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Ejecutor" secondary={local.ejecutor} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography style={{color:"#F59C00"}}>Nombre</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Puertas Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Agua</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Gas</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Electricidad</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Lámparas Faltantes</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Ventaneria</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Pasillos</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Observaciónes</Typography> </th>
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
                                {local==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

DetalleLocal.propTypes = {
    getLocales: PropTypes.func.isRequired,
    locals: PropTypes.object.isRequired,
    getDetallesLocal: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        locals: state.locals,
        local: state.locals.locals.data.find(local => local._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getDetallesLocal, getLocales }
)(DetalleLocal));
