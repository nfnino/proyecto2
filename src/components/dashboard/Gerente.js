import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Card, CardContent, TableRow, TableCell, TableBody, TableContainer, Table, TableHead, Typography , Button, Divider} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { getAssets } from "../../actions/assetActions";

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

class Gerente extends Component {
    constructor(){
        super();
    }

    componentWillMount() {
        this.props.getAssets();
    } 

    render() {
        const { classes } = this.props;
        const { auth } = this.props;
        const { assets, assetsLoading } = this.props.assets;
        const res = assets.data;

        let dashboardContent;

        if (res == null || assetsLoading) {
            dashboardContent = <p className="center-align">Loading...</p>;
        } else if (res.length > 0) {
            const array = []
            for(let i=0; i<res.length; i++) {
                if(res[i].estado === "Petición para eliminar"){
                    array.push(res[i])
                }
            }
            dashboardContent = <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Typography color="primary"> Activo </Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Categoría</Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Área</Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Estado</Typography></TableCell>
                                            <TableCell align="right"> <Typography color="primary"> Acciones</Typography> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{array.map((item) => ( 
                                        <TableRow key={item._id}>
                                            <TableCell align="left">{`${item.nombre}`}</TableCell>
                                            <TableCell align="left">{`${item.categoria}`}</TableCell>
                                            <TableCell align="right">{`${item.area}`}</TableCell>       
                                            <TableCell align="right">{`${item.estado}`}</TableCell>
                                            <TableCell align="right">
                                                <Grid container spacing={3} justify="flex-end">
                                                    <Grid item >
                                                        <Button href={`/assets/${item._id}`} variant="contained" color="secondary"> Detalles </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button href={`/delete/${item._id}`} variant="contained" color="primary"> Eliminar </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>                          
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
        } else {
            dashboardContent = <p className="center-align"> No hay Activos por eliminar </p>;
        }
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
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} >
                                                                    <Typography variant="h4" gutterBottom color="primary" align="center"> Activos Por Eliminar</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <TableContainer>
                                                                        {dashboardContent}
                                                                    </TableContainer>
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
        );
    }
}

Gerente.propTypes = {
    getAssets: PropTypes.func.isRequired,
    assets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    assets: state.assets,
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getAssets }
)(Gerente));