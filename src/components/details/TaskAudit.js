import React, { Component } from "react";
import { connect } from "react-redux";

import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';

import { Grid, TableBody, TableHead, TableRow, TableCell, Paper, Table, TableContainer, Typography } from "@material-ui/core";
const useStyles = theme => ({
    root: {
      minWidth: 250,
    },
    media: {
        width: '100%',
        height: '100%'
    },
    paper: {
        width: '95.5%',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
});

class TaskAudit extends Component {

    constructor(){
        super();
        this.state=[{
            rowsPerPage: 5,
            page: 0,
        }]
    }

    handleChangePage = (e, newpage) =>{
        this.setState({
            page: newpage
        })
    }

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: parseInt(e.target.value, 10),
            page: 0
        })
    }

    createData(a, b, c, d, e) {
        return {a, b, c, d, e}
    }

    render() {
        const { classes } = this.props;
        const { tasks } = this.props;
        let bruh = null;

            let items = tasks.map((row) => (
                <TableRow key={row.task_asset}>
                <TableCell component="th" scope="row">
                    {row.task_asset}
                </TableCell>
                <TableCell align="right">{row.task_type}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
                <TableCell align="right">{row.user_name}</TableCell>
                <TableCell align="right">{new Date(row.date).toLocaleDateString()}</TableCell>
                </TableRow>
            ))

            bruh = 
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" color="primary">Auditoría Tareas: </Typography>
                                    <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell><Typography color="primary">Activo</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Tipo</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Acción</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Usuario</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Fecha</Typography></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {items}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={tasks.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                                {tasks==null ? (<div className="center">Cargando ...</div>) : bruh }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

TaskAudit.propTypes = {

}

const mapStateToProps = (state, ownProps) => ({
    
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(TaskAudit));
