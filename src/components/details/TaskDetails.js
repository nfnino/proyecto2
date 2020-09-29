import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';

import { Button, Grid, Card, CardContent, ListItem, List, ListItemText, Typography } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = theme => ({
    root: {
      minWidth: 250,
    },
    media: {
        width: '100%',
        height: '100%'
    },
});

class TaskDetails extends Component {

    constructor(){
        super();
        this.state={
            setOpen: false,
            setOpen2: false,
        };
    }

    handleClickOpen = () => {
        this.setState({setOpen: true})
    };
    
    handleClose = () => {
        this.setState({setOpen: false})
    };

    onClick = () => {
        this.handleClickOpen()
    }

    handleClickOpen2 = () => {
        this.setState({setOpen2: true})
    };
    
    handleClose2 = () => {
        this.setState({setOpen2: false})
    };

    onClick2 = () => {
        this.handleClickOpen2()
    }

    render () {
        const { classes } = this.props;
        let task = this.props.task

        let source = task.imagen_antes_mant
        let source2 = task.imagen_despu_mant

        const bruh = 
        <Grid container>
        <Dialog
            open={this.state.setOpen}
            onClose={this.handleClose}
            >
            <DialogTitle>Imagen del Activo Antes</DialogTitle>
            <DialogContent>
                <img className={classes.media} src={source} alt="" width="500" height="600"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.setOpen2}
            onClose={this.handleClose2}
            >
            <DialogTitle>Imagen del Activo Despues</DialogTitle>
            <DialogContent>
                <img className={classes.media} src={source2} alt="" width="500" height="600"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose2} color="secondary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    <Grid item xs={12}>
        <Card ClassName={classes.root}>
            <CardContent>
                <Link to="/tasks" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i>Regresar
                </Link>
                <br/>
                <br/>
                <Grid container justify="center" spacing={2}>
                    <Typography variant="h4" color="secondary">Detalles Actividad: </Typography>
                    <Grid item xs={12}>
                        <List>
                            <ListItem >
                                <ListItemText primary="Activo" secondary={task.activo} />
                            </ListItem>
                            <ListItem >
                                <Button color="secondary" onClick={this.onClick} >Imagen Antes</Button>
                            </ListItem>
                            <ListItem >
                                <Button color="secondary" onClick={this.onClick2} >Imagen Despues</Button>
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Tipo Mantenimiento" secondary={task.tipo_mant} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Fecha Inicio (T)" secondary={new Date(task.fecha_inicial_tent).toLocaleDateString()} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Fecha Inicio" secondary={new Date(task.fecha_inicial_real).toLocaleDateString()} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Fecha Fin (T)" secondary={new Date(task.fecha_final_tent).toLocaleDateString()} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Fecha Fin" secondary={new Date(task.fecha_final_real).toLocaleDateString()} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Descripción" secondary={task.desc_falla} />
                                </ListItem>
                            <ListItem >
                                <ListItemText primary="Estado" secondary={task.estado} />
                                </ListItem>
                            <ListItem >
                                <ListItemText primary="Email Compras" secondary={task.email_compras} />
                                </ListItem>
                            <ListItem >
                                <ListItemText primary="Descripción Compras" secondary={task.desc_materiales_compras} />
                                </ListItem>
                            <ListItem >
                                <ListItemText primary="Ejecutor" secondary={task.ejecutor_interno} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Supervisor" secondary={task.supervisor} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="NIT Empresa" secondary={task.nit_empresa_externa} />
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Nombre Empresa" secondary={task.nom_empresa_externa} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Orden de Compra" secondary={<a href={task.doc_orden_compra} download> 
                                        Descargar
                                    </a>}/>
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Valor Externo" secondary={task.valor_externo} />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
</Grid>

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Card variant="elevation" className={classes.root}>
                        <CardContent>
                            {task==null ? (<div className="center">Cargando ...</div>) : bruh }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
        )
    }
}

TaskDetails.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {

    let id = ownProps.match.params.id;
    return {
        task: state.tasks.tasks.data.find(task => task._id === id)
    }
};

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(TaskDetails));
