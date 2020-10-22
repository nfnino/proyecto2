import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getUsers } from "../../../actions/userActions";
import { getSilleteria } from "../../../actions/routines/silleteriaActions";

import MaterialTable from 'material-table';
import { CardContent, Grid, Card, Button } from "@material-ui/core";

class Silleterias extends Component {

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
        this.props.getSilleteria()
    }

    onDetailClick = id => {
        const { history } = this.props;
        history.push(`/detalleSilleteria/${id}`);
    }

    onUpdateClick = id => {
        const { history } = this.props;
        history.push(`/updateSilleteria/${id}`);
    }

    render() {
        const res = this.props.silleterias.silleterias;
        console.log(this.props)
        console.log(res)
        const silleterias = res.data;
        console.log(silleterias)

        const routineItems = [];
        
        function createData(id, fecha, ejecutor, estado) {
            let array = {"fecha": new Date(fecha).toLocaleDateString(),
                        "ejecutor": ejecutor,
                        "estado": estado,
                        "id": id
                    }
            routineItems.push(array)
        }
        
        if(silleterias!=null) {
            if(silleterias.length > 0) {
            silleterias.forEach(element => {
                createData(element._id, element.fecha, element.ejecutor, element.estado)
            });
            }
        }

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
                        <Link to="/newSilleteria" className="btn-flat waves-effect">
                                <i className="material-icons left">add</i> Nueva
                        </Link>
                    </CardContent>
                </Card>
                </Grid>
                </Grid>
        );
    }
}

Silleterias.propTypes = {
    getSilleteria: PropTypes.func.isRequired,
    silleterias: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    silleterias: state.silleterias,
    users: state.users,
    auth: state.auth
  });

export default connect(
    mapStateToProps,
    { getUsers, getSilleteria }
)(withRouter(Silleterias));