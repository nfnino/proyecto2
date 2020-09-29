import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid"

const useStyles = theme => ({
    root: {
        '& .cell': {
            color: "#00a9e0",
            fontSize: 14
        },
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

class AssetAudit extends Component {

    constructor(){
        super();
    }

    render() {
        const { classes } = this.props;
        const { assets } = this.props;
        let bruh = null;
        let rows= [];

        assets.map((row) => (
            rows.push({id:row._id, asset: row.asset_name, action: row.action, user: row.user_name, date: new Date(row.date).toLocaleDateString()})
        ))

        console.log(rows)

        console.log(assets)
    
            bruh = 
                    <Grid container justify="center" spacing={2}>
                        <Typography variant="h5" color="primary">Auditoría Activos: </Typography>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <DataGrid 
                                rows={rows} 
                                columns={[
                                    { field: 'id', hide: true},
                                    { field: 'asset', headerName: 'Activo', headerClassName: 'cell', width: 310},
                                    { field: 'action', headerName: 'Acción', headerClassName: 'cell', width: 250},
                                    { field: 'user', headerName: 'Usuario', headerClassName: 'cell', width: 310},
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
                                {assets===null ? (<div className="center">Cargando ...</div>) : bruh }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

AssetAudit.propTypes = {

}

const mapStateToProps = (state, ownProps) => ({
    
});

export default withStyles(useStyles)(connect(
    mapStateToProps,
    {  }
)(AssetAudit));
