import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
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

class AssetAudit extends Component {

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

    createData(a, b, c, d) {
        return {a, b, c, d}
    }

    render() {
        const { classes } = this.props;
        const { assets } = this.props;
        let bruh = null;

        console.log(assets)
    
            bruh = 
                                <Grid container justify="center" spacing={2}>
                                    <Typography variant="h4" color="primary">Auditoría Activos: </Typography>
                                    <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <TableContainer component={Paper}>
                                            <Table className={classes.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell><Typography color="primary">Activo</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Acción</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Usuario</Typography></TableCell>
                                                    <TableCell align="right"><Typography color="primary">Fecha</Typography></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {assets.map((row) => (
                                                        <TableRow hover key={row.asset_name}>
                                                            {console.log(row.asset_name)}
                                                        <TableCell component="th" scope="row">
                                                            {row.asset_name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.action}</TableCell>
                                                        <TableCell align="right">{row.user_name}</TableCell>
                                                        <TableCell align="right">{new Date(row.date).toLocaleDateString()}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={assets.length}
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
