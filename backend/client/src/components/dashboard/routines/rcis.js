import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getrcis } from "../../../actions/routines/rciActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card, Button } from "@material-ui/core";

class rcis extends Component {

    constructor(){
        super();

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Estado', field: 'estado'}
            ]
        };
    }

    componentDidMount () {
        this.props.getUsers()
        this.props.getrcis()
    }

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/detallerci/${id}`);
    }

    onUpdateClick = id => {
        const { history } = this.props;
        history.push(`/updaterci/${id}`);
    }

    render() {
        console.log(this.props)
        const res = this.props.rcis.rcis;
        console.log(res)
        let rcis = null;
        if(res !== null) {
            rcis = res.data;
        }
        console.log(rcis)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, estado) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor,
                        "estado": estado,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(rcis!=null) {
            if(rcis.length > 0) {
            rcis.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor, element.estado)
            });
            }
        }

        routineItems.reverse();

        return (
            <Grid container spacing={1}>
            <Grid item xs={12}>
            <Card style={{marginTop:-20}}>
              <Button 
                variant="outlined" 
                fullWidth={true}
                style={{height: 170,backgroundSize: "cover", color: "#F59C00", backgroundImage:"url(/fachdia.jpg)", fontSize:48, fontWeight:"bolder"}} 
              > 
                RUTINAS
              </Button>
            </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <br/>
                    <Link to="/routines" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Regresar
                    </Link>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <MaterialTable
                                title="Gabinetes RCI"
                                columns={this.state.columns}
                                data={routineItems}
                                localization={{
                                    header: {
                                        actions: 'Acciones'
                                    },
                                    body: {
                                        emptyDataSourceMessage: 'No hay registros para mostrar',
                                        filterRow: 'Filtrar'
                                    },
                                    pagination: {
                                        labelRowsSelect: 'filas'
                                    }
                                }}
                                options={{
                                    exportButton:true,
                                    headerStyle: {
                                        color: '#F59C00',
                                        fontSize: 16
                                    },
                                    rowStyle: {
                                        fontSize: 16,
                                    }
                                }}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'Diligenciar rutina',
                                        onClick: (event, rowData) => this.onUpdateClick(rowData.id)
                                    },
                                    {
                                        icon: 'search',
                                        tooltip: 'Detalle rutina',
                                        onClick: (event, rowData) => this.onDetailClick(rowData.id)
                                    }
                                ]}
                                >
                                </MaterialTable>
                            </Grid>
                        </Grid>
                        <br/>
                        <Link to="/newrci" className="btn-flat waves-effect">
                                <i className="material-icons left">add</i> Nueva
                        </Link>
                    </CardContent>
                </Card>
                </Grid>
                </Grid>
        );
    }
}

rcis.propTypes = {
    getrcis: PropTypes.func.isRequired,
    rcis: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    rcis: state.rcis,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers, getrcis }
)(withRouter(rcis));