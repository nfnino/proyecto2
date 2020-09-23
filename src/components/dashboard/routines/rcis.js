import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getrcis } from "../../../actions/routines/rciActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card } from "@material-ui/core";

class rcis extends Component {

    constructor(){
        super();

        this.state={
            columns: [
                {title: 'Fecha', field: 'fecha'},
                {title: 'Ejecutor', field: 'ejecutor'},
                {title: 'Supervisor', field: 'supervisor'},
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
        const rcis = res.data;
        console.log(rcis)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, supervisor, estado) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor, 
                        "supervisor": supervisor,
                        "estado": estado,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(rcis!=null) {
            if(rcis.length > 0) {
            rcis.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor, element.supervisor, element.estado)
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
                                        icon: 'save',
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