import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Card, CardContent, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
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

class Contador extends Component {
    constructor(){
        super();
    }

    componentDidMount() {
        this.props.getAssetAudits();
        this.props.getTaskAudits();
        this.props.getUserAudits();
    }

    render() {
        const { classes, assetaudits } = this.props;

        let content = []
        if(assetaudits.assetaudits.data != null){
            let l = assetaudits.assetaudits.data.length;

            for ( let x=l-1;content.length<5;x--) {
                content.push(assetaudits.assetaudits.data[x]);
            }
        }

        console.log(content)
        
        return (
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Card variant="elevation" style={{minWidth:360}}>
                                                    <CardContent>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h5" color="primary"> Últimos Movimientos Activos</Typography>
                                                            </Grid>
                                                        {content.length!==0 ? 
                                                        content
                                                        .map(au => {
                                                            const d = new Date(au.date)
                                                            const h = d.getHours()+":"+d.getMinutes()
                                                            return au.action === "CREATE" ?
                                                            <Grid item xs={12}>
                                                                <Alert style={{fontSize:14}} key={au._id} severity="success">Ha sido creado un nuevo activo - {au.asset_name} ({d.toLocaleDateString()} : {h})</Alert>
                                                            </Grid>
                                                            :
                                                            au.action === "UPDATE" ?
                                                            <Grid item xs={12}>
                                                                <Alert style={{fontSize:14}} key={au._id} severity="info">Ha sido modificado un activo - {au.asset_name} ({d.toLocaleDateString()} : {h})</Alert>
                                                            </Grid>
                                                            :
                                                            au.action === "DELETE" ?
                                                            <Grid item xs={12}>
                                                                <Alert style={{fontSize:14}} key={au._id} severity="info">Ha sido eliminado un activo - {au.asset_name} ({d.toLocaleDateString()} : {h})</Alert>
                                                            </Grid>
                                                            : null
                                                            })
                                                            : null
                                                        }
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
        );
    }
}

Contador.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    assetaudits: state.assetaudits,
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getAssetAudits, getTaskAudits, getUserAudits }
)(Contador));