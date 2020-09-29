import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Card, CardContent, Typography} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { getAssetAudits } from "../../actions/audits/assetAuditActions";
import { getTaskAudits } from "../../actions/audits/taskAuditActions";
import { getUserAudits } from "../../actions/audits/userAuditActions";

const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
      },
    control: {
      padding: theme.spacing(2),
    },
    card: {
        fullWidth: true,
        background: '#E9EAE8'
    }
  });

class Super extends Component {

    componentDidMount() {
        this.props.getAssetAudits();
        this.props.getTaskAudits();
        this.props.getUserAudits();
    }

    total_mes (lista) {
        if(lista.data!=null) {
            let res = [];
            const today_year = new Date().getFullYear();
            const today_month = new Date().getMonth();
            for(let i=0;i<lista.data.length;i++) {
                const aux = lista.data[i];
                const date = new Date(aux.date);
                const year = date.getFullYear();
                const month = date.getMonth();
                if(year === today_year && month === today_month) {
                    res.push(aux);
                }
            }
        return res;
        }
    }

    total_semana (lista) {
        if(lista.data!=null) {
            let res = [];
            const today = new Date();
            let first = today.getDate() - today.getDay() + 1;
            let last = first + 6;
            const t_month = today.getMonth();
            const t_year = today.getFullYear();
            for(let i=0;i<lista.data.length;i++) {
                const aux = lista.data[i];
                const date = new Date(aux.date);
                const day = date.getDate();
                const month = date.getMonth();
                const year = date.getFullYear();
                if(t_year===year && t_month===month && day>=first && day<=last) {
                    res.push(aux);
                }
            }
            return res;
        }
    }

    total_hoy (lista) {
        if( lista.data != null) {
            let res = [];
            const today = new Date().toLocaleDateString();
            for (let i=0;i<lista.data.length;i++) {
                console.log(i)
                const aux = lista.data[i];
                const date = new Date(aux.date).toLocaleDateString();
                if (date===today) {
                    res.push(aux);
                }
            }
            return res;
        }
    }

    render() {
        const { classes, useraudits, assetaudits, taskaudits } = this.props;

        /* console.log("ua ",useraudits)
        console.log("aa ",assetaudits)
        console.log("ta ",taskaudits) */

        const activos_hoy = this.total_hoy(assetaudits.assetaudits)
        const activos_semana = this.total_semana(assetaudits.assetaudits)
        const activos_mes = this.total_mes(assetaudits.assetaudits)

        const tareas_hoy = this.total_hoy(taskaudits.taskaudits)
        const tareas_semana = this.total_semana(taskaudits.taskaudits)
        const tareas_mes = this.total_mes(taskaudits.taskaudits)

        const usuarios_hoy = this.total_hoy(useraudits.useraudits)
        const usuarios_semana = this.total_semana(useraudits.useraudits)
        const usuarios_mes = this.total_mes(useraudits.useraudits)
        
        return (
            <div>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Card variant="outlined" >
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Card className={classes.card} variant="elevation">
                                                <CardContent>
                                                    <Typography variant="h4" gutterBottom color="primary" align="center"> ¡Bienvenido, {this.props.auth.user.name}! </Typography>
                                                    <Typography noWrap={true} variant="h5" gutterBottom color="textPrimary" align="center"> Ha ingresado como: <Typography noWrap={true} variant="h5" style={{fontWeight:"bolder"}}>{this.props.auth.user.role}</Typography></Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>{/* 
                                        <Grid item xs={12}>
                                            <Typography variant="h4" gutterBottom color="primary" align="center"> Estadísiticas:</Typography>
                                        </Grid> */}
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={4}>
                                                    <Card variant="elevation" style={{minWidth:360, height:300, backgroundColor:"#E9EAE8"}}>
                                                        <CardContent>
                                                            <Typography variant="h4" gutterBottom color="primary" align="center"> Auditorías Activos</Typography>
                                                            <Grid container direction="column" justify="space-evenly" spacing={3} style={{height:"100%"}}>
                                                                <Grid item>
                                                                    <Typography variant="h5">Este mes: </Typography> {activos_mes.length}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="h5">Esta semana: </Typography> {activos_semana.length}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="h5">Hoy: </Typography> {activos_hoy.length}
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={4}> 
                                                    <Card variant="elevation" style={{minWidth:360, height:300, backgroundColor:"#E9EAE8"}}>
                                                        <CardContent>
                                                            <Typography variant="h4" gutterBottom color="primary" align="center"> Auditorías Actividades</Typography>
                                                            <Grid container direction="column" justify="space-evenly" spacing={3} style={{height:"100%"}}>
                                                                <Grid item>
                                                                    <Typography variant="h5">Este mes: </Typography> {tareas_mes.length}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="h5">Esta semana: </Typography> {tareas_semana.length}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="h5">Hoy: </Typography> {tareas_hoy.length}
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <Card variant="elevation" style={{minWidth:360, height:300, backgroundColor:"#E9EAE8"}}>
                                                        <CardContent>
                                                            <Typography variant="h4" gutterBottom color="primary" align="center"> Auditorías Usuarios</Typography>
                                                            <Grid container direction="column" justify="space-evenly" spacing={3} style={{height:"100%"}}>
                                                                <Grid item>
                                                                    <Typography variant="h5">Este mes: </Typography> {usuarios_mes.length}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="h5">Esta semana: </Typography> {usuarios_semana.length}
                                                                </Grid>
                                                                <Grid item>
                                                                    <Typography variant="h5">Hoy: </Typography> {usuarios_hoy.length}
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Super.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    assetaudits: state.assetaudits,
    taskaudits: state.taskaudits,
    useraudits: state.useraudits
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getAssetAudits, getTaskAudits, getUserAudits }
)(Super));