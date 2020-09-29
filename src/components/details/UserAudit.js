import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid"

import { Grid, Paper, Typography } from "@material-ui/core";
const useStyles = theme => ({
    root: {
      minWidth: 250,
      maxwidth: 700
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

class UserAudit extends Component {

    constructor(){
        super();
    }

    render() {
        const { classes } = this.props;
        const { users } = this.props;
        let rows= [];
        let bruh = null;

        users.map((row) => (
            rows.push({id:row._id, user: row.user_name, action: row.action, superuser: row.superuser_name, date: new Date(row.date).toLocaleDateString()})
        ))

            bruh = 
            <Grid container justify="center" spacing={2}>
                        <Typography variant="h5" color="primary">Auditoría Usuarios: </Typography>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <DataGrid 
                                rows={rows} 
                                columns={[
                                    { field: 'id', hide: true},
                                    { field: 'user', headerName: 'Usuario', headerClassName: 'cell', width: 310},
                                    { field: 'action', headerName: 'Acción', headerClassName: 'cell', width: 250},
                                    { field: 'superuser', headerName: 'SuperUsuario', headerClassName: 'cell', width: 310},
                                    { field: 'date', headerName: 'Fecha', headerClassName: 'cell', width: 310}
                                ]}
                                pageSize={5}/>
                            </Paper>
                        </Grid>
                    </Grid>
                                
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                                {users==null ? (<div className="center">Cargando ...</div>) : bruh }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
UserAudit.propTypes = {

}

const mapStateToProps = (state, ownProps) => ({
    
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(UserAudit));
