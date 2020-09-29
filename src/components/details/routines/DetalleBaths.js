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
                                                <ListItemText primary="Sanitarios Total" secondary={bath.total_sanitarios} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Orinales Total" secondary={bath.total_orinales} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Lavamanos Total" secondary={bath.total_lavamanos} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Secamanos Total" secondary={bath.total_secamanos} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Pañaleras Total" secondary={bath.total_panaleras} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Duchas Total" secondary={bath.total_duchas} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="Luminarias Total" secondary={bath.total_luminarias} />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th><Typography style={{color:"#F59C00"}}>Nombre</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Sanitarios</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Orinales</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Lavamanos</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Secamanos</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Panaleras</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Duchas</Typography> </th>
                                                    <th align="right"><Typography style={{color:"#F59C00"}}>Luminarias</Typography> </th>
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
/*
<ListItem>
                                                <ListItemText primary="N1_P1_E13" onClick={this.onClick('N1_P1_E13')} secondary={bath.N1_P1_E13} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N2_P1_E12" onClick={this.onClick('N2_P1_E12')} secondary={bath.N2_P1_E12} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="ENF_P1_E10" onClick={this.onClick('ENF_P1_E10')} secondary={bath.ENF_P1_E10} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N3_P1_E10" onClick={this.onClick('N3_P1_E10')} secondary={bath.N3_P1_E10} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N4_P1_E10" onClick={this.onClick('N4_P1_E10')} secondary={bath.N4_P1_E10} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N5_P1_E9" onClick={this.onClick('N5_P1_E9')} secondary={bath.N5_P1_E9} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N6_P1_E6" onClick={this.onClick('N6_P1_E6')} secondary={bath.N6_P1_E6} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N7_P1_E6" onClick={this.onClick('N7_P1_E6')} secondary={bath.N7_P1_E6} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N8_P1_E3" onClick={this.onClick('N8_P1_E3')} secondary={bath.N8_P1_E3} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N9_P1_E3" onClick={this.onClick('N9_P1_E3')} secondary={bath.N9_P1_E3} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N10_P1_E4" onClick={this.onClick('N10_P1_E4')} secondary={bath.N10_P1_E4} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N11_P1_E23" onClick={this.onClick('N11_P1_E23')} secondary={bath.N11_P1_E23} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N12_P1_E21" onClick={this.onClick('N12_P1_E21')} secondary={bath.N12_P1_E21} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N13_P1_E21" onClick={this.onClick('N13_P1_E21')} secondary={bath.N13_P1_E21} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N14_P1_E19" onClick={this.onClick('N14_P1_E19')} secondary={bath.N14_P1_E19} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N15_P1_E17" onClick={this.onClick('N15_P1_E17')} secondary={bath.N15_P1_E17} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N16_P1_E17" onClick={this.onClick('N16_P1_E17')} secondary={bath.N16_P1_E17} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N17_P1_E17" onClick={this.onClick('N17_P1_E17')} secondary={bath.N17_P1_E17} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N18_P1_E17" onClick={this.onClick('N18_P1_E17')} secondary={bath.N18_P1_E17} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N19_P2_E15" onClick={this.onClick('N19_P2_E15')} secondary={bath.N19_P2_E15} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="CAM1_P2_E16" onClick={this.onClick('CAM1_P2_E16')} secondary={bath.CAM1_P2_E16} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="CAM2_P2_E15" onClick={this.onClick('CAM2_P2_E15')} secondary={bath.CAM2_P2_E15} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N20_P2_E15" onClick={this.onClick('N20_P2_E15')} secondary={bath.N20_P2_E15} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N21_P2_E14" onClick={this.onClick('N21_P2_E14')} secondary={bath.N21_P2_E14} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N22_P2_E13" onClick={this.onClick('N22_P2_E13')} secondary={bath.N22_P2_E13} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N23_P2_E14" onClick={this.onClick('N23_P2_E14')} secondary={bath.N23_P2_E14} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N24_P2_E11" onClick={this.onClick('N24_P2_E11')} secondary={bath.N24_P2_E11} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N25_P2_E10" onClick={this.onClick('N25_P2_E10')} secondary={bath.N25_P2_E10} />
                                            </ListItem>
                                            <ListItem >
                                                <ListItemText primary="N26_P2_E9" onClick={this.onClick('N26_P2_E9')} secondary={bath.N26_P2_E9} />
                                            </ListItem>
*/

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
