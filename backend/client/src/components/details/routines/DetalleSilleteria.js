import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getSilleteria } from "../../../actions/routines/silleteriaActions";
import { getPisos } from "../../../actions/routines/silleteriaActions";

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

class DetalleSilleteria extends Component {

    constructor(ownProps) {
        super(ownProps);
        this.state = {
            own: ownProps.silleteria,
        }
    }

    componentDidMount() {
        this.props.getPisos(this.props.silleteria._id);
        this.props.getSilleteria();
    }

    render() {
        const { classes } = this.props;
        let silleteria = this.props.silleteria
        let detalles = this.props.silleterias.details
        let bruh = null;

        if(detalles.data != null) {
            const d = Object.values(detalles.data)
            console.log(d)

            let userItems = d.map(user => (
                <tr key={user._id} style={{ marginTop: "1rem" }}>
                <td> {user.nombre} </td>
                <td align="right"> {user.p_01}</td>
                <td align="right"> {user.p_02} </td>
                <td align="right"> {user.p_03} </td>
                <td align="right"> {user.p_04} </td>
                <td align="right"> {user.p_05} </td>
                <td align="right"> {user.p_06} </td>
                <td align="right"> {user.p_07} </td>
                <td align="right"> {user.p_08}</td>
                <td align="right"> {user.p_09} </td>
                <td align="right"> {user.p_10} </td>
                <td align="right"> {user.p_11} </td>
                <td align="right"> {user.p_12} </td>
                <td align="right"> {user.p_13} </td>
                <td align="right"> {user.p_14} </td>
                <td align="right"> {user.p_15}</td>
                <td align="right"> {user.p_16} </td>
                <td align="right"> {user.p_17} </td>
                <td align="right"> {user.p_18} </td>
                <td align="right"> {user.p_19} </td>
                <td align="right"> {user.p_total} </td>
                </tr>
            ));

            const f1 = new Date(silleteria.fecha).toLocaleDateString()
            const f2 = new Date(silleteria.fecha_fin).toLocaleDateString()
            const h1 = new Date(silleteria.fecha).getHours()
            const h2 = new Date(silleteria.fecha_fin).getHours()
            const m1 = new Date(silleteria.fecha).getMinutes()
            const m2 = new Date(silleteria.fecha_fin).getMinutes()
            const date1 = f1+" - "+h1+":"+m1;
            let date2 = "Aún no ha sido finalizada";
            if(silleteria.fecha_fin!=null){
                date2 = f2+" - "+h2+":"+m2
            }

            bruh = 
                <Grid container>
                    <Grid item xs={12}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Link to="/silleterias" className="btn-flat waves-effect">
                                    <i className="material-icons left">keyboard_backspace</i>Regresar
                                </Link>
                                <br/>
                                <br/>
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" style={{color:"#F59C00"}}>Detalles Rutina Silletería: </Typography>
                                    <Grid item xs={12}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary="Fecha inicio" secondary={date1} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Fecha fin" secondary={date2} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Ejecutor" secondary={silleteria.ejecutor} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="No Disponibles en Platea" secondary={silleteria.platea} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="No Disponibles en Tribunas Fan Norte" secondary={silleteria.tribuna_norte} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="No Disponibles en Tribunas Fan Sur" secondary={silleteria.tribuna_sur} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="No Disponibles en Suites V.I.P." secondary={silleteria.suites_vip} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="No Disponibles en Boxes" secondary={silleteria.boxes} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table width="100%">
                                            <tbody>
                                                <tr>
                                                    <th><Typography style={{color:"#F59C00"}}>Nombre</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 01</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 02</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 03</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 04</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 05</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 06</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 07</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 08</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 09</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 10</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 11</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 12</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 13</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 14</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 15</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 16</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 17</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 18</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. en 19</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>No Disp. Total</Typography> </th>
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
                                {silleteria==null ? (<div className="center">Cargando ...</div>) : bruh }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

DetalleSilleteria.propTypes = {
    getSilleteria: PropTypes.func.isRequired,
    silleterias: PropTypes.object.isRequired,
    getPisos: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        silleterias: state.silleterias,
        silleteria: state.silleterias.silleterias.data.find(silleteria => silleteria._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getPisos, getSilleteria }
)(DetalleSilleteria));
