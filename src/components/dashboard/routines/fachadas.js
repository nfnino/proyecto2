import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getFachadas } from "../../../actions/routines/fachadaActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card } from "@material-ui/core";

class Fachadas extends Component {

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
        this.props.getFachadas()
    }

    onDetailClick = id => {
        this.props.history.push(`detalleFachada/${id}`)
    }

    render() {
        const { auth } = this.props;
        const res = this.props.fachadas.fachadas;
        console.log(this.props)
        console.log(res)
        const fachadas = res.data;
        console.log(fachadas)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, supervisor) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor, 
                        "supervisor": supervisor,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(fachadas!=null) {
            if(fachadas.length > 0) {
            fachadas.forEach(element => {
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
                        <Link to="/newFachada" className="btn-flat waves-effect">
                                <i className="material-icons left">add</i> Nueva
                        </Link>
                    </CardContent>
                </Card>
        );
    }
}

Fachadas.propTypes = {
    getFachadas: PropTypes.func.isRequired,
    fachadas: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    fachadas: state.fachadas,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers, getFachadas }
)(withRouter(Fachadas));