import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getParkings } from "../../../actions/routines/parkingActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card, Button } from "@material-ui/core";

class Parkings extends Component {

    constructor(){
        super();

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
            ]
        };
    }

    componentDidMount () {
        this.props.getUsers()
        this.props.getParkings()
    }

    onDetailClick = id => {
        this.props.history.push(`detalleParking/${id}`)
    }

    render() {
        const res = this.props.parkings.parkings;
        console.log(this.props)
        console.log(res)
        let parkings = []
        if(res!=null) {
            parkings = res.data;
        }
        console.log(parkings)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor, 
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(parkings!=null) {
            if(parkings.length > 0) {
            parkings.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor)
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
                                title="Parking y CCTV"
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
                                    },
                                    search: false,
                                    filtering: true
                                }}
                                actions={[
                                    {
                                        icon: 'search',
                                        tooltip: 'Detalle Rutina',
                                        onClick: (event, rowData) => this.onDetailClick(rowData.id)
                                    }
                                ]}
                                >
                                </MaterialTable>
                            </Grid>
                        </Grid>
                        <br/>
                        <Link to="/newParking" className="btn-flat waves-effect">
                                <i className="material-icons left">add</i> Nueva
                        </Link>
                    </CardContent>
                </Card>
                </Grid>
                </Grid>
        );
    }
}

Parkings.propTypes = {
    getParkings: PropTypes.func.isRequired,
    parkings: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    parkings: state.parkings,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers, getParkings }
)(withRouter(Parkings));