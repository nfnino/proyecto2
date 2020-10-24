import React, { Component } from "react";
import { connect } from "react-redux";
import { DataGrid } from "@material-ui/data-grid"
import { withStyles } from '@material-ui/core/styles';

import { Grid, Paper,Typography } from "@material-ui/core";
const useStyles = theme => ({
    root: {
      minWidth: 250,
    },
    media: {
        width: '100%',
        height: '100%'
    },
    paper: {
        height: 375,
        minWidth: 600,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
});

class TaskAudit extends Component {

    render() {
        const { classes } = this.props;
        const { tasks } = this.props;
        let rows= [];
        let bruh = null;

        tasks.map((row) => (
            rows.push({id:row._id, asset: row.task_asset, type: row.task_type, action: row.action, user: row.user_name, date: new Date(row.date).toLocaleDateString()})
        ))

            bruh = 
            <Grid container justify="center" spacing={2}>
                        <Typography variant="h5" color="primary">Auditoría Actividades: </Typography>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <DataGrid 
                                rows={rows} 
                                hideFooterSelectedRowCount={true}
                                hideFooterRowCount={true}
                                columns={[
                                    { field: 'id', hide: true},
                                    { field: 'asset', headerName: 'Activo', headerClassName: 'cell', width: 250},
                                    { field: 'type', headerName: 'Tipo', headerClassName: 'cell', width: 250},
                                    { field: 'action', headerName: 'Acción', headerClassName: 'cell', width: 200},
                                    { field: 'user', headerName: 'Usuario', headerClassName: 'cell', width: 250},
                                    { field: 'date', headerName: 'Fecha', headerClassName: 'cell', width: 250}
                                ]}
                                pageSize={5}/>
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
