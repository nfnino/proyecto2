import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getvips } from "../../../actions/routines/vipActions.mjs";
import { getSuites } from "../../../actions/routines/vipActions.mjs";

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

class Detallevip extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.vip,
        }
    }

    componentDidMount() {
        this.props.getSuites(this.props.vip._id);
        this.props.getvips();
    }

    render() {
        const { classes } = this.props;
        let vip = this.props.vip
        let detalles = this.props.vips.details
        let bruh =null;

        if(detalles.data != null) {
            const d = Object.values(detalles.data)
            console.log(d)

            let userItems = d.map(user => (
                <tr key={user._id} style={{ marginTop: "1rem" }}>
                <td> {user.nombre} </td>
                <td align="right"> {user.sillas}</td>
                <td align="right"> {user.puertas} </td>
                <td align="right"> {user.lava_platos} </td>
                <td align="right"> {user.lamparas} </td>
                <td align="right"> {user.observacion} </td>
                </tr>
            ));

            const f1 = new Date(vip.fecha).toLocaleDateString()
            const f2 = new Date(vip.fecha_fin).toLocaleDateString()
            const h1 = new Date(vip.fecha).getHours()
            const h2 = new Date(vip.fecha_fin).getHours()
            const m1 = new Date(vip.fecha).getMinutes()
            const m2 = new Date(vip.fecha_fin).getMinutes()
            const date1 = f1+" - "+h1+":"+m1;
            let date2 = "Aún no ha sido finalizada";
            if(vip.fecha_fin!=null){
                date2 = f2+" - "+h2+":"+m2
            }

            bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Link to="/vips" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h3" color="primary">Detalles Rutina Baños: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Fecha inicio" secondary={date1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Fecha fin" secondary={date2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Ejecutor" secondary={vip.ejecutor} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Supervisor" secondary={vip.supervisor} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Total sillas" secondary={vip.total_sillas} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Total puertas" secondary={vip.total_puertas} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Total lava platos" secondary={vip.total_lava_platos} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Total lámparas" secondary={vip.total_lamparas} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography color="primary">Nombre</Typography> </th>
                                                    <th align="right"><Typography color="primary">Sillas Disponibles</Typography> </th>
                                                    <th align="right"><Typography color="primary">Puertas Acceso Disp.</Typography> </th>
                                                    <th align="right"><Typography color="primary">Lava Platos Disp.</Typography> </th>
                                                    <th align="right"><Typography color="primary">Lamparas Disponibles</Typography> </th>
                                                    <th align="right"><Typography color="primary">Observaciones</Typography> </th>
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
                                {vip==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

Detallevip.propTypes = {
    getvips: PropTypes.func.isRequired,
    vips: PropTypes.object.isRequired,
    getSuites: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        vips: state.vips,
        vip: state.vips.vips.data.find(vip => vip._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getSuites, getvips }
)(Detallevip));
