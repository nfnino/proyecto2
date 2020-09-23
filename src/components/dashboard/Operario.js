import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Card, CardContent, TableRow, TableCell, TableBody, TableContainer, Table, TableHead, Typography , Button, Divider} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import { getTasks } from "../../actions/taskActions";

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
  });

class Operario extends Component {
    constructor(){
        super();
    }

    componentWillMount() {
        this.props.getTasks();
    } 

    render() {
        const { classes } = this.props;
        const { auth } = this.props;
        const { tasks, tasksLoading } = this.props.tasks;
        const res = tasks.data;

        let dashboardContent;

        if (res == null || tasksLoading) {
            dashboardContent = <p className="center-align">Loading...</p>;
        } else if (res.length > 0) {
            const array = []
            for(let i=0; i<res.length; i++) {
                if(res[i].ejecutor_interno === auth.user.name){
                    if(res[i].estado!=="Cerrada") {
                        array.push(res[i])
                    }
                }
            }
            dashboardContent = <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Typography color="primary"> Activo </Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Tipo</Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Fecha Inicio</Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Fecha Fin</Typography></TableCell>
                                            <TableCell align="right"><Typography color="primary"> Estado</Typography></TableCell>
                                            <TableCell align="right"> <Typography color="primary"> Acciones</Typography> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{array.map((item) => ( 
                                        <TableRow key={item._id}>
                                            <TableCell align="left">{`${item.activo}`}</TableCell>
                                            <TableCell align="left">{`${item.tipo_mant}`}</TableCell>
                                            <TableCell align="right">{`${new Date(item.fecha_inicial_tent).toLocaleDateString()}`}</TableCell>       
                                            <TableCell align="right">{`${new Date(item.fecha_final_tent).toLocaleDateString()}`}</TableCell>
                                            <TableCell align="right">{item.estado!=="Creada" 
                                                                    ? <Typography color="error">{item.estado}</Typography> 
                                                                    : <Typography>{item.estado}</Typography>}
                                            </TableCell>
                                            <TableCell align="right"><Button href={`/task-flow/${item._id}`} variant="contained" color="primary"> Iniciar </Button></TableCell>                          
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
        } else {
            dashboardContent = <p className="center-align"> No hay actividades de mantenimiento </p>;
        }
        return (
            <div>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Card variant="elevation">
                                <CardContent>
                                    <Typography variant="h4" gutterBottom color="primary" align="center"> Tareas Disponbles</Typography>
                                    <Divider/>
                                    <TableContainer>
                                        {dashboardContent}
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Operario.propTypes = {
    getTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tasks: state.tasks,
    auth: state.auth
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    { getTasks }
)(Operario));