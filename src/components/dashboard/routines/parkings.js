import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getParkings } from "../../../actions/routines/parkingActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card } from "@material-ui/core";

class Parkings extends Component {

    constructor(){
        super();

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Supervisor', field: 'supervisor'}
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
        const parkings = res.data;
        console.log(parkings)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, supervisor) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor, 
                        "supervisor": supervisor,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(parkings!=null) {
            if(parkings.length > 0) {
            parkings.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor, element.supervisor)
            });
            }
        }

        return (
                <Card>
                    <br/>
                    <Link to="/routines" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Regresar
                    </Link>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <MaterialTable
                                title=" Rutinas"
                                columns={this.state.columns}
                                data={routineItems}
                                options={{
                                    exportButton:true
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